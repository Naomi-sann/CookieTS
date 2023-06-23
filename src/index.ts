interface CookieExpire {
    readonly unit?: 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year';
    readonly duration: number;
}

class Cookie {
    static all(): Record<'key' | 'value', string>[] {
        if (!document.cookie) return [];

        const cookies = document.cookie.split("; ");

        return cookies.map(c => {
            const cke = c.split('=');
            return { key: cke[0], value: cke[1] }
        });
    }
    static get(key: string): { value: string } | undefined {
        return this.all().find(c => c.key === key);
    }
    static set(key: string, value: string, expire: CookieExpire): void {
        const date = new Date();

        let expireDate = 0;

        const { unit = 'millisecond', duration } = expire;

        switch (unit) {
            case 'millisecond': expireDate = duration;
                break;
            case 'second': expireDate = 1000 * duration;
                break;
            case 'minute': expireDate = 1000 * 60 * duration;
                break;
            case 'hour': expireDate = 1000 * 60 * 60 * duration;
                break;
            case 'day': expireDate = 1000 * 60 * 60 * 24 * duration;
                break;
            case 'month': expireDate = 1000 * 60 * 60 * 24 * 30 * duration;
                break;
            case 'year': expireDate = 1000 * 60 * 60 * 24 * 30 * 12 * duration;
                break;
            default: throw new Error('invalid date unit!');
        }

        date.setTime(date.getTime() + expireDate);

        document.cookie = key + "=" + value + ";" + 'expires=' + date.toUTCString() + ";path=/";
    }
    static remove(key: string) {
        document.cookie = `${key}=;expires=${new Date(0)};path=/`;
    }
    static clear() {
        const cookies = this.all();

        for (const cookie of cookies) {
            console.log(cookie);

            this.remove(cookie.key);
        }
    }
}
