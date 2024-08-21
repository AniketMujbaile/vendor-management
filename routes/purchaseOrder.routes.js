const express = require('express');
const router = express.Router();
const purchaseOrderController = require('../controllers/purchaseOrder.controller');

router.post('/', purchaseOrderController.createPurchaseOrder);
router.get('/', purchaseOrderController.getPurchaseOrders);
router.get('/:poId', purchaseOrderController.getPurchaseOrderById);
router.put('/:poId', purchaseOrderController.updatePurchaseOrder);
router.delete('/:poId', purchaseOrderController.deletePurchaseOrder);

module.exports = router;