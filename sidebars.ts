import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Guía de Usuario',
      items: [
        'user-guide/intro',
        {
          type: 'category',
          label: 'Primeros Pasos',
          items: [
            'user-guide/installation',
            'user-guide/first-steps',
            'user-guide/basic-tutorial',
          ],
        },
        'user-guide/preferences',
        'user-guide/sync',
        'user-guide/advanced',
        {
          type: 'category',
          label: 'Tutoriales',
          items: [
            'user-guide/create-a-document',
            'user-guide/create-a-page',
            'user-guide/markdown-features',
            'user-guide/deploy-your-site',
            'user-guide/congratulations',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Guía Técnica',
      items: [
        {
          type: 'category',
          label: 'Arquitectura',
          items: [
            'tech-guide/architecture/overview',
          ],
        },
        {
          type: 'category',
          label: 'API',
          items: [
            'tech-guide/api/authentication',
            'tech-guide/api/endpoints',
            'tech-guide/api/sync-and-queues',
          ],
        },
        {
          type: 'category',
          label: 'Desarrollo',
          items: [
            'tech-guide/development/setup',
            'tech-guide/development/contributing',
            'tech-guide/development/create-a-blog-post',
          ],
        },
        {
          type: 'category',
          label: 'Administración',
          items: [
            'tech-guide/admin/configuration',
            'tech-guide/admin/maintenance',
          ],
        },
      ],
    },
    'faq',
    'support',
  ],
};

export default sidebars;
