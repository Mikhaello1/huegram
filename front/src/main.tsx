import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from './store/store.ts'; 

const store = setupStore(); 

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);