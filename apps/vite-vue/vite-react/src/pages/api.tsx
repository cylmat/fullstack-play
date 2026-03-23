import React from 'react'
import ReactDOM from 'react-dom/client'
import ApiCall from "../react/components/ApiCall"

function Api() {
  return (
    <>
      <ApiCall />
    </>
  );
}

import {
  QueryClient,
  QueryClientProvider
} from 'react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <Api />
    </QueryClientProvider>
  </React.StrictMode>
)
