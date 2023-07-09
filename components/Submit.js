import { GLOBAL_ERROR_CLASS } from '../constants/settings';
import { fetchErrors } from '../utils/utils';

const config = {
    timerId: 0,
    errorClass: 'error',
    fieldType: 'input',
};

const SubmitValidateForm = async (stepIndex, form, slideClass, triggerBtnClass) => {
    const step = stepIndex + 1;
    const currentField = form.querySelector(`.${slideClass}:nth-of-type(${step}) ${config.fieldType}`);
    const triggerBtn = form.querySelector(`.${slideClass}:nth-of-type(${step}) ${triggerBtnClass}`);
    const fieldRegex = {
        profession: /^[a-zA-Z\s/]{2,}$/,
        age: /^\d{2,}$/,
        location: /[a-zA-Z]{2,}.*\d/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,}$/,
    };

    let msg = { message: 'This field cannot be empty' };
    let isValidate = false;

    return fetchErrors().then((data) => {
        msg = data.errors.find((element) => element.name === currentField.name) || msg;

        if (
            !!Object.getOwnPropertyDescriptor(fieldRegex, currentField.name) &&
            !fieldRegex[currentField.name].test(currentField.value)
        ) {
            isValidate = InitError(triggerBtn, msg.message, form);
        }
        return isValidate;
    });
};

const InitError = (triggerBtn, msg, form) => {
    triggerBtn.classList.add(config.errorClass);
    createErrorField(triggerBtn, msg);
    autoRemoveErrorMsg(1000, form, triggerBtn);
    return true;
};

export const createErrorField = (el, msg) => {
    const isCreate = el.nextElementSibling?.classList?.contains(GLOBAL_ERROR_CLASS);

    if (isCreate) {
        el.nextElementSibling.textContent = msg;
    } else {
        const tagP = document.createElement('p');
        tagP.innerHTML = msg;
        tagP.classList.add(GLOBAL_ERROR_CLASS);
        el.insertAdjacentElement('afterend', tagP);
    }
};

export const autoRemoveErrorMsg = (timeout, el, triggerBtn) => {
    clearTimeout(config.timerId);
    config.timerId = setTimeout(() => {
        if (el.querySelector('.' + GLOBAL_ERROR_CLASS)) {
            const errorInputs = el.querySelectorAll('.' + GLOBAL_ERROR_CLASS);
            errorInputs.forEach((input) => {
                input.remove();
            });
            triggerBtn.classList.remove(config.errorClass);
        }
    }, timeout);
};

export { SubmitValidateForm };
