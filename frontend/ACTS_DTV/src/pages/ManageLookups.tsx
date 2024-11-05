import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ManageLookups: React.FC = () => {
  return (
    <Box sx={{ paddingTop: 14, margin : '5px 15vh'}}>
      <Typography variant="h4" component="h4" gutterBottom sx={{paddingBottom : 3}}>
        Look Up Management
      </Typography>
      <Button variant="contained" style={{paddingLeft: '5px' , background :'green'}}><AddIcon style={{fontSize: '20px'}}/>Lookup Item</Button>
    </Box>
  );
};

export default ManageLookups;
