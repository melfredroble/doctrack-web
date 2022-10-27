import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import "../index.css";
import axios from "axios";

const socket = io.connect("http://localhost:3001");

const Login = () => {
  const [message, setMessage] = useState("");
  //   const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   socket.on("received_message", (data) => {
  //     alert(data.message);
  //   });
  // }, [socket]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const login = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/login", {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.loggedIn) {
          navigate("/");
          localStorage.setItem("userId", JSON.stringify(response.data.user));
        } else {
          setMessage("Invalid email/password");
        }
      });
  };

  return (
    <div className="relative bg-indigo-50 flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-80 p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Sign in
        </h1>
        <p>{message}</p>
        <form onSubmit={login} className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <a className="text-xs text-purple-600 hover:underline">
            Forget Password?
          </a>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transhtmlForm bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          Don't have an account?
          <a className="font-medium text-purple-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
