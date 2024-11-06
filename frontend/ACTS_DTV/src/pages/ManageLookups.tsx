/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Modal, TextField, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { fetchCategories } from '../utils/api';

const ManageLookups: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(''); // Category state to store selected category
  const [lookupname, setLookupname] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [categories, setCategories] = useState<any[]>([]); // Categories state to store fetched categories

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setLookupname(''); // Reset Lookup Item Name on close
    setDescription(''); // Reset Lookup Item Name on close
    setIsActive(false); // Reset Is Active on close
    setCategory(''); // Reset Lookup Type on close
    setOpen(false);
  };

  useEffect(() => {
    // Fetch categories using the imported function
    fetchCategories()
      .then((data) => {
        setCategories(data);
        console.log("LIST: ",data) // Set the fetched categories in the state
      })
      .catch((error) => {
        console.error('There was an error fetching the categories!', error);
      });
  }, []);

  return (
    <Box sx={{ paddingTop: 14, margin: '5px 15vh' }}>
      <Typography variant="h4" component="h4" gutterBottom sx={{ paddingBottom: 3 }}>
        Look Up Management
      </Typography>
      <Button
        variant="contained"
        onClick={handleOpen}
        style={{ paddingLeft: '5px', background: 'green' }}
      >
        <AddIcon style={{ fontSize: '20px' }} /> Lookup Item
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            Add New Lookup Item
          </Typography>

          {/* Dropdown for Category */}
          <TextField
            fullWidth
            select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          >
            {/* Dynamically populate dropdown with categories */}
            {categories.map((categoryItem) => (
              <MenuItem key={categoryItem.id} value={categoryItem.id}>
                {categoryItem.title} {/* Assuming category has 'id' and 'name' */}
              </MenuItem>
            ))}
          </TextField>

          {/* TextField for Lookup Item Name */}
          <TextField
            fullWidth
            value={lookupname}
            onChange={(e) => setLookupname(e.target.value)} // Add this line
            label="Lookup Name"
            variant="outlined"
            sx={{ mb: 2 }}
          />

          {/* TextField for Description */}
          <TextField
            fullWidth
            onChange={(e) => setDescription(e.target.value)} // Add this line
            value={description}
            label="Description"
            variant="outlined"
            sx={{ mb: 2 }}
          />

          {/* Checkbox for Is Active */}
          <FormControlLabel
            control={
              <Checkbox
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
            }
            label="Is Active"
            sx={{ mb: 2 }}
          />

          <Box display="flex" justifyContent="flex-end">
            <Button onClick={handleClose} sx={{ mr: 1 }}>Cancel</Button>
            <Button variant="contained" color="primary">Save</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ManageLookups;
