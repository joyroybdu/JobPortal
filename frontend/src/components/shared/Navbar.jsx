import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // 🆕 import

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



const Navbar = () => {
  const {user}=useSelector((state) => state.auth); // 🆕 Get user from redux
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
              </Button ></Link>
             <Link to='/signup'> <Button variant="default" className="flex items-center gap-1 cursor-pointer">
                <UserPlus className="w-4 h-4" />
                Sign Up
              </Button></Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>JR</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="bg-white p-4 shadow-lg border rounded w-48">
                <div className="flex flex-col space-y-1 text-sm">
                  <h4 className="font-medium">Joy Roy</h4>
                  <p className="text-gray-500">Hi! Myself Joy Roy</p>
                </div>
                <div className="mt-3 space-y-2">
                  <Button
                    variant="outline"
                    className="w-full flex items-center gap-2"
                  >
                    <UserCircle2 className="w-4 h-4 cursor-pointer" />
                   <Link to='profile'> View Profile</Link>
                  </Button>
                  <Button
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
    </div>
  );
};

export default Navbar;
