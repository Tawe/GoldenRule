# Request Handling Guidelines

## Test Generation

### Unit Tests
- Generate tests for all public methods
- Include edge cases and error conditions
- Mock external dependencies
- Test both success and failure paths
- Follow project's testing patterns

### Integration Tests
- Test component interactions
- Verify data flow
- Test error handling
- Include setup and teardown
- Document test prerequisites

### Security Tests
- Test authentication flows
- Verify authorization rules
- Test input validation
- Check error handling
- Include penetration test cases

## AI-Assisted Development

### Code Generation
- Review all AI-generated code
- Understand the generated code fully
- Test all generated functionality
- Document AI-assisted changes
- Follow project coding standards

### Refactoring
- Review all suggested changes
- Test after each refactoring step
- Document architectural decisions
- Maintain backward compatibility
- Update affected tests

### Testing
- Review generated test cases
- Ensure proper coverage
- Test edge cases manually
- Verify test assertions
- Document test scenarios

## Compliance Checklist

### Before Using AI
- [ ] Verify Cursor version is approved
- [ ] Check model settings are compliant
- [ ] Review context window contents
- [ ] Ensure sensitive files are closed
- [ ] Verify enterprise mode is active

### During Development
- [ ] Monitor context window size
- [ ] Track file access patterns
- [ ] Document all AI interactions
- [ ] Review generated code
- [ ] Test all changes

### Before Committing
- [ ] Tag with [AI-Assist]
- [ ] Include Cursor version
- [ ] Document AI changes
- [ ] Get peer review
- [ ] Verify security compliance

### After Changes
- [ ] Update documentation
- [ ] Clear context windows
- [ ] Log out of session
- [ ] Report any issues
- [ ] Update monitoring

## Scaffolding

### New Components
- Follow project structure
- Include necessary imports
- Add type definitions
- Include basic tests
- Add documentation

### New Features
- Create feature branch
- Update documentation
- Add necessary tests
- Include migration scripts
- Update changelog

### New Services
- Set up service structure
- Add configuration
- Include monitoring
- Add logging
- Set up CI/CD

## Dependency Management

### Adding Dependencies
1. Check security rules
2. Verify compatibility
3. Check license
4. Review maintenance status
5. Get Tech Lead approval

### Updating Dependencies
1. Check changelog
2. Review breaking changes
3. Update tests
4. Verify compatibility
5. Update documentation

### Removing Dependencies
1. Check usage
2. Update imports
3. Remove from package.json
4. Update documentation
5. Clean up unused code

## Code Generation

### API Endpoints
- Follow REST conventions
- Include validation
- Add error handling
- Include documentation
- Add tests

### Database Models
- Define schemas
- Add indexes
- Include validation
- Add migrations
- Document relationships

### UI Components
- Follow design system
- Include accessibility
- Add responsive design
- Include error states
- Add loading states

## Security Considerations

### Authentication
- Use secure protocols
- Implement rate limiting
- Add session management
- Include password policies
- Add 2FA support

### Authorization
- Implement RBAC
- Add permission checks
- Include audit logging
- Add role management
- Document access rules

### Data Protection
- Encrypt sensitive data
- Implement backup
- Add data validation
- Include sanitization
- Document security measures

## AI-Specific Guidelines

### Context Management
- Limit file scope for suggestions
- Close sensitive files when using AI
- Monitor context windows
- Clear context after sensitive operations
- Document context boundaries

### Prompt Engineering
- Use generic language
- Avoid sensitive details
- Sanitize external data
- Review context before sharing
- Document prompt patterns

### Code Review
- Tag AI-assisted changes
- Note Cursor version
- Document generated code
- Require peer review
- Test thoroughly

### Security Review
- Review all AI suggestions
- Verify package security
- Check for vulnerabilities
- Validate external APIs
- Document security decisions 