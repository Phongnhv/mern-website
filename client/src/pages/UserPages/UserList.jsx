import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from 'react';

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase';
import { Link } from "react-router-dom";
import { FaMedal, FaRegCreditCard } from "react-icons/fa";

export default function UserList() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);

  const [formData, setFormData] = useState({});
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };
  useEffect(() => {
    // Gọi hàm handleShowListings khi trang được mở
    handleShowListings();
  }, []);

  const silverCardCount = 3; // Thay thế bằng số lượng thực tế của thẻ bạc
  const goldCardCount = 2;

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="mt-20 max-w-full mx-auto  rounded-lg"> {/* Increased padding */}
      <div>
      <h1 className="text-center text-3xl font-semibold col-span-2 mb-6 mt-6">Your Listings</h1>
      <div className="border-b-2 border-gray-300 w-full mb-6"></div>
      <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-gray-700 text-xl font-medium">
            {silverCardCount}
          </span>
          <FaRegCreditCard className="text-gray-500 text-2xl" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-yellow-700 text-xl font-medium">
            {goldCardCount}
          </span>
          <FaRegCreditCard className="text-yellow-500 text-2xl" />
        </div>
        </div> 
        
        
        
        
        
        <div className="flex items-center gap-4">
        {/* Nút Create */}
        <Link
          className="bg-green-700 text-white px-4 py-2 rounded-lg uppercase text-center hover:opacity-90 text-sm font-medium"
          to={"/create-listing"}
        >
          Create
        </Link>
        {/* Nút Delete */}
        <button className="bg-red-700 text-white px-4 py-2 rounded-lg uppercase text-center hover:opacity-90 text-sm font-medium">
          Delete
        </button>
        {/* Nút Edit */}
        <button className="bg-blue-700 text-white px-4 py-2 rounded-lg uppercase text-center hover:opacity-90 text-sm font-medium">
          Edit
        </button>
      </div>
      </div>
      <p className="text-red-700 mt-5 text-lg">
        {showListingsError ? 'Error showing listings' : ''}
      </p>
      </div>
      {userListings && userListings.length > 0 && !currentUser.isAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-7">
           {/* Larger title */}
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="w-full shadow-slate-500 shadow-md border rounded-lg p-5 flex justify-between items-center gap-6"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-24 w-24 object-contain" 
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold hover:underline truncate flex-1 text-xl"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>
  
              <div className="flex flex-col items-center gap-3">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 uppercase text-lg font-semibold"
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase text-lg font-semibold">
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
