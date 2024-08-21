const purchaseOrderService = require('../services/purchaseOrder.service');
const vendorService = require('../services/vendor.service');

exports.createPurchaseOrder = async (req, res) => {
  try {
    const { vendor, ...poData } = req.body;
    const vendorObj = await vendorService.getVendorById(vendor);
    if (!vendorObj) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    const purchaseOrder = await purchaseOrderService.createPurchaseOrder(poData, vendorObj);
    res.status(201).json(purchaseOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPurchaseOrders = async (req, res) => {
  try {
    const { vendorId } = req.query;
    const purchaseOrders = await purchaseOrderService.getPurchaseOrders(vendorId);
    res.status(200).json(purchaseOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPurchaseOrderById = async (req, res) => {
  try {
    const purchaseOrder = await purchaseOrderService.getPurchaseOrderById(req.params.poId);
    if (!purchaseOrder) {
      return res.status(404).json({ message: 'Purchase order not found' });
    }
    res.status(200).json(purchaseOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePurchaseOrder = async (req, res) => {
  try {
    const updatedPurchaseOrder = await purchaseOrderService.updatePurchaseOrder(req.params.poId, req.body);
    if (!updatedPurchaseOrder) {
      return res.status(404).json({ message: 'Purchase order not found' });
    }
    res.status(200).json(updatedPurchaseOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePurchaseOrder = async (req, res) => {
  try {
    const deletedPurchaseOrder = await purchaseOrderService.deletePurchaseOrder(req.params.poId);
    if (!deletedPurchaseOrder) {
      return res.status(404).json({ message: 'Purchase order not found' });
    }
    res.status(200).json({ message: 'Purchase order deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};