import React, { useEffect, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { IoIosArrowDroprightCircle, IoMdCheckmarkCircle } from "react-icons/io";
import { MdOutlinePhonelinkRing } from "react-icons/md";
import { Link } from "react-router-dom";

const Verification = () => {
  const isTrue = false;
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    const storedPhoneNumber = sessionStorage.getItem("phoneNumber");

    if (storedEmail) {
      setEmail(storedEmail);
    }
    if (storedPhoneNumber) {
      setPhoneNumber(storedPhoneNumber);
    }
  }, []);

  return (
<div className="flex justify-center min-h-screen w-full ">
      <div className="flex justify-center items-center w-full py-2">
        <div className=" h-full lg:w-[30%] md:w-[50%] w-[94%] py-6 px-4 rounded-xl">
          <p className="text-center text-[32px] font-bold">Verification</p>
          <p className="text-center text-[13px] text-secondary">
            Verify your email and phone number
          </p>
          <Link to="/verify-otp" className="w-full">
            <div className="flex justify-between items-center bg-[#F9F9F9] rounded-xl py-6 px-2 mt-6">
              <div className="flex items-center pr-2 pl-4">
                <FaEnvelope className="text-[#1D7C42] text-[30px]" />
                <div className="pl-4">
                  <p className="text-[15px] text-[#575757] font-bold">
                    Email address
                  </p>
                  <p className="text-[12px] text-secondary">{email}</p>
                </div>
              </div>
              {isTrue ? (
                <div>
                  <IoMdCheckmarkCircle className="text-[#34C658] text-[32px]" />
                </div>
              ) : (
                <div>
                  <IoIosArrowDroprightCircle className="text-[#1D7C42] text-[32px]" />
                </div>
              )}
            </div>
          </Link>

          <div className="flex justify-between items-center bg-[#F9F9F9] rounded-xl py-6 px-2 mt-4">
            <div className="flex items-center pr-2 pl-4 ">
              <MdOutlinePhonelinkRing className="text-[#1D7C42] text-[30px]" />
              <div className="pl-4">
                <p className="text-[15px] text-[#575757] font-bold">
                  Phone Number
                </p>
                <p className="text-[13px] text-secondary">{phoneNumber}</p>
              </div>
            </div>
            {isTrue ? (
              <div>
                <IoMdCheckmarkCircle className="text-[#34C658] text-[32px]" />
              </div>
            ) : (
              <div>
                <IoIosArrowDroprightCircle className="text-[#1D7C42] text-[32px]" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
