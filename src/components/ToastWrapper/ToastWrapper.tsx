"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

export default function ToastWrapper() {
  return <ToastContainer position="top-center" autoClose={4000} />;
}