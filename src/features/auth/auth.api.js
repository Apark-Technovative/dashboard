export const loginAPI = async ({ email, password }) => {
  if (email === "admin@gmail.com" && password === "admin123") {
    return {
      token: "fake-jwt-token",
      user: { name: "John Doe", role: "Admin" },
    };
  }

  throw new Error("Invalid credentials");
};
