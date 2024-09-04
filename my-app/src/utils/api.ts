"use server";
// utils/api.ts
import axios, { AxiosResponse } from "axios";

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
