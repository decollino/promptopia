import Patient from "@models/patient";
import { connectToDB } from "@utils/database";

/*
export const POST = async (request, response) => {
  //console.log("request: ", request);

  try {
    await connectToDB();

    // Handle the file upload using multer
    upload.single("photo")(request, response, async (error) => {
      if (error) {
        console.log("error: ", error);
        return response.status(500).json({
          error: "Failed to upload file.",
        });
      }

      const { userId, name, tag, birthDate, email } = request.body;

      // Get the file path from multer
      const photoPath = request.file ? request.file.path : null;

      console.log("request.body: ", request.body);

      const newPatient = new Patient({
        creator: userId,
        name,
        tag,
        birthDate: new Date(birthDate),
        email,
        photo: photoPath, // Save the file path in the patient object
      });

      console.log("newPatient: ", newPatient);

      await newPatient.save();

      return response.status(201).json(newPatient);
    });
  } catch (error) {
    return response.status(500).json({
      error: `Failed to create a new patient ${error}`,
    });
  }
};
*/

export const POST = async (request, response) => {
  const { userId, name, tag, birthDate, email } = await request.json();

  try {
    await connectToDB();
    const newPatient = new Patient({
      creator: userId,
      name,
      tag,
      birthDate: new Date(birthDate),
      email,
    });

    await newPatient.save();

    return new Response(JSON.stringify(newPatient), { status: 201 });
  } catch (error) {
    console.log(`Failed to create a new patient: ${error}`);
    return new Response(`Failed to create a new patient ${error}`, {
      status: 500,
    });
  }
};
