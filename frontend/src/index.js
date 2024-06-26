import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './context/authContext';
import setupInterceptors from './Interceptor.js';
import { SongProvider } from './context/SongContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
setupInterceptors();
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SongProvider>
        <App />
      </SongProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
