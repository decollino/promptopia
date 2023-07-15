import Pacient from "@models/pacient";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    const pacients = await Pacient.find({}).populate("creator");

    return new Response(JSON.stringify(pacients), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all pacients", { status: 500 });
  }
};
