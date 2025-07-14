import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../../constant/constant';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value.trimStart(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = input.email.trim();
    const password = input.password;
    const role = input.role;

    if (!email || !password || !role) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        { email, password, role },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message || 'Login successful!');
        navigate('/');
      } else {
        toast.error(res.data.message || 'Login failed!');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={handleChange}
                pattern="^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$"
                title="Enter a valid email address"
                required
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-600">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={input.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-8 right-2 text-sm text-indigo-500 focus:outline-none"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            {/* Role: Student / Recruiter */}
            <div className="flex items-center gap-6 mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={handleChange}
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
                  onChange={handleChange}
                  required
                  className="form-radio text-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">Recruiter</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
              }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Signup Link */}
          <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-600 font-medium hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
