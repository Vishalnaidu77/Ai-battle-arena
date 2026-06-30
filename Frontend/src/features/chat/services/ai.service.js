import axios from "axios";

const app = axios.create({
    baseURL: "http://localhost:8000/",
    withCredentials: true
})

export async function getRes({input}){
    const res = await app.post("/invoke", {
        input
    })
    return res
}