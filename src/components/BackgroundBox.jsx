//Códio para plano de fundo animado da Home
import React from 'react';
import { Box } from '@mui/material';

const BackgroundBox = ({ children, imageUrl }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${imageUrl})`, // Define a URL da imagem ou GIF
        backgroundSize: 'cover', // Tamanho do fundo cobrirá toda a área da Box
        backgroundPosition: 'center', // Centraliza o fundo
        backgroundRepeat: 'no-repeat',
        width: '100%',
        minHeight: '300px', // Define a altura mínima da Box com fundo
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
        borderRadius: 2, // Arredonda os cantos, se necessário
      }}
    >
      <Box
        sx={{
          position: 'relative',
          bgcolor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro com opacidade
          p: 3,
          borderRadius: 2,
          width: '90%', // Largura controlada
          maxWidth: 800, // Largura máxima controlada
        }}
      >
        {children} {/* Exibe o conteúdo recebido */}
      </Box>
    </Box>
  );
};

export default BackgroundBox;
