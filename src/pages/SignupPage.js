// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import SectionWrapper from "../components/SectionWrapper";
// import { toast } from "react-toastify";
// import {
//   sendEmailOtp,
//   sendPhoneOtp,
//   verifyEmailOtp,
//   verifyPhoneOtp,
// } from "../services/api";


// const SignupPage = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     city: "",
//     state: "",
//     password: "",
//     confirmPassword: "",
//     role: "",
//     emailOtp: "",
//     phoneOtp: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [emailOtpSent, setEmailOtpSent] = useState(false);
//   const [emailOtpVerified, setEmailOtpVerified] = useState(false);
//   const [phoneOtpSent, setPhoneOtpSent] = useState(false);
//   const [phoneOtpVerified, setPhoneOtpVerified] = useState(false);
//   const [otpTimer, setOtpTimer] = useState(0);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };


//   // Handle Send Otp //
// const handleSendOtp = async (type) => {
//   const contact = type === "email" ? formData.email : formData.phone;
//   if (!contact) {
//     toast.error(`Please enter your ${type} first`);
//     return;
//   }

//   try {
//     const data = type === "email" 
//       ? await sendEmailOtp(contact)
//       : await sendPhoneOtp(contact);

//     if (data?.message === "OTP sent") {
//       toast.success(`OTP sent to your ${type}`);
//       type === "email" ? setEmailOtpSent(true) : setPhoneOtpSent(true);
//       setOtpTimer(30);
//       const interval = setInterval(() => {
//         setOtpTimer((prev) => {
//           if (prev === 1) {
//             clearInterval(interval);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     }
//   } catch (error) {
//     toast.error(error.response?.data?.message || "Failed to send OTP");
//   }
// };


// // Handle Verify Otp //
// const handleVerifyOtp = async (type) => {
//   const contact = type === "email" ? formData.email : formData.phone;
//   const enteredOtp = type === "email" ? formData.emailOtp : formData.phoneOtp;

//   try {
//     const data = type === "email"
//       ? await verifyEmailOtp(contact, enteredOtp)
//       : await verifyPhoneOtp(contact, enteredOtp);

//     if (data?.message === "OTP verified") {
//       toast.success(`${type.toUpperCase()} OTP Match Successfully`);
//       type === "email" ? setEmailOtpVerified(true) : setPhoneOtpVerified(true);
//     } else {
//       toast.error("Invalid OTP");
//     }
//   } catch (error) {
//     toast.error(error.response?.data?.message || "OTP verification failed");
//   }
// };


//   return (
//     <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white px-4 py-12 overflow-hidden">
//       <SectionWrapper id="signup-section">
//         <div className="max-w-md w-full bg-gray-800 p-8 rounded-2xl shadow-2xl transition-all duration-700 ease-in-out">
//           <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">Create Your Account</h2>

//           <form className="space-y-4 text-black">
//             <div>
//               <label className="block text-white font-bold mb-1">First Name</label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 placeholder="Enter Your First Name"
//                 className="form-input w-full rounded-lg shadow-md"
//               />
//             </div>

//             <div>
//               <label className="block text-white font-bold mb-1">Last Name</label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 placeholder="Enter Your Last Name"
//                 className="form-input w-full rounded-lg shadow-md"
//               />
//             </div>

//             <div>
//               <label className="block text-white font-bold mb-1">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//                 className="form-input w-full rounded-lg shadow-md"
//               />
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   onClick={() => handleSendOtp("email")}
//                   disabled={otpTimer > 0}
//                   className="text-sm mt-1 bg-blue-600 text-white px-3 py-1 rounded-md"
//                 >
//                   {otpTimer > 0 ? `Resend in ${otpTimer}s` : "Send OTP"}
//                 </button>
//               </div>
//             </div>

//             {emailOtpSent && !emailOtpVerified && (
//               <div>
//                 <label className="block text-white font-bold mb-1">Enter Email OTP</label>
//                 <input
//                   type="text"
//                   name="emailOtp"
//                   value={formData.emailOtp}
//                   onChange={handleChange}
//                   placeholder="Enter OTP"
//                   className="form-input w-full rounded-lg shadow-md"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => handleVerifyOtp("email")}
//                   className="bg-green-600 text-white px-3 py-2 mt-2 rounded-md w-full"
//                 >
//                   Verify OTP
//                 </button>
//               </div>
//             )}

