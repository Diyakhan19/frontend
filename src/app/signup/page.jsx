// "use client";
// import React, { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useSignupMutation } from "@/redux/services/authService";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import React from "react";
// import Link from "next/link";





// const Signup = () => {
//   const [signup, { isLoading }] = useSignupMutation();
//   const router = useRouter();

//   const formik = useFormik({
//     initialValues: {
//       fullName: "",
//       email: "",
//       password: "",
//       role: "",
//       confirmPassword : "",
//     },
//     validationSchema: Yup.object({
//       fullName: Yup.string()
//       .required("Fullname is required"),
//       email: Yup.string()
//         .email("Email is invalid")
//         .required("Email is required"),
//       password: Yup.string().required("Password is required"),
//       role: Yup.string()
//       .required("role is required"),
//       confirmPassword: Yup.string()  // Changed from confirm-password
//         .oneOf([Yup.ref('password'), null], "Passwords must match")  
//     }),
//     onSubmit: async (values) => {
//       const body = {
//         fullName: values.full-name,
//         email: values.email,
//         password: values.password,
//         role: values.role,
//         confirmPassword: values.confirm-password,

//       };

//       try {
//         const res = await signup(body).unwrap();
//         toast.success(res.message);
//         router.push("/");
//       } catch (err) {
//         toast.error(err?.data?.message);
//       }
//     },
//   });

//   const { values, errors, touched, handleChange, handleSubmit } = formik;
//   const { fullName, email, password, confirmPassword, role } = values;
//   return (
//     <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//         <img
//           className="mx-auto h-10 w-auto"
//           src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
//           alt="Your Company"
//         />
//         <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//           Create your account
//         </h2>
//       </div>

//       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//         <form className="space-y-6" action="#" method="POST">
//           <div>
//             <label
//               htmlFor="fullName"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Full Name
//             </label>
//             <div className="mt-2">
//               <input
//                 id="fullName"
//                 name="fullName"
//                 type="text"
//                 autoComplete="name"
//                 required
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Email address
//             </label>
//             <div className="mt-2">
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Password
//             </label>
//             <div className="mt-2">
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="new-password"
//                 required
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="confirm-password"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Confirm Password
//             </label>
//             <div className="mt-2">
//               <input
//                 id="confirm-password"
//                 name="confirm-password"
//                 type="password"
//                 autoComplete="new-password"
//                 required
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//             >
//               Sign up
//             </button>
//           </div>
//         </form>

//         <p className="mt-10 text-center text-sm text-gray-500">
//           Already have an account?{' '}
//           <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
//             Sign in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;


// "use client";
// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useSignupMutation } from "@/redux/services/authService";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// const Signup = () => {
//   const [signup, { isLoading }] = useSignupMutation();
//   const router = useRouter();

//   const formik = useFormik({
//     initialValues: {
//       fullName: "",
//       email: "",
//       password: "",
//       role: "",
//       confirmPassword: "",
//     },
//     validationSchema: Yup.object({
//       fullName: Yup.string().required("Full name is required"),
//       email: Yup.string().email("Invalid email address").required("Email is required"),
//       password: Yup.string().required("Password is required"),
//       role: Yup.string().required("Role is required"),
//       confirmPassword: Yup.string()
//         .oneOf([Yup.ref('password'), null], "Passwords must match")
//         .required("Confirm password is required"),
//     }),
//     onSubmit: async (values) => {
//      if (values.password !== values.confirmPassword){
//       return toast.error("password not match")
//      }
//       const body = {
//         name: values.fullName,
//         email: values.email,
//         password: values.password,
//         role: values.role,
     
//       };

//       try {
//         const res = await signup(body).unwrap();
//         toast.success(res.message);
//         router.push("/");
//       } catch (error) {
//         toast.error(error.data?.message || "Signup failed");
//       }
//     },
//   });

//   // Destructuring for easier access in the form
//   const { values, errors, touched, handleChange, handleSubmit } = formik;


//   return (
//     <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//         <img
//           className="mx-auto h-10 w-auto"
//           src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
//           alt="Your Company"
//         />
//         <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//           Create your account
//         </h2>
//       </div>

//       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {['fullName', 'email', 'password', 'confirmPassword', 'role'].map((field) => (
//             <div key={field}>
//               <label htmlFor={field} className="block text-sm font-medium leading-6 text-gray-900">
//                 {field.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
//               </label>
//               <div className="mt-2">
//                 <input
//                   id={field}
//                   name={field}
//                   type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
//                   autoComplete={field}
//                   required
//                   onChange={handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values[field]}
//                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//                 {touched[field] && errors[field] && (
//                   <div className="text-red-500 text-sm">{errors[field]}</div>
//                 )}
//               </div>
//             </div>
//           ))}
          
//           <div>
            
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//             >
//               Sign up
//             </button>
//           </div>
//         </form>

//         <p className="mt-10 text-center text-sm text-gray-500">
//           Already have an account?{' '}
//           <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
//             Sign in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;
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
      fullName: "",
      email: "",
      password: "",
      role: "", // Ensure this is initialized as empty to enforce selection
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().required("Password is required"),
      role: Yup.string().required("Role is required"), // Ensure role must be selected
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      if (values.password !== values.confirmPassword){
        return toast.error("Passwords do not match");
      }
      const body = {
        name: values.fullName,
        email: values.email,
        password: values.password,
        role: values.role,
      };

      try {
        const res = await signup(body).unwrap();
        toast.success(res.message);
        router.push("/");
      } catch (error) {
        toast.error(error.data?.message || "Signup failed");
      }
    },
  });

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } = formik;

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {['fullName', 'email', 'password', 'confirmPassword'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium leading-6 text-gray-900">
                {field.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </label>
              <div className="mt-2">
                <input
                  id={field}
                  name={field}
                  type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
                  autoComplete={field}
                  required
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field]}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {touched[field] && errors[field] && (
                  <div className="text-red-500 text-sm">{errors[field]}</div>
                )}
              </div>
            </div>
          ))}
          <div role="group" aria-labelledby="role-group-label">
            <div id="role-group-label" className="text-sm font-medium leading-6 text-gray-900">Role</div>
            {['user', 'admin', 'vendor'].map((roleOption) => (
              <label key={roleOption} className="block">
                <input
                  type="radio"
                  name="role"
                  value={roleOption}
                  checked={values.role === roleOption}
                  onChange={() => setFieldValue('role', roleOption)}
                  className="mr-2"
                />
                {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
              </label>
            ))}
            {touched.role && errors.role && (
              <div className="text-red-500 text-sm">{errors.role}</div>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;