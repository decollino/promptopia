import Patient from "@models/patient";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    const patients = await Patient.find({}).populate("creator");

    return new Response(JSON.stringify(patients), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all patients", { status: 500 });
  }
};
