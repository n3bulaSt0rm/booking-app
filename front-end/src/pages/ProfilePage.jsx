import { useContext, useState, useEffect } from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import api from "../api.js";
import AccountNav from "../components/AccountNav";
import "./profile-page.css";
import React from "react";

export default function ProfilePage() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  const [userDoc, setUserDoc] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const { pathname } = useLocation();
  let subpage = pathname.split("/")?.[3];
  if (subpage === undefined) {
    subpage = "profile";
  }

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await api.get("/users/profile");
        setUserDoc(data);
        setUpdatedDetails({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  async function logout() {
    try {
      await api.post("/users/logout");
      setUser(null);
      setRedirect("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  async function handleSaveChanges(e) {
    e.preventDefault();
    try {
      const { data } = await api.put(`/users/${user.id}`, updatedDetails);
      alert("Profile updated successfully!");
      setUserDoc(data); // Update the local state with the new details
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="profile-page">
      <AccountNav />
      {userDoc && (
        <div className="profile-container">
          <div className="profile-sidebar">
            <h1>Profile settings</h1>
            <Link className={subpage === "profile" ? "active" : ""} to="/account/profile">
              <span className="icon">person</span>
              Details
            </Link>
            <Link className={subpage === "payment" ? "active" : ""} to="/account/profile/payment">
              <span className="icon">account_balance_wallet</span>
              Payment
            </Link>
            <Link className={subpage === "safety" ? "active" : ""} to="/account/profile/safety">
              <span className="icon">encrypted</span>
              Safety
            </Link>
            <Link className={subpage === "preference" ? "active" : ""} to="/account/profile/preference">
              <span className="icon">settings</span>
              Preferences
            </Link>
            <Link className={subpage === "notification" ? "active" : ""} to="/account/profile/notification">
              <span className="icon">notifications</span>
              Notifications
            </Link>
          </div>
          <div className="profile-content">
            {subpage === "profile" && (
              <div>
                <h1>Personal details</h1>
                <h2>{editing ? "Edit your personal details" : "View your personal details"}</h2>
                <img src="https://i.pinimg.com/originals/39/a4/71/39a47159059f38a954d77e5dcae6f0db.jpg" alt="avatar" />
                {editing ? (
                  <form onSubmit={handleSaveChanges}>
                    <table>
                      <tbody>
                        <tr>
                          <td>First name:</td>
                          <td>
                            <input
                              type="text"
                              value={updatedDetails.firstName}
                              onChange={(e) =>
                                setUpdatedDetails({ ...updatedDetails, firstName: e.target.value })
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Last name:</td>
                          <td>
                            <input
                              type="text"
                              value={updatedDetails.lastName}
                              onChange={(e) =>
                                setUpdatedDetails({ ...updatedDetails, lastName: e.target.value })
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Email:</td>
                          <td>
                            <input
                              type="email"
                              value={updatedDetails.email}
                              onChange={(e) =>
                                setUpdatedDetails({ ...updatedDetails, email: e.target.value })
                              }
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={() => setEditing(false)}>
                      Cancel
                    </button>
                  </form>
                ) : (
                  <table>
                    <tbody>
                      <tr>
                        <td>First name:</td>
                        <td>{userDoc.firstName}</td>
                      </tr>
                      <tr>
                        <td>Last name:</td>
                        <td>{userDoc.lastName}</td>
                      </tr>
                      <tr>
                        <td>Email:</td>
                        <td>{userDoc.email}</td>
                      </tr>
                    </tbody>
                  </table>
                )}
                {!editing && (
                  <button onClick={() => setEditing(true)}>Edit Profile</button>
                )}
              </div>
            )}
            {subpage === "payment" && <h1>Payment information</h1>}
            {subpage === "safety" && <h1>Safety</h1>}
            {subpage === "preference" && <h1>Preferences</h1>}
            {subpage === "notification" && <h1>Notification</h1>}
          </div>
        </div>
      )}
      <div className="logout-section">
        <button onClick={logout}>
          <span className="icon material-icons">logout</span>
          <span className="text">Log out</span>
        </button>
      </div>
    </div>
  );
}
