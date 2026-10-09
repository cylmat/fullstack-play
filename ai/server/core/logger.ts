
export class Logger {
    public static log(message: string, channel?: string): void {
        console.log(channel ? `[${channel}] ${message}` : message);
    }

    public static info(message: string, channel?: string): void {
        console.log(channel ? `[${channel}] ${message}` : message);
    }

    public static debug(message: string, channel?: string): void {
        console.log(channel ? `[${channel}] ${message}` : message);
    }

    public static warn(message: string, channel?: string): void {
        console.log(channel ? `[${channel}] ${message}` : message);
    }

    public static error(message: string, channel?: string): void {
        console.log(channel ? `[${channel}] ${message}` : message);
    }
}
