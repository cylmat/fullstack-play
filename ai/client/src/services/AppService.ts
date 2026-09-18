import { FetchClient } from "../core/FetchClient";

/**
 * @sample https://dummyjson.com/users
 */
export class AppService {
    public static async getExampleData() {
        try {
            let response = await FetchClient.get<any>('http://localhost:5112/', {
                'Content-Type': 'application/json',
            })
            return response
        } catch (err) {
            console.log(err)
        }
    }
}
