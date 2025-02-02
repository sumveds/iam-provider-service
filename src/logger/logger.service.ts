import { Logger, Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService extends Logger {
  constructor(context?: string) {
    super(context);
  }

  log(message: any, context?: string) {
    super.log(this.formatMessage(message, context || this.context), context);
  }

  error(message: any, trace?: string, context?: string) {
    super.error(
      this.formatMessage(message, context || this.context),
      trace,
      context,
    );
  }

  warn(message: any, context?: string) {
    super.warn(this.formatMessage(message, context || this.context), context);
  }

  debug(message: any, context?: string) {
    super.debug(this.formatMessage(message, context || this.context), context);
  }

  verbose(message: any, context?: string) {
    super.verbose(
      this.formatMessage(message, context || this.context),
      context,
    );
  }

  private formatMessage(message: any, context?: string): string {
    const timestamp = new Date().toISOString();
    const contextString = context ? `[${context}] ` : '';
    return `[${timestamp}] ${contextString}${message}`;
  }
}
