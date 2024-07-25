import { Box, TextField, Button } from '@material-ui/core';

const NavigationButtons = ({ buttonTheme, handlePrevious, handleNext, handleSearch}) => {
    return (
      <Box display="flex" alignItems="center" gap={2}>
        {/* Search Bar */}
        <TextField
          variant="outlined"
          placeholder="Search..."
          size="small"
          style={{...buttonTheme, marginRight: '1.5rem'}} // Allows the search bar to take available space
          onChange={handleSearch}
        />
  
        {/* Buttons */}
        <Button
          variant="contained"
          style={{...buttonTheme, marginRight: '1.5rem'}}
          onClick={handlePrevious}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          style={buttonTheme}
          onClick={handleNext}
        >
          Next
        </Button>
      </Box>
    );
  };

  export default NavigationButtons