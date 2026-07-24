import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './styles.css'

function Landing() {
  return (
    <main className="landing-shell">
      <header className="nav-shell">
        <a className="brand" href="#top" aria-label="Waqfa home">
          Waqfa
        </a>
        <a className="nav-cta" href="http://localhost:3100">
          افتح التطبيق
        </a>
      </header>

      <section className="hero" id="top" aria-labelledby="landing-title">
        <span className="eyebrow">وقفة قصيرة. أثر أعمق.</span>
        <h1 id="landing-title">استعد هدوءك، ثم واصل يومك بمعنى أوضح.</h1>
        <p>
          تجربة رقمية هادئة تساعدك على بناء وقفات يومية متزنة، دون ضوضاء أو تعقيد.
        </p>
        <div className="actions">
          <a className="primary-action" href="http://localhost:3100">
            ابدأ الآن
          </a>
          <a className="secondary-action" href="#principles">
            تعرّف على الفكرة
          </a>
        </div>
      </section>

      <section className="principles" id="principles" aria-label="مبادئ Waqfa">
        <article>
          <span>01</span>
          <h2>هادئة بطبيعتها</h2>
          <p>واجهة تقلل التشتيت وتمنح المحتوى الروحي مساحة للتنفس.</p>
        </article>
        <article>
          <span>02</span>
          <h2>قصيرة وقابلة للاستمرار</h2>
          <p>وقفات مصممة لتندمج مع يومك بدل أن تتحول إلى عبء جديد.</p>
        </article>
        <article>
          <span>03</span>
          <h2>واضحة ومحترمة</h2>
          <p>لغة وتجربة تحافظان على المعنى والخصوصية والهوية الإسلامية الهادئة.</p>
        </article>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Landing />
  </StrictMode>,
)
