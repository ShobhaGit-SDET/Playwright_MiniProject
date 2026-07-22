"use strict";
/**
 * Custom Logger Utility
 * Provides formatted logging for test execution
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel["INFO"] = "INFO";
    LogLevel["ERROR"] = "ERROR";
    LogLevel["WARN"] = "WARN";
    LogLevel["SUCCESS"] = "SUCCESS";
    LogLevel["DEBUG"] = "DEBUG";
})(LogLevel || (LogLevel = {}));
class Logger {
    timestamp() {
        return new Date().toISOString();
    }
    formatMessage(level, message) {
        return `[${this.timestamp()}] [${level}] ${message}`;
    }
    info(message) {
        console.log(this.formatMessage(LogLevel.INFO, message));
    }
    error(message) {
        console.error(this.formatMessage(LogLevel.ERROR, message));
    }
    warn(message) {
        console.warn(this.formatMessage(LogLevel.WARN, message));
    }
    success(message) {
        console.log(this.formatMessage(LogLevel.SUCCESS, message));
    }
    debug(message) {
        if (process.env.DEBUG) {
            console.log(this.formatMessage(LogLevel.DEBUG, message));
        }
    }
}
exports.logger = new Logger();
//# sourceMappingURL=logger.js.map