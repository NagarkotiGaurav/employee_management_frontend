import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const [check, setCheck] = useState(false);

  axios.defaults.withCredentials = true;
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!check) {
      setError("please agree to terms first");
      return;
    }

    axios
      .post("http://localhost:3306/auth/adminlogin/", values)
      .then((result) => {
        if (result.data.loginStatus) {
          localStorage.setItem("valid", true);
          navigate("/dashboard");
        } else {
          setError(result.data.Error);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="flex justify-center items-center h-dvh bg-gradient-to-b from-[#1532ec] to-white bg-cover ">
      <div className="*:m-3 flex flex-col items-center border-2 rounded-md px-6 pt-3 pb-8 bg-gradient-to-r from-blue-900 to-blue-700 opacity-95">
        <div className="text-red-800">{error && error}</div>

        <h2 className="text-2xl ">
          <strong>Login Page</strong>
        </h2>

        <form onSubmit={handleSubmit}>
          <div className=" flex flex-col">
            <label htmlFor="e-mail" className="text-lg font-medium">
              E-mail :
            </label>
            <input
              type="email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              name="email"
              autoComplete="off"
              className="rounded-md outline-1 outline ps-2"
              placeholder="e-mail"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-lg font-medium">
              Password :
            </label>
            <input
              type="password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              name="password"
              placeholder="password"
              className="rounded-md outline-1 outline ps-2"
            />
          </div>
          <div className="my-2 ">
            <input
              type="checkbox"
              name="tick"
              checked={check}
              onChange={(e) => setCheck(e.target.checked)}
            />
            <label htmlFor="tick" className="px-2">
              I accept all the terms & conditions
            </label>
          </div>
          <button type="submit" className="bg-green-700 rounded-lg px-3 my-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
