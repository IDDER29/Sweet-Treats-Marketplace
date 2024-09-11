"use server";
// utils/api.ts
import axios, { AxiosResponse } from "axios";
import axiosInstance from "@/lib/axios";
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

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const registerBusiness = async (
  data: BusinessRegistrationData
): Promise<ApiResponse> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""; // Provide a fallback if env is missing

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
  } catch (error: any) {
    console.error("API Error:", error.response || error.message);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An error occurred during registration.",
    };
  }
};

export const getBusinessesByEmail = async (
  email: string
): Promise<ApiResponse> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""; // Provide a fallback if env is missing

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
  } catch (error: any) {
    console.error("API Error:", error.response || error.message);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An error occurred while fetching businesses.",
    };
  }
};

export const businessesLogIn = async (
  email: string,
  password: string
): Promise<ApiResponse> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""; // Provide a fallback if env is missing

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
        message: "Businesses fetched successfully.",
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: "Failed to fetch businesses. Please try again.",
      };
    }
  } catch (error: any) {
    console.error("API Error:", error.response || error.message);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An error occurred while fetching businesses.",
    };
  }
};

// Function to send product data to the server
export const createNewProduct = async (productData: any) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""; // Provide a fallback if env is missing
  try {
    const session = await auth(); // Get the session from NextAuth
    const sessionReq = JSON.stringify(session);

    // Ensure that session.user exists and contains the user ID
    if (!session?.user?.id) {
      throw new Error("User is not authenticated");
    }

    const response = await axios.post(`${apiUrl}/products`, productData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionReq}`, // Send the user ID in the headers
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error submitting product:", error);
    throw error;
  }
};

export const getBusinessesProducts = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""; // Provide a fallback if env is missing
  try {
    const session = await auth(); // Get the session from NextAuth
    const sessionReq = JSON.stringify(session);

    // Ensure that session.user exists and contains the user ID
    if (!session?.user?.id) {
      throw new Error("User is not authenticated");
    }

    const response = await axios.get(`${apiUrl}/products`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionReq}`, // Send the user ID in the headers
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error submitting product:", error);
    throw error;
  }
};

export const deleteProductById = async (id: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""; // Provide a fallback if env is missing
  try {
    const session = await auth(); // Get the session from NextAuth
    const sessionReq = JSON.stringify(session);

    // Ensure that session.user exists and contains the user ID
    if (!session?.user?.id) {
      throw new Error("User is not authenticated");
    }

    const response = await axios.delete(`${apiUrl}/products/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionReq}`, // Send the user ID in the headers
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error submitting product:", error);
    throw error;
  }
};

// utils/api.ts
export async function getProductById(productId: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""; // Provide a fallback if env is missing

  try {
    const session = await auth(); // Get the session from NextAuth
    const sessionReq = JSON.stringify(session);

    // Ensure that session.user exists and contains the user ID
    if (!session?.user?.id) {
      throw new Error("User is not authenticated");
    }
    const response = await axios.get(`${apiUrl}/products/${productId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionReq}`, // Send the user ID in the headers
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error; // Rethrow the error for the caller to handle
  }
}

export async function updateProduct(
  productId: string,
  updatedProductData: any
) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""; // Provide a fallback if env is missing
  try {
    const session = await auth(); // Get the session from NextAuth
    const sessionReq = JSON.stringify(session);

    // Ensure that session.user exists and contains the user ID
    if (!session?.user?.id) {
      throw new Error("User is not authenticated");
    }
    const response = await axios.put(
      `${apiUrl}/products/${productId}`,
      updatedProductData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionReq}`, // Send the user ID in the headers
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error; // Rethrow the error for the caller to handle
  }
}

export async function getAllProducts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""; // Provide a fallback if env is missing

  try {
    const response = await axios.get(`${apiUrl}/products`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error; // Rethrow the error for the caller to handle
  }
}
