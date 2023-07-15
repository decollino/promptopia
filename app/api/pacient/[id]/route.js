import Pacient from "@models/pacient";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const pacient = await Pacient.findById(params.id).populate("creator");
    if (!pacient) return new Response("Pacient Not Found", { status: 404 });

    return new Response(JSON.stringify(pacient), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    // Find the existing pacient by ID
    const existingPacient = await Pacient.findById(params.id);

    if (!existingPacient) {
      return new Response("Pacient not found", { status: 404 });
    }

    // Update the pacient with new data
    existingPacient.prompt = prompt;
    existingPacient.tag = tag;

    await existingPacient.save();

    return new Response("Successfully updated the Pacients", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Pacient", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the pacient by ID and remove it
    await Pacient.findByIdAndRemove(params.id);

    return new Response("Pacient deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting pacient", { status: 500 });
  }
};
