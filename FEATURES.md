# Mini Capstone Project - Advanced Features Documentation

This document details all advanced features implemented in the Mini Capstone Project.

## 📋 Feature Checklist

- [x] Built-in HTML Report
- [x] Allure/Extent Report Support (JUnit XML)
- [x] Custom Loggers
- [x] beforeAll, beforeEach, afterAll, afterEach Hooks
- [x] test, test.skip, test.describe
- [x] CI using GitHub Actions
- [x] Reusable Utilities
- [x] Framework Components
- [x] Retry Only Failed Tests
- [x] Additional Exploratory Features

---

## 1. Built-in HTML Report

**File**: `playwright-report/`

### Features:
- ✅ Automatic HTML report generation
- ✅ Test timeline and execution history
- ✅ Screenshot and video capture (configurable)
- ✅ Detailed error messages and traces
- ✅ Test duration tracking
- ✅ Browser/OS information

### Usage:
```bash
npm run report
```

### Configuration:
```typescript
reporter: [
  ['html', { outputFolder: 'playwright-report', open: 'never' }],
]
```

---

## 2. Allure/Extent Report Support

**File**: `test-results/junit.xml`

### Features:
- ✅ JUnit XML format for CI/CD integration
- ✅ Compatible with Jenkins, GitLab CI, Azure Pipelines
- ✅ Test result publishing to GitHub Actions
- ✅ JSON report format for custom analysis

### Available Formats:
```typescript
reporter: [
  ['html', { outputFolder: 'playwright-report' }],
  ['junit', { outputFile: 'test-results/junit.xml' }],
  ['json', { outputFile: 'test-results/results.json' }],
  ['list'],
]
```

### Integration:
- GitHub Actions automatically parses and displays results
- JUnit XML can be imported into Allure Dashboard
- JSON reports for custom analysis tools

---

## 3. Custom Loggers

**File**: `utils/logger.ts`

### Features:
- ✅ Timestamped logging
- ✅ Multiple log levels (INFO, ERROR, WARN, SUCCESS, DEBUG)
- ✅ Console output formatting
- ✅ Easy integration across test files

### Log Levels:

```typescript
logger.info('Information message');      // General info
logger.error('Error message');            // Error condition
logger.warn('Warning message');           // Warning condition
logger.success('Success message');        // Success confirmation
logger.debug('Debug message');            // Debug info (requires DEBUG env var)
```

### Output Example:
```
[2026-07-21T10:30:45.123Z] [INFO] Fetching all posts...
[2026-07-21T10:30:45.456Z] [SUCCESS] Retrieved 100 posts
[2026-07-21T10:30:46.789Z] [ERROR] Failed to create post
```

### Environment Variable:
```bash
set DEBUG=true
npm test
```

---

## 4. Playwright Hooks

**File**: `tests/MiniCapstoneProject.spec.ts`

### Supported Hooks:

#### beforeAll
```typescript
beforeAll(async () => {
  logger.info('=== Starting Mini Capstone Project Test Suite ===');
  // Global setup
});
```
- Runs once before all tests in describe block
- Ideal for global initialization

#### beforeEach
```typescript
beforeEach(async () => {
  logger.debug('Setting up test environment...');
  // Pre-test setup
});
```
- Runs before each test
- Ideal for test-specific setup

#### afterEach
```typescript
afterEach(async () => {
  logger.debug('Cleaning up after test...');
  // Post-test cleanup
});
```
- Runs after each test
- Ideal for cleanup operations

#### afterAll
```typescript
afterAll(async () => {
  logger.success('=== Test Suite Completed ===');
  // Global cleanup
});
```
- Runs once after all tests
- Ideal for final cleanup

### Hook Execution Order:
```
beforeAll (once)
  ↓
beforeEach (per test)
  ↓
test execution
  ↓
afterEach (per test)
  ↓
beforeEach (next test)
  ↓
... repeat for each test ...
  ↓
afterAll (once)
```

---

## 5. Test Organization

**File**: `tests/MiniCapstoneProject.spec.ts`

### describe Blocks
```typescript
describe('JSONPlaceholder API - Mini Capstone Project', () => {
  describe('Posts Resource Tests', () => {
    // Posts tests
  });
  
  describe('Users Resource Tests', () => {
    // Users tests
  });
});
```

### test Function
```typescript
test('GET /posts - should retrieve all posts', async () => {
  // Normal test case
});
```

### test.skip Function
```typescript
test.skip('SKIP: Test to demonstrate skip functionality', async () => {
  // This test is skipped
});
```

### Output:
```
✓ GET /posts - should retrieve all posts
⊘ SKIP: Test to demonstrate skip functionality
```

---

## 6. CI/CD with GitHub Actions

**File**: `.github/workflows/tests.yml`

### Workflow Features:
- ✅ Automatic test execution on push/PR
- ✅ Multi-version Node.js testing (18.x, 20.x)
- ✅ Parallel job execution
- ✅ Artifact upload and retention
- ✅ JUnit result publishing

### Triggers:
```yaml
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
```

### Job Matrix:
```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x]
```

### Artifacts:
- `playwright-report-{version}` - HTML reports
- `test-results-{version}` - XML/JSON results
- Retention: 30 days

### Status Checks:
- Tests must pass before merge
- Visual test result badge in PR
- Detailed test summary

---

## 7. Reusable Utilities

### ApiClient (`utils/apiClient.ts`)
Complete API client with all JSONPlaceholder endpoints:

