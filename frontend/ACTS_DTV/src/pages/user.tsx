/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Modal, TextField, Snackbar, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { fetchCategories, fetchLookup ,saveUserManagement } from '../utils/api';

const UserModule: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<number | ''>(''); 
  const [hrid, setHrid] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [lookup, setLookupItems] = useState<any[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedItem, setSelectedItem] = useState<any>(null); // State to hold selected item for editing

  const handleOpen = () => setOpen(true);


  const handleClose = () => {
    setCategory('');
    setOpen(false);
    setSelectedItem(null); // Reset selected item after closing
  };

  const handleSave = async (id: number | null) => {
    const userinfo = {
      category_id: Number(category),
      hrid,
      ...(id && { id })  // Conditionally include the 'id' if it's provided
    };
  
    try {
      const response = await saveUserManagement(userinfo);
      console.log('Lookup Item saved successfully:', response);
      await fetchLookupItems(); // Call fetchLookupItems to refresh the lookup items after save
      handleClose();
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Failed to save lookup item:', error);
    }
  };
  

  const fetchLookupItems = async () => {
    try {
      const lookupItemsData = await fetchLookup();
      setLookupItems(lookupItemsData);
    } catch (error) {
      console.error('Error fetching lookup items:', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleEdit = (item: any) => {
    console.log(item.id)
    setSelectedItem(item);
    setCategory(item.category_id);
    setOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
        // console.log("Categories: ", categoriesData);

        const lookupItemsData = await fetchLookup();
        setLookupItems(lookupItemsData);
        // console.log("Lookup Items: ", lookupItemsData);
      } catch (error) {
        console.error('There was an error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const isFormComplete = hrid !== '';

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
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
    <Box sx={{ paddingTop: 10, margin: '5px 15vh' }}>
      <Typography variant="h4" gutterBottom sx={{ paddingBottom: 1 }}>
        User Management
      </Typography>
      <Button
        variant="contained"
        onClick={handleOpen}
        style={{ paddingLeft: '5px', background: 'green' }}
      >
        <AddIcon style={{ fontSize: '20px' }} /> Add User
      </Button>

      {/* Search bar for filtering the table */}
      <Box display="flex" justifyContent="flex-end" sx={{ marginBottom: 0 }}>
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
            {selectedItem ? 'Edit User' : 'Add User'}
          </Typography>

          <TextField
            fullWidth
            value={hrid}
            onChange={(e) => setHrid(e.target.value)}
            label="Search NT Account"
            variant="outlined"
            sx={{ mb: 2 }}
            placeholder='VXIPHP\ADIVINA'
          />
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={handleClose} sx={{ mr: 1 }}>Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSave(selectedItem?.id)}  // Pass selectedItem.id if it's available
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
              <TableCell>Action</TableCell>
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
                  <TableCell>
                  <Button
                    onClick={() => handleEdit(item)}
                    sx={{ backgroundColor: '#ea6512', color:'black', '&:hover': { backgroundColor: '#0056b3' } }}
                  >Edit
                  </Button>
                  </TableCell>
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

export default UserModule;
