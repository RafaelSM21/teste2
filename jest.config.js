module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/_tests_/e2e/**/*.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  globalSetup: '<rootDir>/jest.e2e.setup.ts',
  globalTeardown: '<rootDir>/jest.e2e.teardown.ts',
};