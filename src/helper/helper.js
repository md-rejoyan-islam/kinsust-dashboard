// check is email or not
export const isEmail = (email) => {
  const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  return pattern.test(email);
};
