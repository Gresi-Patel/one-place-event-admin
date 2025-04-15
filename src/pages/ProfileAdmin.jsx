import { Rocket } from "@mui/icons-material";
import React from "react";

const ProfileAdmin = () => {
    const adminDetails = {
        name: "Twin",
        email: "twing@gmail.com",
        contact: "1114567890",
        role: "Admin",
    };

    return (
        <div className="min-h-full bg-gradient-to-br from-indigo-200 via-purple-500 to-pink-200 flex items-center justify-center">
            <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl p-10">
                <div className="text-center mb-8">
                    <Rocket className="text-purple-500 text-6xl mb-4" />
                    <h2 className="text-4xl font-extrabold text-gray-800">Admin Profile</h2>
                    <p className="text-gray-500 mt-2">Manage your profile details</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col items-center">
                        <h3 className="text-lg font-semibold text-gray-600">Name</h3>
                        <p className="text-xl font-bold text-gray-800">{adminDetails.name}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-lg font-semibold text-gray-600">Email</h3>
                        <p className="text-xl font-bold text-gray-800">{adminDetails.email}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-lg font-semibold text-gray-600">Contact No</h3>
                        <p className="text-xl font-bold text-gray-800">{adminDetails.contact}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-lg font-semibold text-gray-600">Role</h3>
                        <p className="text-xl font-bold text-gray-800">{adminDetails.role}</p>
                    </div>
                </div>
                <div className="mt-10 text-center">
                    <button className="bg-purple-500 hover:bg-purple-800 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-all">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileAdmin;
