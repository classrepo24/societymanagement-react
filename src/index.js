import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from "./context/ModalContext";
import { AmenityProvider } from "./context/AmenityContext";

import { ComplaintProvider } from "./context/ComplaintContext";
const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
  <ComplaintProvider>
    <ModalProvider>
      <AmenityProvider>
      <App />
      </AmenityProvider>
    </ModalProvider>
  </ComplaintProvider>
    </BrowserRouter>
  </React.StrictMode>
);



