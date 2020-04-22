const { Router } = require('express'),
    router = Router(),
    restController = require('../controllers/RestController');

router.get('/merchants/getAllMerchants', restController.getAllMerchants);
router.get('/devices/getAllDevices', restController.getAllDevices);

module.exports = router;