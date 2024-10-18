"use client";
import React, { useEffect, useState } from "react";

export default function CommissionForm() {
  const [equipmentId, setEquipmentId] = useState("");
  const [commissionAmount, setCommissionAmount] = useState("");
  const [commissionRate, setCommissionRate] = useState("");
  const [description, setDescription] = useState("");
  const [equipments, setEquipments] = useState([]); // Store fetched equipment
  const [isOnline, setIsOnline] = useState(true);
  const [localStorageForms, setLocalStorageForms] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [currentFormIndex, setCurrentFormIndex] = useState(0);

  // Fetch equipments from the backend
  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await fetch("http://localhost:8000/equipements");
        const data = await response.json();
        setEquipments(data); // Store the fetched equipments
      } catch (error) {
        console.error("Error fetching equipments:", error);
      }
    };

    fetchEquipments();
  }, []);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      const savedForms = JSON.parse(localStorage.getItem("commissions")) || [];
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
      equipment_id: equipmentId,
      commission_amount: parseFloat(commissionAmount),
      commission_rate: parseFloat(commissionRate),
      description,
    };
    const updatedForms = [...localStorageForms, formData];
    localStorage.setItem("commissions", JSON.stringify(updatedForms));
    setLocalStorageForms(updatedForms);
    clearFields();
  };

  // Clear input fields
  const clearFields = () => {
    setEquipmentId("");
    setCommissionAmount("");
    setCommissionRate("");
    setDescription("");
  };

  // Load form data into input fields
  const loadFormData = (formData) => {
    setEquipmentId(formData.equipment_id || "");
    setCommissionAmount(formData.commission_amount || "");
    setCommissionRate(formData.commission_rate || "");
    setDescription(formData.description || "");
  };

  // Submit the current form data to the server and update localStorage
  const handleSubmit = async () => {
    const formsToSubmit = JSON.parse(localStorage.getItem("commissions")) || [];
    if (formsToSubmit.length > 0) {
      const formData = formsToSubmit[currentFormIndex];

      try {
        await fetch("http://localhost:8000/commissions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        formsToSubmit.splice(currentFormIndex, 1);
        localStorage.setItem("commissions", JSON.stringify(formsToSubmit));
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
    } else {
      const formData = {
        equipment_id: equipmentId,
        commission_amount: parseFloat(commissionAmount),
        commission_rate: parseFloat(commissionRate),
        description,
      };

      try {
        await fetch("http://localhost:8000/commissions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        clearFields();
        setPopupMessage("Data submitted successfully!");
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
        <h1 className="mb-4 text-2xl font-bold text-center text-gray-800">
          Commission Entry Form
        </h1>

        <div className="space-y-4">
          <select
            value={equipmentId}
            onChange={(e) => setEquipmentId(e.target.value)}
            className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="" disabled>
              Select Equipment
            </option>
            {equipments.map((equipment) => (
              <option className="text-black" key={equipment._id} value={equipment.equipment_id}>
                {equipment.equipement_id}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Commission Amount"
            value={commissionAmount}
            onChange={(e) => setCommissionAmount(e.target.value)}
            className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring focus:ring-blue-500"
          />

          <input
            type="number"
            placeholder="Commission Rate"
            value={commissionRate}
            onChange={(e) => setCommissionRate(e.target.value)}
            className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring focus:ring-blue-500"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring focus:ring-blue-500"
            rows="3"
          />
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
              isOnline
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-400 cursor-not-allowed"
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
