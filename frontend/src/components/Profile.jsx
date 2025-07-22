import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge, Contact, Mail, Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppliedJobTable from "./AppliedJobTable";
import EditProfileModal from "./EditProfileModel";
import { useSelector } from "react-redux";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth); // ✅ Get user from Redux store

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
        {/* Profile Section */}
        <div className="bg-white shadow-md p-6 rounded-xl grid md:grid-cols-3 gap-8">
          {/* Left - Avatar */}
          <div className="flex flex-col items-center space-y-3">
            <Avatar className="w-28 h-28">
              <AvatarImage src={"https://i.pravatar.cc/150"} alt="User Avatar" />
              <AvatarFallback>{user?.fullname?.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button onClick={() => setOpen(true)} variant="outline" className="flex items-center gap-1">
              <Pen className="w-4 h-4" /> Edit
            </Button>
          </div>

          {/* Center - Info */}
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold text-gray-800">{user?.fullname}</h1>
            <p className="text-gray-600">{user?.profile?.bio || "No bio available."}</p>
            <div className="space-y-2 mt-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Contact className="w-4 h-4" />
                <span>{user?.phoneNumber || "No phone number"}</span>
              </div>
            </div>
          </div>

          {/* Right - Skills */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Your Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length > 0 ? (
                user.profile.skills.map((item, index) => (
                  <Badge key={index} variant="secondary">
                    {item}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-gray-500">No skills listed</span>
              )}
            </div>
          </div>
        </div>

        {/* Applied Jobs Table */}
        <div className="bg-white shadow-md p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Applied Jobs</h2>
          <AppliedJobTable />
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
