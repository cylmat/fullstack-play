
import { createStore } from 'tinybase'
import { createSessionPersister } from 'tinybase/persisters/persister-browser';

/**
 * LocalStorage: Persiste after browser close
 */

export class Storage {

    private static db = createStore()

    // Storage

    public static setLocalItem(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value))
    }

    public static getLocalItem<T>(key: string): T | null {
        const value = localStorage.getItem(key)
        return value ? (JSON.parse(value) as T) : null
    }

    public static removeLocalItem(key: string): void {
        localStorage.removeItem(key)
    }

    public static clearLocal(): void {
        localStorage.clear()
    }

    // Db

    public static setTmpDbValue(key: string, value: any): void {
        this.db.setValue(key, value)
    }

    public static getTmpDbValue<T>(key: string): T | null {
        return this.db.getValue(key) as T | null
    }

    public static removeTmpDbValue(key: string): void {
        this.db.delValue(key)
    }

    public static clearTmpDb(): void {
        this.db.delValues()
    }
}