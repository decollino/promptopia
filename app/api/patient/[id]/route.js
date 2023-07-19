import Patient from "@models/patient";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const patient = await Patient.findById(params.id).populate("creator");
    if (!patient) return new Response("Patient Not Found", { status: 404 });

    return new Response(JSON.stringify(patient), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { name, tag, birthDate, email } = await request.json();

  try {
    await connectToDB();

    // Find the existing patient by ID
    const existingPatient = await Patient.findById(params.id);

    if (!existingPatient) {
      return new Response("Patient not found", { status: 404 });
    }

    // Update the patient with new data
    existingPatient.name = name;
    existingPatient.tag = tag;
    existingPatient.birthDate = birthDate;
    existingPatient.email = email;

    await existingPatient.save();

    return new Response("Successfully updated the Patients", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Patient", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the patient by ID and remove it
    await Patient.findByIdAndRemove(params.id);

    return new Response("Patient deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting patient", { status: 500 });
  }
};
