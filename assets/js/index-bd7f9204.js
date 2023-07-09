(function () {
    const e = document.createElement('link').relList;
    if (e && e.supports && e.supports('modulepreload')) return;
    for (const t of document.querySelectorAll('link[rel="modulepreload"]')) r(t);
    new MutationObserver((t) => {
        for (const i of t)
            if (i.type === 'childList')
                for (const n of i.addedNodes) n.tagName === 'LINK' && n.rel === 'modulepreload' && r(n);
    }).observe(document, { childList: !0, subtree: !0 });
    function s(t) {
        const i = {};
        return (
            t.integrity && (i.integrity = t.integrity),
            t.referrerPolicy && (i.referrerPolicy = t.referrerPolicy),
            t.crossOrigin === 'use-credentials'
                ? (i.credentials = 'include')
                : t.crossOrigin === 'anonymous'
                ? (i.credentials = 'omit')
                : (i.credentials = 'same-origin'),
            i
        );
    }
    function r(t) {
        if (t.ep) return;
        t.ep = !0;
        const i = s(t);
        fetch(t.href, i);
    }
})();
const C = 'https://www.mocky.io/v2/5dfcef48310000ee0ed2c281',
    v = 'error-validation',
    D = 'Start now',
    I = 'Next step',
    A = async () => {
        try {
            return await (await fetch(C)).json();
        } catch (o) {
            throw new Error(`An error occurred when receiving data in the first request. ${o}`);
        }
    },
    x = (o) => {
        var e;
        (e = o.nextElementSibling) != null && e.classList.contains(v) && o.nextElementSibling.remove();
    };
class O {
    constructor(e) {
        this.config = { element: e, activeClass: 'active', inputClass: '.reg-input' };
    }
    init() {
        const { element: e, activeClass: s, inputClass: r } = this.config;
        document.querySelectorAll(e).forEach((i) => {
            const n = i.querySelector('input');
            i.addEventListener('click', function () {
                i.classList.add(s), x(i), n.focus();
            }),
                this.removeActiveStatus(i, s, r);
        });
    }
    removeActiveStatus(e, s, r) {
        document.addEventListener('click', (t) => {
            const i = e.querySelector(r).value;
            if (!e.classList.contains(s) || i) return;
            const n = t.target;
            e && !e.contains(n) && (e.classList.remove(s), e.classList.blur);
        });
    }
}
class $ {
    constructor(e) {
        this.config = {
            element: e,
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
            const {
                    element: e,
                    label: s,
                    activeClass: r,
                    selectedSelectClass: t,
                    childSelectorType: i,
                } = this.config,
                n = document.querySelectorAll(e),
                c = this;
            n.forEach((a) => {
                const l = a.querySelectorAll(i),
                    d = a.querySelector(s);
                a.classList.add('loaded'),
                    a.addEventListener('click', function (u) {
                        const f = u.target;
                        a.classList.add(r),
                            x(a),
                            (f.tagName === 'A' || f.tagName === 'SPAN') &&
                                (u.preventDefault(),
                                f.closest('li').classList.add(r),
                                c.updateSelectedOption(d, f.textContent),
                                c.updateActiveClass(l, a, f, r, t, i));
                    }),
                    c.removeActiveStatus(a, r);
            });
        });
    }
    removeActiveStatus(e, s) {
        document.addEventListener('click', (r) => {
            e.classList.contains(s) &&
                e &&
                !e.contains(r.target) &&
                (e.classList.remove(s), e.classList.blur);
        });
    }
    updateActiveClass(e, s, r, t, i, n) {
        e.forEach((c) => {
            c !== r.closest(n) && c.classList.remove(t);
        }),
            s.classList.contains(i) || s.classList.add(i),
            s.classList.remove(t),
            s.blur();
    }
    updateSelectedOption(e, s) {
        const r = e.nextElementSibling;
        r && (r.value = s);
    }
}
const h = { timerId: 0, errorClass: 'error', fieldType: 'input' },
    E = async (o, e, s, r) => {
        const t = o + 1,
            i = e.querySelector(`.${s}:nth-of-type(${t}) ${h.fieldType}`),
            n = e.querySelector(`.${s}:nth-of-type(${t}) ${r}`),
            c = {
                profession: /^[a-zA-Z\s/]{2,}$/,
                age: /^\d{2,}$/,
                location: /[a-zA-Z]{2,}.*\d/,
                email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                password: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,}$/,
            };
        let a = { message: 'This field cannot be empty' },
            l = !1;
        return A().then(
            (d) => (
                (a = d.errors.find((u) => u.name === i.name) || a),
                Object.getOwnPropertyDescriptor(c, i.name) &&
                    !c[i.name].test(i.value) &&
                    (l = T(n, a.message, e)),
                l
            )
        );
    },
    T = (o, e, s) => (o.classList.add(h.errorClass), w(o, e), b(1e3, s, o), !0),
    w = (o, e) => {
        var r, t;
        if ((t = (r = o.nextElementSibling) == null ? void 0 : r.classList) == null ? void 0 : t.contains(v))
            o.nextElementSibling.textContent = e;
        else {
            const i = document.createElement('p');
            (i.innerHTML = e), i.classList.add(v), o.insertAdjacentElement('afterend', i);
        }
    },
    b = (o, e, s) => {
        clearTimeout(h.timerId),
            (h.timerId = setTimeout(() => {
                e.querySelector('.' + v) &&
                    (e.querySelectorAll('.' + v).forEach((t) => {
                        t.remove();
                    }),
                    s.classList.remove(h.errorClass));
            }, o));
    };
