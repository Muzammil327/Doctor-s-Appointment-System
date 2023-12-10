"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import Loader from "../components/Loader/page";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const [loadings, setLoadings] = useState(false);
  const router = useRouter();
  const [datas, setDatas] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    cpassword: "",
    role: "",
  });

  const SubmitHandle = async (e: any) => {
    e.preventDefault();

    const URL = `${process.env.NEXT_PUBLIC_BACKEND}/doctor/register`;
    const res = await axios.post(
      URL,
      {
        fname: datas.fname,
        lname: datas.lname,
        username: datas.username,
        email: datas.email,
        password: datas.password,
        cpassword: datas.cpassword,
        role: datas.role,
      },
      { withCredentials: true }
    );
    if (res.data.error) {
      toast.error(res.data.error);
    } else {
      toast.success(res.data.message);

      setLoadings(true);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setTimeout(() => {
        router.push("/login");
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
                    <h3>Doctor Register</h3>
                  </div>
                  <fieldset>
                    <div className="w-full relative mb-4">
                      <input
                        type="text"
                        name="first_name"
                        className="input"
                        placeholder="First Name"
                        value={datas.fname}
                        onChange={(e) =>
                          setDatas({ ...datas, fname: e.target.value })
                        }
                      />{" "}
                    </div>
                    <div className="w-full relative mb-4">
                      <input
                        type="text"
                        name="last_name"
                        value={datas.lname}
                        onChange={(e) =>
                          setDatas({ ...datas, lname: e.target.value })
                        }
                        className="input"
                        placeholder="Last Name"
                      />{" "}
                    </div>
                    <div className="w-full relative mb-4">
                      <input
                        type="text"
                        name="username"
                        className="input"
                        placeholder="username"
                        value={datas.username}
                        onChange={(e) =>
                          setDatas({ ...datas, username: e.target.value })
                        }
                      />{" "}
                    </div>
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

                    <div className="w-full relative mb-4">
                      {" "}
                      <input
                        type="password"
                        name="verify_password"
                        className="input"
                        placeholder="Retype Password*"
                        value={datas.cpassword}
                        onChange={(e) =>
                          setDatas({ ...datas, cpassword: e.target.value })
                        }
                      />{" "}
                    </div>
                    <label>
                      Role:
                      <select
                        value={datas.role}
                        onChange={(e) =>
                          setDatas({ ...datas, role: e.target.value })
                        }
                      >
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                      </select>
                    </label>
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
                      <Link href="/login" className="text-red-500">
                        &nbsp;Login Now
                      </Link>
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
