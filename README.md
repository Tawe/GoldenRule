# Golden Rules – Security Rules Engine

Golden Rules is a security-focused rules engine for AI-assisted development environments like Cursor. It enforces secure coding practices, prevents common vulnerabilities, and improves team confidence when integrating AI tools into real codebases.

## Features

### Package Security

- Blocks packages not updated in the last 12 months  
- Requires a minimum number of GitHub stars (e.g., 1,000+)  
- Enforces a trusted allowlist  

### Code Security

- Detects hardcoded secrets and API keys  
- Blocks dangerous functions (e.g., `eval`, `setTimeout(string)`)  
- Flags insecure HTTP usage  
- Prevents weak cryptography (e.g., `MD5`, `SHA1`, `Math.random`)  
- Blocks commits to sensitive files or folders  


## Rules Structure

All rules are located in the `.cursor/rules/` directory:

- **core.md** – Foundational development policies, secure prompting, review processes  
- **refresh.md** – Instructions for resetting or reorienting AI context  
- **request.md** – Task-specific rules (test generation, scaffolding, dependency prompts)  
- **context.json** – Rules based on file patterns or sensitive directories (e.g., `auth/`, `infra/`)  
- **model.json** – Cursor config including versioning, context size, safety settings, and monitoring  


## Installation

### 1. Add the rules directory

```
.cursor/rules/
├── core.md
├── refresh.md
├── request.md
├── context.json
└── model.json
```

### 2. Add the validation script to `package.json`

```json
{
  "scripts": {
    "preinstall": "node scripts/validate-packages.js"
  }
}
```

### 3. Install dependencies

```bash
npm install
```

## Configuration

### Editing Rules

- `core.md` – General security standards and usage guidance  
- `refresh.md` – Context reset best practices  
- `request.md` – How AI should behave on specific task prompts  
- `context.json` – Rules per file path or pattern  
- `model.json` – Approved versions, max context, safety settings  

### Rule Application Order

1. Core rules (`core.md`)  
2. Contextual rules (`context.json`)  
3. Request-specific rules (`request.md`)  
4. Model configuration (`model.json`)  


## Examples

### `context.json`

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
    }
  },
  "blocked_patterns": {
    "dangerous_functions": {
      "patterns": ["eval\\(", "setTimeout\\(.*['\"].*['\"]"],
      "message": "Dangerous function usage",
      "action": "block"
    }
  }
}
```

### `model.json`

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


### Package Validation Rules

```json
{
  "rules": [
    {
      "name": "block-outdated-packages",
      "conditions": [
        { "type": "package-age", "maxAgeMonths": 12 },
        { "type": "github-stars", "minStars": 1000 }
      ]
    }
  ]
}
```

## Manual Package Validation

```bash
node scripts/validate-packages.js package1 package2
```


## Security Standards Summary

- No hardcoded secrets or API keys  
- No dangerous functions (e.g., `eval`, `setTimeout(string)`)  
- No insecure HTTP or weak cryptography  
- Peer review required for AI-generated code  
- Tech Lead approval required for changes in sensitive systems  
- All dependencies must be verified before merging  

## Contributing

1. Fork the repository  
2. Create your feature branch  
3. Commit your changes  
4. Push to the branch  
5. Open a Pull Request  
