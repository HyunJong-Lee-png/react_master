import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil';

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(

    <QueryClientProvider client={client}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </QueryClientProvider>

)
