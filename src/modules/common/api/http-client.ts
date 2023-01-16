import axios from "axios";

export const httpClient = axios.create({
  baseURL: "https://partner-manager.softland.ai/api/v1.0",
});
