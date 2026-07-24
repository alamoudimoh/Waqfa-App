import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './styles.css'

const queryClient = new QueryClient()

function App() {
  return (
    <main className="app-shell">
      <section className="app-card" aria-labelledby="waqfa-app-title">
        <span className="eyebrow">Waqfa</span>
        <h1 id="waqfa-app-title">مساحة هادئة لوقفاتك اليومية</h1>
        <p>
          تم تجهيز واجهة التطبيق الأساسية. ستتم إضافة المصادقة والتجارب المحمية في المرحلة التالية.
        </p>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
