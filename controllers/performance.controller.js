const performanceService = require('../services/performance.service');

exports.getVendorPerformance = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const vendorPerformance = await performanceService.getVendorPerformance(vendorId);
    if (!vendorPerformance) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.status(200).json(vendorPerformance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};