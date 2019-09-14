import { apiUrl } from "../config";
import { handleResponse, authHeader } from "./serviceUtils";
import fetch from "node-fetch";

export const userServices = {
    addArticle,
    getArticles,
    editArticle,
    deleteArticle
};

async function addArticle(data) {
    const headers = await authHeader();
    const requestOptions = {
        method: "POST",
        headers,
        body: data
    };

    return fetch(`${apiUrl}/new-article`, requestOptions).then(handleResponse);
}

function getArticles() {
    const requestOptions = {
        method: "GET"
    };

    return fetch(`${apiUrl}/articles`, requestOptions).then(handleResponse);
}

async function editArticle(id, data) {
    const headers = await authHeader();
    const requestOptions = {
        method: "PUT",
        headers,
        body: data
    };

    return articleAction(id, requestOptions);
}

async function deleteArticle(id) {
    const headers = await authHeader();
    const requestOptions = {
        method: "DELETE",
        headers
    };

    return articleAction(id, requestOptions);
}

function articleAction(id, requestOptions) {
    return fetch(`${apiUrl}/article/${id}`, requestOptions).then(
        handleResponse
    );
}
