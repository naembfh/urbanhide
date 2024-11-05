// services/ProfileService.js
import axiosInstance from "@/app/lib/AxiosInstance";

export const getMyProfile = async () => {
  try {
    const res = await axiosInstance.get('/profile/my-profile');
    console.log(res.data); // Logs the response data
    return res.data;
  } catch (error) {
    console.error('Error fetching profile data:', error);
    throw new Error('Failed to fetch profile data');
  }
};
