import React, { useState, useEffect, useRef } from "react";
import { FiArrowLeft, FiXCircle } from "react-icons/fi"; // Cross icon
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // To handle cookies
import axios from "../../../axios"; // Adjust the import path as necessary
import { ErrorToast, SuccessToast } from "../../../components/global/Toaster"; // Import toaster functions
import { Loader } from "../../../components/global/Loader";

const Documents = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [editingDocumentIndex, setEditingDocumentIndex] = useState(null); // Track which document is being edited
  const [changedDocuments, setChangedDocuments] = useState([]); // Store changed documents for saving
  const fileInputRef = useRef(null); // Ref for file input
  const [error, setError] = useState(null); // State to store any errors
  const [loadingDocuments, setLoadingDocuments] = useState(true);
const [uploadingIndex, setUploadingIndex] = useState(null); // To show loading on a specific doc


  const handleBackClick = () => {
    navigate(-1);
  };

 const fetchDocuments = async () => {
  setLoadingDocuments(true);
  try {
    const token = Cookies.get("authToken");
    const response = await axios.get("user/get-my-profile", {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (response.data.success) {
      const fetchedDocuments = [
        { title: "Driving License Front", image: response.data.data.drivingLicenseFront, type: "drivingLicenseFront" },
        { title: "Driving License Back", image: response.data.data.drivingLicenseBack, type: "drivingLicenseBack" },
        { title: "Medical Card Front", image: response.data.data.medicalCardFront, type: "medicalCardFront" },
        { title: "Medical Card Back", image: response.data.data.medicalCardBack, type: "medicalCardBack" },
      ];

      setDocuments(fetchedDocuments);
    } else {
      ErrorToast("Failed to fetch profile data.");
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
    setError("Failed to fetch documents. Please try again.");
  } finally {
    setLoadingDocuments(false);
  }
};


  useEffect(() => {
    fetchDocuments();
  }, []);

  // Handle file upload for documents
 const handleFileUpload = (file, docType, index) => {
  setUploadingIndex(index); // mark specific index as uploading

  const updatedDocuments = [...documents];
  const newImageUrl = URL.createObjectURL(file);

  updatedDocuments[index] = {
    ...updatedDocuments[index],
    file,
    image: newImageUrl,
  };

  setDocuments(updatedDocuments);
  setChangedDocuments((prev) => {
    const filtered = prev.filter((d) => d.index !== index);
    return [...filtered, { index, file, docType }];
  });

  setUploadingIndex(null); // clear after upload preview
};


  // Save all changes when the user clicks "Save Changes"
  const handleSaveChanges = async () => {
    if (changedDocuments.length === 0) {
      ErrorToast("No changes to save.");
      return;
    }

    setUploading(true);

    const data = new FormData();

    // Ensure the field names match what the backend expects
    changedDocuments.forEach((doc) => {
      const { docType, file } = doc;

      switch (docType) {
        case "drivingLicenseFront":
          data.append("drivingLicenseFront", file);
          break;
        case "drivingLicenseBack":
          data.append("drivingLicenseBack", file);
          break;
        case "medicalCardFront":
          data.append("medicalCardFront", file);
          break;
        case "medicalCardBack":
          data.append("medicalCardBack", file);
          break;
        default:
          data.append(docType, file);
      }
    });

    try {
      const token = Cookies.get("authToken");

      const response = await axios.post("user/update-documents", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (response.data.success) {
        SuccessToast("Documents uploaded successfully.");
        setChangedDocuments([]); // Clear changed documents after save
        setEditingDocumentIndex(null); // Exit editing mode
        fetchDocuments(); // Refetch documents
      } else {
        ErrorToast("Failed to upload document.");
      }
    } catch (error) {
      console.error("Error uploading document:", error);
      setError("Failed to upload document. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveDocument = (docIndex) => {
    // Toggle editing mode only for the clicked document
    setEditingDocumentIndex(editingDocumentIndex === docIndex ? null : docIndex);
  };

  return (
    <div className="pb-20">
      {/* Error display */}
      {error && (
        <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
          <p>{error}</p>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <button className="text-gray-800 pr-3" onClick={handleBackClick}>
          <FiArrowLeft size={20} />
        </button>

        <h3 className="text-[16px] lg:text-3xl font-semibold text-gray-800 mx-auto sm:mx-0 sm:flex-1 sm:text-left">
          Personal Documents
        </h3>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {loadingDocuments ? (
  <div className="col-span-full flex justify-center items-center py-12">
    <Loader />
  </div>
) : documents.length === 0 ? (
  <p className="col-span-full text-center text-gray-600">No documents available</p>
) : (
  documents.map((doc, index) => (
            <div
              key={index}
              className="relative rounded-md overflow-hidden border border-gray-300 hover:shadow-xl transition transform hover:scale-105 duration-300"
            >
              <button
                onClick={() => handleRemoveDocument(index)} // Toggle editing mode
                className="absolute top-2 right-2 text-red-600"
                aria-label={`Toggle upload for ${doc.title}`}
              >
                <FiXCircle size={20} />
              </button>

              <p className="text-start pl-2 text-sm font-semibold mt-2">{doc.title}</p>

              {/* Document preview */}
              {doc.image && editingDocumentIndex !== index && (
                <img src={doc.image} alt={doc.title} className="w-full h-48 object-cover" />
              )}

              {/* File input for editing */}
            {editingDocumentIndex === index && (
  <div className="absolute inset-0 bg-green-500 lg:bg-white md:bg-white lg:bg-opacity-60 md:bg-opacity-60 flex items-center justify-center px-2">
    {doc.file ? (
      <span className="text-center text-white bg-green-500 px-4 py-2 rounded-md">
        Uploaded
      </span>
    ) : (
      <>
        <label
          htmlFor={`file-upload-${index}`}
          className="w-full sm:w-auto text-center text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded-md cursor-pointer"
        >
          Upload New
        </label>
        <input
          ref={fileInputRef}
          id={`file-upload-${index}`}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileUpload(e.target.files[0], doc.type, index)}
          disabled={uploading}
        />
      </>
    )}
  </div>
)}



             {uploadingIndex === index && (
  <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8 animate-spin"></div>
  </div>
)}

            </div>
          ))
        )}
      </div>

      {/* Save Changes Button */}
      {changedDocuments.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={handleSaveChanges}
            className="bg-green-500 text-white px-6 py-2 rounded-lg"
            disabled={uploading}
          >
            {uploading ? "Saving..." : "Save"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Documents;
