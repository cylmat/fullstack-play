import {
    LocationProvider,
    hydrate,
    prerender as ssr
} from 'preact-iso'

import { AppRouter } from '#front/components/AppRouter'
import { Header } from '#front/components/Header/Header.js'
import './global.scss'
import './style.css'

export function App() {
    return (
        <LocationProvider>
            <Header />
            <main>
                <AppRouter />
            </main>
        </LocationProvider>
    )
}

if (typeof window !== 'undefined') {
    hydrate(<App />, document.getElementById('app')!)
}

export async function prerender(data: any) {
    return await ssr(<App {...data} />)
}
