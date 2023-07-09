import { FORM_URL_ACTION, GLOBAL_ERROR_CLASS } from '../constants/settings';

export const fetchErrors = async () => {
    try {
        const response = await fetch(FORM_URL_ACTION);
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`An error occurred when receiving data in the first request. ${error}`);
    }
};

export const hideError = (el) => {
    if (el.nextElementSibling?.classList.contains(GLOBAL_ERROR_CLASS)) el.nextElementSibling.remove();
};
