"use client";
import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AuthModalInputs from "./AuthModalInputs";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ isLogin }: { isLogin: boolean }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: "",
    password: "",
  });
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: [e.target.value],
    });
  };
  const renderContent = (signInContent: string, signUpContent: string) => {
    return isLogin ? signInContent : signUpContent;
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className={`${
          isLogin ? "" : "bg-blue-400 text-white"
        } border p-1 px-4 rounded mr-3 capitalize`}
      >
        {isLogin ? "sign in" : "sign up"}
      </button>
      {inputs.firstName}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="p-2">
            <div className="uppercase font-bold text-center border-b pb-2 mb-2">
              <p className="text-sm">
                {isLogin ? "sign in" : "Create an account"}
              </p>
            </div>
            <div className="w-5/6 mx-auto">
              <h2 className="text-2xl font-light text-center capitalize pb-4">
                {renderContent(
                  "Log in to your account",
                  "Create your openTable account"
                )}
              </h2>
              <AuthModalInputs
                isLogin={isLogin}
                inputs={inputs}
                handleChangeInput={handleChangeInput}
              />
              <button className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm">
                {renderContent("Log in", "Create account")}
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
