import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useEffect, useState } from 'react';
import { darkTheme, lightTheme, HeadingStyle, DescriptionStyle } from "../Constants/themeConstants";
import './Header.css'
function Header({theme, setTheme}){
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if(darkMode){
      setTheme(darkTheme)
    }else{
      setTheme(lightTheme)
    }
  },[darkMode, setTheme])

    return (
        <div style={headerParentDivStyle}>
          <span style={headerTitleAlignment}>
            <HeaderTitle theme={theme}/>
          </span>
          
          <span className="toggleTheme" style={toggleThemeIcon} onClick={() => {setDarkMode(!darkMode)}}>
              {darkMode? <LightModeIcon fontSize="large" /> : <DarkModeIcon fontSize="large"/>}
          </span>
        </div>
    );
}

function HeaderTitle(){
  return (
    <span className="header-title">
      <span style={HeadingStyle}>Kindle Clipper</span> 
      <br className="header-title-br"/> 
      <span style={DescriptionStyle}> Extract and Sort your highlights the better way!</span>
    </span>
  );
}

const headerParentDivStyle = {
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between', 
  alignItems: 'center',
};

const headerTitleAlignment = {
  flex: 1,
 textAlign: 'center' 
};

const toggleThemeIcon = {
  transform: 'translateX(-3rem)'
}

export default Header;