import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { checkProfileData } from "../component/utils/validate";

const useUserProfile = (userId, token) => {
  const [name, setName] = useState("");
  const [useremail, setUserEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [pan, setPan] = useState("");
  const [bio, setBio] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `https://e-shop-mern-project.vercel.app/api/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const userProfile = response.data;
          setName(userProfile.username);
          setUserEmail(userProfile.email);
          setContactNumber(userProfile.contactNumber);
          setPan(userProfile.pan);
          setBio(userProfile.bio);
        }
      } catch (error) {
        console.error("Error fetching user profile: ", error);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId, token]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const msg = checkProfileData(pan, contactNumber);
    if (msg) {
      setErrorMsg(msg);
      return;
    }

    try {
      const response = await axios.put(
        `https://e-shop-mern-project.vercel.app/api/user/${userId}`,
        {
          username: name,
          contactNumber,
          pan,
          bio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Swal.fire("Success", "Profile updated successfully", "success");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update profile: " + error.message, "error");
    }
  };

  return {
    name,
    setName,
    useremail,
    contactNumber,
    setContactNumber,
    pan,
    setPan,
    bio,
    setBio,
    errorMsg,
    setErrorMsg,
    handleUpdateProfile,
  };
};

export default useUserProfile;
