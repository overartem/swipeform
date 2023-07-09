import { BTN_SEND_FROM_NAME, BTN_SEND_FROM_NAME_ACTIVE } from '../constants/settings';
import { SubmitValidateForm } from './Submit';

class Slider {
    constructor(formEl, leftArrow, rightArrow, slideClass, activeClass, triggerBtnClass) {
        this.config = {
            index: 0,
            formEl: formEl,
            dotNav: '.dot-slider-nav',
            dotNavItemClass: '.dot-item',
            leftArrow: leftArrow || '.left',
            rightArrow: rightArrow || '#send',
            slideClass: slideClass || 'slide',
            activeClass: activeClass || 'active',
            triggerBtnClass: triggerBtnClass || '.custom-select',
            actionType: { next: 'next', prev: 'prev', default: 'default' },
        };
        this.errorsData = null;
        this.isError = true;
    }

    init() {
        const {
            leftArrow,
            rightArrow,
            formEl,
            actionType,
            slideClass,
            activeClass,
            dotNavItemClass,
            triggerBtnClass,
        } = this.config;

        const form = document.querySelector(formEl);
        const left = form.querySelector(leftArrow);
        const send = form.querySelector(rightArrow);
        const inputs = form.querySelectorAll('input');
        const dotNavEl = form.querySelector(this.config.dotNav);
        const elItem = dotNavEl.querySelectorAll(this.config.dotNavItemClass);
        this.navOnDot(dotNavEl, form, slideClass, activeClass, left, dotNavItemClass, triggerBtnClass);

        form?.addEventListener('submit', async (e) => {
            e.preventDefault();
            this.isError = await SubmitValidateForm(this.config.index, form, slideClass, triggerBtnClass);

            if (this.isError) return;
            if (this.config.index < elItem.length - 1) {
                this.getNextEl(form, actionType.next, activeClass, slideClass, actionType);
                this.setActiveDotItem(elItem, left, activeClass, dotNavEl, dotNavItemClass, send);
            } else {
                const elemIndex = Array.from(inputs).findIndex((input) => input.value.length < 1);
                if (elemIndex >= 0) {
                    this.config.index = elemIndex;
                    inputs[elemIndex].closest('.' + slideClass).classList.add(activeClass);
                    form.dataset.currentSlide = elemIndex;
                    this.isError = await SubmitValidateForm(
                        this.config.index,
                        form,
                        slideClass,
                        triggerBtnClass
                    );
                    this.setActiveDotItem(elItem, left, activeClass, dotNavEl, dotNavItemClass, send);
                } else {
                    const formData = new FormData(form);
                    for (const [key, value] of formData.entries()) {
                        console.log(`${key}: ${value}`);
                    }
                }
            }
        });

        left?.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.config.index > 0) {
                this.getNextEl(form, actionType.prev, activeClass, slideClass, actionType);
                this.setActiveDotItem(elItem, left, activeClass, dotNavEl, dotNavItemClass, send);
            }
        });

        this.removeChangeFocus(form);
    }

    getNextEl(form, type, activeClass, slideClass, actionType) {
        const activeSlide = form.querySelector('.' + slideClass + '.' + activeClass);

        const newActiveElement =
            type === actionType.next ? activeSlide.nextElementSibling : activeSlide.previousElementSibling;
        if (newActiveElement && newActiveElement.classList.contains(slideClass)) {
            type === actionType.next ? this.config.index++ : --this.config.index;
            form.dataset.currentSlide = this.config.index;
            activeSlide.classList.remove(activeClass);
            newActiveElement.classList.add(activeClass);
        }
    }

    navOnDot(dotNavEl, form, slideClass, activeClass, left, dotNavItemClass, triggerBtnClass) {
        dotNavEl.addEventListener('click', async (event) => {
            if (event.target.tagName === 'LI') {
                this.isError = await SubmitValidateForm(this.config.index, form, slideClass, triggerBtnClass);
                if (this.isError) return;
                const activeSlide = form.querySelector('.' + slideClass + '.' + activeClass);
                const activeDot = dotNavEl.querySelector(dotNavItemClass + '.' + activeClass);
                this.config.index = Number(event.target.textContent);
                activeSlide.classList.remove(activeClass);
                activeDot.classList.remove(activeClass);
                event.target.classList.add(activeClass);

                const newActiveSlide = form.querySelector(
                    '.' + slideClass + `:nth-of-type(${this.config.index + 1})`
                );
                this.triggerVisibleLeftBtn(left);
                newActiveSlide.classList.add(activeClass);
                form.dataset.currentSlide = this.config.index;
            }
        });
    }

    setActiveDotItem(elItem, left, activeClass, dotNavEl, dotNavItemClass, send) {
        const { index } = this.config;
        const activeDot = dotNavEl.querySelector(dotNavItemClass + '.' + activeClass);
        this.triggerVisibleLeftBtn(left);
        activeDot.classList.remove(activeClass);
        elItem[index].classList.add(activeClass);
        index === elItem.length - 1
            ? (send.textContent = BTN_SEND_FROM_NAME_ACTIVE)
            : (send.textContent = BTN_SEND_FROM_NAME);
    }

    triggerVisibleLeftBtn(left) {
        this.config.index > 0 ? left?.classList.remove('inactive') : left?.classList.add('inactive');
    }

    removeChangeFocus(form) {
        form.addEventListener('keydown', function (event) {
            if (event.key === 'Tab' || event.keyCode === 9) event.preventDefault();
        });
    }
}

export { Slider };
