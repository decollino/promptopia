"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePatient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const patientId = searchParams.get("id");

  const [post, setPost] = useState({
    name: "",
    tag: "",
    birthDate: "",
    email: "",
  });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPatientDetails = async () => {
      const response = await fetch(`/api/patient/${patientId}`);
      const data = await response.json();

      setPost({
        name: data.name,
        tag: data.tag,
        birthDate: data.birthDate,
        email: data.email,
      });
    };

    if (patientId) getPatientDetails();
  }, [patientId]);

  const updatePatient = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!patientId) return alert("Missing PatientId!");

    try {
      const response = await fetch(`/api/patient/${patientId}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: post.name,
          tag: post.tag,
          birthDate: post.birthDate,
          email: post.email,
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
      handleSubmit={updatePatient}
    />
  );
};

export default UpdatePatient;
