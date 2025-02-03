import axios from "axios";
import { registerSchema } from "../../zod/exam-1";
import { RegisterFormData } from "../../zod/exam-1";

export const registerUser = async (formData: RegisterFormData) => {
  try {
    // Validate the form data using Zod schema
    const validatedData = registerSchema.parse(formData);

    // Check if passwords match
    if (validatedData.password !== validatedData.confirmPassword) {
      return { success: false, errors: { confirmPassword: "Passwords do not match" } };
    }

    const { confirmPassword, ...dataToSend } = validatedData;

    // Check if email or phone number already exists
    const existingUserResponse = await axios.get("http://localhost:5000/users");
    const existingUser = existingUserResponse.data.find(
      (user: { email: string; phone: string }) => 
        user.email === formData.email || user.phone === formData.phone
    );

    if (existingUser) {
      return { success: false, errors: { server: "Email or phone number already exists." } };
    }

    // If no existing user, proceed with registration
    const response = await axios.post("http://localhost:5000/users", dataToSend);

    if (response.status === 201) {
      return { success: true, successMessage: "Registration successful" };
    }

    return { success: false, errors: { server: "An error occurred while registering." } };
  } catch (error: unknown) {
    // Handle any error that occurs during the API calls
    if (axios.isAxiosError(error)) {
      return { success: false, errors: { server: error.response?.data?.message || "Network error. Please try again." } };
    }

    return { success: false, errors: { server: "An unknown error occurred." } };
  }
};
