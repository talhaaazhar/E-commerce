import { loginApi, registerApi } from "../../../api/auth";

export const loginService = async (payload) => {
  const data = await loginApi(payload);

  // store token
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data.user;
};

export const registerService = async (payload) => {
  const data = await registerApi(payload);

  localStorage.setItem("access_token", data.access_token);
  const user = data.user ?? data;
  localStorage.setItem("user", JSON.stringify(user));

  return user;
};
