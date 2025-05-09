const fs = require('fs');
const path = require('path');
const axios = require('axios');

class PackageValidator {
    constructor() {
        // Read rules and allowlist
        const rulesPath = path.join(__dirname, '..', 'cursor.rules.json');
        const allowlistPath = path.join(__dirname, '..', 'allowed-packages.json');

        try {
            this.rules = JSON.parse(fs.readFileSync(rulesPath, 'utf8'));
            this.allowlist = JSON.parse(fs.readFileSync(allowlistPath, 'utf8'));
        } catch (error) {
            console.error('❌ Error reading rules or allowlist:', error.message);
            throw error;
        }
    }

    async getGitHubStats(packageName) {
        try {
            const response = await axios.get(`https://api.github.com/search/repositories`, {
                params: {
                    q: `${packageName}+language:javascript`,
                    sort: 'stars'
                },
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'golden-rules'
                }
            });

            if (response.data.items && response.data.items[0]) {
                return {
                    stars: response.data.items[0].stargazers_count,
                    updatedAt: new Date(response.data.items[0].updated_at)
                };
            }
            return { stars: 0, updatedAt: new Date(0) };
        } catch (error) {
            console.error(`❌ Error fetching GitHub stats for ${packageName}:`, error.message);
            return { stars: 0, updatedAt: new Date(0) };
        }
    }

    async getNpmStats(packageName) {
        try {
            const response = await axios.get(`https://registry.npmjs.org/${packageName}`);
            const latestVersion = response.data['dist-tags'].latest;
            return {
                lastUpdate: new Date(response.data.time[latestVersion])
            };
        } catch (error) {
            console.error(`❌ Error fetching NPM stats for ${packageName}:`, error.message);
            return { lastUpdate: new Date(0) };
        }
    }

    async validatePackage(packageName) {
        console.log(`\n🔍 Validating package: ${packageName}`);
        const errors = [];

        // Check allowlist
        const isAllowed = this.allowlist.packages.npm.includes(packageName);
        if (!isAllowed) {
            errors.push(`Package '${packageName}' is not in the allowlist`);
        }

        // Get GitHub stats
        const githubStats = await this.getGitHubStats(packageName);
        if (githubStats.stars < this.rules.rules[0].conditions[1].minStars) {
            errors.push(`Package has fewer than ${this.rules.rules[0].conditions[1].minStars} GitHub stars (${githubStats.stars})`);
        }

        // Get NPM stats
        const npmStats = await this.getNpmStats(packageName);
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        if (npmStats.lastUpdate < oneYearAgo) {
            errors.push(`Package hasn't been updated in over a year (Last update: ${npmStats.lastUpdate.toISOString()})`);
        }

        return errors;
    }

    async validatePackages(packages) {
        if (!packages || packages.length === 0) {
            console.log('❌ No packages to validate');
            return false;
        }

        console.log(`🔒 Validating ${packages.length} package(s)...`);
        
        const allErrors = [];
        for (const packageName of packages) {
            const errors = await this.validatePackage(packageName);
            if (errors.length > 0) {
                allErrors.push({ package: packageName, errors });
            }
        }

        if (allErrors.length > 0) {
            console.error('\n❌ Security validation failed:');
            allErrors.forEach(error => {
                console.error(`\n  Package: ${error.package}`);
                error.errors.forEach(err => console.error(`  • ${err}`));
            });
            return false;
        } else {
            console.log('\n✅ All packages passed security validation');
            return true;
        }
    }
}

// Create singleton instance
const validator = new PackageValidator();

// Export the validate function
module.exports = (packages) => validator.validatePackages(packages);

// Handle script being run directly
if (require.main === module) {
    const packagesToValidate = process.argv.slice(2);
    validator.validatePackages(packagesToValidate).then(success => {
        process.exit(success ? 0 : 1);
    }).catch(error => {
        console.error('❌ Validation script error:', error);
        process.exit(1);
    });
} 