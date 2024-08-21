const PurchaseOrder = require('../models/purchaseOrder.model');
const Vendor = require('../models/vendor.model');
const HistoricalPerformance = require('../models/historicalPerformance.model');

exports.createPurchaseOrder = async (poData, vendor) => {
  const purchaseOrder = new PurchaseOrder({
    ...poData,
    vendor: vendor._id,
    issueDate: new Date(),
  });
  await purchaseOrder.save();
  await updateVendorPerformance(vendor._id, purchaseOrder);
  return purchaseOrder;
};

exports.getPurchaseOrders = async (vendorId) => {
  if (vendorId) {
    return await PurchaseOrder.find({ vendor: vendorId }).populate('vendor');
  }
  return await PurchaseOrder.find().populate('vendor');
};

exports.getPurchaseOrderById = async (poId) => {
  return await PurchaseOrder.findById(poId).populate('vendor');
};

exports.updatePurchaseOrder = async (poId, updatedData) => {
  const purchaseOrder = await PurchaseOrder.findById(poId);
  if (!purchaseOrder) {
    return null;
  }
  await updateVendorPerformance(purchaseOrder.vendor, purchaseOrder, updatedData);
  return await PurchaseOrder.findByIdAndUpdate(poId, updatedData, { new: true }).populate('vendor');
};

exports.deletePurchaseOrder = async (poId) => {
  const purchaseOrder = await PurchaseOrder.findById(poId);
  if (!purchaseOrder) {
    return null;
  }
  await updateVendorPerformance(purchaseOrder.vendor, purchaseOrder);
  return await PurchaseOrder.findByIdAndDelete(poId);
};

async function updateVendorPerformance(vendorId, purchaseOrder, updatedData = {}) {
  const vendor = await Vendor.findById(vendorId);
  if (!vendor) {
    return;
  }

  const { status, qualityRating, deliveryDate } = updatedData || purchaseOrder;
  const isCompleted = status === 'completed';
  const isOnTime = deliveryDate ? deliveryDate >= purchaseOrder.orderDate : true;

  vendor.onTimeDeliveryRate = calculateOnTimeDeliveryRate(vendor.onTimeDeliveryRate, isCompleted, isOnTime);
  vendor.qualityRatingAvg = calculateQualityRatingAvg(vendor.qualityRatingAvg, qualityRating, isCompleted);
  vendor.averageResponseTime = calculateAverageResponseTime(vendor.averageResponseTime, purchaseOrder.acknowledgmentDate, purchaseOrder.issueDate);
  vendor.fulfillmentRate = calculateFulfillmentRate(vendor.fulfillmentRate, isCompleted, status);

  await vendor.save();

  await createHistoricalPerformance(vendor, {
    onTimeDeliveryRate: vendor.onTimeDeliveryRate,
    qualityRatingAvg: vendor.qualityRatingAvg,
    averageResponseTime: vendor.averageResponseTime,
    fulfillmentRate: vendor.fulfillmentRate,
  });
}

 // Helper functions for metric calculations
function calculateOnTimeDeliveryRate(currentRate, isCompleted, isOnTime) {
  if (isCompleted && isOnTime) {
    return (currentRate * 99 + 100) / 100; // Increment the rate by 1%
  } else if (isCompleted && !isOnTime) {
    return (currentRate * 99) / 100; // Decrement the rate by 1%
  }
  return currentRate;
}

function calculateQualityRatingAvg(currentAvg, qualityRating, isCompleted) {
  if (isCompleted && qualityRating) {
    return (currentAvg * 99 + qualityRating) / 100; // Update the average based on the new rating
  }
  return currentAvg;
}

function calculateAverageResponseTime(currentAvg, acknowledgmentDate, issueDate) {
  if (acknowledgmentDate && issueDate) {
    const responseTime = (acknowledgmentDate.getTime() - issueDate.getTime()) / 1000; // Calculate response time in seconds
    return (currentAvg * 99 + responseTime) / 100; // Update the average response time
  }
  return currentAvg;
}

function calculateFulfillmentRate(currentRate, isCompleted, status) {
  if (isCompleted && status === 'completed') {
    return (currentRate * 99 + 100) / 100; // Increment the rate by 1%
  } else if (isCompleted && status !== 'completed') {
    return (currentRate * 99) / 100; // Decrement the rate by 1%
  }
  return currentRate;
}

async function createHistoricalPerformance(vendor, metrics) {
  const historicalPerformance = new HistoricalPerformance({
    vendor: vendor._id,
    date: new Date(),
    ...metrics,
  });
  await historicalPerformance.save();
}