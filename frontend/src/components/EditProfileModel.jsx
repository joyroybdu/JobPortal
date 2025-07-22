import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { USER_API_END_POINT } from '@/constant/constant';
import { setUser } from '@/redux/authSlice';

const EditProfileModel = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    bio: '',
    skills: ''
  });

  useEffect(() => {
    if (user && open) {
      setInput({
        fullname: user.fullname || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        bio: user.profile?.bio || '',
        skills: Array.isArray(user.profile?.skills) ? user.profile.skills.join(', ') : ''
      });
    }
  }, [user, open]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('fullname', input.fullname);
      formData.append('email', input.email);
      formData.append('phoneNumber', input.phoneNumber);
      formData.append('bio', input.bio);

      const skillsArray = input.skills
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0);

      formData.append('skills', JSON.stringify(skillsArray));

      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.data));
        toast.success(res.data.message || 'Profile updated successfully!');
        setOpen(false);
      } else {
        toast.error(res.data.message || 'Failed to update profile.');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Server error. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Update Profile</DialogTitle>
          </DialogHeader>

          <form onSubmit={submitHandler} className="space-y-4 mt-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="fullname" className="text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                placeholder="Enter your full name"
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="Enter your email"
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                placeholder="Enter your phone number"
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="bio" className="text-sm font-medium text-gray-700">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
                placeholder="Write a short bio..."
                rows="3"
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="skills" className="text-sm font-medium text-gray-700">Skills (comma separated)</label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
                placeholder="e.g., React, Node.js, MongoDB"
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProfileModel;
