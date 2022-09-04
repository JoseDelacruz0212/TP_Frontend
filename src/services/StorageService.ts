class StorageService {
    save<T>(key: string, data: T) {
        const stringData = JSON.stringify(data as T);
        sessionStorage.setItem(key, stringData);
    }

    get<T>(key: string) {
        const stringData = sessionStorage.getItem(key);

        if (!stringData) return null;

        return JSON.parse(stringData) as T;
    }

    clear() {
        sessionStorage.clear();
    }
}

export default new StorageService();
