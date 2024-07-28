export const checkValidateData = (email, password, username) => {
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );

  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
    password
  );

  const isUsernameValid = /^[a-zA-Z0-9._-]{3,}$/.test(username);

  if (!isEmailValid) return "Email ID is not valid";

  if (!isPasswordValid) return "Password is not valid";

  if (!isUsernameValid) return "Username ,should be at least 3 characters long";

  return null;
};

export const checkProfileData = (pan, contactNumber) => {
  const isPanValid = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);

  const isContactNumberValid = /^(\+91[\s-]?)?(\d{10})$/.test(contactNumber);

  if (!isPanValid) return "PAN Number is not Valid";

  if (!isContactNumberValid) return "Contact Number is not Valid";

  return null;
};
