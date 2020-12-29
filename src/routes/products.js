const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const multer = require('multer');
const webp = require('../middlewares/webpSharp')



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });




router.get('/', controller.all);
router.get('/create', controller.createForm);
router.post('/create', upload.single('image'), webp.products, controller.create);
router.get('/edit/:id', controller.editForm);
router.post('/edit/:id', upload.single('image'), webp.products, controller.edit);
router.post('/delete/:id', controller.delete);
router.get('/categories', controller.categories);
router.get('/:id', controller.detail);

module.exports = router;
