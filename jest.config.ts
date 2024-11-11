import type { Config } from 'jest'

/** Return a Jest config tailored to a pnpm-workspace tree w/ Next.js `apps`, `packages`, etc.
 *
 * @remarks These are just our best guesses, feel free to experiment and propose changes as needed.
 * @see https://jestjs.io/docs/configuration
 */
export default async (): Promise<Config> => {
  return {
    verbose: true,
    clearMocks: true,
    collectCoverage: false,
    collectCoverageFrom: [
      '<rootDir>/apps/**/*.{ts,tsx}',
      '<rootDir>/packages/**/*.{ts,tsx}',
      '<rootDir>/scripts/**/*.{ts,tsx}',
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testEnvironment: 'jsdom',
    projects: [
      /// Accelerator Starter Kit Test Suites
      {
        displayName: 'starterkit-bigcommerce',
        testMatch: [
          '<rootDir>/apps/starterkit-bigcommerce/**/*.(spec|test).ts',
        ],
      },
      {
        displayName: 'starterkit-commercetools',
        testMatch: [
          '<rootDir>/apps/starterkit-commercetools/**/*.(spec|test).ts',
        ],
      },
      {
        displayName: 'starterkit-commercetools-b2b',
        testMatch: [
          '<rootDir>/apps/starterkit-commercetools-b2b/**/*.(spec|test).ts',
        ],
      },
      {
        displayName: 'starterkit-elasticpath',
        testMatch: [
          '<rootDir>/apps/starterkit-elasticpath/**/*.(spec|test).ts',
        ],
      },

      /// Doc Site Test Suites
      // { displayName: 'storybook', testMatch: ['<rootDir>/apps/storybook/**/*.(spec|test).ts'] },
      {
        displayName: 'checkout-app',
        testMatch: ['<rootDir>/apps/checkout-app/**/*.(spec|test).ts'],
      },

      /// Script Package Test Suites
      {
        displayName: 'scripts/amplience-cli',
        testMatch: ['<rootDir>/scripts/amplience-cli/**/*.(spec|test).ts'],
      },
      {
        displayName: 'scripts/bigcommerce-algolia-sync-gcf',
        testMatch: [
          '<rootDir>/scripts/bigcommerce-algolia-sync-gcf/**/*.(spec|test).ts',
        ],
      },
      {
        displayName: 'scripts/bigcommerce-bloomreach-sync-gcf',
        testMatch: [
          '<rootDir>/scripts/bigcommerce-bloomreach-sync-gcf/**/*.(spec|test).ts',
        ],
      },
      {
        displayName: 'scripts/bigcommerce-utils',
        testMatch: ['<rootDir>/scripts/bigcommerce-utils/**/*.(spec|test).ts'],
      },
      {
        displayName: 'scripts/cli-app',
        testMatch: ['<rootDir>/scripts/cli-app/**/*.(spec|test).ts'],
      },
      {
        displayName: 'scripts/commercetools-algolia-sync-gcf',
        testMatch: [
          '<rootDir>/scripts/commercetools-algolia-sync-gcf/**/*.(spec|test).ts',
        ],
      },
      {
        displayName: 'scripts/commercetools-bloomreach-sync-gcf',
        testMatch: [
          '<rootDir>/scripts/commercetools-bloomreach-sync-gcf/**/*.(spec|test).ts',
        ],
      },
      {
        displayName: 'scripts/commercetools-utils',
        testMatch: [
          '<rootDir>/scripts/commercetools-utils/**/*.(spec|test).ts',
        ],
      },
      {
        displayName: 'scripts/contentful-cli-app',
        testMatch: ['<rootDir>/scripts/contentful-cli-app/**/*.(spec|test).ts'],
      },
      {
        displayName: 'scripts/contentstack-cli-app',
        testMatch: [
          '<rootDir>/scripts/contentstack-cli-app/**/*.(spec|test).ts',
        ],
      },
      {
        displayName: 'scripts/elasticpath-utils',
        testMatch: ['<rootDir>/scripts/elasticpath-utils/**/*.(spec|test).ts'],
      },

      /// @oriuminc Package Test Suites
      {
        displayName: '@oriuminc/algolia',
        testMatch: ['<rootDir>/packages/algolia/**/*.(spec|test).ts'],
      },
      {
        displayName: '@oriuminc/amplience',
        testMatch: ['<rootDir>/packages/amplience/**/*.(spec|test).ts'],
      },
      {
        displayName: '@oriuminc/analytics',
        testMatch: ['<rootDir>/packages/analytics/**/*.(spec|test).ts'],
      },
      {
        displayName: '@oriuminc/base',
        testMatch: ['<rootDir>/packages/base/**/*.(spec|test).ts'],
      },
      {
        displayName: '@oriuminc/bigcommerce',
        testMatch: ['<rootDir>/packages/bigcommerce/**/*.(spec|test).ts'],
      },
      {
        displayName: '@oriuminc/bloomreach',
        testMatch: ['<rootDir>/packages/bloomreach/**/*.(spec|test).ts'],
      },
      {
        displayName: '@oriuminc/chakra',
        testMatch: ['<rootDir>/packages/chakra/**/*.(spec|test).ts'],
      },
      {
        displayName: '@oriuminc/checkout',
        testMatch: ['<rootDir>/packages/checkout/**/*.(spec|test).ts'],
      },
      {
        displayName: '@oriuminc/cms-generic',
        testMatch: ['<rootDir>/packages/cms-generic/**/*.(spec|test).ts'],
      },
      {
        displayName: '@oriuminc/commerce-generic',
        testMatch: ['<rootDir>/packages/commerce-generic/**/*.(spec|test).ts'],
      },
      {
        displayName: '@oriuminc/commercetools',
        testMatch: ['<rootDir>/packages/commercetools/**/*.(spec|test).ts'],
      },
      {
        displayName: '@oriuminc/commercetools-b2b',
        testMatch: ['<rootDir>/packages/commercetools-b2b/**/*.(spec|test).ts'],
      },
      {
        displayName: '@oriuminc/contentful',
        testMatch: ['<rootDir>/packages/contentful/**/*.(spec|test).ts'],
      },
      {
        displayName: '@oriuminc/contentstack',
        testMatch: ['<rootDir>/packages/contentstack/**/*.(spec|test).ts'],
      },
      {
        displayName: '@oriuminc/create-app',
        testMatch: ['<rootDir>/packages/create-app/**/*.(spec|test).ts'],
      },
      {
        displayName: '@oriuminc/elasticpath',
        testMatch: ['<rootDir>/packages/elasticpath/**/*.(spec|test).ts'],
      },
      {
        displayName: '@oriuminc/eslint-config',
        testMatch: ['<rootDir>/packages/eslint-config/**/*.(spec|test).ts'],
      },
      {
        displayName: '@oriuminc/store-locator',
        testMatch: ['<rootDir>/packages/store-locator/**/*.(spec|test).ts'],
      },
      {
        displayName: '@oriuminc/stripe',
        testMatch: ['<rootDir>/packages/stripe/**/*.(spec|test).ts'],
      },
      {
        displayName: '@oriuminc/templates',
        testMatch: ['<rootDir>/packages/templates/**/*.(spec|test).ts'],
      },
      {
        displayName: '@oriuminc/terraform',
        testMatch: ['<rootDir>/packages/terraform/**/*.(spec|test).ts'],
      },
      {
        displayName: '@oriuminc/tsconfig',
        testMatch: ['<rootDir>/packages/tsconfig/**/*.(spec|test).ts'],
      },
      {
        displayName: '@oriuminc/ui',
        testMatch: ['<rootDir>/packages/ui/**/*.(spec|test).ts'],
      },

      // {
      //   displayName: 'lint',
      //   runner: 'jest-runner-eslint',
      //   testMatch: ['<rootDir>/**/*.js'],
      // },
    ],
  }
}
