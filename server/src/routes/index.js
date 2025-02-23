import express from 'express';
import { getHome} from '../controllers/index.js';
import { getNota, editNota, deleteNota, getNotasUsuario, createNota } from '../controllers/notas_controller.js';
import sequelize from '../config/database.js';

const router = express.Router();

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

router.get('/', getHome);
router.get('/notas/:id', getNota);
router.put('/notas/:id', editNota);
router.delete('/notas/:id', deleteNota);
router.get('/getNotasUsuario/:user_id', getNotasUsuario);
router.post('/notas', createNota);

export default router;