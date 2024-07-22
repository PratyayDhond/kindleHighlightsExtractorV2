import logo from './logo.svg';
import './App.css';
import {useState } from 'react';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import InputComponent from './Components/InputComponent/InputComponent';

function App() {

  const [theme, setTheme] = useState({})

  return (
    <div className="App" style={theme}>
      <Header theme={theme} setTheme={setTheme} />
      <InputComponent theme={theme}/>    
      <Footer theme={theme}/>
    </div>
  );
}


export default App;
