import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { Container, Typography, Box, Grid, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { API_BASE_URL } from './utils/config';

// Página Home
const Home = () => (
  <Box sx={{ mt: 3, textAlign: 'center' }}>
    <Typography variant="h4" component="h1" gutterBottom>
      Bem-vindo ao Sistema de Gerenciamento de Usuários
    </Typography>
    <Typography variant="h6" color="white">
      Navegue até "Gerenciar Usuários" para visualizar e gerenciar os usuários cadastrados.
    </Typography>
  </Box>
);

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToUpdate, setUserToUpdate] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const handleCreateUser = async (user) => {
    try {
      await axios.post(`${API_BASE_URL}/users`, user);
      fetchUsers();
      setSnackbarMessage('Usuário criado com sucesso!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      setSnackbarMessage('Erro ao criar usuário!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleUpdateUser = async () => {
    if (userToUpdate) {
      const { id, name, email } = userToUpdate;
      try {
        await axios.put(`${API_BASE_URL}/users/${id}`, { name, email });
        fetchUsers();
        setSelectedUser(null);
        setSnackbarMessage('Usuário atualizado com sucesso!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        setSnackbarMessage('Erro ao atualizar usuário!');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      } finally {
        setOpenUpdateDialog(false);
        setUserToUpdate(null);
      }
    }
  };

  const handleDeleteUser = async () => {
    if (userToDelete) {
      try {
        await axios.delete(`${API_BASE_URL}/users/${userToDelete}`);
        fetchUsers();
        setSnackbarMessage('Usuário excluído com sucesso!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        setSnackbarMessage('Erro ao excluir usuário!');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      } finally {
        setOpenDeleteDialog(false);
        setUserToDelete(null);
      }
    }
  };

  const handleSelectUser = (user) => setSelectedUser(user);
  const handleCancelDelete = () => setOpenDeleteDialog(false);
  const handleCancelUpdate = () => setOpenUpdateDialog(false);
  const handleOpenUpdateDialog = (user) => {
    setUserToUpdate(user);
    setOpenUpdateDialog(true);
  };
  const handleCloseSnackbar = () => setSnackbarOpen(false);

  return (
    <Router>
      <Container maxWidth="md">
        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Sistema de Gerenciamento de Usuários
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button variant="contained" color="primary" component={Link} to="/">
              Home
            </Button>
            <Button variant="contained" color="secondary" component={Link} to="/users">
              Gerenciar Usuários
            </Button>
          </Box>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/users"
              element={
                <Grid container spacing={3} justifyContent="center">
                  <Grid item xs={12} md={8}>
                    <UserForm
                      onSubmit={selectedUser ? handleOpenUpdateDialog : handleCreateUser}
                      initialValues={selectedUser || {}}
                      onCancel={() => setSelectedUser(null)}
                    />
                  </Grid>
                  <Grid item xs={12} md={10}>
                    {users.length === 0 ? (
                      <Typography variant="h6" color="textSecondary" align="center">
                        Nenhum usuário cadastrado.
                      </Typography>
                    ) : (
                      <UserList
                        users={users}
                        onDelete={(id) => {
                          setUserToDelete(id);
                          setOpenDeleteDialog(true);
                        }}
                        onSelect={handleSelectUser}
                      />
                    )}
                  </Grid>
                </Grid>
              }
            />
          </Routes>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
          <DialogContent>
            <Typography>Tem certeza que deseja excluir este usuário?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleDeleteUser} color="secondary">
              Excluir
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openUpdateDialog} onClose={handleCancelUpdate}>
          <DialogTitle>Confirmar Atualização</DialogTitle>
          <DialogContent>
            <Typography>Tem certeza que deseja atualizar os dados deste usuário?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelUpdate} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleUpdateUser} color="secondary">
              Atualizar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Router>
  );
};

export default App;
