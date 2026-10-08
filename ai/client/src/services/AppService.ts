import { DB_AUTH_TOKEN_KEY } from '#front/constants/app.js'
import { Storage } from '#front/core/Storage.js'
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

        // @todo use hook
        const jwt = Storage.getDbValue(DB_AUTH_TOKEN_KEY)

        try {
            let response = await FetchClient.post<ChatResponse>(
                '/api/chat',
                { message, useType },
                {  Authorization: `Bearer ${jwt}` }
            )
            return response.messages.join('\n')
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    public static async _getMcpDataSample() {
        try {
            let response = await FetchClient.get<any>('/api/mcp')
            return response
        } catch (err) {
            console.error(err)
        }
    }

    public static async _getExampleData() {
        try {
            let response = await FetchClient.get<any>(import.meta.env.VITE_API_BACKEND_URL + '/')
            return response
        } catch (err) {
            console.error(err)
        }
    }
}
