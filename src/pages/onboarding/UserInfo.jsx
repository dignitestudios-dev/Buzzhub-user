import React, { useState } from "react";
import AddressForm from "../../components/app/onboarding/AddressForm";
import UploadDocuments from "../../components/app/onboarding/UploadDocuments";
import ReviewForm from "../../components/app/onboarding/ReviewForm"; // ReviewForm remains

export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    address: {},
    images: {},
    files: {},
  });
  console.log("formData -- ", formData);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateData = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
  };

  // Combine address and image data into a single object
 const combinedFormData = {
  ...formData.address, // Address data

  ...formData.files, // File data
  profileImage: formData.images.profile,  // Ensure profile image is passed correctly
  medicalCardFront: formData.images.medicalFront,  // Pass medical card front
  medicalCardBack: formData.images.medicalBack,  // Pass medical card back
  licenseCardFront: formData.images.licenseFront,  // Pass license front
  licenseCardBack: formData.images.licenseBack,  // Pass license back

};
console.log("combinedFormData -- " ,combinedFormData); // Log to inspect the object

  // Step names
  const steps = ["Address", "Documents", "Review"];

  return (
    <div className="w-full">
      {/* Stepper */}
      <div className="flex justify-center bg-green-600 p-4 items-center mx-auto mb-6">
        {steps.map((label, index) => {
          const isCompleted = index + 1 < step;
          const isCurrent = index + 1 === step;

          return (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 flex items-center justify-center rounded-full font-bold text-sm 
                    ${isCompleted ? "bg-green-600 text-white border-2 border-white" : ""}
                    ${isCurrent ? "border-2 border-white text-white bg-green-600" : ""}
                    ${!isCompleted && !isCurrent ? "bg-white text-green-600 opacity-30 border border-white" : ""}`}
                >
                  {isCompleted ? "✓" : index + 1}
                </div>
                <span
                  className={`text-xs mt-1 ${isCompleted || isCurrent ? "text-white" : "text-white opacity-50"}`}
                >
                  {label}
                </span>
              </div>

              {index !== steps.length - 1 && (
                <div
                  className={`w-10 h-0.5 mx-2 mt-3 top-4 ${index + 1 < step ? "bg-white" : "bg-white opacity-30"}`}
                ></div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="flex justify-center items-center">
        {step === 1 && <AddressForm onNext={nextStep} updateData={updateData} />}
        {step === 2 && (
          <UploadDocuments onNext={nextStep} onBack={prevStep} updateData={updateData} />
        )}
        {step === 3 && <ReviewForm formData={combinedFormData} onBack={prevStep} />}
      </div>
    </div>
  );
}
