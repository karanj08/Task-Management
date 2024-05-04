import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth.slice";

const Signup = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const isloggedin = useSelector((state) => state.auth.isloggedin);
  console.log(isloggedin);

  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      console.log("signup vadu");
      Navigate("/");
    }
  });

  // if (isloggedin) {
  //   Navigate("/");
  // }
  const [Data, setData] = useState({ username: "", email: "", password: "" });
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
      if (Data.username === "" || Data.email === "" || Data.password === "") {
        alert("All fields are required");
      } else {
        await axios.post(`${window.location.origin}/api/V1/sign-in`, Data);
        setData({ username: "", email: "", password: "" });
        // console.log(response.data.message);
        dispatch(login());
        Navigate("/log-in");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-[98vh]">
      <div className="bg-pink-600 w-3/4 sm:w-1/2  lg:w-1/4 rounded-xl p-4">
        <div className="font-bold text-xl mb-2">SignUp</div>
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
          type="email"
          placeholder="email"
          className="bg-slate-100 px-4 py-2 my-2 rounded-md w-full text-black font-medium"
          required
          name="email"
          value={Data.email}
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
            className="px-5 py-2 text-lg font-medium mt-2 bg-purple-500 w-[50] rounded-md hover:scale-105 transition-all duration-100"
            onClick={submit}
          >
            SignUp
          </button>
          <Link
            className="hover:font-medium transition-all duration-300 px-3 py-2 mt-2"
            to={"/log-in"}
          >
            Already having an account ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
