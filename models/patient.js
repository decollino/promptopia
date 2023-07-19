import { Schema, model, models } from "mongoose";

const PatientSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "Patient is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
  birthDate: {
    type: Date,
    required: [true, "Date is required."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
  },
  photo: {
    type: String,
    required: false,
  },
});

const Patient = models.Patient || model("Patient", PatientSchema);

export default Patient;
