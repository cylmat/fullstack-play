import { FetchClient } from '../core/FetchClient'

type ChatResponse = {
    type: string
    messages: string[]
}

/**
 * @sample https://dummyjson.com/users
 */
export class AppService {
    public static async sendMessage(message: string, useType: string): Promise<string> {

        try {
            let response = await FetchClient.post<ChatResponse>(
                import.meta.env.VITE_API_BACKEND_URL + '/chat',
                { message, useType }
            )
            return response.messages.join('\n')
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    public static async getMcpDataWIP() {
        try {
            let response = await FetchClient.get<any>(
                import.meta.env.VITE_API_BACKEND_URL + '/mcp'
            )
            return response
        } catch (err) {
            console.log(err)
        }
    }

    public static async getExampleData() {
        try {
            let response = await FetchClient.get<any>(import.meta.env.VITE_API_BACKEND_URL + '/')
            return response
        } catch (err) {
            console.log(err)
        }
    }
}
