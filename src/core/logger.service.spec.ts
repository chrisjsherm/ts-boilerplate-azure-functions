import { logger } from './logger.service';

describe('Logger Service', () => {
  it('should be defined', () => {
    // Default log level is debug.
    expect(logger).toBeDefined();
  });
});
