const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');
const multer = require('multer');
const webp = require('../middlewares/webpSharp')

const guestMiddleware = require('../middlewares/guest');
const authMiddleware = require('../middlewares/auth');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', controller.index);
router.get('/login', guestMiddleware, controller.loginForm);
router.post('/login', guestMiddleware, controller.login);
router.get('/register', guestMiddleware, controller.registerForm);
router.post('/register', guestMiddleware, upload.single('image'), webp.users, controller.register);
router.get('/logout', authMiddleware, controller.logout);

module.exports = router;
