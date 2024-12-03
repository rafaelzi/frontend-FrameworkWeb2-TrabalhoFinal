//Componente que exibe a lista de Tarefas
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

const TaskList = ({ tasks, onDelete, onSelect }) => {
  return (
    <Box sx={{ mt: 3 }}>
      {/* Título da seção */}
      <Typography variant="h6" gutterBottom>
        Lista de Tarefas
      </Typography>

      {/* Container da Tabela com estilização */}
      <TableContainer component={Paper} sx={{ borderRadius: '8px', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)' }}>
        <Table>
          {/* Cabeçalho da Tabela */}
          <TableHead>
            <TableRow sx={{ backgroundColor: '#4fc3f7' }}>
              {/* Cabeçalhos das colunas da tabela */}
              <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Nome da Tarefa</TableCell>
              <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Descrição</TableCell>
              <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Data Limite</TableCell>
              <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Ações</TableCell>
            </TableRow>
          </TableHead>

          {/* Corpo da Tabela */}
          <TableBody>
            {/* Mapeia cada tarefa e cria uma linha para ela */}
            {tasks.map((task) => (
              <TableRow key={task.id}>
                {/* Exibe o ID da tarefa */}
                <TableCell align="center">{task.id}</TableCell>
                {/* Exibe o nome da tarefa */}
                <TableCell align="center">{task.name}</TableCell>
                {/* Exibe a descrição da tarefa */}
                <TableCell align="center">{task.description}</TableCell>
                {/* Exibe a data limite da tarefa */}
                <TableCell align="center">{task.dueDate}</TableCell>

                {/* Coluna de ações: botões para editar ou excluir */}
                <TableCell align="center">
                  {/* Botão para editar a tarefa */}
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => onSelect(task)} // Chama a função onSelect passando a tarefa
                    sx={{ mr: 1, borderColor: '#4fc3f7', color: '#4fc3f7' }}
                  >
                    Editar
                  </Button>

                  {/* Botão para excluir a tarefa */}
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => onDelete(task.id)} // Chama a função onDelete passando o ID da tarefa
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

export default TaskList;
