# Golden Rules - Security Rules Engine

A robust security rules engine that helps protect your codebase by enforcing security best practices and preventing common security anti-patterns.

## Features

- 🔒 Package Security Validation
  - Blocks packages not updated in the last year
  - Enforces minimum GitHub stars
  - Maintains allowlist of trusted packages
  - Validates package update frequency

- 🛡️ Code Security Rules
  - Detects hardcoded secrets and API keys
  - Blocks dangerous function usage (eval, setTimeout with strings)
  - Warns about insecure HTTP usage
  - Prevents weak cryptography
  - Blocks sensitive file commits

## Installation

1. Copy the following files to your project root:
   ```
   cursor.rules.json
   allowed-packages.json
   .cursorignore
   scripts/validate-packages.js
   ```

2. Add the validation script to your `package.json`:
   ```json
   {
     "scripts": {
       "preinstall": "node scripts/validate-packages.js"
     },
     "dependencies": {
       "axios": "^1.6.0"
     }
   }
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

### Package Security Rules (`cursor.rules.json`)

```json
{
  "rules": [
    {
      "name": "block-outdated-packages",
      "conditions": [
        {
          "type": "package-age",
          "maxAgeMonths": 12
        },
        {
          "type": "github-stars",
          "minStars": 1000
        }
      ]
    }
  ]
}
```

### Allowed Packages (`allowed-packages.json`)

```json
{
  "packages": {
    "npm": [
      "react",
      "axios",
      // Add your trusted packages here
    ]
  }
}
```

### Ignored Files (`.cursorignore`)

```
# Environment and secrets
.env
*.pem
*.key

# Configuration files
config.json
secrets.json

# Development artifacts
node_modules/
dist/
```

## Usage

The security rules are automatically enforced during:
- Package installation (`npm install`)
- Git commits (via pre-commit hooks)
- Manual validation runs

### Manual Validation

To manually validate packages:
```bash
node scripts/validate-packages.js package1 package2
```

## Security Rules

### Package Security
- Packages must have been updated in the last year
- Packages must have 1000+ GitHub stars
- Packages must be in the allowlist

### Code Security
- No hardcoded secrets or API keys
- No dangerous function usage (eval, setTimeout with strings)
- No insecure HTTP calls
- No weak cryptography (MD5, SHA1, Math.random)
- No sensitive file commits

## Customization

### Adding Custom Rules

Edit `cursor.rules.json` to add custom rules:
```json
{
  "rules": [
    {
      "name": "custom-rule",
      "pattern": {
        "type": "code",
        "regex": "your-pattern"
      },
      "action": "block",
      "message": "Custom rule violation"
    }
  ]
}
```

### Modifying Allowlist

Edit `allowed-packages.json` to add trusted packages:
```json
{
  "packages": {
    "npm": [
      "your-trusted-package"
    ]
  }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this in your projects!

## Security

If you discover any security-related issues, please email security@example.com instead of using the issue tracker. 