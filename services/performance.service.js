const Vendor = require('../models/vendor.model');

exports.getVendorPerformance = async (vendorId) => {
  const vendor = await Vendor.findById(vendorId);
  if (!vendor) {
    return null;
  }
  return {
    onTimeDeliveryRate: vendor.onTimeDeliveryRate,
    qualityRatingAvg: vendor.qualityRatingAvg,
    averageResponseTime: vendor.averageResponseTime,
    fulfillmentRate: vendor.fulfillmentRate,
  };
};