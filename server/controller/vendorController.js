import Vendor from "../model/vendorModel.js";

export const createVendor = async (req, res) => {
  try {
    const newVendor = new Vendor(req.body);
    const { email } = newVendor;

    const vendorExist = await Vendor.findOne({ email });
    if (vendorExist) {
      return res.status(400).json({ message: "Vendor already exists." });
    }
    const savedData = await newVendor.save();
    // res.status(200).json(savedData);
    res.status(200).json({ message: "Vendor created successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getAllVendors = async (req, res) => {
  try {
    const vendorData = await Vendor.find();
    if (!vendorData || vendorData.length === 0) {
      return res.status(404).json({ message: "Vendor data not found." });
    }
    res.status(200).json(vendorData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getVendorById = async (req, res) => {
  try {
    const id = req.params.id;
    const vendorExist = await Vendor.findById(id);
    if (!vendorExist) {
      return res.status(404).json({ message: "Vendor not found." });
    }
    res.status(200).json(vendorExist);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const updateVendor = async (req, res) => {
  try {
    const id = req.params.id;
    const vendorExist = await Vendor.findById(id);
    if (!vendorExist) {
      return res.status(404).json({ message: "Vendor not found." });
    }
    const updatedData = await Vendor.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // res.status(200).json(updatedData);
    res.status(200).json({ message: "Vendor Updated successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteVendor = async (req, res) => {
  try {
    const id = req.params.id;
    const vendorExist = await Vendor.findById(id);
    if (!vendorExist) {
      return res.status(404).json({ message: "Vendor not found." });
    }
    await Vendor.findByIdAndDelete(id);
    res.status(200).json({ message: "Vendor deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
