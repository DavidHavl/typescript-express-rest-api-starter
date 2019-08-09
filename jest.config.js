module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
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
    '**/test/**/*.(test|spec).(ts|js)'
  ],
  testEnvironment: 'node',
  "moduleNameMapper": {
    "@/(.*)$": "<rootDir>/src/$1"
  },
  preset: 'ts-jest',
}