//             <div>
//               <label className="block text-white font-bold mb-1">Phone Number</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="Enter your phone number"
//                 className="form-input w-full rounded-lg shadow-md"
//               />
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   onClick={() => handleSendOtp("phone")}
//                   disabled={otpTimer > 0}
//                   className="text-sm mt-1 bg-blue-600 text-white px-3 py-1 rounded-md"
//                 >
//                   {otpTimer > 0 ? `Resend in ${otpTimer}s` : "Send OTP"}
//                 </button>
//               </div>
//             </div>

//             {phoneOtpSent && !phoneOtpVerified && (
//               <div>
//                 <label className="block text-white font-bold mb-1">Enter Phone OTP</label>
//                 <input
//                   type="text"
//                   name="phoneOtp"
//                   value={formData.phoneOtp}
//                   onChange={handleChange}
//                   placeholder="Enter OTP"
//                   className="form-input w-full rounded-lg shadow-md"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => handleVerifyOtp("phone")}
//                   className="bg-green-600 text-white px-3 py-2 mt-2 rounded-md w-full"
//                 >
//                   Verify OTP
//                 </button>
//               </div>
//             )}

//             <div className="relative">
//               <label className="block text-white font-bold mb-1">Password</label>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Enter your password"
//                 className="form-input w-full pr-10 rounded-lg shadow-md"
//               />
//               <div
//                 className="absolute right-3 top-10 transform -translate-y-1/2 cursor-pointer"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </div>
//             </div>

//             <div className="relative">
//               <label className="block text-white font-bold mb-1">Confirm Password</label>
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Re-enter your password"
//                 className="form-input w-full pr-10 rounded-lg shadow-md"
//               />
//               <div
//                 className="absolute right-3 top-10 transform -translate-y-1/2 cursor-pointer"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//               </div>
//             </div>

//             <div>
//               <label className="block text-white font-bold mb-1">City</label>
//               <input
//                 type="text"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 placeholder="Enter your city"
//                 className="form-input w-full rounded-lg shadow-md"
//               />
//             </div>

//             <div>
//               <label className="block text-white font-bold mb-1">State</label>
//               <input
//                 type="text"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//                 placeholder="Enter your state"
//                 className="form-input w-full rounded-lg shadow-md"
//               />
//             </div>

//             <div>
//               <label className="block text-white font-bold mb-1">Role</label>
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="form-input w-full rounded-lg shadow-md"
//               >
//                 <option value="">Select Role</option>
//                 <option value="Client">Client</option>
//                 <option value="Lawyer">Lawyer</option>
//               </select>
//             </div>

//             <button
//               type="submit"
//               disabled={!emailOtpVerified || !phoneOtpVerified}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition shadow-md"
//             >
//               Sign Up
//             </button>

//             <p className="text-center text-sm text-gray-400">
//               Already have an account?{' '}
//               <Link to="/login" className="text-blue-500 hover:underline">
//                 Login
//               </Link>
//             </p>
//           </form>
//         </div>
//       </SectionWrapper>
//     </div>
//   );
// };

