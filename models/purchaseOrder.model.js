const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
  poNumber: { type: String, required: true, unique: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  orderDate: { type: Date, required: true },
  deliveryDate: { type: Date, required: true },
  items: { type: Object, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, required: true, enum: ['pending', 'completed', 'canceled'] },
  qualityRating: { type: Number, min: 1, max: 5 },
  issueDate: { type: Date, required: true },
  acknowledgmentDate: { type: Date },
});

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);