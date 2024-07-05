import HistoryModel from "../models/history.js";

export const saveSmmry = async (req, res) => {
  const { uid, smmry } = req.body;
  const newSmmry = new HistoryModel({
    uid,
    smmry,
  });
  try {
    await newSmmry.save();
    res.status(201).json(newSmmry);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getAllSmmries = async (req, res) => {
  const { uid } = req.params;
  try {
    const smmries = await HistoryModel.find({ uid }).sort({ _id: -1 }); //latest first
    res.status(200).json(smmries);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
