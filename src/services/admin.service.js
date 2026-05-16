import axiosInstance from "../api/axios";

export const getDashboardAnalytics =
  async () => {
    const response =
      await axiosInstance.get(
        "/admin/analytics",
      );

    return response.data.data;
  };