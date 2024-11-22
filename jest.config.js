module.exports = {
  preset: 'react-native',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  transformIgnorePatterns: [
    "node_modules/(?!react-native|@react-native|@react-navigation|react-native-element-dropdown)"
  ]
};