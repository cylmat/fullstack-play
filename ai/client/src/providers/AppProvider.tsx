import {
    LocationProvider,
} from 'preact-iso'
import { AuthProvider } from './AuthProvider'

export function AppProvider(props: { children: any }) {
    return (
        <LocationProvider>
            <AuthProvider>
                {props.children}
            </AuthProvider>
        </LocationProvider>
    )
}
