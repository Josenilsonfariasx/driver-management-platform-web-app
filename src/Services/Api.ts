import axios from "axios"

export const Api = axios.create ({
    baseURL: "http://localhost",
    timeout: 8000,
})