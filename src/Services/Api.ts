import axios from "axios"

export const Api = axios.create ({
    // baseURL: "http://localhost",
    baseURL:"https://driver-management-platform-api.onrender.com",
    timeout: 8000,
})