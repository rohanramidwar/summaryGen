import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    uid: String,
    smmry: String,
  },
  { timestamps: true }
);

const HistoryModel = mongoose.model("HistoryModel", historySchema);
export default HistoryModel;
