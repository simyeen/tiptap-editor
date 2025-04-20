import clsx, {ClassValue} from 'clsx';
import {extendTailwindMerge} from 'tailwind-merge';

const extendConfig = {};

/**
 * Merges Tailwind classes with conflict resolution.
 *
 * @param {...ClassValue[]} classNames - Class names to merge.
 * @returns {string} Merged class string.
 */
export function cn(...classNames: ClassValue[]): string {
  return extendTailwindMerge(extendConfig)(clsx(classNames));
}
