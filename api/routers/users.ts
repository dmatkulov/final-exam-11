import express from 'express';
import mongoose from 'mongoose';

import User from '../models/User';
import { UserData } from '../types';

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
  try {
    const userData: UserData = {
      username: req.body.username as string,
      password: req.body.password as string,
      displayName: req.body.displayName as string,
      phone: req.body.phone,
    };
    const user = new User(userData);

    user.generateToken();
    await user.save();
    return res.send({
      message: `Congratulations ${user.username}! You have been successfully registered!`,
      user,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(error);
    }

    return next(error);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(422).send({ error: 'Invalid credentials!' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(422).send({
        error: 'Invalid credentials',
      });
    }

    user.generateToken();
    await user.save();

    return res.send({ message: `Welcome back, ${user.username}!`, user });
  } catch (e) {
    return next(e);
  }
});

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');
    const successMessage = { message: 'You logged out' };

    if (!headerValue) {
      return res.send(successMessage);
    }

    const [_bearer, token] = headerValue.split(' ');

    if (!token) {
      return res.send(successMessage);
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.send(successMessage);
    }

    user.generateToken();
    await user.save();

    return res.send(successMessage);
  } catch (e) {
    return next(e);
  }
});
export default usersRouter;
