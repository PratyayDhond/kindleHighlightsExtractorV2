import React from 'react';
import { Box, Typography, Link, collapseClasses } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import CopyrightIcon from '@mui/icons-material/Copyright';
import { darkTheme } from '../themeConstants';
import { BorderTopRounded } from '@mui/icons-material';

function Footer({theme}) {
    
    var FooterTheme = theme === darkTheme ? FooterDarkTheme : FooterLightTheme

    return (
    <Box

        style={FooterTheme}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: '0',
        width: '100vw',
        padding: '1rem 0 1rem 0'
      }}
    >
      <Typography variant="body2">
        {/* <CopyrightIcon fontSize="small" /> {new Date().getFullYear()} {'Creative Commons'} */}
        <Link href="https://www.linkedin.com/in/PratyayDhond/" target="_blank" rel="noopener noreferrer">
          <LinkedInIcon style={FooterTheme} fontSize="medium" />
        </Link>
        <span style={{padding: "0 1rem 0 1rem"}}></span>
        <Link href="https://github.com/PratyayDhond" target="_blank" rel="noopener noreferrer">
          <GitHubIcon style={FooterTheme} fontSize="medium" />
        </Link>
      </Typography>
    </Box>
  );
}

const footerPrimary = "#1a1a1a"
const footerSecondary = "#C9C9C9"

const FooterDarkTheme = {
    backgroundColor: footerPrimary,
    color: footerSecondary,
} 

const FooterLightTheme = {
    backgroundColor: footerSecondary,
    color: footerPrimary,
}

export default Footer;