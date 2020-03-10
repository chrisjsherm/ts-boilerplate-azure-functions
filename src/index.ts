import { logger } from './core/logger.service';

logger.info('Entered index.ts');

/**
 * Sum two numbers.
 *
 * @param {number} a first number for summation.
 * @param {number} b second number for summation.
 *
 * @returns {number} Sum of parameters.
 */
export function sum(a, b): number {
  return a + b;
}
