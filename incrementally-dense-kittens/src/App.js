import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react";

import TabManager from "./components/tabManager.jsx"

  

function App() {
  useEffect(() => {
    document.title = 'Incrementally Dense Kittens';
  }, []);
  return (
    
    <div className="App">
      <TabManager></TabManager>
      
    </div>
  );
}

export default App;
