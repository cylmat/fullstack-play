import { FetchClient } from '../core/FetchClient'

/**
 * @sample https://dummyjson.com/users
 */
export class AppService {
    public static async sendMessage(message: string): Promise<string> {
        try {
            let response = await FetchClient.post<{ data: string[] }>(
                process.env.API_BACKEND_URL + '/chat',
                { message }
            )
            return response.data[0]
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    public static async getMcpDataWIP() {
        try {
            let response = await FetchClient.get<any>(
                process.env.API_BACKEND_URL + '/mcp'
            )
            return response
        } catch (err) {
            console.log(err)
        }
    }

    public static async getExampleData() {
        try {
            let response = await FetchClient.get<any>(process.env.API_BACKEND_URL + '/')
            return response
        } catch (err) {
            console.log(err)
        }
    }
}
