import { KotoProvider, useTranslation } from 'koto-react';
import './App.css';

// Translation Demo Component
function TranslationDemo() {
  const { t, loading, locale, setLocale } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    // Use setLocale from context - this will trigger API fetch and IndexedDB storage
    setLocale(lang);
  };

  if (loading) {
    return <div>Loading translations...</div>;
  }

  return (
    <div className="translation-demo">
      <h1>Koto React Translation Demo</h1>
      
      <div className="language-selector">
        <label>Select Language: </label>
        <select value={locale} onChange={(e) => handleLanguageChange(e.target.value)}>
          <option value="en">🇺🇸 English</option>
          <option value="zh"> Chinese</option>
          <option value="es">🇪🇸 Español</option>
          <option value="fr">🇫🇷 Français</option>
        </select>
      </div>

      <div className="translation-examples">
        <h2>Translation Examples:</h2>
        
        <div className="example">
          <code>common.welcome</code>
          <div className="result">→ {t('common.welcome')}</div>
        </div>

        <div className="example">
          <code>common.hello</code>
          <div className="result">→ {t('common.hello')}</div>
        </div>

        <div className="example">
          <code>common.goodbye</code>
          <div className="result">→ {t('common.goodbye')}</div>
        </div>

        <div className="example">
          <code>auth.login</code>
          <div className="result">→ {t('auth.login')}</div>
        </div>

        <div className="example">
          <code>auth.logout</code>
          <div className="result">→ {t('auth.logout')}</div>
        </div>

        <div className="example">
          <code>auth.signup</code>
          <div className="result">→ {t('auth.signup')}</div>
        </div>
      </div>

      <div className="login-form">
        <h2>Example Usage</h2>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button>{t('auth.login')}</button>
          <button>{t('auth.logout')}</button>
          <button>{t('auth.signup')}</button>
        </div>
        <div style={{ marginTop: '20px' }}>
          <p>{t('common.welcome')}</p>
          <p>{t('errors.notFound', 'Page not found')}</p>
        </div>
      </div>
    </div>
  );
}

// Main App Component with KotoProvider
function App() {
  return (
    <KotoProvider
      apiKey={import.meta.env.VITE_KOTO_API_KEY || "demo-api-key"}
      defaultLocale="en"
      apiUrl={import.meta.env.VITE_KOTO_API_URL || "https://api.koto-demo.com/v1/translations"}
      projectId={import.meta.env.VITE_KOTO_PROJECT_ID || "demo-project"}
    >
      <TranslationDemo />
    </KotoProvider>
  );
}

export default App;