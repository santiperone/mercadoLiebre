const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');
const multer = require('multer');
const webp = require('../middlewares/webpSharp')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', controller.index);
router.get('/login', controller.loginForm);
router.post('/login', controller.login);
router.get('/register', controller.registerForm);
router.post('/register', upload.single('image'), webp.users, controller.register);
router.get('/logout', controller.logout);

module.exports = router;
