//Componente que erencia os CRUDs de Contatos e Tarefas
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BackgroundBox from './components/BackgroundBox'; // Importando a Box com o fundo
import axios from 'axios';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import {
  Container,
  Typography,
  Box,
  Grid,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';
import { API_BASE_URL } from './utils/config';

const Home = () => (
  <Box sx={{ mt: 3, textAlign: 'center' }}>
  <Typography variant="h4" component="h1" gutterBottom>
    Bem-vindo seu Tilápio
  </Typography>
  <Typography variant="h6">
    Plataforma de organização de Tilápio, permitindo este salvar contatos e fazer sua lista de tarefas
  </Typography>

  {/* A Box com fundo aplicado aqui */}
  <BackgroundBox imageUrl="https://media.tenor.com/x9efZijA7aYAAAAM/fsh-spin.gif">
    <Typography variant="h5" color="white">
    Tilápio giratório!
    </Typography>
    <Typography variant="body1" color="white">
      Tilápio giratório
    </Typography>
  </BackgroundBox>

</Box>
);

const App = () => {
  // Estado para armazenar as listas de contatos e tarefas
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  // Estado para armazenar o usuário ou tarefa selecionado para edição
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  // Estado para a mensagem da Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState('');
  // Estado para controlar a visibilidade da Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // Estado para definir o tipo de mensagem da Snackbar (sucesso, erro, etc.)
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  // Estados para os diálogos de confirmação de atualização e exclusão
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteEntityType, setDeleteEntityType] = useState(''); // 'user' ou 'task'
  const [userToDelete, setUserToDelete] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Hook para buscar os usuários e tarefas ao carregar o componente
  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, []);

  // Função para buscar usuários da API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar contatos:', error);
    }
  };

  // Função para buscar tarefas da API
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  // Função para criar um novo usuário
  const handleCreateUser = async (user) => {
    try {
      await axios.post(`${API_BASE_URL}/users`, user);
      fetchUsers();
      setSnackbarMessage('Contato salvo com sucesso!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Erro ao salvar contato:', error);
      setSnackbarMessage('Erro ao salvar contato!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  // Função para criar uma nova tarefa
  const handleCreateTask = async (task) => {
    try {
      await axios.post(`${API_BASE_URL}/tasks`, task);
      fetchTasks();
      setSnackbarMessage('Tarefa criada com sucesso!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      setSnackbarMessage('Erro ao criar tarefa!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  // Função para excluir um usuário ou tarefa
  const handleDelete = async () => {
    try {
      if (deleteEntityType === 'user' && userToDelete) {
        await axios.delete(`${API_BASE_URL}/users/${userToDelete}`);
        fetchUsers();
      } else if (deleteEntityType === 'task' && taskToDelete) {
        await axios.delete(`${API_BASE_URL}/tasks/${taskToDelete}`);
        fetchTasks();
      }
      setSnackbarMessage('Exclusão realizada com sucesso!');
      setSnackbarSeverity('success');
    } catch (error) {
      console.error('Erro ao excluir:', error);
      setSnackbarMessage('Erro ao excluir!');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
      setOpenDeleteDialog(false);
      setUserToDelete(null);
      setTaskToDelete(null);
    }
  };

  const handleOpenDeleteDialog = (type, id) => {
    setDeleteEntityType(type);
    if (type === 'user') setUserToDelete(id);
    if (type === 'task') setTaskToDelete(id);
    setOpenDeleteDialog(true);
  };

  return (
    <Router>
      <Container maxWidth="md">
        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Organizador Peixótico
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button variant="contained" color="primary" component={Link} to="/">
              Home
            </Button>
            <Button variant="contained" color="secondary" component={Link} to="/users">
              Gerenciar Contatos
            </Button>
            <Button variant="contained" color="success" component={Link} to="/tasks">
              Gerenciar Tarefas
            </Button>
          </Box>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/users"
              element={
                <>
                  <UserForm
                    onSubmit={selectedUser ? handleCreateUser : handleCreateUser}
                    initialValues={selectedUser || {}}
                    onCancel={() => setSelectedUser(null)}
                  />
                  <UserList
                    users={users}
                    onDelete={(id) => handleOpenDeleteDialog('user', id)}
                    onSelect={setSelectedUser}
                  />
                </>
              }
            />
            <Route
              path="/tasks"
              element={
                <>
                  <TaskForm
                    onSubmit={selectedTask ? handleCreateTask : handleCreateTask}
                    initialValues={selectedTask || {}}
                    onCancel={() => setSelectedTask(null)}
                  />
                  <TaskList
                    tasks={tasks}
                    onDelete={(id) => handleOpenDeleteDialog('task', id)}
                    onSelect={setSelectedTask}
                  />
                </>
              }
            />
          </Routes>
        </Box>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
          <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
        </Snackbar>
        <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
          <DialogContent>
            <Typography>Tem certeza que deseja excluir?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Cancelar</Button>
            <Button onClick={handleDelete} color="secondary">
              Excluir
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Router>
  );
};

export default App;
