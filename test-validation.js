const validatePackages = require('./scripts/validate-packages.js');

// Test packages
const packagesToTest = [
    'is-odd',
    'left-pad',
    'node-ipc',
    'react',  // This one should pass
    'axios'   // This one should pass
];

async function runTests() {
    console.log('🧪 Testing package validation...\n');
    
    for (const pkg of packagesToTest) {
        console.log(`Testing package: ${pkg}`);
        const result = await validatePackages([pkg]);
        console.log(`Result: ${result ? '✅ Passed' : '❌ Failed'}\n`);
    }
}

runTests().catch(error => {
    console.error('Test error:', error);
    process.exit(1);
}); 