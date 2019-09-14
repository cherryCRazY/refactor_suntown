import { apiUrl } from "../config";
import { handleResponse, authHeader } from "./serviceUtils";
import ls from "local-storage";
import fetch from "node-fetch";

export const authServices = {
    login,
    checkToken
};

function login(userData) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    };

    return fetch(`${apiUrl}/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            const { token, ...userData } = user;
            ls.set("token", token);
            return userData;
        });
}

async function checkToken() {
    const headers = await authHeader();
    const requestOptions = {
        method: "GET",
        headers
    };

    return fetch(`${apiUrl}/checkToken`, requestOptions).then(res => {
        if (!res.ok) {
            console.log(res.ok);
            return Promise.reject(new Error());
        } else {
            return;
        }
    });
}
