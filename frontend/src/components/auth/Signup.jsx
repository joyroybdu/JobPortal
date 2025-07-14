import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../../constant/constant';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Signup = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    role: '',
    file: null,
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    passwordMismatch: false,
    passwordWeak: false,
  });

  // Password strength check function
  const isPasswordStrong = (password) => {
    // Minimum 8 chars, at least one uppercase, one lowercase, one number and one special char
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
    return regex.test(password);
  };

  const changeEventHandler = (e) => {
    const { name } = e.target;
    let value = e.target.value;

    // Trim leading spaces only as user types (optional)
    if (name !== 'password' && name !== 'confirmPassword') {
      value = value.trimStart();
    }

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Reset errors on change
    if (name === 'password' || name === 'confirmPassword') {
      setErrors({ passwordMismatch: false, passwordWeak: false });
    }
  };

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Only image files are allowed');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size should be under 2MB');
        return;
      }
      setInput((prev) => ({ ...prev, file }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Check password strength
    if (!isPasswordStrong(input.password)) {
      setErrors((prev) => ({ ...prev, passwordWeak: true }));
      toast.error(
        'Password must be at least 8 characters, include uppercase, number, and special character'
      );
      return;
    }

    // Check password and confirm password match
    if (input.password !== input.confirmPassword) {
      setErrors((prev) => ({ ...prev, passwordMismatch: true }));
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('fullname', input.fullname.trim());
    formData.append('email', input.email.trim());
    formData.append('phoneNumber', input.phoneNumber.trim());
    formData.append('password', input.password);
    formData.append('role', input.role);
    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message || 'Registration failed');
      }
    } catch (error) {
      toast.error('Something went wrong! Try again.');
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Create Account</h2>

          <form onSubmit={submitHandler} encType="multipart/form-data" className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-600">Full Name</label>
              <input
                type="text"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                required
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                required
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-600">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                required
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-600">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  required
                  className={`w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                    errors.passwordWeak ? 'border-red-500' : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-2 text-indigo-600 font-semibold text-sm select-none"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.passwordWeak && (
                <p className="text-red-500 text-xs mt-1">
                  Password must be 8+ chars, include uppercase, number & special char.
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-600">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={input.confirmPassword}
                onChange={changeEventHandler}
                required
                className={`w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                  errors.passwordMismatch ? 'border-red-500' : ''
                }`}
              />
              {errors.passwordMismatch && (
                <p className="text-red-500 text-xs mt-1">Passwords do not match.</p>
              )}
            </div>

            {/* Role: Student / Recruiter */}
            <div className="flex items-center gap-6 mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  required
                  className="form-radio text-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">Student</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  required
                  className="form-radio text-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">Recruiter</span>
              </label>
            </div>

            {/* Profile Picture */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Profile Picture</label>
              <input
                type="file"
                name="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="w-full text-sm text-gray-600"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
