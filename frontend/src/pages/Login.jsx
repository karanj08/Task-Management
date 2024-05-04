import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/auth.slice";

const Login = () => {
  console.log("Hii");
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      console.log("login vadu");
      Navigate("/");
    }
  });

  const [Data, setData] = useState({ username: "", password: "" });
  const change = (e) => {
    // console.log(e.target);

    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setData({ ...Data, [name]: value });
    console.log(Data);
  };
  const submit = async () => {
    try {
      if (Data.username === "" || Data.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          `${window.location.origin}/api/V1/log-in`,
          Data
        );
        setData({ username: "", password: "" });
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        console.log(response);
        dispatch(login());
        Navigate("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-[98vh]">
      <div className="bg-pink-600 w-3/4 sm:w-1/2 lg:w-1/3 rounded-xl p-4">
        <div className="font-bold text-xl mb-2">LogIn</div>
        <input
          type="username"
          placeholder="username"
          className="bg-slate-100 px-4 py-2 my-2 text-black font-medium rounded-md w-full"
          required
          name="username"
          value={Data.username}
          onChange={change}
        />

        <input
          type="password"
          placeholder="password"
          className="bg-slate-100 px-4 py-2 my-2 rounded-md w-full  text-black font-medium "
          required
          name="password"
          value={Data.password}
          onChange={change}
        />
        <div className="w-full flex justify-between items-center">
          <button
            className="px-5 py-2 text-lg font-medium mt-2 bg-purple-500 w-[50] rounded-md hover:scale-105 transition-all duration-300"
            onClick={submit}
          >
            LogIn
          </button>
          <Link
            className="hover:font-medium transition-all duration-300 px-5 py-2 mt-2"
            to={"/sign-in"}
          >
            Want to Create Account..?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
