// Este componente é usado para criar ou editar um contato.
// Quando o `initialValues` contém um ID, o formulário é usado para editar um contato existente.
// Caso contrário, ele serve para criar um novo contato.
 
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
 
const UserForm = ({ onSubmit, initialValues, onCancel }) => {
  // Estados para os campos 'name', 'email' e 'phoneNumber'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
 
  // Atualiza os valores do formulário se `initialValues` for fornecido
  useEffect(() => {
    setName(initialValues.name || '');
    setEmail(initialValues.email || '');
    setPhoneNumber(initialValues.phoneNumber || '');
  }, [initialValues]);
 
  // Função que lida com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    // Envia os dados do contato para o handler `onSubmit`
    onSubmit({ id: initialValues.id, name, email, phoneNumber });
    // Limpa os campos após o envio
    setName('');
    setEmail('');
    setPhoneNumber('');
  };
 
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        {/* Título que muda com base em `initialValues` (criar ou editar) */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            {initialValues.id ? 'Editar Contato' : 'Salvar Contato'}
          </Typography>
        </Grid>
 
        {/* Campo de nome */}
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="name"
            label={name.length === 0 ? 'Nome' : ''} // O rótulo desaparece se o campo estiver preenchido
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
 
        {/* Campo de email */}
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label={email.length === 0 ? 'Email' : ''} // O rótulo desaparece se o campo estiver preenchido
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Atualiza o valor do campo 'email'
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

         {/* Campo de telefone */}
         <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="phoneNumber"
            label={phoneNumber.length === 0 ? 'Telefone' : ''} // O rótulo desaparece se o campo estiver preenchido
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)} // Atualiza o valor do campo 'telefone'
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
 
export default UserForm;
