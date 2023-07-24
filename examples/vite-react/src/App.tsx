import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './locale';
import logo from './logo.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const { t } = useTranslation();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{t('app.hello')}</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            {t('app.number')}: {count}
          </button>
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('app.learnReact')}
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('app.learnVite')}
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
