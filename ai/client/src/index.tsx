import {
    hydrate,
    prerender as ssr
} from 'preact-iso'

import { AppRouter } from '#front/routes/router.js'
import { Header } from '#front/components/Header/Header.js'
import { AppProvider } from './providers/AppProvider'
import './global.scss'
import './style.css'

export function App() {
    return (
        <AppProvider>
            <Header />
            <main>
                <AppRouter />
            </main>
        </AppProvider>
    )
}

if (typeof window !== 'undefined') {
    hydrate(<App />, document.getElementById('app')!)
}

export async function prerender(data: any) {
    return await ssr(<App {...data} />)
}
