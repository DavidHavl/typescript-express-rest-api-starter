module.exports = {
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.json'
    }
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testMatch: [
    '**/test/**/*.test.(ts|js)'
  ],
  testEnvironment: 'node',
  "moduleNameMapper": {
    "@/(.*)$": "<rootDir>/src/$1"
  },
}
