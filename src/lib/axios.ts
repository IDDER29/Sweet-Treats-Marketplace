// lib/axios.ts (Axios instance setup)
import { auth } from "@/auth";
import axios from "axios";
import { getSession } from "next-auth/react";

// Create an Axios instance
const axiosInstance = axios.create();

// Set up an Axios interceptor to include the token
axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await auth();

    if (session && session.user) {
      config.headers.Authorization = `Bearer ${session}`; // Attach JWT token
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
