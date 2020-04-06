import { logger } from './core/logger.service';

logger.info('Entered index.ts');

/**
 * Sum two numbers.
 *
 * @param a first number for summation.
 * @param b second number for summation.
 * @returns Sum of parameters.
 */
export function sum(a: number, b: number): number {
  return a + b;
}
