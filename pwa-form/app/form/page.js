"use client";
import React, { useEffect, useState } from "react";

export default function FieldForm() {
  const [fieldName, setFieldName] = useState("");
  const [fieldValue, setFieldValue] = useState("");
  const [description, setDescription] = useState("");
  const [selectedEquipement, setSelectedEquipement] = useState("");
  const [equipements, setEquipements] = useState([]); // Store fetched equipements
  const [isOnline, setIsOnline] = useState(true);
  const [localStorageForms, setLocalStorageForms] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [currentFormIndex, setCurrentFormIndex] = useState(0);

  // Fetch equipements from the backend
  useEffect(() => {
    const fetchEquipements = async () => {
      try {
        const response = await fetch("http://localhost:8000/equipements");
        const data = await response.json();
        setEquipements(data); // Store the fetched equipements
      } catch (error) {
        console.error("Error fetching equipements:", error);
      }
    };

    fetchEquipements();
  }, []);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      const savedForms = JSON.parse(localStorage.getItem("forms")) || [];
      if (savedForms.length > 0) {
        setPopupMessage("You have unsent forms. Please submit them.");
        loadFormData(savedForms[0]); // Load the first form in localStorage
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    if (navigator.onLine) {
      handleOnline();
    } else {
      handleOffline();
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Save form data to localStorage
  const handleSave = () => {
    const formData = {
      field_name: fieldName,
      field_value: fieldValue,
      description,
      equipement_id: selectedEquipement, // Include selected equipement ID
    };
    const updatedForms = [...localStorageForms, formData];
    localStorage.setItem("forms", JSON.stringify(updatedForms));
    setLocalStorageForms(updatedForms);
    clearFields();
  };

  // Clear input fields
  const clearFields = () => {
    setFieldName("");
    setFieldValue("");
    setDescription("");
    setSelectedEquipement(""); // Clear selected equipment
  };

  // Load form data into input fields
  const loadFormData = (formData) => {
    setFieldName(formData.field_name || "");
    setFieldValue(formData.field_value || "");
    setDescription(formData.description || "");
    setSelectedEquipement(formData.equipement_id || "");
  };

  // Submit the current form data to the server and update localStorage
  const handleSubmit = async () => {
    const formsToSubmit = JSON.parse(localStorage.getItem("forms")) || [];
    if (formsToSubmit.length > 0) {
      const formData = formsToSubmit[currentFormIndex];

      try {
        await fetch("http://localhost:8000/fields", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        formsToSubmit.splice(currentFormIndex, 1);
        localStorage.setItem("forms", JSON.stringify(formsToSubmit));
        setLocalStorageForms(formsToSubmit);

        if (formsToSubmit.length > 0) {
          loadFormData(formsToSubmit[0]);
        } else {
          clearFields();
          setPopupMessage("You have submitted all data successfully!");
        }
      } catch (error) {
        setPopupMessage("Submission failed. Please try again later.");
      }
    }else{
      const formData = {
        field_name: fieldName,
        field_value: fieldValue,
        description,
        equipement_id: selectedEquipement, // Include selected equipement ID
      };

      try {
        await fetch("http://localhost:8000/fields", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        formsToSubmit.splice(currentFormIndex, 1);
        localStorage.setItem("forms", JSON.stringify(formsToSubmit));
        setLocalStorageForms(formsToSubmit);

        if (formsToSubmit.length > 0) {
          loadFormData(formsToSubmit[0]);
        } else {
          clearFields();
          setPopupMessage("You have submitted all data successfully!");
        }
      } catch (error) {
        setPopupMessage("Submission failed. Please try again later.");
      }
    }
  };

  // Close popup
  const closePopup = () => {
    setPopupMessage("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-center text-gray-800">Field Entry Form</h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Field Name"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Field Value"
            value={fieldValue}
            onChange={(e) => setFieldValue(e.target.value)}
            className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring focus:ring-blue-500"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring focus:ring-blue-500"
            rows="3"
          />

          {/* Dropdown for selecting equipment */}
          <select
            value={selectedEquipement}
            onChange={(e) => setSelectedEquipement(e.target.value)}
            className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="" disabled>
              Select Equipment
            </option>
            {equipements.map((equipement) => (
              <option key={equipement._id} value={equipement.equipement_id}>
                {equipement.equipement_id}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleSave}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Save
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isOnline}
            className={`px-4 py-2 text-white rounded-lg ${
              isOnline ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
            } focus:outline-none`}
          >
            Submit
          </button>
        </div>

        {popupMessage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <p>{popupMessage}</p>
              <div className="mt-4">
                <button
                  onClick={closePopup}
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
