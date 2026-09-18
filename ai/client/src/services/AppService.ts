import { FetchClient } from "../core/FetchClient";

export class AppService {
    public static getExampleData() {
        // try {
        //     let promise = await FetchClient.get<any>('https://dummyjson.com/users')
        //     // console.log(promise.users)
        //     return promise.users
        // } catch (err) {
        //     console.log(err)
        // }

        //  const loadUsers = async () => {
        //     const users = await FetchClient.get<any>('https://dummyjson.com/users')
        //     console.log(users);
        // };
        // return loadUsers()

         const response = await FetchClient.get<any>(
            'https://dummyjson.com/users'
        );

        console.log(response);       // objet complet
        console.log(response.users); // tableau des utilisateurs
    }
}
