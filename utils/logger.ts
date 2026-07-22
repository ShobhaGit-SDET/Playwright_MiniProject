/**
 * Custom Logger Utility
 * Provides formatted logging for test execution
 */

enum LogLevel {
  INFO = 'INFO',
  ERROR = 'ERROR',
  WARN = 'WARN',
  SUCCESS = 'SUCCESS',
  DEBUG = 'DEBUG',
}

class Logger {
  private timestamp(): string {
    return new Date().toISOString();
  }

  private formatMessage(level: LogLevel, message: string): string {
    return `[${this.timestamp()}] [${level}] ${message}`;
  }

  info(message: string): void {
    console.log(this.formatMessage(LogLevel.INFO, message));
  }

  error(message: string): void {
    console.error(this.formatMessage(LogLevel.ERROR, message));
  }

  warn(message: string): void {
    console.warn(this.formatMessage(LogLevel.WARN, message));
  }

  success(message: string): void {
    console.log(this.formatMessage(LogLevel.SUCCESS, message));
  }

  debug(message: string): void {
    if (process.env.DEBUG) {
      console.log(this.formatMessage(LogLevel.DEBUG, message));
    }
  }
}

export const logger = new Logger();
