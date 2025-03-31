import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const clientId =
"179307932448-g1vleiaum243bgkgg7el5qc1e8m24oi7.apps.googleusercontent.com";
createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <GoogleOAuthProvider clientId={clientId}>
      <App/>
      </GoogleOAuthProvider>
  
  </StrictMode>,
)
