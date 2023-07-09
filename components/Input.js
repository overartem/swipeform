import { hideError } from '../utils/utils';

class Input {
    constructor(element) {
        this.config = {
            element: element,
            activeClass: 'active',
            inputClass: '.reg-input',
        };
    }

    init() {
        const { element, activeClass, inputClass } = this.config;
        const parents = document.querySelectorAll(element);

        parents.forEach((parent) => {
            const input = parent.querySelector('input');

            parent.addEventListener('click', function () {
                parent.classList.add(activeClass);
                hideError(parent);
                input.focus();
            });
            this.removeActiveStatus(parent, activeClass, inputClass);
        });
    }

    removeActiveStatus(parent, activeClass, inputClass) {
        document.addEventListener('click', (e) => {
            const value = parent.querySelector(inputClass).value;

            if (!parent.classList.contains(activeClass) || value) return;
            const clickedElement = e.target;

            if (parent && !parent.contains(clickedElement)) {
                parent.classList.remove(activeClass);
                parent.classList.blur;
            }
        });
    }
}

export { Input };
