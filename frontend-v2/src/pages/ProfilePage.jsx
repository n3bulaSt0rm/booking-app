import { useContext, useState, useEffect } from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import AccountNav from "../AccountNav";
import '../Loading.css';
export default function ProfilePage() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  const [userDoc, setUserDoc] = useState(null);

  const [isChange, setIsChange] = useState(false);
  const [newLocalAvt, setNewLocalAvt] = useState("");
  const [newFirstName, setNewFirstName] = useState("")
  const [newLastName, setNewLastName] = useState("") 
  const [showFirstNameEdit, setShowFirstNameEdit] = useState(false);
  const [showLastNameEdit, setShowLastNameEdit] = useState(false);

  const { pathname } = useLocation();
  const subpage = pathname.split("/")?.[3] || "profile";

  const linkClasses = (type) =>
      `flex items-center gap-2 pr-3 py-1.5 my-3 ${
          type === subpage ? "bg-primary text-white rounded-full pl-3" : ""
      }`;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to view your profile.");
      return;
    }

    axios
        .get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUserDoc(response.data))
        .catch((error) => {
          console.error("Error fetching user profile:", error);
          alert("Failed to fetch user profile. Please try again.");
        });
  }, []);

  const logout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in.");
      return;
    }

    try {
      await axios.post(
          "/user/logout",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem("token");
      setUser(null);
      setRedirect("/");
    } catch (error) {
      console.error("Failed to log out:", error);
      alert("Logout failed. Please try again.");
    }
  };


const uploadFiles = async (file) => {
  try {
    const token = localStorage.getItem("token")
    const formData = new FormData();
    formData.append('folder', 'image');
    formData.append('image', file)

    const response = await axios.put('/file/upload', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', 
      }
    });
    console.log('Files uploaded successfully:', response.data);
    return response.data.url;
  } catch (error) {
    console.error('Error uploading files:', error.message);
  }
};

const updateUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You are not logged in.");
    return;
  }
  if(newLocalAvt!=""){
    try{
      const url = uploadFiles(newLocalAvt)
    }catch (error) {
      console.error('Error uploading avt:', error.message);
    }
    const newUserData = {
      picture : url,
      firstName : newFirstName!="" ? newFirstName : userDoc.firstName,
      lastName : newLastName!="" ? newLastName :userDoc.lastName
    }
  }else{
    const newUserData = {
      firstName : newFirstName!="" ? newFirstName : userDoc.firstName,
      lastName : newLastName!="" ? newLastName :userDoc.lastName
    }
  }
  
  try {
    const response = await axios.put(
      `/user/${userDoc.id}`,
      newUserData,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    if(response.status==200){
      alert("update successful")
      setRedirect("/account/profile")
    }
  }catch (error) {
    console.error('Error uploading user:', error.message);
  }
}

  // if (!ready) return "Loading...";
  if (!ready) {
    return (
      // <h1 className="px-10 sm:px-20 pt-3 font-semibold text-xl">Loading...</h1>
      <div className="loading-container">
      <div className="spinner"></div>
      <h1 className="loading-text">Loading...</h1>
    </div>
  );
  }

  if (ready && !user) return <Navigate to={"/login"} />;

  if (redirect) return <Navigate to={redirect} />;

  const renderSubpageContent = () => {
    switch (subpage) {
      case "profile":
        return (
            <div className="px-6 md:px-20">
              <h1 className="text-3xl font-semibold">Personal details</h1>
              <h2 className="text-slate-500 pt-1">Edit your personal details</h2>
              <div className="avt">
                <img
                    id = "avt-img"
                    className="h-32 w-32 border-2 rounded-full my-8"
                    src="https://i.pinimg.com/originals/39/a4/71/39a47159059f38a954d77e5dcae6f0db.jpg"
                    alt="Default Avatar"
                    onClick={() => document.getElementById("avt-input").click()}
                />
                <input
                  id="avt-input"
                  type="file"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    if (file) {
                      const objectUrl = URL.createObjectURL(file);
                      document.getElementById("avt-img").setAttribute("src", objectUrl);
                      setNewLocalAvt(file);
                      setIsChange(true)
                  }}}
                />
              </div>
              {userDoc && (
                  <table className="table-auto w-full">
                    <tbody>
                    <tr>
                      <td className="font-semibold text-lg">First name:</td>
                      {showFirstNameEdit ? (
                        <td colSpan="2">
                          <div className="flex items-center gap-4">
                            <input id="firstname-input" className="border-2 rounded px-2 py-1 w-40" type="text" placeholder="first name" />
                            <span
                              className="material-symbols-outlined cursor-pointer hover:text-green-400 transition-all duration-300"
                              onClick={() => {
                                const value = document.getElementById("firstname-input").value
                                if(value!=""){
                                  setNewFirstName(value)
                                  setShowFirstNameEdit(false)
                                  setIsChange(true)
                                }else{
                                  setShowFirstNameEdit(false)
                                }
                              }}>
                              check
                            </span>
                            <span
                              className="material-symbols-outlined cursor-pointer hover:text-red-400 transition-all duration-300"
                              onClick={() => {
                                setShowFirstNameEdit(false)
                              }}>
                              close
                            </span>
                          </div>
                        </td>
                      ):(
                        <><td className="capitalize pl-6 md:pl-16 text-slate-500">
                          {userDoc.firstName || "N/A"}
                        </td>
                        {newFirstName!="" && 
                          <td>(new: {newFirstName})</td>}
                        <span
                          className="material-symbols-outlined cursor-pointer hover:text-blue-600 transition-all duration-300"
                          onClick={() => {
                            setShowFirstNameEdit(true);
                          } }>
                            edit
                          </span></> 
                      )   
                      }  
                    </tr>
                    <tr>
                      <td className="font-semibold text-lg">Last name:</td>
                      {showLastNameEdit ? (
                        <td colSpan="2">
                          <div className="flex items-center gap-4">
                            <input id="lastname-input" className="border-2 rounded px-2 py-1 w-40" type="text" placeholder="last name" />
                            <span
                              className="material-symbols-outlined cursor-pointer hover:text-green-400 transition-all duration-300"
                              onClick={() => {
                                const value = document.getElementById("lastname-input").value
                                if(value!=""){
                                  setNewLastName(value)
                                  setShowLastNameEdit(false)
                                  setIsChange(true)
                                }else{
                                  setShowLastNameEdit(false)
                                }
                              }}>
                              check
                            </span>
                            <span
                              className="material-symbols-outlined cursor-pointer hover:text-red-400 transition-all duration-300"
                              onClick={() => {
                                setShowLastNameEdit(false)
                              }}>
                              close
                            </span>
                          </div>
                        </td>
                      ):(
                        <><td className="capitalize pl-6 md:pl-16 text-slate-500">
                          {userDoc.lastName || "N/A"}
                        </td>
                        {newLastName!="" && 
                          <td>(new: {newLastName})</td>}
                        <span
                          className="material-symbols-outlined cursor-pointer hover:text-blue-600 transition-all duration-300"
                          onClick={() => {
                            setShowLastNameEdit(true);
                          } }>
                            edit
                          </span></> 
                      )   
                      }  
                    </tr>
                    <tr>
                      <td className="font-semibold text-lg">Email:</td>
                      <td className="capitalize pl-6 md:pl-16 text-slate-500">
                        {userDoc.email || "N/A"}
                      </td>
                    </tr>
                    </tbody>
                  </table>
              )}
              {isChange && (
                <button 
                  className="mt-4 gap-1 py-2 px-6 rounded-full bg-primary text-white w-full text-center"
                  onClick={updateUser}>
                  Save
                </button>
              )}
            </div>
        );
      case "payment":
        return (
            <div className="px-10 md:px-32">
              <h1 className="text-3xl font-semibold">Payment information</h1>
            </div>
        );
      case "safety":
        return (
            <div className="px-10 md:px-32">
              <h1 className="text-3xl font-semibold">Safety</h1>
            </div>
        );
      case "preference":
        return (
            <div className="px-10 md:px-32">
              <h1 className="text-3xl font-semibold">Preferences</h1>
            </div>
        );
      case "notification":
        return (
            <div className="px-10 md:px-32">
              <h1 className="text-3xl font-semibold">Notification</h1>
            </div>
        );
      default:
        return null;
    }
  };

  return (
      <div>
        <AccountNav />
        {userDoc && (
            <div className="flex justify-center pt-10 px-10">
              <div className="border-r-2 px-10">
                <h1 className="font-semibold lg:text-2xl lg:pb-6 md:pb-2 md:text-xl">
                  Profile settings
                </h1>
                <Link className={linkClasses("profile")} to={"/account/profile"}>
                  <span className="material-symbols-outlined">person</span>
                  <h1 className="font-semibold">Details</h1>
                </Link>
                <Link
                    className={linkClasses("payment")}
                    to={"/account/profile/payment"}
                >
              <span className="material-symbols-outlined">
                account_balance_wallet
              </span>
                  <h1 className="font-semibold">Payment</h1>
                </Link>
                <Link
                    className={linkClasses("safety")}
                    to={"/account/profile/safety"}
                >
                  <span className="material-symbols-outlined">encrypted</span>
                  <h1 className="font-semibold">Safety</h1>
                </Link>
                <Link
                    className={linkClasses("preference")}
                    to={"/account/profile/preference"}
                >
                  <span className="material-symbols-outlined">settings</span>
                  <h1 className="font-semibold">Preferences</h1>
                </Link>
                <Link
                    className={linkClasses("notification")}
                    to={"/account/profile/notification"}
                >
                  <span className="material-symbols-outlined">notifications</span>
                  <h1 className="font-semibold">Notifications</h1>
                </Link>
              </div>
              <div className="lg:w-2/5 w-2/3">{renderSubpageContent()}</div>
            </div>
        )}
        <div className="flex place-content-center mt-20">
          <button
              className="flex items-center gap-3 px-4 py-2 border-2 rounded-full hover:bg-gray-100"
              onClick={logout}
          >
            <span className="material-symbols-outlined">logout</span>
            <h1 className="font-semibold">Log out</h1>
          </button>
        </div>
      </div>
  );
}