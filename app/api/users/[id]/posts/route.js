import Patient from "@models/patient";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const patients = await Patient.find({ creator: params.id }).populate(
      "creator"
    );

    return new Response(JSON.stringify(patients), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch patients created by user", {
      status: 500,
    });
  }
};
