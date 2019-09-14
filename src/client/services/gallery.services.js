import { apiUrl } from "../config";
import { handleResponse, authHeader } from "./serviceUtils";
import fetch from "node-fetch";

export const galleryServices = {
    addGalleryPost,
    getGalleryPosts,
    editGalleryPost,
    galleryAction,
    deleteGalleryPost
};

async function addGalleryPost(data) {
    const headers = await authHeader();
    const requestOption = {
        method: "POST",
        headers,
        body: data
    };

    return fetch(`${apiUrl}/gallery`, requestOption).then(handleResponse);
}

async function getGalleryPosts() {
    const requestOption = {
        method: "GET"
    };
    console.log("url", `${apiUrl}/gallery`);
    return fetch(`${apiUrl}/gallery`, requestOption).then(handleResponse);
}

async function editGalleryPost(id, data) {
    const headers = await authHeader();
    const requestOptions = {
        method: "PUT",
        headers,
        body: data
    };

    return galleryAction(id, requestOptions);
}

async function deleteGalleryPost(id) {
    const headers = await authHeader();
    const requestOptions = {
        method: "DELETE",
        headers
    };

    return galleryAction(id, requestOptions);
}

function galleryAction(id, requestOptions) {
    return fetch(`${apiUrl}/gallery/${id}`, requestOptions).then(
        handleResponse
    );
}
