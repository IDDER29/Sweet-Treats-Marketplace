"use server";
// utils/api.ts
import axios from "axios";

export const registerBusiness = async (data: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      // Handle successful registration (e.g., redirect to login or show success message)
      console.log("Business registered successfully");
    } else {
      // Handle errors
      console.error("Failed to register business");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
