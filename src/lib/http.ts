import axios from "axios";

// const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const baseURL = "http://localhost:3000/api";
const http = axios.create({
  baseURL,
});

export default http;
