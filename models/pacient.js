import { Schema, model, models } from "mongoose";

const PacientSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Pacient is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

const Pacient = models.Pacient || model("Pacient", PacientSchema);

export default Pacient;
