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
      label: 'Primeros Pasos',
      items: [
        'getting-started/installation',
        'getting-started/first-steps',
        'getting-started/basic-tutorial',
      ],
    },
    {
      type: 'category',
      label: 'Guía de Usuario',
      items: ['user-guide/intro'],
    },
    'faq',
    'support',
  ],
};

export default sidebars;
