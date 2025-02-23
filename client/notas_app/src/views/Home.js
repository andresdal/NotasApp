import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardActions, Button, Typography, Fab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const Home = () => {
  const [notas, setNotas] = useState([]);
  const [open, setOpen] = useState(false);
  const [notaToDelete, setNotaToDelete] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const userId = 1;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/getNotasUsuario/${userId}`);
        setNotas(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotas();

    // Verificar el indicador en el almacenamiento local
    if (localStorage.getItem('notaActualizada') === 'true') {
      setOpenSnackbar(true);
      localStorage.removeItem('notaActualizada'); // Eliminar el indicador después de mostrar el Snackbar
    }
  }, [userId]);

  const handleArchive = (id) => {
    const updatedNotas = notas.map(nota => 
      nota.id === id ? { ...nota, archivada: !nota.archivada } : nota
    );
    setNotas(updatedNotas);
  
    const notaToUpdate = updatedNotas.find(nota => nota.id === id);
  
    // Actualizar en el servidor con todos los campos de la nota
    axios.put(`http://localhost:3001/notas/${id}`, notaToUpdate)
      .then(response => {
        console.log('Nota actualizada:', response.data);
      })
      .catch(error => {
        console.error('Error actualizando la nota:', error);
      });
  };

  const handleDelete = (id) => {
    setNotaToDelete(id);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    const updatedNotas = notas.filter(nota => nota.id !== notaToDelete);
    setNotas(updatedNotas);
    setOpen(false);

    // Eliminar en el servidor
    axios.delete(`http://localhost:3001/notas/${notaToDelete}`)
      .then(response => {
        console.log('Nota eliminada:', response.data);
      })
      .catch(error => {
        console.error('Error eliminando la nota:', error);
      });
  };

  const handleClose = () => {
    setOpen(false);
    setNotaToDelete(null);
  };

  const handleCreateNota = async () => {
    try {
      const response = await axios.post('http://localhost:3001/notas', { userId });
      const createdNota = response.data;
      navigate(`/nota/${createdNota.id}`);
    } catch (error) {
      console.error('Error creating note:', error);
      alert('Error creando la nota');
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <h1>Notas</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {notas.map(nota => (
          <Card key={nota.id} style={{ width: '300px' }}>
            <Link to={`/nota/${nota.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {nota.titulo ? nota.titulo : '\u00A0'}
                </Typography>
                <Typography variant="body2">
                  {nota.descripcion || 'Sin descripción'}
                </Typography>
                <Typography variant="body2">
                  <strong>Archivada:</strong> {nota.archivada ? 'Sí' : 'No'}
                </Typography>
              </CardContent>
            </Link>
            <CardActions>
              <Button size="small" onClick={() => handleArchive(nota.id)}>Archivar</Button>
              <Button size="small" onClick={() => handleDelete(nota.id)}>Eliminar</Button>
            </CardActions>
          </Card>
        ))}
      </div>
      <Fab color="primary" aria-label="add" style={{ position: 'fixed', bottom: '16px', right: '16px' }} onClick={handleCreateNota}>
        <AddIcon />
      </Fab>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar esta nota?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Nota actualizada con éxito
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;