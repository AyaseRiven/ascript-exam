"use client";
import React, { useState } from "react";
import { registerUser } from "../exam-1/action";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
  gender: "male" | "female" | "other";
}

interface ErrorResponse {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  address?: string;
  gender?: string;
  server?: string;
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    gender: "male",
  });

  const [errors, setErrors] = useState<ErrorResponse>({});
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});
    setSuccessMessage("");

    const result = await registerUser(formData);

    if (result.success) {
      setSuccessMessage(result.successMessage || "");
    } else {
      const serverErrors: ErrorResponse = result.errors || {};
      setErrors({
        fullName: serverErrors.fullName || "",
        email: serverErrors.email || "",
        password: serverErrors.password || "",
        confirmPassword: serverErrors.confirmPassword || "",
        phone: serverErrors.phone || "",
        address: serverErrors.address || "",
        gender: serverErrors.gender || "",
        server: serverErrors.server || "",
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-black">
      <video autoPlay muted loop className="absolute w-full h-full object-cover z-0">
        <source src="/bg/bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <div className=" relative z-20">
        {" "}
        <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50 ">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h2>

            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                  errors.fullName ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
                }`}
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                  errors.email ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                  errors.password ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
                }`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                  errors.confirmPassword ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
                }`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="phone">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                  errors.phone ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
                }`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="address">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                  errors.address ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
                }`}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="gender">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                  errors.gender ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
                }`}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>

            {errors.server && <p className="text-red-500 text-sm mb-4">{errors.server}</p>}
            {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-semibold rounded-full text-sm px-5 py-2.5 text-center"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
