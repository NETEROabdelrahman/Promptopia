"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import axios from 'axios'

import Profile from "@components/Profile";

const MyProfile = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const pathName = usePathname();
    const path = pathName.split('/')[2]

    const [myPosts, setMyPosts] = useState([]);
    const [username, setUsername] = useState('');
    //console.log(myPosts[0].creator.username )


  useEffect(() => {
    
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/api/users/${path}/posts`);
        const data = response.data;
        setMyPosts(data);
        setUsername(data[0].creator.username)
      } catch (error) {
        console.log(error);
      } 
      
    };
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      
      try {
        await axios.delete(`/api/prompt/${post._id.toString()}`);
        const filteredPosts = myPosts.filter((item) => item._id !== post._id);
        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name={username}
    //   desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;