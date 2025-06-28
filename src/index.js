import React from "react";
import ReactDOM from 'react-dom/client';  
import App from './App';
import { Provider } from "react-redux";
import "tailwindcss/tailwind.css";
import store from "./utils/store"

console.log("hi");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
