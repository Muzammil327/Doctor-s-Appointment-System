"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../redux/slices/doctoruserSlice";
import Loader from "../components/Loader/page";
import { toast } from "react-toastify";
import axios from "axios";
import { redirect } from "next/navigation";

export default function Home() {
  const dispatch = useDispatch();
  
  const [loadings, setLoadings] = useState(false);
  const router = useRouter();
  const [datas, setDatas] = useState({
    email: "",
    password: "",
  });

  const SubmitHandle = async (e: any) => {
    e.preventDefault();

    const URL = `${process.env.NEXT_PUBLIC_BACKEND}/doctor/login`;
    const res = await axios.post(
      URL,
      {
        email: datas.email,
        password: datas.password,
      },
      { withCredentials: true }
    );
    if (res.data.error) {
      toast.error(res.data.error);
    } else {
      toast.success(res.data.message);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setLoadings(true);
      dispatch(login(res.data.user));

      setTimeout(() => {
        router.push("/dashboard");
        setLoadings(false);
      }, 3000);
    }
  };

  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    redirect("/dashboard");
  }

  return (
    <>
      {loadings ? (
        <Loader />
      ) : (
        <div className="py-20">
          <div className="container mx-auto px-4 ">
            <div className="items-center justify-center grid lg:grid-cols-2">
              <div className="relative w-full px-4">
                <img
                  src="https://doccure-wp.dreamstechnologies.com/wp-content/themes/doccure/assets/images/login-banner.png"
                  className="img-fluid h-auto w-auto"
                  alt="Doccure Register"
                  height={400}
                  width={400}
                />
              </div>
              <div className="b1 p-7">
                <form onSubmit={SubmitHandle}>
                  <div className="mb-5 font-semibold md:text-xl text-xl">
                    <h3>Doctor Login</h3>
                  </div>
                  <fieldset>
                    <div className="w-full relative mb-4">
                      <input
                        type="email"
                        name="email"
                        className="input"
                        placeholder="Email"
                        value={datas.email}
                        onChange={(e) =>
                          setDatas({ ...datas, email: e.target.value })
                        }
                      />{" "}
                    </div>

                    <div className="w-full relative mb-4">
                      {" "}
                      <input
                        type="password"
                        name="password"
                        className="input"
                        placeholder="Password*"
                        value={datas.password}
                        onChange={(e) =>
                          setDatas({ ...datas, password: e.target.value })
                        }
                      />{" "}
                    </div>
                  </fieldset>

                  <div className="w-full relative mb-4">
                    <button className="formbtn" type="submit">
                      Signup
                    </button>
                  </div>

                  <div className="formfooter text-center w-full">
                    {" "}
                    <span className="block text-sm text-gray-800">
                      Already Have an Account?
                      <a
                        href="https://doccure-wp.dreamstechnologies.com/login"
                        className="text-red-500"
                      >
                        &nbsp;Login Now
                      </a>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