class F {
    constructor(e, s, r, t, i, n) {
        (this.config = {
            index: 0,
            formEl: e,
            dotNav: '.dot-slider-nav',
            dotNavItemClass: '.dot-item',
            leftArrow: s || '.left',
            rightArrow: r || '#send',
            slideClass: t || 'slide',
            activeClass: i || 'active',
            triggerBtnClass: n || '.custom-select',
            actionType: { next: 'next', prev: 'prev', default: 'default' },
        }),
            (this.errorsData = null),
            (this.isError = !0);
    }
    init() {
        const {
                leftArrow: e,
                rightArrow: s,
                formEl: r,
                actionType: t,
                slideClass: i,
                activeClass: n,
                dotNavItemClass: c,
                triggerBtnClass: a,
            } = this.config,
            l = document.querySelector(r),
            d = l.querySelector(e),
            u = l.querySelector(s),
            f = l.querySelectorAll('input'),
            g = l.querySelector(this.config.dotNav),
            p = g.querySelectorAll(this.config.dotNavItemClass);
        this.navOnDot(g, l, i, n, d, c, a),
            l == null ||
                l.addEventListener('submit', async (L) => {
                    if (
                        (L.preventDefault(),
                        (this.isError = await E(this.config.index, l, i, a)),
                        !this.isError)
                    )
                        if (this.config.index < p.length - 1)
                            this.getNextEl(l, t.next, n, i, t), this.setActiveDotItem(p, d, n, g, c, u);
                        else {
                            const S = Array.from(f).findIndex((y) => y.value.length < 1);
                            if (S >= 0)
                                (this.config.index = S),
                                    f[S].closest('.' + i).classList.add(n),
                                    (l.dataset.currentSlide = S),
                                    (this.isError = await E(this.config.index, l, i, a)),
                                    this.setActiveDotItem(p, d, n, g, c, u);
                            else {
                                const y = new FormData(l);
                                for (const [q, N] of y.entries()) console.log(`${q}: ${N}`);
                            }
                        }
                }),
            d == null ||
                d.addEventListener('click', (L) => {
                    L.preventDefault(),
                        this.config.index > 0 &&
                            (this.getNextEl(l, t.prev, n, i, t), this.setActiveDotItem(p, d, n, g, c, u));
                }),
            this.removeChangeFocus(l);
    }
    getNextEl(e, s, r, t, i) {
        const n = e.querySelector('.' + t + '.' + r),
            c = s === i.next ? n.nextElementSibling : n.previousElementSibling;
        c &&
            c.classList.contains(t) &&
            (s === i.next ? this.config.index++ : --this.config.index,
            (e.dataset.currentSlide = this.config.index),
            n.classList.remove(r),
            c.classList.add(r));
    }
    navOnDot(e, s, r, t, i, n, c) {
        e.addEventListener('click', async (a) => {
            if (a.target.tagName === 'LI') {
                if (((this.isError = await E(this.config.index, s, r, c)), this.isError)) return;
                const l = s.querySelector('.' + r + '.' + t),
                    d = e.querySelector(n + '.' + t);
                (this.config.index = Number(a.target.textContent)),
                    l.classList.remove(t),
                    d.classList.remove(t),
                    a.target.classList.add(t);
                const u = s.querySelector('.' + r + `:nth-of-type(${this.config.index + 1})`);
                this.triggerVisibleLeftBtn(i),
                    u.classList.add(t),
                    (s.dataset.currentSlide = this.config.index);
            }
        });
    }
    setActiveDotItem(e, s, r, t, i, n) {
        const { index: c } = this.config,
            a = t.querySelector(i + '.' + r);
        this.triggerVisibleLeftBtn(s),
            a.classList.remove(r),
            e[c].classList.add(r),
            c === e.length - 1 ? (n.textContent = D) : (n.textContent = I);
    }
    triggerVisibleLeftBtn(e) {
        this.config.index > 0
            ? e == null || e.classList.remove('inactive')
            : e == null || e.classList.add('inactive');
    }
    removeChangeFocus(e) {
        e.addEventListener('keydown', function (s) {
            (s.key === 'Tab' || s.keyCode === 9) && s.preventDefault();
        });
    }
}
const m = { field: 'input', loginBtn: '.login-btn', errorClass: 'error', isError: !1 },
    B = (o) => {
        const e = document.querySelector(o),
            s = e.querySelectorAll(m.field);
        e.querySelector(m.loginBtn).addEventListener('click', () => {
            if (e.classList.contains('opened') && ((m.isError = _(s, e)), !m.isError)) {
                const t = new FormData(e);
                for (const [i, n] of t.entries()) console.log(`${i}: ${n}`);
            }
            e.classList.add('opened');
        });
    },
    _ = (o, e) => (
        o.forEach((s) => {
            s.value
                ? (m.isError = !1)
                : (A().then((r) => {
                      const t = r.errors.find((i) => i.name === s.name) || t;
                      s.classList.add(m.errorClass), w(s, t.message), b(1e3, e, s);
                  }),
                  (m.isError = !0));
        }),
        m.isError
    );
(function () {
    B('.form-login'),
        new F('#register-form').init(),
        new $(['#custom-select', '#custom-select-age']).init(),
        new O(['#custom-address', '#custom-email', '#custom-password']).init();
})();
