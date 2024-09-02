"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSignupMutation } from "@/redux/services/authService";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation"; // Corrected the import path
import Link from "next/link";

const Signup = () => {
  const [signup, { isLoading }] = useSignupMutation();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
      confirmPassword: "",
      image: null,
      about: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
      role: Yup.string().required("Role is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      if (values.password !== values.confirmPassword) {
        return toast.error("Passwords do not match");
      }

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("role", values.role);
      formData.append("about", values.about);

      if (values.image) {
        formData.append("image", values.image);
      }

      try {
        const res = await signup(formData).unwrap();
        toast.success(res.message);
        router.push("/");
      } catch (error) {
        console.log(error);
        toast.error(error.data?.message || "Signup failed");
      }
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
  } = formik;

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto cursor-pointer"
          src="/logo.png"
          alt="Your Company"
          onClick={() => router.push("/home")}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl border shadow rounded-lg p-5">
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          {["name", "email", "password", "confirmPassword"].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {field
                  .split(/(?=[A-Z])/)
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </label>
              <div className="mt-2">
                <input
                  id={field}
                  name={field}
                  type={
                    field === "password" || field === "confirmPassword"
                      ? "password"
                      : field === "email"
                      ? "email"
                      : "text"
                  }
                  required
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field]}
                  className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {touched[field] && errors[field] && (
                  <div className="text-red-500 text-sm">{errors[field]}</div>
                )}
              </div>
            </div>
          ))}

          <div>
            <label
              htmlFor="about"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              About
            </label>

            <textarea
              rows={4}
              name="about"
              onChange={handleChange}
              value={values.about}
              maxLength={200}
              className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>

          <div role="group" aria-labelledby="role-group-label">
            <div
              id="role-group-label"
              className="text-sm font-medium leading-6 text-gray-900 my-2"
            >
              Role
            </div>
            <div className="flex justify-between px-3 shadow py-2 rounded border">
              {["user", "admin", "vendor"].map((roleOption) => (
                <label key={roleOption} className="block">
                  <input
                    type="radio"
                    name="role"
                    value={roleOption}
                    checked={values.role === roleOption}
                    onChange={() => setFieldValue("role", roleOption)}
                    className="mr-2 cursor-pointer"
                  />
                  {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                </label>
              ))}
            </div>
            {touched.role && errors.role && (
              <div className="text-red-500 text-sm">{errors.role}</div>
            )}
          </div>

          <div role="group" aria-labelledby="role-group-label">
            <div
              id="role-group-label"
              className="text-sm font-medium leading-6 text-gray-900 my-2"
            >
              Profile Image
            </div>
            <div className="flex justify-between px-3 shadow py-2 rounded border">
              <input
                type="file"
                onChange={(e) =>
                  setValues({ ...values, image: e.target.files[0] })
                }
                className="w-full"
                required
                accept="image/*"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
