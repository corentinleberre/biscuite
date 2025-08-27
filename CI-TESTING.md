# CI Testing Setup

This document explains how to run Playwright tests in Continuous Integration (CI) environments.

## GitHub Actions Workflows

### 1. `playwright.yml` - Basic Playwright Testing
- **Triggers**: Push/PR to main/master branches
- **Purpose**: Simple Playwright test execution
- **Features**:
  - Installs Node.js 18
  - Installs Playwright with system dependencies
  - Runs all tests
  - Uploads test reports as artifacts

### 2. `test-and-build.yml` - Multi-Node Testing
- **Triggers**: Push/PR to main/master branches
- **Purpose**: Test across multiple Node.js versions
- **Features**:
  - Matrix testing (Node.js 18.x, 20.x)
  - Type checking with build step
  - E2E testing with Playwright
  - Artifact upload for each Node version

### 3. `docker-test.yml` - Docker-based Testing
- **Triggers**: Push/PR to main/master branches
- **Purpose**: Consistent testing environment using Docker
- **Features**:
  - Uses official Playwright Docker image
  - Isolated test environment
  - Volume mounting for test results

### 4. `comprehensive-ci.yml` - Full CI Pipeline
- **Triggers**: Push/PR to main/master branches
- **Purpose**: Complete CI workflow with multiple stages
- **Features**:
  - **Lint & Build**: Type checking and code formatting
  - **Matrix Testing**: Separate jobs for Chromium and Firefox
  - **Docker Testing**: Parallel Docker-based testing
  - **Artifact Management**: Organized test result uploads

## Local CI Testing

### Test CI Configuration Locally
```bash
# Simulate CI environment
npm run test:ci

# Run tests in Docker (like CI)
npm run test:docker
```

## CI-Specific Configurations

### Playwright Configuration for CI
- **Retries**: 2 retries on CI (0 locally)
- **Workers**: Single worker on CI (parallel locally)
- **Reporter**: GitHub Actions reporter + HTML
- **Screenshots**: Captured on failure
- **Videos**: Retained on failure
- **Traces**: Captured on retry

### Environment Variables
- `CI=true`: Enables CI-specific settings
- `NODE_ENV=test`: Test environment configuration

## Test Artifacts

All CI workflows upload the following artifacts:
- **Playwright Reports**: HTML test reports
- **Test Results**: Raw test output and traces
- **Screenshots**: Failure screenshots
- **Videos**: Failure recordings

### Artifact Retention
- **Retention Period**: 30 days
- **Access**: Available in GitHub Actions run details

## Docker Testing

### Dockerfile.test
- Based on official Playwright image
- Includes all system dependencies
- Pre-installed browsers
- Consistent testing environment

### docker-compose.test.yml
- Orchestrates test container
- Volume mounts for results
- Network isolation

## Monitoring Test Results

### GitHub Actions Interface
1. Navigate to **Actions** tab in your repository
2. Select the workflow run
3. View test results in job logs
4. Download artifacts for detailed reports

### Test Reports
- **HTML Reports**: Interactive test results
- **GitHub Annotations**: Inline PR comments
- **Failure Details**: Screenshots, videos, traces

## Troubleshooting CI

### Common Issues
1. **Browser Dependencies**: Use `--with-deps` flag
2. **Memory Issues**: Reduce parallel workers on CI
3. **Timeout Issues**: Increase webServer timeout
4. **Flaky Tests**: Enable retries and debug traces

### Debug Commands
```bash
# Run with debug output
DEBUG=pw:api npm run test:ci

# Generate detailed trace
npx playwright test --trace=on

# Show test report
npx playwright show-report
```

## Performance Optimization

### CI Speed Optimizations
- **Caching**: npm dependencies cached
- **Matrix Strategy**: Parallel browser testing
- **Selective Installation**: Only required browsers
- **Fail Fast**: Disabled for comprehensive coverage

### Resource Management
- **Timeout**: 60-minute job timeout
- **Workers**: Single worker prevents resource conflicts
- **Memory**: Optimized for GitHub Actions runners

## Security Considerations

- No secrets required for basic testing
- Supabase configurations handled via environment variables
- Docker images use official Microsoft Playwright base
- Artifact uploads exclude sensitive data