"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from 'axios';

import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
    const promptId = searchParams.get("id");
    console.log(promptId)

  const [post, setPost] = useState({ prompt: "", tag: "", });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
      
    const getPromptDetails = async () => {
        try {
            const response = await axios.get(`/api/prompt/${promptId}`);
            console.log(response)
          const data = response.data;
      
          setPost({
            prompt: data.prompt,
            tag: data.tag,
          });
        } catch (error) {
          console.error(error);
        }
      };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

      
    try {
        const response = await axios.patch(`/api/prompt/${promptId}`, {
          prompt: post.prompt,
          tag: post.tag,
        });
      
        if (response.status === 200) {
          router.push('/');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
  };

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;