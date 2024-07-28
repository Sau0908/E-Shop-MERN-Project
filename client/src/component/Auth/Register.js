import React from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const {
    formData,
    isRegisterForm,
    errorMsg,
    toggleRegisterForm,
    handleChange,
    handleSubmit,
  } = useAuth({
    username: "",
    email: "",
    password: "",
    bio: "",
  });

  return (
    <div className="flex flex-col justify-center p-4">
      <form className="space-y-6" onSubmit={(e) => handleSubmit(e, navigate)}>
        {isRegisterForm && (
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            fullWidth
            required
            className="mb-4"
            value={formData.username}
            onChange={handleChange}
          />
        )}
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          required
          className="mb-4"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          variant="outlined"
          fullWidth
          required
          type="password"
          className="mb-4"
          value={formData.password}
          onChange={handleChange}
        />
        {isRegisterForm && (
          <TextField
            label="Bio"
            name="bio"
            variant="outlined"
            fullWidth
            multiline
            rows={2}
            className="mb-4"
            value={formData.bio}
            onChange={handleChange}
          />
        )}
        <h4 className="text-red-600 py-2 text-lg">{errorMsg}</h4>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="py-3"
        >
          {isRegisterForm ? "Register" : "Login"}
        </Button>
      </form>
      <p
        className="text-center mt-4 hover:cursor-pointer"
        onClick={toggleRegisterForm}
      >
        {isRegisterForm
          ? "Already have an Account? Login"
          : "New to E-Shop? Register"}
      </p>
    </div>
  );
};

export default Register;
