import axios from "axios";

const api = axios.create({
    baseURL: 'https://reqres.in',
})

// api.interceptors.request.use(async config => {
//     const token = localStorage.getItem("token") || undefined;

//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`
//     }

//     return config
// })

export default api