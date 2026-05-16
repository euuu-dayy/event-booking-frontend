import axiosInstance from "../api/axios";

export const logoutUserApi =
  async () => {
    const response =
      await axiosInstance.post(
        "/auth/logout",
      );

    return response.data;
  };