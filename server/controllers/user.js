import users from "../models/auth.js";

export const getUserProfile = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await users.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching profile", error: error.message });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.find();

    if (!allUsers || allUsers.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(allUsers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  const userId = req.params.id;
  const { username, contactNumber, pan, email, bio } = req.body;

  try {
    const user = await users.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username) user.username = username;
    if (contactNumber) user.contactNumber = contactNumber;
    if (pan) user.pan = pan;
    if (email) user.email = email;
    if (bio) user.bio = bio;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};
