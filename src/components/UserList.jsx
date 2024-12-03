//Componente que exibe a lista de Usuários/Contatos
 
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
} from '@mui/material';
 
const UserList = ({ users, onDelete, onSelect }) => {
  return (
    <Box sx={{ mt: 3 }}>
      {/* Título da seção */}
      <Typography variant="h6" gutterBottom>
        Lista de Contatos
      </Typography>
 
      {/* Container da Tabela com estilização */}
      <TableContainer component={Paper} sx={{ borderRadius: '8px', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)' }}>
        <Table>
          {/* Cabeçalho da Tabela */}
          <TableHead>
            <TableRow sx={{ backgroundColor: '#4fc3f7' }}>
              {/* Cabeçalhos das colunas da tabela */}
              <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Nome</TableCell>
              <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Telefone</TableCell>
              <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
 
          {/* Corpo da Tabela */}
          <TableBody>
            {/* Mapeia cada contato e cria uma linha para ele */}
            {users.map((user) => (
              <TableRow key={user.id}>
                {/* Exibe o ID do contato */}
                <TableCell align="center">{user.id}</TableCell>
                {/* Exibe o nome do contato */}
                <TableCell align="center">{user.name}</TableCell>
                {/* Exibe o e-mail do contato */}
                <TableCell align="center">{user.email}</TableCell>
                {/* Exibe o telefone do contato */}
                <TableCell align="center">{user.phoneNumber}</TableCell>
 
                {/* Coluna de ações: botões para editar ou excluir */}
                <TableCell align="center">
                  {/* Botão para editar o contato */}
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => onSelect(user)} // Chama a função onSelect passando o contato
                    sx={{ mr: 1, borderColor: '#4fc3f7', color: '#4fc3f7' }}
                  >
                    Editar
                  </Button>
 
                  {/* Botão para excluir o contato */}
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => onDelete(user.id)} // Chama a função onDelete passando o ID do contato
                    sx={{ borderColor: '#ff7961', color: '#ff7961' }}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
 
export default UserList;