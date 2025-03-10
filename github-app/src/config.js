import Constants from "expo-constants";
import AuthStorage from "./utils/authStorage";

export const APOLLO_URI = Constants.expoConfig.extra.APOLLO_URI;

export const AuthStore = new AuthStorage();
