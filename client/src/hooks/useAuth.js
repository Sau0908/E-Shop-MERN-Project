import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../component/utils/userSlice";
import { checkValidateData } from "../component/utils/validate";

const useAuth = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();

  const toggleRegisterForm = () => {
    setIsRegisterForm(!isRegisterForm);
    setFormData({
      ...formData,
      username: "",
      bio: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event, navigate) => {
    event.preventDefault();
    const { username, email, password, bio } = formData;
    const msg = checkValidateData(email, password);
    if (msg) {
      setErrorMsg(msg);
      return;
    }

    try {
      let response;
      if (isRegisterForm) {
        response = await axios.post("https://e-shop-mern-project.vercel.app/api/user/register", {
          username,
          email,
          password,
          bio,
        });
      } else {
        response = await axios.post("https://e-shop-mern-project.vercel.app/api/user/login", {
          email,
          password,
        });
      }

      const { result, token } = response.data;
      const userData = {
        username: result.username,
        email: result.email,
        id: result._id,
        token,
      };

      localStorage.setItem("Profile", JSON.stringify(userData));

      dispatch(addUser(userData));

      setFormData(initialState);

      navigate("/browse");
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "An error occurred");
    }
  };

  return {
    formData,
    isRegisterForm,
    errorMsg,
    toggleRegisterForm,
    handleChange,
    handleSubmit,
  };
};

export default useAuth;
