import express from 'express';
import {SubscriptionRepository, UserRepository} from '../repositories';
import KnexService from '../database/KnexService';
import {UserAuthService} from '../services';
import {
  authenticateJwtToken,
  validateAuthCode,
  validateEmailInRequestBody,
} from '../middlewares/authentication';

const router = express.Router();

// Define a route for rendering the admin login page
router.get('/login', (req, res) => {
  res.render('admin-login');
});

// Define a route for handling form submissions
router.post(
  '/login',
  validateEmailInRequestBody,
  validateAuthCode,
  async (req, res) => {
    // email exists in request body.
    const email: string = req.body.email;

    // Check the username and password
    const knexInstance = KnexService.getInstance();
    const queryResult = await knexInstance<DUser>('users')
      .select('admin')
      .where('email', '=', email)
      .first();
    const isAdmin = queryResult?.admin;

    if (isAdmin === 1) {
      // Authentication successful, redirect to the admin dashboard
      const jwtToken = UserAuthService.issueJwtForUser(email);
      res.cookie('authentication_token', jwtToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        path: '/',
      });
      res.redirect('/admin/users');
    } else {
      // Authentication failed, return error
      res.send('login error');
    }
  }
);

router.get('/users', authenticateJwtToken, async (req, res) => {
  const knexInstance = KnexService.getInstance();
  const userRepo = new UserRepository(knexInstance);
  const allUsers = await userRepo.getAllUsersData();

  res.render('admin-users', {allUsers});
});

router.post('/update_user', authenticateJwtToken, async (req, res) => {
  const userId = req.body.id;
  const updatedEmail = req.body.email;
  const updatedAdmin = req.body.admin;
  const updatedIsVerified = req.body.is_verified;

  // Update the database with the new data
  const knexInstance = KnexService.getInstance();
  await knexInstance<DUser>('users').where('id', '=', userId).update({
    email: updatedEmail,
    admin: updatedAdmin,
    is_verified: updatedIsVerified,
  });

  // Redirect back to the admin page after the update
  res.redirect('/admin/users');
});

router.post('/delete_user', authenticateJwtToken, async (req, res) => {
  const userId = req.body.id;

  const knexInstance = KnexService.getInstance();

  await knexInstance<DUser>('users').where({id: userId}).del();

  res.redirect('/admin/users');
});

router.post('/create_user', authenticateJwtToken, async (req, res) => {
  const email = req.body.email;
  const userRepo = new UserRepository(KnexService.getInstance());
  const subRepo = new SubscriptionRepository(KnexService.getInstance());

  await userRepo.createUser({email});

  await Promise.all([
    subRepo.createMensaMenuSubscription(email, 'sued'),
    subRepo.createMensaMenuSubscription(email, 'lmpl'),
    subRepo.createMensaMenuSubscription(email, 'mohm'),
    subRepo.createMensaMenuSubscription(email, 'isch'),
  ]);

  res.redirect('/admin/users');
});

router.get('/subscriptions/:id', authenticateJwtToken, async (req, res) => {
  const userId = req.params.id;
  const knexInstance = KnexService.getInstance();
  const userExchangeRateSubs = await knexInstance<DExchangeRateSubscription>(
    'exchange_rate_subscriptions'
  )
    .select('from_to')
    .where('user_id', '=', userId);
  const userMensaMenuSubs = await knexInstance<DMensaMenuSubscription>(
    'menu_subscriptions'
  )
    .select('mensa_id')
    .where('user_id', '=', userId);

  res.render('admin-subscriptions', {
    userId,
    userExchangeRateSubs,
    userMensaMenuSubs,
  });
});

export default router;
