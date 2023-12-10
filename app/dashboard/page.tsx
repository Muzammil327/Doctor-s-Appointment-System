'use client'
import React from 'react'
import { useEffect,useState } from "react";
import axios from "axios";

export default function Page() {
    interface User {
        id: string;
        email: string;
        username: string;
        fname: string;
        lname: string;
      }
      const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const URL = `${process.env.NEXT_PUBLIC_BACKEND}/doctor/singleUser`;

    axios
      .get(URL, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("res", res)
        console.log("resData", res.data)
        console.log("resDataUser", res.data.user)
        setUser(res.data.user);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);
  console.log("user", user);
  return (
    <>
    {user && (
      <div className='mt-20'>
        <p>Name: {user.fname} - {user.lname}</p>
        <p>Email: {user.email}</p>
        <p>Username: {user.username}</p>
      </div>
    )}
  </>
  )
}
