// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const prism = require('prism-react-renderer')
const lightCodeTheme = prism.themes.github
const darkCodeTheme = prism.themes.dracula

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Orium's Accelerator",
  tagline: 'Accelerator Documentation',
  url: 'https://localhost:60001',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.svg',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          /*
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          */
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Accelerator Documentation',
        logo: {
          alt: "Orium's Accelerator Docs",
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'getting_started/intro',
            position: 'left',
            label: 'Getting Started',
          },
          {
            type: 'doc',
            docId: 'essentials/project_structure',
            position: 'left',
            label: 'Essentials',
          },
          {
            type: 'doc',
            docId: 'design/theme',
            position: 'left',
            label: 'Design',
          },
          {
            type: 'doc',
            docId: 'integrations/overview',
            position: 'left',
            label: 'Integrations',
          },
          {
            type: 'doc',
            docId: 'build-and-deploy/development-process',
            position: 'left',
            label: 'Build & Deploy',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [],
        copyright: `Built with Docusaurus`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}

module.exports = config
