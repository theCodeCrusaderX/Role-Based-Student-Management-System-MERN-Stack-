import { useState } from "react";
import { Button } from "./ui/button";

function Form({ onSubmit, type = "register" }) {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    course: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const payload =
      type === "login" ? { email: data.email, password: data.password } : data;

    onSubmit(payload);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {type === "register" && (
        <input
          name="name"
          value={data.name}
          onChange={handleChange}
          placeholder="Name"
        />
      )}

      <input
        name="email"
        value={data.email}
        onChange={handleChange}
        placeholder="Email"
        type="email"
      />

      {type === "register" && (
        <input
          name="course"
          value={data.course}
          onChange={handleChange}
          placeholder="Course"
          type="course"
        />
      )}

      <input
        name="password"
        value={data.password}
        onChange={handleChange}
        placeholder="Password"
        type="password"
      />

      <Button type="submit">
        {type === "register" ? "Register" : "Login"}
      </Button>
    </form>
  );
}

export default Form;
