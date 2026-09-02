import React from 'react'
import ReactDOM from 'react-dom/client'
import ApiCall from "../pages/api/ApiCall"

import {
  QueryClient,
  QueryClientProvider
} from 'react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <ApiCall />
    </QueryClientProvider>
  </React.StrictMode>
)
