"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePatient = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    name: "",
    tag: "",
    birthDate: "",
    email: "",
    photo: null,
  });

  /*
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPost((prevPost) => ({
      ...prevPost,
      photo: file,
    }));
  };
  */

  const createPatient = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const requestBody = {
      name: post.name,
      userId: session?.user.id,
      tag: post.tag,
      birthDate: post.birthDate,
      email: post.email,
    };

    /*
    const formData = new FormData();
    formData.append("name", post.name);
    formData.append("userId", session?.user.id);
    formData.append("tag", post.tag);
    formData.append("birthDate", post.birthDate);
    formData.append("email", post.email);
    formData.append("photo", post.photo); // Add the photo to the form data

    console.log("post: ", post);
    console.log("formData: ", formData);
    */

    try {
      const response = await fetch("/api/patient/new", {
        method: "POST",
        //body: formData,
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPatient}
      //handlePhotoChange={handlePhotoChange}
    />
  );
};

export default CreatePatient;
