import axios, {AxiosResponse} from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:8080/api', // For Android emulator
  // baseURL: 'http://localhost:8080/api', // For iOS simulator
  // baseURL: 'http://YOUR_LOCAL_IP:8080/api', // For physical devices
});

interface SignUpResponse {
  message: string;
  token?: string;
}

interface LoginResponse {
  token: string;
}

export const signUp = async (
  fullName: string,
  email: string,
  password: string,
): Promise<SignUpResponse> => {
  try {
    const response: AxiosResponse<SignUpResponse> = await api.post(
      '/auth/signup',
      {fullName, email, password},
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const login = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await api.post(
      '/auth/login',
      {email, password},
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;
