import { hideError } from '../utils/utils';

class Select {
    constructor(element) {
        this.config = {
            element: element,
            dropdown: '.dropdown',
            activeClass: 'active',
            label: '.label',
            selectedSelectClass: 'selected',
            selectedOptionClass: 'selected-option',
            childSelectorType: 'li',
        };
    }

    init() {
        window.addEventListener('load', () => {
            const { element, label, activeClass, selectedSelectClass, childSelectorType } = this.config;
            const selects = document.querySelectorAll(element);
            const self = this;

            selects.forEach((select) => {
                const li = select.querySelectorAll(childSelectorType);
                const labelSelect = select.querySelector(label);
                select.classList.add('loaded');
                select.addEventListener('click', function (e) {
                    const target = e.target;
                    select.classList.add(activeClass);
                    hideError(select);
                    if (target.tagName === 'A' || target.tagName === 'SPAN') {
                        e.preventDefault();
                        target.closest('li').classList.add(activeClass);
                        self.updateSelectedOption(labelSelect, target.textContent);
                        self.updateActiveClass(
                            li,
                            select,
                            target,
                            activeClass,
                            selectedSelectClass,
                            childSelectorType
                        );
                    }
                });
                self.removeActiveStatus(select, activeClass);
            });
        });
    }

    removeActiveStatus(select, activeClass) {
        document.addEventListener('click', (e) => {
            if (!select.classList.contains(activeClass)) return;
            if (select && !select.contains(e.target)) {
                select.classList.remove(activeClass);
                select.classList.blur;
            }
        });
    }

    updateActiveClass(el, parent, target, activeClass, selectedSelectClass, childSelectorType) {
        el.forEach((element) => {
            if (element !== target.closest(childSelectorType)) element.classList.remove(activeClass);
        });
        if (!parent.classList.contains(selectedSelectClass)) parent.classList.add(selectedSelectClass);
        parent.classList.remove(activeClass);
        parent.blur();
    }

    updateSelectedOption(target, text) {
        const input = target.nextElementSibling;

        if (input) {
            input.value = text;
        }
    }
}

export { Select };
