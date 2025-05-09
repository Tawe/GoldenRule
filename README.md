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

## Rules System

The rules system is organized in the `.cursor/rules/` directory with the following structure:

### Core Rules (`core.md`)
- Foundational security policies
- Development guidelines
- Review processes
- Emergency procedures

### Refresh Rules (`refresh.md`)
- When and how to refresh Cursor's context
- Context management best practices
- Common issues and solutions

### Request Rules (`request.md`)
- Guidelines for specific tasks
- Test generation rules
- Scaffolding templates
- Dependency management

### Contextual Rules (`context.json`)
- Directory-specific rules for sensitive areas
- File type-specific security requirements
- Blocked patterns for dangerous code
- Security requirements by context
- Example contexts:
  - Sensitive directories (auth/, infra/, billing/)
  - Test files (*.test.js, *.spec.ts)
  - Security files (*.auth.*, *.security.*)
  - API files (*.api.*, *.endpoint.*)

### Model Configuration (`model.json`)
- Approved Cursor versions and update policies
- Context window settings and limits
- Safety features and restrictions
- Monitoring and compliance settings
- Key configurations:
  - Version control (approved versions, update policy)
  - Context management (max files, tokens, refresh)
  - Safety features (peer review, sensitive dirs)
  - Monitoring (logging, alerts, anomalies)
  - Compliance (data retention, enterprise mode)

## Installation

1. Copy the following files to your project root:
   ```
   .cursor/rules/
   ├── core.md
   ├── refresh.md
   ├── request.md
   ├── context.json
   └── model.json
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

### Creating Custom Rules

1. Edit `core.md` for foundational rules
2. Update `context.json` for file/directory specific rules
3. Modify `request.md` for task-specific guidelines
4. Update `refresh.md` for context management
5. Configure `model.json` for Cursor settings

### Modifying Rules

1. Rules are applied in the following order:
   - Core rules (always applied)
   - Contextual rules (based on file/directory)
   - Request-specific rules (based on task)
   - Model settings (enforced by Cursor)

2. Rule Actions:
   - `block`: Prevents the action
   - `warn`: Shows a warning
   - `suggest`: Provides recommendations

### Configuration Examples

#### Context Rules (`context.json`)
```json
{
  "contexts": {
    "sensitive_directories": {
      "paths": ["auth/", "infra/", "billing/"],
      "rules": [
        {
          "type": "approval",
          "message": "Changes require Tech Lead approval",
          "action": "block"
        }
      ]
    },
    "api_files": {
      "patterns": ["*.api.*", "*.endpoint.*"],
      "rules": [
        {
          "type": "validation",
          "message": "Input validation required",
          "action": "suggest"
        }
      ]
    }
  },
  "blocked_patterns": {
    "dangerous_functions": {
      "patterns": ["eval\\(", "setTimeout\\(.*['\"].*['\"]"],
      "message": "Dangerous function detected",
      "action": "block"
    }
  }
}
```

#### Model Configuration (`model.json`)
```json
{
  "model": {
    "approved_versions": ["1.2.0"],
    "update_policy": {
      "auto_update": false,
      "require_review": true
    }
  },
  "settings": {
    "context_window": {
      "max_files": 10,
      "max_tokens": 4000
    },
    "safety": {
      "require_peer_review": true,
      "block_sensitive_dirs": true
    }
  }
}
```

#### Package Validation Rules
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

### Common Configuration Patterns

#### 1. Sensitive Directory Protection
```json
{
  "contexts": {
    "sensitive_dirs": {
      "paths": ["secrets/", "keys/", "config/"],
      "rules": [
        {
          "type": "access",
          "message": "Access requires security review",
          "action": "block"
        },
        {
          "type": "audit",
          "message": "Changes must be logged",
          "action": "warn"
        }
      ]
    }
  }
}
```

#### 2. API Security Rules
```json
{
  "contexts": {
    "api_endpoints": {
      "patterns": ["*.api.*", "*.endpoint.*"],
      "rules": [
        {
          "type": "validation",
          "message": "Input validation required",
          "action": "suggest"
        },
        {
          "type": "authentication",
          "message": "Authentication check required",
          "action": "block"
        },
        {
          "type": "rate_limiting",
          "message": "Rate limiting required",
          "action": "suggest"
        }
      ]
    }
  }
}
```

#### 3. Test File Requirements
```json
{
  "contexts": {
    "test_files": {
      "patterns": ["*.test.js", "*.spec.ts"],
      "rules": [
        {
          "type": "coverage",
          "message": "Test coverage required",
          "action": "suggest"
        },
        {
          "type": "structure",
          "message": "Follow AAA pattern",
          "action": "suggest"
        }
      ]
    }
  }
}
```

#### 4. Model Safety Settings
```json
{
  "settings": {
    "safety": {
      "require_peer_review": true,
      "block_sensitive_dirs": true,
      "max_auto_changes": 5,
      "require_approval": {
        "sensitive_files": true,
        "package_changes": true,
        "config_changes": true
      }
    },
    "monitoring": {
      "log_level": "info",
      "track_context_usage": true,
      "alert_on_sensitive_access": true
    }
  }
}
```

### External Dependencies

When adding external dependencies:
1. Check security rules in `core.md`
2. Verify package in `allowed-packages.json`
3. Get Tech Lead approval
4. Document the addition
5. Update tests

## Usage

The security rules are automatically enforced during:
- Package installation (`npm install`)
- Git commits (via pre-commit hooks)
- Manual validation runs
- Cursor AI interactions

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
