import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { GoogleGenerativeAI } from "@google/generative-ai";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* CONFIGURATION FOR GENERATIVE MODEL */
export const getModel = () => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(`${API_KEY}`);
  return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
};
