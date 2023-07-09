import { fetchErrors } from '../utils/utils';
import { autoRemoveErrorMsg, createErrorField } from './Submit';

const config = {
    field: 'input',
    loginBtn: '.login-btn',
    errorClass: 'error',
    isError: false,
};

export const TopMenu = (el) => {
    const root = document.querySelector(el);
    const fields = root.querySelectorAll(config.field);
    const loginBtn = root.querySelector(config.loginBtn);
    loginBtn.addEventListener('click', () => {
        if (root.classList.contains('opened')) {
            config.isError = loginValidatorForm(fields, root);
            if (!config.isError) {
                const formData = new FormData(root);
                for (const [key, value] of formData.entries()) {
                    console.log(`${key}: ${value}`);
                }
            }
        }
        root.classList.add('opened');
    });
};

const loginValidatorForm = (fields, root) => {
    fields.forEach((el) => {
        if (!el.value) {
            fetchErrors().then((data) => {
                const msg = data.errors.find((element) => element.name === el.name) || msg;
                el.classList.add(config.errorClass);
                createErrorField(el, msg.message);
                autoRemoveErrorMsg(1000, root, el);
            });
            config.isError = true;
        } else {
            config.isError = false;
        }
    });

    return config.isError;
};
