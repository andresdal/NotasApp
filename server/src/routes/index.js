import express from 'express';
import { getHome, getNota } from '../controllers/index.js';
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
router.get('/nota', getNota);

export default router;