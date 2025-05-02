import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'GresstApp Docs',
  tagline: 'Documentación oficial de GresstApp',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://edissonfonseca.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/gresstapp-docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'EdissonFonseca', // Usually your GitHub org/user name.
  projectName: 'gresstapp-docs', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: 'https://github.com/EdissonFonseca/gresstapp-docs/edit/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/gresst-social-card.jpg',
    navbar: {
      title: 'GresstApp',
      logo: {
        alt: 'GresstApp Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Documentación',
        },
        {
          href: 'https://gresst.com',
          label: 'Gresst',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentación',
          items: [
            {
              label: 'Guía de Usuario',
              to: '/user-guide/intro',
            },
            {
              label: 'Primeros Pasos',
              to: '/getting-started/installation',
            },
            {
              label: 'FAQ',
              to: '/faq',
            },
          ],
        },
        {
          title: 'Comunidad',
          items: [
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/gresst',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/gresst',
            },
            {
              label: 'Instagram',
              href: 'https://instagram.com/gresst',
            },
          ],
        },
        {
          title: 'Más',
          items: [
            {
              label: 'Gresst',
              href: 'https://gresst.com',
            },
            {
              label: 'Soporte',
              to: '/support',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Gresst SAS. Todos los derechos reservados.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    metadata: [
      {
        name: 'description',
        content: 'Documentación oficial de GresstApp - La aplicación móvil para gestionar operaciones en el campo',
      },
      {
        name: 'keywords',
        content: 'gresst, gresstapp, documentación, guía, manual, agricultura, campo',
      },
    ],
    announcementBar: {
      id: 'support_us',
      content:
        '⭐️ Si te gusta GresstApp, ¡danos una estrella en <a target="_blank" rel="noopener noreferrer" href="https://github.com/gresst/gresstapp">GitHub</a>! ⭐️',
      backgroundColor: '#4CAF50',
      textColor: '#ffffff',
      isCloseable: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
