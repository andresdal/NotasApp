import User from '../models/User.js';
import Nota from '../models/Nota.js';

export const getNotasUsuario = async (req, res) => {
  const { user_id } = req.params;
  try {
    const user = await User.findByPk(user_id, {
      include: [{ model: Nota, as: 'notas' }]
    });
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Log the notes to check if notes with empty title or description are included
    console.log('Fetched notes:', user.notas);

    res.json(user.notas);
  } catch (error) {
    console.error('Error fetching user notes:', error);
    res.status(500).send('Server error');
  }
};

export const editNota = async (req, res) => {
    const { id } = req.params;
    const notaToUpdate = req.body; // Recibir toda la nota en el cuerpo de la solicitud
    try {
    const nota = await Nota.findByPk(id);
    if (!nota) {
        return res.status(404).send('Note not found');
    }
    // Asignar todos los campos de notaToUpdate a la nota
    Object.assign(nota, notaToUpdate);
    await nota.save();
    res.json(nota);
    } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).send('Server error');
    }
};

export const deleteNota = async (req, res) => {
    const { id } = req.params;
    try {
    const nota = await Nota.findByPk(id);
    if (!nota) {
        return res.status(404).send('Note not found');
    }
    await nota.destroy();
    res.send('Note deleted');
    } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).send('Server error');
    }
};

export const getNota = async (req, res) => {
    const { id } = req.params;
    try {
    const nota = await Nota.findByPk(id);
    if (!nota) {
        return res.status(404).send('Note not found');
    }
    res.json(nota);
    } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).send('Server error');
    }
}

export const createNota = async (req, res) => {
  const { userId } = req.body
  const nota = {
    titulo: '',
    descripcion: '',
    archivada: false,
    user_id: userId
  };
  try {
    const newNota = await Nota.create(nota);
    res.json(newNota);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).send('Server error');
  }
};

  