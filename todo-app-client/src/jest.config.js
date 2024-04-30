// module.exports = {
//   testEnvironment: 'node',
//   transform: {
//     '^.+\\.jsx?$': 'babel-jest',
//   },
//   moduleNameMapper: {},
//   moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
//   esModuleInterop: true,
// };
export default {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
};
