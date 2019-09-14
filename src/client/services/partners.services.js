import { apiUrl } from "../config";
import { handleResponse, authHeader } from "./serviceUtils";
import fetch from "node-fetch";

export const partnersServices = {
    addPartner,
    getPartners,
    deletePartner,
    editPartner
};

async function addPartner(data) {
    const headers = await authHeader();
    const requestOption = {
        method: "POST",
        headers,
        body: data
    };

    return fetch(`${apiUrl}/partners`, requestOption).then(handleResponse);
}

function getPartners() {
    const requestOption = {
        method: "GET"
    };

    return fetch(`${apiUrl}/partners`, requestOption).then(handleResponse);
}

async function editPartner(id, partner) {
    const headers = await authHeader();
    const requestOption = {
        method: "PUT",
        headers,
        body: partner
    };

    for (let val of partner.values()) {
        console.log(val);
    }

    return fetch(`${apiUrl}/partners/${id}`, requestOption).then(
        handleResponse
    );
}

async function deletePartner(id) {
    const headers = await authHeader();
    const requestOption = {
        method: "DELETE",
        headers
    };

    return fetch(`${apiUrl}/partners/${id}`, requestOption).then(
        handleResponse
    );
}
