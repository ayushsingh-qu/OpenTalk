import api from "../../config";

export const SignupUser = async (name: string, email: string, password: string) => {
  const res = await api.post('/api/v1/auth/signup', { name, email, password });
  localStorage.setItem("token", res.data.jwt);
  return res.data;
};

export const SigninUser = async (email: string, password: string) => {
  const res = await api.post('/api/v1/auth/signin', { email, password });
  localStorage.setItem("token", res.data.jwt);
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await api.get('/api/v1/blog/me');
  return res.data;
};

// PUT /api/v1/auth/me — update authenticated user's profile
export const updateUserApi = async (data: { name?: string; email?: string; password?: string }) => {
  const res = await api.put('/api/v1/auth/me', data);
  return res.data;
};