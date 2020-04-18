import { configure as configureLogger, getLogger } from 'log4js';

const logLayoutConfig = {
  // Include date, log level, category, depth, line number, log data,
  // and a newline for each log.
  // https://log4js-node.github.io/log4js-node/layouts.html#pattern-format
  type: 'pattern',
  pattern: '%d %p %f{1}:%l %m%n',
};

// Initialize log4js logger.
configureLogger({
  appenders: {
    stdout: {
      type: 'stdout',
      layout: logLayoutConfig,
    },
    dateFile: {
      type: 'dateFile',
      layout: logLayoutConfig,
      filename: './logs/app.log',
      compress: true,
      alwaysIncludePattern: true,
      keepFileExt: true,
    },
  },
  categories: {
    default: {
      appenders: ['stdout', 'dateFile'],
      level: 'info',
      enableCallStack: true,
    },
  },
});

// Get log4js logger instance.
const _logger = getLogger();

// Set default log level.
_logger.level = 'debug';

// Export the logger for use.
export const logger = _logger;
