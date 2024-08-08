import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <div>
        <h1>User Profile</h1>
        <p>Name: {userInfo.name}</p>
        <p>Email: {userInfo.email}</p>

        <p>Id {userInfo._id}</p>
        <Link to="/profile/edit">Edit Profile</Link>
      </div>
    </>
  );
};

export default UserProfile;
