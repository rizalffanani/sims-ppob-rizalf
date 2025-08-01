import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchProfile,
  saveProfile,
  uploadImage,
  logoutProfile,
} from "../features/account/accountSlice";
import { logout } from "../features/auth/authSlice";
import defaultImg from "../assets/profil.png";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: profile } = useAppSelector((state) => state.account);
  const [edit, setEdit] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    setEmail(profile.email);
    setFirstName(profile.first_name);
    setLastName(profile.last_name);
  }, [profile]);

  const handleSave = () => {
    dispatch(saveProfile({ first_name: firstName, last_name: lastName })).then(
      () => {
        alert("Profile updated!");
        setEdit(false);
      }
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 100 * 1024) {
      dispatch(uploadImage(file));
    } else {
      alert("Ukuran gambar maksimal 100KB");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(logoutProfile());
    navigate("/login");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Account</h1>

      <div className="flex items-center gap-4 mb-4">
        <img
          src={profile.profile_image || defaultImg}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover cursor-pointer"
          onClick={() => document.getElementById("upload")?.click()}
        />
        <input
          type="file"
          accept="image/*"
          id="upload"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      <div className="mb-2">
        <label>Email</label>
        <input
          className="border p-2 w-full"
          disabled={!edit}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label>Nama Depan</label>
        <input
          className="border p-2 w-full"
          disabled={!edit}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label>Nama Belakang</label>
        <input
          className="border p-2 w-full"
          disabled={!edit}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      {edit ? (
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Simpan
          </button>
          <button
            onClick={() => setEdit(false)}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Batalkan
          </button>
        </div>
      ) : (
        <button
          onClick={() => setEdit(true)}
          className="bg-green-500 text-white px-4 py-2 mt-3 rounded"
        >
          Edit Profile
        </button>
      )}

      <hr className="my-6" />

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
