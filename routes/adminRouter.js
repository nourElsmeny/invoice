var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController');
const validationSystem = require('../middleware/validation').validationSystem;

router.post('/users/list', validationSystem, adminController.userList);
router.post('/generat/user', validationSystem, adminController.createUser);
router.post('/generat/invoice', validationSystem, adminController.createInvoice);
router.post('/invoice/list', validationSystem, adminController.invoiceList);


module.exports = router;
