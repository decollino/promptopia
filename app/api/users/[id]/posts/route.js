import Prompt from "@models/pacient";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const pacients = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );

    return new Response(JSON.stringify(pacients), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch pacients created by user", {
      status: 500,
    });
  }
};
