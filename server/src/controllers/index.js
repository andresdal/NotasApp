import User from '../models/User.js';

export const getHome = (req, res) => {
  res.send('Welcome to the Express backend!');
};

export const getNota = async (req, res) => {
  try {
    const user = await User.findOne();
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('No user found');
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Internal Server Error');
  }
};