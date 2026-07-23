# Mini Capstone Project - JSONPlaceholder API Testing

A comprehensive Playwright test automation project demonstrating best practices in API testing with reusable components, custom logging, and CI/CD integration.

## 📋 Project Overview

This Mini Capstone project tests the JSONPlaceholder API (`https://jsonplaceholder.typicode.com/`) with a focus on:
- **Posts Resource** (`/posts`) - Create, Read, Update, Delete operations
- **Users Resource** (`/users`) - User management operations

## ✨ Key Features Implemented

### 1. **Built-in HTML Report** ✅
- Automatic HTML report generation after each test run
- View reports: `npm run report`
- Location: `./playwright-report/`

### 2. **Multiple Reporting Formats** ✅
- HTML Report (Playwright built-in)
- JUnit XML Report (for CI/CD integration)
- JSON Report (for custom analysis)
- Console List Reporter

### 3. **Custom Loggers** ✅
- Timestamped logging with different levels
- File: `utils/logger.ts`
- Supported levels: INFO, ERROR, WARN, SUCCESS, DEBUG

```typescript
logger.info('Information message');
logger.error('Error message');
logger.warn('Warning message');
logger.success('Success message');
logger.debug('Debug message'); // Requires DEBUG env var
```

### 4. **Playwright Hooks** ✅
- `beforeAll` - Global setup before test suite
- `beforeEach` - Setup before each test
- `afterEach` - Cleanup after each test
- `afterAll` - Global cleanup after all tests

### 5. **Test Organization** ✅
- `describe` blocks for logical grouping
- `test` for normal test cases
- `test.skip` for skipped tests

```typescript
describe('Posts Resource Tests', () => {
  test('GET /posts - should retrieve all posts', async () => {
    // test code
  });
  
  test.skip('SKIP: Intentionally skipped test', async () => {
    // this won't run
  });
});
```

### 6. **CI/CD with GitHub Actions** ✅
- Automatic test runs on push and pull requests
- File: `.github/workflows/tests.yml`
- Features:
  - Multi-node version testing (18.x, 20.x)
  - Artifact uploads for reports
  - JUnit test result publishing

### 7. **Reusable Utilities** ✅
- **API Client** (`utils/apiClient.ts`) - All HTTP operations
- **Test Helpers** (`utils/testHelpers.ts`) - Data generation and assertions
- **Logger** (`utils/logger.ts`) - Custom logging

### 8. **Framework Components** ✅
- **TestDataHelper** - Generate mock posts and users
- **AssertionHelper** - Common assertions and validations
- **DataValidator** - Data validation utilities
- **ApiClient** - Centralized API interactions

### 9. **Retry Failed Tests Only** ✅
- Configured in `playwright.config.ts`
- Retries: 1 (local), 2 (CI)
- Only failed tests are retried
- Traces collected on first retry

```typescript
retries: process.env.CI === 'true' ? 2 : 1,
```

### 10. **Additional Features Included** ✅
- Email validation
- URL validation
- Post and user structure validation
- Error handling tests
- Data integrity checks
- Comprehensive test documentation

## 📁 Project Structure

```
c:\Users\SC67519\PlaywrightTSJuly2026/
├── tests/
│   ├── MiniCapstoneProject.spec.ts    # Main test file
│   └── example.spec.ts                # Example test
├── utils/
│   ├── apiClient.ts                   # API client for all endpoints
│   ├── logger.ts                       # Custom logger
│   └── testHelpers.ts                  # Test data & assertions
├── .github/
│   └── workflows/
│       └── tests.yml                   # GitHub Actions CI configuration
├── playwright.config.ts               # Playwright configuration
├── package.json                        # Project dependencies & scripts
└── README.md                           # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm

### Installation

1. Clone or open the project
2. Install dependencies:
```bash
npm ci
```

3. Install Playwright browsers:
```bash
npx playwright install --with-deps
```

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run tests with UI (headed mode)
```bash
npm run test:headed
```

### Run only Mini Capstone tests
```bash
npm run test:mini-capstone
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests with interactive UI
```bash
npm run test:ui
```

### View HTML report
```bash
npm run report
```

## 📊 Test Coverage

### Posts Resource Tests (6 tests)
- ✅ GET /posts - Retrieve all posts
- ✅ GET /posts/:id - Retrieve post by ID
- ✅ GET /posts?userId=:id - Filter posts by user
- ✅ POST /posts - Create new post
- ✅ PUT /posts/:id - Update post
- ✅ DELETE /posts/:id - Delete post

