'use client'

import {useState, useEffect} from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";


const EditPrompt = () => {
    const router = useRouter();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt:'',
        tag:''
    });
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    useEffect(()=>{
        const getPromptDetails = async () =>{
            const res = await fetch(`/api/prompt/${promptId}`);
            console.log(res);
            const data = await res.json();

            setPost({prompt:data.prompt, tag:data.tag});
        }

        if(promptId) getPromptDetails();
    },[promptId]);

    const UpdatePrompt = async (e) =>{
        e.preventDefault();
        setSubmitting(true);
        if(!promptId) return alert('Prompt ID not found');
        try {
            const res = await fetch(`/api/prompt/${promptId}`,{
                method: 'PATCH',
                body: JSON.stringify({
                    prompt:post.prompt,
                    tag: post.tag
                })
            })
            if(res.ok){
                router.push('/')
            }
        } catch (error) {
            console.log(error);
        }finally{
            setSubmitting(false);
        }
    };

  return (
    <Form 
        _type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={UpdatePrompt}
    />
  )
};

export default EditPrompt;
