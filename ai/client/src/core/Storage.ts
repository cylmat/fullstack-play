
import { createStore } from 'tinybase'

export class Storage {

    private static db = createStore()

    // Storage

    public static setItem(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value))
    }

    public static getItem<T>(key: string): T | null {
        const value = localStorage.getItem(key)
        return value ? (JSON.parse(value) as T) : null
    }

    public static removeItem(key: string): void {
        localStorage.removeItem(key)
    }

    public static clear(): void {
        localStorage.clear()
    }

    // Db

    public static setDbValue(key: string, value: any): void {
        this.db.setValue(key, value)
    }

    public static getDbValue<T>(key: string): T | null {
        return this.db.getValue(key) as T | null
    }

    public static removeDbValue(key: string): void {
        this.db.delValue(key)
    }

    public static clearDb(): void {
        this.db.delValues()
    }
}