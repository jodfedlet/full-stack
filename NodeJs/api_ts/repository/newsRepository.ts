import * as mongoose from "mongoose";
import NewSchema from "../models/newSchema";

export default mongoose.model('news', NewSchema);