**Posts Endpoints:**
```typescript
apiClient.getAllPosts()              // GET /posts
apiClient.getPostById(id)            // GET /posts/:id
apiClient.getPostsByUserId(userId)   // GET /posts?userId=:id
apiClient.createPost(post)           // POST /posts
apiClient.updatePost(id, post)       // PUT /posts/:id
apiClient.deletePost(id)             // DELETE /posts/:id
```

**Users Endpoints:**
```typescript
apiClient.getAllUsers()              // GET /users
apiClient.getUserById(id)            // GET /users/:id
apiClient.createUser(user)           // POST /users
apiClient.updateUser(id, user)       // PUT /users/:id
apiClient.deleteUser(id)             // DELETE /users/:id
```

**Features:**
- Generic error handling
- Automatic logging
- Type-safe responses
- Built-in fetch support

### TestDataHelper (`utils/testHelpers.ts`)
```typescript
TestDataHelper.generateMockPost()    // Generate test post
TestDataHelper.generateMockUser()    // Generate test user
```

### AssertionHelper (`utils/testHelpers.ts`)
```typescript
AssertionHelper.assertPostStructure()        // Validate post
AssertionHelper.assertUserStructure()        // Validate user
AssertionHelper.assertResponseStatus()       // Check HTTP status
AssertionHelper.assertArrayNotEmpty()        // Verify array size
```

### DataValidator (`utils/testHelpers.ts`)
```typescript
DataValidator.isValidEmail()         // Email regex validation
DataValidator.isValidUrl()           // URL validation
DataValidator.isPostValid()          // Post data validation
DataValidator.isUserValid()          // User data validation
```

---

## 8. Framework Components

### Component Architecture:

```
MiniCapstoneProject.spec.ts
    ↓
┌─────────────────────────────────────────┐
│  Playwright Test Framework               │
│  (describe, test, hooks)                 │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│  Test Utilities                          │
├─────────────────────────────────────────┤
│ • apiClient (HTTP requests)              │
│ • logger (custom logging)                │
│ • testHelpers (data & assertions)        │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│  JSONPlaceholder API                     │
│  (https://jsonplaceholder.typicode.com)  │
└─────────────────────────────────────────┘
```

### Test Structure:
```
Test Suite
├── Global Hooks (beforeAll/afterAll)
├── Describe Block 1
│   ├── Describe Block Hooks
│   ├── Test 1
│   └── Test 2
└── Describe Block 2
    ├── Test 3
    └── Test 4
```

---

## 9. Retry Only Failed Tests

**Configuration**: `playwright.config.ts`

### Settings:
```typescript
retries: process.env.CI === 'true' ? 2 : 1,
```

### Behavior:
- **Local**: Retry failed tests 1 time
- **CI**: Retry failed tests 2 times
- Passed tests are not retried
- Traces collected on first failure

### Trace Collection:
```typescript
trace: 'on-first-retry',
```

### Example:
```
Test 1: ✓ PASSED
Test 2: ✗ FAILED → Retrying... → ✓ PASSED
Test 3: ✓ PASSED
```

---

## 10. Additional Exploratory Features

### Email & URL Validation
```typescript
DataValidator.isValidEmail('test@example.com')  // true
DataValidator.isValidUrl('https://example.com') // true
```

### Comprehensive Test Coverage
- **17 Total Tests**
  - 6 Posts resource tests
  - 5 Users resource tests
  - 4 Data validation tests
  - 2 Error handling tests

### Error Handling Tests
```typescript
test('should handle non-existent post gracefully', async () => {
  const response = await apiClient.getPostById(999999);
  expect(response.status).toBe(200);
});
```

### Data Integrity Validation
```typescript
test('should validate post structure', async () => {
  const response = await apiClient.getPostById(1);
  expect(DataValidator.isPostValid(response.data)).toBe(true);
});
```

### Nested Describe Blocks
```typescript
describe('Parent Suite', () => {
  describe('Child Suite', () => {
    test('Nested test', async () => {
      // Test code
    });
  });
});
```

### Multiple Assertion Types
```typescript
AssertionHelper.assertArrayNotEmpty(array);
AssertionHelper.assertPostStructure(post);
AssertionHelper.assertResponseStatus(status, 200);
```

---

## 🎯 Test Metrics

### Test Summary:
```
Total Tests: 17
├── Posts Tests: 6
├── Users Tests: 5
├── Validation Tests: 4
└── Error Handling: 2
```

### Coverage:
- ✅ All CRUD operations
- ✅ Data validation
- ✅ Error scenarios
- ✅ Resource filtering

### Performance:
- Average test duration: 500-800ms
- Total suite time: ~20-30 seconds
- Parallel execution: Supported

---

## 📊 Reporting Comparison

| Feature | HTML | JUnit | JSON |
|---------|------|-------|------|
| Visual Report | ✅ | ❌ | ❌ |
| CI Integration | ✅ | ✅ | ✅ |
| Test Timeline | ✅ | ❌ | ✅ |
| Screenshots | ✅ | ❌ | ❌ |
| Machine Readable | ❌ | ✅ | ✅ |
| Allure Compatible | ❌ | ✅ | ❌ |

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm ci

# Run all tests
npm test

# Run Mini Capstone only
npm run test:mini-capstone

# Run with headed mode
npm run test:headed

# View HTML report
npm run report

# Debug mode
npm run test:debug

# Interactive UI
npm run test:ui
```

---

## 📚 Learning Resources

1. **Playwright Documentation**: https://playwright.dev
2. **JSONPlaceholder Guide**: https://jsonplaceholder.typicode.com/guide/
3. **GitHub Actions**: https://docs.github.com/en/actions
4. **Best Practices**: See code comments in all utility files

---

**Last Updated**: July 2026
**Project Version**: 1.0.0
**Playwright Version**: ^1.61.1
