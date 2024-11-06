/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Modal, TextField, MenuItem, Checkbox, FormControlLabel, Snackbar, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { fetchCategories, saveLookupItem, fetchLookup } from '../utils/api';

const ManageLookups: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<number | ''>(''); 
  const [item_name, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [is_active, setIsActive] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [lookup, setLookupItems] = useState<any[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpen = () => setOpen(true);

  const authTokenString = sessionStorage.getItem("authToken");
  const authToken = authTokenString ? JSON.parse(authTokenString) : null;
  const sessionhrid = authToken?.id || "";

  const handleClose = () => {
    setItemName('');
    setDescription('');
    setIsActive(false);
    setCategory('');
    setOpen(false);
  };

  const handleSave = async () => {
    const newLookupItem = {
      category_id: Number(category),
      item_name,
      description,
      is_active,
      created_by: sessionhrid,
      updated_by: sessionhrid
    };
    try {
      const response = await saveLookupItem(newLookupItem);
      console.log('Lookup Item saved successfully:', response);
      handleClose();
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Failed to save lookup item:', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
        console.log("Categories: ", categoriesData);

        const lookupItemsData = await fetchLookup();
        setLookupItems(lookupItemsData);
        console.log("Lookup Items: ", lookupItemsData);
      } catch (error) {
        console.error('There was an error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const isFormComplete = category !== '' && item_name.trim() !== '' && description.trim() !== '';

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filtered lookup items based on the search term
  const filteredLookupItems = lookup.filter((item) => {
    const categoryName = categories.find(category => category.id === item.category_id)?.title || '';
  
    return (
      item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <Box sx={{ paddingTop: 14, margin: '5px 15vh' }}>
      <Typography variant="h4" gutterBottom sx={{ paddingBottom: 3 }}>
        Look Up Management
      </Typography>
      <Button
        variant="contained"
        onClick={handleOpen}
        style={{ paddingLeft: '5px', background: 'green' }}
      >
        <AddIcon style={{ fontSize: '20px' }} /> Lookup Item
      </Button>

      {/* Search bar for filtering the table */}
      <Box display="flex" justifyContent="flex-end" sx={{ marginBottom: 2 }}>
        <TextField
          label="Search Lookup"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '300px' }}
          size="small"  // This reduces the height of the text field

        />
      </Box>

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
          <Typography id="modal-title" variant="h6" gutterBottom>
            Add New Lookup Item
          </Typography>

          <TextField
            fullWidth
            select
            label="Category"
            value={category}
            onChange={(e) => setCategory(Number(e.target.value))}
            variant="outlined"
            sx={{ mb: 2 }}
          >
            {categories.map((categoryItem) => (
              <MenuItem key={categoryItem.id} value={categoryItem.id}>
                {categoryItem.title}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            value={item_name}
            onChange={(e) => setItemName(e.target.value)}
            label="Lookup Name"
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            label="Description"
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={is_active}
                onChange={(e) => setIsActive(e.target.checked)}
              />
            }
            label="Is Active"
            sx={{ mb: 2 }}
          />

          <Box display="flex" justifyContent="flex-end">
            <Button onClick={handleClose} sx={{ mr: 1 }}>Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={!isFormComplete}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ marginTop: '10vh' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Lookup Item saved successfully!
        </Alert>
      </Snackbar>

      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead sx={{ backgroundColor : '#ea6512'}}>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Is Active</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Updated By</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell>Date Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLookupItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => {
              const categoryName = categories.find(category => category.id === item.category_id)?.title || 'Unknown';

              return (
                <TableRow key={item.id}>
                  <TableCell>{categoryName}</TableCell>
                  <TableCell>{item.item_name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.is_active ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{item.created_by}</TableCell>
                  <TableCell>{item.updated_by}</TableCell>
                  <TableCell>{new Date(item.date_created).toLocaleDateString('en-US')}</TableCell>
                  <TableCell>{new Date(item.date_updated).toLocaleDateString('en-US')}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredLookupItems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default ManageLookups;
