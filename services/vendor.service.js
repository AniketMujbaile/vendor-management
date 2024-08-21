const Vendor = require('../models/vendor.model');

exports.createVendor = async (vendorData) => {
  const vendor = new Vendor(vendorData);
  return await vendor.save();
};

exports.getVendors = async () => {
  return await Vendor.find();
};

exports.getVendorById = async (vendorId) => {
  return await Vendor.findById(vendorId);
};

exports.updateVendor = async (vendorId, updatedData) => {
  return await Vendor.findByIdAndUpdate(vendorId, updatedData, { new: true });
};

exports.deleteVendor = async (vendorId) => {
  return await Vendor.findByIdAndDelete(vendorId);
};