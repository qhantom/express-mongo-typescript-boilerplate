/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/setEnvVars.js'],
  // transformIgnorePatterns: ['<rootDir>/node_modules/(?!passport-jwt)'],
}
