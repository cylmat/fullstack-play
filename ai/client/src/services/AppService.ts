import { FetchClient } from "../core/FetchClient";

/**
 * @sample https://dummyjson.com/users
 */
export class AppService {
    public static async sendMessage(message: string): Promise<string> {
        try {
            let response = await FetchClient.post<{ message: string }>('http://localhost:5112/chat', { message })
            return response.message
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    public static async getMcpDataWIP() {
        try {
            let response = await FetchClient.get<any>('http://localhost:5112/mcp')
            return response
        } catch (err) {
            console.log(err)
        }
    }

    public static async getExampleData() {
        try {
            let response = await FetchClient.get<any>('http://localhost:5112/')
            return response
        } catch (err) {
            console.log(err)
        }
    }
}