// export default SignupPage;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  sendOtp,
  verifyOtp,
} from "../services/api";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    password: "",
    confirmPassword: "",
    role: "",
    emailOtp: "",
    phoneOtp: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [phoneOtpVerified, setPhoneOtpVerified] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (type) => {
    const contact = type === "email" ? formData.email : formData.phone;
    if (!contact) {
      toast.error(`Please enter your ${type} first`);
      return;
    }

    try {
      const data = await sendOtp(contact);
      if (data?.message === "OTP sent successfully") {
        toast.success(`OTP sent to your ${type}`);
        type === "email" ? setEmailOtpSent(true) : setPhoneOtpSent(true);
        setOtpTimer(30);
        const interval = setInterval(() => {
          setOtpTimer((prev) => {
            if (prev === 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (error) {
      toast.error(error.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async (type) => {
    const contact = type === "email" ? formData.email : formData.phone;
    const enteredOtp = type === "email" ? formData.emailOtp : formData.phoneOtp;

    try {
      const data = await verifyOtp(contact, enteredOtp);
      if (data?.message === "OTP verified") {
        toast.success(`${type.toUpperCase()} OTP Match Successfully`);
        type === "email" ? setEmailOtpVerified(true) : setPhoneOtpVerified(true);
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      toast.error(error.message || "OTP verification failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 text-white overflow-hidden">
      {/* Signup Form Section (Left) */}
      <div className="md:w-1/2 w-full px-6 py-10 overflow-y-auto z-10">
        <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">
            Create Your Account
          </h2>

          <form className="space-y-4 text-black">
            {[
              { name: "firstName", placeholder: "Enter Your First Name", label: "First Name" },
              { name: "lastName", placeholder: "Enter Your Last Name", label: "Last Name" },
              { name: "email", placeholder: "Enter your email", label: "Email", isOtp: true },
              { name: "phone", placeholder: "Enter your phone number", label: "Phone Number", isOtp: true },
              { name: "city", placeholder: "Enter your city", label: "City" },
              { name: "state", placeholder: "Enter your state", label: "State" }
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-white font-bold mb-1">{field.label}</label>
                <input
                  type={field.name === "email" ? "email" : "text"}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="form-input w-full h-12 rounded-lg shadow-md"
                />
                {field.isOtp && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleSendOtp(field.name)}
                      disabled={otpTimer > 0}
                      className="text-sm mt-1 bg-blue-600 text-white px-3 py-1 rounded-md"
                    >
                      {otpTimer > 0 ? `Resend in ${otpTimer}s` : "Send OTP"}
                    </button>
                  </div>
                )}
              </div>
            ))}

            {emailOtpSent && !emailOtpVerified && (
              <div>
                <label className="block text-white font-bold mb-1">Enter Email OTP</label>
                <input type="text" name="emailOtp" value={formData.emailOtp} onChange={handleChange} placeholder="Enter OTP" className="form-input w-full h-12 rounded-lg shadow-md" />
                <button type="button" onClick={() => handleVerifyOtp("email")} className="bg-green-600 text-white px-3 py-2 mt-2 rounded-md w-full">
                  Verify OTP
                </button>
              </div>
            )}

            {phoneOtpSent && !phoneOtpVerified && (
              <div>
                <label className="block text-white font-bold mb-1">Enter Phone OTP</label>
                <input type="text" name="phoneOtp" value={formData.phoneOtp} onChange={handleChange} placeholder="Enter OTP" className="form-input w-full h-12 rounded-lg shadow-md" />
                <button type="button" onClick={() => handleVerifyOtp("phone")} className="bg-green-600 text-white px-3 py-2 mt-2 rounded-md w-full">
                  Verify OTP
                </button>
              </div>
            )}

            <div className="relative">
              <label className="block text-white font-bold mb-1">Password</label>
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" className="form-input w-full h-12 pr-10 rounded-lg shadow-md" />
              <div className="absolute right-3 top-10 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <div className="relative">
              <label className="block text-white font-bold mb-1">Confirm Password</label>
              <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter your password" className="form-input w-full h-12 pr-10 rounded-lg shadow-md" />
              <div className="absolute right-3 top-10 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <div>
              <label className="block text-white font-bold mb-1">Role</label>
              <select name="role" value={formData.role} onChange={handleChange} className="form-input w-full h-12 rounded-lg shadow-md">
                <option value="">Select Role</option>
                <option value="Client">Client</option>
                <option value="Lawyer">Lawyer</option>
              </select>
            </div>

            <button type="submit" disabled={!emailOtpVerified || !phoneOtpVerified} className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition shadow-md">
              Sign Up
            </button>

            <p className="text-center text-sm text-gray-400">
              Already have an account? {" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Supreme Court Image (Right Side Fixed) */}
      <div className="md:w-1/2 w-full h-screen hidden md:flex items-center justify-center p-6 fixed right-0 top-0 z-0">
        <img
          src="/assets/supreme-court.png"
          alt="Supreme Court"
          className="h-[90%] w-auto object-contain rounded-xl shadow-xl"
        />
      </div>
    </div>
  );
};

export default SignupPage;
