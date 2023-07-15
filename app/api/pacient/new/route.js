import Pacient from "@models/pacient";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { userId, prompt, tag } = await request.json();

  try {
    await connectToDB();
    const newPacient = new Pacient({ creator: userId, prompt, tag });

    await newPacient.save();
    return new Response(JSON.stringify(newPacient), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new pacient", { status: 500 });
  }
};
