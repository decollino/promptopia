"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePacient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pacientId = searchParams.get("id");

  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPacientDetails = async () => {
      const response = await fetch(`/api/pacient/${pacientId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (pacientId) getPacientDetails();
  }, [pacientId]);

  const updatePacient = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!pacientId) return alert("Missing PacientId!");

    try {
      const response = await fetch(`/api/pacient/${pacientId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePacient}
    />
  );
};

export default UpdatePacient;
