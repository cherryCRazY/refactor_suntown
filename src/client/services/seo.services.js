import { apiUrl } from "../config";
import { handleResponse, handleError, authHeader } from "./serviceUtils";
import fetch from "node-fetch";

const getSeoPages = () => {
    const requestOptions = {
        method: "GET"
    };

    return fetch(`${apiUrl}/seo`, requestOptions)
        .then(res => handleResponse(res))
        .then(getResult => {
            return {
                success: true,
                message: "Данные успешно получены.",
                result: getResult
            };
        })
        .catch(err => handleError(err));
};

const getSeoByUrl = (url, lang) => {
    const requestOptions = {
        method: "GET"
    };

    return fetch(`${apiUrl}/seo-url/${url}?lang=${lang}`, requestOptions)
        .then(res => handleResponse(res))
        .then(getResult => {
            return {
                success: true,
                message: "Данные успешно получены.",
                result: getResult
            };
        })
        .catch(err => handleError(err));
};

const getArticleSeoByUrl = url => {
    const requestOptions = {
        method: "GET"
    };

    return fetch(`${apiUrl}/seo-url/post/${url}`, requestOptions)
        .then(res => handleResponse(res))
        .then(getResult => {
            return {
                success: true,
                message: "Данные по статье успешно получены.",
                result: getResult
            };
        })
        .catch(err => handleError(err));
};

const editSeoPages = async (pageId, seoData) => {
    const auth = await authHeader();
    console.log(seoData);
    if (!pageId || pageId === "") {
        return Promise.resolve({
            success: false,
            message: "Ошибка: Страница не была выбрана.",
            result: null
        });
    }
    const requestOptions = {
        method: "PUT",
        headers: {
            ...auth,
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(seoData)
    };

    return fetch(`${apiUrl}/seo/${pageId}`, requestOptions)
        .then(res => handleResponse(res))
        .then(editResult => {
            return {
                success: true,
                message: "Данные успешно отредактированы.",
                result: editResult
            };
        })
        .catch(err => handleError(err));
};

export const seoServices = {
    getSeoPages,
    getSeoByUrl,
    getArticleSeoByUrl,
    editSeoPages
};
