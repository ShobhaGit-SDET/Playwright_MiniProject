/**
 * Custom Logger Utility
 * Provides formatted logging for test execution
 */
declare class Logger {
    private timestamp;
    private formatMessage;
    info(message: string): void;
    error(message: string): void;
    warn(message: string): void;
    success(message: string): void;
    debug(message: string): void;
}
export declare const logger: Logger;
export {};
//# sourceMappingURL=logger.d.ts.map