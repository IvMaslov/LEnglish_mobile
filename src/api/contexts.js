import { createContext } from "react";
import { create } from "yup/lib/Reference";

const AuthContext = createContext();
const UpdateContext = createContext();
const ProfileContext = createContext();
const DictionaryContext = createContext();

export { AuthContext, UpdateContext, ProfileContext, DictionaryContext };