import React from 'react'
import ReactDOM from 'react-dom/client'

function Tutos(): any {
    return (<>tuto</>)
}

// Can't be null
ReactDOM.createRoot(document.getElementById('react-app')!).render(
    <React.StrictMode>
        <Tutos />
    </React.StrictMode>
)