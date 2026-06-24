"use server";
// utils/api.ts
import axios, { AxiosResponse } from "axios";
import { auth } from "@/auth";

interface BusinessRegistrationData {
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  password: string;
  businessType: string;
  address: string;
  phoneNumber: string;
  agreeToTerms: boolean;
}

interface BusinessData {
  id: string;
  name: string;
  email: string;
  [key: string]: unknown;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: BusinessData;
}

// Create axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10_000,
});

// Add interceptor to include session token in every request
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const session = await auth();
      if (session?.user?.id) {
        config.headers.Authorization = `Bearer ${session.user.id}`;
      }
      return config;
    } catch (error) {
      throw error;
    }
  },
  (error) => {
    throw error;
  }
);

export const registerBusiness = async (
  data: BusinessRegistrationData
): Promise<ApiResponse> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

  try {
    const response: AxiosResponse = await axios.post(
      `${apiUrl}/business/register`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      return {
        success: true,
        message: "Business registered successfully.",
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: "Failed to register business. Please try again.",
      };
    }
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: { message?: string } }; message?: string };
    return {
      success: false,
      message:
        axiosError.response?.data?.message ||
        "An error occurred during registration.",
    };
  }
};

export const getBusinessesByEmail = async (
  email: string
): Promise<ApiResponse> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

  try {
    const response: AxiosResponse = await axios.get(
      `${apiUrl}/business/email/${email}`
    );

    if (response.status === 200) {
      return {
        success: true,
        message: "Businesses fetched successfully.",
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: "Failed to fetch businesses. Please try again.",
      };
    }
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: { message?: string } } };
    return {
      success: false,
      message:
        axiosError.response?.data?.message ||
        "An error occurred while fetching businesses.",
    };
  }
};

export const businessesLogIn = async (
  email: string,
  password: string
): Promise<ApiResponse> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

  try {
    const response: AxiosResponse = await axios.post(
      `${apiUrl}/business/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      return {
        success: true,
        message: "Login successful.",
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: "Login failed. Please try again.",
      };
    }
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: { message?: string } } };
    return {
      success: false,
      message:
        axiosError.response?.data?.message ||
        "An error occurred during login.",
    };
  }
};

export const createNewProduct = async (productData: Record<string, unknown>) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("User is not authenticated");
    }
    const response = await axios.post(`${apiUrl}/products`, productData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.id}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBusinessesProducts = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("User is not authenticated");
    }
    const response = await axios.get(`${apiUrl}/products`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.id}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProductById = async (id: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("User is not authenticated");
    }
    const response = await axios.delete(`${apiUrl}/products/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.id}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export async function getProductById(productId: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("User is not authenticated");
    }
    const response = await axios.get(`${apiUrl}/products/${productId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.id}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateProduct(
  productId: string,
  updatedProductData: Record<string, unknown>
) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("User is not authenticated");
    }
    const response = await axios.put(
      `${apiUrl}/products/${productId}`,
      updatedProductData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.id}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getAllProducts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
  try {
    const response = await axios.get(`${apiUrl}/products`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
