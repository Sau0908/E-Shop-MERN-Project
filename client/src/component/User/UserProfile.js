import React from "react";
import { useSelector } from "react-redux";
import { TextField, Button } from "@mui/material";
import useUserProfile from "../../hooks/useUserProfile";
import LeftNav from "../Home/LeftNav";
import Header from "../Header/Header";

const UserProfile = () => {
  const user = useSelector((state) => state.user);
  const { id, token } = user?.userInfo || {};

  const {
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
  } = useUserProfile(id, token);

  return (
    <div>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="w-full md:w-1/4 bg-gray-800 text-white p-6 flex-shrink-0">
          <LeftNav />
        </div>
        <div className="flex-1 md:mt-20 mt-0 text-white p-6">
          <h2 className="text-2xl flex font-bold mb-6 text-black">
            My Profile
            {user.isAdmin && (
              <div className="ml-2">
                <h2>(Admin)</h2>
              </div>
            )}
          </h2>
          <div className="bg-gray-300 p-6 rounded-lg shadow-lg">
            <div className="mb-6 flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-2xl font-bold">
                {name ? name.charAt(0) : "U"}
              </div>
              <div className="ml-4 text-black">
                <h3 className="text-xl font-semibold">{name}</h3>
                <p>{useremail}</p>
              </div>
            </div>
            <form className="space-y-6" onSubmit={handleUpdateProfile}>
              <div className="flex items-center">
                <TextField
                  fullWidth
                  label="Account Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={useremail}
                  disabled
                />
              </div>
              <div className="flex items-center">
                <TextField
                  fullWidth
                  label="Contact Number"
                  variant="outlined"
                  placeholder="Add Number"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <TextField
                  fullWidth
                  label="PAN"
                  variant="outlined"
                  placeholder="EX: AFQPA7358J"
                  value={pan}
                  onChange={(e) => setPan(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <TextField
                  fullWidth
                  label="Bio"
                  variant="outlined"
                  placeholder="Set Bio Again"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div>
                <h4 className="text-red-600 py-2 text-lg">{errorMsg}</h4>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Update Profile
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
