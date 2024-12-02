import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';

const TaskForm = ({ onSubmit, initialValues, onCancel }) => {
  // Estados para os campos 'name', 'description' e 'dueDate'
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  // Atualiza os valores do formulário se `initialValues` for fornecido
  useEffect(() => {
    setName(initialValues.name || '');
    setDescription(initialValues.description || '');
    setDueDate(initialValues.dueDate || '');
  }, [initialValues]);

  // Função que lida com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    // Envia os dados da tarefa para o handler `onSubmit`
    onSubmit({ id: initialValues.id, name, description, dueDate });
    // Limpa os campos após o envio
    setName('');
    setDescription('');
    setDueDate('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        {/* Título que muda com base em `initialValues` (criar ou editar) */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            {initialValues.id ? 'Editar Tarefa' : 'Criar Tarefa'}
          </Typography>
        </Grid>

        {/* Campo de nome da tarefa */}
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="name"
            label={name.length === 0 ? 'Nome da Tarefa' : ''} // O rótulo desaparece se o campo estiver preenchido
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)} // Atualiza o valor do campo 'name'
            variant="outlined"
            InputProps={{
              style: {
                backgroundColor: '#ffffff', // Cor de fundo do campo
              },
            }}
            sx={{
              // Estilização do campo de entrada
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: '8px', // Borda arredondada
                },
                '&:hover fieldset': {
                  borderColor: '#4fc3f7', // Cor da borda ao passar o mouse
                },
              },
            }}
          />
        </Grid>

        {/* Campo de descrição da tarefa */}
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="description"
            label={description.length === 0 ? 'Descrição' : ''} // O rótulo desaparece se o campo estiver preenchido
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Atualiza o valor do campo 'description'
            variant="outlined"
            InputProps={{
              style: {
                backgroundColor: '#ffffff', // Cor de fundo do campo
              },
            }}
            sx={{
              // Estilização do campo de entrada
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: '8px', // Borda arredondada
                },
                '&:hover fieldset': {
                  borderColor: '#4fc3f7', // Cor da borda ao passar o mouse
                },
              },
            }}
          />
        </Grid>

        {/* Campo de data limite (due date) */}
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="dueDate"
            label="Data Limite"
            name="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)} // Atualiza o valor do campo 'dueDate'
            variant="outlined"
            InputLabelProps={{
                shrink: true, // Faz o rótulo ficar sempre acima do campo, mesmo que haja valor
              }}
            InputProps={{
              style: {
                backgroundColor: '#ffffff', // Cor de fundo do campo
              },
            }}
            sx={{
              // Estilização do campo de entrada
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: '8px', // Borda arredondada
                },
                '&:hover fieldset': {
                  borderColor: '#4fc3f7', // Cor da borda ao passar o mouse
                },
              },
            }}
          />
        </Grid>

        {/* Botões para salvar ou cancelar */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Botão de envio, muda o texto dependendo se estamos criando ou editando */}
            <Button type="submit" variant="contained" sx={{ backgroundColor: '#4fc3f7' }}>
              {initialValues.id ? 'Atualizar' : 'Salvar'}
            </Button>
            {/* Botão de cancelar, visível apenas durante a edição */}
            {initialValues.id && (
              <Button
                variant="contained"
                onClick={onCancel} // Chama a função `onCancel` ao cancelar a edição
                sx={{ backgroundColor: '#ff7961', ml: 2 }}
              >
                Cancelar
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskForm;
