import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button } from '@mui/material';

const Nota = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nota, setNota] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    const fetchNota = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/notas/${id}`);
        setNota(response.data);
        setTitulo(response.data.titulo);
        setDescripcion(response.data.descripcion);
      } catch (error) {
        console.error('Error fetching note:', error);
      }
    };

    fetchNota();
  }, [id]);

  const handleSaveChanges = async () => {
    try {
      const updatedNota = { ...nota, titulo, descripcion };
      const response = await axios.put(`http://localhost:3001/notas/${id}`, updatedNota);
      setNota(response.data);
      localStorage.setItem('notaActualizada', 'true'); // Guardar el indicador en el almacenamiento local
      navigate('/'); // Redirigir a la página de inicio inmediatamente
    } catch (error) {
      console.error('Error updating note:', error);
      alert('Error actualizando la nota');
    }
  };

  if (!nota) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <Typography variant="h4">Editar Nota</Typography>
      <TextField
        label="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <Button variant="contained" color="primary" onClick={handleSaveChanges}>
        Guardar cambios
      </Button>
    </div>
  );
};

export default Nota;