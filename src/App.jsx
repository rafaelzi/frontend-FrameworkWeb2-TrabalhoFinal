// Este componente React gerencia um CRUD (Create, Read, Update, Delete) para usuários.
// Ele permite criar, atualizar, excluir e listar usuários de uma API externa.
// O estado do aplicativo é gerenciado com hooks e as interações com a API são feitas com axios.
// Além disso, o Material UI é usado para interfaces de diálogos, formulários, listas e mensagens de feedback.
 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { Container, Typography, Box, Grid, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { API_BASE_URL } from './utils/config';
 
const App = () => {
  // Estado para armazenar a lista de usuários
  const [users, setUsers] = useState([]);
  // Estado para armazenar o usuário selecionado para edição
  const [selectedUser, setSelectedUser] = useState(null);
  // Estado para a mensagem da Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState('');
  // Estado para controlar a visibilidade da Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // Estado para definir o tipo de mensagem da Snackbar (sucesso, erro, etc.)
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success', 'error', 'info', 'warning'
 
  // Estados para os diálogos de confirmação de atualização e exclusão
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Para confirmação de exclusão
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false); // Para confirmação de atualização
  const [userToDelete, setUserToDelete] = useState(null); // Armazena o ID do usuário a ser excluído
  const [userToUpdate, setUserToUpdate] = useState(null); // Armazena o usuário a ser atualizado
 
  // Hook para buscar os usuários ao carregar o componente
  useEffect(() => {
    fetchUsers();
  }, []);
 
  // Função para buscar usuários da API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data); // Atualiza a lista de usuários
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };
 
  // Função para criar um novo usuário
  const handleCreateUser = async (user) => {
    try {
      await axios.post(`${API_BASE_URL}/users`, user);
      fetchUsers(); // Atualiza a lista após a criação
      setSnackbarMessage('Usuário criado com sucesso!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true); // Exibe a mensagem de sucesso
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      setSnackbarMessage('Erro ao criar usuário!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true); // Exibe a mensagem de erro
    }
  };
 
  // Função para atualizar os dados de um usuário
  const handleUpdateUser = async () => {
    if (userToUpdate) {
      const { id, name, email } = userToUpdate;
      try {
        await axios.put(`${API_BASE_URL}/users/${id}`, { name, email });
        fetchUsers(); // Atualiza a lista após a atualização
        setSelectedUser(null); // Limpa a seleção do usuário após atualização
        setSnackbarMessage('Usuário atualizado com sucesso!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true); // Exibe a mensagem de sucesso
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        setSnackbarMessage('Erro ao atualizar usuário!');
        setSnackbarSeverity('error');
        setSnackbarOpen(true); // Exibe a mensagem de erro
      } finally {
        setOpenUpdateDialog(false); // Fecha o diálogo após a operação
        setUserToUpdate(null); // Limpa o usuário selecionado para atualização
      }
    }
  };
 
  // Função para excluir um usuário
  const handleDeleteUser = async () => {
    if (userToDelete) {
      try {
        await axios.delete(`${API_BASE_URL}/users/${userToDelete}`);
        fetchUsers(); // Atualiza a lista após a exclusão
        setSnackbarMessage('Usuário excluído com sucesso!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true); // Exibe a mensagem de sucesso
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        setSnackbarMessage('Erro ao excluir usuário!');
        setSnackbarSeverity('error');
        setSnackbarOpen(true); // Exibe a mensagem de erro
      } finally {
        setOpenDeleteDialog(false); // Fecha o diálogo após a operação
        setUserToDelete(null); // Limpa o usuário selecionado para exclusão
      }
    }
  };
 
  // Função para selecionar um usuário para edição
  const handleSelectUser = (user) => {
    setSelectedUser(user); // Define o usuário selecionado para edição
  };
 
  // Função para cancelar a exclusão de um usuário
  const handleCancelDelete = () => {
    setOpenDeleteDialog(false); // Fecha o diálogo de exclusão
    setUserToDelete(null); // Limpa o usuário selecionado para exclusão
  };
 
  // Função para cancelar a atualização de um usuário
  const handleCancelUpdate = () => {
    setOpenUpdateDialog(false); // Fecha o diálogo de atualização
    setUserToUpdate(null); // Limpa o usuário selecionado para atualização
  };
 
  // Função para abrir o diálogo de confirmação de atualização
  const handleOpenUpdateDialog = (user) => {
    setUserToUpdate(user); // Define o usuário a ser atualizado
    setOpenUpdateDialog(true); // Abre o diálogo de atualização
  };
 
  // Função para fechar a Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
 
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gerenciamento de Usuários
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={8}>
            <UserForm
              onSubmit={selectedUser ? handleOpenUpdateDialog : handleCreateUser} // Verifica se está editando ou criando
              initialValues={selectedUser || {}} // Passa os valores iniciais (usuário selecionado ou objeto vazio)
              onCancel={() => setSelectedUser(null)} // Limpa a seleção de usuário quando cancelar
            />
          </Grid>
          <Grid item xs={12} md={10}>
            {/* Condicionalmente renderiza a lista de usuários ou uma mensagem de vazio */}
            {users.length === 0 ? (
              <Typography variant="h6" color="#fff" align="center">
                Nenhum usuário cadastrado.
              </Typography>
            ) : (
              <UserList users={users} onDelete={(id) => { setUserToDelete(id); setOpenDeleteDialog(true); }} onSelect={handleSelectUser} />
            )}
          </Grid>
        </Grid>
      </Box>
 
      {/* Snackbar for success or error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
 
      {/* Dialog de Confirmação para Exclusão */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCancelDelete}
      >
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
 
      {/* Dialog de Confirmação para Atualização */}
      <Dialog
        open={openUpdateDialog}
        onClose={handleCancelUpdate}
      >
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
  );
};
 
export default App;