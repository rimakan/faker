/*
 * This file is automatically generated.
 * Run 'pnpm run generate:locales' to update.
 */

import { Faker } from '../faker';
import en from '../locales/en';
import es from '../locales/es';

const faker = new Faker({
  locale: 'es',
  localeFallback: 'en',
  locales: {
    es,
    en,
  },
});

export = faker;
