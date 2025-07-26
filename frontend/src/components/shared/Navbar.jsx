import React from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  LogIn,
  LogOut,
  UserPlus,
  UserCircle2,
} from "lucide-react";

import axios from "axios";
import { USER_API_END_POINT } from "@/constant/constant";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";
import { setUser } from "@/redux/authSlice"; // ✅ Make sure this path is correct

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      console.log("Logout response:", res.data); // Debug line

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message || "Logout failed.");
    }
  };

  return (
    <div className="bg-white shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold text-blue-600">Job Portal</h1>
        </div>

        {/* Navigation + Auth/Profile */}
        <div className="flex items-center gap-4">
          <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <li>
              <Link to="/" className="cursor-pointer hover:text-blue-600 transition">Home</Link>
            </li>
            <li>
              <Link to="/jobs" className="cursor-pointer hover:text-blue-600 transition">Jobs</Link>
            </li>
            <li>
              <Link to="/browse" className="cursor-pointer hover:text-blue-600 transition">Browse</Link>
            </li>
          </ul>

          {!user ? (
            <div className="flex gap-2">
              <Link to='/login'>
                <Button variant="outline" className="flex items-center gap-1 cursor-pointer">
                  <LogIn className="w-4 h-4" />
                  Login
                </Button>
              </Link>
              <Link to='/signup'>
                <Button variant="default" className="flex items-center gap-1 cursor-pointer">
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user.profile.profilePhoto}
                 
                  />
                  <AvatarFallback>JR</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="bg-white p-4 shadow-lg border rounded w-48">
                <div className="flex flex-col space-y-1 text-sm">
                  <h4 className="font-medium">{user?.fullname}</h4>
                  <p className="text-gray-500">Hi! Myself {user?.fullname}</p>
                </div>
                <div className="mt-3 space-y-2">
                  <Button
                    variant="outline"
                    className="w-full flex items-center gap-2"
                  >
                    <UserCircle2 className="w-4 h-4 cursor-pointer" />
                    <Link to='profile'>View Profile</Link>
                  </Button>
                  <Button
                    onClick={logoutHandler}
                    variant="destructive"
                    className="w-full flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4 cursor-pointer" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default Navbar;