### Users Resource Tests (5 tests)
- ✅ GET /users - Retrieve all users
- ✅ GET /users/:id - Retrieve user by ID
- ✅ POST /users - Create new user
- ✅ PUT /users/:id - Update user
- ✅ DELETE /users/:id - Delete user

### Data Validation Tests (4 tests)
- ✅ Email format validation
- ✅ URL format validation
- ✅ Post structure validation
- ✅ User structure validation

### Error Handling Tests (2 tests)
- ✅ Handle non-existent posts
- ✅ Handle non-existent users

**Total: 17 tests**

## 🔧 Configuration

### Playwright Config (`playwright.config.ts`)
- **Timeout**: 30 seconds per test
- **Expect Timeout**: 5 seconds
- **Retries**: 1 (local), 2 (CI)
- **Workers**: Parallel (local), 1 (CI)
- **Reporters**: HTML, JUnit, JSON, List

### Environment Variables
```bash
# Enable CI mode
set CI=true

# Enable debug logging
set DEBUG=true
```

## 📝 Custom Logger Usage

```typescript
import { logger } from '../utils/logger';

// In your tests
logger.info('Starting test');
logger.success('Test passed');
logger.warn('Potential issue');
logger.error('Test failed');
logger.debug('Debug information');
```

## 🛠 Reusable Utilities

### ApiClient
```typescript
import { apiClient } from '../utils/apiClient';

// Posts operations
const allPosts = await apiClient.getAllPosts();
const post = await apiClient.getPostById(1);
const created = await apiClient.createPost({ title: 'New' });
const updated = await apiClient.updatePost(1, { title: 'Updated' });
await apiClient.deletePost(1);

// Users operations
const allUsers = await apiClient.getAllUsers();
const user = await apiClient.getUserById(1);
const created = await apiClient.createUser({ name: 'John' });
```

### Test Data Helper
```typescript
import { TestDataHelper } from '../utils/testHelpers';

const mockPost = TestDataHelper.generateMockPost({
  title: 'Custom Title'
});

const mockUser = TestDataHelper.generateMockUser({
  email: 'custom@test.com'
});
```

### Assertion Helper
```typescript
import { AssertionHelper } from '../utils/testHelpers';

AssertionHelper.assertPostStructure(post);
AssertionHelper.assertUserStructure(user);
AssertionHelper.assertResponseStatus(200, 200);
AssertionHelper.assertArrayNotEmpty(posts);
```

### Data Validator
```typescript
import { DataValidator } from '../utils/testHelpers';

const isValidEmail = DataValidator.isValidEmail('test@example.com');
const isValidUrl = DataValidator.isValidUrl('https://example.com');
const isValidPost = DataValidator.isPostValid(post);
const isValidUser = DataValidator.isUserValid(user);
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
The project includes a complete CI/CD setup:

**Triggered on:**
- Push to main/develop branches
- Pull requests to main/develop branches

**Features:**
- Multi-node version testing
- Automatic browser installation
- Test report artifacts
- JUnit result publishing
- 30-minute timeout per job

**Artifacts uploaded:**
- HTML Report
- JUnit XML Report
- JSON Report

## 📈 Test Results

After running tests, access reports:
- **HTML Report**: `npm run report` or open `playwright-report/index.html`
- **JUnit XML**: `test-results/junit.xml`
- **JSON Results**: `test-results/results.json`

## 🎯 Best Practices Demonstrated

1. **Separation of Concerns** - API client, loggers, helpers separated
2. **Reusable Components** - Share code across tests
3. **Consistent Logging** - Trackable test execution
4. **Data Validation** - Comprehensive assertion helpers
5. **Error Handling** - Graceful error management
6. **CI/CD Integration** - Automated test execution
7. **Test Organization** - Logical grouping with describe blocks
8. **Configuration Management** - Centralized config
9. **Retry Strategy** - Smart retry on failures only
10. **Documentation** - Clear, comprehensive comments

## 🐛 Debugging

### Debug Mode
```bash
npm run test:debug
```

### UI Mode
```bash
npm run test:ui
```

### Enable Debug Logging
```bash
set DEBUG=true
npm test
```

### View Traces
Playwright automatically collects traces on first retry. View them in the HTML report.

## 📖 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [JSONPlaceholder Guide](https://jsonplaceholder.typicode.com/guide/)
- [Playwright Test Reporters](https://playwright.dev/docs/test-reporters)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 📞 Support

For issues or questions:
1. Check the HTML report for detailed test results
2. Enable debug mode for verbose logging
3. Review test traces in the report
4. Check GitHub Actions workflow logs

## 📄 License

ISC

---

**Last Updated**: July 2026
**Playwright Version**: ^1.61.1
**Node Version**: 18.x, 20.x
