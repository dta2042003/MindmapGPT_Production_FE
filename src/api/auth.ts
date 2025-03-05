import axios from 'axios'

const API_URL = 'https://localhost:7093/api/auth';
//onst API_URL = 'http://103.179.185.114:8090/api/auth';
export const registerUser = async (value: any) => {
  try {
    console.log(value);
    const response = await axios.post(`${API_URL}/register`, value, {
        withCredentials: true,
      });
    console.log(response);
    return { success: true, message: response.data.message };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || 'Kiểm tra lại thông tin'};
  }
}

export const loginUser = async (value: any) => {
  try {
    console.log(value);
    const response = await axios.post(`${API_URL}/login`, value, {
        withCredentials: true,
      });
    console.log(response);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('role', response.data.role == 0 ? "Admin": "User");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || 'Kiểm tra lại tài khoản' };
  }
}
