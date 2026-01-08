import { en } from './locales/en';
import { pl } from './locales/pl';
import { es } from './locales/es';
import { Language, Dictionary } from './types';

export const dictionaries: Record<Language, Dictionary> = { en, pl, es };
export type { Language, Dictionary };