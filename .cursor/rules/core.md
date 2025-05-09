# Core Rules and Policies

## Security Policies

### Package Management
- All new dependencies must be validated against our security rules
- Dependencies must be approved by Tech Lead before addition
- No direct installation of packages without validation
- All dependencies must be pinned to specific versions

### Code Security
- No hardcoded secrets or credentials
- No direct use of eval() or similar dynamic code execution
- All HTTP calls must use HTTPS
- No use of deprecated or insecure crypto algorithms
- All sensitive operations must be logged and monitored

### Agent Safety
- YOLO Mode is prohibited in sensitive repositories
- Agents cannot modify critical systems without Tech Lead review
- All agent-suggested code must be reviewed before acceptance
- Agents must be restricted to non-sensitive files
- No automatic package installations without review

### Prompt Security
- Never disclose system architecture in prompts
- Avoid mentioning internal URLs or client names
- Use generic language for project-specific details
- Sanitize external data before using in prompts
- Review all context before sharing with AI

### Data Retention
- Log out of Cursor sessions when inactive
- Close context windows after sensitive operations
- Minimize exposure of regulated data
- Report privacy concerns immediately
- Use enterprise-grade setups for sensitive data

### Authentication & Authorization
- All auth-related code must be reviewed by Security Team
- Implement proper session management
- Use secure password hashing (bcrypt/Argon2)
- Implement rate limiting for auth endpoints

### Version Control
- All AI-assisted changes must be committed with [AI-Assist] tag
- Include Cursor version in commit messages
- Document AI-generated code in commit descriptions
- Require peer review for all AI-assisted commits
- Maintain clear separation of AI and human changes

### AI Model Management
- Use only approved Cursor versions
- Document model version in project metadata
- Review model updates before adoption
- Test new models in non-production
- Monitor model behavior changes

## Development Guidelines

### Code Quality
- Follow project's coding standards
- Write unit tests for new features
- Document public APIs and interfaces
- Use TypeScript for type safety
- Implement proper error handling

### Architecture
- Follow microservices best practices
- Implement proper logging and monitoring
- Use dependency injection
- Follow SOLID principles
- Implement proper error boundaries

### Performance
- Implement caching where appropriate
- Optimize database queries
- Use proper indexing
- Implement rate limiting
- Monitor resource usage

## Review Process

### Code Review Requirements
- All changes require at least one reviewer
- Security-sensitive changes require Security Team review
- Performance-critical changes require Performance Team review
- All tests must pass before merge

### Documentation
- Update README.md for significant changes
- Document API changes
- Update security documentation
- Maintain changelog
- Document AI-assisted changes

## Emergency Procedures

### Security Incidents
1. Immediately stop using Cursor
2. Report to Security team
3. Document the incident
4. Review affected files
5. Update security rules

### Production Issues
1. Assess impact
2. Notify stakeholders
3. Document the issue
4. Implement fixes
5. Update monitoring

### Model Issues
1. Document unexpected behavior
2. Report to Cursor support
3. Consider model rollback
4. Update team guidelines
5. Review affected code 