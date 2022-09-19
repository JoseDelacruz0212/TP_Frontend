import AES  from 'crypto-js/aes';
import { enc } from 'crypto-js';

class StorageService {
    save<T>(key: string, data: T) {
        const stringData = JSON.stringify(data as T);
        const encrypted = AES.encrypt(stringData, process.env.REACT_APP_SECRET_KEY as string).toString();
        sessionStorage.setItem(key, encrypted);
    }

    get<T>(key: string) {
        const encrypted = sessionStorage.getItem(key);

        if (!encrypted) return null;

        const stringData = AES.decrypt(encrypted, process.env.REACT_APP_SECRET_KEY as string).toString(enc.Utf8)
        return JSON.parse(stringData) as T;
    }

    clear() {
        sessionStorage.clear();
    }
}

export default new StorageService();
