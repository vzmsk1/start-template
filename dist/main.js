/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/dev/kie6er.js":
/*!******************************!*\
  !*** ./src/js/dev/kie6er.js ***!
  \******************************/
/***/ (() => {



/***/ }),

/***/ "./src/js/dev/markusDM.js":
/*!********************************!*\
  !*** ./src/js/dev/markusDM.js ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "./src/js/dev/ukik0.js":
/*!*****************************!*\
  !*** ./src/js/dev/ukik0.js ***!
  \*****************************/
/***/ (() => {



/***/ }),

/***/ "./src/js/dev/vzmsk1.js":
/*!******************************!*\
  !*** ./src/js/dev/vzmsk1.js ***!
  \******************************/
/***/ (() => {



/***/ }),

/***/ "./src/js/modules.js":
/*!***************************!*\
  !*** ./src/js/modules.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   modules: () => (/* binding */ modules)
/* harmony export */ });
const modules = {};

/***/ }),

/***/ "./src/js/utils/accordion.js":
/*!***********************************!*\
  !*** ./src/js/utils/accordion.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils/utils.js");


// --------------------------------------------------------------------------

class Accordion {
  constructor() {
    this.accordionItems = document.querySelectorAll('[data-accordion]');
    this.mdQueriesArray = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.dataMediaQueries)(this.accordionItems, 'accordion');
    this.regItems = Array.from(this.accordionItems).filter(function (item, index, self) {
      return !item.dataset.accordion.split(',')[0];
    });
    this.attrs = {
      ACCORDION: 'data-accordion',
      ITEM: 'data-accordion-item',
      SINGLE: 'data-accordion-single'
    };
    this.classes = {
      INIT: '_accordion-init',
      ACTIVE: '_is-active'
    };

    // init regular accordion items
    if (this.regItems.length) {
      this.init(this.regItems);
    }
    // init accordion items with media queries
    if (this.mdQueriesArray && this.mdQueriesArray.length) {
      const _this = this;
      this.mdQueriesArray.forEach(mdQueriesItem => {
        mdQueriesItem.matchMedia.addEventListener('change', function () {
          _this.init(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        this.init(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
  }
  hideBody(accordionGroup) {
    const activeTitle = accordionGroup.querySelector(`[${this.attrs.ITEM}].${this.classes.ACTIVE}`);
    const speed = accordionGroup.dataset.accordionSpeed ? parseInt(accordionGroup.dataset.accordionSpeed) : 500;
    if (activeTitle && !accordionGroup.querySelectorAll('._slide').length) {
      activeTitle.classList.remove(this.classes.ACTIVE);
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__._slideUp)(activeTitle.nextElementSibling, speed);
    }
  }
  setActions(e) {
    const target = e.target;
    if (target.closest(`[${this.attrs.ITEM}]`)) {
      const title = target.closest(`[${this.attrs.ITEM}]`);
      const group = title.closest(`[${this.attrs.ACCORDION}]`);
      const isSingle = group.hasAttribute(this.attrs.SINGLE);
      const speed = group.dataset.accordionSpeed ? parseInt(group.dataset.accordionSpeed) : 500;
      if (!group.querySelectorAll('._slide').length) {
        if (isSingle && !title.classList.contains(this.classes.ACTIVE)) {
          this.hideBody(group);
        }
        title.classList.toggle(this.classes.ACTIVE);
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__._slideToggle)(title.nextElementSibling, speed);
      }
      e.preventDefault();
    }
  }
  initBody(accordionGroup) {
    let hideBody = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    let titles = accordionGroup.querySelectorAll(`[${this.attrs.ITEM}]`);
    if (titles.length) {
      titles = Array.from(titles).filter(item => item.closest(`[${this.attrs.ACCORDION}]`) === accordionGroup);
      titles.forEach(title => {
        if (hideBody) {
          title.removeAttribute('tabindex');
          if (!title.classList.contains(this.classes.ACTIVE)) {
            title.nextElementSibling.hidden = true;
          }
        } else {
          title.setAttribute('tabindex', '-1');
          title.nextElementSibling.hidden = false;
        }
      });
    }
  }
  init(accordionItems) {
    let matchMedia = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    accordionItems.forEach(accordionGroup => {
      accordionGroup = matchMedia ? accordionGroup.item : accordionGroup;
      if (matchMedia.matches || !matchMedia) {
        accordionGroup.classList.add(this.classes.INIT);
        this.initBody(accordionGroup);
        accordionGroup.addEventListener('click', this.setActions.bind(this));
      } else {
        accordionGroup.classList.remove(this.classes.INIT);
        this.initBody(accordionGroup, false);
        accordionGroup.removeEventListener('click', this.setActions.bind(this));
      }
    });
  }
}

// --------------------------------------------------------------------------

new Accordion();

/***/ }),

/***/ "./src/js/utils/forms.js":
/*!*******************************!*\
  !*** ./src/js/utils/forms.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules.js */ "./src/js/modules.js");


// --------------------------------------------------------------------------

class Validation {
  constructor() {
    this.attrs = {
      REQUIRED: 'data-required',
      IGNORE_VALIDATION: 'data-ignore-validation',
      AJAX: 'data-ajax',
      DEV: 'data-dev',
      IGNORE_FOCUS: 'data-ignore-focus',
      SHOW_PLACEHOLDER: 'data-show-placeholder',
      VALIDATE: 'data-validate'
    };
    this.classes = {
      HAS_ERROR: '_has-error',
      HAS_FOCUS: '_has-focus'
    };
  }
  getErrors(form) {
    let err = 0;
    let requiredFields = form.querySelectorAll(`*[${this.attrs.REQUIRED}]`);
    if (requiredFields.length) {
      requiredFields.forEach(requiredField => {
        if ((requiredField.offsetParent !== null || requiredField.tagName === 'SELECT') && !requiredField.disabled) {
          err += this.validateField(requiredField);
        }
      });
    }
    return err;
  }
  addError(requiredField) {
    requiredField.classList.add(this.classes.HAS_ERROR);
    requiredField.parentElement.classList.add(this.classes.HAS_ERROR);
  }
  removeError(requiredField) {
    requiredField.classList.remove(this.classes.HAS_ERROR);
    requiredField.parentElement.classList.remove(this.classes.HAS_ERROR);
  }
  validateField(requiredField) {
    let err = 0;
    if (requiredField.dataset.required === 'email') {
      requiredField.value = requiredField.value.replace(' ', '');
      if (this.testEmail(requiredField)) {
        this.addError(requiredField);
        err++;
      } else {
        this.removeError(requiredField);
      }
    } else if (requiredField.type === 'checkbox' && !requiredField.checked) {
      this.addError(requiredField);
      err++;
    } else {
      if (!requiredField.value.trim()) {
        this.addError(requiredField);
        err++;
      } else {
        this.removeError(requiredField);
      }
    }
    return err;
  }
  clearFields(form) {
    form.reset();
    setTimeout(() => {
      const inputs = form.querySelectorAll('input,textarea');
      const checkboxes = form.querySelectorAll('input[type="checkbox"]');
      if (inputs.length) {
        for (let index = 0; index < inputs.length; index++) {
          const input = inputs[index];
          input.parentElement.classList.remove(this.classes.HAS_FOCUS);
          input.classList.remove(this.classes.HAS_FOCUS);
          this.removeError(input);
        }
      }
      if (checkboxes.length) {
        for (let index = 0; index < checkboxes.length; index++) {
          const checkbox = checkboxes[index];
          checkbox.checked = false;
        }
      }
    }, 0);
  }
  testEmail(requiredField) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(requiredField.value);
  }
}
class FormSubmition extends Validation {
  constructor(shouldValidate) {
    super();
    this.shouldValidate = shouldValidate ? shouldValidate : true;
    this.forms = document.querySelectorAll('form');
    this.init();
  }
  sendForm(form) {
    let responseResult = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ``;
    document.dispatchEvent(new CustomEvent('sendForm', {
      detail: {
        form: form
      }
    }));

    // show modal, if popup module is connected
    setTimeout(() => {
      if (_modules_js__WEBPACK_IMPORTED_MODULE_0__.modules.popup) {
        const modal = form.dataset.modalMessage;
        modal ? _modules_js__WEBPACK_IMPORTED_MODULE_0__.modules.modal.open(modal) : null;
      }
    }, 0);
    this.clearFields(form);
    console.log('is sent');
  }
  async handleSubmition(form, e) {
    const err = !form.hasAttribute(this.attrs.IGNORE_VALIDATION) ? this.getErrors(form) : 0;
    if (err === 0) {
      const ajax = form.hasAttribute(this.attrs.AJAX);
      if (ajax) {
        e.preventDefault();
        const action = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
        const method = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
        const data = new FormData(form);
        form.classList.add('_is-sending');
        const response = await fetch(action, {
          method: method,
          body: data
        });
        if (response.ok) {
          const result = await response.json();
          form.classList.remove('_is-sending');
          this.sendForm(form, result);
        } else {
          alert('error');
          form.classList.remove('_is-sending');
        }
      } else if (form.hasAttribute(this.attrs.DEV)) {
        // in development mode
        e.preventDefault();
        this.sendForm(form);
      }
    } else {
      e.preventDefault();
    }
  }
  init() {
    const _this = this;
    if (this.forms.length) {
      this.forms.forEach(form => {
        form.addEventListener('submit', function (e) {
          _this.handleSubmition(e.target, e);
        });
        form.addEventListener('reset', function (e) {
          _this.clearFields(e.target);
        });
      });
    }
  }
}
class FormFields extends Validation {
  constructor() {
    super();
    this.fields = document.querySelectorAll('input,textarea');
    this.init();
  }
  savePlaceholder() {
    if (this.fields.length) {
      this.fields.forEach(field => {
        if (!field.hasAttribute(this.attrs.SHOW_PLACEHOLDER)) {
          field.dataset.placeholder = field.placeholder;
        }
      });
    }
  }
  handleFocusin(e) {
    const target = e.target;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      if (target.dataset.placeholder) target.placeholder = '';
      if (!target.hasAttribute(this.attrs.IGNORE_FOCUS)) {
        target.classList.add(this.classes.HAS_FOCUS);
        target.parentElement.classList.add(this.classes.HAS_FOCUS);
        target.classList.remove(this.classes.HAS_ERROR);
        target.parentElement.classList.remove(this.classes.HAS_ERROR);
      }
      this.removeError(target);
    }
  }
  handleFocusout(e) {
    const target = e.target;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      if (target.dataset.placeholder) {
        target.placeholder = target.dataset.placeholder;
      }
      if (!target.hasAttribute(this.attrs.IGNORE_FOCUS)) {
        target.classList.remove(this.classes.HAS_FOCUS);
        target.parentElement.classList.remove(this.classes.HAS_FOCUS);
      }
      if (target.hasAttribute(this.attrs.VALIDATE)) {
        this.validateField(target);
      }
    }
  }
  init() {
    // save placeholder in data attribute
    this.savePlaceholder();

    // handle submition
    new FormSubmition();

    // events
    document.body.addEventListener('focusin', this.handleFocusin.bind(this));
    document.body.addEventListener('focusout', this.handleFocusout.bind(this));
  }
}

// --------------------------------------------------------------------------

new FormFields();

/***/ }),

/***/ "./src/js/utils/modals.js":
/*!********************************!*\
  !*** ./src/js/utils/modals.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules.js */ "./src/js/modules.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils.js */ "./src/js/utils/utils.js");



// --------------------------------------------------------------------------

class Modal {
  constructor(options) {
    let config = {
      logging: true,
      init: true,
      attributeOpenButton: 'data-modal',
      attributeCloseButton: 'data-close',
      fixElementSelector: '[data-lp]',
      youtubeAttribute: 'data-modal-youtube',
      youtubePlaceAttribute: 'data-modal-youtube-place',
      setAutoplayYoutube: true,
      classes: {
        modal: 'modal',
        // modalWrapper: 'modal__wrapper',
        modalContent: 'modal__content',
        modalActive: 'modal_show',
        bodyActive: 'modal-show'
      },
      focusCatch: true,
      closeEsc: true,
      bodyLock: true,
      hashSettings: {
        location: true,
        goHash: true
      },
      on: {
        beforeOpen: function () {},
        afterOpen: function () {},
        beforeClose: function () {},
        afterClose: function () {}
      }
    };
    this.youTubeCode;
    this.isOpen = false;
    this.targetOpen = {
      selector: false,
      element: false
    };
    this.previousOpen = {
      selector: false,
      element: false
    };
    this.lastClosed = {
      selector: false,
      element: false
    };
    this._dataValue = false;
    this.hash = false;
    this._reopen = false;
    this._selectorOpen = false;
    this.lastFocusEl = false;
    this._focusEl = ['a[href]', 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', 'button:not([disabled]):not([aria-hidden])', 'select:not([disabled]):not([aria-hidden])', 'textarea:not([disabled]):not([aria-hidden])', 'area[href]', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex^="-"])'];
    //this.options = Object.assign(config, options);
    this.options = {
      ...config,
      ...options,
      classes: {
        ...config.classes,
        ...options?.classes
      },
      hashSettings: {
        ...config.hashSettings,
        ...options?.hashSettings
      },
      on: {
        ...config.on,
        ...options?.on
      }
    };
    this.bodyLock = false;
    this.options.init ? this.initmodals() : null;
  }
  initmodals() {
    this.eventsmodal();
  }
  eventsmodal() {
    document.addEventListener('click', function (e) {
      const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
      if (buttonOpen) {
        e.preventDefault();
        this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ? buttonOpen.getAttribute(this.options.attributeOpenButton) : 'error';
        this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ? buttonOpen.getAttribute(this.options.youtubeAttribute) : null;
        if (this._dataValue !== 'error') {
          if (!this.isOpen) this.lastFocusEl = buttonOpen;
          this.targetOpen.selector = `${this._dataValue}`;
          this._selectorOpen = true;
          this.open();
          return;
        }
        return;
      }
      const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
      if (!e.target.closest('#unconfirmedAgeModal') && !e.target.closest('#confirmAgeModal') && (buttonClose || !e.target.closest(`.${this.options.classes.modalContent}`) && this.isOpen)) {
        e.preventDefault();
        this.close();
        return;
      }
    }.bind(this));
    document.addEventListener('keydown', function (e) {
      if (this.options.closeEsc && e.which == 27 && e.code === 'Escape' && this.isOpen) {
        e.preventDefault();
        this.close();
        return;
      }
      if (this.options.focusCatch && e.which == 9 && this.isOpen) {
        this._focusCatch(e);
        return;
      }
    }.bind(this));
    if (this.options.hashSettings.goHash) {
      window.addEventListener('hashchange', function () {
        if (window.location.hash) {
          this._openToHash();
        } else {
          this.close(this.targetOpen.selector);
        }
      }.bind(this));
      window.addEventListener('load', function () {
        if (window.location.hash) {
          this._openToHash();
        }
      }.bind(this));
    }
  }
  open(selectorValue) {
    if (_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.bodyLockStatus) {
      this.bodyLock = document.documentElement.classList.contains('lock') && !this.isOpen ? true : false;
      if (selectorValue && typeof selectorValue === 'string' && selectorValue.trim() !== '') {
        this.targetOpen.selector = selectorValue;
        this._selectorOpen = true;
      }
      if (this.isOpen) {
        this._reopen = true;
        this.close();
      }
      if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
      if (!this._reopen) this.previousActiveElement = document.activeElement;
      this.targetOpen.element = document.querySelector(this.targetOpen.selector);
      if (this.targetOpen.element) {
        if (this.youTubeCode) {
          const codeVideo = this.youTubeCode;
          const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
          const iframe = document.createElement('iframe');
          iframe.setAttribute('allowfullscreen', '');
          const autoplay = this.options.setAutoplayYoutube ? 'autoplay;' : '';
          iframe.setAttribute('allow', `${autoplay}; encrypted-media`);
          iframe.setAttribute('src', urlVideo);
          if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
            const youtubePlace = this.targetOpen.element.querySelector('.modal__text').setAttribute(`${this.options.youtubePlaceAttribute}`, '');
          }
          this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
        }
        if (this.options.hashSettings.location) {
          this._getHash();
          this._setHash();
        }
        this.options.on.beforeOpen(this);
        document.dispatchEvent(new CustomEvent('beforemodalOpen', {
          detail: {
            modal: this
          }
        }));
        this.targetOpen.element.classList.add(this.options.classes.modalActive);
        document.documentElement.classList.add(this.options.classes.bodyActive);
        if (!this._reopen) {
          const m = document.querySelector(this.hash);
          setTimeout(() => {
            !this.bodyLock && !m.hasAttribute('data-bl-mobile') || !this.bodyLock && window.innerWidth <= 768 && m.hasAttribute('data-bl-mobile') ? (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.bodyLock)() : null;
          }, 0);
        } else this._reopen = false;
        this.targetOpen.element.setAttribute('aria-hidden', 'false');
        this.previousOpen.selector = this.targetOpen.selector;
        this.previousOpen.element = this.targetOpen.element;
        this._selectorOpen = false;
        this.isOpen = true;
        setTimeout(() => {
          this._focusTrap();
        }, 50);
        this.options.on.afterOpen(this);
        document.dispatchEvent(new CustomEvent('aftermodalOpen', {
          detail: {
            modal: this
          }
        }));
      }
    }
  }
  close(selectorValue) {
    if (selectorValue && typeof selectorValue === 'string' && selectorValue.trim() !== '') {
      this.previousOpen.selector = selectorValue;
    }
    if (!this.isOpen || !_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.bodyLockStatus) {
      return;
    }
    this.options.on.beforeClose(this);
    document.dispatchEvent(new CustomEvent('beforemodalClose', {
      detail: {
        modal: this
      }
    }));
    if (this.youTubeCode) {
      if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = '';
    }
    this.previousOpen.element.classList.remove(this.options.classes.modalActive);
    // aria-hidden
    this.previousOpen.element.setAttribute('aria-hidden', 'true');
    if (!this._reopen) {
      document.documentElement.classList.remove(this.options.classes.bodyActive);
      !this.bodyLock ? (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.bodyUnlock)() : null;
      this.isOpen = false;
    }
    this._removeHash();
    if (this._selectorOpen) {
      this.lastClosed.selector = this.previousOpen.selector;
      this.lastClosed.element = this.previousOpen.element;
    }
    this.options.on.afterClose(this);
    document.dispatchEvent(new CustomEvent('aftermodalClose', {
      detail: {
        modal: this
      }
    }));
    setTimeout(() => {
      this._focusTrap();
    }, 50);
  }
  _getHash() {
    if (this.options.hashSettings.location) {
      this.hash = this.targetOpen.selector.includes('#') ? this.targetOpen.selector : this.targetOpen.selector.replace('.', '#');
    }
  }
  _openToHash() {
    let classInHash = document.querySelector(`.${window.location.hash.replace('#', '')}`) ? `.${window.location.hash.replace('#', '')}` : document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` : null;
    const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace('.', '#')}"]`);
    if (buttons && classInHash) this.open(classInHash);
  }
  _setHash() {
    history.pushState('', '', this.hash);
  }
  _removeHash() {
    history.pushState('', '', window.location.href.split('#')[0]);
  }
  _focusCatch(e) {
    const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
    const focusArray = Array.prototype.slice.call(focusable);
    const focusedIndex = focusArray.indexOf(document.activeElement);
    if (e.shiftKey && focusedIndex === 0) {
      focusArray[focusArray.length - 1].focus();
      e.preventDefault();
    }
    if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
      focusArray[0].focus();
      e.preventDefault();
    }
  }
  _focusTrap() {
    const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
    if (!this.isOpen && this.lastFocusEl) {
      this.lastFocusEl.focus();
    } else {
      focusable[0].focus();
    }
  }
}
_modules_js__WEBPACK_IMPORTED_MODULE_0__.modules.modal = new Modal({});

// show age modal
if (document.querySelector('.mainpage')) {
  const confirmAgeBtn = document.getElementById('confirm-age-btn');
  // modules.modal.open('#confirmAgeModal');
  confirmAgeBtn.addEventListener('click', function () {
    _modules_js__WEBPACK_IMPORTED_MODULE_0__.modules.modal.close('#confirmAgeModal');
  });
}

/***/ }),

/***/ "./src/js/utils/select.js":
/*!********************************!*\
  !*** ./src/js/utils/select.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Select: () => (/* binding */ Select)
/* harmony export */ });
/* harmony import */ var simplebar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! simplebar */ "./node_modules/simplebar/dist/index.mjs");
/* harmony import */ var simplebar_dist_simplebar_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! simplebar/dist/simplebar.css */ "./node_modules/simplebar/dist/simplebar.css");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils/utils.js");




// --------------------------------------------------------------------------

class Select {
  // setup ------------------------------------------------------------------

  constructor() {
    this._this = this;

    // custom select classes
    this.classes = {
      // html build classes
      SELECT: 'select',
      BODY: 'select__body',
      LABEL: 'select__label',
      TITLE: 'select__title',
      VALUE: 'select__value',
      CONTENT: 'select__content',
      OPTIONS: 'select__options',
      OPTION: 'select__option',
      SCROLL: 'select__scroll',
      GROUP: 'select__group',
      INPUT: 'select__input',
      ASSET: 'select__asset',
      TXT: 'select__text',
      // state classes
      IS_ACTIVE: '_is-active',
      IS_FOCUSED: '_is-focused',
      IS_OPENED: '_is-opened',
      IS_FILLED: '_is-filled',
      IS_SELECTED: '_is-selected',
      IS_DISABLED: '_is-disabled',
      // additional classes
      HAS_LIST: '_has-list',
      HAS_ERROR: '_has-error',
      HAS_MULTIPLE: '_has-multiple',
      HAS_CHECKBOX: '_has-checkbox',
      HAS_LABEL: '_has-label'
    };

    // all select items
    const selectList = document.querySelectorAll('select');
    if (selectList.length) {
      this.init(selectList);
    }
  }

  // select initialization & build ------------------------------------------

  // initialization
  init(selectList) {
    // init
    selectList.forEach((select, index) => {
      this.initSelItem(select, index + 1);
    });

    // events
    document.addEventListener('click', function (e) {
      this.setActions(e);
    }.bind(this));
    document.addEventListener('keydown', function (e) {
      this.setActions(e);
    }.bind(this));
    document.addEventListener('focusin', function (e) {
      this.setActions(e);
    }.bind(this));
    document.addEventListener('focusout', function (e) {
      this.setActions(e);
    }.bind(this));
  }
  // single select item initialization
  initSelItem(relativeSel, index) {
    const _this = this;
    const select = document.createElement('div');
    select.classList.add(this.classes.SELECT);
    relativeSel.parentNode.insertBefore(select, relativeSel);
    select.appendChild(relativeSel);
    relativeSel.hidden = true;
    index ? relativeSel.dataset.selId = index : null;
    if (this.getPlaceholder(relativeSel)) {
      relativeSel.dataset.optPlaceholder = this.getPlaceholder(relativeSel).value;
      if (this.getPlaceholder(relativeSel).label.show) {
        const selTitle = this.getSelect(select, this.classes.TITLE).twinSel;
        selTitle.insertAdjacentHTML('afterbegin', `<span class="${this.classes.LABEL}">${this.getPlaceholder(relativeSel).label.text ? this.getPlaceholder(relativeSel).label.text : this.getPlaceholder(relativeSel).value}</span>`);
      }
    }
    select.insertAdjacentHTML('beforeend', `<div class="${this.classes.BODY}">
                    <div ${!relativeSel.hasAttribute('data-no-slide') ? 'hidden' : ''}  class="${this.classes.OPTIONS}">

                    </div>
                </div>`);
    this.build(relativeSel);
    relativeSel.dataset.speed = relativeSel.dataset.speed ? relativeSel.dataset.speed : '150';
    relativeSel.addEventListener('change', function (e) {
      _this.initSelections(e);
    });
  }
  // select build
  build(relativeSel) {
    const select = relativeSel.parentElement;

    // set id
    select.dataset.selId = relativeSel.dataset.selId;
    // set value
    this.setValue(select, relativeSel);
    // set options
    this.setOptions(select, relativeSel);
    // set css modificator
    relativeSel.dataset.selAddonClass ? select.classList.add(`select_${relativeSel.dataset.selAddonClass}`) : null;
    // set class if select is multiple
    relativeSel.multiple ? select.classList.add(this.classes.HAS_MULTIPLE) : select.classList.remove(this.classes.HAS_MULTIPLE);
    // set class if select checkboxes are set
    relativeSel.hasAttribute('data-sel-checkboxes') && relativeSel.multiple ? select.classList.add(this.classes.HAS_CHECKBOX) : select.classList.remove(this.classes.HAS_CHECKBOX);
    // disable select
    this.disableSelect(select, relativeSel);
    // set search actions if data-sel-search is set
    relativeSel.hasAttribute('data-sel-search') ? this.setSearchActions(select) : null;
    // set select actions if it's initially opened
    relativeSel.hasAttribute('data-sel-opened') ? this.setAction(select) : null;

    // set select hint
    if (relativeSel.dataset.selHint) {
      relativeSel.parentElement.insertAdjacentHTML('beforeend', `<div class="select__hint">${relativeSel.dataset.selHint}</div>`);
    }

    // show / hide selection from select title
    if (relativeSel.hasAttribute('data-show-val')) {
      select.classList.add('_select-show-val');
    } else {
      select.classList.remove('_select-show-val');
    }
  }
  // set twin select title value
  setValue(select, relativeSel) {
    const selBody = this.getSelect(select, this.classes.BODY).twinSel;
    const selTitle = this.getSelect(select, this.classes.TITLE).twinSel;
    if (selTitle) selTitle.remove();
    selBody.insertAdjacentHTML('afterbegin', this.getValue(select, relativeSel));
  }
  // set twin select options
  setOptions(select, relativeSel) {
    const _this = this;
    const options = this.getSelect(select, this.classes.OPTIONS).twinSel;
    const relativeSelOptions = this.getSelect(select, this.classes.OPTIONS).relativeSel;
    options.innerHTML = this.getOptions(relativeSel);
    window.addEventListener('resize', function () {
      _this.getOptions(relativeSel);
    });
    if (relativeSelOptions.querySelector('[selected]')) {
      options.querySelector(`.${this.classes.OPTION}`).classList.add(this.classes.IS_SELECTED);
    }
  }
  // disable select
  disableSelect(select, relativeSel) {
    if (relativeSel.disabled) {
      select.classList.add(this.classes.IS_DISABLED);
      this.getSelect(select, this.classes.TITLE).twinSel.disabled = true;
    } else {
      select.classList.remove(this.classes.IS_DISABLED);
      this.getSelect(select, this.classes.TITLE).twinSel.disabled = false;
    }
  }

  // main actions -----------------------------------------------------------

  // set main actions
  setActions(e) {
    const target = e.target;
    const type = e.type;
    if (target.closest(this.getClass(this.classes.SELECT)) || target.closest(this.getClass(this.classes.HAS_LIST))) {
      const select = target.closest('.select') ? target.closest('.select') : document.querySelector(`.${this.classes.sel}[data-sel-id="${target.closest(this.getClass(this.classes.HAS_LIST)).dataset.selectId}"]`);
      const relativeSel = this.getSelect(select).relativeSel;
      if (type === 'click') {
        if (!relativeSel.disabled) {
          if (target.closest(this.getClass(this.classes.HAS_LIST))) {
            const selList = target.closest(this.getClass(this.classes.HAS_LIST));
            const selOption = document.querySelector(`.${this.classes.SELECT}[data-sel-id="${selList.dataset.selId}"] .select__option[data-opt-val="${selList.dataset.optVal}"]`);
            this.setOptionAction(select, relativeSel, selOption);
          } else if (target.closest(this.getClass(this.classes.TITLE))) {
            this.setAction(select);
          } else if (target.closest(this.getClass(this.classes.OPTION))) {
            const selOption = target.closest(this.getClass(this.classes.OPTION));
            this.setOptionAction(select, relativeSel, selOption);
          }
        }
      } else if (type === 'focusin' || type === 'focusout') {
        if (target.closest(this.getClass(this.classes.SELECT))) {
          if (type === 'focusin') {
            select.classList.add(this.classes.IS_FOCUSED);
          } else {
            select.classList.remove(this.classes.IS_FOCUSED);
            if (relativeSel.hasAttribute('data-validate')) {
              if (!select.classList.contains(this.classes.IS_FILLED)) {
                this.addErr(relativeSel, select);
              } else {
                this.removeErr(relativeSel, select);
              }
            }
          }
        }
      } else if (type === 'keydown' && e.code === 'Escape') {
        this.closeGroup();
      }
    } else {
      this.closeGroup();
    }
  }
  // set single select action
  setAction(select) {
    const relativeSel = this.getSelect(select).relativeSel;
    const selOptions = this.getSelect(select, this.classes.OPTIONS).twinSel;
    if (relativeSel.closest('[data-one-select]')) {
      const selectOneGroup = relativeSel.closest('[data-one-select]');
      this.closeGroup(selectOneGroup, relativeSel);
    }
    if (!selOptions.classList.contains('_slide')) {
      select.classList.toggle(this.classes.IS_OPENED);
      if (!relativeSel.hasAttribute('data-no-slide')) (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__._slideToggle)(selOptions, relativeSel.dataset.speed);
      if (select.classList.contains(this.classes.IS_OPENED) && relativeSel.hasAttribute('data-validate') && select.classList.contains(this.classes.HAS_ERROR)) {
        this.removeErr(relativeSel, select);
      }
    }
  }
  // close single select group
  closeGroup(group, select) {
    const selGroup = group ? group : document;
    const selections = selGroup.querySelectorAll(`${this.getClass(this.classes.SELECT)}${this.getClass(this.classes.IS_OPENED)}`);
    if (selections.length) {
      selections.forEach(selection => {
        if (!select || select && selection.dataset.selId !== select.dataset.selId) {
          this.closeItem(selection);
        }
      });
    }
  }
  // close single select item
  closeItem(select) {
    const relativeSel = this.getSelect(select).relativeSel;
    const selOptions = this.getSelect(select, this.classes.OPTIONS).twinSel;
    if (!selOptions.classList.contains('_slide')) {
      select.classList.remove(this.classes.IS_OPENED);
      if (!relativeSel.hasAttribute('data-no-slide')) (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__._slideUp)(selOptions, relativeSel.dataset.speed);
    }
  }
  // set single option actions
  setOptionAction(select, relativeSel, option) {
    if (relativeSel.multiple) {
      option.classList.toggle(this.classes.IS_SELECTED);
      const relativeSelections = this.getData(relativeSel).elements;
      relativeSelections.forEach(relativeSelection => {
        relativeSelection.removeAttribute('selected');
      });
      const twinSelections = select.querySelectorAll(this.getClass(this.classes.IS_SELECTED));
      twinSelections.forEach(twinSelection => {
        relativeSel.querySelector(`option[value="${twinSelection.dataset.optVal}"]`).setAttribute('selected', 'selected');
      });
      if (!option.classList.contains(this.classes.IS_SELECTED)) {
        console.log(relativeSel.querySelector(`option[value="${option.dataset.optVal}"]`));
        relativeSel.querySelector(`option[value="${option.dataset.optVal}"]`).removeAttribute('selected');
      }
    } else {
      select.querySelectorAll('.select__option').forEach(opt => opt.classList.remove(this.classes.IS_SELECTED));
      option.classList.add(this.classes.IS_SELECTED);
      if (!relativeSel.hasAttribute('data-show-selection')) {
        if (select.querySelector(`${this.getClass(this.classes.OPTION)}[hidden]`)) {
          select.querySelector(`${this.getClass(this.classes.OPTION)}[hidden]`).hidden = false;
        }
        option.hidden = true;
      }
      relativeSel.value = option.hasAttribute('data-opt-val') ? option.dataset.optVal : option.textContent;
      this.setAction(select);
    }
    this.setValue(select, relativeSel);
    this.setSelections(relativeSel);
  }
  // set search actions
  setSearchActions(select) {
    const _this = this;
    const selInput = this.getSelect(select, this.classes.INPUT).twinSel;
    const selOptions = this.getSelect(select, this.classes.OPTIONS).twinSel.querySelectorAll(`.${this.classes.OPTION}`);
    selInput.addEventListener('input', function () {
      selOptions.forEach(selOption => {
        if (selOption.textContent.toUpperCase().indexOf(selInput.value.toUpperCase()) >= 0) {
          selOption.hidden = false;
        } else {
          selOption.hidden = true;
        }
      });
      selOptions.hidden === true ? _this.setAction(select) : null;
    });
  }
  // set select subtitle
  setSubtitle(relativeSel) {}

  // validation -------------------------------------------------------------

  // add an error to a select
  addErr(relativeSel, select) {
    select.classList.add(this.classes.HAS_ERROR);
    if (relativeSel.dataset.selError && !relativeSel.dataset.selHint) {
      relativeSel.parentElement.insertAdjacentHTML('beforeend', `<div class="select__hint">${relativeSel.dataset.selError}</div>`);
    }
  }
  // remove an error from a select
  removeErr(relativeSel, select) {
    if (select.classList.contains(this.classes.HAS_ERROR)) {
      select.classList.remove(this.classes.HAS_ERROR);
    }
    if (relativeSel.parentElement.querySelector('.select__hint') && !relativeSel.dataset.selHint) {
      relativeSel.parentElement.removeChild(relativeSel.parentElement.querySelector('.select__hint'));
    }
  }

  // utils ------------------------------------------------------------------

  // get custom class
  getClass(cssClass) {
    return `.${cssClass}`;
  }
  // get single select item
  getSelect(select, cssClass) {
    return {
      relativeSel: select.querySelector('select'),
      twinSel: select.querySelector(this.getClass(cssClass))
    };
  }
  // get selected item value
  getValue(select, relativeSel) {
    let attr,
      attrClass,
      titleVal = this.getData(relativeSel, 2).html;

    // set title value
    titleVal = titleVal.length ? titleVal : relativeSel.dataset.selLabel ? relativeSel.dataset.selLabel : '';

    // set active class to select if it contains any values
    if (this.getData(relativeSel).values.length) {
      select.classList.add(this.classes.IS_ACTIVE);
    } else {
      select.classList.remove(this.classes.IS_ACTIVE);
    }

    // set select label
    if (relativeSel.hasAttribute('data-sel-label')) {
      attr = relativeSel.dataset.selLabel ? ` data-sel-label="${relativeSel.dataset.selLabel}"` : ` data-sel-label="Выбор"`;
      attrClass = ` ${this.classes.HAS_LABEL}`;
    }

    // push selections to the list inside of select title
    if (relativeSel.multiple && relativeSel.hasAttribute('data-sel-list')) {
      titleVal = this.getData(relativeSel).elements.map(option => `<span data-opt-id="${select.dataset.selId}" data-opt-val="${option.value}" class="_list-item">${this.getContent(option)}</span>`).join('');
      if (relativeSel.dataset.list && document.querySelector(relativeSel.dataset.list)) {
        document.querySelector(relativeSel.dataset.list).innerHTML = titleVal;
        if (relativeSel.hasAttribute('data-sel-search')) titleVal = false;
      }
    }

    // init select search
    if (relativeSel.hasAttribute('data-sel-search')) {
      return `<div class="${this.classes.TITLE}"><span ${attr} class="${this.classes.VALUEUE}"><input autocomplete="off" type="search" placeholder="${titleVal}" data-placeholder="${titleVal}" class="${this.classes.INPUT}"></span></div>`;
    } else {
      const customClass = this.getData(relativeSel).elements.length && this.getData(relativeSel).elements[0].dataset.optClass ? ` ${this.getData(relativeSel).elements[0].dataset.optClass}` : '';
      return `<button type="button" class="${this.classes.TITLE}"><span ${attr ? attr : ''} class="${this.classes.VALUE} ${attrClass ? attrClass : ''}"><span class="${this.classes.CONTENT}${customClass}">${titleVal}</span></span></button>`;
    }
  }
  // get options
  getOptions(relativeSel) {
    const selScroll = relativeSel.hasAttribute('data-sel-scroll') ? `data-simplebar` : '';
    const data = selScroll ? relativeSel.dataset.selScroll.trim().split(',') : null;
    let selScrollHeight = relativeSel.dataset.selScroll && data ? `style="max-height:${window.innerWidth > 768 ? data[0] : data[1]}rem"` : '';
    let selOptions = Array.from(relativeSel.options);
    if (selOptions.length) {
      let selOptionsHTML = ``;
      if (this.getPlaceholder(relativeSel) && !this.getPlaceholder(relativeSel).show || relativeSel.multiple) {
        selOptions = selOptions.filter(option => option.value);
      }
      selOptionsHTML += selScroll ? `<div ${selScroll} ${selScrollHeight} data-sel-scroll="${relativeSel.dataset.selScroll}" class="${this.classes.SCROLL}">` : '';
      selOptions.forEach(option => {
        selOptionsHTML += this.getOption(option, relativeSel);
      });
      selOptionsHTML += selScroll ? `</div>` : '';
      return selOptionsHTML;
    }
  }
  // get option
  getOption(option, relativeSel) {
    const selections = option.selected && relativeSel.multiple ? ` ${this.classes.IS_SELECTED}` : '';
    const showSelection = option.selected && !relativeSel.hasAttribute('data-show-selection') && !relativeSel.multiple ? `hidden` : ``;
    const optionClass = option.dataset.optClass ? ` ${option.dataset.optClass}` : '';
    const optionLink = option.dataset.optionLink ? option.dataset.optionLink : false;
    const optionLinkTarget = option.hasAttribute('data-option-link-target') ? `target="_blank"` : '';
    let optionHTML = ``;
    optionHTML += optionLink ? `<a ${optionLinkTarget} ${showSelection} href="${optionLink}" data-opt-val="${option.value}" class="${this.classes.OPTION}${optionClass}${selections}">` : `<button ${showSelection} class="${this.classes.OPTION}${optionClass}${selections}" data-opt-val="${option.value}" type="button">`;
    optionHTML += this.getContent(option);
    optionHTML += optionLink ? `</a>` : `</button>`;
    return optionHTML;
  }
  // get select content
  getContent(option) {
    const optionData = option.dataset.optAsset ? `${option.dataset.optAsset}` : '';
    const optionDataHTML = optionData.indexOf('img') >= 0 ? `<img src="${optionData}" alt="">` : optionData;
    let optionContentHTML = ``;
    optionContentHTML += optionData ? `<span class="${this.classes.GROUP}">` : '';
    optionContentHTML += optionData ? `<span class="${this.classes.ASSET}">` : '';
    optionContentHTML += optionData ? optionDataHTML : '';
    optionContentHTML += optionData ? `</span>` : '';
    optionContentHTML += optionData ? `<span class="${this.classes.TXT}">` : '';
    optionContentHTML += option.textContent;
    optionContentHTML += optionData ? `</span>` : '';
    optionContentHTML += optionData ? `</span>` : '';
    return optionContentHTML;
  }
  // get select placeholder
  getPlaceholder(relativeSel) {
    const placeholder = Array.from(relativeSel.options).find(option => !option.value);
    if (placeholder) {
      placeholder.classList.add(this.classes.subtitle);
      return {
        value: placeholder.textContent,
        show: placeholder.hasAttribute('data-sel-ph-show'),
        label: {
          show: placeholder.hasAttribute('data-sel-ph'),
          text: placeholder.dataset.optPlaceholder
        }
      };
    }
  }
  // get selected options data
  getData(relativeSel) {
    let selections = [];
    if (relativeSel.multiple) {
      selections = Array.from(relativeSel.options).filter(option => option.value).filter(option => option.selected);
    } else {
      selections.push(relativeSel.options[relativeSel.selectedIndex]);
    }
    return {
      elements: selections.map(option => option),
      values: selections.filter(option => option.value).map(option => option.value),
      html: selections.map(option => this.getContent(option))
    };
  }

  // selections -------------------------------------------------------------

  // init selections
  initSelections(e) {
    const relativeSel = e.target;
    this.build(relativeSel);
    this.setSelections(relativeSel);
  }
  // set selections
  setSelections(relativeSel) {
    const select = relativeSel.parentElement;
    if (relativeSel.hasAttribute('data-submit') && relativeSel.value) {
      let tempButton = document.createElement('button');
      tempButton.type = 'submit';
      relativeSel.closest('form').append(tempButton);
      tempButton.click();
      tempButton.remove();
    }
    relativeSel.parentElement.classList.add(this.classes.IS_FILLED);
    this.selection(select, relativeSel);
  }
  // custom select event (listen to any selections / mutations)
  selection(select, relativeSel) {
    document.dispatchEvent(new CustomEvent('selection', {
      detail: {
        select: relativeSel
      }
    }));
  }
}
new Select({});

// --------------------------------------------------------------------------

if (document.querySelectorAll('[data-simplebar]').length) {
  document.querySelectorAll('[data-simplebar]').forEach(scrollBlock => {
    new simplebar__WEBPACK_IMPORTED_MODULE_0__["default"](scrollBlock, {
      autoHide: false
    });
  });
}

// --------------------------------------------------------------------------

/***/ }),

/***/ "./src/js/utils/tabs.js":
/*!******************************!*\
  !*** ./src/js/utils/tabs.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils/utils.js");


// --------------------------------------------------------------------------

class Tabs {
  constructor() {
    this.attrs = {
      TABS: 'data-tabs',
      INDEX: 'data-tabs-index',
      TITLES: 'data-tabs-titles',
      TITLE: 'data-tabs-title',
      TAB_ITEM: 'data-tabs-item',
      BODY: 'data-tabs-body',
      HASH: 'data-tabs-hash'
    };
    this.classes = {
      INIT: '_tabs-init',
      ACTIVE: '_is-active',
      MODAL: 'modal'
    };
    this.tabs = document.querySelectorAll(`[data-tabs]`);
    this.activeHash = [];
    if (this.tabs.length) {
      const hash = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getHash)();
      if (hash && hash.startsWith('tab-')) {
        activeHash = hash.replace('tab-', '').split('-');
      }
      this.tabs.forEach((tabsBlock, index) => {
        tabsBlock.classList.add(this.classes.INIT);
        tabsBlock.setAttribute(this.attrs.INDEX, index);
        tabsBlock.addEventListener('click', this.setActions.bind(this));
        this.init(tabsBlock);
      });
    }
  }
  setStatus(tabsBlock) {
    let titles = tabsBlock.querySelectorAll(`[${this.attrs.TITLE}]`);
    let content = tabsBlock.querySelectorAll(`[${this.attrs.TAB_ITEM}]`);
    const index = tabsBlock.dataset.tabsIndex;
    if (content.length) {
      const hasHash = tabsBlock.hasAttribute(this.attrs.HASH);
      content = Array.from(content).filter(item => item.closest(`[${this.attrs.TABS}]`) === tabsBlock);
      titles = Array.from(titles).filter(item => item.closest(`[${this.attrs.TABS}]`) === tabsBlock);
      content.forEach((item, indx) => {
        if (titles[indx].classList.contains(this.classes.ACTIVE)) {
          item.hidden = false;
          if (hasHash && !item.closest(`.${this.classes.MODAL}`)) {
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.setHash)(`tab-${index}-${indx}`);
          }
        } else {
          item.hidden = true;
        }
      });
    }
  }
  setActions(e) {
    const target = e.target;
    if (target.closest(`[${this.attrs.TITLE}]`)) {
      const title = target.closest(`[${this.attrs.TITLE}]`);
      const tabsBlock = title.closest(`[${this.attrs.TABS}]`);
      if (!title.classList.contains(this.classes.ACTIVE)) {
        let activeTitle = tabsBlock.querySelectorAll(`[${this.attrs.TITLE}].${this.classes.ACTIVE}`);
        activeTitle.length ? activeTitle = Array.from(activeTitle).filter(item => item.closest(`[${this.attrs.TABS}]`) === tabsBlock) : null;
        activeTitle.length ? activeTitle[0].classList.remove(this.classes.ACTIVE) : null;
        title.classList.add(this.classes.ACTIVE);
        this.setStatus(tabsBlock);
      }
      e.preventDefault();
    }
  }
  init(tabsBlock) {
    let titles = tabsBlock.querySelectorAll(`[${this.attrs.TITLES}]>*`);
    let content = tabsBlock.querySelectorAll(`[${this.attrs.BODY}]>*`);
    const index = tabsBlock.dataset.tabsIndex;
    const activeHashBlock = this.activeHash[0] == index;
    if (activeHashBlock) {
      const activeTitle = tabsBlock.querySelector(`[${this.attrs.TITLES}]>.${this.classes.ACTIVE}`);
      activeTitle ? activeTitle.classList.remove(this.classes.ACTIVE) : null;
    }
    if (content.length) {
      content = Array.from(content).filter(item => item.closest(`[${this.attrs.TABS}]`) === tabsBlock);
      titles = Array.from(titles).filter(item => item.closest(`[${this.attrs.TABS}]`) === tabsBlock);
      content.forEach((item, index) => {
        titles[index].setAttribute(this.attrs.TITLE, '');
        item.setAttribute(this.attrs.TAB_ITEM, '');
        if (activeHashBlock && index == this.activeHash[1]) {
          titles[index].classList.add(this.classes.ACTIVE);
        }
        item.hidden = !titles[index].classList.contains(this.classes.ACTIVE);
      });
    }
  }
}

// --------------------------------------------------------------------------

new Tabs();

// const tabs = () => {
//   const tabs = document.querySelectorAll('[data-tabs]');
//   let tabsActiveHash = [];

//   const init = tabsBlock => {
//     let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*');
//     let tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*');
//     const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
//     const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

//     if (tabsActiveHashBlock) {
//       const tabsActiveTitle = tabsBlock.querySelector(
//         '[data-tabs-titles]>._active'
//       );
//       tabsActiveTitle ? tabsActiveTitle.classList.remove('_active') : null;
//     }
//     if (tabsContent.length) {
//       tabsContent = Array.from(tabsContent).filter(
//         item => item.closest('[data-tabs]') === tabsBlock
//       );
//       tabsTitles = Array.from(tabsTitles).filter(
//         item => item.closest('[data-tabs]') === tabsBlock
//       );
//       tabsContent.forEach((tabsContentItem, index) => {
//         tabsTitles[index].setAttribute('data-tabs-title', '');
//         tabsContentItem.setAttribute('data-tabs-item', '');

//         if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
//           tabsTitles[index].classList.add('_active');
//         }
//         tabsContentItem.hidden =
//           !tabsTitles[index].classList.contains('_active');
//       });
//     }
//   };
//   const setStatus = tabsBlock => {
//     let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
//     let tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
//     const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
//     if (tabsContent.length) {
//       const isHash = tabsBlock.hasAttribute('data-tabs-hash');
//       tabsContent = Array.from(tabsContent).filter(
//         item => item.closest('[data-tabs]') === tabsBlock
//       );
//       tabsTitles = Array.from(tabsTitles).filter(
//         item => item.closest('[data-tabs]') === tabsBlock
//       );
//       tabsContent.forEach((tabsContentItem, index) => {
//         if (tabsTitles[index].classList.contains('_active')) {
//           tabsContentItem.hidden = false;
//           if (isHash && !tabsContentItem.closest('.popup')) {
//             setHash(`tab-${tabsBlockIndex}-${index}`);
//           }
//         } else {
//           tabsContentItem.hidden = true;
//         }
//       });
//     }
//   };
//   const setActions = e => {
//     const target = e.target;
//     if (target.closest('[data-tabs-title]')) {
//       const tabTitle = target.closest('[data-tabs-title]');
//       const tabsBlock = tabTitle.closest('[data-tabs]');
//       if (
//         !tabTitle.classList.contains('_active') &&
//         !tabsBlock.querySelector('._slide')
//       ) {
//         let tabActiveTitle = tabsBlock.querySelectorAll(
//           '[data-tabs-title]._active'
//         );
//         tabActiveTitle.length
//           ? (tabActiveTitle = Array.from(tabActiveTitle).filter(
//               item => item.closest('[data-tabs]') === tabsBlock
//             ))
//           : null;
//         tabActiveTitle.length
//           ? tabActiveTitle[0].classList.remove('_active')
//           : null;
//         tabTitle.classList.add('_active');
//         setStatus(tabsBlock);
//       }
//       e.preventDefault();
//     }
//   };

//   if (tabs.length) {
//     const hash = getHash();
//     if (hash && hash.startsWith('tab-')) {
//       tabsActiveHash = hash.replace('tab-', '').split('-');
//     }
//     tabs.forEach((tabsBlock, index) => {
//       tabsBlock.classList.add('_tab-init');
//       tabsBlock.setAttribute('data-tabs-index', index);
//       tabsBlock.addEventListener('click', setActions);
//       init(tabsBlock);
//     });
//   }
// };
// tabs();

/***/ }),

/***/ "./src/js/utils/utils.js":
/*!*******************************!*\
  !*** ./src/js/utils/utils.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _slideDown: () => (/* binding */ _slideDown),
/* harmony export */   _slideToggle: () => (/* binding */ _slideToggle),
/* harmony export */   _slideUp: () => (/* binding */ _slideUp),
/* harmony export */   bodyLock: () => (/* binding */ bodyLock),
/* harmony export */   bodyLockStatus: () => (/* binding */ bodyLockStatus),
/* harmony export */   bodyLockToggle: () => (/* binding */ bodyLockToggle),
/* harmony export */   bodyUnlock: () => (/* binding */ bodyUnlock),
/* harmony export */   dataMediaQueries: () => (/* binding */ dataMediaQueries),
/* harmony export */   getHash: () => (/* binding */ getHash),
/* harmony export */   menuClose: () => (/* binding */ menuClose),
/* harmony export */   menuInit: () => (/* binding */ menuInit),
/* harmony export */   menuOpen: () => (/* binding */ menuOpen),
/* harmony export */   remToPx: () => (/* binding */ remToPx),
/* harmony export */   removeClasses: () => (/* binding */ removeClasses),
/* harmony export */   setHash: () => (/* binding */ setHash),
/* harmony export */   uniqueArray: () => (/* binding */ uniqueArray)
/* harmony export */ });
/**
 * set hash to url
 * @param {string} hash
 */
const setHash = hash => {
  hash = hash ? `#${hash}` : window.location.href.split('#')[0];
  history.pushState('', '', hash);
};

/**
 * get hash from url
 * @returns string
 */
const getHash = () => {
  if (location.hash) {
    return location.hash.replace('#', '');
  }
};

/**
 * initializes hamburger menu
 */
const menuInit = () => {
  if (document.querySelector('.hamburger')) {
    document.addEventListener('click', function (e) {
      if (bodyLockStatus && e.target.closest('.hamburger')) {
        menuOpen();
      } else if (bodyLockStatus && document.documentElement.classList.contains('_menu-opened') && (e.target.closest('.menu__close-btn') || !e.target.closest('.menu'))) {
        menuClose();
      }
    });
  }
};
/**
 * opens hamburger menu
 */
const menuOpen = () => {
  bodyLock();
  document.documentElement.classList.add('_menu-opened');
};
/**
 * closes hamburger menu
 */
const menuClose = () => {
  bodyUnlock();
  document.documentElement.classList.remove('_menu-opened');
};

// body lock
let bodyLockStatus = true;
/**
 * toggles body lock
 * @param {number} delay
 */
const bodyLockToggle = function () {
  let delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  if (document.documentElement.classList.contains('lock')) {
    bodyUnlock(delay);
  } else {
    bodyLock(delay);
  }
};
/**
 * unlocks body
 * @param {number} delay
 */
const bodyUnlock = function () {
  let delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  if (bodyLockStatus) {
    setTimeout(() => {
      document.documentElement.classList.remove('lock');
    }, delay);
    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
};
/**
 * locks body
 * @param {number} delay
 */
const bodyLock = function () {
  let delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  if (bodyLockStatus) {
    document.documentElement.classList.add('lock');
    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
};

/**
 * make the array unique
 * @param {array} array
 * @returns
 */
function uniqueArray(array) {
  return array.filter(function (item, index, self) {
    return self.indexOf(item) === index;
  });
}

/**
 *
 * @param {array} array
 * @param {number} dataSetValue
 * process media requests from attributes
 */
const dataMediaQueries = (array, dataSetValue) => {
  // get objects with media queries
  const media = Array.from(array).filter(function (item, index, self) {
    if (item.dataset[dataSetValue]) {
      return item.dataset[dataSetValue].split(',')[0];
    }
  });
  // objects with media queries initialization
  if (media.length) {
    const breakpointsArray = [];
    media.forEach(item => {
      const params = item.dataset[dataSetValue];
      const breakpoint = {};
      const paramsArray = params.split(',');
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });
    // get unique breakpoints
    let mdQueries = breakpointsArray.map(function (item) {
      return '(' + item.type + '-width: ' + item.value + 'px),' + item.value + ',' + item.type;
    });
    mdQueries = uniqueArray(mdQueries);
    const mdQueriesArray = [];
    if (mdQueries.length) {
      // work with every breakpoint
      mdQueries.forEach(breakpoint => {
        const paramsArray = breakpoint.split(',');
        const mediaBreakpoint = paramsArray[1];
        const mediaType = paramsArray[2];
        const matchMedia = window.matchMedia(paramsArray[0]);
        // objects with conditions
        const itemsArray = breakpointsArray.filter(function (item) {
          if (item.value === mediaBreakpoint && item.type === mediaType) {
            return true;
          }
        });
        mdQueriesArray.push({
          itemsArray,
          matchMedia
        });
      });
      return mdQueriesArray;
    }
  }
};

/**
 * smoothly slides up
 * @param {HTMLElement} target
 * @param {number} duration
 * @param {boolean} showmore
 */
const _slideUp = function (target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  let showmore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = showmore ? `${showmore}rem` : `0`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty('height') : null;
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      !showmore ? target.style.removeProperty('overflow') : null;
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
      // create event
      document.dispatchEvent(new CustomEvent('slideUpDone', {
        detail: {
          target: target
        }
      }));
    }, duration);
  }
};

/**
 * smoothly slides down
 * @param {HTMLElement} target
 * @param {number} duration
 * @param {boolean} showmore
 */
const _slideDown = function (target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  let showmore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty('height') : null;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = showmore ? `${showmore}rem` : `0`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
      // create event
      document.dispatchEvent(new CustomEvent('slideDownDone', {
        detail: {
          target: target
        }
      }));
    }, duration);
  }
};

/**
 * toggles smooth slide
 * @param {HTMLElement} target
 * @param {number} duration
 * @returns function
 */
const _slideToggle = function (target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};

/**
 * converts rem to pixels
 * @param {number} remValue
 * @returns string
 */
function remToPx(remValue) {
  const htmlFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const pxValue = remValue * htmlFontSize;
  return Math.round(pxValue) + 'px';
}

// remove class from all array elements
const removeClasses = (array, className) => {
  for (var i = 0; i < array.length; i++) {
    array[i].classList.remove(className);
  }
};

/***/ }),

/***/ "./node_modules/can-use-dom/index.js":
/*!*******************************************!*\
  !*** ./node_modules/can-use-dom/index.js ***!
  \*******************************************/
/***/ ((module) => {

var canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

module.exports = canUseDOM;

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/group-css-media-queries-loader/lib/index.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/simplebar/dist/simplebar.css":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/group-css-media-queries-loader/lib/index.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/simplebar/dist/simplebar.css ***!
  \***********************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `[data-simplebar] {
  position: relative;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
}

.simplebar-wrapper {
  overflow: hidden;
  width: inherit;
  height: inherit;
  max-width: inherit;
  max-height: inherit;
}

.simplebar-mask {
  direction: inherit;
  position: absolute;
  overflow: hidden;
  padding: 0;
  margin: 0;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: auto !important;
  height: auto !important;
  z-index: 0;
}

.simplebar-offset {
  direction: inherit !important;
  box-sizing: inherit !important;
  resize: none !important;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 0;
  margin: 0;
  -webkit-overflow-scrolling: touch;
}

.simplebar-content-wrapper {
  direction: inherit;
  box-sizing: border-box !important;
  position: relative;
  display: block;
  height: 100%; /* Required for horizontal native scrollbar to not appear if parent is taller than natural height */
  width: auto;
  max-width: 100%; /* Not required for horizontal scroll to trigger */
  max-height: 100%; /* Needed for vertical scroll to trigger */
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.simplebar-content-wrapper::-webkit-scrollbar,
.simplebar-hide-scrollbar::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

.simplebar-content:before,
.simplebar-content:after {
  content: " ";
  display: table;
}

.simplebar-placeholder {
  max-height: 100%;
  max-width: 100%;
  width: 100%;
  pointer-events: none;
}

.simplebar-height-auto-observer-wrapper {
  box-sizing: inherit !important;
  height: 100%;
  width: 100%;
  max-width: 1px;
  position: relative;
  float: left;
  max-height: 1px;
  overflow: hidden;
  z-index: -1;
  padding: 0;
  margin: 0;
  pointer-events: none;
  flex-grow: inherit;
  flex-shrink: 0;
  flex-basis: 0;
}

.simplebar-height-auto-observer {
  box-sizing: inherit;
  display: block;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 1000%;
  width: 1000%;
  min-height: 1px;
  min-width: 1px;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
}

.simplebar-track {
  z-index: 1;
  position: absolute;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

[data-simplebar].simplebar-dragging {
  pointer-events: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

[data-simplebar].simplebar-dragging .simplebar-content {
  pointer-events: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

[data-simplebar].simplebar-dragging .simplebar-track {
  pointer-events: all;
}

.simplebar-scrollbar {
  position: absolute;
  left: 0;
  right: 0;
  min-height: 10px;
}

.simplebar-scrollbar:before {
  position: absolute;
  content: "";
  background: black;
  border-radius: 7px;
  left: 2px;
  right: 2px;
  opacity: 0;
  transition: opacity 0.2s 0.5s linear;
}

.simplebar-scrollbar.simplebar-visible:before {
  opacity: 0.5;
  transition-delay: 0s;
  transition-duration: 0s;
}

.simplebar-track.simplebar-vertical {
  top: 0;
  width: 11px;
}

.simplebar-scrollbar:before {
  top: 2px;
  bottom: 2px;
  left: 2px;
  right: 2px;
}

.simplebar-track.simplebar-horizontal {
  left: 0;
  height: 11px;
}

.simplebar-track.simplebar-horizontal .simplebar-scrollbar {
  right: auto;
  left: 0;
  top: 0;
  bottom: 0;
  min-height: 0;
  min-width: 10px;
  width: auto;
}

/* Rtl support */
[data-simplebar-direction=rtl] .simplebar-track.simplebar-vertical {
  right: auto;
  left: 0;
}

.simplebar-dummy-scrollbar-size {
  direction: rtl;
  position: fixed;
  opacity: 0;
  visibility: hidden;
  height: 500px;
  width: 500px;
  overflow-y: hidden;
  overflow-x: scroll;
  -ms-overflow-style: scrollbar !important;
}

.simplebar-dummy-scrollbar-size > div {
  width: 200%;
  height: 200%;
  margin: 10px 0;
}

.simplebar-hide-scrollbar {
  position: fixed;
  left: 0;
  visibility: hidden;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}`, "",{"version":3,"sources":["webpack://./node_modules/simplebar/dist/simplebar.css"],"names":[],"mappings":"AAAA;EACE,kBAAA;EACA,sBAAA;EACA,eAAA;EACA,2BAAA;EACA,yBAAA;EACA,uBAAA;AACF;;AAEA;EACE,gBAAA;EACA,cAAA;EACA,eAAA;EACA,kBAAA;EACA,mBAAA;AACF;;AAEA;EACE,kBAAA;EACA,kBAAA;EACA,gBAAA;EACA,UAAA;EACA,SAAA;EACA,OAAA;EACA,MAAA;EACA,SAAA;EACA,QAAA;EACA,sBAAA;EACA,uBAAA;EACA,UAAA;AACF;;AAEA;EACE,6BAAA;EACA,8BAAA;EACA,uBAAA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,SAAA;EACA,QAAA;EACA,UAAA;EACA,SAAA;EACA,iCAAA;AACF;;AAEA;EACE,kBAAA;EACA,iCAAA;EACA,kBAAA;EACA,cAAA;EACA,YAAA,EAAA,mGAAA;EACA,WAAA;EACA,eAAA,EAAA,kDAAA;EACA,gBAAA,EAAA,0CAAA;EACA,cAAA;EACA,qBAAA;EACA,wBAAA;AACF;;AAEA;;EAEE,aAAA;EACA,QAAA;EACA,SAAA;AACF;;AAEA;;EAEE,YAAA;EACA,cAAA;AACF;;AAEA;EACE,gBAAA;EACA,eAAA;EACA,WAAA;EACA,oBAAA;AACF;;AAEA;EACE,8BAAA;EACA,YAAA;EACA,WAAA;EACA,cAAA;EACA,kBAAA;EACA,WAAA;EACA,eAAA;EACA,gBAAA;EACA,WAAA;EACA,UAAA;EACA,SAAA;EACA,oBAAA;EACA,kBAAA;EACA,cAAA;EACA,aAAA;AACF;;AAEA;EACE,mBAAA;EACA,cAAA;EACA,UAAA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,aAAA;EACA,YAAA;EACA,eAAA;EACA,cAAA;EACA,gBAAA;EACA,oBAAA;EACA,WAAA;AACF;;AAEA;EACE,UAAA;EACA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,oBAAA;EACA,gBAAA;AACF;;AAEA;EACE,oBAAA;EACA,2BAAA;EACA,yBAAA;EACA,wBAAA;EACA,sBAAA;EACA,qBAAA;EACA,iBAAA;AACF;;AAEA;EACE,oBAAA;EACA,2BAAA;EACA,yBAAA;EACA,wBAAA;EACA,sBAAA;EACA,qBAAA;EACA,iBAAA;AACF;;AAEA;EACE,mBAAA;AACF;;AAEA;EACE,kBAAA;EACA,OAAA;EACA,QAAA;EACA,gBAAA;AACF;;AAEA;EACE,kBAAA;EACA,WAAA;EACA,iBAAA;EACA,kBAAA;EACA,SAAA;EACA,UAAA;EACA,UAAA;EACA,oCAAA;AACF;;AAEA;EACE,YAAA;EACA,oBAAA;EACA,uBAAA;AACF;;AAEA;EACE,MAAA;EACA,WAAA;AACF;;AAEA;EACE,QAAA;EACA,WAAA;EACA,SAAA;EACA,UAAA;AACF;;AAEA;EACE,OAAA;EACA,YAAA;AACF;;AAEA;EACE,WAAA;EACA,OAAA;EACA,MAAA;EACA,SAAA;EACA,aAAA;EACA,eAAA;EACA,WAAA;AACF;;AAEA,gBAAA;AACA;EACE,WAAA;EACA,OAAA;AACF;;AAEA;EACE,cAAA;EACA,eAAA;EACA,UAAA;EACA,kBAAA;EACA,aAAA;EACA,YAAA;EACA,kBAAA;EACA,kBAAA;EACA,wCAAA;AACF;;AAEA;EACE,WAAA;EACA,YAAA;EACA,cAAA;AACF;;AAEA;EACE,eAAA;EACA,OAAA;EACA,kBAAA;EACA,kBAAA;EACA,qBAAA;EACA,wBAAA;AACF","sourcesContent":["[data-simplebar] {\n  position: relative;\n  flex-direction: column;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  align-content: flex-start;\n  align-items: flex-start;\n}\n\n.simplebar-wrapper {\n  overflow: hidden;\n  width: inherit;\n  height: inherit;\n  max-width: inherit;\n  max-height: inherit;\n}\n\n.simplebar-mask {\n  direction: inherit;\n  position: absolute;\n  overflow: hidden;\n  padding: 0;\n  margin: 0;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  width: auto !important;\n  height: auto !important;\n  z-index: 0;\n}\n\n.simplebar-offset {\n  direction: inherit !important;\n  box-sizing: inherit !important;\n  resize: none !important;\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  padding: 0;\n  margin: 0;\n  -webkit-overflow-scrolling: touch;\n}\n\n.simplebar-content-wrapper {\n  direction: inherit;\n  box-sizing: border-box !important;\n  position: relative;\n  display: block;\n  height: 100%; /* Required for horizontal native scrollbar to not appear if parent is taller than natural height */\n  width: auto;\n  max-width: 100%; /* Not required for horizontal scroll to trigger */\n  max-height: 100%; /* Needed for vertical scroll to trigger */\n  overflow: auto;\n  scrollbar-width: none;\n  -ms-overflow-style: none;\n}\n\n.simplebar-content-wrapper::-webkit-scrollbar,\n.simplebar-hide-scrollbar::-webkit-scrollbar {\n  display: none;\n  width: 0;\n  height: 0;\n}\n\n.simplebar-content:before,\n.simplebar-content:after {\n  content: ' ';\n  display: table;\n}\n\n.simplebar-placeholder {\n  max-height: 100%;\n  max-width: 100%;\n  width: 100%;\n  pointer-events: none;\n}\n\n.simplebar-height-auto-observer-wrapper {\n  box-sizing: inherit !important;\n  height: 100%;\n  width: 100%;\n  max-width: 1px;\n  position: relative;\n  float: left;\n  max-height: 1px;\n  overflow: hidden;\n  z-index: -1;\n  padding: 0;\n  margin: 0;\n  pointer-events: none;\n  flex-grow: inherit;\n  flex-shrink: 0;\n  flex-basis: 0;\n}\n\n.simplebar-height-auto-observer {\n  box-sizing: inherit;\n  display: block;\n  opacity: 0;\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 1000%;\n  width: 1000%;\n  min-height: 1px;\n  min-width: 1px;\n  overflow: hidden;\n  pointer-events: none;\n  z-index: -1;\n}\n\n.simplebar-track {\n  z-index: 1;\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  pointer-events: none;\n  overflow: hidden;\n}\n\n[data-simplebar].simplebar-dragging {\n  pointer-events: none;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n[data-simplebar].simplebar-dragging .simplebar-content {\n  pointer-events: none;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n[data-simplebar].simplebar-dragging .simplebar-track {\n  pointer-events: all;\n}\n\n.simplebar-scrollbar {\n  position: absolute;\n  left: 0;\n  right: 0;\n  min-height: 10px;\n}\n\n.simplebar-scrollbar:before {\n  position: absolute;\n  content: '';\n  background: black;\n  border-radius: 7px;\n  left: 2px;\n  right: 2px;\n  opacity: 0;\n  transition: opacity 0.2s 0.5s linear;\n}\n\n.simplebar-scrollbar.simplebar-visible:before {\n  opacity: 0.5;\n  transition-delay: 0s;\n  transition-duration: 0s;\n}\n\n.simplebar-track.simplebar-vertical {\n  top: 0;\n  width: 11px;\n}\n\n.simplebar-scrollbar:before {\n  top: 2px;\n  bottom: 2px;\n  left: 2px;\n  right: 2px;\n}\n\n.simplebar-track.simplebar-horizontal {\n  left: 0;\n  height: 11px;\n}\n\n.simplebar-track.simplebar-horizontal .simplebar-scrollbar {\n  right: auto;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  min-height: 0;\n  min-width: 10px;\n  width: auto;\n}\n\n/* Rtl support */\n[data-simplebar-direction='rtl'] .simplebar-track.simplebar-vertical {\n  right: auto;\n  left: 0;\n}\n\n.simplebar-dummy-scrollbar-size {\n  direction: rtl;\n  position: fixed;\n  opacity: 0;\n  visibility: hidden;\n  height: 500px;\n  width: 500px;\n  overflow-y: hidden;\n  overflow-x: scroll;\n  -ms-overflow-style: scrollbar !important;\n}\n\n.simplebar-dummy-scrollbar-size > div {\n  width: 200%;\n  height: 200%;\n  margin: 10px 0;\n}\n\n.simplebar-hide-scrollbar {\n  position: fixed;\n  left: 0;\n  visibility: hidden;\n  overflow-y: scroll;\n  scrollbar-width: none;\n  -ms-overflow-style: none;\n}\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/group-css-media-queries-loader/lib/index.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/style.scss":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/group-css-media-queries-loader/lib/index.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/style.scss ***!
  \*************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Montserrat:300,regular,700&display=swap);"]);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Roboto+Flex:regular,500,600,800&display=swap);"]);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Nunito:regular,500,600,700&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-family: "Roboto Flex";
  font-size: 0.5208335vw;
  font-style: normal;
  font-weight: normal;
  -webkit-animation: bugfix infinite 1s;
  line-height: 1.2;
  margin: 0;
  height: 100%;
  padding: 0;
}

body {
  font-style: normal;
  font-weight: normal;
  -webkit-animation: bugfix infinite 1s;
  line-height: 1.2;
  margin: 0;
  padding: 0;
  height: 100%;
  font-size: 1.8rem;
  color: #2e2e2e;
  background-color: #eff1f3;
}

input,
textarea {
  -webkit-animation: bugfix infinite 1s;
  line-height: inherit;
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  color: inherit;
}

a {
  color: unset;
}

a,
a:hover {
  text-decoration: none;
}

button,
input,
a,
textarea {
  outline: none;
  cursor: pointer;
  font: inherit;
}
button:focus,
input:focus,
a:focus,
textarea:focus {
  outline: none;
}
button:active,
input:active,
a:active,
textarea:active {
  outline: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font: inherit;
  margin: 0;
  padding: 0;
}

p {
  margin-top: 0;
  margin-bottom: 0;
}

img {
  width: 100%;
  height: auto;
  display: block;
}

button {
  border: none;
  color: inherit;
  font: inherit;
  text-align: inherit;
  padding: 0;
  background-color: transparent;
}

ul {
  padding: 0;
  margin: 0;
}

ul li {
  margin: 0;
  padding: 0;
  list-style: none;
}

.container {
  width: 156rem;
  margin: 0 auto;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

svg,
img {
  width: 100%;
  height: auto;
  object-fit: contain;
}
html.lock,
html.lock body {
  overflow: hidden;
  touch-action: none;
}

html,
body {
  overflow-x: hidden;
}

main {
  position: relative;
}

.wrapper {
  margin: 0 auto;
  max-width: 1920px;
}

.h {
  font-family: "Nunito";
  font-weight: 500;
  line-height: 120%;
}
.h_h1 {
  font-size: 6rem;
}
.h_h2 {
  font-size: 3.4rem;
}
.h_h3 {
  font-size: 2.4rem;
}

.txt16 {
  line-height: 120%;
}
.txt16_caps {
  text-transform: uppercase;
}

input[type=text],
input[type=email],
input[type=tel],
textarea {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

textarea:focus,
input:focus {
  outline: none;
}

.input {
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;
}
.input__field {
  padding: 1.6rem 2rem;
  display: block;
  width: 100%;
  background-color: #ffffff;
  line-height: 1;
  border: 1px solid transparent;
  border-radius: 1.6rem;
  transition: color 0.3s ease, border 0.3s ease;
}
.input__field::placeholder {
  color: #898e9f;
  transition: color 0.3s ease;
}
.input__label {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 3rem;
  white-space: nowrap;
}
.input._has-focus .input__field {
  border: 1px solid #000000;
}
.input._has-error .input__label {
  color: transparent;
}
.input._has-error .input__label::after {
  content: attr(data-hint);
  position: absolute;
  top: 0;
  left: 0;
  color: #d7697d;
  white-space: nowrap;
}
.input._has-error .input__field {
  border: 1px solid #d7697d;
  color: #d7697d;
}
.input._has-error .input__field::placeholder {
  color: #d7697d;
}

.dropdown {
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;
}
.dropdown__label {
  color: #e9ecf5;
}

.select {
  position: relative;
}
.select__body {
  position: relative;
}
.select__title {
  position: relative;
  z-index: 3;
  width: 100%;
  border-radius: 1.6rem;
  background-color: #ffffff;
  cursor: pointer;
}
.select__value {
  padding: 1.6rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 5.6rem;
  width: 100%;
}
.select__value > * {
  flex: 1 1 auto;
}
.select__value::after {
  content: "";
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 2rem;
  width: 2rem;
  height: 2rem;
  background-image: url(./assets/images/icons/sel-arr.svg);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  transition: transform 0.3s ease;
}
.select__value._has-label::before {
  content: attr(data-sel-label);
  transition: color 0.3s ease;
}
.select__value._has-label::before,
.select__value .select__content {
  max-width: 31.4rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.select__content {
  margin-right: auto;
}
.select__text {
  flex: 1 1 auto;
}
.select__input {
  width: 100%;
  height: 100%;
  background-color: transparent;
}
.select__options {
  position: absolute;
  z-index: 2;
  top: calc(100% + 0.8rem);
  left: 0;
  padding: 2rem;
  min-width: 100%;
  border-radius: 1.6rem;
  background-color: #ffffff;
  box-shadow: 0 0 2rem rgba(52, 52, 52, 0.15);
}
.select__scroll {
  max-height: 19rem;
}
.select__scroll.simplebar-scrollable-y .simplebar-track.simplebar-vertical {
  right: 1.2rem;
  width: 0.4rem;
  border-radius: 0.8rem;
  background-color: #e4e7ee;
}
.select__scroll.simplebar-scrollable-y .simplebar-scrollbar {
  min-height: 3.2rem;
  border-radius: 0.8rem;
  background-color: #a2adc1;
}
.select__option {
  padding: 1.5rem 0;
  width: 100%;
  transition: color 0.3s ease;
}
.select__option:first-child {
  padding-top: 0;
}
.select__option:last-child {
  padding-bottom: 0;
}
.select__option._is-selected {
  font-weight: 500;
}
.select__group {
  display: inline-flex;
  align-items: flex-start;
  flex-direction: column-reverse;
}
.select__subtitle {
  cursor: text;
}
.select._is-opened {
  z-index: 5;
}
.select._is-opened .select__value::after {
  transform: rotate(-180deg);
}
.select._has-error:not(.select._has-error._is-filled, .select._has-error._is-opened) .select__value._select-label::before {
  color: #d7697d;
}

._select-list {
  cursor: pointer;
}

.accordion {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  max-width: 80rem;
}
.accordion__item {
  border-radius: 2.4rem;
  background-color: #ffffff;
}
.accordion__title {
  padding: 2.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.accordion__title._accordion-active .arr svg {
  transform: rotate(-90deg);
}
.accordion__title._accordion-active .arr {
  background-color: #6981d7;
}
.accordion__title .arr {
  flex: 0 0 5rem;
  width: 5rem;
  height: 5rem;
}
.accordion__body {
  padding: 2.4rem;
  padding-top: 0;
}
.accordion__text {
  color: rgb(132, 132, 132);
}
.accordion__text:not(:last-child) {
  margin-bottom: 1rem;
}

.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2rem;
  max-width: 80rem;
}
.form__fields {
  display: flex;
  column-gap: 2rem;
}

.btn {
  padding: 1.6rem 3.2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  column-gap: 1.6rem;
  border-radius: 5rem;
  color: #ffffff;
  background-color: #000000;
}

.tabs {
  margin: 6rem auto;
  max-width: 80rem;
}
.tabs__navigation {
  margin-bottom: 3rem;
  display: flex;
  justify-content: center;
  column-gap: 2rem;
}
.tabs__body {
  padding: 3rem;
  border-radius: 3rem;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.4);
}

.dropdowns {
  margin: 3rem auto;
  max-width: 80rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}

@media (min-width: 48em){
  .txt16 {
    font-size: 1.6rem;
  }
}

@media (min-width: 1920px){
  html {
    font-size: 10px;
  }
}

@media (max-width: 48em){
  html {
    font-size: 5px;
    font-size: 1.5625vw;
    font-size: 1.3333333333vw;
    -webkit-text-size-adjust: none;
  }
  body {
    font-size: 3rem;
    -webkit-text-size-adjust: none;
  }
  .container {
    padding: 0 3.2rem;
    width: 100%;
  }
  .h_h2 {
    font-size: 4.4rem;
  }
  .h_h3 {
    font-size: 3.6rem;
  }
  .input {
    row-gap: 1.6rem;
  }
  .input__field {
    padding: 2.4rem 3.6rem;
    border-radius: 3.2rem;
  }
  .dropdown {
    row-gap: 1.6rem;
  }
  .select__title {
    border-radius: 3.2rem;
  }
  .select__value {
    padding: 2.4rem 3.2rem;
    gap: 4rem;
    height: 8.8rem;
  }
  .select__value::after {
    flex: 0 0 3.2rem;
    width: 3.2rem;
    height: 3.2rem;
  }
  .select__options {
    padding: 3.2rem;
    border-radius: 3.2rem;
  }
  .select__option {
    padding: 2.4rem 0;
  }
  .accordion__item {
    border-radius: 5rem;
  }
  .accordion__title {
    padding: 3.2rem;
  }
  .accordion__title .arr {
    flex: 0 0 9rem;
    width: 9rem;
    height: 9rem;
  }
  .accordion__body {
    padding: 3.2rem;
    padding-top: 0;
  }
}

@media (any-hover: hover){
  .select__option:hover:not(.select__option:hover.select__subtitle) {
    cursor: pointer;
  }
  .accordion__title .arr:hover {
    background-color: #6981d7;
  }
}`, "",{"version":3,"sources":["webpack://./src/scss/set.scss","webpack://./src/scss/style.scss","webpack://./src/ui/styles/_typo.scss","webpack://./src/ui/styles/_input.scss","webpack://./src/ui/styles/_select.scss","webpack://./src/ui/styles/_accordion.scss","webpack://./src/ui/styles/ui.scss","<no source>"],"names":[],"mappings":"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","sourcesContent":["*,\n*::before,\n*::after {\n    box-sizing: border-box;\n}\nhtml {\n    font-family: 'Roboto Flex'; // шрифт по умолчанию по сайту\n    font-size: 0.5208335vw; // на разрешении 1920 0.520835vw === 10px\n    font-style: normal;\n    font-weight: normal;\n    -webkit-animation: bugfix infinite 1s;\n    line-height: 1.2;\n    margin: 0;\n    height: 100%;\n    padding: 0;\n}\n\nbody {\n    font-style: normal;\n    font-weight: normal;\n    -webkit-animation: bugfix infinite 1s;\n    line-height: 1.2;\n    margin: 0;\n    padding: 0;\n    height: 100%;\n    font-size: 1.8rem;\n    color: $fontColor; // цвет по умолчанию текста по сайту\n    background-color: $bgColor;\n}\n\ninput,\ntextarea {\n    -webkit-animation: bugfix infinite 1s;\n    line-height: inherit;\n    margin: 0;\n    padding: 0;\n    background-color: transparent;\n    border: none;\n    color: inherit;\n}\na {\n    color: unset;\n}\na,\na:hover {\n    text-decoration: none;\n}\n\nbutton,\ninput,\na,\ntextarea {\n    outline: none;\n    cursor: pointer;\n    font: inherit;\n    &:focus {\n        outline: none;\n    }\n    &:active {\n        outline: none;\n    }\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n    font: inherit;\n    margin: 0;\n    padding: 0;\n}\np {\n    margin-top: 0;\n    margin-bottom: 0;\n}\n\nimg {\n    width: 100%;\n    height: auto;\n    display: block;\n}\n\nbutton {\n    border: none;\n    color: inherit;\n    font: inherit;\n    text-align: inherit;\n    padding: 0;\n    background-color: transparent;\n}\nul {\n    padding: 0;\n    margin: 0;\n}\n\nul li {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n}\n\n.container {\n    width: 156rem;\n    margin: 0 auto;\n}\n\ninput[type='number']::-webkit-inner-spin-button,\ninput[type='number']::-webkit-outer-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n}\n\ninput[type='number'] {\n    -moz-appearance: textfield;\n}\n\nsvg,\nimg {\n    width: 100%;\n    height: auto;\n    object-fit: contain;\n}\n\n@media (min-width: 1920px) {\n    html {\n        font-size: 10px;\n    }\n}\n\n@media (max-width: 48em) {\n    html {\n        font-size: 5px;\n        font-size: 1.5625vw;\n        font-size: calc((100 / 375) * 5vw); // где 375 это ширина моб версии макета\n        -webkit-text-size-adjust: none;\n    }\n\n    body {\n        font-size: 3rem;\n        -webkit-text-size-adjust: none;\n    }\n\n    .container {\n        padding: 0 3.2rem; // в моб версии отступ от края задаем для всех контейнеров, а там где не нужно можем точечно убрать\n        width: 100%;\n    }\n}\n","// --------------------------------- mixins ---------------------------------\n\n@import './mixins';\n\n// -------------------------------- variables -------------------------------\n\n// colors\n$white: #ffffff;\n$black: #000000;\n$fontColor: #2e2e2e;\n$bgColor: #eff1f3;\n$blue: #6981d7;\n$lightBlue: #63b3df;\n$red: #d7697d;\n$gray: #dee2e7;\n$textGray: #898e9f;\n$lightGray: #e9ecf5;\n\n// ---------------------------------- fonts ---------------------------------\n\n@import url(https://fonts.googleapis.com/css?family=Montserrat:300,regular,700&display=swap);\n@import url(https://fonts.googleapis.com/css?family=Roboto+Flex:regular,500,600,800&display=swap);\n@import url(https://fonts.googleapis.com/css?family=Nunito:regular,500,600,700&display=swap);\n\n// local fonts\n// @import './fonts';\n\n// ------------------------------- base styles ------------------------------\n\n// base scss file\n@import './set';\n\n// html\nhtml.lock,\nhtml.lock body {\n    overflow: hidden;\n    touch-action: none;\n}\nhtml,\nbody {\n    overflow-x: hidden;\n}\n\n// main\nmain {\n    position: relative;\n}\n\n.wrapper {\n    margin: 0 auto;\n    max-width: 1920px;\n}\n\n// --------------------------------------------------------------------------\n\n// header / footer\n@import './sections/header';\n@import './sections/footer';\n\n// ui\n@import '../ui/styles/ui.scss';\n\n// --------------------------------------------------------------------------\n\n@import './dev/vzmsk1.scss';\n@import './dev/markusDM.scss';\n@import './dev/ukik0.scss';\n@import './dev/kie6er.scss';\n",".h {\n    font-family: 'Nunito';\n    font-weight: 500;\n    line-height: 120%;\n\n    &_h1 {\n        font-size: 6rem;\n    }\n\n    &_h2 {\n        font-size: 3.4rem;\n        @media (max-width: 48em) {\n            font-size: 4.4rem;\n        }\n    }\n\n    &_h3 {\n        font-size: 2.4rem;\n\n        @media (max-width: 48em) {\n            font-size: 3.6rem;\n        }\n    }\n}\n\n.txt16 {\n    line-height: 120%;\n\n    &_caps {\n        text-transform: uppercase;\n    }\n\n    @media (min-width: 48em) {\n        font-size: 1.6rem;\n    }\n}\n","input[type='text'],\ninput[type='email'],\ninput[type='tel'],\ntextarea {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n}\ntextarea:focus,\ninput:focus {\n  outline: none;\n}\n\n.input {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  row-gap: 1.2rem;\n\n  @media (max-width: 48em) {\n    row-gap: 1.6rem;\n  }\n\n  // .input__field\n\n  &__field {\n    padding: 1.6rem 2rem;\n    display: block;\n    width: 100%;\n    background-color: $white;\n    line-height: 1;\n    border: 1px solid transparent;\n    border-radius: 1.6rem;\n    transition: color 0.3s ease, border 0.3s ease;\n    &::placeholder {\n      color: $textGray;\n      transition: color 0.3s ease;\n    }\n\n    @media (max-width: 48em) {\n      padding: 2.4rem 3.6rem;\n      border-radius: 3.2rem;\n    }\n  }\n\n  // .input__label\n\n  &__label {\n    position: relative;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    column-gap: 3rem;\n    white-space: nowrap;\n  }\n\n  &._has-focus {\n    .input__field {\n      border: 1px solid $black;\n    }\n  }\n  &._has-error {\n    .input__label {\n      color: transparent;\n      &::after {\n        content: attr(data-hint);\n        position: absolute;\n        top: 0;\n        left: 0;\n        color: $red;\n        white-space: nowrap;\n      }\n    }\n    .input__field {\n      border: 1px solid $red;\n      color: $red;\n      &::placeholder {\n        color: $red;\n      }\n    }\n  }\n}\n",".dropdown {\n  display: flex;\n  flex-direction: column;\n  row-gap: 1.2rem;\n\n  @media (max-width: 48em) {\n    row-gap: 1.6rem;\n  }\n\n  // .dropdown__label\n\n  &__label {\n    color: $lightGray;\n  }\n}\n\n.select {\n  position: relative;\n\n  // .select__body\n\n  &__body {\n    position: relative;\n  }\n\n  // .select__title\n\n  &__title {\n    position: relative;\n    z-index: 3;\n    width: 100%;\n    border-radius: 1.6rem;\n    background-color: $white;\n    cursor: pointer;\n\n    @media (max-width: 48em) {\n      border-radius: 3.2rem;\n    }\n  }\n\n  // .select__value\n\n  &__value {\n    padding: 1.6rem 2rem;\n    display: flex;\n    align-items: center;\n    gap: 1rem;\n    height: 5.6rem;\n    width: 100%;\n\n    > * {\n      flex: 1 1 auto;\n    }\n\n    &::after {\n      content: '';\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      flex: 0 0 2rem;\n      width: 2rem;\n      height: 2rem;\n      background-image: url(./assets/images/icons/sel-arr.svg);\n      background-size: contain;\n      background-position: center;\n      background-repeat: no-repeat;\n      transition: transform 0.3s ease;\n    }\n    &._has-label {\n      &::before {\n        content: attr(data-sel-label);\n        transition: color 0.3s ease;\n      }\n    }\n    &._has-label::before,\n    .select__content {\n      max-width: 31.4rem;\n      overflow: hidden;\n      white-space: nowrap;\n      text-overflow: ellipsis;\n    }\n\n    @media (max-width: 48em) {\n      padding: 2.4rem 3.2rem;\n      gap: 4rem;\n      height: 8.8rem;\n      &::after {\n        flex: 0 0 3.2rem;\n        width: 3.2rem;\n        height: 3.2rem;\n      }\n    }\n  }\n\n  // .select__content\n\n  &__content {\n    margin-right: auto;\n    // hide / show selected value\n    // &:not(._select-filled &) {\n    //     display: none;\n    // }\n  }\n\n  // .select__text\n\n  &__text {\n    flex: 1 1 auto;\n  }\n\n  // .select__input\n\n  &__input {\n    width: 100%;\n    height: 100%;\n    background-color: transparent;\n  }\n\n  // .select__options\n\n  &__options {\n    position: absolute;\n    z-index: 2;\n    top: calc(100% + 0.8rem);\n    left: 0;\n    padding: 2rem;\n    min-width: 100%;\n    border-radius: 1.6rem;\n    background-color: $white;\n    box-shadow: 0 0 2rem rgba(52, 52, 52, 0.15);\n\n    @media (max-width: 48em) {\n      padding: 3.2rem;\n      border-radius: 3.2rem;\n    }\n  }\n\n  // .select__scroll\n\n  &__scroll {\n    // // maximum height\n    max-height: 19rem;\n\n    // // scrollbar styles\n    &.simplebar-scrollable-y {\n      .simplebar-track.simplebar-vertical {\n        right: 1.2rem;\n        width: 0.4rem;\n        border-radius: 0.8rem;\n        background-color: #e4e7ee;\n      }\n      .simplebar-scrollbar {\n        min-height: 3.2rem;\n        border-radius: 0.8rem;\n        background-color: #a2adc1;\n      }\n    }\n  }\n\n  // .select__option\n  &__option {\n    padding: 1.5rem 0;\n    width: 100%;\n    transition: color 0.3s ease;\n    &:first-child {\n      padding-top: 0;\n    }\n    &:last-child {\n      padding-bottom: 0;\n    }\n\n    &._is-selected {\n      font-weight: 500;\n    }\n    @media (any-hover: hover) {\n      &:hover {\n        &:not(&.select__subtitle) {\n          cursor: pointer;\n        }\n      }\n    }\n    @media (max-width: 48em) {\n      padding: 2.4rem 0;\n    }\n  }\n\n  // .select__group\n\n  &__group {\n    display: inline-flex;\n    align-items: flex-start;\n    flex-direction: column-reverse;\n  }\n\n  // .select__asset\n\n  &__asset {\n  }\n\n  // .select__text\n\n  &__text {\n  }\n\n  // .select__hint\n\n  &__hint {\n  }\n\n  // .select__subtitle\n\n  &__subtitle {\n    cursor: text;\n  }\n\n  // select state\n  &._is-opened {\n    z-index: 5;\n    .select__value::after {\n      transform: rotate(-180deg);\n    }\n  }\n  &._has-error {\n    &:not(&._is-filled, &._is-opened) {\n      .select__value._select-label {\n        &::before {\n          color: $red;\n        }\n      }\n    }\n  }\n}\n\n// list\n._select-list {\n  cursor: pointer;\n}\n",".accordion {\n  margin: 3rem auto;\n  display: flex;\n  flex-direction: column;\n  row-gap: 1rem;\n  max-width: 80rem;\n\n  // .accordion__item\n\n  &__item {\n    border-radius: 2.4rem;\n    background-color: $white;\n    @media (max-width: 48em) {\n      border-radius: 5rem;\n    }\n  }\n\n  // .accordion__title\n\n  &__title {\n    padding: 2.4rem;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    width: 100%;\n    &._accordion-active {\n      .arr svg {\n        transform: rotate(-90deg);\n      }\n      .arr {\n        background-color: $blue;\n      }\n    }\n    .arr {\n      flex: 0 0 5rem;\n      width: 5rem;\n      height: 5rem;\n      @media (any-hover: hover) {\n        &:hover {\n          background-color: $blue;\n        }\n      }\n    }\n    @media (max-width: 48em) {\n      padding: 3.2rem;\n      .arr {\n        flex: 0 0 9rem;\n        width: 9rem;\n        height: 9rem;\n      }\n    }\n  }\n\n  // .accordion__title-txt\n\n  &__title-txt {\n  }\n\n  // .accordion__body\n\n  &__body {\n    padding: 2.4rem;\n    padding-top: 0;\n    @media (max-width: 48em) {\n      padding: 3.2rem;\n      padding-top: 0;\n    }\n  }\n\n  // .accordion__text\n\n  &__text {\n    color: rgba(132, 132, 132, 1);\n    &:not(:last-child) {\n      margin-bottom: 1rem;\n    }\n  }\n}\n","// typography\n@import './typo';\n\n// input\n@import './input';\n\n// select\n@import './select';\n\n// accordion\n@import './accordion';\n\n// ---------------------------- для демонстрации ---------------------------\n\n.form {\n  margin: 3rem auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  row-gap: 2rem;\n  max-width: 80rem;\n\n  // .form__fields\n\n  &__fields {\n    display: flex;\n    column-gap: 2rem;\n  }\n}\n\n.btn {\n  padding: 1.6rem 3.2rem;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  column-gap: 1.6rem;\n  border-radius: 5rem;\n  color: $white;\n  background-color: $black;\n}\n\n.tabs {\n  margin: 6rem auto;\n  max-width: 80rem;\n\n  // .tabs__navigation\n\n  &__navigation {\n    margin-bottom: 3rem;\n    display: flex;\n    justify-content: center;\n    column-gap: 2rem;\n  }\n\n  // .tabs__body\n\n  &__body {\n    padding: 3rem;\n    border-radius: 3rem;\n    text-align: center;\n    background-color: rgba(255, 255, 255, 0.4);\n  }\n}\n\n.dropdowns {\n  margin: 3rem auto;\n  max-width: 80rem;\n  display: flex;\n  flex-direction: column;\n  row-gap: 1rem;\n}\n\n// -------------------------------------------------------------------------\n",null],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/simplebar/dist/simplebar.css":
/*!***************************************************!*\
  !*** ./node_modules/simplebar/dist/simplebar.css ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_group_css_media_queries_loader_lib_index_js_sass_loader_dist_cjs_js_simplebar_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!../../group-css-media-queries-loader/lib/index.js!../../sass-loader/dist/cjs.js!./simplebar.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/group-css-media-queries-loader/lib/index.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/simplebar/dist/simplebar.css");
/* harmony import */ var _css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_group_css_media_queries_loader_lib_index_js_sass_loader_dist_cjs_js_simplebar_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_group_css_media_queries_loader_lib_index_js_sass_loader_dist_cjs_js_simplebar_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_group_css_media_queries_loader_lib_index_js_sass_loader_dist_cjs_js_simplebar_css__WEBPACK_IMPORTED_MODULE_6__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_group_css_media_queries_loader_lib_index_js_sass_loader_dist_cjs_js_simplebar_css__WEBPACK_IMPORTED_MODULE_6__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()((_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_group_css_media_queries_loader_lib_index_js_sass_loader_dist_cjs_js_simplebar_css__WEBPACK_IMPORTED_MODULE_6___default()), options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_group_css_media_queries_loader_lib_index_js_sass_loader_dist_cjs_js_simplebar_css__WEBPACK_IMPORTED_MODULE_6___default()) && (_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_group_css_media_queries_loader_lib_index_js_sass_loader_dist_cjs_js_simplebar_css__WEBPACK_IMPORTED_MODULE_6___default().locals) ? (_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_group_css_media_queries_loader_lib_index_js_sass_loader_dist_cjs_js_simplebar_css__WEBPACK_IMPORTED_MODULE_6___default().locals) : undefined);


/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_group_css_media_queries_loader_lib_index_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!../../node_modules/group-css-media-queries-loader/lib/index.js!../../node_modules/sass-loader/dist/cjs.js!./style.scss */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/group-css-media-queries-loader/lib/index.js!./node_modules/sass-loader/dist/cjs.js!./src/scss/style.scss");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_group_css_media_queries_loader_lib_index_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_group_css_media_queries_loader_lib_index_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_group_css_media_queries_loader_lib_index_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_group_css_media_queries_loader_lib_index_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()((_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_group_css_media_queries_loader_lib_index_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6___default()), options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_group_css_media_queries_loader_lib_index_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6___default()) && (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_group_css_media_queries_loader_lib_index_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6___default().locals) ? (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_group_css_media_queries_loader_lib_index_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6___default().locals) : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./node_modules/lodash-es/_Symbol.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash-es/_Symbol.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _root_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_root.js */ "./node_modules/lodash-es/_root.js");


/** Built-in value references. */
var Symbol = _root_js__WEBPACK_IMPORTED_MODULE_0__["default"].Symbol;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Symbol);


/***/ }),

/***/ "./node_modules/lodash-es/_baseGetTag.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash-es/_baseGetTag.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_Symbol.js */ "./node_modules/lodash-es/_Symbol.js");
/* harmony import */ var _getRawTag_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_getRawTag.js */ "./node_modules/lodash-es/_getRawTag.js");
/* harmony import */ var _objectToString_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_objectToString.js */ "./node_modules/lodash-es/_objectToString.js");




/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol_js__WEBPACK_IMPORTED_MODULE_0__["default"] ? _Symbol_js__WEBPACK_IMPORTED_MODULE_0__["default"].toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? (0,_getRawTag_js__WEBPACK_IMPORTED_MODULE_1__["default"])(value)
    : (0,_objectToString_js__WEBPACK_IMPORTED_MODULE_2__["default"])(value);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseGetTag);


/***/ }),

/***/ "./node_modules/lodash-es/_baseTrim.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash-es/_baseTrim.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _trimmedEndIndex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_trimmedEndIndex.js */ "./node_modules/lodash-es/_trimmedEndIndex.js");


/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, (0,_trimmedEndIndex_js__WEBPACK_IMPORTED_MODULE_0__["default"])(string) + 1).replace(reTrimStart, '')
    : string;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseTrim);


/***/ }),

/***/ "./node_modules/lodash-es/_freeGlobal.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash-es/_freeGlobal.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (freeGlobal);


/***/ }),

/***/ "./node_modules/lodash-es/_getRawTag.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash-es/_getRawTag.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_Symbol.js */ "./node_modules/lodash-es/_Symbol.js");


/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol_js__WEBPACK_IMPORTED_MODULE_0__["default"] ? _Symbol_js__WEBPACK_IMPORTED_MODULE_0__["default"].toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getRawTag);


/***/ }),

/***/ "./node_modules/lodash-es/_objectToString.js":
/*!***************************************************!*\
  !*** ./node_modules/lodash-es/_objectToString.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (objectToString);


/***/ }),

/***/ "./node_modules/lodash-es/_root.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash-es/_root.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _freeGlobal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_freeGlobal.js */ "./node_modules/lodash-es/_freeGlobal.js");


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal_js__WEBPACK_IMPORTED_MODULE_0__["default"] || freeSelf || Function('return this')();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (root);


/***/ }),

/***/ "./node_modules/lodash-es/_trimmedEndIndex.js":
/*!****************************************************!*\
  !*** ./node_modules/lodash-es/_trimmedEndIndex.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (trimmedEndIndex);


/***/ }),

/***/ "./node_modules/lodash-es/debounce.js":
/*!********************************************!*\
  !*** ./node_modules/lodash-es/debounce.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _isObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isObject.js */ "./node_modules/lodash-es/isObject.js");
/* harmony import */ var _now_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./now.js */ "./node_modules/lodash-es/now.js");
/* harmony import */ var _toNumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toNumber.js */ "./node_modules/lodash-es/toNumber.js");




/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = (0,_toNumber_js__WEBPACK_IMPORTED_MODULE_0__["default"])(wait) || 0;
  if ((0,_isObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax((0,_toNumber_js__WEBPACK_IMPORTED_MODULE_0__["default"])(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = (0,_now_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge((0,_now_js__WEBPACK_IMPORTED_MODULE_2__["default"])());
  }

  function debounced() {
    var time = (0,_now_js__WEBPACK_IMPORTED_MODULE_2__["default"])(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (debounce);


/***/ }),

/***/ "./node_modules/lodash-es/isObject.js":
/*!********************************************!*\
  !*** ./node_modules/lodash-es/isObject.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isObject);


/***/ }),

/***/ "./node_modules/lodash-es/isObjectLike.js":
/*!************************************************!*\
  !*** ./node_modules/lodash-es/isObjectLike.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isObjectLike);


/***/ }),

/***/ "./node_modules/lodash-es/isSymbol.js":
/*!********************************************!*\
  !*** ./node_modules/lodash-es/isSymbol.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseGetTag_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_baseGetTag.js */ "./node_modules/lodash-es/_baseGetTag.js");
/* harmony import */ var _isObjectLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isObjectLike.js */ "./node_modules/lodash-es/isObjectLike.js");



/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    ((0,_isObjectLike_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value) && (0,_baseGetTag_js__WEBPACK_IMPORTED_MODULE_1__["default"])(value) == symbolTag);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isSymbol);


/***/ }),

/***/ "./node_modules/lodash-es/now.js":
/*!***************************************!*\
  !*** ./node_modules/lodash-es/now.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _root_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_root.js */ "./node_modules/lodash-es/_root.js");


/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return _root_js__WEBPACK_IMPORTED_MODULE_0__["default"].Date.now();
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (now);


/***/ }),

/***/ "./node_modules/lodash-es/throttle.js":
/*!********************************************!*\
  !*** ./node_modules/lodash-es/throttle.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _debounce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./debounce.js */ "./node_modules/lodash-es/debounce.js");
/* harmony import */ var _isObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isObject.js */ "./node_modules/lodash-es/isObject.js");



/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if ((0,_isObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return (0,_debounce_js__WEBPACK_IMPORTED_MODULE_1__["default"])(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (throttle);


/***/ }),

/***/ "./node_modules/lodash-es/toNumber.js":
/*!********************************************!*\
  !*** ./node_modules/lodash-es/toNumber.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseTrim_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_baseTrim.js */ "./node_modules/lodash-es/_baseTrim.js");
/* harmony import */ var _isObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isObject.js */ "./node_modules/lodash-es/isObject.js");
/* harmony import */ var _isSymbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isSymbol.js */ "./node_modules/lodash-es/isSymbol.js");




/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if ((0,_isSymbol_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value)) {
    return NAN;
  }
  if ((0,_isObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = (0,_isObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = (0,_baseTrim_js__WEBPACK_IMPORTED_MODULE_2__["default"])(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toNumber);


/***/ }),

/***/ "./node_modules/simplebar-core/dist/index.mjs":
/*!****************************************************!*\
  !*** ./node_modules/simplebar-core/dist/index.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SimpleBarCore)
/* harmony export */ });
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash-es */ "./node_modules/lodash-es/throttle.js");
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash-es */ "./node_modules/lodash-es/debounce.js");
/* harmony import */ var can_use_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! can-use-dom */ "./node_modules/can-use-dom/index.js");
/**
 * simplebar-core - v1.2.4
 * Scrollbars, simpler.
 * https://grsmto.github.io/simplebar/
 *
 * Made by Adrien Denat from a fork by Jonathan Nicol
 * Under MIT License
 */




/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var cachedScrollbarWidth = null;
var cachedDevicePixelRatio = null;
if (can_use_dom__WEBPACK_IMPORTED_MODULE_0__) {
    window.addEventListener('resize', function () {
        if (cachedDevicePixelRatio !== window.devicePixelRatio) {
            cachedDevicePixelRatio = window.devicePixelRatio;
            cachedScrollbarWidth = null;
        }
    });
}
function scrollbarWidth() {
    if (cachedScrollbarWidth === null) {
        if (typeof document === 'undefined') {
            cachedScrollbarWidth = 0;
            return cachedScrollbarWidth;
        }
        var body = document.body;
        var box = document.createElement('div');
        box.classList.add('simplebar-hide-scrollbar');
        body.appendChild(box);
        var width = box.getBoundingClientRect().right;
        body.removeChild(box);
        cachedScrollbarWidth = width;
    }
    return cachedScrollbarWidth;
}

function getElementWindow$1(element) {
    if (!element ||
        !element.ownerDocument ||
        !element.ownerDocument.defaultView) {
        return window;
    }
    return element.ownerDocument.defaultView;
}
function getElementDocument$1(element) {
    if (!element || !element.ownerDocument) {
        return document;
    }
    return element.ownerDocument;
}
// Helper function to retrieve options from element attributes
var getOptions$1 = function (obj) {
    var initialObj = {};
    var options = Array.prototype.reduce.call(obj, function (acc, attribute) {
        var option = attribute.name.match(/data-simplebar-(.+)/);
        if (option) {
            var key = option[1].replace(/\W+(.)/g, function (_, chr) { return chr.toUpperCase(); });
            switch (attribute.value) {
                case 'true':
                    acc[key] = true;
                    break;
                case 'false':
                    acc[key] = false;
                    break;
                case undefined:
                    acc[key] = true;
                    break;
                default:
                    acc[key] = attribute.value;
            }
        }
        return acc;
    }, initialObj);
    return options;
};
function addClasses$1(el, classes) {
    var _a;
    if (!el)
        return;
    (_a = el.classList).add.apply(_a, classes.split(' '));
}
function removeClasses$1(el, classes) {
    if (!el)
        return;
    classes.split(' ').forEach(function (className) {
        el.classList.remove(className);
    });
}
function classNamesToQuery$1(classNames) {
    return ".".concat(classNames.split(' ').join('.'));
}

var helpers = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getElementWindow: getElementWindow$1,
    getElementDocument: getElementDocument$1,
    getOptions: getOptions$1,
    addClasses: addClasses$1,
    removeClasses: removeClasses$1,
    classNamesToQuery: classNamesToQuery$1
});

var getElementWindow = getElementWindow$1, getElementDocument = getElementDocument$1, getOptions = getOptions$1, addClasses = addClasses$1, removeClasses = removeClasses$1, classNamesToQuery = classNamesToQuery$1;
var SimpleBarCore = /** @class */ (function () {
    function SimpleBarCore(element, options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.removePreventClickId = null;
        this.minScrollbarWidth = 20;
        this.stopScrollDelay = 175;
        this.isScrolling = false;
        this.isMouseEntering = false;
        this.scrollXTicking = false;
        this.scrollYTicking = false;
        this.wrapperEl = null;
        this.contentWrapperEl = null;
        this.contentEl = null;
        this.offsetEl = null;
        this.maskEl = null;
        this.placeholderEl = null;
        this.heightAutoObserverWrapperEl = null;
        this.heightAutoObserverEl = null;
        this.rtlHelpers = null;
        this.scrollbarWidth = 0;
        this.resizeObserver = null;
        this.mutationObserver = null;
        this.elStyles = null;
        this.isRtl = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.onMouseMove = function () { };
        this.onWindowResize = function () { };
        this.onStopScrolling = function () { };
        this.onMouseEntered = function () { };
        /**
         * On scroll event handling
         */
        this.onScroll = function () {
            var elWindow = getElementWindow(_this.el);
            if (!_this.scrollXTicking) {
                elWindow.requestAnimationFrame(_this.scrollX);
                _this.scrollXTicking = true;
            }
            if (!_this.scrollYTicking) {
                elWindow.requestAnimationFrame(_this.scrollY);
                _this.scrollYTicking = true;
            }
            if (!_this.isScrolling) {
                _this.isScrolling = true;
                addClasses(_this.el, _this.classNames.scrolling);
            }
            _this.showScrollbar('x');
            _this.showScrollbar('y');
            _this.onStopScrolling();
        };
        this.scrollX = function () {
            if (_this.axis.x.isOverflowing) {
                _this.positionScrollbar('x');
            }
            _this.scrollXTicking = false;
        };
        this.scrollY = function () {
            if (_this.axis.y.isOverflowing) {
                _this.positionScrollbar('y');
            }
            _this.scrollYTicking = false;
        };
        this._onStopScrolling = function () {
            removeClasses(_this.el, _this.classNames.scrolling);
            if (_this.options.autoHide) {
                _this.hideScrollbar('x');
                _this.hideScrollbar('y');
            }
            _this.isScrolling = false;
        };
        this.onMouseEnter = function () {
            if (!_this.isMouseEntering) {
                addClasses(_this.el, _this.classNames.mouseEntered);
                _this.showScrollbar('x');
                _this.showScrollbar('y');
                _this.isMouseEntering = true;
            }
            _this.onMouseEntered();
        };
        this._onMouseEntered = function () {
            removeClasses(_this.el, _this.classNames.mouseEntered);
            if (_this.options.autoHide) {
                _this.hideScrollbar('x');
                _this.hideScrollbar('y');
            }
            _this.isMouseEntering = false;
        };
        this._onMouseMove = function (e) {
            _this.mouseX = e.clientX;
            _this.mouseY = e.clientY;
            if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
                _this.onMouseMoveForAxis('x');
            }
            if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
                _this.onMouseMoveForAxis('y');
            }
        };
        this.onMouseLeave = function () {
            _this.onMouseMove.cancel();
            if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
                _this.onMouseLeaveForAxis('x');
            }
            if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
                _this.onMouseLeaveForAxis('y');
            }
            _this.mouseX = -1;
            _this.mouseY = -1;
        };
        this._onWindowResize = function () {
            // Recalculate scrollbarWidth in case it's a zoom
            _this.scrollbarWidth = _this.getScrollbarWidth();
            _this.hideNativeScrollbar();
        };
        this.onPointerEvent = function (e) {
            if (!_this.axis.x.track.el ||
                !_this.axis.y.track.el ||
                !_this.axis.x.scrollbar.el ||
                !_this.axis.y.scrollbar.el)
                return;
            var isWithinTrackXBounds, isWithinTrackYBounds;
            _this.axis.x.track.rect = _this.axis.x.track.el.getBoundingClientRect();
            _this.axis.y.track.rect = _this.axis.y.track.el.getBoundingClientRect();
            if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
                isWithinTrackXBounds = _this.isWithinBounds(_this.axis.x.track.rect);
            }
            if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
                isWithinTrackYBounds = _this.isWithinBounds(_this.axis.y.track.rect);
            }
            // If any pointer event is called on the scrollbar
            if (isWithinTrackXBounds || isWithinTrackYBounds) {
                // Prevent event leaking
                e.stopPropagation();
                if (e.type === 'pointerdown' && e.pointerType !== 'touch') {
                    if (isWithinTrackXBounds) {
                        _this.axis.x.scrollbar.rect =
                            _this.axis.x.scrollbar.el.getBoundingClientRect();
                        if (_this.isWithinBounds(_this.axis.x.scrollbar.rect)) {
                            _this.onDragStart(e, 'x');
                        }
                        else {
                            _this.onTrackClick(e, 'x');
                        }
                    }
                    if (isWithinTrackYBounds) {
                        _this.axis.y.scrollbar.rect =
                            _this.axis.y.scrollbar.el.getBoundingClientRect();
                        if (_this.isWithinBounds(_this.axis.y.scrollbar.rect)) {
                            _this.onDragStart(e, 'y');
                        }
                        else {
                            _this.onTrackClick(e, 'y');
                        }
                    }
                }
            }
        };
        /**
         * Drag scrollbar handle
         */
        this.drag = function (e) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            if (!_this.draggedAxis || !_this.contentWrapperEl)
                return;
            var eventOffset;
            var track = _this.axis[_this.draggedAxis].track;
            var trackSize = (_b = (_a = track.rect) === null || _a === void 0 ? void 0 : _a[_this.axis[_this.draggedAxis].sizeAttr]) !== null && _b !== void 0 ? _b : 0;
            var scrollbar = _this.axis[_this.draggedAxis].scrollbar;
            var contentSize = (_d = (_c = _this.contentWrapperEl) === null || _c === void 0 ? void 0 : _c[_this.axis[_this.draggedAxis].scrollSizeAttr]) !== null && _d !== void 0 ? _d : 0;
            var hostSize = parseInt((_f = (_e = _this.elStyles) === null || _e === void 0 ? void 0 : _e[_this.axis[_this.draggedAxis].sizeAttr]) !== null && _f !== void 0 ? _f : '0px', 10);
            e.preventDefault();
            e.stopPropagation();
            if (_this.draggedAxis === 'y') {
                eventOffset = e.pageY;
            }
            else {
                eventOffset = e.pageX;
            }
            // Calculate how far the user's mouse is from the top/left of the scrollbar (minus the dragOffset).
            var dragPos = eventOffset -
                ((_h = (_g = track.rect) === null || _g === void 0 ? void 0 : _g[_this.axis[_this.draggedAxis].offsetAttr]) !== null && _h !== void 0 ? _h : 0) -
                _this.axis[_this.draggedAxis].dragOffset;
            dragPos = _this.draggedAxis === 'x' && _this.isRtl
                ? ((_k = (_j = track.rect) === null || _j === void 0 ? void 0 : _j[_this.axis[_this.draggedAxis].sizeAttr]) !== null && _k !== void 0 ? _k : 0) -
                    scrollbar.size -
                    dragPos
                : dragPos;
            // Convert the mouse position into a percentage of the scrollbar height/width.
            var dragPerc = dragPos / (trackSize - scrollbar.size);
            // Scroll the content by the same percentage.
            var scrollPos = dragPerc * (contentSize - hostSize);
            // Fix browsers inconsistency on RTL
            if (_this.draggedAxis === 'x' && _this.isRtl) {
                scrollPos = ((_l = SimpleBarCore.getRtlHelpers()) === null || _l === void 0 ? void 0 : _l.isScrollingToNegative)
                    ? -scrollPos
                    : scrollPos;
            }
            _this.contentWrapperEl[_this.axis[_this.draggedAxis].scrollOffsetAttr] =
                scrollPos;
        };
        /**
         * End scroll handle drag
         */
        this.onEndDrag = function (e) {
            var elDocument = getElementDocument(_this.el);
            var elWindow = getElementWindow(_this.el);
            e.preventDefault();
            e.stopPropagation();
            removeClasses(_this.el, _this.classNames.dragging);
            elDocument.removeEventListener('mousemove', _this.drag, true);
            elDocument.removeEventListener('mouseup', _this.onEndDrag, true);
            _this.removePreventClickId = elWindow.setTimeout(function () {
                // Remove these asynchronously so we still suppress click events
                // generated simultaneously with mouseup.
                elDocument.removeEventListener('click', _this.preventClick, true);
                elDocument.removeEventListener('dblclick', _this.preventClick, true);
                _this.removePreventClickId = null;
            });
        };
        /**
         * Handler to ignore click events during drag
         */
        this.preventClick = function (e) {
            e.preventDefault();
            e.stopPropagation();
        };
        this.el = element;
        this.options = __assign(__assign({}, SimpleBarCore.defaultOptions), options);
        this.classNames = __assign(__assign({}, SimpleBarCore.defaultOptions.classNames), options.classNames);
        this.axis = {
            x: {
                scrollOffsetAttr: 'scrollLeft',
                sizeAttr: 'width',
                scrollSizeAttr: 'scrollWidth',
                offsetSizeAttr: 'offsetWidth',
                offsetAttr: 'left',
                overflowAttr: 'overflowX',
                dragOffset: 0,
                isOverflowing: true,
                forceVisible: false,
                track: { size: null, el: null, rect: null, isVisible: false },
                scrollbar: { size: null, el: null, rect: null, isVisible: false }
            },
            y: {
                scrollOffsetAttr: 'scrollTop',
                sizeAttr: 'height',
                scrollSizeAttr: 'scrollHeight',
                offsetSizeAttr: 'offsetHeight',
                offsetAttr: 'top',
                overflowAttr: 'overflowY',
                dragOffset: 0,
                isOverflowing: true,
                forceVisible: false,
                track: { size: null, el: null, rect: null, isVisible: false },
                scrollbar: { size: null, el: null, rect: null, isVisible: false }
            }
        };
        if (typeof this.el !== 'object' || !this.el.nodeName) {
            throw new Error("Argument passed to SimpleBar must be an HTML element instead of ".concat(this.el));
        }
        this.onMouseMove = (0,lodash_es__WEBPACK_IMPORTED_MODULE_1__["default"])(this._onMouseMove, 64);
        this.onWindowResize = (0,lodash_es__WEBPACK_IMPORTED_MODULE_2__["default"])(this._onWindowResize, 64, { leading: true });
        this.onStopScrolling = (0,lodash_es__WEBPACK_IMPORTED_MODULE_2__["default"])(this._onStopScrolling, this.stopScrollDelay);
        this.onMouseEntered = (0,lodash_es__WEBPACK_IMPORTED_MODULE_2__["default"])(this._onMouseEntered, this.stopScrollDelay);
        this.init();
    }
    /**
     * Helper to fix browsers inconsistency on RTL:
     *  - Firefox inverts the scrollbar initial position
     *  - IE11 inverts both scrollbar position and scrolling offset
     * Directly inspired by @KingSora's OverlayScrollbars https://github.com/KingSora/OverlayScrollbars/blob/master/js/OverlayScrollbars.js#L1634
     */
    SimpleBarCore.getRtlHelpers = function () {
        if (SimpleBarCore.rtlHelpers) {
            return SimpleBarCore.rtlHelpers;
        }
        var dummyDiv = document.createElement('div');
        dummyDiv.innerHTML =
            '<div class="simplebar-dummy-scrollbar-size"><div></div></div>';
        var scrollbarDummyEl = dummyDiv.firstElementChild;
        var dummyChild = scrollbarDummyEl === null || scrollbarDummyEl === void 0 ? void 0 : scrollbarDummyEl.firstElementChild;
        if (!dummyChild)
            return null;
        document.body.appendChild(scrollbarDummyEl);
        scrollbarDummyEl.scrollLeft = 0;
        var dummyContainerOffset = SimpleBarCore.getOffset(scrollbarDummyEl);
        var dummyChildOffset = SimpleBarCore.getOffset(dummyChild);
        scrollbarDummyEl.scrollLeft = -999;
        var dummyChildOffsetAfterScroll = SimpleBarCore.getOffset(dummyChild);
        document.body.removeChild(scrollbarDummyEl);
        SimpleBarCore.rtlHelpers = {
            // determines if the scrolling is responding with negative values
            isScrollOriginAtZero: dummyContainerOffset.left !== dummyChildOffset.left,
            // determines if the origin scrollbar position is inverted or not (positioned on left or right)
            isScrollingToNegative: dummyChildOffset.left !== dummyChildOffsetAfterScroll.left
        };
        return SimpleBarCore.rtlHelpers;
    };
    SimpleBarCore.prototype.getScrollbarWidth = function () {
        // Try/catch for FF 56 throwing on undefined computedStyles
        try {
            // Detect browsers supporting CSS scrollbar styling and do not calculate
            if ((this.contentWrapperEl &&
                getComputedStyle(this.contentWrapperEl, '::-webkit-scrollbar')
                    .display === 'none') ||
                'scrollbarWidth' in document.documentElement.style ||
                '-ms-overflow-style' in document.documentElement.style) {
                return 0;
            }
            else {
                return scrollbarWidth();
            }
        }
        catch (e) {
            return scrollbarWidth();
        }
    };
    SimpleBarCore.getOffset = function (el) {
        var rect = el.getBoundingClientRect();
        var elDocument = getElementDocument(el);
        var elWindow = getElementWindow(el);
        return {
            top: rect.top +
                (elWindow.pageYOffset || elDocument.documentElement.scrollTop),
            left: rect.left +
                (elWindow.pageXOffset || elDocument.documentElement.scrollLeft)
        };
    };
    SimpleBarCore.prototype.init = function () {
        // We stop here on server-side
        if (can_use_dom__WEBPACK_IMPORTED_MODULE_0__) {
            this.initDOM();
            this.rtlHelpers = SimpleBarCore.getRtlHelpers();
            this.scrollbarWidth = this.getScrollbarWidth();
            this.recalculate();
            this.initListeners();
        }
    };
    SimpleBarCore.prototype.initDOM = function () {
        var _a, _b;
        // assume that element has his DOM already initiated
        this.wrapperEl = this.el.querySelector(classNamesToQuery(this.classNames.wrapper));
        this.contentWrapperEl =
            this.options.scrollableNode ||
                this.el.querySelector(classNamesToQuery(this.classNames.contentWrapper));
        this.contentEl =
            this.options.contentNode ||
                this.el.querySelector(classNamesToQuery(this.classNames.contentEl));
        this.offsetEl = this.el.querySelector(classNamesToQuery(this.classNames.offset));
        this.maskEl = this.el.querySelector(classNamesToQuery(this.classNames.mask));
        this.placeholderEl = this.findChild(this.wrapperEl, classNamesToQuery(this.classNames.placeholder));
        this.heightAutoObserverWrapperEl = this.el.querySelector(classNamesToQuery(this.classNames.heightAutoObserverWrapperEl));
        this.heightAutoObserverEl = this.el.querySelector(classNamesToQuery(this.classNames.heightAutoObserverEl));
        this.axis.x.track.el = this.findChild(this.el, "".concat(classNamesToQuery(this.classNames.track)).concat(classNamesToQuery(this.classNames.horizontal)));
        this.axis.y.track.el = this.findChild(this.el, "".concat(classNamesToQuery(this.classNames.track)).concat(classNamesToQuery(this.classNames.vertical)));
        this.axis.x.scrollbar.el =
            ((_a = this.axis.x.track.el) === null || _a === void 0 ? void 0 : _a.querySelector(classNamesToQuery(this.classNames.scrollbar))) || null;
        this.axis.y.scrollbar.el =
            ((_b = this.axis.y.track.el) === null || _b === void 0 ? void 0 : _b.querySelector(classNamesToQuery(this.classNames.scrollbar))) || null;
        if (!this.options.autoHide) {
            addClasses(this.axis.x.scrollbar.el, this.classNames.visible);
            addClasses(this.axis.y.scrollbar.el, this.classNames.visible);
        }
    };
    SimpleBarCore.prototype.initListeners = function () {
        var _this = this;
        var _a;
        var elWindow = getElementWindow(this.el);
        // Event listeners
        this.el.addEventListener('mouseenter', this.onMouseEnter);
        this.el.addEventListener('pointerdown', this.onPointerEvent, true);
        this.el.addEventListener('mousemove', this.onMouseMove);
        this.el.addEventListener('mouseleave', this.onMouseLeave);
        (_a = this.contentWrapperEl) === null || _a === void 0 ? void 0 : _a.addEventListener('scroll', this.onScroll);
        // Browser zoom triggers a window resize
        elWindow.addEventListener('resize', this.onWindowResize);
        if (!this.contentEl)
            return;
        if (window.ResizeObserver) {
            // Hack for https://github.com/WICG/ResizeObserver/issues/38
            var resizeObserverStarted_1 = false;
            var resizeObserver = elWindow.ResizeObserver || ResizeObserver;
            this.resizeObserver = new resizeObserver(function () {
                if (!resizeObserverStarted_1)
                    return;
                elWindow.requestAnimationFrame(function () {
                    _this.recalculate();
                });
            });
            this.resizeObserver.observe(this.el);
            this.resizeObserver.observe(this.contentEl);
            elWindow.requestAnimationFrame(function () {
                resizeObserverStarted_1 = true;
            });
        }
        // This is required to detect horizontal scroll. Vertical scroll only needs the resizeObserver.
        this.mutationObserver = new elWindow.MutationObserver(function () {
            elWindow.requestAnimationFrame(function () {
                _this.recalculate();
            });
        });
        this.mutationObserver.observe(this.contentEl, {
            childList: true,
            subtree: true,
            characterData: true
        });
    };
    SimpleBarCore.prototype.recalculate = function () {
        if (!this.heightAutoObserverEl ||
            !this.contentEl ||
            !this.contentWrapperEl ||
            !this.wrapperEl ||
            !this.placeholderEl)
            return;
        var elWindow = getElementWindow(this.el);
        this.elStyles = elWindow.getComputedStyle(this.el);
        this.isRtl = this.elStyles.direction === 'rtl';
        var contentElOffsetWidth = this.contentEl.offsetWidth;
        var isHeightAuto = this.heightAutoObserverEl.offsetHeight <= 1;
        var isWidthAuto = this.heightAutoObserverEl.offsetWidth <= 1 || contentElOffsetWidth > 0;
        var contentWrapperElOffsetWidth = this.contentWrapperEl.offsetWidth;
        var elOverflowX = this.elStyles.overflowX;
        var elOverflowY = this.elStyles.overflowY;
        this.contentEl.style.padding = "".concat(this.elStyles.paddingTop, " ").concat(this.elStyles.paddingRight, " ").concat(this.elStyles.paddingBottom, " ").concat(this.elStyles.paddingLeft);
        this.wrapperEl.style.margin = "-".concat(this.elStyles.paddingTop, " -").concat(this.elStyles.paddingRight, " -").concat(this.elStyles.paddingBottom, " -").concat(this.elStyles.paddingLeft);
        var contentElScrollHeight = this.contentEl.scrollHeight;
        var contentElScrollWidth = this.contentEl.scrollWidth;
        this.contentWrapperEl.style.height = isHeightAuto ? 'auto' : '100%';
        // Determine placeholder size
        this.placeholderEl.style.width = isWidthAuto
            ? "".concat(contentElOffsetWidth || contentElScrollWidth, "px")
            : 'auto';
        this.placeholderEl.style.height = "".concat(contentElScrollHeight, "px");
        var contentWrapperElOffsetHeight = this.contentWrapperEl.offsetHeight;
        this.axis.x.isOverflowing =
            contentElOffsetWidth !== 0 && contentElScrollWidth > contentElOffsetWidth;
        this.axis.y.isOverflowing =
            contentElScrollHeight > contentWrapperElOffsetHeight;
        // Set isOverflowing to false if user explicitely set hidden overflow
        this.axis.x.isOverflowing =
            elOverflowX === 'hidden' ? false : this.axis.x.isOverflowing;
        this.axis.y.isOverflowing =
            elOverflowY === 'hidden' ? false : this.axis.y.isOverflowing;
        this.axis.x.forceVisible =
            this.options.forceVisible === 'x' || this.options.forceVisible === true;
        this.axis.y.forceVisible =
            this.options.forceVisible === 'y' || this.options.forceVisible === true;
        this.hideNativeScrollbar();
        // Set isOverflowing to false if scrollbar is not necessary (content is shorter than offset)
        var offsetForXScrollbar = this.axis.x.isOverflowing
            ? this.scrollbarWidth
            : 0;
        var offsetForYScrollbar = this.axis.y.isOverflowing
            ? this.scrollbarWidth
            : 0;
        this.axis.x.isOverflowing =
            this.axis.x.isOverflowing &&
                contentElScrollWidth > contentWrapperElOffsetWidth - offsetForYScrollbar;
        this.axis.y.isOverflowing =
            this.axis.y.isOverflowing &&
                contentElScrollHeight >
                    contentWrapperElOffsetHeight - offsetForXScrollbar;
        this.axis.x.scrollbar.size = this.getScrollbarSize('x');
        this.axis.y.scrollbar.size = this.getScrollbarSize('y');
        if (this.axis.x.scrollbar.el)
            this.axis.x.scrollbar.el.style.width = "".concat(this.axis.x.scrollbar.size, "px");
        if (this.axis.y.scrollbar.el)
            this.axis.y.scrollbar.el.style.height = "".concat(this.axis.y.scrollbar.size, "px");
        this.positionScrollbar('x');
        this.positionScrollbar('y');
        this.toggleTrackVisibility('x');
        this.toggleTrackVisibility('y');
    };
    /**
     * Calculate scrollbar size
     */
    SimpleBarCore.prototype.getScrollbarSize = function (axis) {
        var _a, _b;
        if (axis === void 0) { axis = 'y'; }
        if (!this.axis[axis].isOverflowing || !this.contentEl) {
            return 0;
        }
        var contentSize = this.contentEl[this.axis[axis].scrollSizeAttr];
        var trackSize = (_b = (_a = this.axis[axis].track.el) === null || _a === void 0 ? void 0 : _a[this.axis[axis].offsetSizeAttr]) !== null && _b !== void 0 ? _b : 0;
        var scrollbarRatio = trackSize / contentSize;
        var scrollbarSize;
        // Calculate new height/position of drag handle.
        scrollbarSize = Math.max(~~(scrollbarRatio * trackSize), this.options.scrollbarMinSize);
        if (this.options.scrollbarMaxSize) {
            scrollbarSize = Math.min(scrollbarSize, this.options.scrollbarMaxSize);
        }
        return scrollbarSize;
    };
    SimpleBarCore.prototype.positionScrollbar = function (axis) {
        var _a, _b, _c;
        if (axis === void 0) { axis = 'y'; }
        var scrollbar = this.axis[axis].scrollbar;
        if (!this.axis[axis].isOverflowing ||
            !this.contentWrapperEl ||
            !scrollbar.el ||
            !this.elStyles) {
            return;
        }
        var contentSize = this.contentWrapperEl[this.axis[axis].scrollSizeAttr];
        var trackSize = ((_a = this.axis[axis].track.el) === null || _a === void 0 ? void 0 : _a[this.axis[axis].offsetSizeAttr]) || 0;
        var hostSize = parseInt(this.elStyles[this.axis[axis].sizeAttr], 10);
        var scrollOffset = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
        scrollOffset =
            axis === 'x' &&
                this.isRtl &&
                ((_b = SimpleBarCore.getRtlHelpers()) === null || _b === void 0 ? void 0 : _b.isScrollOriginAtZero)
                ? -scrollOffset
                : scrollOffset;
        if (axis === 'x' && this.isRtl) {
            scrollOffset = ((_c = SimpleBarCore.getRtlHelpers()) === null || _c === void 0 ? void 0 : _c.isScrollingToNegative)
                ? scrollOffset
                : -scrollOffset;
        }
        var scrollPourcent = scrollOffset / (contentSize - hostSize);
        var handleOffset = ~~((trackSize - scrollbar.size) * scrollPourcent);
        handleOffset =
            axis === 'x' && this.isRtl
                ? -handleOffset + (trackSize - scrollbar.size)
                : handleOffset;
        scrollbar.el.style.transform =
            axis === 'x'
                ? "translate3d(".concat(handleOffset, "px, 0, 0)")
                : "translate3d(0, ".concat(handleOffset, "px, 0)");
    };
    SimpleBarCore.prototype.toggleTrackVisibility = function (axis) {
        if (axis === void 0) { axis = 'y'; }
        var track = this.axis[axis].track.el;
        var scrollbar = this.axis[axis].scrollbar.el;
        if (!track || !scrollbar || !this.contentWrapperEl)
            return;
        if (this.axis[axis].isOverflowing || this.axis[axis].forceVisible) {
            track.style.visibility = 'visible';
            this.contentWrapperEl.style[this.axis[axis].overflowAttr] = 'scroll';
            this.el.classList.add("".concat(this.classNames.scrollable, "-").concat(axis));
        }
        else {
            track.style.visibility = 'hidden';
            this.contentWrapperEl.style[this.axis[axis].overflowAttr] = 'hidden';
            this.el.classList.remove("".concat(this.classNames.scrollable, "-").concat(axis));
        }
        // Even if forceVisible is enabled, scrollbar itself should be hidden
        if (this.axis[axis].isOverflowing) {
            scrollbar.style.display = 'block';
        }
        else {
            scrollbar.style.display = 'none';
        }
    };
    SimpleBarCore.prototype.showScrollbar = function (axis) {
        if (axis === void 0) { axis = 'y'; }
        if (this.axis[axis].isOverflowing && !this.axis[axis].scrollbar.isVisible) {
            addClasses(this.axis[axis].scrollbar.el, this.classNames.visible);
            this.axis[axis].scrollbar.isVisible = true;
        }
    };
    SimpleBarCore.prototype.hideScrollbar = function (axis) {
        if (axis === void 0) { axis = 'y'; }
        if (this.axis[axis].isOverflowing && this.axis[axis].scrollbar.isVisible) {
            removeClasses(this.axis[axis].scrollbar.el, this.classNames.visible);
            this.axis[axis].scrollbar.isVisible = false;
        }
    };
    SimpleBarCore.prototype.hideNativeScrollbar = function () {
        if (!this.offsetEl)
            return;
        this.offsetEl.style[this.isRtl ? 'left' : 'right'] =
            this.axis.y.isOverflowing || this.axis.y.forceVisible
                ? "-".concat(this.scrollbarWidth, "px")
                : '0px';
        this.offsetEl.style.bottom =
            this.axis.x.isOverflowing || this.axis.x.forceVisible
                ? "-".concat(this.scrollbarWidth, "px")
                : '0px';
    };
    SimpleBarCore.prototype.onMouseMoveForAxis = function (axis) {
        if (axis === void 0) { axis = 'y'; }
        var currentAxis = this.axis[axis];
        if (!currentAxis.track.el || !currentAxis.scrollbar.el)
            return;
        currentAxis.track.rect = currentAxis.track.el.getBoundingClientRect();
        currentAxis.scrollbar.rect =
            currentAxis.scrollbar.el.getBoundingClientRect();
        if (this.isWithinBounds(currentAxis.track.rect)) {
            this.showScrollbar(axis);
            addClasses(currentAxis.track.el, this.classNames.hover);
            if (this.isWithinBounds(currentAxis.scrollbar.rect)) {
                addClasses(currentAxis.scrollbar.el, this.classNames.hover);
            }
            else {
                removeClasses(currentAxis.scrollbar.el, this.classNames.hover);
            }
        }
        else {
            removeClasses(currentAxis.track.el, this.classNames.hover);
            if (this.options.autoHide) {
                this.hideScrollbar(axis);
            }
        }
    };
    SimpleBarCore.prototype.onMouseLeaveForAxis = function (axis) {
        if (axis === void 0) { axis = 'y'; }
        removeClasses(this.axis[axis].track.el, this.classNames.hover);
        removeClasses(this.axis[axis].scrollbar.el, this.classNames.hover);
        if (this.options.autoHide) {
            this.hideScrollbar(axis);
        }
    };
    /**
     * on scrollbar handle drag movement starts
     */
    SimpleBarCore.prototype.onDragStart = function (e, axis) {
        var _a;
        if (axis === void 0) { axis = 'y'; }
        var elDocument = getElementDocument(this.el);
        var elWindow = getElementWindow(this.el);
        var scrollbar = this.axis[axis].scrollbar;
        // Measure how far the user's mouse is from the top of the scrollbar drag handle.
        var eventOffset = axis === 'y' ? e.pageY : e.pageX;
        this.axis[axis].dragOffset =
            eventOffset - (((_a = scrollbar.rect) === null || _a === void 0 ? void 0 : _a[this.axis[axis].offsetAttr]) || 0);
        this.draggedAxis = axis;
        addClasses(this.el, this.classNames.dragging);
        elDocument.addEventListener('mousemove', this.drag, true);
        elDocument.addEventListener('mouseup', this.onEndDrag, true);
        if (this.removePreventClickId === null) {
            elDocument.addEventListener('click', this.preventClick, true);
            elDocument.addEventListener('dblclick', this.preventClick, true);
        }
        else {
            elWindow.clearTimeout(this.removePreventClickId);
            this.removePreventClickId = null;
        }
    };
    SimpleBarCore.prototype.onTrackClick = function (e, axis) {
        var _this = this;
        var _a, _b, _c, _d;
        if (axis === void 0) { axis = 'y'; }
        var currentAxis = this.axis[axis];
        if (!this.options.clickOnTrack ||
            !currentAxis.scrollbar.el ||
            !this.contentWrapperEl)
            return;
        // Preventing the event's default to trigger click underneath
        e.preventDefault();
        var elWindow = getElementWindow(this.el);
        this.axis[axis].scrollbar.rect =
            currentAxis.scrollbar.el.getBoundingClientRect();
        var scrollbar = this.axis[axis].scrollbar;
        var scrollbarOffset = (_b = (_a = scrollbar.rect) === null || _a === void 0 ? void 0 : _a[this.axis[axis].offsetAttr]) !== null && _b !== void 0 ? _b : 0;
        var hostSize = parseInt((_d = (_c = this.elStyles) === null || _c === void 0 ? void 0 : _c[this.axis[axis].sizeAttr]) !== null && _d !== void 0 ? _d : '0px', 10);
        var scrolled = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
        var t = axis === 'y'
            ? this.mouseY - scrollbarOffset
            : this.mouseX - scrollbarOffset;
        var dir = t < 0 ? -1 : 1;
        var scrollSize = dir === -1 ? scrolled - hostSize : scrolled + hostSize;
        var speed = 40;
        var scrollTo = function () {
            if (!_this.contentWrapperEl)
                return;
            if (dir === -1) {
                if (scrolled > scrollSize) {
                    scrolled -= speed;
                    _this.contentWrapperEl[_this.axis[axis].scrollOffsetAttr] = scrolled;
                    elWindow.requestAnimationFrame(scrollTo);
                }
            }
            else {
                if (scrolled < scrollSize) {
                    scrolled += speed;
                    _this.contentWrapperEl[_this.axis[axis].scrollOffsetAttr] = scrolled;
                    elWindow.requestAnimationFrame(scrollTo);
                }
            }
        };
        scrollTo();
    };
    /**
     * Getter for content element
     */
    SimpleBarCore.prototype.getContentElement = function () {
        return this.contentEl;
    };
    /**
     * Getter for original scrolling element
     */
    SimpleBarCore.prototype.getScrollElement = function () {
        return this.contentWrapperEl;
    };
    SimpleBarCore.prototype.removeListeners = function () {
        var elWindow = getElementWindow(this.el);
        // Event listeners
        this.el.removeEventListener('mouseenter', this.onMouseEnter);
        this.el.removeEventListener('pointerdown', this.onPointerEvent, true);
        this.el.removeEventListener('mousemove', this.onMouseMove);
        this.el.removeEventListener('mouseleave', this.onMouseLeave);
        if (this.contentWrapperEl) {
            this.contentWrapperEl.removeEventListener('scroll', this.onScroll);
        }
        elWindow.removeEventListener('resize', this.onWindowResize);
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
        }
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        // Cancel all debounced functions
        this.onMouseMove.cancel();
        this.onWindowResize.cancel();
        this.onStopScrolling.cancel();
        this.onMouseEntered.cancel();
    };
    /**
     * Remove all listeners from DOM nodes
     */
    SimpleBarCore.prototype.unMount = function () {
        this.removeListeners();
    };
    /**
     * Check if mouse is within bounds
     */
    SimpleBarCore.prototype.isWithinBounds = function (bbox) {
        return (this.mouseX >= bbox.left &&
            this.mouseX <= bbox.left + bbox.width &&
            this.mouseY >= bbox.top &&
            this.mouseY <= bbox.top + bbox.height);
    };
    /**
     * Find element children matches query
     */
    SimpleBarCore.prototype.findChild = function (el, query) {
        var matches = el.matches ||
            el.webkitMatchesSelector ||
            el.mozMatchesSelector ||
            el.msMatchesSelector;
        return Array.prototype.filter.call(el.children, function (child) {
            return matches.call(child, query);
        })[0];
    };
    SimpleBarCore.rtlHelpers = null;
    SimpleBarCore.defaultOptions = {
        forceVisible: false,
        clickOnTrack: true,
        scrollbarMinSize: 25,
        scrollbarMaxSize: 0,
        ariaLabel: 'scrollable content',
        classNames: {
            contentEl: 'simplebar-content',
            contentWrapper: 'simplebar-content-wrapper',
            offset: 'simplebar-offset',
            mask: 'simplebar-mask',
            wrapper: 'simplebar-wrapper',
            placeholder: 'simplebar-placeholder',
            scrollbar: 'simplebar-scrollbar',
            track: 'simplebar-track',
            heightAutoObserverWrapperEl: 'simplebar-height-auto-observer-wrapper',
            heightAutoObserverEl: 'simplebar-height-auto-observer',
            visible: 'simplebar-visible',
            horizontal: 'simplebar-horizontal',
            vertical: 'simplebar-vertical',
            hover: 'simplebar-hover',
            dragging: 'simplebar-dragging',
            scrolling: 'simplebar-scrolling',
            scrollable: 'simplebar-scrollable',
            mouseEntered: 'simplebar-mouse-entered'
        },
        scrollableNode: null,
        contentNode: null,
        autoHide: true
    };
    /**
     * Static functions
     */
    SimpleBarCore.getOptions = getOptions;
    SimpleBarCore.helpers = helpers;
    return SimpleBarCore;
}());


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "./node_modules/simplebar/dist/index.mjs":
/*!***********************************************!*\
  !*** ./node_modules/simplebar/dist/index.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SimpleBar)
/* harmony export */ });
/* harmony import */ var can_use_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! can-use-dom */ "./node_modules/can-use-dom/index.js");
/* harmony import */ var simplebar_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! simplebar-core */ "./node_modules/simplebar-core/dist/index.mjs");
/**
 * simplebar - v6.2.5
 * Scrollbars, simpler.
 * https://grsmto.github.io/simplebar/
 *
 * Made by Adrien Denat from a fork by Jonathan Nicol
 * Under MIT License
 */




/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var _a = simplebar_core__WEBPACK_IMPORTED_MODULE_1__["default"].helpers, getOptions = _a.getOptions, addClasses = _a.addClasses;
var SimpleBar = /** @class */ (function (_super) {
    __extends(SimpleBar, _super);
    function SimpleBar() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        // // Save a reference to the instance, so we know this DOM node has already been instancied
        SimpleBar.instances.set(args[0], _this);
        return _this;
    }
    SimpleBar.initDOMLoadedElements = function () {
        document.removeEventListener('DOMContentLoaded', this.initDOMLoadedElements);
        window.removeEventListener('load', this.initDOMLoadedElements);
        Array.prototype.forEach.call(document.querySelectorAll('[data-simplebar]'), function (el) {
            if (el.getAttribute('data-simplebar') !== 'init' &&
                !SimpleBar.instances.has(el))
                new SimpleBar(el, getOptions(el.attributes));
        });
    };
    SimpleBar.removeObserver = function () {
        var _a;
        (_a = SimpleBar.globalObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    };
    SimpleBar.prototype.initDOM = function () {
        var _this = this;
        var _a, _b, _c;
        // make sure this element doesn't have the elements yet
        if (!Array.prototype.filter.call(this.el.children, function (child) {
            return child.classList.contains(_this.classNames.wrapper);
        }).length) {
            // Prepare DOM
            this.wrapperEl = document.createElement('div');
            this.contentWrapperEl = document.createElement('div');
            this.offsetEl = document.createElement('div');
            this.maskEl = document.createElement('div');
            this.contentEl = document.createElement('div');
            this.placeholderEl = document.createElement('div');
            this.heightAutoObserverWrapperEl = document.createElement('div');
            this.heightAutoObserverEl = document.createElement('div');
            addClasses(this.wrapperEl, this.classNames.wrapper);
            addClasses(this.contentWrapperEl, this.classNames.contentWrapper);
            addClasses(this.offsetEl, this.classNames.offset);
            addClasses(this.maskEl, this.classNames.mask);
            addClasses(this.contentEl, this.classNames.contentEl);
            addClasses(this.placeholderEl, this.classNames.placeholder);
            addClasses(this.heightAutoObserverWrapperEl, this.classNames.heightAutoObserverWrapperEl);
            addClasses(this.heightAutoObserverEl, this.classNames.heightAutoObserverEl);
            while (this.el.firstChild) {
                this.contentEl.appendChild(this.el.firstChild);
            }
            this.contentWrapperEl.appendChild(this.contentEl);
            this.offsetEl.appendChild(this.contentWrapperEl);
            this.maskEl.appendChild(this.offsetEl);
            this.heightAutoObserverWrapperEl.appendChild(this.heightAutoObserverEl);
            this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl);
            this.wrapperEl.appendChild(this.maskEl);
            this.wrapperEl.appendChild(this.placeholderEl);
            this.el.appendChild(this.wrapperEl);
            (_a = this.contentWrapperEl) === null || _a === void 0 ? void 0 : _a.setAttribute('tabindex', '0');
            (_b = this.contentWrapperEl) === null || _b === void 0 ? void 0 : _b.setAttribute('role', 'region');
            (_c = this.contentWrapperEl) === null || _c === void 0 ? void 0 : _c.setAttribute('aria-label', this.options.ariaLabel);
        }
        if (!this.axis.x.track.el || !this.axis.y.track.el) {
            var track = document.createElement('div');
            var scrollbar = document.createElement('div');
            addClasses(track, this.classNames.track);
            addClasses(scrollbar, this.classNames.scrollbar);
            track.appendChild(scrollbar);
            this.axis.x.track.el = track.cloneNode(true);
            addClasses(this.axis.x.track.el, this.classNames.horizontal);
            this.axis.y.track.el = track.cloneNode(true);
            addClasses(this.axis.y.track.el, this.classNames.vertical);
            this.el.appendChild(this.axis.x.track.el);
            this.el.appendChild(this.axis.y.track.el);
        }
        simplebar_core__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.initDOM.call(this);
        this.el.setAttribute('data-simplebar', 'init');
    };
    SimpleBar.prototype.unMount = function () {
        simplebar_core__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.unMount.call(this);
        SimpleBar.instances["delete"](this.el);
    };
    SimpleBar.initHtmlApi = function () {
        this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this);
        // MutationObserver is IE11+
        if (typeof MutationObserver !== 'undefined') {
            // Mutation observer to observe dynamically added elements
            this.globalObserver = new MutationObserver(SimpleBar.handleMutations);
            this.globalObserver.observe(document, { childList: true, subtree: true });
        }
        // Taken from jQuery `ready` function
        // Instantiate elements already present on the page
        if (document.readyState === 'complete' || // @ts-ignore: IE specific
            (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
            // Handle it asynchronously to allow scripts the opportunity to delay init
            window.setTimeout(this.initDOMLoadedElements);
        }
        else {
            document.addEventListener('DOMContentLoaded', this.initDOMLoadedElements);
            window.addEventListener('load', this.initDOMLoadedElements);
        }
    };
    SimpleBar.handleMutations = function (mutations) {
        mutations.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (addedNode) {
                if (addedNode.nodeType === 1) {
                    if (addedNode.hasAttribute('data-simplebar')) {
                        !SimpleBar.instances.has(addedNode) &&
                            document.documentElement.contains(addedNode) &&
                            new SimpleBar(addedNode, getOptions(addedNode.attributes));
                    }
                    else {
                        addedNode
                            .querySelectorAll('[data-simplebar]')
                            .forEach(function (el) {
                            if (el.getAttribute('data-simplebar') !== 'init' &&
                                !SimpleBar.instances.has(el) &&
                                document.documentElement.contains(el))
                                new SimpleBar(el, getOptions(el.attributes));
                        });
                    }
                }
            });
            mutation.removedNodes.forEach(function (removedNode) {
                if (removedNode.nodeType === 1) {
                    if (removedNode.getAttribute('data-simplebar') === 'init') {
                        SimpleBar.instances.has(removedNode) &&
                            !document.documentElement.contains(removedNode) &&
                            SimpleBar.instances.get(removedNode).unMount();
                    }
                    else {
                        Array.prototype.forEach.call(removedNode.querySelectorAll('[data-simplebar="init"]'), function (el) {
                            SimpleBar.instances.has(el) &&
                                !document.documentElement.contains(el) &&
                                SimpleBar.instances.get(el).unMount();
                        });
                    }
                }
            });
        });
    };
    SimpleBar.instances = new WeakMap();
    return SimpleBar;
}(simplebar_core__WEBPACK_IMPORTED_MODULE_1__["default"]));
/**
 * HTML API
 * Called only in a browser env.
 */
if (can_use_dom__WEBPACK_IMPORTED_MODULE_0__) {
    SimpleBar.initHtmlApi();
}


//# sourceMappingURL=index.mjs.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/style.scss */ "./src/scss/style.scss");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/utils.js */ "./src/js/utils/utils.js");
/* harmony import */ var _utils_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/forms */ "./src/js/utils/forms.js");
/* harmony import */ var _utils_tabs_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/tabs.js */ "./src/js/utils/tabs.js");
/* harmony import */ var _utils_accordion_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/accordion.js */ "./src/js/utils/accordion.js");
/* harmony import */ var _utils_select_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/select.js */ "./src/js/utils/select.js");
/* harmony import */ var _utils_modals_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/modals.js */ "./src/js/utils/modals.js");
/* harmony import */ var _dev_vzmsk1_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dev/vzmsk1.js */ "./src/js/dev/vzmsk1.js");
/* harmony import */ var _dev_vzmsk1_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_dev_vzmsk1_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _dev_markusDM_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dev/markusDM.js */ "./src/js/dev/markusDM.js");
/* harmony import */ var _dev_markusDM_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_dev_markusDM_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _dev_ukik0_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dev/ukik0.js */ "./src/js/dev/ukik0.js");
/* harmony import */ var _dev_ukik0_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_dev_ukik0_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _dev_kie6er_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dev/kie6er.js */ "./src/js/dev/kie6er.js");
/* harmony import */ var _dev_kie6er_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_dev_kie6er_js__WEBPACK_IMPORTED_MODULE_10__);


// ---------------------------------- utils ---------------------------------



// hamburger menu
_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.menuInit();

// ------------------------------- components -------------------------------

// forms


// tabs


// accordion


// select


// modals


// --------------------------------------------------------------------------





})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsT0FBTyw0R0FBNEcsV0FBVyxXQUFXLFVBQVUsV0FBVyxXQUFXLFdBQVcsTUFBTSxLQUFLLFdBQVcsVUFBVSxVQUFVLFdBQVcsV0FBVyxNQUFNLEtBQUssV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLFVBQVUsTUFBTSxLQUFLLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxNQUFNLEtBQUssV0FBVyxXQUFXLFdBQVcsVUFBVSxxQkFBcUIsVUFBVSxxQkFBcUIsc0JBQXNCLFVBQVUsV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLFVBQVUsVUFBVSxNQUFNLE1BQU0sVUFBVSxVQUFVLE1BQU0sS0FBSyxXQUFXLFVBQVUsVUFBVSxXQUFXLE1BQU0sS0FBSyxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsVUFBVSxVQUFVLFdBQVcsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLFVBQVUsVUFBVSxNQUFNLEtBQUssV0FBVyxVQUFVLFVBQVUsV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsVUFBVSxNQUFNLEtBQUssVUFBVSxXQUFXLFVBQVUsVUFBVSxXQUFXLFdBQVcs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Q0EsNENBQTRDLG1CQUFPLENBQUMsc0hBQTBEO0FBQzlHLGtDQUFrQyxtQkFBTyxDQUFDLHdHQUFtRDtBQUM3RjtBQUNBLHVJQUF1STtBQUN2SSw0SUFBNEk7QUFDNUksdUlBQXVJO0FBQ3ZJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsT0FBTyw4VUFBOFUsV0FBVyxNQUFNLEtBQUssV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsTUFBTSxLQUFLLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLGFBQWEsT0FBTyxNQUFNLFdBQVcsV0FBVyxVQUFVLFVBQVUsV0FBVyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxNQUFNLFdBQVcsTUFBTSxRQUFRLFVBQVUsVUFBVSxVQUFVLEtBQUssUUFBUSxVQUFVLEtBQUssUUFBUSxVQUFVLE1BQU0sVUFBVSxVQUFVLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxXQUFXLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsV0FBVyxVQUFVLFdBQVcsTUFBTSxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFdBQVcsTUFBTSxLQUFLLFVBQVUsVUFBVSxNQUFNLE1BQU0sV0FBVyxVQUFVLE1BQU0sS0FBSyxXQUFXLE1BQU0sTUFBTSxVQUFVLFVBQVUsV0FBVyxLQUFLLE9BQU8sV0FBVyxXQUFXLE9BQU8sT0FBTyxXQUFXLE9BQU8sTUFBTSxXQUFXLE9BQU8sTUFBTSxVQUFVLFdBQVcsT0FBTyxNQUFNLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxXQUFXLE9BQU8sTUFBTSxXQUFXLE1BQU0sTUFBTSxXQUFXLE9BQU8sU0FBUyxXQUFXLFdBQVcsV0FBVyxPQUFPLE9BQU8sVUFBVSxPQUFPLE1BQU0sV0FBVyxVQUFVLFdBQVcsVUFBVSxNQUFNLE1BQU0sV0FBVyxVQUFVLFVBQVUsWUFBWSxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLFlBQVksTUFBTSxNQUFNLFdBQVcsVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsVUFBVSxVQUFVLFdBQVcsWUFBWSxNQUFNLE1BQU0sV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLE9BQU8sTUFBTSxVQUFVLFdBQVcsVUFBVSxNQUFNLE1BQU0sVUFBVSxPQUFPLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFVBQVUsV0FBVyxZQUFZLFdBQVcsTUFBTSxNQUFNLFdBQVcsVUFBVSxXQUFXLFVBQVUsVUFBVSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLE1BQU0sT0FBTyxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFdBQVcsVUFBVSxVQUFVLFVBQVUsV0FBVyxZQUFZLFlBQVksTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFVBQVUsVUFBVSxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsT0FBTyxNQUFNLFVBQVUsT0FBTyxNQUFNLFdBQVcsVUFBVSxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLFVBQVUsV0FBVyxXQUFXLFVBQVUsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLFVBQVUsVUFBVSxVQUFVLE1BQU0sTUFBTSxVQUFVLFVBQVUsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsT0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsT0FBTztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSSx3Q0FBUztBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUVBQXVFLDJCQUEyQjtBQUNsRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDLDhDQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLG9EQUFvRDtBQUM3RSw2QkFBNkI7QUFDN0IsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLG9EQUFvRDtBQUM3RSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixxREFBUTtBQUNuQyw4QkFBOEIscURBQVEsNkJBQTZCLGVBQWU7QUFDbEYsK0JBQStCLHFEQUFRO0FBQ3ZDLDhCQUE4QixxREFBUTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHdDQUFTO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Ozs7Ozs7Ozs7QUNBNEI7O0FBRTVCOztBQUUwQzs7QUFFMUM7QUFDQUUscURBQWMsQ0FBQyxDQUFDOztBQUVoQjs7QUFFQTtBQUN1Qjs7QUFFdkI7QUFDeUI7O0FBRXpCO0FBQzhCOztBQUU5QjtBQUMyQjs7QUFFM0I7QUFDMkI7O0FBRTNCOztBQUV5QjtBQUNFO0FBQ0giLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9zcmMvanMvbW9kdWxlcy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9zcmMvanMvdXRpbHMvYWNjb3JkaW9uLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL3NyYy9qcy91dGlscy9mb3Jtcy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9zcmMvanMvdXRpbHMvbW9kYWxzLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL3NyYy9qcy91dGlscy9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vc3JjL2pzL3V0aWxzL3RhYnMuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vc3JjL2pzL3V0aWxzL3V0aWxzLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9jYW4tdXNlLWRvbS9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvc2ltcGxlYmFyL2Rpc3Qvc2ltcGxlYmFyLmNzcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9zcmMvc2Nzcy9zdHlsZS5zY3NzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL3NpbXBsZWJhci9kaXN0L3NpbXBsZWJhci5jc3M/MWUwNSIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9zcmMvc2Nzcy9zdHlsZS5zY3NzPzZjMmQiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TeW1ib2wuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUdldFRhZy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlVHJpbS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19mcmVlR2xvYmFsLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFJhd1RhZy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19vYmplY3RUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19yb290LmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3RyaW1tZWRFbmRJbmRleC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2RlYm91bmNlLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNPYmplY3QuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc09iamVjdExpa2UuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc1N5bWJvbC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL25vdy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL3Rocm90dGxlLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvdG9OdW1iZXIuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL3NpbXBsZWJhci1jb3JlL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9zaW1wbGViYXIvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vc3JjL2pzL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgbW9kdWxlcyA9IHt9O1xuIiwiaW1wb3J0IHtcbiAgZGF0YU1lZGlhUXVlcmllcyxcbiAgX3NsaWRlVG9nZ2xlLFxuICBfc2xpZGVVcCxcbiAgX3NsaWRlRG93bixcbn0gZnJvbSAnLi91dGlscy5qcyc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmNsYXNzIEFjY29yZGlvbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYWNjb3JkaW9uSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1hY2NvcmRpb25dJyk7XG4gICAgdGhpcy5tZFF1ZXJpZXNBcnJheSA9IGRhdGFNZWRpYVF1ZXJpZXModGhpcy5hY2NvcmRpb25JdGVtcywgJ2FjY29yZGlvbicpO1xuICAgIHRoaXMucmVnSXRlbXMgPSBBcnJheS5mcm9tKHRoaXMuYWNjb3JkaW9uSXRlbXMpLmZpbHRlcihmdW5jdGlvbiAoXG4gICAgICBpdGVtLFxuICAgICAgaW5kZXgsXG4gICAgICBzZWxmXG4gICAgKSB7XG4gICAgICByZXR1cm4gIWl0ZW0uZGF0YXNldC5hY2NvcmRpb24uc3BsaXQoJywnKVswXTtcbiAgICB9KTtcbiAgICB0aGlzLmF0dHJzID0ge1xuICAgICAgQUNDT1JESU9OOiAnZGF0YS1hY2NvcmRpb24nLFxuICAgICAgSVRFTTogJ2RhdGEtYWNjb3JkaW9uLWl0ZW0nLFxuICAgICAgU0lOR0xFOiAnZGF0YS1hY2NvcmRpb24tc2luZ2xlJyxcbiAgICB9O1xuICAgIHRoaXMuY2xhc3NlcyA9IHtcbiAgICAgIElOSVQ6ICdfYWNjb3JkaW9uLWluaXQnLFxuICAgICAgQUNUSVZFOiAnX2lzLWFjdGl2ZScsXG4gICAgfTtcblxuICAgIC8vIGluaXQgcmVndWxhciBhY2NvcmRpb24gaXRlbXNcbiAgICBpZiAodGhpcy5yZWdJdGVtcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuaW5pdCh0aGlzLnJlZ0l0ZW1zKTtcbiAgICB9XG4gICAgLy8gaW5pdCBhY2NvcmRpb24gaXRlbXMgd2l0aCBtZWRpYSBxdWVyaWVzXG4gICAgaWYgKHRoaXMubWRRdWVyaWVzQXJyYXkgJiYgdGhpcy5tZFF1ZXJpZXNBcnJheS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IF90aGlzID0gdGhpcztcblxuICAgICAgdGhpcy5tZFF1ZXJpZXNBcnJheS5mb3JFYWNoKG1kUXVlcmllc0l0ZW0gPT4ge1xuICAgICAgICBtZFF1ZXJpZXNJdGVtLm1hdGNoTWVkaWEuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIF90aGlzLmluaXQobWRRdWVyaWVzSXRlbS5pdGVtc0FycmF5LCBtZFF1ZXJpZXNJdGVtLm1hdGNoTWVkaWEpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pbml0KG1kUXVlcmllc0l0ZW0uaXRlbXNBcnJheSwgbWRRdWVyaWVzSXRlbS5tYXRjaE1lZGlhKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhpZGVCb2R5KGFjY29yZGlvbkdyb3VwKSB7XG4gICAgY29uc3QgYWN0aXZlVGl0bGUgPSBhY2NvcmRpb25Hcm91cC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYFske3RoaXMuYXR0cnMuSVRFTX1dLiR7dGhpcy5jbGFzc2VzLkFDVElWRX1gXG4gICAgKTtcbiAgICBjb25zdCBzcGVlZCA9IGFjY29yZGlvbkdyb3VwLmRhdGFzZXQuYWNjb3JkaW9uU3BlZWRcbiAgICAgID8gcGFyc2VJbnQoYWNjb3JkaW9uR3JvdXAuZGF0YXNldC5hY2NvcmRpb25TcGVlZClcbiAgICAgIDogNTAwO1xuXG4gICAgaWYgKGFjdGl2ZVRpdGxlICYmICFhY2NvcmRpb25Hcm91cC5xdWVyeVNlbGVjdG9yQWxsKCcuX3NsaWRlJykubGVuZ3RoKSB7XG4gICAgICBhY3RpdmVUaXRsZS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5BQ1RJVkUpO1xuICAgICAgX3NsaWRlVXAoYWN0aXZlVGl0bGUubmV4dEVsZW1lbnRTaWJsaW5nLCBzcGVlZCk7XG4gICAgfVxuICB9XG5cbiAgc2V0QWN0aW9ucyhlKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG5cbiAgICBpZiAodGFyZ2V0LmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuSVRFTX1dYCkpIHtcbiAgICAgIGNvbnN0IHRpdGxlID0gdGFyZ2V0LmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuSVRFTX1dYCk7XG4gICAgICBjb25zdCBncm91cCA9IHRpdGxlLmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuQUNDT1JESU9OfV1gKTtcbiAgICAgIGNvbnN0IGlzU2luZ2xlID0gZ3JvdXAuaGFzQXR0cmlidXRlKHRoaXMuYXR0cnMuU0lOR0xFKTtcbiAgICAgIGNvbnN0IHNwZWVkID0gZ3JvdXAuZGF0YXNldC5hY2NvcmRpb25TcGVlZFxuICAgICAgICA/IHBhcnNlSW50KGdyb3VwLmRhdGFzZXQuYWNjb3JkaW9uU3BlZWQpXG4gICAgICAgIDogNTAwO1xuXG4gICAgICBpZiAoIWdyb3VwLnF1ZXJ5U2VsZWN0b3JBbGwoJy5fc2xpZGUnKS5sZW5ndGgpIHtcbiAgICAgICAgaWYgKGlzU2luZ2xlICYmICF0aXRsZS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5jbGFzc2VzLkFDVElWRSkpIHtcbiAgICAgICAgICB0aGlzLmhpZGVCb2R5KGdyb3VwKTtcbiAgICAgICAgfVxuICAgICAgICB0aXRsZS5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuY2xhc3Nlcy5BQ1RJVkUpO1xuICAgICAgICBfc2xpZGVUb2dnbGUodGl0bGUubmV4dEVsZW1lbnRTaWJsaW5nLCBzcGVlZCk7XG4gICAgICB9XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdEJvZHkoYWNjb3JkaW9uR3JvdXAsIGhpZGVCb2R5ID0gdHJ1ZSkge1xuICAgIGxldCB0aXRsZXMgPSBhY2NvcmRpb25Hcm91cC5xdWVyeVNlbGVjdG9yQWxsKGBbJHt0aGlzLmF0dHJzLklURU19XWApO1xuXG4gICAgaWYgKHRpdGxlcy5sZW5ndGgpIHtcbiAgICAgIHRpdGxlcyA9IEFycmF5LmZyb20odGl0bGVzKS5maWx0ZXIoXG4gICAgICAgIGl0ZW0gPT4gaXRlbS5jbG9zZXN0KGBbJHt0aGlzLmF0dHJzLkFDQ09SRElPTn1dYCkgPT09IGFjY29yZGlvbkdyb3VwXG4gICAgICApO1xuICAgICAgdGl0bGVzLmZvckVhY2godGl0bGUgPT4ge1xuICAgICAgICBpZiAoaGlkZUJvZHkpIHtcbiAgICAgICAgICB0aXRsZS5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG4gICAgICAgICAgaWYgKCF0aXRsZS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5jbGFzc2VzLkFDVElWRSkpIHtcbiAgICAgICAgICAgIHRpdGxlLm5leHRFbGVtZW50U2libGluZy5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aXRsZS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgICAgICAgdGl0bGUubmV4dEVsZW1lbnRTaWJsaW5nLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBpbml0KGFjY29yZGlvbkl0ZW1zLCBtYXRjaE1lZGlhID0gZmFsc2UpIHtcbiAgICBhY2NvcmRpb25JdGVtcy5mb3JFYWNoKGFjY29yZGlvbkdyb3VwID0+IHtcbiAgICAgIGFjY29yZGlvbkdyb3VwID0gbWF0Y2hNZWRpYSA/IGFjY29yZGlvbkdyb3VwLml0ZW0gOiBhY2NvcmRpb25Hcm91cDtcbiAgICAgIGlmIChtYXRjaE1lZGlhLm1hdGNoZXMgfHwgIW1hdGNoTWVkaWEpIHtcbiAgICAgICAgYWNjb3JkaW9uR3JvdXAuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzZXMuSU5JVCk7XG4gICAgICAgIHRoaXMuaW5pdEJvZHkoYWNjb3JkaW9uR3JvdXApO1xuICAgICAgICBhY2NvcmRpb25Hcm91cC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2V0QWN0aW9ucy5iaW5kKHRoaXMpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjY29yZGlvbkdyb3VwLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLklOSVQpO1xuICAgICAgICB0aGlzLmluaXRCb2R5KGFjY29yZGlvbkdyb3VwLCBmYWxzZSk7XG4gICAgICAgIGFjY29yZGlvbkdyb3VwLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zZXRBY3Rpb25zLmJpbmQodGhpcykpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm5ldyBBY2NvcmRpb24oKTtcbiIsImltcG9ydCB7IG1vZHVsZXMgfSBmcm9tICcuLi9tb2R1bGVzLmpzJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY2xhc3MgVmFsaWRhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYXR0cnMgPSB7XG4gICAgICBSRVFVSVJFRDogJ2RhdGEtcmVxdWlyZWQnLFxuICAgICAgSUdOT1JFX1ZBTElEQVRJT046ICdkYXRhLWlnbm9yZS12YWxpZGF0aW9uJyxcbiAgICAgIEFKQVg6ICdkYXRhLWFqYXgnLFxuICAgICAgREVWOiAnZGF0YS1kZXYnLFxuICAgICAgSUdOT1JFX0ZPQ1VTOiAnZGF0YS1pZ25vcmUtZm9jdXMnLFxuICAgICAgU0hPV19QTEFDRUhPTERFUjogJ2RhdGEtc2hvdy1wbGFjZWhvbGRlcicsXG4gICAgICBWQUxJREFURTogJ2RhdGEtdmFsaWRhdGUnLFxuICAgIH07XG4gICAgdGhpcy5jbGFzc2VzID0ge1xuICAgICAgSEFTX0VSUk9SOiAnX2hhcy1lcnJvcicsXG4gICAgICBIQVNfRk9DVVM6ICdfaGFzLWZvY3VzJyxcbiAgICB9O1xuICB9XG5cbiAgZ2V0RXJyb3JzKGZvcm0pIHtcbiAgICBsZXQgZXJyID0gMDtcbiAgICBsZXQgcmVxdWlyZWRGaWVsZHMgPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoYCpbJHt0aGlzLmF0dHJzLlJFUVVJUkVEfV1gKTtcblxuICAgIGlmIChyZXF1aXJlZEZpZWxkcy5sZW5ndGgpIHtcbiAgICAgIHJlcXVpcmVkRmllbGRzLmZvckVhY2gocmVxdWlyZWRGaWVsZCA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAocmVxdWlyZWRGaWVsZC5vZmZzZXRQYXJlbnQgIT09IG51bGwgfHxcbiAgICAgICAgICAgIHJlcXVpcmVkRmllbGQudGFnTmFtZSA9PT0gJ1NFTEVDVCcpICYmXG4gICAgICAgICAgIXJlcXVpcmVkRmllbGQuZGlzYWJsZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgZXJyICs9IHRoaXMudmFsaWRhdGVGaWVsZChyZXF1aXJlZEZpZWxkKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBlcnI7XG4gIH1cblxuICBhZGRFcnJvcihyZXF1aXJlZEZpZWxkKSB7XG4gICAgcmVxdWlyZWRGaWVsZC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5IQVNfRVJST1IpO1xuICAgIHJlcXVpcmVkRmllbGQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5IQVNfRVJST1IpO1xuICB9XG5cbiAgcmVtb3ZlRXJyb3IocmVxdWlyZWRGaWVsZCkge1xuICAgIHJlcXVpcmVkRmllbGQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSEFTX0VSUk9SKTtcbiAgICByZXF1aXJlZEZpZWxkLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSEFTX0VSUk9SKTtcbiAgfVxuXG4gIHZhbGlkYXRlRmllbGQocmVxdWlyZWRGaWVsZCkge1xuICAgIGxldCBlcnIgPSAwO1xuXG4gICAgaWYgKHJlcXVpcmVkRmllbGQuZGF0YXNldC5yZXF1aXJlZCA9PT0gJ2VtYWlsJykge1xuICAgICAgcmVxdWlyZWRGaWVsZC52YWx1ZSA9IHJlcXVpcmVkRmllbGQudmFsdWUucmVwbGFjZSgnICcsICcnKTtcblxuICAgICAgaWYgKHRoaXMudGVzdEVtYWlsKHJlcXVpcmVkRmllbGQpKSB7XG4gICAgICAgIHRoaXMuYWRkRXJyb3IocmVxdWlyZWRGaWVsZCk7XG4gICAgICAgIGVycisrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW1vdmVFcnJvcihyZXF1aXJlZEZpZWxkKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJlcXVpcmVkRmllbGQudHlwZSA9PT0gJ2NoZWNrYm94JyAmJiAhcmVxdWlyZWRGaWVsZC5jaGVja2VkKSB7XG4gICAgICB0aGlzLmFkZEVycm9yKHJlcXVpcmVkRmllbGQpO1xuICAgICAgZXJyKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghcmVxdWlyZWRGaWVsZC52YWx1ZS50cmltKCkpIHtcbiAgICAgICAgdGhpcy5hZGRFcnJvcihyZXF1aXJlZEZpZWxkKTtcbiAgICAgICAgZXJyKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbW92ZUVycm9yKHJlcXVpcmVkRmllbGQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZXJyO1xuICB9XG5cbiAgY2xlYXJGaWVsZHMoZm9ybSkge1xuICAgIGZvcm0ucmVzZXQoKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgaW5wdXRzID0gZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCx0ZXh0YXJlYScpO1xuICAgICAgY29uc3QgY2hlY2tib3hlcyA9IGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyk7XG5cbiAgICAgIGlmIChpbnB1dHMubGVuZ3RoKSB7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBpbnB1dHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgY29uc3QgaW5wdXQgPSBpbnB1dHNbaW5kZXhdO1xuXG4gICAgICAgICAgaW5wdXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5IQVNfRk9DVVMpO1xuICAgICAgICAgIGlucHV0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLkhBU19GT0NVUyk7XG4gICAgICAgICAgdGhpcy5yZW1vdmVFcnJvcihpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChjaGVja2JveGVzLmxlbmd0aCkge1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY2hlY2tib3hlcy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICBjb25zdCBjaGVja2JveCA9IGNoZWNrYm94ZXNbaW5kZXhdO1xuICAgICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIDApO1xuICB9XG5cbiAgdGVzdEVtYWlsKHJlcXVpcmVkRmllbGQpIHtcbiAgICByZXR1cm4gIS9eXFx3KyhbXFwuLV0/XFx3KykqQFxcdysoW1xcLi1dP1xcdyspKihcXC5cXHd7Miw4fSkrJC8udGVzdChcbiAgICAgIHJlcXVpcmVkRmllbGQudmFsdWVcbiAgICApO1xuICB9XG59XG5jbGFzcyBGb3JtU3VibWl0aW9uIGV4dGVuZHMgVmFsaWRhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHNob3VsZFZhbGlkYXRlKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnNob3VsZFZhbGlkYXRlID0gc2hvdWxkVmFsaWRhdGUgPyBzaG91bGRWYWxpZGF0ZSA6IHRydWU7XG4gICAgdGhpcy5mb3JtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Zvcm0nKTtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHNlbmRGb3JtKGZvcm0sIHJlc3BvbnNlUmVzdWx0ID0gYGApIHtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzZW5kRm9ybScsIHtcbiAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgZm9ybTogZm9ybSxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIC8vIHNob3cgbW9kYWwsIGlmIHBvcHVwIG1vZHVsZSBpcyBjb25uZWN0ZWRcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmIChtb2R1bGVzLnBvcHVwKSB7XG4gICAgICAgIGNvbnN0IG1vZGFsID0gZm9ybS5kYXRhc2V0Lm1vZGFsTWVzc2FnZTtcbiAgICAgICAgbW9kYWwgPyBtb2R1bGVzLm1vZGFsLm9wZW4obW9kYWwpIDogbnVsbDtcbiAgICAgIH1cbiAgICB9LCAwKTtcblxuICAgIHRoaXMuY2xlYXJGaWVsZHMoZm9ybSk7XG5cbiAgICBjb25zb2xlLmxvZygnaXMgc2VudCcpO1xuICB9XG5cbiAgYXN5bmMgaGFuZGxlU3VibWl0aW9uKGZvcm0sIGUpIHtcbiAgICBjb25zdCBlcnIgPSAhZm9ybS5oYXNBdHRyaWJ1dGUodGhpcy5hdHRycy5JR05PUkVfVkFMSURBVElPTilcbiAgICAgID8gdGhpcy5nZXRFcnJvcnMoZm9ybSlcbiAgICAgIDogMDtcblxuICAgIGlmIChlcnIgPT09IDApIHtcbiAgICAgIGNvbnN0IGFqYXggPSBmb3JtLmhhc0F0dHJpYnV0ZSh0aGlzLmF0dHJzLkFKQVgpO1xuXG4gICAgICBpZiAoYWpheCkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgYWN0aW9uID0gZm9ybS5nZXRBdHRyaWJ1dGUoJ2FjdGlvbicpXG4gICAgICAgICAgPyBmb3JtLmdldEF0dHJpYnV0ZSgnYWN0aW9uJykudHJpbSgpXG4gICAgICAgICAgOiAnIyc7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IGZvcm0uZ2V0QXR0cmlidXRlKCdtZXRob2QnKVxuICAgICAgICAgID8gZm9ybS5nZXRBdHRyaWJ1dGUoJ21ldGhvZCcpLnRyaW0oKVxuICAgICAgICAgIDogJ0dFVCc7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7XG5cbiAgICAgICAgZm9ybS5jbGFzc0xpc3QuYWRkKCdfaXMtc2VuZGluZycpO1xuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYWN0aW9uLCB7XG4gICAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgICAgYm9keTogZGF0YSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgIGZvcm0uY2xhc3NMaXN0LnJlbW92ZSgnX2lzLXNlbmRpbmcnKTtcbiAgICAgICAgICB0aGlzLnNlbmRGb3JtKGZvcm0sIHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWxlcnQoJ2Vycm9yJyk7XG4gICAgICAgICAgZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdfaXMtc2VuZGluZycpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGZvcm0uaGFzQXR0cmlidXRlKHRoaXMuYXR0cnMuREVWKSkge1xuICAgICAgICAvLyBpbiBkZXZlbG9wbWVudCBtb2RlXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5zZW5kRm9ybShmb3JtKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuXG4gICAgaWYgKHRoaXMuZm9ybXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmZvcm1zLmZvckVhY2goZm9ybSA9PiB7XG4gICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBfdGhpcy5oYW5kbGVTdWJtaXRpb24oZS50YXJnZXQsIGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdyZXNldCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgX3RoaXMuY2xlYXJGaWVsZHMoZS50YXJnZXQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuY2xhc3MgRm9ybUZpZWxkcyBleHRlbmRzIFZhbGlkYXRpb24ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZmllbGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQsdGV4dGFyZWEnKTtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHNhdmVQbGFjZWhvbGRlcigpIHtcbiAgICBpZiAodGhpcy5maWVsZHMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgICAgaWYgKCFmaWVsZC5oYXNBdHRyaWJ1dGUodGhpcy5hdHRycy5TSE9XX1BMQUNFSE9MREVSKSkge1xuICAgICAgICAgIGZpZWxkLmRhdGFzZXQucGxhY2Vob2xkZXIgPSBmaWVsZC5wbGFjZWhvbGRlcjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRm9jdXNpbihlKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG5cbiAgICBpZiAodGFyZ2V0LnRhZ05hbWUgPT09ICdJTlBVVCcgfHwgdGFyZ2V0LnRhZ05hbWUgPT09ICdURVhUQVJFQScpIHtcbiAgICAgIGlmICh0YXJnZXQuZGF0YXNldC5wbGFjZWhvbGRlcikgdGFyZ2V0LnBsYWNlaG9sZGVyID0gJyc7XG5cbiAgICAgIGlmICghdGFyZ2V0Lmhhc0F0dHJpYnV0ZSh0aGlzLmF0dHJzLklHTk9SRV9GT0NVUykpIHtcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLkhBU19GT0NVUyk7XG4gICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLkhBU19GT0NVUyk7XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5IQVNfRVJST1IpO1xuICAgICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5IQVNfRVJST1IpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJlbW92ZUVycm9yKHRhcmdldCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRm9jdXNvdXQoZSkge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PT0gJ0lOUFVUJyB8fCB0YXJnZXQudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJykge1xuICAgICAgaWYgKHRhcmdldC5kYXRhc2V0LnBsYWNlaG9sZGVyKSB7XG4gICAgICAgIHRhcmdldC5wbGFjZWhvbGRlciA9IHRhcmdldC5kYXRhc2V0LnBsYWNlaG9sZGVyO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRhcmdldC5oYXNBdHRyaWJ1dGUodGhpcy5hdHRycy5JR05PUkVfRk9DVVMpKSB7XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5IQVNfRk9DVVMpO1xuICAgICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5IQVNfRk9DVVMpO1xuICAgICAgfVxuICAgICAgaWYgKHRhcmdldC5oYXNBdHRyaWJ1dGUodGhpcy5hdHRycy5WQUxJREFURSkpIHtcbiAgICAgICAgdGhpcy52YWxpZGF0ZUZpZWxkKHRhcmdldCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBzYXZlIHBsYWNlaG9sZGVyIGluIGRhdGEgYXR0cmlidXRlXG4gICAgdGhpcy5zYXZlUGxhY2Vob2xkZXIoKTtcblxuICAgIC8vIGhhbmRsZSBzdWJtaXRpb25cbiAgICBuZXcgRm9ybVN1Ym1pdGlvbigpO1xuXG4gICAgLy8gZXZlbnRzXG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdGhpcy5oYW5kbGVGb2N1c2luLmJpbmQodGhpcykpO1xuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCB0aGlzLmhhbmRsZUZvY3Vzb3V0LmJpbmQodGhpcykpO1xuICB9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm5ldyBGb3JtRmllbGRzKCk7XG4iLCJpbXBvcnQgeyBtb2R1bGVzIH0gZnJvbSAnLi4vbW9kdWxlcy5qcyc7XG5pbXBvcnQgeyBib2R5TG9ja1N0YXR1cywgYm9keUxvY2ssIGJvZHlVbmxvY2sgfSBmcm9tICcuLi91dGlscy91dGlscy5qcyc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmNsYXNzIE1vZGFsIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIGxldCBjb25maWcgPSB7XG4gICAgICBsb2dnaW5nOiB0cnVlLFxuICAgICAgaW5pdDogdHJ1ZSxcbiAgICAgIGF0dHJpYnV0ZU9wZW5CdXR0b246ICdkYXRhLW1vZGFsJyxcbiAgICAgIGF0dHJpYnV0ZUNsb3NlQnV0dG9uOiAnZGF0YS1jbG9zZScsXG4gICAgICBmaXhFbGVtZW50U2VsZWN0b3I6ICdbZGF0YS1scF0nLFxuICAgICAgeW91dHViZUF0dHJpYnV0ZTogJ2RhdGEtbW9kYWwteW91dHViZScsXG4gICAgICB5b3V0dWJlUGxhY2VBdHRyaWJ1dGU6ICdkYXRhLW1vZGFsLXlvdXR1YmUtcGxhY2UnLFxuICAgICAgc2V0QXV0b3BsYXlZb3V0dWJlOiB0cnVlLFxuICAgICAgY2xhc3Nlczoge1xuICAgICAgICBtb2RhbDogJ21vZGFsJyxcbiAgICAgICAgLy8gbW9kYWxXcmFwcGVyOiAnbW9kYWxfX3dyYXBwZXInLFxuICAgICAgICBtb2RhbENvbnRlbnQ6ICdtb2RhbF9fY29udGVudCcsXG4gICAgICAgIG1vZGFsQWN0aXZlOiAnbW9kYWxfc2hvdycsXG4gICAgICAgIGJvZHlBY3RpdmU6ICdtb2RhbC1zaG93JyxcbiAgICAgIH0sXG4gICAgICBmb2N1c0NhdGNoOiB0cnVlLFxuICAgICAgY2xvc2VFc2M6IHRydWUsXG4gICAgICBib2R5TG9jazogdHJ1ZSxcbiAgICAgIGhhc2hTZXR0aW5nczoge1xuICAgICAgICBsb2NhdGlvbjogdHJ1ZSxcbiAgICAgICAgZ29IYXNoOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIG9uOiB7XG4gICAgICAgIGJlZm9yZU9wZW46IGZ1bmN0aW9uICgpIHt9LFxuICAgICAgICBhZnRlck9wZW46IGZ1bmN0aW9uICgpIHt9LFxuICAgICAgICBiZWZvcmVDbG9zZTogZnVuY3Rpb24gKCkge30sXG4gICAgICAgIGFmdGVyQ2xvc2U6IGZ1bmN0aW9uICgpIHt9LFxuICAgICAgfSxcbiAgICB9O1xuICAgIHRoaXMueW91VHViZUNvZGU7XG4gICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICB0aGlzLnRhcmdldE9wZW4gPSB7XG4gICAgICBzZWxlY3RvcjogZmFsc2UsXG4gICAgICBlbGVtZW50OiBmYWxzZSxcbiAgICB9O1xuICAgIHRoaXMucHJldmlvdXNPcGVuID0ge1xuICAgICAgc2VsZWN0b3I6IGZhbHNlLFxuICAgICAgZWxlbWVudDogZmFsc2UsXG4gICAgfTtcbiAgICB0aGlzLmxhc3RDbG9zZWQgPSB7XG4gICAgICBzZWxlY3RvcjogZmFsc2UsXG4gICAgICBlbGVtZW50OiBmYWxzZSxcbiAgICB9O1xuICAgIHRoaXMuX2RhdGFWYWx1ZSA9IGZhbHNlO1xuICAgIHRoaXMuaGFzaCA9IGZhbHNlO1xuXG4gICAgdGhpcy5fcmVvcGVuID0gZmFsc2U7XG4gICAgdGhpcy5fc2VsZWN0b3JPcGVuID0gZmFsc2U7XG5cbiAgICB0aGlzLmxhc3RGb2N1c0VsID0gZmFsc2U7XG4gICAgdGhpcy5fZm9jdXNFbCA9IFtcbiAgICAgICdhW2hyZWZdJyxcbiAgICAgICdpbnB1dDpub3QoW2Rpc2FibGVkXSk6bm90KFt0eXBlPVwiaGlkZGVuXCJdKTpub3QoW2FyaWEtaGlkZGVuXSknLFxuICAgICAgJ2J1dHRvbjpub3QoW2Rpc2FibGVkXSk6bm90KFthcmlhLWhpZGRlbl0pJyxcbiAgICAgICdzZWxlY3Q6bm90KFtkaXNhYmxlZF0pOm5vdChbYXJpYS1oaWRkZW5dKScsXG4gICAgICAndGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pOm5vdChbYXJpYS1oaWRkZW5dKScsXG4gICAgICAnYXJlYVtocmVmXScsXG4gICAgICAnaWZyYW1lJyxcbiAgICAgICdvYmplY3QnLFxuICAgICAgJ2VtYmVkJyxcbiAgICAgICdbY29udGVudGVkaXRhYmxlXScsXG4gICAgICAnW3RhYmluZGV4XTpub3QoW3RhYmluZGV4Xj1cIi1cIl0pJyxcbiAgICBdO1xuICAgIC8vdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbihjb25maWcsIG9wdGlvbnMpO1xuICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgIC4uLmNvbmZpZyxcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBjbGFzc2VzOiB7XG4gICAgICAgIC4uLmNvbmZpZy5jbGFzc2VzLFxuICAgICAgICAuLi5vcHRpb25zPy5jbGFzc2VzLFxuICAgICAgfSxcbiAgICAgIGhhc2hTZXR0aW5nczoge1xuICAgICAgICAuLi5jb25maWcuaGFzaFNldHRpbmdzLFxuICAgICAgICAuLi5vcHRpb25zPy5oYXNoU2V0dGluZ3MsXG4gICAgICB9LFxuICAgICAgb246IHtcbiAgICAgICAgLi4uY29uZmlnLm9uLFxuICAgICAgICAuLi5vcHRpb25zPy5vbixcbiAgICAgIH0sXG4gICAgfTtcbiAgICB0aGlzLmJvZHlMb2NrID0gZmFsc2U7XG4gICAgdGhpcy5vcHRpb25zLmluaXQgPyB0aGlzLmluaXRtb2RhbHMoKSA6IG51bGw7XG4gIH1cbiAgaW5pdG1vZGFscygpIHtcbiAgICB0aGlzLmV2ZW50c21vZGFsKCk7XG4gIH1cbiAgZXZlbnRzbW9kYWwoKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdjbGljaycsXG4gICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICBjb25zdCBidXR0b25PcGVuID0gZS50YXJnZXQuY2xvc2VzdChcbiAgICAgICAgICBgWyR7dGhpcy5vcHRpb25zLmF0dHJpYnV0ZU9wZW5CdXR0b259XWBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGJ1dHRvbk9wZW4pIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5fZGF0YVZhbHVlID0gYnV0dG9uT3Blbi5nZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuYXR0cmlidXRlT3BlbkJ1dHRvblxuICAgICAgICAgIClcbiAgICAgICAgICAgID8gYnV0dG9uT3Blbi5nZXRBdHRyaWJ1dGUodGhpcy5vcHRpb25zLmF0dHJpYnV0ZU9wZW5CdXR0b24pXG4gICAgICAgICAgICA6ICdlcnJvcic7XG4gICAgICAgICAgdGhpcy55b3VUdWJlQ29kZSA9IGJ1dHRvbk9wZW4uZ2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnlvdXR1YmVBdHRyaWJ1dGVcbiAgICAgICAgICApXG4gICAgICAgICAgICA/IGJ1dHRvbk9wZW4uZ2V0QXR0cmlidXRlKHRoaXMub3B0aW9ucy55b3V0dWJlQXR0cmlidXRlKVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICAgIGlmICh0aGlzLl9kYXRhVmFsdWUgIT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc09wZW4pIHRoaXMubGFzdEZvY3VzRWwgPSBidXR0b25PcGVuO1xuICAgICAgICAgICAgdGhpcy50YXJnZXRPcGVuLnNlbGVjdG9yID0gYCR7dGhpcy5fZGF0YVZhbHVlfWA7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rvck9wZW4gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJ1dHRvbkNsb3NlID0gZS50YXJnZXQuY2xvc2VzdChcbiAgICAgICAgICBgWyR7dGhpcy5vcHRpb25zLmF0dHJpYnV0ZUNsb3NlQnV0dG9ufV1gXG4gICAgICAgICk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhZS50YXJnZXQuY2xvc2VzdCgnI3VuY29uZmlybWVkQWdlTW9kYWwnKSAmJlxuICAgICAgICAgICFlLnRhcmdldC5jbG9zZXN0KCcjY29uZmlybUFnZU1vZGFsJykgJiZcbiAgICAgICAgICAoYnV0dG9uQ2xvc2UgfHxcbiAgICAgICAgICAgICghZS50YXJnZXQuY2xvc2VzdChgLiR7dGhpcy5vcHRpb25zLmNsYXNzZXMubW9kYWxDb250ZW50fWApICYmXG4gICAgICAgICAgICAgIHRoaXMuaXNPcGVuKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKVxuICAgICk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdrZXlkb3duJyxcbiAgICAgIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLm9wdGlvbnMuY2xvc2VFc2MgJiZcbiAgICAgICAgICBlLndoaWNoID09IDI3ICYmXG4gICAgICAgICAgZS5jb2RlID09PSAnRXNjYXBlJyAmJlxuICAgICAgICAgIHRoaXMuaXNPcGVuXG4gICAgICAgICkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZm9jdXNDYXRjaCAmJiBlLndoaWNoID09IDkgJiYgdGhpcy5pc09wZW4pIHtcbiAgICAgICAgICB0aGlzLl9mb2N1c0NhdGNoKGUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuaGFzaFNldHRpbmdzLmdvSGFzaCkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICdoYXNoY2hhbmdlJyxcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaCkge1xuICAgICAgICAgICAgdGhpcy5fb3BlblRvSGFzaCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKHRoaXMudGFyZ2V0T3Blbi5zZWxlY3Rvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICk7XG5cbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAnbG9hZCcsXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2gpIHtcbiAgICAgICAgICAgIHRoaXMuX29wZW5Ub0hhc2goKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgb3BlbihzZWxlY3RvclZhbHVlKSB7XG4gICAgaWYgKGJvZHlMb2NrU3RhdHVzKSB7XG4gICAgICB0aGlzLmJvZHlMb2NrID1cbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbG9jaycpICYmICF0aGlzLmlzT3BlblxuICAgICAgICAgID8gdHJ1ZVxuICAgICAgICAgIDogZmFsc2U7XG5cbiAgICAgIGlmIChcbiAgICAgICAgc2VsZWN0b3JWYWx1ZSAmJlxuICAgICAgICB0eXBlb2Ygc2VsZWN0b3JWYWx1ZSA9PT0gJ3N0cmluZycgJiZcbiAgICAgICAgc2VsZWN0b3JWYWx1ZS50cmltKCkgIT09ICcnXG4gICAgICApIHtcbiAgICAgICAgdGhpcy50YXJnZXRPcGVuLnNlbGVjdG9yID0gc2VsZWN0b3JWYWx1ZTtcbiAgICAgICAgdGhpcy5fc2VsZWN0b3JPcGVuID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgICB0aGlzLl9yZW9wZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuX3NlbGVjdG9yT3BlbilcbiAgICAgICAgdGhpcy50YXJnZXRPcGVuLnNlbGVjdG9yID0gdGhpcy5sYXN0Q2xvc2VkLnNlbGVjdG9yO1xuICAgICAgaWYgKCF0aGlzLl9yZW9wZW4pIHRoaXMucHJldmlvdXNBY3RpdmVFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcblxuICAgICAgdGhpcy50YXJnZXRPcGVuLmVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICB0aGlzLnRhcmdldE9wZW4uc2VsZWN0b3JcbiAgICAgICk7XG5cbiAgICAgIGlmICh0aGlzLnRhcmdldE9wZW4uZWxlbWVudCkge1xuICAgICAgICBpZiAodGhpcy55b3VUdWJlQ29kZSkge1xuICAgICAgICAgIGNvbnN0IGNvZGVWaWRlbyA9IHRoaXMueW91VHViZUNvZGU7XG4gICAgICAgICAgY29uc3QgdXJsVmlkZW8gPSBgaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvJHtjb2RlVmlkZW99P3JlbD0wJnNob3dpbmZvPTAmYXV0b3BsYXk9MWA7XG4gICAgICAgICAgY29uc3QgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnYWxsb3dmdWxsc2NyZWVuJywgJycpO1xuXG4gICAgICAgICAgY29uc3QgYXV0b3BsYXkgPSB0aGlzLm9wdGlvbnMuc2V0QXV0b3BsYXlZb3V0dWJlID8gJ2F1dG9wbGF5OycgOiAnJztcbiAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdhbGxvdycsIGAke2F1dG9wbGF5fTsgZW5jcnlwdGVkLW1lZGlhYCk7XG5cbiAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdzcmMnLCB1cmxWaWRlbyk7XG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhdGhpcy50YXJnZXRPcGVuLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICAgYFske3RoaXMub3B0aW9ucy55b3V0dWJlUGxhY2VBdHRyaWJ1dGV9XWBcbiAgICAgICAgICAgIClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IHlvdXR1YmVQbGFjZSA9IHRoaXMudGFyZ2V0T3Blbi5lbGVtZW50XG4gICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCcubW9kYWxfX3RleHQnKVxuICAgICAgICAgICAgICAuc2V0QXR0cmlidXRlKGAke3RoaXMub3B0aW9ucy55b3V0dWJlUGxhY2VBdHRyaWJ1dGV9YCwgJycpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnRhcmdldE9wZW4uZWxlbWVudFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYFske3RoaXMub3B0aW9ucy55b3V0dWJlUGxhY2VBdHRyaWJ1dGV9XWApXG4gICAgICAgICAgICAuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmhhc2hTZXR0aW5ncy5sb2NhdGlvbikge1xuICAgICAgICAgIHRoaXMuX2dldEhhc2goKTtcbiAgICAgICAgICB0aGlzLl9zZXRIYXNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9wdGlvbnMub24uYmVmb3JlT3Blbih0aGlzKTtcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ2JlZm9yZW1vZGFsT3BlbicsIHtcbiAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICBtb2RhbDogdGhpcyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnRhcmdldE9wZW4uZWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMub3B0aW9ucy5jbGFzc2VzLm1vZGFsQWN0aXZlKTtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5vcHRpb25zLmNsYXNzZXMuYm9keUFjdGl2ZSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9yZW9wZW4pIHtcbiAgICAgICAgICBjb25zdCBtID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmhhc2gpO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgKCF0aGlzLmJvZHlMb2NrICYmICFtLmhhc0F0dHJpYnV0ZSgnZGF0YS1ibC1tb2JpbGUnKSkgfHxcbiAgICAgICAgICAgICghdGhpcy5ib2R5TG9jayAmJlxuICAgICAgICAgICAgICB3aW5kb3cuaW5uZXJXaWR0aCA8PSA3NjggJiZcbiAgICAgICAgICAgICAgbS5oYXNBdHRyaWJ1dGUoJ2RhdGEtYmwtbW9iaWxlJykpXG4gICAgICAgICAgICAgID8gYm9keUxvY2soKVxuICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgICAgfSwgMCk7XG4gICAgICAgIH0gZWxzZSB0aGlzLl9yZW9wZW4gPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnRhcmdldE9wZW4uZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgdGhpcy5wcmV2aW91c09wZW4uc2VsZWN0b3IgPSB0aGlzLnRhcmdldE9wZW4uc2VsZWN0b3I7XG4gICAgICAgIHRoaXMucHJldmlvdXNPcGVuLmVsZW1lbnQgPSB0aGlzLnRhcmdldE9wZW4uZWxlbWVudDtcblxuICAgICAgICB0aGlzLl9zZWxlY3Rvck9wZW4gPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5fZm9jdXNUcmFwKCk7XG4gICAgICAgIH0sIDUwKTtcblxuICAgICAgICB0aGlzLm9wdGlvbnMub24uYWZ0ZXJPcGVuKHRoaXMpO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgIG5ldyBDdXN0b21FdmVudCgnYWZ0ZXJtb2RhbE9wZW4nLCB7XG4gICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgbW9kYWw6IHRoaXMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNsb3NlKHNlbGVjdG9yVmFsdWUpIHtcbiAgICBpZiAoXG4gICAgICBzZWxlY3RvclZhbHVlICYmXG4gICAgICB0eXBlb2Ygc2VsZWN0b3JWYWx1ZSA9PT0gJ3N0cmluZycgJiZcbiAgICAgIHNlbGVjdG9yVmFsdWUudHJpbSgpICE9PSAnJ1xuICAgICkge1xuICAgICAgdGhpcy5wcmV2aW91c09wZW4uc2VsZWN0b3IgPSBzZWxlY3RvclZhbHVlO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNPcGVuIHx8ICFib2R5TG9ja1N0YXR1cykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm9wdGlvbnMub24uYmVmb3JlQ2xvc2UodGhpcyk7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChcbiAgICAgIG5ldyBDdXN0b21FdmVudCgnYmVmb3JlbW9kYWxDbG9zZScsIHtcbiAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgbW9kYWw6IHRoaXMsXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG5cbiAgICBpZiAodGhpcy55b3VUdWJlQ29kZSkge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnRhcmdldE9wZW4uZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGBbJHt0aGlzLm9wdGlvbnMueW91dHViZVBsYWNlQXR0cmlidXRlfV1gXG4gICAgICAgIClcbiAgICAgIClcbiAgICAgICAgdGhpcy50YXJnZXRPcGVuLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgWyR7dGhpcy5vcHRpb25zLnlvdXR1YmVQbGFjZUF0dHJpYnV0ZX1dYFxuICAgICAgICApLmlubmVySFRNTCA9ICcnO1xuICAgIH1cbiAgICB0aGlzLnByZXZpb3VzT3Blbi5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXG4gICAgICB0aGlzLm9wdGlvbnMuY2xhc3Nlcy5tb2RhbEFjdGl2ZVxuICAgICk7XG4gICAgLy8gYXJpYS1oaWRkZW5cbiAgICB0aGlzLnByZXZpb3VzT3Blbi5lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIGlmICghdGhpcy5fcmVvcGVuKSB7XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcbiAgICAgICAgdGhpcy5vcHRpb25zLmNsYXNzZXMuYm9keUFjdGl2ZVxuICAgICAgKTtcbiAgICAgICF0aGlzLmJvZHlMb2NrID8gYm9keVVubG9jaygpIDogbnVsbDtcbiAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuX3JlbW92ZUhhc2goKTtcbiAgICBpZiAodGhpcy5fc2VsZWN0b3JPcGVuKSB7XG4gICAgICB0aGlzLmxhc3RDbG9zZWQuc2VsZWN0b3IgPSB0aGlzLnByZXZpb3VzT3Blbi5zZWxlY3RvcjtcbiAgICAgIHRoaXMubGFzdENsb3NlZC5lbGVtZW50ID0gdGhpcy5wcmV2aW91c09wZW4uZWxlbWVudDtcbiAgICB9XG4gICAgdGhpcy5vcHRpb25zLm9uLmFmdGVyQ2xvc2UodGhpcyk7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChcbiAgICAgIG5ldyBDdXN0b21FdmVudCgnYWZ0ZXJtb2RhbENsb3NlJywge1xuICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICBtb2RhbDogdGhpcyxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5fZm9jdXNUcmFwKCk7XG4gICAgfSwgNTApO1xuICB9XG4gIF9nZXRIYXNoKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuaGFzaFNldHRpbmdzLmxvY2F0aW9uKSB7XG4gICAgICB0aGlzLmhhc2ggPSB0aGlzLnRhcmdldE9wZW4uc2VsZWN0b3IuaW5jbHVkZXMoJyMnKVxuICAgICAgICA/IHRoaXMudGFyZ2V0T3Blbi5zZWxlY3RvclxuICAgICAgICA6IHRoaXMudGFyZ2V0T3Blbi5zZWxlY3Rvci5yZXBsYWNlKCcuJywgJyMnKTtcbiAgICB9XG4gIH1cbiAgX29wZW5Ub0hhc2goKSB7XG4gICAgbGV0IGNsYXNzSW5IYXNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAuJHt3aW5kb3cubG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjJywgJycpfWBcbiAgICApXG4gICAgICA/IGAuJHt3aW5kb3cubG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjJywgJycpfWBcbiAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHt3aW5kb3cubG9jYXRpb24uaGFzaH1gKVxuICAgICAgPyBgJHt3aW5kb3cubG9jYXRpb24uaGFzaH1gXG4gICAgICA6IG51bGw7XG5cbiAgICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGBbJHt0aGlzLm9wdGlvbnMuYXR0cmlidXRlT3BlbkJ1dHRvbn0gPSBcIiR7Y2xhc3NJbkhhc2h9XCJdYFxuICAgIClcbiAgICAgID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgWyR7dGhpcy5vcHRpb25zLmF0dHJpYnV0ZU9wZW5CdXR0b259ID0gXCIke2NsYXNzSW5IYXNofVwiXWBcbiAgICAgICAgKVxuICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGBbJHt0aGlzLm9wdGlvbnMuYXR0cmlidXRlT3BlbkJ1dHRvbn0gPSBcIiR7Y2xhc3NJbkhhc2gucmVwbGFjZShcbiAgICAgICAgICAgICcuJyxcbiAgICAgICAgICAgICcjJ1xuICAgICAgICAgICl9XCJdYFxuICAgICAgICApO1xuICAgIGlmIChidXR0b25zICYmIGNsYXNzSW5IYXNoKSB0aGlzLm9wZW4oY2xhc3NJbkhhc2gpO1xuICB9XG4gIF9zZXRIYXNoKCkge1xuICAgIGhpc3RvcnkucHVzaFN0YXRlKCcnLCAnJywgdGhpcy5oYXNoKTtcbiAgfVxuICBfcmVtb3ZlSGFzaCgpIHtcbiAgICBoaXN0b3J5LnB1c2hTdGF0ZSgnJywgJycsIHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KCcjJylbMF0pO1xuICB9XG4gIF9mb2N1c0NhdGNoKGUpIHtcbiAgICBjb25zdCBmb2N1c2FibGUgPSB0aGlzLnRhcmdldE9wZW4uZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX2ZvY3VzRWwpO1xuICAgIGNvbnN0IGZvY3VzQXJyYXkgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmb2N1c2FibGUpO1xuICAgIGNvbnN0IGZvY3VzZWRJbmRleCA9IGZvY3VzQXJyYXkuaW5kZXhPZihkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcblxuICAgIGlmIChlLnNoaWZ0S2V5ICYmIGZvY3VzZWRJbmRleCA9PT0gMCkge1xuICAgICAgZm9jdXNBcnJheVtmb2N1c0FycmF5Lmxlbmd0aCAtIDFdLmZvY3VzKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIGlmICghZS5zaGlmdEtleSAmJiBmb2N1c2VkSW5kZXggPT09IGZvY3VzQXJyYXkubGVuZ3RoIC0gMSkge1xuICAgICAgZm9jdXNBcnJheVswXS5mb2N1cygpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuICBfZm9jdXNUcmFwKCkge1xuICAgIGNvbnN0IGZvY3VzYWJsZSA9IHRoaXMucHJldmlvdXNPcGVuLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9mb2N1c0VsKTtcbiAgICBpZiAoIXRoaXMuaXNPcGVuICYmIHRoaXMubGFzdEZvY3VzRWwpIHtcbiAgICAgIHRoaXMubGFzdEZvY3VzRWwuZm9jdXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9jdXNhYmxlWzBdLmZvY3VzKCk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZXMubW9kYWwgPSBuZXcgTW9kYWwoe30pO1xuXG4vLyBzaG93IGFnZSBtb2RhbFxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWlucGFnZScpKSB7XG4gIGNvbnN0IGNvbmZpcm1BZ2VCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29uZmlybS1hZ2UtYnRuJyk7XG4gIC8vIG1vZHVsZXMubW9kYWwub3BlbignI2NvbmZpcm1BZ2VNb2RhbCcpO1xuICBjb25maXJtQWdlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIG1vZHVsZXMubW9kYWwuY2xvc2UoJyNjb25maXJtQWdlTW9kYWwnKTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgU2ltcGxlQmFyIGZyb20gJ3NpbXBsZWJhcic7XG5pbXBvcnQgJ3NpbXBsZWJhci9kaXN0L3NpbXBsZWJhci5jc3MnO1xuaW1wb3J0IHsgX3NsaWRlVXAsIF9zbGlkZURvd24sIF9zbGlkZVRvZ2dsZSB9IGZyb20gJy4vdXRpbHMuanMnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnQgY2xhc3MgU2VsZWN0IHtcbiAgLy8gc2V0dXAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fdGhpcyA9IHRoaXM7XG5cbiAgICAvLyBjdXN0b20gc2VsZWN0IGNsYXNzZXNcbiAgICB0aGlzLmNsYXNzZXMgPSB7XG4gICAgICAvLyBodG1sIGJ1aWxkIGNsYXNzZXNcbiAgICAgIFNFTEVDVDogJ3NlbGVjdCcsXG4gICAgICBCT0RZOiAnc2VsZWN0X19ib2R5JyxcbiAgICAgIExBQkVMOiAnc2VsZWN0X19sYWJlbCcsXG4gICAgICBUSVRMRTogJ3NlbGVjdF9fdGl0bGUnLFxuICAgICAgVkFMVUU6ICdzZWxlY3RfX3ZhbHVlJyxcbiAgICAgIENPTlRFTlQ6ICdzZWxlY3RfX2NvbnRlbnQnLFxuICAgICAgT1BUSU9OUzogJ3NlbGVjdF9fb3B0aW9ucycsXG4gICAgICBPUFRJT046ICdzZWxlY3RfX29wdGlvbicsXG4gICAgICBTQ1JPTEw6ICdzZWxlY3RfX3Njcm9sbCcsXG4gICAgICBHUk9VUDogJ3NlbGVjdF9fZ3JvdXAnLFxuICAgICAgSU5QVVQ6ICdzZWxlY3RfX2lucHV0JyxcbiAgICAgIEFTU0VUOiAnc2VsZWN0X19hc3NldCcsXG4gICAgICBUWFQ6ICdzZWxlY3RfX3RleHQnLFxuXG4gICAgICAvLyBzdGF0ZSBjbGFzc2VzXG4gICAgICBJU19BQ1RJVkU6ICdfaXMtYWN0aXZlJyxcbiAgICAgIElTX0ZPQ1VTRUQ6ICdfaXMtZm9jdXNlZCcsXG4gICAgICBJU19PUEVORUQ6ICdfaXMtb3BlbmVkJyxcbiAgICAgIElTX0ZJTExFRDogJ19pcy1maWxsZWQnLFxuICAgICAgSVNfU0VMRUNURUQ6ICdfaXMtc2VsZWN0ZWQnLFxuICAgICAgSVNfRElTQUJMRUQ6ICdfaXMtZGlzYWJsZWQnLFxuXG4gICAgICAvLyBhZGRpdGlvbmFsIGNsYXNzZXNcbiAgICAgIEhBU19MSVNUOiAnX2hhcy1saXN0JyxcbiAgICAgIEhBU19FUlJPUjogJ19oYXMtZXJyb3InLFxuICAgICAgSEFTX01VTFRJUExFOiAnX2hhcy1tdWx0aXBsZScsXG4gICAgICBIQVNfQ0hFQ0tCT1g6ICdfaGFzLWNoZWNrYm94JyxcbiAgICAgIEhBU19MQUJFTDogJ19oYXMtbGFiZWwnLFxuICAgIH07XG5cbiAgICAvLyBhbGwgc2VsZWN0IGl0ZW1zXG4gICAgY29uc3Qgc2VsZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlbGVjdCcpO1xuICAgIGlmIChzZWxlY3RMaXN0Lmxlbmd0aCkge1xuICAgICAgdGhpcy5pbml0KHNlbGVjdExpc3QpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHNlbGVjdCBpbml0aWFsaXphdGlvbiAmIGJ1aWxkIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIGluaXRpYWxpemF0aW9uXG4gIGluaXQoc2VsZWN0TGlzdCkge1xuICAgIC8vIGluaXRcbiAgICBzZWxlY3RMaXN0LmZvckVhY2goKHNlbGVjdCwgaW5kZXgpID0+IHtcbiAgICAgIHRoaXMuaW5pdFNlbEl0ZW0oc2VsZWN0LCBpbmRleCArIDEpO1xuICAgIH0pO1xuXG4gICAgLy8gZXZlbnRzXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdjbGljaycsXG4gICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGlzLnNldEFjdGlvbnMoZSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAna2V5ZG93bicsXG4gICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGlzLnNldEFjdGlvbnMoZSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnZm9jdXNpbicsXG4gICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGlzLnNldEFjdGlvbnMoZSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnZm9jdXNvdXQnLFxuICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdGhpcy5zZXRBY3Rpb25zKGUpO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgKTtcbiAgfVxuICAvLyBzaW5nbGUgc2VsZWN0IGl0ZW0gaW5pdGlhbGl6YXRpb25cbiAgaW5pdFNlbEl0ZW0ocmVsYXRpdmVTZWwsIGluZGV4KSB7XG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgc2VsZWN0LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLlNFTEVDVCk7XG4gICAgcmVsYXRpdmVTZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc2VsZWN0LCByZWxhdGl2ZVNlbCk7XG4gICAgc2VsZWN0LmFwcGVuZENoaWxkKHJlbGF0aXZlU2VsKTtcbiAgICByZWxhdGl2ZVNlbC5oaWRkZW4gPSB0cnVlO1xuICAgIGluZGV4ID8gKHJlbGF0aXZlU2VsLmRhdGFzZXQuc2VsSWQgPSBpbmRleCkgOiBudWxsO1xuXG4gICAgaWYgKHRoaXMuZ2V0UGxhY2Vob2xkZXIocmVsYXRpdmVTZWwpKSB7XG4gICAgICByZWxhdGl2ZVNlbC5kYXRhc2V0Lm9wdFBsYWNlaG9sZGVyID1cbiAgICAgICAgdGhpcy5nZXRQbGFjZWhvbGRlcihyZWxhdGl2ZVNlbCkudmFsdWU7XG4gICAgICBpZiAodGhpcy5nZXRQbGFjZWhvbGRlcihyZWxhdGl2ZVNlbCkubGFiZWwuc2hvdykge1xuICAgICAgICBjb25zdCBzZWxUaXRsZSA9IHRoaXMuZ2V0U2VsZWN0KHNlbGVjdCwgdGhpcy5jbGFzc2VzLlRJVExFKS50d2luU2VsO1xuICAgICAgICBzZWxUaXRsZS5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAgICAgJ2FmdGVyYmVnaW4nLFxuICAgICAgICAgIGA8c3BhbiBjbGFzcz1cIiR7dGhpcy5jbGFzc2VzLkxBQkVMfVwiPiR7XG4gICAgICAgICAgICB0aGlzLmdldFBsYWNlaG9sZGVyKHJlbGF0aXZlU2VsKS5sYWJlbC50ZXh0XG4gICAgICAgICAgICAgID8gdGhpcy5nZXRQbGFjZWhvbGRlcihyZWxhdGl2ZVNlbCkubGFiZWwudGV4dFxuICAgICAgICAgICAgICA6IHRoaXMuZ2V0UGxhY2Vob2xkZXIocmVsYXRpdmVTZWwpLnZhbHVlXG4gICAgICAgICAgfTwvc3Bhbj5gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIHNlbGVjdC5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAnYmVmb3JlZW5kJyxcbiAgICAgIGA8ZGl2IGNsYXNzPVwiJHt0aGlzLmNsYXNzZXMuQk9EWX1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAke1xuICAgICAgICAgICAgICAgICAgICAgICFyZWxhdGl2ZVNlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbm8tc2xpZGUnKSA/ICdoaWRkZW4nIDogJydcbiAgICAgICAgICAgICAgICAgICAgfSAgY2xhc3M9XCIke3RoaXMuY2xhc3Nlcy5PUFRJT05TfVwiPlxuXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PmBcbiAgICApO1xuXG4gICAgdGhpcy5idWlsZChyZWxhdGl2ZVNlbCk7XG5cbiAgICByZWxhdGl2ZVNlbC5kYXRhc2V0LnNwZWVkID0gcmVsYXRpdmVTZWwuZGF0YXNldC5zcGVlZFxuICAgICAgPyByZWxhdGl2ZVNlbC5kYXRhc2V0LnNwZWVkXG4gICAgICA6ICcxNTAnO1xuICAgIHJlbGF0aXZlU2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBfdGhpcy5pbml0U2VsZWN0aW9ucyhlKTtcbiAgICB9KTtcbiAgfVxuICAvLyBzZWxlY3QgYnVpbGRcbiAgYnVpbGQocmVsYXRpdmVTZWwpIHtcbiAgICBjb25zdCBzZWxlY3QgPSByZWxhdGl2ZVNlbC5wYXJlbnRFbGVtZW50O1xuXG4gICAgLy8gc2V0IGlkXG4gICAgc2VsZWN0LmRhdGFzZXQuc2VsSWQgPSByZWxhdGl2ZVNlbC5kYXRhc2V0LnNlbElkO1xuICAgIC8vIHNldCB2YWx1ZVxuICAgIHRoaXMuc2V0VmFsdWUoc2VsZWN0LCByZWxhdGl2ZVNlbCk7XG4gICAgLy8gc2V0IG9wdGlvbnNcbiAgICB0aGlzLnNldE9wdGlvbnMoc2VsZWN0LCByZWxhdGl2ZVNlbCk7XG4gICAgLy8gc2V0IGNzcyBtb2RpZmljYXRvclxuICAgIHJlbGF0aXZlU2VsLmRhdGFzZXQuc2VsQWRkb25DbGFzc1xuICAgICAgPyBzZWxlY3QuY2xhc3NMaXN0LmFkZChgc2VsZWN0XyR7cmVsYXRpdmVTZWwuZGF0YXNldC5zZWxBZGRvbkNsYXNzfWApXG4gICAgICA6IG51bGw7XG4gICAgLy8gc2V0IGNsYXNzIGlmIHNlbGVjdCBpcyBtdWx0aXBsZVxuICAgIHJlbGF0aXZlU2VsLm11bHRpcGxlXG4gICAgICA/IHNlbGVjdC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5IQVNfTVVMVElQTEUpXG4gICAgICA6IHNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5IQVNfTVVMVElQTEUpO1xuICAgIC8vIHNldCBjbGFzcyBpZiBzZWxlY3QgY2hlY2tib3hlcyBhcmUgc2V0XG4gICAgcmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNlbC1jaGVja2JveGVzJykgJiYgcmVsYXRpdmVTZWwubXVsdGlwbGVcbiAgICAgID8gc2VsZWN0LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLkhBU19DSEVDS0JPWClcbiAgICAgIDogc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLkhBU19DSEVDS0JPWCk7XG4gICAgLy8gZGlzYWJsZSBzZWxlY3RcbiAgICB0aGlzLmRpc2FibGVTZWxlY3Qoc2VsZWN0LCByZWxhdGl2ZVNlbCk7XG4gICAgLy8gc2V0IHNlYXJjaCBhY3Rpb25zIGlmIGRhdGEtc2VsLXNlYXJjaCBpcyBzZXRcbiAgICByZWxhdGl2ZVNlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtc2VsLXNlYXJjaCcpXG4gICAgICA/IHRoaXMuc2V0U2VhcmNoQWN0aW9ucyhzZWxlY3QpXG4gICAgICA6IG51bGw7XG4gICAgLy8gc2V0IHNlbGVjdCBhY3Rpb25zIGlmIGl0J3MgaW5pdGlhbGx5IG9wZW5lZFxuICAgIHJlbGF0aXZlU2VsLmhhc0F0dHJpYnV0ZSgnZGF0YS1zZWwtb3BlbmVkJykgPyB0aGlzLnNldEFjdGlvbihzZWxlY3QpIDogbnVsbDtcblxuICAgIC8vIHNldCBzZWxlY3QgaGludFxuICAgIGlmIChyZWxhdGl2ZVNlbC5kYXRhc2V0LnNlbEhpbnQpIHtcbiAgICAgIHJlbGF0aXZlU2VsLnBhcmVudEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgICAnYmVmb3JlZW5kJyxcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJzZWxlY3RfX2hpbnRcIj4ke3JlbGF0aXZlU2VsLmRhdGFzZXQuc2VsSGludH08L2Rpdj5gXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIHNob3cgLyBoaWRlIHNlbGVjdGlvbiBmcm9tIHNlbGVjdCB0aXRsZVxuICAgIGlmIChyZWxhdGl2ZVNlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtc2hvdy12YWwnKSkge1xuICAgICAgc2VsZWN0LmNsYXNzTGlzdC5hZGQoJ19zZWxlY3Qtc2hvdy12YWwnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ19zZWxlY3Qtc2hvdy12YWwnKTtcbiAgICB9XG4gIH1cbiAgLy8gc2V0IHR3aW4gc2VsZWN0IHRpdGxlIHZhbHVlXG4gIHNldFZhbHVlKHNlbGVjdCwgcmVsYXRpdmVTZWwpIHtcbiAgICBjb25zdCBzZWxCb2R5ID0gdGhpcy5nZXRTZWxlY3Qoc2VsZWN0LCB0aGlzLmNsYXNzZXMuQk9EWSkudHdpblNlbDtcbiAgICBjb25zdCBzZWxUaXRsZSA9IHRoaXMuZ2V0U2VsZWN0KHNlbGVjdCwgdGhpcy5jbGFzc2VzLlRJVExFKS50d2luU2VsO1xuXG4gICAgaWYgKHNlbFRpdGxlKSBzZWxUaXRsZS5yZW1vdmUoKTtcbiAgICBzZWxCb2R5Lmluc2VydEFkamFjZW50SFRNTChcbiAgICAgICdhZnRlcmJlZ2luJyxcbiAgICAgIHRoaXMuZ2V0VmFsdWUoc2VsZWN0LCByZWxhdGl2ZVNlbClcbiAgICApO1xuICB9XG4gIC8vIHNldCB0d2luIHNlbGVjdCBvcHRpb25zXG4gIHNldE9wdGlvbnMoc2VsZWN0LCByZWxhdGl2ZVNlbCkge1xuICAgIGNvbnN0IF90aGlzID0gdGhpcztcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5nZXRTZWxlY3Qoc2VsZWN0LCB0aGlzLmNsYXNzZXMuT1BUSU9OUykudHdpblNlbDtcbiAgICBjb25zdCByZWxhdGl2ZVNlbE9wdGlvbnMgPSB0aGlzLmdldFNlbGVjdChcbiAgICAgIHNlbGVjdCxcbiAgICAgIHRoaXMuY2xhc3Nlcy5PUFRJT05TXG4gICAgKS5yZWxhdGl2ZVNlbDtcbiAgICBvcHRpb25zLmlubmVySFRNTCA9IHRoaXMuZ2V0T3B0aW9ucyhyZWxhdGl2ZVNlbCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmdldE9wdGlvbnMocmVsYXRpdmVTZWwpO1xuICAgIH0pO1xuICAgIGlmIChyZWxhdGl2ZVNlbE9wdGlvbnMucXVlcnlTZWxlY3RvcignW3NlbGVjdGVkXScpKSB7XG4gICAgICBvcHRpb25zXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKGAuJHt0aGlzLmNsYXNzZXMuT1BUSU9OfWApXG4gICAgICAgIC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5JU19TRUxFQ1RFRCk7XG4gICAgfVxuICB9XG4gIC8vIGRpc2FibGUgc2VsZWN0XG4gIGRpc2FibGVTZWxlY3Qoc2VsZWN0LCByZWxhdGl2ZVNlbCkge1xuICAgIGlmIChyZWxhdGl2ZVNlbC5kaXNhYmxlZCkge1xuICAgICAgc2VsZWN0LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLklTX0RJU0FCTEVEKTtcbiAgICAgIHRoaXMuZ2V0U2VsZWN0KHNlbGVjdCwgdGhpcy5jbGFzc2VzLlRJVExFKS50d2luU2VsLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLklTX0RJU0FCTEVEKTtcbiAgICAgIHRoaXMuZ2V0U2VsZWN0KHNlbGVjdCwgdGhpcy5jbGFzc2VzLlRJVExFKS50d2luU2VsLmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLy8gbWFpbiBhY3Rpb25zIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gc2V0IG1haW4gYWN0aW9uc1xuICBzZXRBY3Rpb25zKGUpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBjb25zdCB0eXBlID0gZS50eXBlO1xuXG4gICAgaWYgKFxuICAgICAgdGFyZ2V0LmNsb3Nlc3QodGhpcy5nZXRDbGFzcyh0aGlzLmNsYXNzZXMuU0VMRUNUKSkgfHxcbiAgICAgIHRhcmdldC5jbG9zZXN0KHRoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLkhBU19MSVNUKSlcbiAgICApIHtcbiAgICAgIGNvbnN0IHNlbGVjdCA9IHRhcmdldC5jbG9zZXN0KCcuc2VsZWN0JylcbiAgICAgICAgPyB0YXJnZXQuY2xvc2VzdCgnLnNlbGVjdCcpXG4gICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGAuJHt0aGlzLmNsYXNzZXMuc2VsfVtkYXRhLXNlbC1pZD1cIiR7XG4gICAgICAgICAgICAgIHRhcmdldC5jbG9zZXN0KHRoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLkhBU19MSVNUKSkuZGF0YXNldFxuICAgICAgICAgICAgICAgIC5zZWxlY3RJZFxuICAgICAgICAgICAgfVwiXWBcbiAgICAgICAgICApO1xuICAgICAgY29uc3QgcmVsYXRpdmVTZWwgPSB0aGlzLmdldFNlbGVjdChzZWxlY3QpLnJlbGF0aXZlU2VsO1xuICAgICAgaWYgKHR5cGUgPT09ICdjbGljaycpIHtcbiAgICAgICAgaWYgKCFyZWxhdGl2ZVNlbC5kaXNhYmxlZCkge1xuICAgICAgICAgIGlmICh0YXJnZXQuY2xvc2VzdCh0aGlzLmdldENsYXNzKHRoaXMuY2xhc3Nlcy5IQVNfTElTVCkpKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxMaXN0ID0gdGFyZ2V0LmNsb3Nlc3QoXG4gICAgICAgICAgICAgIHRoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLkhBU19MSVNUKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IHNlbE9wdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgIGAuJHt0aGlzLmNsYXNzZXMuU0VMRUNUfVtkYXRhLXNlbC1pZD1cIiR7c2VsTGlzdC5kYXRhc2V0LnNlbElkfVwiXSAuc2VsZWN0X19vcHRpb25bZGF0YS1vcHQtdmFsPVwiJHtzZWxMaXN0LmRhdGFzZXQub3B0VmFsfVwiXWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbkFjdGlvbihzZWxlY3QsIHJlbGF0aXZlU2VsLCBzZWxPcHRpb24pO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsb3Nlc3QodGhpcy5nZXRDbGFzcyh0aGlzLmNsYXNzZXMuVElUTEUpKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRBY3Rpb24oc2VsZWN0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbG9zZXN0KHRoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLk9QVElPTikpKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxPcHRpb24gPSB0YXJnZXQuY2xvc2VzdChcbiAgICAgICAgICAgICAgdGhpcy5nZXRDbGFzcyh0aGlzLmNsYXNzZXMuT1BUSU9OKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9uQWN0aW9uKHNlbGVjdCwgcmVsYXRpdmVTZWwsIHNlbE9wdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdmb2N1c2luJyB8fCB0eXBlID09PSAnZm9jdXNvdXQnKSB7XG4gICAgICAgIGlmICh0YXJnZXQuY2xvc2VzdCh0aGlzLmdldENsYXNzKHRoaXMuY2xhc3Nlcy5TRUxFQ1QpKSkge1xuICAgICAgICAgIGlmICh0eXBlID09PSAnZm9jdXNpbicpIHtcbiAgICAgICAgICAgIHNlbGVjdC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5JU19GT0NVU0VEKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLklTX0ZPQ1VTRUQpO1xuICAgICAgICAgICAgaWYgKHJlbGF0aXZlU2VsLmhhc0F0dHJpYnV0ZSgnZGF0YS12YWxpZGF0ZScpKSB7XG4gICAgICAgICAgICAgIGlmICghc2VsZWN0LmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmNsYXNzZXMuSVNfRklMTEVEKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyKHJlbGF0aXZlU2VsLCBzZWxlY3QpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRXJyKHJlbGF0aXZlU2VsLCBzZWxlY3QpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdrZXlkb3duJyAmJiBlLmNvZGUgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgIHRoaXMuY2xvc2VHcm91cCgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsb3NlR3JvdXAoKTtcbiAgICB9XG4gIH1cbiAgLy8gc2V0IHNpbmdsZSBzZWxlY3QgYWN0aW9uXG4gIHNldEFjdGlvbihzZWxlY3QpIHtcbiAgICBjb25zdCByZWxhdGl2ZVNlbCA9IHRoaXMuZ2V0U2VsZWN0KHNlbGVjdCkucmVsYXRpdmVTZWw7XG4gICAgY29uc3Qgc2VsT3B0aW9ucyA9IHRoaXMuZ2V0U2VsZWN0KHNlbGVjdCwgdGhpcy5jbGFzc2VzLk9QVElPTlMpLnR3aW5TZWw7XG5cbiAgICBpZiAocmVsYXRpdmVTZWwuY2xvc2VzdCgnW2RhdGEtb25lLXNlbGVjdF0nKSkge1xuICAgICAgY29uc3Qgc2VsZWN0T25lR3JvdXAgPSByZWxhdGl2ZVNlbC5jbG9zZXN0KCdbZGF0YS1vbmUtc2VsZWN0XScpO1xuICAgICAgdGhpcy5jbG9zZUdyb3VwKHNlbGVjdE9uZUdyb3VwLCByZWxhdGl2ZVNlbCk7XG4gICAgfVxuXG4gICAgaWYgKCFzZWxPcHRpb25zLmNsYXNzTGlzdC5jb250YWlucygnX3NsaWRlJykpIHtcbiAgICAgIHNlbGVjdC5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuY2xhc3Nlcy5JU19PUEVORUQpO1xuICAgICAgaWYgKCFyZWxhdGl2ZVNlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbm8tc2xpZGUnKSlcbiAgICAgICAgX3NsaWRlVG9nZ2xlKHNlbE9wdGlvbnMsIHJlbGF0aXZlU2VsLmRhdGFzZXQuc3BlZWQpO1xuICAgICAgaWYgKFxuICAgICAgICBzZWxlY3QuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuY2xhc3Nlcy5JU19PUEVORUQpICYmXG4gICAgICAgIHJlbGF0aXZlU2VsLmhhc0F0dHJpYnV0ZSgnZGF0YS12YWxpZGF0ZScpICYmXG4gICAgICAgIHNlbGVjdC5jbGFzc0xpc3QuY29udGFpbnModGhpcy5jbGFzc2VzLkhBU19FUlJPUilcbiAgICAgICkge1xuICAgICAgICB0aGlzLnJlbW92ZUVycihyZWxhdGl2ZVNlbCwgc2VsZWN0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy8gY2xvc2Ugc2luZ2xlIHNlbGVjdCBncm91cFxuICBjbG9zZUdyb3VwKGdyb3VwLCBzZWxlY3QpIHtcbiAgICBjb25zdCBzZWxHcm91cCA9IGdyb3VwID8gZ3JvdXAgOiBkb2N1bWVudDtcbiAgICBjb25zdCBzZWxlY3Rpb25zID0gc2VsR3JvdXAucXVlcnlTZWxlY3RvckFsbChcbiAgICAgIGAke3RoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLlNFTEVDVCl9JHt0aGlzLmdldENsYXNzKFxuICAgICAgICB0aGlzLmNsYXNzZXMuSVNfT1BFTkVEXG4gICAgICApfWBcbiAgICApO1xuICAgIGlmIChzZWxlY3Rpb25zLmxlbmd0aCkge1xuICAgICAgc2VsZWN0aW9ucy5mb3JFYWNoKHNlbGVjdGlvbiA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhc2VsZWN0IHx8XG4gICAgICAgICAgKHNlbGVjdCAmJiBzZWxlY3Rpb24uZGF0YXNldC5zZWxJZCAhPT0gc2VsZWN0LmRhdGFzZXQuc2VsSWQpXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2xvc2VJdGVtKHNlbGVjdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICAvLyBjbG9zZSBzaW5nbGUgc2VsZWN0IGl0ZW1cbiAgY2xvc2VJdGVtKHNlbGVjdCkge1xuICAgIGNvbnN0IHJlbGF0aXZlU2VsID0gdGhpcy5nZXRTZWxlY3Qoc2VsZWN0KS5yZWxhdGl2ZVNlbDtcbiAgICBjb25zdCBzZWxPcHRpb25zID0gdGhpcy5nZXRTZWxlY3Qoc2VsZWN0LCB0aGlzLmNsYXNzZXMuT1BUSU9OUykudHdpblNlbDtcblxuICAgIGlmICghc2VsT3B0aW9ucy5jbGFzc0xpc3QuY29udGFpbnMoJ19zbGlkZScpKSB7XG4gICAgICBzZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSVNfT1BFTkVEKTtcbiAgICAgIGlmICghcmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLW5vLXNsaWRlJykpXG4gICAgICAgIF9zbGlkZVVwKHNlbE9wdGlvbnMsIHJlbGF0aXZlU2VsLmRhdGFzZXQuc3BlZWQpO1xuICAgIH1cbiAgfVxuICAvLyBzZXQgc2luZ2xlIG9wdGlvbiBhY3Rpb25zXG4gIHNldE9wdGlvbkFjdGlvbihzZWxlY3QsIHJlbGF0aXZlU2VsLCBvcHRpb24pIHtcbiAgICBpZiAocmVsYXRpdmVTZWwubXVsdGlwbGUpIHtcbiAgICAgIG9wdGlvbi5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuY2xhc3Nlcy5JU19TRUxFQ1RFRCk7XG4gICAgICBjb25zdCByZWxhdGl2ZVNlbGVjdGlvbnMgPSB0aGlzLmdldERhdGEocmVsYXRpdmVTZWwpLmVsZW1lbnRzO1xuXG4gICAgICByZWxhdGl2ZVNlbGVjdGlvbnMuZm9yRWFjaChyZWxhdGl2ZVNlbGVjdGlvbiA9PiB7XG4gICAgICAgIHJlbGF0aXZlU2VsZWN0aW9uLnJlbW92ZUF0dHJpYnV0ZSgnc2VsZWN0ZWQnKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCB0d2luU2VsZWN0aW9ucyA9IHNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICB0aGlzLmdldENsYXNzKHRoaXMuY2xhc3Nlcy5JU19TRUxFQ1RFRClcbiAgICAgICk7XG4gICAgICB0d2luU2VsZWN0aW9ucy5mb3JFYWNoKHR3aW5TZWxlY3Rpb24gPT4ge1xuICAgICAgICByZWxhdGl2ZVNlbFxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGBvcHRpb25bdmFsdWU9XCIke3R3aW5TZWxlY3Rpb24uZGF0YXNldC5vcHRWYWx9XCJdYClcbiAgICAgICAgICAuc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICdzZWxlY3RlZCcpO1xuICAgICAgfSk7XG4gICAgICBpZiAoIW9wdGlvbi5jbGFzc0xpc3QuY29udGFpbnModGhpcy5jbGFzc2VzLklTX1NFTEVDVEVEKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICByZWxhdGl2ZVNlbC5xdWVyeVNlbGVjdG9yKGBvcHRpb25bdmFsdWU9XCIke29wdGlvbi5kYXRhc2V0Lm9wdFZhbH1cIl1gKVxuICAgICAgICApO1xuICAgICAgICByZWxhdGl2ZVNlbFxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGBvcHRpb25bdmFsdWU9XCIke29wdGlvbi5kYXRhc2V0Lm9wdFZhbH1cIl1gKVxuICAgICAgICAgIC5yZW1vdmVBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGVjdFxuICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnLnNlbGVjdF9fb3B0aW9uJylcbiAgICAgICAgLmZvckVhY2gob3B0ID0+IG9wdC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5JU19TRUxFQ1RFRCkpO1xuICAgICAgb3B0aW9uLmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLklTX1NFTEVDVEVEKTtcbiAgICAgIGlmICghcmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNob3ctc2VsZWN0aW9uJykpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHNlbGVjdC5xdWVyeVNlbGVjdG9yKGAke3RoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLk9QVElPTil9W2hpZGRlbl1gKVxuICAgICAgICApIHtcbiAgICAgICAgICBzZWxlY3QucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGAke3RoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLk9QVElPTil9W2hpZGRlbl1gXG4gICAgICAgICAgKS5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb24uaGlkZGVuID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJlbGF0aXZlU2VsLnZhbHVlID0gb3B0aW9uLmhhc0F0dHJpYnV0ZSgnZGF0YS1vcHQtdmFsJylcbiAgICAgICAgPyBvcHRpb24uZGF0YXNldC5vcHRWYWxcbiAgICAgICAgOiBvcHRpb24udGV4dENvbnRlbnQ7XG4gICAgICB0aGlzLnNldEFjdGlvbihzZWxlY3QpO1xuICAgIH1cbiAgICB0aGlzLnNldFZhbHVlKHNlbGVjdCwgcmVsYXRpdmVTZWwpO1xuICAgIHRoaXMuc2V0U2VsZWN0aW9ucyhyZWxhdGl2ZVNlbCk7XG4gIH1cbiAgLy8gc2V0IHNlYXJjaCBhY3Rpb25zXG4gIHNldFNlYXJjaEFjdGlvbnMoc2VsZWN0KSB7XG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuICAgIGNvbnN0IHNlbElucHV0ID0gdGhpcy5nZXRTZWxlY3Qoc2VsZWN0LCB0aGlzLmNsYXNzZXMuSU5QVVQpLnR3aW5TZWw7XG4gICAgY29uc3Qgc2VsT3B0aW9ucyA9IHRoaXMuZ2V0U2VsZWN0KFxuICAgICAgc2VsZWN0LFxuICAgICAgdGhpcy5jbGFzc2VzLk9QVElPTlNcbiAgICApLnR3aW5TZWwucXVlcnlTZWxlY3RvckFsbChgLiR7dGhpcy5jbGFzc2VzLk9QVElPTn1gKTtcblxuICAgIHNlbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsT3B0aW9ucy5mb3JFYWNoKHNlbE9wdGlvbiA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzZWxPcHRpb24udGV4dENvbnRlbnRcbiAgICAgICAgICAgIC50b1VwcGVyQ2FzZSgpXG4gICAgICAgICAgICAuaW5kZXhPZihzZWxJbnB1dC52YWx1ZS50b1VwcGVyQ2FzZSgpKSA+PSAwXG4gICAgICAgICkge1xuICAgICAgICAgIHNlbE9wdGlvbi5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWxPcHRpb24uaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzZWxPcHRpb25zLmhpZGRlbiA9PT0gdHJ1ZSA/IF90aGlzLnNldEFjdGlvbihzZWxlY3QpIDogbnVsbDtcbiAgICB9KTtcbiAgfVxuICAvLyBzZXQgc2VsZWN0IHN1YnRpdGxlXG4gIHNldFN1YnRpdGxlKHJlbGF0aXZlU2VsKSB7fVxuXG4gIC8vIHZhbGlkYXRpb24gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIGFkZCBhbiBlcnJvciB0byBhIHNlbGVjdFxuICBhZGRFcnIocmVsYXRpdmVTZWwsIHNlbGVjdCkge1xuICAgIHNlbGVjdC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5IQVNfRVJST1IpO1xuXG4gICAgaWYgKHJlbGF0aXZlU2VsLmRhdGFzZXQuc2VsRXJyb3IgJiYgIXJlbGF0aXZlU2VsLmRhdGFzZXQuc2VsSGludCkge1xuICAgICAgcmVsYXRpdmVTZWwucGFyZW50RWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAgICdiZWZvcmVlbmQnLFxuICAgICAgICBgPGRpdiBjbGFzcz1cInNlbGVjdF9faGludFwiPiR7cmVsYXRpdmVTZWwuZGF0YXNldC5zZWxFcnJvcn08L2Rpdj5gXG4gICAgICApO1xuICAgIH1cbiAgfVxuICAvLyByZW1vdmUgYW4gZXJyb3IgZnJvbSBhIHNlbGVjdFxuICByZW1vdmVFcnIocmVsYXRpdmVTZWwsIHNlbGVjdCkge1xuICAgIGlmIChzZWxlY3QuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuY2xhc3Nlcy5IQVNfRVJST1IpKSB7XG4gICAgICBzZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSEFTX0VSUk9SKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgcmVsYXRpdmVTZWwucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0X19oaW50JykgJiZcbiAgICAgICFyZWxhdGl2ZVNlbC5kYXRhc2V0LnNlbEhpbnRcbiAgICApIHtcbiAgICAgIHJlbGF0aXZlU2VsLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoXG4gICAgICAgIHJlbGF0aXZlU2VsLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdF9faGludCcpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8vIHV0aWxzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIGdldCBjdXN0b20gY2xhc3NcbiAgZ2V0Q2xhc3MoY3NzQ2xhc3MpIHtcbiAgICByZXR1cm4gYC4ke2Nzc0NsYXNzfWA7XG4gIH1cbiAgLy8gZ2V0IHNpbmdsZSBzZWxlY3QgaXRlbVxuICBnZXRTZWxlY3Qoc2VsZWN0LCBjc3NDbGFzcykge1xuICAgIHJldHVybiB7XG4gICAgICByZWxhdGl2ZVNlbDogc2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdCcpLFxuICAgICAgdHdpblNlbDogc2VsZWN0LnF1ZXJ5U2VsZWN0b3IodGhpcy5nZXRDbGFzcyhjc3NDbGFzcykpLFxuICAgIH07XG4gIH1cbiAgLy8gZ2V0IHNlbGVjdGVkIGl0ZW0gdmFsdWVcbiAgZ2V0VmFsdWUoc2VsZWN0LCByZWxhdGl2ZVNlbCkge1xuICAgIGxldCBhdHRyLFxuICAgICAgYXR0ckNsYXNzLFxuICAgICAgdGl0bGVWYWwgPSB0aGlzLmdldERhdGEocmVsYXRpdmVTZWwsIDIpLmh0bWw7XG5cbiAgICAvLyBzZXQgdGl0bGUgdmFsdWVcbiAgICB0aXRsZVZhbCA9IHRpdGxlVmFsLmxlbmd0aFxuICAgICAgPyB0aXRsZVZhbFxuICAgICAgOiByZWxhdGl2ZVNlbC5kYXRhc2V0LnNlbExhYmVsXG4gICAgICA/IHJlbGF0aXZlU2VsLmRhdGFzZXQuc2VsTGFiZWxcbiAgICAgIDogJyc7XG5cbiAgICAvLyBzZXQgYWN0aXZlIGNsYXNzIHRvIHNlbGVjdCBpZiBpdCBjb250YWlucyBhbnkgdmFsdWVzXG4gICAgaWYgKHRoaXMuZ2V0RGF0YShyZWxhdGl2ZVNlbCkudmFsdWVzLmxlbmd0aCkge1xuICAgICAgc2VsZWN0LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLklTX0FDVElWRSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5JU19BQ1RJVkUpO1xuICAgIH1cblxuICAgIC8vIHNldCBzZWxlY3QgbGFiZWxcbiAgICBpZiAocmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNlbC1sYWJlbCcpKSB7XG4gICAgICBhdHRyID0gcmVsYXRpdmVTZWwuZGF0YXNldC5zZWxMYWJlbFxuICAgICAgICA/IGAgZGF0YS1zZWwtbGFiZWw9XCIke3JlbGF0aXZlU2VsLmRhdGFzZXQuc2VsTGFiZWx9XCJgXG4gICAgICAgIDogYCBkYXRhLXNlbC1sYWJlbD1cItCS0YvQsdC+0YBcImA7XG4gICAgICBhdHRyQ2xhc3MgPSBgICR7dGhpcy5jbGFzc2VzLkhBU19MQUJFTH1gO1xuICAgIH1cblxuICAgIC8vIHB1c2ggc2VsZWN0aW9ucyB0byB0aGUgbGlzdCBpbnNpZGUgb2Ygc2VsZWN0IHRpdGxlXG4gICAgaWYgKHJlbGF0aXZlU2VsLm11bHRpcGxlICYmIHJlbGF0aXZlU2VsLmhhc0F0dHJpYnV0ZSgnZGF0YS1zZWwtbGlzdCcpKSB7XG4gICAgICB0aXRsZVZhbCA9IHRoaXMuZ2V0RGF0YShyZWxhdGl2ZVNlbClcbiAgICAgICAgLmVsZW1lbnRzLm1hcChcbiAgICAgICAgICBvcHRpb24gPT5cbiAgICAgICAgICAgIGA8c3BhbiBkYXRhLW9wdC1pZD1cIiR7c2VsZWN0LmRhdGFzZXQuc2VsSWR9XCIgZGF0YS1vcHQtdmFsPVwiJHtcbiAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlXG4gICAgICAgICAgICB9XCIgY2xhc3M9XCJfbGlzdC1pdGVtXCI+JHt0aGlzLmdldENvbnRlbnQob3B0aW9uKX08L3NwYW4+YFxuICAgICAgICApXG4gICAgICAgIC5qb2luKCcnKTtcblxuICAgICAgaWYgKFxuICAgICAgICByZWxhdGl2ZVNlbC5kYXRhc2V0Lmxpc3QgJiZcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihyZWxhdGl2ZVNlbC5kYXRhc2V0Lmxpc3QpXG4gICAgICApIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihyZWxhdGl2ZVNlbC5kYXRhc2V0Lmxpc3QpLmlubmVySFRNTCA9IHRpdGxlVmFsO1xuICAgICAgICBpZiAocmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNlbC1zZWFyY2gnKSkgdGl0bGVWYWwgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpbml0IHNlbGVjdCBzZWFyY2hcbiAgICBpZiAocmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNlbC1zZWFyY2gnKSkge1xuICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiJHt0aGlzLmNsYXNzZXMuVElUTEV9XCI+PHNwYW4gJHthdHRyfSBjbGFzcz1cIiR7dGhpcy5jbGFzc2VzLlZBTFVFVUV9XCI+PGlucHV0IGF1dG9jb21wbGV0ZT1cIm9mZlwiIHR5cGU9XCJzZWFyY2hcIiBwbGFjZWhvbGRlcj1cIiR7dGl0bGVWYWx9XCIgZGF0YS1wbGFjZWhvbGRlcj1cIiR7dGl0bGVWYWx9XCIgY2xhc3M9XCIke3RoaXMuY2xhc3Nlcy5JTlBVVH1cIj48L3NwYW4+PC9kaXY+YDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY3VzdG9tQ2xhc3MgPVxuICAgICAgICB0aGlzLmdldERhdGEocmVsYXRpdmVTZWwpLmVsZW1lbnRzLmxlbmd0aCAmJlxuICAgICAgICB0aGlzLmdldERhdGEocmVsYXRpdmVTZWwpLmVsZW1lbnRzWzBdLmRhdGFzZXQub3B0Q2xhc3NcbiAgICAgICAgICA/IGAgJHt0aGlzLmdldERhdGEocmVsYXRpdmVTZWwpLmVsZW1lbnRzWzBdLmRhdGFzZXQub3B0Q2xhc3N9YFxuICAgICAgICAgIDogJyc7XG4gICAgICByZXR1cm4gYDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiJHt0aGlzLmNsYXNzZXMuVElUTEV9XCI+PHNwYW4gJHtcbiAgICAgICAgYXR0ciA/IGF0dHIgOiAnJ1xuICAgICAgfSBjbGFzcz1cIiR7dGhpcy5jbGFzc2VzLlZBTFVFfSAke1xuICAgICAgICBhdHRyQ2xhc3MgPyBhdHRyQ2xhc3MgOiAnJ1xuICAgICAgfVwiPjxzcGFuIGNsYXNzPVwiJHtcbiAgICAgICAgdGhpcy5jbGFzc2VzLkNPTlRFTlRcbiAgICAgIH0ke2N1c3RvbUNsYXNzfVwiPiR7dGl0bGVWYWx9PC9zcGFuPjwvc3Bhbj48L2J1dHRvbj5gO1xuICAgIH1cbiAgfVxuICAvLyBnZXQgb3B0aW9uc1xuICBnZXRPcHRpb25zKHJlbGF0aXZlU2VsKSB7XG4gICAgY29uc3Qgc2VsU2Nyb2xsID0gcmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNlbC1zY3JvbGwnKVxuICAgICAgPyBgZGF0YS1zaW1wbGViYXJgXG4gICAgICA6ICcnO1xuICAgIGNvbnN0IGRhdGEgPSBzZWxTY3JvbGxcbiAgICAgID8gcmVsYXRpdmVTZWwuZGF0YXNldC5zZWxTY3JvbGwudHJpbSgpLnNwbGl0KCcsJylcbiAgICAgIDogbnVsbDtcbiAgICBsZXQgc2VsU2Nyb2xsSGVpZ2h0ID1cbiAgICAgIHJlbGF0aXZlU2VsLmRhdGFzZXQuc2VsU2Nyb2xsICYmIGRhdGFcbiAgICAgICAgPyBgc3R5bGU9XCJtYXgtaGVpZ2h0OiR7d2luZG93LmlubmVyV2lkdGggPiA3NjggPyBkYXRhWzBdIDogZGF0YVsxXX1yZW1cImBcbiAgICAgICAgOiAnJztcbiAgICBsZXQgc2VsT3B0aW9ucyA9IEFycmF5LmZyb20ocmVsYXRpdmVTZWwub3B0aW9ucyk7XG5cbiAgICBpZiAoc2VsT3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgIGxldCBzZWxPcHRpb25zSFRNTCA9IGBgO1xuXG4gICAgICBpZiAoXG4gICAgICAgICh0aGlzLmdldFBsYWNlaG9sZGVyKHJlbGF0aXZlU2VsKSAmJlxuICAgICAgICAgICF0aGlzLmdldFBsYWNlaG9sZGVyKHJlbGF0aXZlU2VsKS5zaG93KSB8fFxuICAgICAgICByZWxhdGl2ZVNlbC5tdWx0aXBsZVxuICAgICAgKSB7XG4gICAgICAgIHNlbE9wdGlvbnMgPSBzZWxPcHRpb25zLmZpbHRlcihvcHRpb24gPT4gb3B0aW9uLnZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHNlbE9wdGlvbnNIVE1MICs9IHNlbFNjcm9sbFxuICAgICAgICA/IGA8ZGl2ICR7c2VsU2Nyb2xsfSAke3NlbFNjcm9sbEhlaWdodH0gZGF0YS1zZWwtc2Nyb2xsPVwiJHtyZWxhdGl2ZVNlbC5kYXRhc2V0LnNlbFNjcm9sbH1cIiBjbGFzcz1cIiR7dGhpcy5jbGFzc2VzLlNDUk9MTH1cIj5gXG4gICAgICAgIDogJyc7XG4gICAgICBzZWxPcHRpb25zLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgICAgc2VsT3B0aW9uc0hUTUwgKz0gdGhpcy5nZXRPcHRpb24ob3B0aW9uLCByZWxhdGl2ZVNlbCk7XG4gICAgICB9KTtcbiAgICAgIHNlbE9wdGlvbnNIVE1MICs9IHNlbFNjcm9sbCA/IGA8L2Rpdj5gIDogJyc7XG4gICAgICByZXR1cm4gc2VsT3B0aW9uc0hUTUw7XG4gICAgfVxuICB9XG4gIC8vIGdldCBvcHRpb25cbiAgZ2V0T3B0aW9uKG9wdGlvbiwgcmVsYXRpdmVTZWwpIHtcbiAgICBjb25zdCBzZWxlY3Rpb25zID1cbiAgICAgIG9wdGlvbi5zZWxlY3RlZCAmJiByZWxhdGl2ZVNlbC5tdWx0aXBsZVxuICAgICAgICA/IGAgJHt0aGlzLmNsYXNzZXMuSVNfU0VMRUNURUR9YFxuICAgICAgICA6ICcnO1xuICAgIGNvbnN0IHNob3dTZWxlY3Rpb24gPVxuICAgICAgb3B0aW9uLnNlbGVjdGVkICYmXG4gICAgICAhcmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNob3ctc2VsZWN0aW9uJykgJiZcbiAgICAgICFyZWxhdGl2ZVNlbC5tdWx0aXBsZVxuICAgICAgICA/IGBoaWRkZW5gXG4gICAgICAgIDogYGA7XG4gICAgY29uc3Qgb3B0aW9uQ2xhc3MgPSBvcHRpb24uZGF0YXNldC5vcHRDbGFzc1xuICAgICAgPyBgICR7b3B0aW9uLmRhdGFzZXQub3B0Q2xhc3N9YFxuICAgICAgOiAnJztcbiAgICBjb25zdCBvcHRpb25MaW5rID0gb3B0aW9uLmRhdGFzZXQub3B0aW9uTGlua1xuICAgICAgPyBvcHRpb24uZGF0YXNldC5vcHRpb25MaW5rXG4gICAgICA6IGZhbHNlO1xuICAgIGNvbnN0IG9wdGlvbkxpbmtUYXJnZXQgPSBvcHRpb24uaGFzQXR0cmlidXRlKCdkYXRhLW9wdGlvbi1saW5rLXRhcmdldCcpXG4gICAgICA/IGB0YXJnZXQ9XCJfYmxhbmtcImBcbiAgICAgIDogJyc7XG4gICAgbGV0IG9wdGlvbkhUTUwgPSBgYDtcblxuICAgIG9wdGlvbkhUTUwgKz0gb3B0aW9uTGlua1xuICAgICAgPyBgPGEgJHtvcHRpb25MaW5rVGFyZ2V0fSAke3Nob3dTZWxlY3Rpb259IGhyZWY9XCIke29wdGlvbkxpbmt9XCIgZGF0YS1vcHQtdmFsPVwiJHtvcHRpb24udmFsdWV9XCIgY2xhc3M9XCIke3RoaXMuY2xhc3Nlcy5PUFRJT059JHtvcHRpb25DbGFzc30ke3NlbGVjdGlvbnN9XCI+YFxuICAgICAgOiBgPGJ1dHRvbiAke3Nob3dTZWxlY3Rpb259IGNsYXNzPVwiJHt0aGlzLmNsYXNzZXMuT1BUSU9OfSR7b3B0aW9uQ2xhc3N9JHtzZWxlY3Rpb25zfVwiIGRhdGEtb3B0LXZhbD1cIiR7b3B0aW9uLnZhbHVlfVwiIHR5cGU9XCJidXR0b25cIj5gO1xuICAgIG9wdGlvbkhUTUwgKz0gdGhpcy5nZXRDb250ZW50KG9wdGlvbik7XG4gICAgb3B0aW9uSFRNTCArPSBvcHRpb25MaW5rID8gYDwvYT5gIDogYDwvYnV0dG9uPmA7XG4gICAgcmV0dXJuIG9wdGlvbkhUTUw7XG4gIH1cbiAgLy8gZ2V0IHNlbGVjdCBjb250ZW50XG4gIGdldENvbnRlbnQob3B0aW9uKSB7XG4gICAgY29uc3Qgb3B0aW9uRGF0YSA9IG9wdGlvbi5kYXRhc2V0Lm9wdEFzc2V0XG4gICAgICA/IGAke29wdGlvbi5kYXRhc2V0Lm9wdEFzc2V0fWBcbiAgICAgIDogJyc7XG4gICAgY29uc3Qgb3B0aW9uRGF0YUhUTUwgPVxuICAgICAgb3B0aW9uRGF0YS5pbmRleE9mKCdpbWcnKSA+PSAwXG4gICAgICAgID8gYDxpbWcgc3JjPVwiJHtvcHRpb25EYXRhfVwiIGFsdD1cIlwiPmBcbiAgICAgICAgOiBvcHRpb25EYXRhO1xuICAgIGxldCBvcHRpb25Db250ZW50SFRNTCA9IGBgO1xuXG4gICAgb3B0aW9uQ29udGVudEhUTUwgKz0gb3B0aW9uRGF0YVxuICAgICAgPyBgPHNwYW4gY2xhc3M9XCIke3RoaXMuY2xhc3Nlcy5HUk9VUH1cIj5gXG4gICAgICA6ICcnO1xuICAgIG9wdGlvbkNvbnRlbnRIVE1MICs9IG9wdGlvbkRhdGFcbiAgICAgID8gYDxzcGFuIGNsYXNzPVwiJHt0aGlzLmNsYXNzZXMuQVNTRVR9XCI+YFxuICAgICAgOiAnJztcbiAgICBvcHRpb25Db250ZW50SFRNTCArPSBvcHRpb25EYXRhID8gb3B0aW9uRGF0YUhUTUwgOiAnJztcbiAgICBvcHRpb25Db250ZW50SFRNTCArPSBvcHRpb25EYXRhID8gYDwvc3Bhbj5gIDogJyc7XG4gICAgb3B0aW9uQ29udGVudEhUTUwgKz0gb3B0aW9uRGF0YSA/IGA8c3BhbiBjbGFzcz1cIiR7dGhpcy5jbGFzc2VzLlRYVH1cIj5gIDogJyc7XG4gICAgb3B0aW9uQ29udGVudEhUTUwgKz0gb3B0aW9uLnRleHRDb250ZW50O1xuICAgIG9wdGlvbkNvbnRlbnRIVE1MICs9IG9wdGlvbkRhdGEgPyBgPC9zcGFuPmAgOiAnJztcbiAgICBvcHRpb25Db250ZW50SFRNTCArPSBvcHRpb25EYXRhID8gYDwvc3Bhbj5gIDogJyc7XG4gICAgcmV0dXJuIG9wdGlvbkNvbnRlbnRIVE1MO1xuICB9XG4gIC8vIGdldCBzZWxlY3QgcGxhY2Vob2xkZXJcbiAgZ2V0UGxhY2Vob2xkZXIocmVsYXRpdmVTZWwpIHtcbiAgICBjb25zdCBwbGFjZWhvbGRlciA9IEFycmF5LmZyb20ocmVsYXRpdmVTZWwub3B0aW9ucykuZmluZChcbiAgICAgIG9wdGlvbiA9PiAhb3B0aW9uLnZhbHVlXG4gICAgKTtcblxuICAgIGlmIChwbGFjZWhvbGRlcikge1xuICAgICAgcGxhY2Vob2xkZXIuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzZXMuc3VidGl0bGUpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IHBsYWNlaG9sZGVyLnRleHRDb250ZW50LFxuICAgICAgICBzaG93OiBwbGFjZWhvbGRlci5oYXNBdHRyaWJ1dGUoJ2RhdGEtc2VsLXBoLXNob3cnKSxcbiAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICBzaG93OiBwbGFjZWhvbGRlci5oYXNBdHRyaWJ1dGUoJ2RhdGEtc2VsLXBoJyksXG4gICAgICAgICAgdGV4dDogcGxhY2Vob2xkZXIuZGF0YXNldC5vcHRQbGFjZWhvbGRlcixcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIC8vIGdldCBzZWxlY3RlZCBvcHRpb25zIGRhdGFcbiAgZ2V0RGF0YShyZWxhdGl2ZVNlbCkge1xuICAgIGxldCBzZWxlY3Rpb25zID0gW107XG5cbiAgICBpZiAocmVsYXRpdmVTZWwubXVsdGlwbGUpIHtcbiAgICAgIHNlbGVjdGlvbnMgPSBBcnJheS5mcm9tKHJlbGF0aXZlU2VsLm9wdGlvbnMpXG4gICAgICAgIC5maWx0ZXIob3B0aW9uID0+IG9wdGlvbi52YWx1ZSlcbiAgICAgICAgLmZpbHRlcihvcHRpb24gPT4gb3B0aW9uLnNlbGVjdGVkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZWN0aW9ucy5wdXNoKHJlbGF0aXZlU2VsLm9wdGlvbnNbcmVsYXRpdmVTZWwuc2VsZWN0ZWRJbmRleF0pO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgZWxlbWVudHM6IHNlbGVjdGlvbnMubWFwKG9wdGlvbiA9PiBvcHRpb24pLFxuICAgICAgdmFsdWVzOiBzZWxlY3Rpb25zXG4gICAgICAgIC5maWx0ZXIob3B0aW9uID0+IG9wdGlvbi52YWx1ZSlcbiAgICAgICAgLm1hcChvcHRpb24gPT4gb3B0aW9uLnZhbHVlKSxcbiAgICAgIGh0bWw6IHNlbGVjdGlvbnMubWFwKG9wdGlvbiA9PiB0aGlzLmdldENvbnRlbnQob3B0aW9uKSksXG4gICAgfTtcbiAgfVxuXG4gIC8vIHNlbGVjdGlvbnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIGluaXQgc2VsZWN0aW9uc1xuICBpbml0U2VsZWN0aW9ucyhlKSB7XG4gICAgY29uc3QgcmVsYXRpdmVTZWwgPSBlLnRhcmdldDtcblxuICAgIHRoaXMuYnVpbGQocmVsYXRpdmVTZWwpO1xuICAgIHRoaXMuc2V0U2VsZWN0aW9ucyhyZWxhdGl2ZVNlbCk7XG4gIH1cbiAgLy8gc2V0IHNlbGVjdGlvbnNcbiAgc2V0U2VsZWN0aW9ucyhyZWxhdGl2ZVNlbCkge1xuICAgIGNvbnN0IHNlbGVjdCA9IHJlbGF0aXZlU2VsLnBhcmVudEVsZW1lbnQ7XG5cbiAgICBpZiAocmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXN1Ym1pdCcpICYmIHJlbGF0aXZlU2VsLnZhbHVlKSB7XG4gICAgICBsZXQgdGVtcEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgdGVtcEJ1dHRvbi50eXBlID0gJ3N1Ym1pdCc7XG4gICAgICByZWxhdGl2ZVNlbC5jbG9zZXN0KCdmb3JtJykuYXBwZW5kKHRlbXBCdXR0b24pO1xuICAgICAgdGVtcEJ1dHRvbi5jbGljaygpO1xuICAgICAgdGVtcEJ1dHRvbi5yZW1vdmUoKTtcbiAgICB9XG4gICAgcmVsYXRpdmVTZWwucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5JU19GSUxMRUQpO1xuICAgIHRoaXMuc2VsZWN0aW9uKHNlbGVjdCwgcmVsYXRpdmVTZWwpO1xuICB9XG4gIC8vIGN1c3RvbSBzZWxlY3QgZXZlbnQgKGxpc3RlbiB0byBhbnkgc2VsZWN0aW9ucyAvIG11dGF0aW9ucylcbiAgc2VsZWN0aW9uKHNlbGVjdCwgcmVsYXRpdmVTZWwpIHtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzZWxlY3Rpb24nLCB7XG4gICAgICAgIGRldGFpbDoge1xuICAgICAgICAgIHNlbGVjdDogcmVsYXRpdmVTZWwsXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cblxubmV3IFNlbGVjdCh7fSk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zaW1wbGViYXJdJykubGVuZ3RoKSB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNpbXBsZWJhcl0nKS5mb3JFYWNoKHNjcm9sbEJsb2NrID0+IHtcbiAgICBuZXcgU2ltcGxlQmFyKHNjcm9sbEJsb2NrLCB7XG4gICAgICBhdXRvSGlkZTogZmFsc2UsXG4gICAgfSk7XG4gIH0pO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIiwiaW1wb3J0IHsgc2V0SGFzaCwgZ2V0SGFzaCB9IGZyb20gJy4vdXRpbHMnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jbGFzcyBUYWJzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5hdHRycyA9IHtcbiAgICAgIFRBQlM6ICdkYXRhLXRhYnMnLFxuICAgICAgSU5ERVg6ICdkYXRhLXRhYnMtaW5kZXgnLFxuICAgICAgVElUTEVTOiAnZGF0YS10YWJzLXRpdGxlcycsXG4gICAgICBUSVRMRTogJ2RhdGEtdGFicy10aXRsZScsXG4gICAgICBUQUJfSVRFTTogJ2RhdGEtdGFicy1pdGVtJyxcbiAgICAgIEJPRFk6ICdkYXRhLXRhYnMtYm9keScsXG4gICAgICBIQVNIOiAnZGF0YS10YWJzLWhhc2gnLFxuICAgIH07XG4gICAgdGhpcy5jbGFzc2VzID0ge1xuICAgICAgSU5JVDogJ190YWJzLWluaXQnLFxuICAgICAgQUNUSVZFOiAnX2lzLWFjdGl2ZScsXG4gICAgICBNT0RBTDogJ21vZGFsJyxcbiAgICB9O1xuICAgIHRoaXMudGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLXRhYnNdYCk7XG4gICAgdGhpcy5hY3RpdmVIYXNoID0gW107XG5cbiAgICBpZiAodGhpcy50YWJzLmxlbmd0aCkge1xuICAgICAgY29uc3QgaGFzaCA9IGdldEhhc2goKTtcblxuICAgICAgaWYgKGhhc2ggJiYgaGFzaC5zdGFydHNXaXRoKCd0YWItJykpIHtcbiAgICAgICAgYWN0aXZlSGFzaCA9IGhhc2gucmVwbGFjZSgndGFiLScsICcnKS5zcGxpdCgnLScpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRhYnMuZm9yRWFjaCgodGFic0Jsb2NrLCBpbmRleCkgPT4ge1xuICAgICAgICB0YWJzQmxvY2suY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzZXMuSU5JVCk7XG4gICAgICAgIHRhYnNCbG9jay5zZXRBdHRyaWJ1dGUodGhpcy5hdHRycy5JTkRFWCwgaW5kZXgpO1xuICAgICAgICB0YWJzQmxvY2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnNldEFjdGlvbnMuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuaW5pdCh0YWJzQmxvY2spO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0U3RhdHVzKHRhYnNCbG9jaykge1xuICAgIGxldCB0aXRsZXMgPSB0YWJzQmxvY2sucXVlcnlTZWxlY3RvckFsbChgWyR7dGhpcy5hdHRycy5USVRMRX1dYCk7XG4gICAgbGV0IGNvbnRlbnQgPSB0YWJzQmxvY2sucXVlcnlTZWxlY3RvckFsbChgWyR7dGhpcy5hdHRycy5UQUJfSVRFTX1dYCk7XG4gICAgY29uc3QgaW5kZXggPSB0YWJzQmxvY2suZGF0YXNldC50YWJzSW5kZXg7XG5cbiAgICBpZiAoY29udGVudC5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGhhc0hhc2ggPSB0YWJzQmxvY2suaGFzQXR0cmlidXRlKHRoaXMuYXR0cnMuSEFTSCk7XG5cbiAgICAgIGNvbnRlbnQgPSBBcnJheS5mcm9tKGNvbnRlbnQpLmZpbHRlcihcbiAgICAgICAgaXRlbSA9PiBpdGVtLmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuVEFCU31dYCkgPT09IHRhYnNCbG9ja1xuICAgICAgKTtcblxuICAgICAgdGl0bGVzID0gQXJyYXkuZnJvbSh0aXRsZXMpLmZpbHRlcihcbiAgICAgICAgaXRlbSA9PiBpdGVtLmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuVEFCU31dYCkgPT09IHRhYnNCbG9ja1xuICAgICAgKTtcblxuICAgICAgY29udGVudC5mb3JFYWNoKChpdGVtLCBpbmR4KSA9PiB7XG4gICAgICAgIGlmICh0aXRsZXNbaW5keF0uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuY2xhc3Nlcy5BQ1RJVkUpKSB7XG4gICAgICAgICAgaXRlbS5oaWRkZW4gPSBmYWxzZTtcblxuICAgICAgICAgIGlmIChoYXNIYXNoICYmICFpdGVtLmNsb3Nlc3QoYC4ke3RoaXMuY2xhc3Nlcy5NT0RBTH1gKSkge1xuICAgICAgICAgICAgc2V0SGFzaChgdGFiLSR7aW5kZXh9LSR7aW5keH1gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbS5oaWRkZW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzZXRBY3Rpb25zKGUpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcblxuICAgIGlmICh0YXJnZXQuY2xvc2VzdChgWyR7dGhpcy5hdHRycy5USVRMRX1dYCkpIHtcbiAgICAgIGNvbnN0IHRpdGxlID0gdGFyZ2V0LmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuVElUTEV9XWApO1xuICAgICAgY29uc3QgdGFic0Jsb2NrID0gdGl0bGUuY2xvc2VzdChgWyR7dGhpcy5hdHRycy5UQUJTfV1gKTtcblxuICAgICAgaWYgKCF0aXRsZS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5jbGFzc2VzLkFDVElWRSkpIHtcbiAgICAgICAgbGV0IGFjdGl2ZVRpdGxlID0gdGFic0Jsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgYFske3RoaXMuYXR0cnMuVElUTEV9XS4ke3RoaXMuY2xhc3Nlcy5BQ1RJVkV9YFxuICAgICAgICApO1xuXG4gICAgICAgIGFjdGl2ZVRpdGxlLmxlbmd0aFxuICAgICAgICAgID8gKGFjdGl2ZVRpdGxlID0gQXJyYXkuZnJvbShhY3RpdmVUaXRsZSkuZmlsdGVyKFxuICAgICAgICAgICAgICBpdGVtID0+IGl0ZW0uY2xvc2VzdChgWyR7dGhpcy5hdHRycy5UQUJTfV1gKSA9PT0gdGFic0Jsb2NrXG4gICAgICAgICAgICApKVxuICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgYWN0aXZlVGl0bGUubGVuZ3RoXG4gICAgICAgICAgPyBhY3RpdmVUaXRsZVswXS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5BQ1RJVkUpXG4gICAgICAgICAgOiBudWxsO1xuICAgICAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5BQ1RJVkUpO1xuICAgICAgICB0aGlzLnNldFN0YXR1cyh0YWJzQmxvY2spO1xuICAgICAgfVxuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdCh0YWJzQmxvY2spIHtcbiAgICBsZXQgdGl0bGVzID0gdGFic0Jsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoYFske3RoaXMuYXR0cnMuVElUTEVTfV0+KmApO1xuICAgIGxldCBjb250ZW50ID0gdGFic0Jsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoYFske3RoaXMuYXR0cnMuQk9EWX1dPipgKTtcbiAgICBjb25zdCBpbmRleCA9IHRhYnNCbG9jay5kYXRhc2V0LnRhYnNJbmRleDtcbiAgICBjb25zdCBhY3RpdmVIYXNoQmxvY2sgPSB0aGlzLmFjdGl2ZUhhc2hbMF0gPT0gaW5kZXg7XG5cbiAgICBpZiAoYWN0aXZlSGFzaEJsb2NrKSB7XG4gICAgICBjb25zdCBhY3RpdmVUaXRsZSA9IHRhYnNCbG9jay5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgWyR7dGhpcy5hdHRycy5USVRMRVN9XT4uJHt0aGlzLmNsYXNzZXMuQUNUSVZFfWBcbiAgICAgICk7XG4gICAgICBhY3RpdmVUaXRsZSA/IGFjdGl2ZVRpdGxlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLkFDVElWRSkgOiBudWxsO1xuICAgIH1cblxuICAgIGlmIChjb250ZW50Lmxlbmd0aCkge1xuICAgICAgY29udGVudCA9IEFycmF5LmZyb20oY29udGVudCkuZmlsdGVyKFxuICAgICAgICBpdGVtID0+IGl0ZW0uY2xvc2VzdChgWyR7dGhpcy5hdHRycy5UQUJTfV1gKSA9PT0gdGFic0Jsb2NrXG4gICAgICApO1xuICAgICAgdGl0bGVzID0gQXJyYXkuZnJvbSh0aXRsZXMpLmZpbHRlcihcbiAgICAgICAgaXRlbSA9PiBpdGVtLmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuVEFCU31dYCkgPT09IHRhYnNCbG9ja1xuICAgICAgKTtcblxuICAgICAgY29udGVudC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICB0aXRsZXNbaW5kZXhdLnNldEF0dHJpYnV0ZSh0aGlzLmF0dHJzLlRJVExFLCAnJyk7XG4gICAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKHRoaXMuYXR0cnMuVEFCX0lURU0sICcnKTtcblxuICAgICAgICBpZiAoYWN0aXZlSGFzaEJsb2NrICYmIGluZGV4ID09IHRoaXMuYWN0aXZlSGFzaFsxXSkge1xuICAgICAgICAgIHRpdGxlc1tpbmRleF0uY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzZXMuQUNUSVZFKTtcbiAgICAgICAgfVxuICAgICAgICBpdGVtLmhpZGRlbiA9ICF0aXRsZXNbaW5kZXhdLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmNsYXNzZXMuQUNUSVZFKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5uZXcgVGFicygpO1xuXG4vLyBjb25zdCB0YWJzID0gKCkgPT4ge1xuLy8gICBjb25zdCB0YWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFic10nKTtcbi8vICAgbGV0IHRhYnNBY3RpdmVIYXNoID0gW107XG5cbi8vICAgY29uc3QgaW5pdCA9IHRhYnNCbG9jayA9PiB7XG4vLyAgICAgbGV0IHRhYnNUaXRsZXMgPSB0YWJzQmxvY2sucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFicy10aXRsZXNdPionKTtcbi8vICAgICBsZXQgdGFic0NvbnRlbnQgPSB0YWJzQmxvY2sucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFicy1ib2R5XT4qJyk7XG4vLyAgICAgY29uc3QgdGFic0Jsb2NrSW5kZXggPSB0YWJzQmxvY2suZGF0YXNldC50YWJzSW5kZXg7XG4vLyAgICAgY29uc3QgdGFic0FjdGl2ZUhhc2hCbG9jayA9IHRhYnNBY3RpdmVIYXNoWzBdID09IHRhYnNCbG9ja0luZGV4O1xuXG4vLyAgICAgaWYgKHRhYnNBY3RpdmVIYXNoQmxvY2spIHtcbi8vICAgICAgIGNvbnN0IHRhYnNBY3RpdmVUaXRsZSA9IHRhYnNCbG9jay5xdWVyeVNlbGVjdG9yKFxuLy8gICAgICAgICAnW2RhdGEtdGFicy10aXRsZXNdPi5fYWN0aXZlJ1xuLy8gICAgICAgKTtcbi8vICAgICAgIHRhYnNBY3RpdmVUaXRsZSA/IHRhYnNBY3RpdmVUaXRsZS5jbGFzc0xpc3QucmVtb3ZlKCdfYWN0aXZlJykgOiBudWxsO1xuLy8gICAgIH1cbi8vICAgICBpZiAodGFic0NvbnRlbnQubGVuZ3RoKSB7XG4vLyAgICAgICB0YWJzQ29udGVudCA9IEFycmF5LmZyb20odGFic0NvbnRlbnQpLmZpbHRlcihcbi8vICAgICAgICAgaXRlbSA9PiBpdGVtLmNsb3Nlc3QoJ1tkYXRhLXRhYnNdJykgPT09IHRhYnNCbG9ja1xuLy8gICAgICAgKTtcbi8vICAgICAgIHRhYnNUaXRsZXMgPSBBcnJheS5mcm9tKHRhYnNUaXRsZXMpLmZpbHRlcihcbi8vICAgICAgICAgaXRlbSA9PiBpdGVtLmNsb3Nlc3QoJ1tkYXRhLXRhYnNdJykgPT09IHRhYnNCbG9ja1xuLy8gICAgICAgKTtcbi8vICAgICAgIHRhYnNDb250ZW50LmZvckVhY2goKHRhYnNDb250ZW50SXRlbSwgaW5kZXgpID0+IHtcbi8vICAgICAgICAgdGFic1RpdGxlc1tpbmRleF0uc2V0QXR0cmlidXRlKCdkYXRhLXRhYnMtdGl0bGUnLCAnJyk7XG4vLyAgICAgICAgIHRhYnNDb250ZW50SXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFicy1pdGVtJywgJycpO1xuXG4vLyAgICAgICAgIGlmICh0YWJzQWN0aXZlSGFzaEJsb2NrICYmIGluZGV4ID09IHRhYnNBY3RpdmVIYXNoWzFdKSB7XG4vLyAgICAgICAgICAgdGFic1RpdGxlc1tpbmRleF0uY2xhc3NMaXN0LmFkZCgnX2FjdGl2ZScpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIHRhYnNDb250ZW50SXRlbS5oaWRkZW4gPVxuLy8gICAgICAgICAgICF0YWJzVGl0bGVzW2luZGV4XS5jbGFzc0xpc3QuY29udGFpbnMoJ19hY3RpdmUnKTtcbi8vICAgICAgIH0pO1xuLy8gICAgIH1cbi8vICAgfTtcbi8vICAgY29uc3Qgc2V0U3RhdHVzID0gdGFic0Jsb2NrID0+IHtcbi8vICAgICBsZXQgdGFic1RpdGxlcyA9IHRhYnNCbG9jay5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWJzLXRpdGxlXScpO1xuLy8gICAgIGxldCB0YWJzQ29udGVudCA9IHRhYnNCbG9jay5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWJzLWl0ZW1dJyk7XG4vLyAgICAgY29uc3QgdGFic0Jsb2NrSW5kZXggPSB0YWJzQmxvY2suZGF0YXNldC50YWJzSW5kZXg7XG4vLyAgICAgaWYgKHRhYnNDb250ZW50Lmxlbmd0aCkge1xuLy8gICAgICAgY29uc3QgaXNIYXNoID0gdGFic0Jsb2NrLmhhc0F0dHJpYnV0ZSgnZGF0YS10YWJzLWhhc2gnKTtcbi8vICAgICAgIHRhYnNDb250ZW50ID0gQXJyYXkuZnJvbSh0YWJzQ29udGVudCkuZmlsdGVyKFxuLy8gICAgICAgICBpdGVtID0+IGl0ZW0uY2xvc2VzdCgnW2RhdGEtdGFic10nKSA9PT0gdGFic0Jsb2NrXG4vLyAgICAgICApO1xuLy8gICAgICAgdGFic1RpdGxlcyA9IEFycmF5LmZyb20odGFic1RpdGxlcykuZmlsdGVyKFxuLy8gICAgICAgICBpdGVtID0+IGl0ZW0uY2xvc2VzdCgnW2RhdGEtdGFic10nKSA9PT0gdGFic0Jsb2NrXG4vLyAgICAgICApO1xuLy8gICAgICAgdGFic0NvbnRlbnQuZm9yRWFjaCgodGFic0NvbnRlbnRJdGVtLCBpbmRleCkgPT4ge1xuLy8gICAgICAgICBpZiAodGFic1RpdGxlc1tpbmRleF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdfYWN0aXZlJykpIHtcbi8vICAgICAgICAgICB0YWJzQ29udGVudEl0ZW0uaGlkZGVuID0gZmFsc2U7XG4vLyAgICAgICAgICAgaWYgKGlzSGFzaCAmJiAhdGFic0NvbnRlbnRJdGVtLmNsb3Nlc3QoJy5wb3B1cCcpKSB7XG4vLyAgICAgICAgICAgICBzZXRIYXNoKGB0YWItJHt0YWJzQmxvY2tJbmRleH0tJHtpbmRleH1gKTtcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgdGFic0NvbnRlbnRJdGVtLmhpZGRlbiA9IHRydWU7XG4vLyAgICAgICAgIH1cbi8vICAgICAgIH0pO1xuLy8gICAgIH1cbi8vICAgfTtcbi8vICAgY29uc3Qgc2V0QWN0aW9ucyA9IGUgPT4ge1xuLy8gICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuLy8gICAgIGlmICh0YXJnZXQuY2xvc2VzdCgnW2RhdGEtdGFicy10aXRsZV0nKSkge1xuLy8gICAgICAgY29uc3QgdGFiVGl0bGUgPSB0YXJnZXQuY2xvc2VzdCgnW2RhdGEtdGFicy10aXRsZV0nKTtcbi8vICAgICAgIGNvbnN0IHRhYnNCbG9jayA9IHRhYlRpdGxlLmNsb3Nlc3QoJ1tkYXRhLXRhYnNdJyk7XG4vLyAgICAgICBpZiAoXG4vLyAgICAgICAgICF0YWJUaXRsZS5jbGFzc0xpc3QuY29udGFpbnMoJ19hY3RpdmUnKSAmJlxuLy8gICAgICAgICAhdGFic0Jsb2NrLnF1ZXJ5U2VsZWN0b3IoJy5fc2xpZGUnKVxuLy8gICAgICAgKSB7XG4vLyAgICAgICAgIGxldCB0YWJBY3RpdmVUaXRsZSA9IHRhYnNCbG9jay5xdWVyeVNlbGVjdG9yQWxsKFxuLy8gICAgICAgICAgICdbZGF0YS10YWJzLXRpdGxlXS5fYWN0aXZlJ1xuLy8gICAgICAgICApO1xuLy8gICAgICAgICB0YWJBY3RpdmVUaXRsZS5sZW5ndGhcbi8vICAgICAgICAgICA/ICh0YWJBY3RpdmVUaXRsZSA9IEFycmF5LmZyb20odGFiQWN0aXZlVGl0bGUpLmZpbHRlcihcbi8vICAgICAgICAgICAgICAgaXRlbSA9PiBpdGVtLmNsb3Nlc3QoJ1tkYXRhLXRhYnNdJykgPT09IHRhYnNCbG9ja1xuLy8gICAgICAgICAgICAgKSlcbi8vICAgICAgICAgICA6IG51bGw7XG4vLyAgICAgICAgIHRhYkFjdGl2ZVRpdGxlLmxlbmd0aFxuLy8gICAgICAgICAgID8gdGFiQWN0aXZlVGl0bGVbMF0uY2xhc3NMaXN0LnJlbW92ZSgnX2FjdGl2ZScpXG4vLyAgICAgICAgICAgOiBudWxsO1xuLy8gICAgICAgICB0YWJUaXRsZS5jbGFzc0xpc3QuYWRkKCdfYWN0aXZlJyk7XG4vLyAgICAgICAgIHNldFN0YXR1cyh0YWJzQmxvY2spO1xuLy8gICAgICAgfVxuLy8gICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuLy8gICAgIH1cbi8vICAgfTtcblxuLy8gICBpZiAodGFicy5sZW5ndGgpIHtcbi8vICAgICBjb25zdCBoYXNoID0gZ2V0SGFzaCgpO1xuLy8gICAgIGlmIChoYXNoICYmIGhhc2guc3RhcnRzV2l0aCgndGFiLScpKSB7XG4vLyAgICAgICB0YWJzQWN0aXZlSGFzaCA9IGhhc2gucmVwbGFjZSgndGFiLScsICcnKS5zcGxpdCgnLScpO1xuLy8gICAgIH1cbi8vICAgICB0YWJzLmZvckVhY2goKHRhYnNCbG9jaywgaW5kZXgpID0+IHtcbi8vICAgICAgIHRhYnNCbG9jay5jbGFzc0xpc3QuYWRkKCdfdGFiLWluaXQnKTtcbi8vICAgICAgIHRhYnNCbG9jay5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFicy1pbmRleCcsIGluZGV4KTtcbi8vICAgICAgIHRhYnNCbG9jay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNldEFjdGlvbnMpO1xuLy8gICAgICAgaW5pdCh0YWJzQmxvY2spO1xuLy8gICAgIH0pO1xuLy8gICB9XG4vLyB9O1xuLy8gdGFicygpO1xuIiwiLyoqXG4gKiBzZXQgaGFzaCB0byB1cmxcbiAqIEBwYXJhbSB7c3RyaW5nfSBoYXNoXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRIYXNoID0gaGFzaCA9PiB7XG4gIGhhc2ggPSBoYXNoID8gYCMke2hhc2h9YCA6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KCcjJylbMF07XG4gIGhpc3RvcnkucHVzaFN0YXRlKCcnLCAnJywgaGFzaCk7XG59O1xuXG4vKipcbiAqIGdldCBoYXNoIGZyb20gdXJsXG4gKiBAcmV0dXJucyBzdHJpbmdcbiAqL1xuZXhwb3J0IGNvbnN0IGdldEhhc2ggPSAoKSA9PiB7XG4gIGlmIChsb2NhdGlvbi5oYXNoKSB7XG4gICAgcmV0dXJuIGxvY2F0aW9uLmhhc2gucmVwbGFjZSgnIycsICcnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBpbml0aWFsaXplcyBoYW1idXJnZXIgbWVudVxuICovXG5leHBvcnQgY29uc3QgbWVudUluaXQgPSAoKSA9PiB7XG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGFtYnVyZ2VyJykpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoYm9keUxvY2tTdGF0dXMgJiYgZS50YXJnZXQuY2xvc2VzdCgnLmhhbWJ1cmdlcicpKSB7XG4gICAgICAgIG1lbnVPcGVuKCk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBib2R5TG9ja1N0YXR1cyAmJlxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdfbWVudS1vcGVuZWQnKSAmJlxuICAgICAgICAoZS50YXJnZXQuY2xvc2VzdCgnLm1lbnVfX2Nsb3NlLWJ0bicpIHx8ICFlLnRhcmdldC5jbG9zZXN0KCcubWVudScpKVxuICAgICAgKSB7XG4gICAgICAgIG1lbnVDbG9zZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59O1xuLyoqXG4gKiBvcGVucyBoYW1idXJnZXIgbWVudVxuICovXG5leHBvcnQgY29uc3QgbWVudU9wZW4gPSAoKSA9PiB7XG4gIGJvZHlMb2NrKCk7XG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdfbWVudS1vcGVuZWQnKTtcbn07XG4vKipcbiAqIGNsb3NlcyBoYW1idXJnZXIgbWVudVxuICovXG5leHBvcnQgY29uc3QgbWVudUNsb3NlID0gKCkgPT4ge1xuICBib2R5VW5sb2NrKCk7XG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdfbWVudS1vcGVuZWQnKTtcbn07XG5cbi8vIGJvZHkgbG9ja1xuZXhwb3J0IGxldCBib2R5TG9ja1N0YXR1cyA9IHRydWU7XG4vKipcbiAqIHRvZ2dsZXMgYm9keSBsb2NrXG4gKiBAcGFyYW0ge251bWJlcn0gZGVsYXlcbiAqL1xuZXhwb3J0IGNvbnN0IGJvZHlMb2NrVG9nZ2xlID0gKGRlbGF5ID0gNTAwKSA9PiB7XG4gIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsb2NrJykpIHtcbiAgICBib2R5VW5sb2NrKGRlbGF5KTtcbiAgfSBlbHNlIHtcbiAgICBib2R5TG9jayhkZWxheSk7XG4gIH1cbn07XG4vKipcbiAqIHVubG9ja3MgYm9keVxuICogQHBhcmFtIHtudW1iZXJ9IGRlbGF5XG4gKi9cbmV4cG9ydCBjb25zdCBib2R5VW5sb2NrID0gKGRlbGF5ID0gNTAwKSA9PiB7XG4gIGlmIChib2R5TG9ja1N0YXR1cykge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2xvY2snKTtcbiAgICB9LCBkZWxheSk7XG4gICAgYm9keUxvY2tTdGF0dXMgPSBmYWxzZTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGJvZHlMb2NrU3RhdHVzID0gdHJ1ZTtcbiAgICB9LCBkZWxheSk7XG4gIH1cbn07XG4vKipcbiAqIGxvY2tzIGJvZHlcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWxheVxuICovXG5leHBvcnQgY29uc3QgYm9keUxvY2sgPSAoZGVsYXkgPSA1MDApID0+IHtcbiAgaWYgKGJvZHlMb2NrU3RhdHVzKSB7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2xvY2snKTtcblxuICAgIGJvZHlMb2NrU3RhdHVzID0gZmFsc2U7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBib2R5TG9ja1N0YXR1cyA9IHRydWU7XG4gICAgfSwgZGVsYXkpO1xuICB9XG59O1xuXG4vKipcbiAqIG1ha2UgdGhlIGFycmF5IHVuaXF1ZVxuICogQHBhcmFtIHthcnJheX0gYXJyYXlcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bmlxdWVBcnJheShhcnJheSkge1xuICByZXR1cm4gYXJyYXkuZmlsdGVyKGZ1bmN0aW9uIChpdGVtLCBpbmRleCwgc2VsZikge1xuICAgIHJldHVybiBzZWxmLmluZGV4T2YoaXRlbSkgPT09IGluZGV4O1xuICB9KTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHthcnJheX0gYXJyYXlcbiAqIEBwYXJhbSB7bnVtYmVyfSBkYXRhU2V0VmFsdWVcbiAqIHByb2Nlc3MgbWVkaWEgcmVxdWVzdHMgZnJvbSBhdHRyaWJ1dGVzXG4gKi9cbmV4cG9ydCBjb25zdCBkYXRhTWVkaWFRdWVyaWVzID0gKGFycmF5LCBkYXRhU2V0VmFsdWUpID0+IHtcbiAgLy8gZ2V0IG9iamVjdHMgd2l0aCBtZWRpYSBxdWVyaWVzXG4gIGNvbnN0IG1lZGlhID0gQXJyYXkuZnJvbShhcnJheSkuZmlsdGVyKGZ1bmN0aW9uIChpdGVtLCBpbmRleCwgc2VsZikge1xuICAgIGlmIChpdGVtLmRhdGFzZXRbZGF0YVNldFZhbHVlXSkge1xuICAgICAgcmV0dXJuIGl0ZW0uZGF0YXNldFtkYXRhU2V0VmFsdWVdLnNwbGl0KCcsJylbMF07XG4gICAgfVxuICB9KTtcbiAgLy8gb2JqZWN0cyB3aXRoIG1lZGlhIHF1ZXJpZXMgaW5pdGlhbGl6YXRpb25cbiAgaWYgKG1lZGlhLmxlbmd0aCkge1xuICAgIGNvbnN0IGJyZWFrcG9pbnRzQXJyYXkgPSBbXTtcbiAgICBtZWRpYS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgY29uc3QgcGFyYW1zID0gaXRlbS5kYXRhc2V0W2RhdGFTZXRWYWx1ZV07XG4gICAgICBjb25zdCBicmVha3BvaW50ID0ge307XG4gICAgICBjb25zdCBwYXJhbXNBcnJheSA9IHBhcmFtcy5zcGxpdCgnLCcpO1xuICAgICAgYnJlYWtwb2ludC52YWx1ZSA9IHBhcmFtc0FycmF5WzBdO1xuICAgICAgYnJlYWtwb2ludC50eXBlID0gcGFyYW1zQXJyYXlbMV0gPyBwYXJhbXNBcnJheVsxXS50cmltKCkgOiAnbWF4JztcbiAgICAgIGJyZWFrcG9pbnQuaXRlbSA9IGl0ZW07XG4gICAgICBicmVha3BvaW50c0FycmF5LnB1c2goYnJlYWtwb2ludCk7XG4gICAgfSk7XG4gICAgLy8gZ2V0IHVuaXF1ZSBicmVha3BvaW50c1xuICAgIGxldCBtZFF1ZXJpZXMgPSBicmVha3BvaW50c0FycmF5Lm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgJygnICtcbiAgICAgICAgaXRlbS50eXBlICtcbiAgICAgICAgJy13aWR0aDogJyArXG4gICAgICAgIGl0ZW0udmFsdWUgK1xuICAgICAgICAncHgpLCcgK1xuICAgICAgICBpdGVtLnZhbHVlICtcbiAgICAgICAgJywnICtcbiAgICAgICAgaXRlbS50eXBlXG4gICAgICApO1xuICAgIH0pO1xuICAgIG1kUXVlcmllcyA9IHVuaXF1ZUFycmF5KG1kUXVlcmllcyk7XG4gICAgY29uc3QgbWRRdWVyaWVzQXJyYXkgPSBbXTtcblxuICAgIGlmIChtZFF1ZXJpZXMubGVuZ3RoKSB7XG4gICAgICAvLyB3b3JrIHdpdGggZXZlcnkgYnJlYWtwb2ludFxuICAgICAgbWRRdWVyaWVzLmZvckVhY2goYnJlYWtwb2ludCA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmFtc0FycmF5ID0gYnJlYWtwb2ludC5zcGxpdCgnLCcpO1xuICAgICAgICBjb25zdCBtZWRpYUJyZWFrcG9pbnQgPSBwYXJhbXNBcnJheVsxXTtcbiAgICAgICAgY29uc3QgbWVkaWFUeXBlID0gcGFyYW1zQXJyYXlbMl07XG4gICAgICAgIGNvbnN0IG1hdGNoTWVkaWEgPSB3aW5kb3cubWF0Y2hNZWRpYShwYXJhbXNBcnJheVswXSk7XG4gICAgICAgIC8vIG9iamVjdHMgd2l0aCBjb25kaXRpb25zXG4gICAgICAgIGNvbnN0IGl0ZW1zQXJyYXkgPSBicmVha3BvaW50c0FycmF5LmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgIGlmIChpdGVtLnZhbHVlID09PSBtZWRpYUJyZWFrcG9pbnQgJiYgaXRlbS50eXBlID09PSBtZWRpYVR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIG1kUXVlcmllc0FycmF5LnB1c2goe1xuICAgICAgICAgIGl0ZW1zQXJyYXksXG4gICAgICAgICAgbWF0Y2hNZWRpYSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBtZFF1ZXJpZXNBcnJheTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogc21vb3RobHkgc2xpZGVzIHVwXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXRcbiAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvblxuICogQHBhcmFtIHtib29sZWFufSBzaG93bW9yZVxuICovXG5leHBvcnQgY29uc3QgX3NsaWRlVXAgPSAodGFyZ2V0LCBkdXJhdGlvbiA9IDUwMCwgc2hvd21vcmUgPSAwKSA9PiB7XG4gIGlmICghdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnX3NsaWRlJykpIHtcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnX3NsaWRlJyk7XG4gICAgdGFyZ2V0LnN0eWxlLnRyYW5zaXRpb25Qcm9wZXJ0eSA9ICdoZWlnaHQsIG1hcmdpbiwgcGFkZGluZyc7XG4gICAgdGFyZ2V0LnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IGR1cmF0aW9uICsgJ21zJztcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gYCR7dGFyZ2V0Lm9mZnNldEhlaWdodH1weGA7XG4gICAgdGFyZ2V0Lm9mZnNldEhlaWdodDtcbiAgICB0YXJnZXQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gc2hvd21vcmUgPyBgJHtzaG93bW9yZX1yZW1gIDogYDBgO1xuICAgIHRhcmdldC5zdHlsZS5wYWRkaW5nVG9wID0gMDtcbiAgICB0YXJnZXQuc3R5bGUucGFkZGluZ0JvdHRvbSA9IDA7XG4gICAgdGFyZ2V0LnN0eWxlLm1hcmdpblRvcCA9IDA7XG4gICAgdGFyZ2V0LnN0eWxlLm1hcmdpbkJvdHRvbSA9IDA7XG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGFyZ2V0LmhpZGRlbiA9ICFzaG93bW9yZSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICFzaG93bW9yZSA/IHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnaGVpZ2h0JykgOiBudWxsO1xuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nLXRvcCcpO1xuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nLWJvdHRvbScpO1xuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdtYXJnaW4tdG9wJyk7XG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ21hcmdpbi1ib3R0b20nKTtcbiAgICAgICFzaG93bW9yZSA/IHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnb3ZlcmZsb3cnKSA6IG51bGw7XG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zaXRpb24tZHVyYXRpb24nKTtcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndHJhbnNpdGlvbi1wcm9wZXJ0eScpO1xuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ19zbGlkZScpO1xuICAgICAgLy8gY3JlYXRlIGV2ZW50XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3NsaWRlVXBEb25lJywge1xuICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSwgZHVyYXRpb24pO1xuICB9XG59O1xuXG4vKipcbiAqIHNtb290aGx5IHNsaWRlcyBkb3duXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXRcbiAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvblxuICogQHBhcmFtIHtib29sZWFufSBzaG93bW9yZVxuICovXG5leHBvcnQgY29uc3QgX3NsaWRlRG93biA9ICh0YXJnZXQsIGR1cmF0aW9uID0gNTAwLCBzaG93bW9yZSA9IDApID0+IHtcbiAgaWYgKCF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdfc2xpZGUnKSkge1xuICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdfc2xpZGUnKTtcbiAgICB0YXJnZXQuaGlkZGVuID0gdGFyZ2V0LmhpZGRlbiA/IGZhbHNlIDogbnVsbDtcbiAgICBzaG93bW9yZSA/IHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnaGVpZ2h0JykgOiBudWxsO1xuICAgIGxldCBoZWlnaHQgPSB0YXJnZXQub2Zmc2V0SGVpZ2h0O1xuICAgIHRhcmdldC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSBzaG93bW9yZSA/IGAke3Nob3dtb3JlfXJlbWAgOiBgMGA7XG4gICAgdGFyZ2V0LnN0eWxlLnBhZGRpbmdUb3AgPSAwO1xuICAgIHRhcmdldC5zdHlsZS5wYWRkaW5nQm90dG9tID0gMDtcbiAgICB0YXJnZXQuc3R5bGUubWFyZ2luVG9wID0gMDtcbiAgICB0YXJnZXQuc3R5bGUubWFyZ2luQm90dG9tID0gMDtcbiAgICB0YXJnZXQub2Zmc2V0SGVpZ2h0O1xuICAgIHRhcmdldC5zdHlsZS50cmFuc2l0aW9uUHJvcGVydHkgPSAnaGVpZ2h0LCBtYXJnaW4sIHBhZGRpbmcnO1xuICAgIHRhcmdldC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBkdXJhdGlvbiArICdtcyc7XG4gICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XG4gICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nLXRvcCcpO1xuICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgncGFkZGluZy1ib3R0b20nKTtcbiAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ21hcmdpbi10b3AnKTtcbiAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ21hcmdpbi1ib3R0b20nKTtcbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2hlaWdodCcpO1xuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdvdmVyZmxvdycpO1xuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCd0cmFuc2l0aW9uLWR1cmF0aW9uJyk7XG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zaXRpb24tcHJvcGVydHknKTtcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdfc2xpZGUnKTtcbiAgICAgIC8vIGNyZWF0ZSBldmVudFxuICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzbGlkZURvd25Eb25lJywge1xuICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSwgZHVyYXRpb24pO1xuICB9XG59O1xuXG4vKipcbiAqIHRvZ2dsZXMgc21vb3RoIHNsaWRlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXRcbiAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvblxuICogQHJldHVybnMgZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IF9zbGlkZVRvZ2dsZSA9ICh0YXJnZXQsIGR1cmF0aW9uID0gNTAwKSA9PiB7XG4gIGlmICh0YXJnZXQuaGlkZGVuKSB7XG4gICAgcmV0dXJuIF9zbGlkZURvd24odGFyZ2V0LCBkdXJhdGlvbik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIF9zbGlkZVVwKHRhcmdldCwgZHVyYXRpb24pO1xuICB9XG59O1xuXG4vKipcbiAqIGNvbnZlcnRzIHJlbSB0byBwaXhlbHNcbiAqIEBwYXJhbSB7bnVtYmVyfSByZW1WYWx1ZVxuICogQHJldHVybnMgc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1Ub1B4KHJlbVZhbHVlKSB7XG4gIGNvbnN0IGh0bWxGb250U2l6ZSA9IHBhcnNlRmxvYXQoXG4gICAgZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpLmZvbnRTaXplXG4gICk7XG5cbiAgY29uc3QgcHhWYWx1ZSA9IHJlbVZhbHVlICogaHRtbEZvbnRTaXplO1xuXG4gIHJldHVybiBNYXRoLnJvdW5kKHB4VmFsdWUpICsgJ3B4Jztcbn1cblxuLy8gcmVtb3ZlIGNsYXNzIGZyb20gYWxsIGFycmF5IGVsZW1lbnRzXG5leHBvcnQgY29uc3QgcmVtb3ZlQ2xhc3NlcyA9IChhcnJheSwgY2xhc3NOYW1lKSA9PiB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICBhcnJheVtpXS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gIH1cbn07XG4iLCJ2YXIgY2FuVXNlRE9NID0gISEoXG4gIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gIHdpbmRvdy5kb2N1bWVudCAmJlxuICB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudFxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjYW5Vc2VET007IiwiLy8gSW1wb3J0c1xudmFyIF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gPSByZXF1aXJlKFwiLi4vLi4vY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiKTtcbnZhciBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gPSByZXF1aXJlKFwiLi4vLi4vY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBbZGF0YS1zaW1wbGViYXJdIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgYWxpZ24tY29udGVudDogZmxleC1zdGFydDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG59XG5cbi5zaW1wbGViYXItd3JhcHBlciB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHdpZHRoOiBpbmhlcml0O1xuICBoZWlnaHQ6IGluaGVyaXQ7XG4gIG1heC13aWR0aDogaW5oZXJpdDtcbiAgbWF4LWhlaWdodDogaW5oZXJpdDtcbn1cblxuLnNpbXBsZWJhci1tYXNrIHtcbiAgZGlyZWN0aW9uOiBpbmhlcml0O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICBib3R0b206IDA7XG4gIHJpZ2h0OiAwO1xuICB3aWR0aDogYXV0byAhaW1wb3J0YW50O1xuICBoZWlnaHQ6IGF1dG8gIWltcG9ydGFudDtcbiAgei1pbmRleDogMDtcbn1cblxuLnNpbXBsZWJhci1vZmZzZXQge1xuICBkaXJlY3Rpb246IGluaGVyaXQgIWltcG9ydGFudDtcbiAgYm94LXNpemluZzogaW5oZXJpdCAhaW1wb3J0YW50O1xuICByZXNpemU6IG5vbmUgIWltcG9ydGFudDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgcmlnaHQ6IDA7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xufVxuXG4uc2ltcGxlYmFyLWNvbnRlbnQtd3JhcHBlciB7XG4gIGRpcmVjdGlvbjogaW5oZXJpdDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveCAhaW1wb3J0YW50O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBoZWlnaHQ6IDEwMCU7IC8qIFJlcXVpcmVkIGZvciBob3Jpem9udGFsIG5hdGl2ZSBzY3JvbGxiYXIgdG8gbm90IGFwcGVhciBpZiBwYXJlbnQgaXMgdGFsbGVyIHRoYW4gbmF0dXJhbCBoZWlnaHQgKi9cbiAgd2lkdGg6IGF1dG87XG4gIG1heC13aWR0aDogMTAwJTsgLyogTm90IHJlcXVpcmVkIGZvciBob3Jpem9udGFsIHNjcm9sbCB0byB0cmlnZ2VyICovXG4gIG1heC1oZWlnaHQ6IDEwMCU7IC8qIE5lZWRlZCBmb3IgdmVydGljYWwgc2Nyb2xsIHRvIHRyaWdnZXIgKi9cbiAgb3ZlcmZsb3c6IGF1dG87XG4gIHNjcm9sbGJhci13aWR0aDogbm9uZTtcbiAgLW1zLW92ZXJmbG93LXN0eWxlOiBub25lO1xufVxuXG4uc2ltcGxlYmFyLWNvbnRlbnQtd3JhcHBlcjo6LXdlYmtpdC1zY3JvbGxiYXIsXG4uc2ltcGxlYmFyLWhpZGUtc2Nyb2xsYmFyOjotd2Via2l0LXNjcm9sbGJhciB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIHdpZHRoOiAwO1xuICBoZWlnaHQ6IDA7XG59XG5cbi5zaW1wbGViYXItY29udGVudDpiZWZvcmUsXG4uc2ltcGxlYmFyLWNvbnRlbnQ6YWZ0ZXIge1xuICBjb250ZW50OiBcIiBcIjtcbiAgZGlzcGxheTogdGFibGU7XG59XG5cbi5zaW1wbGViYXItcGxhY2Vob2xkZXIge1xuICBtYXgtaGVpZ2h0OiAxMDAlO1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cblxuLnNpbXBsZWJhci1oZWlnaHQtYXV0by1vYnNlcnZlci13cmFwcGVyIHtcbiAgYm94LXNpemluZzogaW5oZXJpdCAhaW1wb3J0YW50O1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDFweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBmbG9hdDogbGVmdDtcbiAgbWF4LWhlaWdodDogMXB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB6LWluZGV4OiAtMTtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgZmxleC1ncm93OiBpbmhlcml0O1xuICBmbGV4LXNocmluazogMDtcbiAgZmxleC1iYXNpczogMDtcbn1cblxuLnNpbXBsZWJhci1oZWlnaHQtYXV0by1vYnNlcnZlciB7XG4gIGJveC1zaXppbmc6IGluaGVyaXQ7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBvcGFjaXR5OiAwO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgaGVpZ2h0OiAxMDAwJTtcbiAgd2lkdGg6IDEwMDAlO1xuICBtaW4taGVpZ2h0OiAxcHg7XG4gIG1pbi13aWR0aDogMXB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgei1pbmRleDogLTE7XG59XG5cbi5zaW1wbGViYXItdHJhY2sge1xuICB6LWluZGV4OiAxO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG5bZGF0YS1zaW1wbGViYXJdLnNpbXBsZWJhci1kcmFnZ2luZyB7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTtcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbn1cblxuW2RhdGEtc2ltcGxlYmFyXS5zaW1wbGViYXItZHJhZ2dpbmcgLnNpbXBsZWJhci1jb250ZW50IHtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIHVzZXItc2VsZWN0OiBub25lO1xufVxuXG5bZGF0YS1zaW1wbGViYXJdLnNpbXBsZWJhci1kcmFnZ2luZyAuc2ltcGxlYmFyLXRyYWNrIHtcbiAgcG9pbnRlci1ldmVudHM6IGFsbDtcbn1cblxuLnNpbXBsZWJhci1zY3JvbGxiYXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBtaW4taGVpZ2h0OiAxMHB4O1xufVxuXG4uc2ltcGxlYmFyLXNjcm9sbGJhcjpiZWZvcmUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIGJhY2tncm91bmQ6IGJsYWNrO1xuICBib3JkZXItcmFkaXVzOiA3cHg7XG4gIGxlZnQ6IDJweDtcbiAgcmlnaHQ6IDJweDtcbiAgb3BhY2l0eTogMDtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzIDAuNXMgbGluZWFyO1xufVxuXG4uc2ltcGxlYmFyLXNjcm9sbGJhci5zaW1wbGViYXItdmlzaWJsZTpiZWZvcmUge1xuICBvcGFjaXR5OiAwLjU7XG4gIHRyYW5zaXRpb24tZGVsYXk6IDBzO1xuICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAwcztcbn1cblxuLnNpbXBsZWJhci10cmFjay5zaW1wbGViYXItdmVydGljYWwge1xuICB0b3A6IDA7XG4gIHdpZHRoOiAxMXB4O1xufVxuXG4uc2ltcGxlYmFyLXNjcm9sbGJhcjpiZWZvcmUge1xuICB0b3A6IDJweDtcbiAgYm90dG9tOiAycHg7XG4gIGxlZnQ6IDJweDtcbiAgcmlnaHQ6IDJweDtcbn1cblxuLnNpbXBsZWJhci10cmFjay5zaW1wbGViYXItaG9yaXpvbnRhbCB7XG4gIGxlZnQ6IDA7XG4gIGhlaWdodDogMTFweDtcbn1cblxuLnNpbXBsZWJhci10cmFjay5zaW1wbGViYXItaG9yaXpvbnRhbCAuc2ltcGxlYmFyLXNjcm9sbGJhciB7XG4gIHJpZ2h0OiBhdXRvO1xuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG4gIGJvdHRvbTogMDtcbiAgbWluLWhlaWdodDogMDtcbiAgbWluLXdpZHRoOiAxMHB4O1xuICB3aWR0aDogYXV0bztcbn1cblxuLyogUnRsIHN1cHBvcnQgKi9cbltkYXRhLXNpbXBsZWJhci1kaXJlY3Rpb249cnRsXSAuc2ltcGxlYmFyLXRyYWNrLnNpbXBsZWJhci12ZXJ0aWNhbCB7XG4gIHJpZ2h0OiBhdXRvO1xuICBsZWZ0OiAwO1xufVxuXG4uc2ltcGxlYmFyLWR1bW15LXNjcm9sbGJhci1zaXplIHtcbiAgZGlyZWN0aW9uOiBydGw7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgb3BhY2l0eTogMDtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICBoZWlnaHQ6IDUwMHB4O1xuICB3aWR0aDogNTAwcHg7XG4gIG92ZXJmbG93LXk6IGhpZGRlbjtcbiAgb3ZlcmZsb3cteDogc2Nyb2xsO1xuICAtbXMtb3ZlcmZsb3ctc3R5bGU6IHNjcm9sbGJhciAhaW1wb3J0YW50O1xufVxuXG4uc2ltcGxlYmFyLWR1bW15LXNjcm9sbGJhci1zaXplID4gZGl2IHtcbiAgd2lkdGg6IDIwMCU7XG4gIGhlaWdodDogMjAwJTtcbiAgbWFyZ2luOiAxMHB4IDA7XG59XG5cbi5zaW1wbGViYXItaGlkZS1zY3JvbGxiYXIge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGxlZnQ6IDA7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuICBzY3JvbGxiYXItd2lkdGg6IG5vbmU7XG4gIC1tcy1vdmVyZmxvdy1zdHlsZTogbm9uZTtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL25vZGVfbW9kdWxlcy9zaW1wbGViYXIvZGlzdC9zaW1wbGViYXIuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0Usa0JBQUE7RUFDQSxzQkFBQTtFQUNBLGVBQUE7RUFDQSwyQkFBQTtFQUNBLHlCQUFBO0VBQ0EsdUJBQUE7QUFDRjs7QUFFQTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLE9BQUE7RUFDQSxNQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0EsVUFBQTtBQUNGOztBQUVBO0VBQ0UsNkJBQUE7RUFDQSw4QkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFNBQUE7RUFDQSxRQUFBO0VBQ0EsVUFBQTtFQUNBLFNBQUE7RUFDQSxpQ0FBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxpQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLFlBQUEsRUFBQSxtR0FBQTtFQUNBLFdBQUE7RUFDQSxlQUFBLEVBQUEsa0RBQUE7RUFDQSxnQkFBQSxFQUFBLDBDQUFBO0VBQ0EsY0FBQTtFQUNBLHFCQUFBO0VBQ0Esd0JBQUE7QUFDRjs7QUFFQTs7RUFFRSxhQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7QUFDRjs7QUFFQTs7RUFFRSxZQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUVBO0VBQ0UsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtFQUNBLG9CQUFBO0FBQ0Y7O0FBRUE7RUFDRSw4QkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLG9CQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0VBQ0EsYUFBQTtBQUNGOztBQUVBO0VBQ0UsbUJBQUE7RUFDQSxjQUFBO0VBQ0EsVUFBQTtFQUNBLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLE9BQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQkFBQTtFQUNBLFdBQUE7QUFDRjs7QUFFQTtFQUNFLFVBQUE7RUFDQSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0Esb0JBQUE7RUFDQSxnQkFBQTtBQUNGOztBQUVBO0VBQ0Usb0JBQUE7RUFDQSwyQkFBQTtFQUNBLHlCQUFBO0VBQ0Esd0JBQUE7RUFDQSxzQkFBQTtFQUNBLHFCQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLG9CQUFBO0VBQ0EsMkJBQUE7RUFDQSx5QkFBQTtFQUNBLHdCQUFBO0VBQ0Esc0JBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxtQkFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSxVQUFBO0VBQ0Esb0NBQUE7QUFDRjs7QUFFQTtFQUNFLFlBQUE7RUFDQSxvQkFBQTtFQUNBLHVCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxNQUFBO0VBQ0EsV0FBQTtBQUNGOztBQUVBO0VBQ0UsUUFBQTtFQUNBLFdBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtBQUNGOztBQUVBO0VBQ0UsT0FBQTtFQUNBLFlBQUE7QUFDRjs7QUFFQTtFQUNFLFdBQUE7RUFDQSxPQUFBO0VBQ0EsTUFBQTtFQUNBLFNBQUE7RUFDQSxhQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7QUFDRjs7QUFFQSxnQkFBQTtBQUNBO0VBQ0UsV0FBQTtFQUNBLE9BQUE7QUFDRjs7QUFFQTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0EsVUFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0Esd0NBQUE7QUFDRjs7QUFFQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUVBO0VBQ0UsZUFBQTtFQUNBLE9BQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSx3QkFBQTtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIltkYXRhLXNpbXBsZWJhcl0ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIGFsaWduLWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG59XFxuXFxuLnNpbXBsZWJhci13cmFwcGVyIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB3aWR0aDogaW5oZXJpdDtcXG4gIGhlaWdodDogaW5oZXJpdDtcXG4gIG1heC13aWR0aDogaW5oZXJpdDtcXG4gIG1heC1oZWlnaHQ6IGluaGVyaXQ7XFxufVxcblxcbi5zaW1wbGViYXItbWFzayB7XFxuICBkaXJlY3Rpb246IGluaGVyaXQ7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDA7XFxuICBib3R0b206IDA7XFxuICByaWdodDogMDtcXG4gIHdpZHRoOiBhdXRvICFpbXBvcnRhbnQ7XFxuICBoZWlnaHQ6IGF1dG8gIWltcG9ydGFudDtcXG4gIHotaW5kZXg6IDA7XFxufVxcblxcbi5zaW1wbGViYXItb2Zmc2V0IHtcXG4gIGRpcmVjdGlvbjogaW5oZXJpdCAhaW1wb3J0YW50O1xcbiAgYm94LXNpemluZzogaW5oZXJpdCAhaW1wb3J0YW50O1xcbiAgcmVzaXplOiBub25lICFpbXBvcnRhbnQ7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xcbn1cXG5cXG4uc2ltcGxlYmFyLWNvbnRlbnQtd3JhcHBlciB7XFxuICBkaXJlY3Rpb246IGluaGVyaXQ7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94ICFpbXBvcnRhbnQ7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGhlaWdodDogMTAwJTsgLyogUmVxdWlyZWQgZm9yIGhvcml6b250YWwgbmF0aXZlIHNjcm9sbGJhciB0byBub3QgYXBwZWFyIGlmIHBhcmVudCBpcyB0YWxsZXIgdGhhbiBuYXR1cmFsIGhlaWdodCAqL1xcbiAgd2lkdGg6IGF1dG87XFxuICBtYXgtd2lkdGg6IDEwMCU7IC8qIE5vdCByZXF1aXJlZCBmb3IgaG9yaXpvbnRhbCBzY3JvbGwgdG8gdHJpZ2dlciAqL1xcbiAgbWF4LWhlaWdodDogMTAwJTsgLyogTmVlZGVkIGZvciB2ZXJ0aWNhbCBzY3JvbGwgdG8gdHJpZ2dlciAqL1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBzY3JvbGxiYXItd2lkdGg6IG5vbmU7XFxuICAtbXMtb3ZlcmZsb3ctc3R5bGU6IG5vbmU7XFxufVxcblxcbi5zaW1wbGViYXItY29udGVudC13cmFwcGVyOjotd2Via2l0LXNjcm9sbGJhcixcXG4uc2ltcGxlYmFyLWhpZGUtc2Nyb2xsYmFyOjotd2Via2l0LXNjcm9sbGJhciB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgd2lkdGg6IDA7XFxuICBoZWlnaHQ6IDA7XFxufVxcblxcbi5zaW1wbGViYXItY29udGVudDpiZWZvcmUsXFxuLnNpbXBsZWJhci1jb250ZW50OmFmdGVyIHtcXG4gIGNvbnRlbnQ6ICcgJztcXG4gIGRpc3BsYXk6IHRhYmxlO1xcbn1cXG5cXG4uc2ltcGxlYmFyLXBsYWNlaG9sZGVyIHtcXG4gIG1heC1oZWlnaHQ6IDEwMCU7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG5cXG4uc2ltcGxlYmFyLWhlaWdodC1hdXRvLW9ic2VydmVyLXdyYXBwZXIge1xcbiAgYm94LXNpemluZzogaW5oZXJpdCAhaW1wb3J0YW50O1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXgtd2lkdGg6IDFweDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgbWF4LWhlaWdodDogMXB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHotaW5kZXg6IC0xO1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgZmxleC1ncm93OiBpbmhlcml0O1xcbiAgZmxleC1zaHJpbms6IDA7XFxuICBmbGV4LWJhc2lzOiAwO1xcbn1cXG5cXG4uc2ltcGxlYmFyLWhlaWdodC1hdXRvLW9ic2VydmVyIHtcXG4gIGJveC1zaXppbmc6IGluaGVyaXQ7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG9wYWNpdHk6IDA7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgaGVpZ2h0OiAxMDAwJTtcXG4gIHdpZHRoOiAxMDAwJTtcXG4gIG1pbi1oZWlnaHQ6IDFweDtcXG4gIG1pbi13aWR0aDogMXB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgei1pbmRleDogLTE7XFxufVxcblxcbi5zaW1wbGViYXItdHJhY2sge1xcbiAgei1pbmRleDogMTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHJpZ2h0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG5bZGF0YS1zaW1wbGViYXJdLnNpbXBsZWJhci1kcmFnZ2luZyB7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcblxcbltkYXRhLXNpbXBsZWJhcl0uc2ltcGxlYmFyLWRyYWdnaW5nIC5zaW1wbGViYXItY29udGVudCB7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcblxcbltkYXRhLXNpbXBsZWJhcl0uc2ltcGxlYmFyLWRyYWdnaW5nIC5zaW1wbGViYXItdHJhY2sge1xcbiAgcG9pbnRlci1ldmVudHM6IGFsbDtcXG59XFxuXFxuLnNpbXBsZWJhci1zY3JvbGxiYXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgbWluLWhlaWdodDogMTBweDtcXG59XFxuXFxuLnNpbXBsZWJhci1zY3JvbGxiYXI6YmVmb3JlIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgYmFja2dyb3VuZDogYmxhY2s7XFxuICBib3JkZXItcmFkaXVzOiA3cHg7XFxuICBsZWZ0OiAycHg7XFxuICByaWdodDogMnB4O1xcbiAgb3BhY2l0eTogMDtcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyAwLjVzIGxpbmVhcjtcXG59XFxuXFxuLnNpbXBsZWJhci1zY3JvbGxiYXIuc2ltcGxlYmFyLXZpc2libGU6YmVmb3JlIHtcXG4gIG9wYWNpdHk6IDAuNTtcXG4gIHRyYW5zaXRpb24tZGVsYXk6IDBzO1xcbiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMHM7XFxufVxcblxcbi5zaW1wbGViYXItdHJhY2suc2ltcGxlYmFyLXZlcnRpY2FsIHtcXG4gIHRvcDogMDtcXG4gIHdpZHRoOiAxMXB4O1xcbn1cXG5cXG4uc2ltcGxlYmFyLXNjcm9sbGJhcjpiZWZvcmUge1xcbiAgdG9wOiAycHg7XFxuICBib3R0b206IDJweDtcXG4gIGxlZnQ6IDJweDtcXG4gIHJpZ2h0OiAycHg7XFxufVxcblxcbi5zaW1wbGViYXItdHJhY2suc2ltcGxlYmFyLWhvcml6b250YWwge1xcbiAgbGVmdDogMDtcXG4gIGhlaWdodDogMTFweDtcXG59XFxuXFxuLnNpbXBsZWJhci10cmFjay5zaW1wbGViYXItaG9yaXpvbnRhbCAuc2ltcGxlYmFyLXNjcm9sbGJhciB7XFxuICByaWdodDogYXV0bztcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDA7XFxuICBib3R0b206IDA7XFxuICBtaW4taGVpZ2h0OiAwO1xcbiAgbWluLXdpZHRoOiAxMHB4O1xcbiAgd2lkdGg6IGF1dG87XFxufVxcblxcbi8qIFJ0bCBzdXBwb3J0ICovXFxuW2RhdGEtc2ltcGxlYmFyLWRpcmVjdGlvbj0ncnRsJ10gLnNpbXBsZWJhci10cmFjay5zaW1wbGViYXItdmVydGljYWwge1xcbiAgcmlnaHQ6IGF1dG87XFxuICBsZWZ0OiAwO1xcbn1cXG5cXG4uc2ltcGxlYmFyLWR1bW15LXNjcm9sbGJhci1zaXplIHtcXG4gIGRpcmVjdGlvbjogcnRsO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgb3BhY2l0eTogMDtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIGhlaWdodDogNTAwcHg7XFxuICB3aWR0aDogNTAwcHg7XFxuICBvdmVyZmxvdy15OiBoaWRkZW47XFxuICBvdmVyZmxvdy14OiBzY3JvbGw7XFxuICAtbXMtb3ZlcmZsb3ctc3R5bGU6IHNjcm9sbGJhciAhaW1wb3J0YW50O1xcbn1cXG5cXG4uc2ltcGxlYmFyLWR1bW15LXNjcm9sbGJhci1zaXplID4gZGl2IHtcXG4gIHdpZHRoOiAyMDAlO1xcbiAgaGVpZ2h0OiAyMDAlO1xcbiAgbWFyZ2luOiAxMHB4IDA7XFxufVxcblxcbi5zaW1wbGViYXItaGlkZS1zY3JvbGxiYXIge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgbGVmdDogMDtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcXG4gIHNjcm9sbGJhci13aWR0aDogbm9uZTtcXG4gIC1tcy1vdmVyZmxvdy1zdHlsZTogbm9uZTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xudmFyIF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIik7XG52YXIgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIik7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PU1vbnRzZXJyYXQ6MzAwLHJlZ3VsYXIsNzAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9Um9ib3RvK0ZsZXg6cmVndWxhciw1MDAsNjAwLDgwMCZkaXNwbGF5PXN3YXApO1wiXSk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PU51bml0bzpyZWd1bGFyLDUwMCw2MDAsNzAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgKixcbio6OmJlZm9yZSxcbio6OmFmdGVyIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuaHRtbCB7XG4gIGZvbnQtZmFtaWx5OiBcIlJvYm90byBGbGV4XCI7XG4gIGZvbnQtc2l6ZTogMC41MjA4MzM1dnc7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgLXdlYmtpdC1hbmltYXRpb246IGJ1Z2ZpeCBpbmZpbml0ZSAxcztcbiAgbGluZS1oZWlnaHQ6IDEuMjtcbiAgbWFyZ2luOiAwO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHBhZGRpbmc6IDA7XG59XG5cbmJvZHkge1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIC13ZWJraXQtYW5pbWF0aW9uOiBidWdmaXggaW5maW5pdGUgMXM7XG4gIGxpbmUtaGVpZ2h0OiAxLjI7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbiAgaGVpZ2h0OiAxMDAlO1xuICBmb250LXNpemU6IDEuOHJlbTtcbiAgY29sb3I6ICMyZTJlMmU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZmYxZjM7XG59XG5cbmlucHV0LFxudGV4dGFyZWEge1xuICAtd2Via2l0LWFuaW1hdGlvbjogYnVnZml4IGluZmluaXRlIDFzO1xuICBsaW5lLWhlaWdodDogaW5oZXJpdDtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICBjb2xvcjogaW5oZXJpdDtcbn1cblxuYSB7XG4gIGNvbG9yOiB1bnNldDtcbn1cblxuYSxcbmE6aG92ZXIge1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG5cbmJ1dHRvbixcbmlucHV0LFxuYSxcbnRleHRhcmVhIHtcbiAgb3V0bGluZTogbm9uZTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmb250OiBpbmhlcml0O1xufVxuYnV0dG9uOmZvY3VzLFxuaW5wdXQ6Zm9jdXMsXG5hOmZvY3VzLFxudGV4dGFyZWE6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xufVxuYnV0dG9uOmFjdGl2ZSxcbmlucHV0OmFjdGl2ZSxcbmE6YWN0aXZlLFxudGV4dGFyZWE6YWN0aXZlIHtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuaDEsXG5oMixcbmgzLFxuaDQsXG5oNSxcbmg2IHtcbiAgZm9udDogaW5oZXJpdDtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xufVxuXG5wIHtcbiAgbWFyZ2luLXRvcDogMDtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbn1cblxuaW1nIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbmJ1dHRvbiB7XG4gIGJvcmRlcjogbm9uZTtcbiAgY29sb3I6IGluaGVyaXQ7XG4gIGZvbnQ6IGluaGVyaXQ7XG4gIHRleHQtYWxpZ246IGluaGVyaXQ7XG4gIHBhZGRpbmc6IDA7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG51bCB7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbn1cblxudWwgbGkge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG59XG5cbi5jb250YWluZXIge1xuICB3aWR0aDogMTU2cmVtO1xuICBtYXJnaW46IDAgYXV0bztcbn1cblxuaW5wdXRbdHlwZT1udW1iZXJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxuaW5wdXRbdHlwZT1udW1iZXJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICBtYXJnaW46IDA7XG59XG5cbmlucHV0W3R5cGU9bnVtYmVyXSB7XG4gIC1tb3otYXBwZWFyYW5jZTogdGV4dGZpZWxkO1xufVxuXG5zdmcsXG5pbWcge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiBhdXRvO1xuICBvYmplY3QtZml0OiBjb250YWluO1xufVxuaHRtbC5sb2NrLFxuaHRtbC5sb2NrIGJvZHkge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0b3VjaC1hY3Rpb246IG5vbmU7XG59XG5cbmh0bWwsXG5ib2R5IHtcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xufVxuXG5tYWluIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4ud3JhcHBlciB7XG4gIG1hcmdpbjogMCBhdXRvO1xuICBtYXgtd2lkdGg6IDE5MjBweDtcbn1cblxuLmgge1xuICBmb250LWZhbWlseTogXCJOdW5pdG9cIjtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgbGluZS1oZWlnaHQ6IDEyMCU7XG59XG4uaF9oMSB7XG4gIGZvbnQtc2l6ZTogNnJlbTtcbn1cbi5oX2gyIHtcbiAgZm9udC1zaXplOiAzLjRyZW07XG59XG4uaF9oMyB7XG4gIGZvbnQtc2l6ZTogMi40cmVtO1xufVxuXG4udHh0MTYge1xuICBsaW5lLWhlaWdodDogMTIwJTtcbn1cbi50eHQxNl9jYXBzIHtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cblxuaW5wdXRbdHlwZT10ZXh0XSxcbmlucHV0W3R5cGU9ZW1haWxdLFxuaW5wdXRbdHlwZT10ZWxdLFxudGV4dGFyZWEge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gIC1tb3otYXBwZWFyYW5jZTogbm9uZTtcbiAgYXBwZWFyYW5jZTogbm9uZTtcbn1cblxudGV4dGFyZWE6Zm9jdXMsXG5pbnB1dDpmb2N1cyB7XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbi5pbnB1dCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgcm93LWdhcDogMS4ycmVtO1xufVxuLmlucHV0X19maWVsZCB7XG4gIHBhZGRpbmc6IDEuNnJlbSAycmVtO1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXJhZGl1czogMS42cmVtO1xuICB0cmFuc2l0aW9uOiBjb2xvciAwLjNzIGVhc2UsIGJvcmRlciAwLjNzIGVhc2U7XG59XG4uaW5wdXRfX2ZpZWxkOjpwbGFjZWhvbGRlciB7XG4gIGNvbG9yOiAjODk4ZTlmO1xuICB0cmFuc2l0aW9uOiBjb2xvciAwLjNzIGVhc2U7XG59XG4uaW5wdXRfX2xhYmVsIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGNvbHVtbi1nYXA6IDNyZW07XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG4uaW5wdXQuX2hhcy1mb2N1cyAuaW5wdXRfX2ZpZWxkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzAwMDAwMDtcbn1cbi5pbnB1dC5faGFzLWVycm9yIC5pbnB1dF9fbGFiZWwge1xuICBjb2xvcjogdHJhbnNwYXJlbnQ7XG59XG4uaW5wdXQuX2hhcy1lcnJvciAuaW5wdXRfX2xhYmVsOjphZnRlciB7XG4gIGNvbnRlbnQ6IGF0dHIoZGF0YS1oaW50KTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIGNvbG9yOiAjZDc2OTdkO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuLmlucHV0Ll9oYXMtZXJyb3IgLmlucHV0X19maWVsZCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkNzY5N2Q7XG4gIGNvbG9yOiAjZDc2OTdkO1xufVxuLmlucHV0Ll9oYXMtZXJyb3IgLmlucHV0X19maWVsZDo6cGxhY2Vob2xkZXIge1xuICBjb2xvcjogI2Q3Njk3ZDtcbn1cblxuLmRyb3Bkb3duIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgcm93LWdhcDogMS4ycmVtO1xufVxuLmRyb3Bkb3duX19sYWJlbCB7XG4gIGNvbG9yOiAjZTllY2Y1O1xufVxuXG4uc2VsZWN0IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLnNlbGVjdF9fYm9keSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi5zZWxlY3RfX3RpdGxlIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB6LWluZGV4OiAzO1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyLXJhZGl1czogMS42cmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uc2VsZWN0X192YWx1ZSB7XG4gIHBhZGRpbmc6IDEuNnJlbSAycmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDFyZW07XG4gIGhlaWdodDogNS42cmVtO1xuICB3aWR0aDogMTAwJTtcbn1cbi5zZWxlY3RfX3ZhbHVlID4gKiB7XG4gIGZsZXg6IDEgMSBhdXRvO1xufVxuLnNlbGVjdF9fdmFsdWU6OmFmdGVyIHtcbiAgY29udGVudDogXCJcIjtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmbGV4OiAwIDAgMnJlbTtcbiAgd2lkdGg6IDJyZW07XG4gIGhlaWdodDogMnJlbTtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vYXNzZXRzL2ltYWdlcy9pY29ucy9zZWwtYXJyLnN2Zyk7XG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlO1xufVxuLnNlbGVjdF9fdmFsdWUuX2hhcy1sYWJlbDo6YmVmb3JlIHtcbiAgY29udGVudDogYXR0cihkYXRhLXNlbC1sYWJlbCk7XG4gIHRyYW5zaXRpb246IGNvbG9yIDAuM3MgZWFzZTtcbn1cbi5zZWxlY3RfX3ZhbHVlLl9oYXMtbGFiZWw6OmJlZm9yZSxcbi5zZWxlY3RfX3ZhbHVlIC5zZWxlY3RfX2NvbnRlbnQge1xuICBtYXgtd2lkdGg6IDMxLjRyZW07XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xufVxuLnNlbGVjdF9fY29udGVudCB7XG4gIG1hcmdpbi1yaWdodDogYXV0bztcbn1cbi5zZWxlY3RfX3RleHQge1xuICBmbGV4OiAxIDEgYXV0bztcbn1cbi5zZWxlY3RfX2lucHV0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG4uc2VsZWN0X19vcHRpb25zIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiAyO1xuICB0b3A6IGNhbGMoMTAwJSArIDAuOHJlbSk7XG4gIGxlZnQ6IDA7XG4gIHBhZGRpbmc6IDJyZW07XG4gIG1pbi13aWR0aDogMTAwJTtcbiAgYm9yZGVyLXJhZGl1czogMS42cmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICBib3gtc2hhZG93OiAwIDAgMnJlbSByZ2JhKDUyLCA1MiwgNTIsIDAuMTUpO1xufVxuLnNlbGVjdF9fc2Nyb2xsIHtcbiAgbWF4LWhlaWdodDogMTlyZW07XG59XG4uc2VsZWN0X19zY3JvbGwuc2ltcGxlYmFyLXNjcm9sbGFibGUteSAuc2ltcGxlYmFyLXRyYWNrLnNpbXBsZWJhci12ZXJ0aWNhbCB7XG4gIHJpZ2h0OiAxLjJyZW07XG4gIHdpZHRoOiAwLjRyZW07XG4gIGJvcmRlci1yYWRpdXM6IDAuOHJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U0ZTdlZTtcbn1cbi5zZWxlY3RfX3Njcm9sbC5zaW1wbGViYXItc2Nyb2xsYWJsZS15IC5zaW1wbGViYXItc2Nyb2xsYmFyIHtcbiAgbWluLWhlaWdodDogMy4ycmVtO1xuICBib3JkZXItcmFkaXVzOiAwLjhyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICNhMmFkYzE7XG59XG4uc2VsZWN0X19vcHRpb24ge1xuICBwYWRkaW5nOiAxLjVyZW0gMDtcbiAgd2lkdGg6IDEwMCU7XG4gIHRyYW5zaXRpb246IGNvbG9yIDAuM3MgZWFzZTtcbn1cbi5zZWxlY3RfX29wdGlvbjpmaXJzdC1jaGlsZCB7XG4gIHBhZGRpbmctdG9wOiAwO1xufVxuLnNlbGVjdF9fb3B0aW9uOmxhc3QtY2hpbGQge1xuICBwYWRkaW5nLWJvdHRvbTogMDtcbn1cbi5zZWxlY3RfX29wdGlvbi5faXMtc2VsZWN0ZWQge1xuICBmb250LXdlaWdodDogNTAwO1xufVxuLnNlbGVjdF9fZ3JvdXAge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4tcmV2ZXJzZTtcbn1cbi5zZWxlY3RfX3N1YnRpdGxlIHtcbiAgY3Vyc29yOiB0ZXh0O1xufVxuLnNlbGVjdC5faXMtb3BlbmVkIHtcbiAgei1pbmRleDogNTtcbn1cbi5zZWxlY3QuX2lzLW9wZW5lZCAuc2VsZWN0X192YWx1ZTo6YWZ0ZXIge1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgtMTgwZGVnKTtcbn1cbi5zZWxlY3QuX2hhcy1lcnJvcjpub3QoLnNlbGVjdC5faGFzLWVycm9yLl9pcy1maWxsZWQsIC5zZWxlY3QuX2hhcy1lcnJvci5faXMtb3BlbmVkKSAuc2VsZWN0X192YWx1ZS5fc2VsZWN0LWxhYmVsOjpiZWZvcmUge1xuICBjb2xvcjogI2Q3Njk3ZDtcbn1cblxuLl9zZWxlY3QtbGlzdCB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmFjY29yZGlvbiB7XG4gIG1hcmdpbjogM3JlbSBhdXRvO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICByb3ctZ2FwOiAxcmVtO1xuICBtYXgtd2lkdGg6IDgwcmVtO1xufVxuLmFjY29yZGlvbl9faXRlbSB7XG4gIGJvcmRlci1yYWRpdXM6IDIuNHJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbn1cbi5hY2NvcmRpb25fX3RpdGxlIHtcbiAgcGFkZGluZzogMi40cmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHdpZHRoOiAxMDAlO1xufVxuLmFjY29yZGlvbl9fdGl0bGUuX2FjY29yZGlvbi1hY3RpdmUgLmFyciBzdmcge1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgtOTBkZWcpO1xufVxuLmFjY29yZGlvbl9fdGl0bGUuX2FjY29yZGlvbi1hY3RpdmUgLmFyciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM2OTgxZDc7XG59XG4uYWNjb3JkaW9uX190aXRsZSAuYXJyIHtcbiAgZmxleDogMCAwIDVyZW07XG4gIHdpZHRoOiA1cmVtO1xuICBoZWlnaHQ6IDVyZW07XG59XG4uYWNjb3JkaW9uX19ib2R5IHtcbiAgcGFkZGluZzogMi40cmVtO1xuICBwYWRkaW5nLXRvcDogMDtcbn1cbi5hY2NvcmRpb25fX3RleHQge1xuICBjb2xvcjogcmdiKDEzMiwgMTMyLCAxMzIpO1xufVxuLmFjY29yZGlvbl9fdGV4dDpub3QoOmxhc3QtY2hpbGQpIHtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbn1cblxuLmZvcm0ge1xuICBtYXJnaW46IDNyZW0gYXV0bztcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcm93LWdhcDogMnJlbTtcbiAgbWF4LXdpZHRoOiA4MHJlbTtcbn1cbi5mb3JtX19maWVsZHMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBjb2x1bW4tZ2FwOiAycmVtO1xufVxuXG4uYnRuIHtcbiAgcGFkZGluZzogMS42cmVtIDMuMnJlbTtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBjb2x1bW4tZ2FwOiAxLjZyZW07XG4gIGJvcmRlci1yYWRpdXM6IDVyZW07XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xufVxuXG4udGFicyB7XG4gIG1hcmdpbjogNnJlbSBhdXRvO1xuICBtYXgtd2lkdGg6IDgwcmVtO1xufVxuLnRhYnNfX25hdmlnYXRpb24ge1xuICBtYXJnaW4tYm90dG9tOiAzcmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgY29sdW1uLWdhcDogMnJlbTtcbn1cbi50YWJzX19ib2R5IHtcbiAgcGFkZGluZzogM3JlbTtcbiAgYm9yZGVyLXJhZGl1czogM3JlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNCk7XG59XG5cbi5kcm9wZG93bnMge1xuICBtYXJnaW46IDNyZW0gYXV0bztcbiAgbWF4LXdpZHRoOiA4MHJlbTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgcm93LWdhcDogMXJlbTtcbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDQ4ZW0pe1xuICAudHh0MTYge1xuICAgIGZvbnQtc2l6ZTogMS42cmVtO1xuICB9XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiAxOTIwcHgpe1xuICBodG1sIHtcbiAgICBmb250LXNpemU6IDEwcHg7XG4gIH1cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pe1xuICBodG1sIHtcbiAgICBmb250LXNpemU6IDVweDtcbiAgICBmb250LXNpemU6IDEuNTYyNXZ3O1xuICAgIGZvbnQtc2l6ZTogMS4zMzMzMzMzMzMzdnc7XG4gICAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiBub25lO1xuICB9XG4gIGJvZHkge1xuICAgIGZvbnQtc2l6ZTogM3JlbTtcbiAgICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IG5vbmU7XG4gIH1cbiAgLmNvbnRhaW5lciB7XG4gICAgcGFkZGluZzogMCAzLjJyZW07XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbiAgLmhfaDIge1xuICAgIGZvbnQtc2l6ZTogNC40cmVtO1xuICB9XG4gIC5oX2gzIHtcbiAgICBmb250LXNpemU6IDMuNnJlbTtcbiAgfVxuICAuaW5wdXQge1xuICAgIHJvdy1nYXA6IDEuNnJlbTtcbiAgfVxuICAuaW5wdXRfX2ZpZWxkIHtcbiAgICBwYWRkaW5nOiAyLjRyZW0gMy42cmVtO1xuICAgIGJvcmRlci1yYWRpdXM6IDMuMnJlbTtcbiAgfVxuICAuZHJvcGRvd24ge1xuICAgIHJvdy1nYXA6IDEuNnJlbTtcbiAgfVxuICAuc2VsZWN0X190aXRsZSB7XG4gICAgYm9yZGVyLXJhZGl1czogMy4ycmVtO1xuICB9XG4gIC5zZWxlY3RfX3ZhbHVlIHtcbiAgICBwYWRkaW5nOiAyLjRyZW0gMy4ycmVtO1xuICAgIGdhcDogNHJlbTtcbiAgICBoZWlnaHQ6IDguOHJlbTtcbiAgfVxuICAuc2VsZWN0X192YWx1ZTo6YWZ0ZXIge1xuICAgIGZsZXg6IDAgMCAzLjJyZW07XG4gICAgd2lkdGg6IDMuMnJlbTtcbiAgICBoZWlnaHQ6IDMuMnJlbTtcbiAgfVxuICAuc2VsZWN0X19vcHRpb25zIHtcbiAgICBwYWRkaW5nOiAzLjJyZW07XG4gICAgYm9yZGVyLXJhZGl1czogMy4ycmVtO1xuICB9XG4gIC5zZWxlY3RfX29wdGlvbiB7XG4gICAgcGFkZGluZzogMi40cmVtIDA7XG4gIH1cbiAgLmFjY29yZGlvbl9faXRlbSB7XG4gICAgYm9yZGVyLXJhZGl1czogNXJlbTtcbiAgfVxuICAuYWNjb3JkaW9uX190aXRsZSB7XG4gICAgcGFkZGluZzogMy4ycmVtO1xuICB9XG4gIC5hY2NvcmRpb25fX3RpdGxlIC5hcnIge1xuICAgIGZsZXg6IDAgMCA5cmVtO1xuICAgIHdpZHRoOiA5cmVtO1xuICAgIGhlaWdodDogOXJlbTtcbiAgfVxuICAuYWNjb3JkaW9uX19ib2R5IHtcbiAgICBwYWRkaW5nOiAzLjJyZW07XG4gICAgcGFkZGluZy10b3A6IDA7XG4gIH1cbn1cblxuQG1lZGlhIChhbnktaG92ZXI6IGhvdmVyKXtcbiAgLnNlbGVjdF9fb3B0aW9uOmhvdmVyOm5vdCguc2VsZWN0X19vcHRpb246aG92ZXIuc2VsZWN0X19zdWJ0aXRsZSkge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuICAuYWNjb3JkaW9uX190aXRsZSAuYXJyOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNjk4MWQ3O1xuICB9XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9zZXQuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3Mvc3R5bGUuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3VpL3N0eWxlcy9fdHlwby5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvdWkvc3R5bGVzL19pbnB1dC5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvdWkvc3R5bGVzL19zZWxlY3Quc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3VpL3N0eWxlcy9fYWNjb3JkaW9uLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy91aS9zdHlsZXMvdWkuc2Nzc1wiLFwiPG5vIHNvdXJjZT5cIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7OztFQUdJLHNCQUFBO0FDSUo7O0FERkE7RUFDSSwwQkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLHFDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxTQUFB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O0lBQ0EsV0FBQTtFQ1lOO0VDckpFO0lBR1EsaUJBQUE7RURzTFY7RUNsTEU7SUFJUSxpQkFBQTtFRHNMVjtFRTdMRjtJQU9JLGVBQUE7RUY0TkY7RUV2TkE7SUFlSSxzQkFBQTtJQUNBLHFCQUFBO0VGMk5KO0VHcFFGO0lBTUksZUFBQTtFSHNTRjtFR2pSQTtJQVNJLHFCQUFBO0VIK1JKO0VHelJBO0lBeUNJLHNCQUFBO0lBQ0EsU0FBQTtJQUNBLGNBQUE7RUh5Uko7RUd4Ukk7SUFDRSxnQkFBQTtJQUNBLGFBQUE7SUFDQSxjQUFBO0VIMFJOO0VHM1BBO0lBWUksZUFBQTtJQUNBLHFCQUFBO0VIMFFKO0VHL09BO0lBc0JJLGlCQUFBO0VIK1BKO0VJNWFBO0lBSUksbUJBQUE7RUo4Y0o7RUl4Y0E7SUF5QkksZUFBQTtFSjJjSjtFSTFjSTtJQUNFLGNBQUE7SUFDQSxXQUFBO0lBQ0EsWUFBQTtFSjRjTjtFSWhjQTtJQUlJLGVBQUE7SUFDQSxjQUFBO0VKcWNKO0FBd0JGOztBTTloQkE7RUhnTFE7SUFDRSxlQUFBO0VIK1BSO0VJMVlNO0lBQ0UseUJKNUJIO0VBdWVMO0FBcURGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIiosXFxuKjo6YmVmb3JlLFxcbio6OmFmdGVyIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuaHRtbCB7XFxuICAgIGZvbnQtZmFtaWx5OiAnUm9ib3RvIEZsZXgnOyAvLyDRiNGA0LjRhNGCINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOINC/0L4g0YHQsNC50YLRg1xcbiAgICBmb250LXNpemU6IDAuNTIwODMzNXZ3OyAvLyDQvdCwINGA0LDQt9GA0LXRiNC10L3QuNC4IDE5MjAgMC41MjA4MzV2dyA9PT0gMTBweFxcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBidWdmaXggaW5maW5pdGUgMXM7XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjI7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBwYWRkaW5nOiAwO1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogYnVnZml4IGluZmluaXRlIDFzO1xcbiAgICBsaW5lLWhlaWdodDogMS4yO1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgZm9udC1zaXplOiAxLjhyZW07XFxuICAgIGNvbG9yOiAkZm9udENvbG9yOyAvLyDRhtCy0LXRgiDQv9C+INGD0LzQvtC70YfQsNC90LjRjiDRgtC10LrRgdGC0LAg0L/QviDRgdCw0LnRgtGDXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRiZ0NvbG9yO1xcbn1cXG5cXG5pbnB1dCxcXG50ZXh0YXJlYSB7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBidWdmaXggaW5maW5pdGUgMXM7XFxuICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGNvbG9yOiBpbmhlcml0O1xcbn1cXG5hIHtcXG4gICAgY29sb3I6IHVuc2V0O1xcbn1cXG5hLFxcbmE6aG92ZXIge1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxufVxcblxcbmJ1dHRvbixcXG5pbnB1dCxcXG5hLFxcbnRleHRhcmVhIHtcXG4gICAgb3V0bGluZTogbm9uZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBmb250OiBpbmhlcml0O1xcbiAgICAmOmZvY3VzIHtcXG4gICAgICAgIG91dGxpbmU6IG5vbmU7XFxuICAgIH1cXG4gICAgJjphY3RpdmUge1xcbiAgICAgICAgb3V0bGluZTogbm9uZTtcXG4gICAgfVxcbn1cXG5cXG5oMSxcXG5oMixcXG5oMyxcXG5oNCxcXG5oNSxcXG5oNiB7XFxuICAgIGZvbnQ6IGluaGVyaXQ7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG59XFxucCB7XFxuICAgIG1hcmdpbi10b3A6IDA7XFxuICAgIG1hcmdpbi1ib3R0b206IDA7XFxufVxcblxcbmltZyB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG5idXR0b24ge1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGNvbG9yOiBpbmhlcml0O1xcbiAgICBmb250OiBpbmhlcml0O1xcbiAgICB0ZXh0LWFsaWduOiBpbmhlcml0O1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxudWwge1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBtYXJnaW46IDA7XFxufVxcblxcbnVsIGxpIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5cXG4uY29udGFpbmVyIHtcXG4gICAgd2lkdGg6IDE1NnJlbTtcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxufVxcblxcbmlucHV0W3R5cGU9J251bWJlciddOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxcbmlucHV0W3R5cGU9J251bWJlciddOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcXG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbiAgICBtYXJnaW46IDA7XFxufVxcblxcbmlucHV0W3R5cGU9J251bWJlciddIHtcXG4gICAgLW1vei1hcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7XFxufVxcblxcbnN2ZyxcXG5pbWcge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgICBvYmplY3QtZml0OiBjb250YWluO1xcbn1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogMTkyMHB4KSB7XFxuICAgIGh0bWwge1xcbiAgICAgICAgZm9udC1zaXplOiAxMHB4O1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA0OGVtKSB7XFxuICAgIGh0bWwge1xcbiAgICAgICAgZm9udC1zaXplOiA1cHg7XFxuICAgICAgICBmb250LXNpemU6IDEuNTYyNXZ3O1xcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCgxMDAgLyAzNzUpICogNXZ3KTsgLy8g0LPQtNC1IDM3NSDRjdGC0L4g0YjQuNGA0LjQvdCwINC80L7QsSDQstC10YDRgdC40Lgg0LzQsNC60LXRgtCwXFxuICAgICAgICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IG5vbmU7XFxuICAgIH1cXG5cXG4gICAgYm9keSB7XFxuICAgICAgICBmb250LXNpemU6IDNyZW07XFxuICAgICAgICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IG5vbmU7XFxuICAgIH1cXG5cXG4gICAgLmNvbnRhaW5lciB7XFxuICAgICAgICBwYWRkaW5nOiAwIDMuMnJlbTsgLy8g0LIg0LzQvtCxINCy0LXRgNGB0LjQuCDQvtGC0YHRgtGD0L8g0L7RgiDQutGA0LDRjyDQt9Cw0LTQsNC10Lwg0LTQu9GPINCy0YHQtdGFINC60L7QvdGC0LXQudC90LXRgNC+0LIsINCwINGC0LDQvCDQs9C00LUg0L3QtSDQvdGD0LbQvdC+INC80L7QttC10Lwg0YLQvtGH0LXRh9C90L4g0YPQsdGA0LDRgtGMXFxuICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgfVxcbn1cXG5cIixcIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBtaXhpbnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxuXFxuQGltcG9ydCAnLi9taXhpbnMnO1xcblxcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHZhcmlhYmxlcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxuXFxuLy8gY29sb3JzXFxuJHdoaXRlOiAjZmZmZmZmO1xcbiRibGFjazogIzAwMDAwMDtcXG4kZm9udENvbG9yOiAjMmUyZTJlO1xcbiRiZ0NvbG9yOiAjZWZmMWYzO1xcbiRibHVlOiAjNjk4MWQ3O1xcbiRsaWdodEJsdWU6ICM2M2IzZGY7XFxuJHJlZDogI2Q3Njk3ZDtcXG4kZ3JheTogI2RlZTJlNztcXG4kdGV4dEdyYXk6ICM4OThlOWY7XFxuJGxpZ2h0R3JheTogI2U5ZWNmNTtcXG5cXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGZvbnRzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcblxcbkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Nb250c2VycmF0OjMwMCxyZWd1bGFyLDcwMCZkaXNwbGF5PXN3YXApO1xcbkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Sb2JvdG8rRmxleDpyZWd1bGFyLDUwMCw2MDAsODAwJmRpc3BsYXk9c3dhcCk7XFxuQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PU51bml0bzpyZWd1bGFyLDUwMCw2MDAsNzAwJmRpc3BsYXk9c3dhcCk7XFxuXFxuLy8gbG9jYWwgZm9udHNcXG4vLyBAaW1wb3J0ICcuL2ZvbnRzJztcXG5cXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGJhc2Ugc3R5bGVzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcblxcbi8vIGJhc2Ugc2NzcyBmaWxlXFxuQGltcG9ydCAnLi9zZXQnO1xcblxcbi8vIGh0bWxcXG5odG1sLmxvY2ssXFxuaHRtbC5sb2NrIGJvZHkge1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICB0b3VjaC1hY3Rpb246IG5vbmU7XFxufVxcbmh0bWwsXFxuYm9keSB7XFxuICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcXG59XFxuXFxuLy8gbWFpblxcbm1haW4ge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi53cmFwcGVyIHtcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxuICAgIG1heC13aWR0aDogMTkyMHB4O1xcbn1cXG5cXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcblxcbi8vIGhlYWRlciAvIGZvb3RlclxcbkBpbXBvcnQgJy4vc2VjdGlvbnMvaGVhZGVyJztcXG5AaW1wb3J0ICcuL3NlY3Rpb25zL2Zvb3Rlcic7XFxuXFxuLy8gdWlcXG5AaW1wb3J0ICcuLi91aS9zdHlsZXMvdWkuc2Nzcyc7XFxuXFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG5cXG5AaW1wb3J0ICcuL2Rldi92em1zazEuc2Nzcyc7XFxuQGltcG9ydCAnLi9kZXYvbWFya3VzRE0uc2Nzcyc7XFxuQGltcG9ydCAnLi9kZXYvdWtpazAuc2Nzcyc7XFxuQGltcG9ydCAnLi9kZXYva2llNmVyLnNjc3MnO1xcblwiLFwiLmgge1xcbiAgICBmb250LWZhbWlseTogJ051bml0byc7XFxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICAgIGxpbmUtaGVpZ2h0OiAxMjAlO1xcblxcbiAgICAmX2gxIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogNnJlbTtcXG4gICAgfVxcblxcbiAgICAmX2gyIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogMy40cmVtO1xcbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pIHtcXG4gICAgICAgICAgICBmb250LXNpemU6IDQuNHJlbTtcXG4gICAgICAgIH1cXG4gICAgfVxcblxcbiAgICAmX2gzIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogMi40cmVtO1xcblxcbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pIHtcXG4gICAgICAgICAgICBmb250LXNpemU6IDMuNnJlbTtcXG4gICAgICAgIH1cXG4gICAgfVxcbn1cXG5cXG4udHh0MTYge1xcbiAgICBsaW5lLWhlaWdodDogMTIwJTtcXG5cXG4gICAgJl9jYXBzIHtcXG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgIH1cXG5cXG4gICAgQG1lZGlhIChtaW4td2lkdGg6IDQ4ZW0pIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogMS42cmVtO1xcbiAgICB9XFxufVxcblwiLFwiaW5wdXRbdHlwZT0ndGV4dCddLFxcbmlucHV0W3R5cGU9J2VtYWlsJ10sXFxuaW5wdXRbdHlwZT0ndGVsJ10sXFxudGV4dGFyZWEge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbiAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xcbiAgYXBwZWFyYW5jZTogbm9uZTtcXG59XFxudGV4dGFyZWE6Zm9jdXMsXFxuaW5wdXQ6Zm9jdXMge1xcbiAgb3V0bGluZTogbm9uZTtcXG59XFxuXFxuLmlucHV0IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgcm93LWdhcDogMS4ycmVtO1xcblxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pIHtcXG4gICAgcm93LWdhcDogMS42cmVtO1xcbiAgfVxcblxcbiAgLy8gLmlucHV0X19maWVsZFxcblxcbiAgJl9fZmllbGQge1xcbiAgICBwYWRkaW5nOiAxLjZyZW0gMnJlbTtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkd2hpdGU7XFxuICAgIGxpbmUtaGVpZ2h0OiAxO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyLXJhZGl1czogMS42cmVtO1xcbiAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjNzIGVhc2UsIGJvcmRlciAwLjNzIGVhc2U7XFxuICAgICY6OnBsYWNlaG9sZGVyIHtcXG4gICAgICBjb2xvcjogJHRleHRHcmF5O1xcbiAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuM3MgZWFzZTtcXG4gICAgfVxcblxcbiAgICBAbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICAgIHBhZGRpbmc6IDIuNHJlbSAzLjZyZW07XFxuICAgICAgYm9yZGVyLXJhZGl1czogMy4ycmVtO1xcbiAgICB9XFxuICB9XFxuXFxuICAvLyAuaW5wdXRfX2xhYmVsXFxuXFxuICAmX19sYWJlbCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgICBjb2x1bW4tZ2FwOiAzcmVtO1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgfVxcblxcbiAgJi5faGFzLWZvY3VzIHtcXG4gICAgLmlucHV0X19maWVsZCB7XFxuICAgICAgYm9yZGVyOiAxcHggc29saWQgJGJsYWNrO1xcbiAgICB9XFxuICB9XFxuICAmLl9oYXMtZXJyb3Ige1xcbiAgICAuaW5wdXRfX2xhYmVsIHtcXG4gICAgICBjb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgICAgJjo6YWZ0ZXIge1xcbiAgICAgICAgY29udGVudDogYXR0cihkYXRhLWhpbnQpO1xcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgdG9wOiAwO1xcbiAgICAgICAgbGVmdDogMDtcXG4gICAgICAgIGNvbG9yOiAkcmVkO1xcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgICB9XFxuICAgIH1cXG4gICAgLmlucHV0X19maWVsZCB7XFxuICAgICAgYm9yZGVyOiAxcHggc29saWQgJHJlZDtcXG4gICAgICBjb2xvcjogJHJlZDtcXG4gICAgICAmOjpwbGFjZWhvbGRlciB7XFxuICAgICAgICBjb2xvcjogJHJlZDtcXG4gICAgICB9XFxuICAgIH1cXG4gIH1cXG59XFxuXCIsXCIuZHJvcGRvd24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICByb3ctZ2FwOiAxLjJyZW07XFxuXFxuICBAbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICByb3ctZ2FwOiAxLjZyZW07XFxuICB9XFxuXFxuICAvLyAuZHJvcGRvd25fX2xhYmVsXFxuXFxuICAmX19sYWJlbCB7XFxuICAgIGNvbG9yOiAkbGlnaHRHcmF5O1xcbiAgfVxcbn1cXG5cXG4uc2VsZWN0IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXG4gIC8vIC5zZWxlY3RfX2JvZHlcXG5cXG4gICZfX2JvZHkge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB9XFxuXFxuICAvLyAuc2VsZWN0X190aXRsZVxcblxcbiAgJl9fdGl0bGUge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHotaW5kZXg6IDM7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBib3JkZXItcmFkaXVzOiAxLjZyZW07XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICR3aGl0ZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcblxcbiAgICBAbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDMuMnJlbTtcXG4gICAgfVxcbiAgfVxcblxcbiAgLy8gLnNlbGVjdF9fdmFsdWVcXG5cXG4gICZfX3ZhbHVlIHtcXG4gICAgcGFkZGluZzogMS42cmVtIDJyZW07XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdhcDogMXJlbTtcXG4gICAgaGVpZ2h0OiA1LjZyZW07XFxuICAgIHdpZHRoOiAxMDAlO1xcblxcbiAgICA+ICoge1xcbiAgICAgIGZsZXg6IDEgMSBhdXRvO1xcbiAgICB9XFxuXFxuICAgICY6OmFmdGVyIHtcXG4gICAgICBjb250ZW50OiAnJztcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICAgIGZsZXg6IDAgMCAycmVtO1xcbiAgICAgIHdpZHRoOiAycmVtO1xcbiAgICAgIGhlaWdodDogMnJlbTtcXG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9hc3NldHMvaW1hZ2VzL2ljb25zL3NlbC1hcnIuc3ZnKTtcXG4gICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcbiAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZTtcXG4gICAgfVxcbiAgICAmLl9oYXMtbGFiZWwge1xcbiAgICAgICY6OmJlZm9yZSB7XFxuICAgICAgICBjb250ZW50OiBhdHRyKGRhdGEtc2VsLWxhYmVsKTtcXG4gICAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuM3MgZWFzZTtcXG4gICAgICB9XFxuICAgIH1cXG4gICAgJi5faGFzLWxhYmVsOjpiZWZvcmUsXFxuICAgIC5zZWxlY3RfX2NvbnRlbnQge1xcbiAgICAgIG1heC13aWR0aDogMzEuNHJlbTtcXG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAgIH1cXG5cXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pIHtcXG4gICAgICBwYWRkaW5nOiAyLjRyZW0gMy4ycmVtO1xcbiAgICAgIGdhcDogNHJlbTtcXG4gICAgICBoZWlnaHQ6IDguOHJlbTtcXG4gICAgICAmOjphZnRlciB7XFxuICAgICAgICBmbGV4OiAwIDAgMy4ycmVtO1xcbiAgICAgICAgd2lkdGg6IDMuMnJlbTtcXG4gICAgICAgIGhlaWdodDogMy4ycmVtO1xcbiAgICAgIH1cXG4gICAgfVxcbiAgfVxcblxcbiAgLy8gLnNlbGVjdF9fY29udGVudFxcblxcbiAgJl9fY29udGVudCB7XFxuICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG4gICAgLy8gaGlkZSAvIHNob3cgc2VsZWN0ZWQgdmFsdWVcXG4gICAgLy8gJjpub3QoLl9zZWxlY3QtZmlsbGVkICYpIHtcXG4gICAgLy8gICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIC8vIH1cXG4gIH1cXG5cXG4gIC8vIC5zZWxlY3RfX3RleHRcXG5cXG4gICZfX3RleHQge1xcbiAgICBmbGV4OiAxIDEgYXV0bztcXG4gIH1cXG5cXG4gIC8vIC5zZWxlY3RfX2lucHV0XFxuXFxuICAmX19pbnB1dCB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgfVxcblxcbiAgLy8gLnNlbGVjdF9fb3B0aW9uc1xcblxcbiAgJl9fb3B0aW9ucyB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgei1pbmRleDogMjtcXG4gICAgdG9wOiBjYWxjKDEwMCUgKyAwLjhyZW0pO1xcbiAgICBsZWZ0OiAwO1xcbiAgICBwYWRkaW5nOiAycmVtO1xcbiAgICBtaW4td2lkdGg6IDEwMCU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDEuNnJlbTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHdoaXRlO1xcbiAgICBib3gtc2hhZG93OiAwIDAgMnJlbSByZ2JhKDUyLCA1MiwgNTIsIDAuMTUpO1xcblxcbiAgICBAbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICAgIHBhZGRpbmc6IDMuMnJlbTtcXG4gICAgICBib3JkZXItcmFkaXVzOiAzLjJyZW07XFxuICAgIH1cXG4gIH1cXG5cXG4gIC8vIC5zZWxlY3RfX3Njcm9sbFxcblxcbiAgJl9fc2Nyb2xsIHtcXG4gICAgLy8gLy8gbWF4aW11bSBoZWlnaHRcXG4gICAgbWF4LWhlaWdodDogMTlyZW07XFxuXFxuICAgIC8vIC8vIHNjcm9sbGJhciBzdHlsZXNcXG4gICAgJi5zaW1wbGViYXItc2Nyb2xsYWJsZS15IHtcXG4gICAgICAuc2ltcGxlYmFyLXRyYWNrLnNpbXBsZWJhci12ZXJ0aWNhbCB7XFxuICAgICAgICByaWdodDogMS4ycmVtO1xcbiAgICAgICAgd2lkdGg6IDAuNHJlbTtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDAuOHJlbTtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlNGU3ZWU7XFxuICAgICAgfVxcbiAgICAgIC5zaW1wbGViYXItc2Nyb2xsYmFyIHtcXG4gICAgICAgIG1pbi1oZWlnaHQ6IDMuMnJlbTtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDAuOHJlbTtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNhMmFkYzE7XFxuICAgICAgfVxcbiAgICB9XFxuICB9XFxuXFxuICAvLyAuc2VsZWN0X19vcHRpb25cXG4gICZfX29wdGlvbiB7XFxuICAgIHBhZGRpbmc6IDEuNXJlbSAwO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgdHJhbnNpdGlvbjogY29sb3IgMC4zcyBlYXNlO1xcbiAgICAmOmZpcnN0LWNoaWxkIHtcXG4gICAgICBwYWRkaW5nLXRvcDogMDtcXG4gICAgfVxcbiAgICAmOmxhc3QtY2hpbGQge1xcbiAgICAgIHBhZGRpbmctYm90dG9tOiAwO1xcbiAgICB9XFxuXFxuICAgICYuX2lzLXNlbGVjdGVkIHtcXG4gICAgICBmb250LXdlaWdodDogNTAwO1xcbiAgICB9XFxuICAgIEBtZWRpYSAoYW55LWhvdmVyOiBob3Zlcikge1xcbiAgICAgICY6aG92ZXIge1xcbiAgICAgICAgJjpub3QoJi5zZWxlY3RfX3N1YnRpdGxlKSB7XFxuICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICAgIH1cXG4gICAgICB9XFxuICAgIH1cXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pIHtcXG4gICAgICBwYWRkaW5nOiAyLjRyZW0gMDtcXG4gICAgfVxcbiAgfVxcblxcbiAgLy8gLnNlbGVjdF9fZ3JvdXBcXG5cXG4gICZfX2dyb3VwIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uLXJldmVyc2U7XFxuICB9XFxuXFxuICAvLyAuc2VsZWN0X19hc3NldFxcblxcbiAgJl9fYXNzZXQge1xcbiAgfVxcblxcbiAgLy8gLnNlbGVjdF9fdGV4dFxcblxcbiAgJl9fdGV4dCB7XFxuICB9XFxuXFxuICAvLyAuc2VsZWN0X19oaW50XFxuXFxuICAmX19oaW50IHtcXG4gIH1cXG5cXG4gIC8vIC5zZWxlY3RfX3N1YnRpdGxlXFxuXFxuICAmX19zdWJ0aXRsZSB7XFxuICAgIGN1cnNvcjogdGV4dDtcXG4gIH1cXG5cXG4gIC8vIHNlbGVjdCBzdGF0ZVxcbiAgJi5faXMtb3BlbmVkIHtcXG4gICAgei1pbmRleDogNTtcXG4gICAgLnNlbGVjdF9fdmFsdWU6OmFmdGVyIHtcXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMTgwZGVnKTtcXG4gICAgfVxcbiAgfVxcbiAgJi5faGFzLWVycm9yIHtcXG4gICAgJjpub3QoJi5faXMtZmlsbGVkLCAmLl9pcy1vcGVuZWQpIHtcXG4gICAgICAuc2VsZWN0X192YWx1ZS5fc2VsZWN0LWxhYmVsIHtcXG4gICAgICAgICY6OmJlZm9yZSB7XFxuICAgICAgICAgIGNvbG9yOiAkcmVkO1xcbiAgICAgICAgfVxcbiAgICAgIH1cXG4gICAgfVxcbiAgfVxcbn1cXG5cXG4vLyBsaXN0XFxuLl9zZWxlY3QtbGlzdCB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblwiLFwiLmFjY29yZGlvbiB7XFxuICBtYXJnaW46IDNyZW0gYXV0bztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgcm93LWdhcDogMXJlbTtcXG4gIG1heC13aWR0aDogODByZW07XFxuXFxuICAvLyAuYWNjb3JkaW9uX19pdGVtXFxuXFxuICAmX19pdGVtIHtcXG4gICAgYm9yZGVyLXJhZGl1czogMi40cmVtO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkd2hpdGU7XFxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA0OGVtKSB7XFxuICAgICAgYm9yZGVyLXJhZGl1czogNXJlbTtcXG4gICAgfVxcbiAgfVxcblxcbiAgLy8gLmFjY29yZGlvbl9fdGl0bGVcXG5cXG4gICZfX3RpdGxlIHtcXG4gICAgcGFkZGluZzogMi40cmVtO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICAmLl9hY2NvcmRpb24tYWN0aXZlIHtcXG4gICAgICAuYXJyIHN2ZyB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtOTBkZWcpO1xcbiAgICAgIH1cXG4gICAgICAuYXJyIHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRibHVlO1xcbiAgICAgIH1cXG4gICAgfVxcbiAgICAuYXJyIHtcXG4gICAgICBmbGV4OiAwIDAgNXJlbTtcXG4gICAgICB3aWR0aDogNXJlbTtcXG4gICAgICBoZWlnaHQ6IDVyZW07XFxuICAgICAgQG1lZGlhIChhbnktaG92ZXI6IGhvdmVyKSB7XFxuICAgICAgICAmOmhvdmVyIHtcXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGJsdWU7XFxuICAgICAgICB9XFxuICAgICAgfVxcbiAgICB9XFxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA0OGVtKSB7XFxuICAgICAgcGFkZGluZzogMy4ycmVtO1xcbiAgICAgIC5hcnIge1xcbiAgICAgICAgZmxleDogMCAwIDlyZW07XFxuICAgICAgICB3aWR0aDogOXJlbTtcXG4gICAgICAgIGhlaWdodDogOXJlbTtcXG4gICAgICB9XFxuICAgIH1cXG4gIH1cXG5cXG4gIC8vIC5hY2NvcmRpb25fX3RpdGxlLXR4dFxcblxcbiAgJl9fdGl0bGUtdHh0IHtcXG4gIH1cXG5cXG4gIC8vIC5hY2NvcmRpb25fX2JvZHlcXG5cXG4gICZfX2JvZHkge1xcbiAgICBwYWRkaW5nOiAyLjRyZW07XFxuICAgIHBhZGRpbmctdG9wOiAwO1xcbiAgICBAbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICAgIHBhZGRpbmc6IDMuMnJlbTtcXG4gICAgICBwYWRkaW5nLXRvcDogMDtcXG4gICAgfVxcbiAgfVxcblxcbiAgLy8gLmFjY29yZGlvbl9fdGV4dFxcblxcbiAgJl9fdGV4dCB7XFxuICAgIGNvbG9yOiByZ2JhKDEzMiwgMTMyLCAxMzIsIDEpO1xcbiAgICAmOm5vdCg6bGFzdC1jaGlsZCkge1xcbiAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XFxuICAgIH1cXG4gIH1cXG59XFxuXCIsXCIvLyB0eXBvZ3JhcGh5XFxuQGltcG9ydCAnLi90eXBvJztcXG5cXG4vLyBpbnB1dFxcbkBpbXBvcnQgJy4vaW5wdXQnO1xcblxcbi8vIHNlbGVjdFxcbkBpbXBvcnQgJy4vc2VsZWN0JztcXG5cXG4vLyBhY2NvcmRpb25cXG5AaW1wb3J0ICcuL2FjY29yZGlvbic7XFxuXFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSDQtNC70Y8g0LTQtdC80L7QvdGB0YLRgNCw0YbQuNC4IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcblxcbi5mb3JtIHtcXG4gIG1hcmdpbjogM3JlbSBhdXRvO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgcm93LWdhcDogMnJlbTtcXG4gIG1heC13aWR0aDogODByZW07XFxuXFxuICAvLyAuZm9ybV9fZmllbGRzXFxuXFxuICAmX19maWVsZHMge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBjb2x1bW4tZ2FwOiAycmVtO1xcbiAgfVxcbn1cXG5cXG4uYnRuIHtcXG4gIHBhZGRpbmc6IDEuNnJlbSAzLjJyZW07XFxuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGNvbHVtbi1nYXA6IDEuNnJlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDVyZW07XFxuICBjb2xvcjogJHdoaXRlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogJGJsYWNrO1xcbn1cXG5cXG4udGFicyB7XFxuICBtYXJnaW46IDZyZW0gYXV0bztcXG4gIG1heC13aWR0aDogODByZW07XFxuXFxuICAvLyAudGFic19fbmF2aWdhdGlvblxcblxcbiAgJl9fbmF2aWdhdGlvbiB7XFxuICAgIG1hcmdpbi1ib3R0b206IDNyZW07XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBjb2x1bW4tZ2FwOiAycmVtO1xcbiAgfVxcblxcbiAgLy8gLnRhYnNfX2JvZHlcXG5cXG4gICZfX2JvZHkge1xcbiAgICBwYWRkaW5nOiAzcmVtO1xcbiAgICBib3JkZXItcmFkaXVzOiAzcmVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC40KTtcXG4gIH1cXG59XFxuXFxuLmRyb3Bkb3ducyB7XFxuICBtYXJnaW46IDNyZW0gYXV0bztcXG4gIG1heC13aWR0aDogODByZW07XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIHJvdy1nYXA6IDFyZW07XFxufVxcblxcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG5cIixudWxsXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbMl0udXNlWzFdIS4uLy4uL2dyb3VwLWNzcy1tZWRpYS1xdWVyaWVzLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zaW1wbGViYXIuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1syXS51c2VbMV0hLi4vLi4vZ3JvdXAtY3NzLW1lZGlhLXF1ZXJpZXMtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3NpbXBsZWJhci5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzJdLnVzZVsxXSEuLi8uLi9ub2RlX21vZHVsZXMvZ3JvdXAtY3NzLW1lZGlhLXF1ZXJpZXMtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbMl0udXNlWzFdIS4uLy4uL25vZGVfbW9kdWxlcy9ncm91cC1jc3MtbWVkaWEtcXVlcmllcy1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxuZXhwb3J0IGRlZmF1bHQgU3ltYm9sO1xuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuaW1wb3J0IGdldFJhd1RhZyBmcm9tICcuL19nZXRSYXdUYWcuanMnO1xuaW1wb3J0IG9iamVjdFRvU3RyaW5nIGZyb20gJy4vX29iamVjdFRvU3RyaW5nLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG51bGxUYWcgPSAnW29iamVjdCBOdWxsXScsXG4gICAgdW5kZWZpbmVkVGFnID0gJ1tvYmplY3QgVW5kZWZpbmVkXSc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRUYWdgIHdpdGhvdXQgZmFsbGJhY2tzIGZvciBidWdneSBlbnZpcm9ubWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldFRhZyh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkVGFnIDogbnVsbFRhZztcbiAgfVxuICByZXR1cm4gKHN5bVRvU3RyaW5nVGFnICYmIHN5bVRvU3RyaW5nVGFnIGluIE9iamVjdCh2YWx1ZSkpXG4gICAgPyBnZXRSYXdUYWcodmFsdWUpXG4gICAgOiBvYmplY3RUb1N0cmluZyh2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VHZXRUYWc7XG4iLCJpbXBvcnQgdHJpbW1lZEVuZEluZGV4IGZyb20gJy4vX3RyaW1tZWRFbmRJbmRleC5qcyc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgd2hpdGVzcGFjZS4gKi9cbnZhciByZVRyaW1TdGFydCA9IC9eXFxzKy87XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udHJpbWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byB0cmltLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgdHJpbW1lZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUcmltKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nXG4gICAgPyBzdHJpbmcuc2xpY2UoMCwgdHJpbW1lZEVuZEluZGV4KHN0cmluZykgKyAxKS5yZXBsYWNlKHJlVHJpbVN0YXJ0LCAnJylcbiAgICA6IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVRyaW07XG4iLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5leHBvcnQgZGVmYXVsdCBmcmVlR2xvYmFsO1xuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFJhd1RhZztcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBvYmplY3RUb1N0cmluZztcbiIsImltcG9ydCBmcmVlR2xvYmFsIGZyb20gJy4vX2ZyZWVHbG9iYWwuanMnO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvb3Q7XG4iLCIvKiogVXNlZCB0byBtYXRjaCBhIHNpbmdsZSB3aGl0ZXNwYWNlIGNoYXJhY3Rlci4gKi9cbnZhciByZVdoaXRlc3BhY2UgPSAvXFxzLztcblxuLyoqXG4gKiBVc2VkIGJ5IGBfLnRyaW1gIGFuZCBgXy50cmltRW5kYCB0byBnZXQgdGhlIGluZGV4IG9mIHRoZSBsYXN0IG5vbi13aGl0ZXNwYWNlXG4gKiBjaGFyYWN0ZXIgb2YgYHN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBpbnNwZWN0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGxhc3Qgbm9uLXdoaXRlc3BhY2UgY2hhcmFjdGVyLlxuICovXG5mdW5jdGlvbiB0cmltbWVkRW5kSW5kZXgoc3RyaW5nKSB7XG4gIHZhciBpbmRleCA9IHN0cmluZy5sZW5ndGg7XG5cbiAgd2hpbGUgKGluZGV4LS0gJiYgcmVXaGl0ZXNwYWNlLnRlc3Qoc3RyaW5nLmNoYXJBdChpbmRleCkpKSB7fVxuICByZXR1cm4gaW5kZXg7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyaW1tZWRFbmRJbmRleDtcbiIsImltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcbmltcG9ydCBub3cgZnJvbSAnLi9ub3cuanMnO1xuaW1wb3J0IHRvTnVtYmVyIGZyb20gJy4vdG9OdW1iZXIuanMnO1xuXG4vKiogRXJyb3IgbWVzc2FnZSBjb25zdGFudHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXgsXG4gICAgbmF0aXZlTWluID0gTWF0aC5taW47XG5cbi8qKlxuICogQ3JlYXRlcyBhIGRlYm91bmNlZCBmdW5jdGlvbiB0aGF0IGRlbGF5cyBpbnZva2luZyBgZnVuY2AgdW50aWwgYWZ0ZXIgYHdhaXRgXG4gKiBtaWxsaXNlY29uZHMgaGF2ZSBlbGFwc2VkIHNpbmNlIHRoZSBsYXN0IHRpbWUgdGhlIGRlYm91bmNlZCBmdW5jdGlvbiB3YXNcbiAqIGludm9rZWQuIFRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gY29tZXMgd2l0aCBhIGBjYW5jZWxgIG1ldGhvZCB0byBjYW5jZWxcbiAqIGRlbGF5ZWQgYGZ1bmNgIGludm9jYXRpb25zIGFuZCBhIGBmbHVzaGAgbWV0aG9kIHRvIGltbWVkaWF0ZWx5IGludm9rZSB0aGVtLlxuICogUHJvdmlkZSBgb3B0aW9uc2AgdG8gaW5kaWNhdGUgd2hldGhlciBgZnVuY2Agc2hvdWxkIGJlIGludm9rZWQgb24gdGhlXG4gKiBsZWFkaW5nIGFuZC9vciB0cmFpbGluZyBlZGdlIG9mIHRoZSBgd2FpdGAgdGltZW91dC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkXG4gKiB3aXRoIHRoZSBsYXN0IGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uLiBTdWJzZXF1ZW50XG4gKiBjYWxscyB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYFxuICogaW52b2NhdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogSWYgYGxlYWRpbmdgIGFuZCBgdHJhaWxpbmdgIG9wdGlvbnMgYXJlIGB0cnVlYCwgYGZ1bmNgIGlzXG4gKiBpbnZva2VkIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0IG9ubHkgaWYgdGhlIGRlYm91bmNlZCBmdW5jdGlvblxuICogaXMgaW52b2tlZCBtb3JlIHRoYW4gb25jZSBkdXJpbmcgdGhlIGB3YWl0YCB0aW1lb3V0LlxuICpcbiAqIElmIGB3YWl0YCBpcyBgMGAgYW5kIGBsZWFkaW5nYCBpcyBgZmFsc2VgLCBgZnVuY2AgaW52b2NhdGlvbiBpcyBkZWZlcnJlZFxuICogdW50aWwgdG8gdGhlIG5leHQgdGljaywgc2ltaWxhciB0byBgc2V0VGltZW91dGAgd2l0aCBhIHRpbWVvdXQgb2YgYDBgLlxuICpcbiAqIFNlZSBbRGF2aWQgQ29yYmFjaG8ncyBhcnRpY2xlXShodHRwczovL2Nzcy10cmlja3MuY29tL2RlYm91bmNpbmctdGhyb3R0bGluZy1leHBsYWluZWQtZXhhbXBsZXMvKVxuICogZm9yIGRldGFpbHMgb3ZlciB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiBgXy5kZWJvdW5jZWAgYW5kIGBfLnRocm90dGxlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRlYm91bmNlLlxuICogQHBhcmFtIHtudW1iZXJ9IFt3YWl0PTBdIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIGRlbGF5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlYWRpbmc9ZmFsc2VdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgbGVhZGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFdhaXRdXG4gKiAgVGhlIG1heGltdW0gdGltZSBgZnVuY2AgaXMgYWxsb3dlZCB0byBiZSBkZWxheWVkIGJlZm9yZSBpdCdzIGludm9rZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnRyYWlsaW5nPXRydWVdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGRlYm91bmNlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gQXZvaWQgY29zdGx5IGNhbGN1bGF0aW9ucyB3aGlsZSB0aGUgd2luZG93IHNpemUgaXMgaW4gZmx1eC5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdyZXNpemUnLCBfLmRlYm91bmNlKGNhbGN1bGF0ZUxheW91dCwgMTUwKSk7XG4gKlxuICogLy8gSW52b2tlIGBzZW5kTWFpbGAgd2hlbiBjbGlja2VkLCBkZWJvdW5jaW5nIHN1YnNlcXVlbnQgY2FsbHMuXG4gKiBqUXVlcnkoZWxlbWVudCkub24oJ2NsaWNrJywgXy5kZWJvdW5jZShzZW5kTWFpbCwgMzAwLCB7XG4gKiAgICdsZWFkaW5nJzogdHJ1ZSxcbiAqICAgJ3RyYWlsaW5nJzogZmFsc2VcbiAqIH0pKTtcbiAqXG4gKiAvLyBFbnN1cmUgYGJhdGNoTG9nYCBpcyBpbnZva2VkIG9uY2UgYWZ0ZXIgMSBzZWNvbmQgb2YgZGVib3VuY2VkIGNhbGxzLlxuICogdmFyIGRlYm91bmNlZCA9IF8uZGVib3VuY2UoYmF0Y2hMb2csIDI1MCwgeyAnbWF4V2FpdCc6IDEwMDAgfSk7XG4gKiB2YXIgc291cmNlID0gbmV3IEV2ZW50U291cmNlKCcvc3RyZWFtJyk7XG4gKiBqUXVlcnkoc291cmNlKS5vbignbWVzc2FnZScsIGRlYm91bmNlZCk7XG4gKlxuICogLy8gQ2FuY2VsIHRoZSB0cmFpbGluZyBkZWJvdW5jZWQgaW52b2NhdGlvbi5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIGRlYm91bmNlZC5jYW5jZWwpO1xuICovXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBsYXN0QXJncyxcbiAgICAgIGxhc3RUaGlzLFxuICAgICAgbWF4V2FpdCxcbiAgICAgIHJlc3VsdCxcbiAgICAgIHRpbWVySWQsXG4gICAgICBsYXN0Q2FsbFRpbWUsXG4gICAgICBsYXN0SW52b2tlVGltZSA9IDAsXG4gICAgICBsZWFkaW5nID0gZmFsc2UsXG4gICAgICBtYXhpbmcgPSBmYWxzZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB3YWl0ID0gdG9OdW1iZXIod2FpdCkgfHwgMDtcbiAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgbGVhZGluZyA9ICEhb3B0aW9ucy5sZWFkaW5nO1xuICAgIG1heGluZyA9ICdtYXhXYWl0JyBpbiBvcHRpb25zO1xuICAgIG1heFdhaXQgPSBtYXhpbmcgPyBuYXRpdmVNYXgodG9OdW1iZXIob3B0aW9ucy5tYXhXYWl0KSB8fCAwLCB3YWl0KSA6IG1heFdhaXQ7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGludm9rZUZ1bmModGltZSkge1xuICAgIHZhciBhcmdzID0gbGFzdEFyZ3MsXG4gICAgICAgIHRoaXNBcmcgPSBsYXN0VGhpcztcblxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxlYWRpbmdFZGdlKHRpbWUpIHtcbiAgICAvLyBSZXNldCBhbnkgYG1heFdhaXRgIHRpbWVyLlxuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICAvLyBTdGFydCB0aGUgdGltZXIgZm9yIHRoZSB0cmFpbGluZyBlZGdlLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgLy8gSW52b2tlIHRoZSBsZWFkaW5nIGVkZ2UuXG4gICAgcmV0dXJuIGxlYWRpbmcgPyBpbnZva2VGdW5jKHRpbWUpIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtYWluaW5nV2FpdCh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZSxcbiAgICAgICAgdGltZVdhaXRpbmcgPSB3YWl0IC0gdGltZVNpbmNlTGFzdENhbGw7XG5cbiAgICByZXR1cm4gbWF4aW5nXG4gICAgICA/IG5hdGl2ZU1pbih0aW1lV2FpdGluZywgbWF4V2FpdCAtIHRpbWVTaW5jZUxhc3RJbnZva2UpXG4gICAgICA6IHRpbWVXYWl0aW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkSW52b2tlKHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lO1xuXG4gICAgLy8gRWl0aGVyIHRoaXMgaXMgdGhlIGZpcnN0IGNhbGwsIGFjdGl2aXR5IGhhcyBzdG9wcGVkIGFuZCB3ZSdyZSBhdCB0aGVcbiAgICAvLyB0cmFpbGluZyBlZGdlLCB0aGUgc3lzdGVtIHRpbWUgaGFzIGdvbmUgYmFja3dhcmRzIGFuZCB3ZSdyZSB0cmVhdGluZ1xuICAgIC8vIGl0IGFzIHRoZSB0cmFpbGluZyBlZGdlLCBvciB3ZSd2ZSBoaXQgdGhlIGBtYXhXYWl0YCBsaW1pdC5cbiAgICByZXR1cm4gKGxhc3RDYWxsVGltZSA9PT0gdW5kZWZpbmVkIHx8ICh0aW1lU2luY2VMYXN0Q2FsbCA+PSB3YWl0KSB8fFxuICAgICAgKHRpbWVTaW5jZUxhc3RDYWxsIDwgMCkgfHwgKG1heGluZyAmJiB0aW1lU2luY2VMYXN0SW52b2tlID49IG1heFdhaXQpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRpbWVyRXhwaXJlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpO1xuICAgIGlmIChzaG91bGRJbnZva2UodGltZSkpIHtcbiAgICAgIHJldHVybiB0cmFpbGluZ0VkZ2UodGltZSk7XG4gICAgfVxuICAgIC8vIFJlc3RhcnQgdGhlIHRpbWVyLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgcmVtYWluaW5nV2FpdCh0aW1lKSk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFpbGluZ0VkZ2UodGltZSkge1xuICAgIHRpbWVySWQgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBPbmx5IGludm9rZSBpZiB3ZSBoYXZlIGBsYXN0QXJnc2Agd2hpY2ggbWVhbnMgYGZ1bmNgIGhhcyBiZWVuXG4gICAgLy8gZGVib3VuY2VkIGF0IGxlYXN0IG9uY2UuXG4gICAgaWYgKHRyYWlsaW5nICYmIGxhc3RBcmdzKSB7XG4gICAgICByZXR1cm4gaW52b2tlRnVuYyh0aW1lKTtcbiAgICB9XG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIGlmICh0aW1lcklkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICB9XG4gICAgbGFzdEludm9rZVRpbWUgPSAwO1xuICAgIGxhc3RBcmdzID0gbGFzdENhbGxUaW1lID0gbGFzdFRoaXMgPSB0aW1lcklkID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgcmV0dXJuIHRpbWVySWQgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IHRyYWlsaW5nRWRnZShub3coKSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWJvdW5jZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKSxcbiAgICAgICAgaXNJbnZva2luZyA9IHNob3VsZEludm9rZSh0aW1lKTtcblxuICAgIGxhc3RBcmdzID0gYXJndW1lbnRzO1xuICAgIGxhc3RUaGlzID0gdGhpcztcbiAgICBsYXN0Q2FsbFRpbWUgPSB0aW1lO1xuXG4gICAgaWYgKGlzSW52b2tpbmcpIHtcbiAgICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGxlYWRpbmdFZGdlKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgICBpZiAobWF4aW5nKSB7XG4gICAgICAgIC8vIEhhbmRsZSBpbnZvY2F0aW9ucyBpbiBhIHRpZ2h0IGxvb3AuXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAgICAgcmV0dXJuIGludm9rZUZ1bmMobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBkZWJvdW5jZWQuY2FuY2VsID0gY2FuY2VsO1xuICBkZWJvdW5jZWQuZmx1c2ggPSBmbHVzaDtcbiAgcmV0dXJuIGRlYm91bmNlZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVib3VuY2U7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNPYmplY3Q7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNPYmplY3RMaWtlO1xuIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc1N5bWJvbDtcbiIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKipcbiAqIEdldHMgdGhlIHRpbWVzdGFtcCBvZiB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IGhhdmUgZWxhcHNlZCBzaW5jZVxuICogdGhlIFVuaXggZXBvY2ggKDEgSmFudWFyeSAxOTcwIDAwOjAwOjAwIFVUQykuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IERhdGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHRpbWVzdGFtcC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5kZWZlcihmdW5jdGlvbihzdGFtcCkge1xuICogICBjb25zb2xlLmxvZyhfLm5vdygpIC0gc3RhbXApO1xuICogfSwgXy5ub3coKSk7XG4gKiAvLyA9PiBMb2dzIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGl0IHRvb2sgZm9yIHRoZSBkZWZlcnJlZCBpbnZvY2F0aW9uLlxuICovXG52YXIgbm93ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiByb290LkRhdGUubm93KCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBub3c7XG4iLCJpbXBvcnQgZGVib3VuY2UgZnJvbSAnLi9kZWJvdW5jZS5qcyc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5cbi8qKiBFcnJvciBtZXNzYWdlIGNvbnN0YW50cy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHRocm90dGxlZCBmdW5jdGlvbiB0aGF0IG9ubHkgaW52b2tlcyBgZnVuY2AgYXQgbW9zdCBvbmNlIHBlclxuICogZXZlcnkgYHdhaXRgIG1pbGxpc2Vjb25kcy4gVGhlIHRocm90dGxlZCBmdW5jdGlvbiBjb21lcyB3aXRoIGEgYGNhbmNlbGBcbiAqIG1ldGhvZCB0byBjYW5jZWwgZGVsYXllZCBgZnVuY2AgaW52b2NhdGlvbnMgYW5kIGEgYGZsdXNoYCBtZXRob2QgdG9cbiAqIGltbWVkaWF0ZWx5IGludm9rZSB0aGVtLiBQcm92aWRlIGBvcHRpb25zYCB0byBpbmRpY2F0ZSB3aGV0aGVyIGBmdW5jYFxuICogc2hvdWxkIGJlIGludm9rZWQgb24gdGhlIGxlYWRpbmcgYW5kL29yIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIGB3YWl0YFxuICogdGltZW91dC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkIHdpdGggdGhlIGxhc3QgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZVxuICogdGhyb3R0bGVkIGZ1bmN0aW9uLiBTdWJzZXF1ZW50IGNhbGxzIHRvIHRoZSB0aHJvdHRsZWQgZnVuY3Rpb24gcmV0dXJuIHRoZVxuICogcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYCBpbnZvY2F0aW9uLlxuICpcbiAqICoqTm90ZToqKiBJZiBgbGVhZGluZ2AgYW5kIGB0cmFpbGluZ2Agb3B0aW9ucyBhcmUgYHRydWVgLCBgZnVuY2AgaXNcbiAqIGludm9rZWQgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQgb25seSBpZiB0aGUgdGhyb3R0bGVkIGZ1bmN0aW9uXG4gKiBpcyBpbnZva2VkIG1vcmUgdGhhbiBvbmNlIGR1cmluZyB0aGUgYHdhaXRgIHRpbWVvdXQuXG4gKlxuICogSWYgYHdhaXRgIGlzIGAwYCBhbmQgYGxlYWRpbmdgIGlzIGBmYWxzZWAsIGBmdW5jYCBpbnZvY2F0aW9uIGlzIGRlZmVycmVkXG4gKiB1bnRpbCB0byB0aGUgbmV4dCB0aWNrLCBzaW1pbGFyIHRvIGBzZXRUaW1lb3V0YCB3aXRoIGEgdGltZW91dCBvZiBgMGAuXG4gKlxuICogU2VlIFtEYXZpZCBDb3JiYWNobydzIGFydGljbGVdKGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vZGVib3VuY2luZy10aHJvdHRsaW5nLWV4cGxhaW5lZC1leGFtcGxlcy8pXG4gKiBmb3IgZGV0YWlscyBvdmVyIHRoZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIGBfLnRocm90dGxlYCBhbmQgYF8uZGVib3VuY2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gdGhyb3R0bGUuXG4gKiBAcGFyYW0ge251bWJlcn0gW3dhaXQ9MF0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gdGhyb3R0bGUgaW52b2NhdGlvbnMgdG8uXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVhZGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudHJhaWxpbmc9dHJ1ZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgdGhyb3R0bGVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBBdm9pZCBleGNlc3NpdmVseSB1cGRhdGluZyB0aGUgcG9zaXRpb24gd2hpbGUgc2Nyb2xsaW5nLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3Njcm9sbCcsIF8udGhyb3R0bGUodXBkYXRlUG9zaXRpb24sIDEwMCkpO1xuICpcbiAqIC8vIEludm9rZSBgcmVuZXdUb2tlbmAgd2hlbiB0aGUgY2xpY2sgZXZlbnQgaXMgZmlyZWQsIGJ1dCBub3QgbW9yZSB0aGFuIG9uY2UgZXZlcnkgNSBtaW51dGVzLlxuICogdmFyIHRocm90dGxlZCA9IF8udGhyb3R0bGUocmVuZXdUb2tlbiwgMzAwMDAwLCB7ICd0cmFpbGluZyc6IGZhbHNlIH0pO1xuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIHRocm90dGxlZCk7XG4gKlxuICogLy8gQ2FuY2VsIHRoZSB0cmFpbGluZyB0aHJvdHRsZWQgaW52b2NhdGlvbi5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIHRocm90dGxlZC5jYW5jZWwpO1xuICovXG5mdW5jdGlvbiB0aHJvdHRsZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBsZWFkaW5nID0gdHJ1ZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICBsZWFkaW5nID0gJ2xlYWRpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMubGVhZGluZyA6IGxlYWRpbmc7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuICByZXR1cm4gZGVib3VuY2UoZnVuYywgd2FpdCwge1xuICAgICdsZWFkaW5nJzogbGVhZGluZyxcbiAgICAnbWF4V2FpdCc6IHdhaXQsXG4gICAgJ3RyYWlsaW5nJzogdHJhaWxpbmdcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRocm90dGxlO1xuIiwiaW1wb3J0IGJhc2VUcmltIGZyb20gJy4vX2Jhc2VUcmltLmpzJztcbmltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcbmltcG9ydCBpc1N5bWJvbCBmcm9tICcuL2lzU3ltYm9sLmpzJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTkFOID0gMCAvIDA7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiYWQgc2lnbmVkIGhleGFkZWNpbWFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JhZEhleCA9IC9eWy0rXTB4WzAtOWEtZl0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmluYXJ5IHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JpbmFyeSA9IC9eMGJbMDFdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG9jdGFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc09jdGFsID0gL14wb1swLTddKyQvaTtcblxuLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbnZhciBmcmVlUGFyc2VJbnQgPSBwYXJzZUludDtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvTnVtYmVyKDMuMik7XG4gKiAvLyA9PiAzLjJcbiAqXG4gKiBfLnRvTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b051bWJlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBJbmZpbml0eVxuICpcbiAqIF8udG9OdW1iZXIoJzMuMicpO1xuICogLy8gPT4gMy4yXG4gKi9cbmZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBOQU47XG4gIH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHZhciBvdGhlciA9IHR5cGVvZiB2YWx1ZS52YWx1ZU9mID09ICdmdW5jdGlvbicgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbiAgICB2YWx1ZSA9IGlzT2JqZWN0KG90aGVyKSA/IChvdGhlciArICcnKSA6IG90aGVyO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6ICt2YWx1ZTtcbiAgfVxuICB2YWx1ZSA9IGJhc2VUcmltKHZhbHVlKTtcbiAgdmFyIGlzQmluYXJ5ID0gcmVJc0JpbmFyeS50ZXN0KHZhbHVlKTtcbiAgcmV0dXJuIChpc0JpbmFyeSB8fCByZUlzT2N0YWwudGVzdCh2YWx1ZSkpXG4gICAgPyBmcmVlUGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIGlzQmluYXJ5ID8gMiA6IDgpXG4gICAgOiAocmVJc0JhZEhleC50ZXN0KHZhbHVlKSA/IE5BTiA6ICt2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRvTnVtYmVyO1xuIiwiLyoqXG4gKiBzaW1wbGViYXItY29yZSAtIHYxLjIuNFxuICogU2Nyb2xsYmFycywgc2ltcGxlci5cbiAqIGh0dHBzOi8vZ3JzbXRvLmdpdGh1Yi5pby9zaW1wbGViYXIvXG4gKlxuICogTWFkZSBieSBBZHJpZW4gRGVuYXQgZnJvbSBhIGZvcmsgYnkgSm9uYXRoYW4gTmljb2xcbiAqIFVuZGVyIE1JVCBMaWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgdGhyb3R0bGUsIGRlYm91bmNlIH0gZnJvbSAnbG9kYXNoLWVzJztcbmltcG9ydCBjYW5Vc2VET00gZnJvbSAnY2FuLXVzZS1kb20nO1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcbnZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn07XG5cbnZhciBjYWNoZWRTY3JvbGxiYXJXaWR0aCA9IG51bGw7XG52YXIgY2FjaGVkRGV2aWNlUGl4ZWxSYXRpbyA9IG51bGw7XG5pZiAoY2FuVXNlRE9NKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGNhY2hlZERldmljZVBpeGVsUmF0aW8gIT09IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKSB7XG4gICAgICAgICAgICBjYWNoZWREZXZpY2VQaXhlbFJhdGlvID0gd2luZG93LmRldmljZVBpeGVsUmF0aW87XG4gICAgICAgICAgICBjYWNoZWRTY3JvbGxiYXJXaWR0aCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHNjcm9sbGJhcldpZHRoKCkge1xuICAgIGlmIChjYWNoZWRTY3JvbGxiYXJXaWR0aCA9PT0gbnVsbCkge1xuICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgY2FjaGVkU2Nyb2xsYmFyV2lkdGggPSAwO1xuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNjcm9sbGJhcldpZHRoO1xuICAgICAgICB9XG4gICAgICAgIHZhciBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICAgICAgdmFyIGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBib3guY2xhc3NMaXN0LmFkZCgnc2ltcGxlYmFyLWhpZGUtc2Nyb2xsYmFyJyk7XG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoYm94KTtcbiAgICAgICAgdmFyIHdpZHRoID0gYm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnJpZ2h0O1xuICAgICAgICBib2R5LnJlbW92ZUNoaWxkKGJveCk7XG4gICAgICAgIGNhY2hlZFNjcm9sbGJhcldpZHRoID0gd2lkdGg7XG4gICAgfVxuICAgIHJldHVybiBjYWNoZWRTY3JvbGxiYXJXaWR0aDtcbn1cblxuZnVuY3Rpb24gZ2V0RWxlbWVudFdpbmRvdyQxKGVsZW1lbnQpIHtcbiAgICBpZiAoIWVsZW1lbnQgfHxcbiAgICAgICAgIWVsZW1lbnQub3duZXJEb2N1bWVudCB8fFxuICAgICAgICAhZWxlbWVudC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3KSB7XG4gICAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XG59XG5mdW5jdGlvbiBnZXRFbGVtZW50RG9jdW1lbnQkMShlbGVtZW50KSB7XG4gICAgaWYgKCFlbGVtZW50IHx8ICFlbGVtZW50Lm93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50O1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudC5vd25lckRvY3VtZW50O1xufVxuLy8gSGVscGVyIGZ1bmN0aW9uIHRvIHJldHJpZXZlIG9wdGlvbnMgZnJvbSBlbGVtZW50IGF0dHJpYnV0ZXNcbnZhciBnZXRPcHRpb25zJDEgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIGluaXRpYWxPYmogPSB7fTtcbiAgICB2YXIgb3B0aW9ucyA9IEFycmF5LnByb3RvdHlwZS5yZWR1Y2UuY2FsbChvYmosIGZ1bmN0aW9uIChhY2MsIGF0dHJpYnV0ZSkge1xuICAgICAgICB2YXIgb3B0aW9uID0gYXR0cmlidXRlLm5hbWUubWF0Y2goL2RhdGEtc2ltcGxlYmFyLSguKykvKTtcbiAgICAgICAgaWYgKG9wdGlvbikge1xuICAgICAgICAgICAgdmFyIGtleSA9IG9wdGlvblsxXS5yZXBsYWNlKC9cXFcrKC4pL2csIGZ1bmN0aW9uIChfLCBjaHIpIHsgcmV0dXJuIGNoci50b1VwcGVyQ2FzZSgpOyB9KTtcbiAgICAgICAgICAgIHN3aXRjaCAoYXR0cmlidXRlLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAndHJ1ZSc6XG4gICAgICAgICAgICAgICAgICAgIGFjY1trZXldID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZmFsc2UnOlxuICAgICAgICAgICAgICAgICAgICBhY2Nba2V5XSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgICAgICAgICAgICAgICAgYWNjW2tleV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBhY2Nba2V5XSA9IGF0dHJpYnV0ZS52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIGluaXRpYWxPYmopO1xuICAgIHJldHVybiBvcHRpb25zO1xufTtcbmZ1bmN0aW9uIGFkZENsYXNzZXMkMShlbCwgY2xhc3Nlcykge1xuICAgIHZhciBfYTtcbiAgICBpZiAoIWVsKVxuICAgICAgICByZXR1cm47XG4gICAgKF9hID0gZWwuY2xhc3NMaXN0KS5hZGQuYXBwbHkoX2EsIGNsYXNzZXMuc3BsaXQoJyAnKSk7XG59XG5mdW5jdGlvbiByZW1vdmVDbGFzc2VzJDEoZWwsIGNsYXNzZXMpIHtcbiAgICBpZiAoIWVsKVxuICAgICAgICByZXR1cm47XG4gICAgY2xhc3Nlcy5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjbGFzc05hbWVzVG9RdWVyeSQxKGNsYXNzTmFtZXMpIHtcbiAgICByZXR1cm4gXCIuXCIuY29uY2F0KGNsYXNzTmFtZXMuc3BsaXQoJyAnKS5qb2luKCcuJykpO1xufVxuXG52YXIgaGVscGVycyA9IC8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKHtcbiAgICBfX3Byb3RvX186IG51bGwsXG4gICAgZ2V0RWxlbWVudFdpbmRvdzogZ2V0RWxlbWVudFdpbmRvdyQxLFxuICAgIGdldEVsZW1lbnREb2N1bWVudDogZ2V0RWxlbWVudERvY3VtZW50JDEsXG4gICAgZ2V0T3B0aW9uczogZ2V0T3B0aW9ucyQxLFxuICAgIGFkZENsYXNzZXM6IGFkZENsYXNzZXMkMSxcbiAgICByZW1vdmVDbGFzc2VzOiByZW1vdmVDbGFzc2VzJDEsXG4gICAgY2xhc3NOYW1lc1RvUXVlcnk6IGNsYXNzTmFtZXNUb1F1ZXJ5JDFcbn0pO1xuXG52YXIgZ2V0RWxlbWVudFdpbmRvdyA9IGdldEVsZW1lbnRXaW5kb3ckMSwgZ2V0RWxlbWVudERvY3VtZW50ID0gZ2V0RWxlbWVudERvY3VtZW50JDEsIGdldE9wdGlvbnMgPSBnZXRPcHRpb25zJDEsIGFkZENsYXNzZXMgPSBhZGRDbGFzc2VzJDEsIHJlbW92ZUNsYXNzZXMgPSByZW1vdmVDbGFzc2VzJDEsIGNsYXNzTmFtZXNUb1F1ZXJ5ID0gY2xhc3NOYW1lc1RvUXVlcnkkMTtcbnZhciBTaW1wbGVCYXJDb3JlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNpbXBsZUJhckNvcmUoZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLnJlbW92ZVByZXZlbnRDbGlja0lkID0gbnVsbDtcbiAgICAgICAgdGhpcy5taW5TY3JvbGxiYXJXaWR0aCA9IDIwO1xuICAgICAgICB0aGlzLnN0b3BTY3JvbGxEZWxheSA9IDE3NTtcbiAgICAgICAgdGhpcy5pc1Njcm9sbGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTW91c2VFbnRlcmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjcm9sbFhUaWNraW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2Nyb2xsWVRpY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy53cmFwcGVyRWwgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRlbnRXcmFwcGVyRWwgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRlbnRFbCA9IG51bGw7XG4gICAgICAgIHRoaXMub2Zmc2V0RWwgPSBudWxsO1xuICAgICAgICB0aGlzLm1hc2tFbCA9IG51bGw7XG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXJFbCA9IG51bGw7XG4gICAgICAgIHRoaXMuaGVpZ2h0QXV0b09ic2VydmVyV3JhcHBlckVsID0gbnVsbDtcbiAgICAgICAgdGhpcy5oZWlnaHRBdXRvT2JzZXJ2ZXJFbCA9IG51bGw7XG4gICAgICAgIHRoaXMucnRsSGVscGVycyA9IG51bGw7XG4gICAgICAgIHRoaXMuc2Nyb2xsYmFyV2lkdGggPSAwO1xuICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5tdXRhdGlvbk9ic2VydmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5lbFN0eWxlcyA9IG51bGw7XG4gICAgICAgIHRoaXMuaXNSdGwgPSBudWxsO1xuICAgICAgICB0aGlzLm1vdXNlWCA9IDA7XG4gICAgICAgIHRoaXMubW91c2VZID0gMDtcbiAgICAgICAgdGhpcy5vbk1vdXNlTW92ZSA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAgICAgdGhpcy5vbldpbmRvd1Jlc2l6ZSA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAgICAgdGhpcy5vblN0b3BTY3JvbGxpbmcgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgIHRoaXMub25Nb3VzZUVudGVyZWQgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPbiBzY3JvbGwgZXZlbnQgaGFuZGxpbmdcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMub25TY3JvbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZWxXaW5kb3cgPSBnZXRFbGVtZW50V2luZG93KF90aGlzLmVsKTtcbiAgICAgICAgICAgIGlmICghX3RoaXMuc2Nyb2xsWFRpY2tpbmcpIHtcbiAgICAgICAgICAgICAgICBlbFdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoX3RoaXMuc2Nyb2xsWCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2Nyb2xsWFRpY2tpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFfdGhpcy5zY3JvbGxZVGlja2luZykge1xuICAgICAgICAgICAgICAgIGVsV2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShfdGhpcy5zY3JvbGxZKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5zY3JvbGxZVGlja2luZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIV90aGlzLmlzU2Nyb2xsaW5nKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaXNTY3JvbGxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGFkZENsYXNzZXMoX3RoaXMuZWwsIF90aGlzLmNsYXNzTmFtZXMuc2Nyb2xsaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLnNob3dTY3JvbGxiYXIoJ3gnKTtcbiAgICAgICAgICAgIF90aGlzLnNob3dTY3JvbGxiYXIoJ3knKTtcbiAgICAgICAgICAgIF90aGlzLm9uU3RvcFNjcm9sbGluZygpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjcm9sbFggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMuYXhpcy54LmlzT3ZlcmZsb3dpbmcpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5wb3NpdGlvblNjcm9sbGJhcigneCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuc2Nyb2xsWFRpY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY3JvbGxZID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKF90aGlzLmF4aXMueS5pc092ZXJmbG93aW5nKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMucG9zaXRpb25TY3JvbGxiYXIoJ3knKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLnNjcm9sbFlUaWNraW5nID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX29uU3RvcFNjcm9sbGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzZXMoX3RoaXMuZWwsIF90aGlzLmNsYXNzTmFtZXMuc2Nyb2xsaW5nKTtcbiAgICAgICAgICAgIGlmIChfdGhpcy5vcHRpb25zLmF1dG9IaWRlKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaGlkZVNjcm9sbGJhcigneCcpO1xuICAgICAgICAgICAgICAgIF90aGlzLmhpZGVTY3JvbGxiYXIoJ3knKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmlzU2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25Nb3VzZUVudGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFfdGhpcy5pc01vdXNlRW50ZXJpbmcpIHtcbiAgICAgICAgICAgICAgICBhZGRDbGFzc2VzKF90aGlzLmVsLCBfdGhpcy5jbGFzc05hbWVzLm1vdXNlRW50ZXJlZCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2hvd1Njcm9sbGJhcigneCcpO1xuICAgICAgICAgICAgICAgIF90aGlzLnNob3dTY3JvbGxiYXIoJ3knKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5pc01vdXNlRW50ZXJpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMub25Nb3VzZUVudGVyZWQoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fb25Nb3VzZUVudGVyZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZW1vdmVDbGFzc2VzKF90aGlzLmVsLCBfdGhpcy5jbGFzc05hbWVzLm1vdXNlRW50ZXJlZCk7XG4gICAgICAgICAgICBpZiAoX3RoaXMub3B0aW9ucy5hdXRvSGlkZSkge1xuICAgICAgICAgICAgICAgIF90aGlzLmhpZGVTY3JvbGxiYXIoJ3gnKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5oaWRlU2Nyb2xsYmFyKCd5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5pc01vdXNlRW50ZXJpbmcgPSBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fb25Nb3VzZU1vdmUgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgX3RoaXMubW91c2VYID0gZS5jbGllbnRYO1xuICAgICAgICAgICAgX3RoaXMubW91c2VZID0gZS5jbGllbnRZO1xuICAgICAgICAgICAgaWYgKF90aGlzLmF4aXMueC5pc092ZXJmbG93aW5nIHx8IF90aGlzLmF4aXMueC5mb3JjZVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5vbk1vdXNlTW92ZUZvckF4aXMoJ3gnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChfdGhpcy5heGlzLnkuaXNPdmVyZmxvd2luZyB8fCBfdGhpcy5heGlzLnkuZm9yY2VWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMub25Nb3VzZU1vdmVGb3JBeGlzKCd5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25Nb3VzZUxlYXZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMub25Nb3VzZU1vdmUuY2FuY2VsKCk7XG4gICAgICAgICAgICBpZiAoX3RoaXMuYXhpcy54LmlzT3ZlcmZsb3dpbmcgfHwgX3RoaXMuYXhpcy54LmZvcmNlVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIF90aGlzLm9uTW91c2VMZWF2ZUZvckF4aXMoJ3gnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChfdGhpcy5heGlzLnkuaXNPdmVyZmxvd2luZyB8fCBfdGhpcy5heGlzLnkuZm9yY2VWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMub25Nb3VzZUxlYXZlRm9yQXhpcygneScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMubW91c2VYID0gLTE7XG4gICAgICAgICAgICBfdGhpcy5tb3VzZVkgPSAtMTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fb25XaW5kb3dSZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBSZWNhbGN1bGF0ZSBzY3JvbGxiYXJXaWR0aCBpbiBjYXNlIGl0J3MgYSB6b29tXG4gICAgICAgICAgICBfdGhpcy5zY3JvbGxiYXJXaWR0aCA9IF90aGlzLmdldFNjcm9sbGJhcldpZHRoKCk7XG4gICAgICAgICAgICBfdGhpcy5oaWRlTmF0aXZlU2Nyb2xsYmFyKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25Qb2ludGVyRXZlbnQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKCFfdGhpcy5heGlzLngudHJhY2suZWwgfHxcbiAgICAgICAgICAgICAgICAhX3RoaXMuYXhpcy55LnRyYWNrLmVsIHx8XG4gICAgICAgICAgICAgICAgIV90aGlzLmF4aXMueC5zY3JvbGxiYXIuZWwgfHxcbiAgICAgICAgICAgICAgICAhX3RoaXMuYXhpcy55LnNjcm9sbGJhci5lbClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB2YXIgaXNXaXRoaW5UcmFja1hCb3VuZHMsIGlzV2l0aGluVHJhY2tZQm91bmRzO1xuICAgICAgICAgICAgX3RoaXMuYXhpcy54LnRyYWNrLnJlY3QgPSBfdGhpcy5heGlzLngudHJhY2suZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBfdGhpcy5heGlzLnkudHJhY2sucmVjdCA9IF90aGlzLmF4aXMueS50cmFjay5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGlmIChfdGhpcy5heGlzLnguaXNPdmVyZmxvd2luZyB8fCBfdGhpcy5heGlzLnguZm9yY2VWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgaXNXaXRoaW5UcmFja1hCb3VuZHMgPSBfdGhpcy5pc1dpdGhpbkJvdW5kcyhfdGhpcy5heGlzLngudHJhY2sucmVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoX3RoaXMuYXhpcy55LmlzT3ZlcmZsb3dpbmcgfHwgX3RoaXMuYXhpcy55LmZvcmNlVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIGlzV2l0aGluVHJhY2tZQm91bmRzID0gX3RoaXMuaXNXaXRoaW5Cb3VuZHMoX3RoaXMuYXhpcy55LnRyYWNrLnJlY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgYW55IHBvaW50ZXIgZXZlbnQgaXMgY2FsbGVkIG9uIHRoZSBzY3JvbGxiYXJcbiAgICAgICAgICAgIGlmIChpc1dpdGhpblRyYWNrWEJvdW5kcyB8fCBpc1dpdGhpblRyYWNrWUJvdW5kcykge1xuICAgICAgICAgICAgICAgIC8vIFByZXZlbnQgZXZlbnQgbGVha2luZ1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKGUudHlwZSA9PT0gJ3BvaW50ZXJkb3duJyAmJiBlLnBvaW50ZXJUeXBlICE9PSAndG91Y2gnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1dpdGhpblRyYWNrWEJvdW5kcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuYXhpcy54LnNjcm9sbGJhci5yZWN0ID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5heGlzLnguc2Nyb2xsYmFyLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLmlzV2l0aGluQm91bmRzKF90aGlzLmF4aXMueC5zY3JvbGxiYXIucmVjdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vbkRyYWdTdGFydChlLCAneCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub25UcmFja0NsaWNrKGUsICd4Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzV2l0aGluVHJhY2tZQm91bmRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5heGlzLnkuc2Nyb2xsYmFyLnJlY3QgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmF4aXMueS5zY3JvbGxiYXIuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuaXNXaXRoaW5Cb3VuZHMoX3RoaXMuYXhpcy55LnNjcm9sbGJhci5yZWN0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm9uRHJhZ1N0YXJ0KGUsICd5Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vblRyYWNrQ2xpY2soZSwgJ3knKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERyYWcgc2Nyb2xsYmFyIGhhbmRsZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kcmFnID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZywgX2gsIF9qLCBfaywgX2w7XG4gICAgICAgICAgICBpZiAoIV90aGlzLmRyYWdnZWRBeGlzIHx8ICFfdGhpcy5jb250ZW50V3JhcHBlckVsKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHZhciBldmVudE9mZnNldDtcbiAgICAgICAgICAgIHZhciB0cmFjayA9IF90aGlzLmF4aXNbX3RoaXMuZHJhZ2dlZEF4aXNdLnRyYWNrO1xuICAgICAgICAgICAgdmFyIHRyYWNrU2l6ZSA9IChfYiA9IChfYSA9IHRyYWNrLnJlY3QpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVtfdGhpcy5heGlzW190aGlzLmRyYWdnZWRBeGlzXS5zaXplQXR0cl0pICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IDA7XG4gICAgICAgICAgICB2YXIgc2Nyb2xsYmFyID0gX3RoaXMuYXhpc1tfdGhpcy5kcmFnZ2VkQXhpc10uc2Nyb2xsYmFyO1xuICAgICAgICAgICAgdmFyIGNvbnRlbnRTaXplID0gKF9kID0gKF9jID0gX3RoaXMuY29udGVudFdyYXBwZXJFbCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jW190aGlzLmF4aXNbX3RoaXMuZHJhZ2dlZEF4aXNdLnNjcm9sbFNpemVBdHRyXSkgIT09IG51bGwgJiYgX2QgIT09IHZvaWQgMCA/IF9kIDogMDtcbiAgICAgICAgICAgIHZhciBob3N0U2l6ZSA9IHBhcnNlSW50KChfZiA9IChfZSA9IF90aGlzLmVsU3R5bGVzKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2VbX3RoaXMuYXhpc1tfdGhpcy5kcmFnZ2VkQXhpc10uc2l6ZUF0dHJdKSAhPT0gbnVsbCAmJiBfZiAhPT0gdm9pZCAwID8gX2YgOiAnMHB4JywgMTApO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGlmIChfdGhpcy5kcmFnZ2VkQXhpcyA9PT0gJ3knKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRPZmZzZXQgPSBlLnBhZ2VZO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZXZlbnRPZmZzZXQgPSBlLnBhZ2VYO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIGhvdyBmYXIgdGhlIHVzZXIncyBtb3VzZSBpcyBmcm9tIHRoZSB0b3AvbGVmdCBvZiB0aGUgc2Nyb2xsYmFyIChtaW51cyB0aGUgZHJhZ09mZnNldCkuXG4gICAgICAgICAgICB2YXIgZHJhZ1BvcyA9IGV2ZW50T2Zmc2V0IC1cbiAgICAgICAgICAgICAgICAoKF9oID0gKF9nID0gdHJhY2sucmVjdCkgPT09IG51bGwgfHwgX2cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9nW190aGlzLmF4aXNbX3RoaXMuZHJhZ2dlZEF4aXNdLm9mZnNldEF0dHJdKSAhPT0gbnVsbCAmJiBfaCAhPT0gdm9pZCAwID8gX2ggOiAwKSAtXG4gICAgICAgICAgICAgICAgX3RoaXMuYXhpc1tfdGhpcy5kcmFnZ2VkQXhpc10uZHJhZ09mZnNldDtcbiAgICAgICAgICAgIGRyYWdQb3MgPSBfdGhpcy5kcmFnZ2VkQXhpcyA9PT0gJ3gnICYmIF90aGlzLmlzUnRsXG4gICAgICAgICAgICAgICAgPyAoKF9rID0gKF9qID0gdHJhY2sucmVjdCkgPT09IG51bGwgfHwgX2ogPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9qW190aGlzLmF4aXNbX3RoaXMuZHJhZ2dlZEF4aXNdLnNpemVBdHRyXSkgIT09IG51bGwgJiYgX2sgIT09IHZvaWQgMCA/IF9rIDogMCkgLVxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxiYXIuc2l6ZSAtXG4gICAgICAgICAgICAgICAgICAgIGRyYWdQb3NcbiAgICAgICAgICAgICAgICA6IGRyYWdQb3M7XG4gICAgICAgICAgICAvLyBDb252ZXJ0IHRoZSBtb3VzZSBwb3NpdGlvbiBpbnRvIGEgcGVyY2VudGFnZSBvZiB0aGUgc2Nyb2xsYmFyIGhlaWdodC93aWR0aC5cbiAgICAgICAgICAgIHZhciBkcmFnUGVyYyA9IGRyYWdQb3MgLyAodHJhY2tTaXplIC0gc2Nyb2xsYmFyLnNpemUpO1xuICAgICAgICAgICAgLy8gU2Nyb2xsIHRoZSBjb250ZW50IGJ5IHRoZSBzYW1lIHBlcmNlbnRhZ2UuXG4gICAgICAgICAgICB2YXIgc2Nyb2xsUG9zID0gZHJhZ1BlcmMgKiAoY29udGVudFNpemUgLSBob3N0U2l6ZSk7XG4gICAgICAgICAgICAvLyBGaXggYnJvd3NlcnMgaW5jb25zaXN0ZW5jeSBvbiBSVExcbiAgICAgICAgICAgIGlmIChfdGhpcy5kcmFnZ2VkQXhpcyA9PT0gJ3gnICYmIF90aGlzLmlzUnRsKSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsUG9zID0gKChfbCA9IFNpbXBsZUJhckNvcmUuZ2V0UnRsSGVscGVycygpKSA9PT0gbnVsbCB8fCBfbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2wuaXNTY3JvbGxpbmdUb05lZ2F0aXZlKVxuICAgICAgICAgICAgICAgICAgICA/IC1zY3JvbGxQb3NcbiAgICAgICAgICAgICAgICAgICAgOiBzY3JvbGxQb3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5jb250ZW50V3JhcHBlckVsW190aGlzLmF4aXNbX3RoaXMuZHJhZ2dlZEF4aXNdLnNjcm9sbE9mZnNldEF0dHJdID1cbiAgICAgICAgICAgICAgICBzY3JvbGxQb3M7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFbmQgc2Nyb2xsIGhhbmRsZSBkcmFnXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm9uRW5kRHJhZyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgZWxEb2N1bWVudCA9IGdldEVsZW1lbnREb2N1bWVudChfdGhpcy5lbCk7XG4gICAgICAgICAgICB2YXIgZWxXaW5kb3cgPSBnZXRFbGVtZW50V2luZG93KF90aGlzLmVsKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICByZW1vdmVDbGFzc2VzKF90aGlzLmVsLCBfdGhpcy5jbGFzc05hbWVzLmRyYWdnaW5nKTtcbiAgICAgICAgICAgIGVsRG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgX3RoaXMuZHJhZywgdHJ1ZSk7XG4gICAgICAgICAgICBlbERvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBfdGhpcy5vbkVuZERyYWcsIHRydWUpO1xuICAgICAgICAgICAgX3RoaXMucmVtb3ZlUHJldmVudENsaWNrSWQgPSBlbFdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlc2UgYXN5bmNocm9ub3VzbHkgc28gd2Ugc3RpbGwgc3VwcHJlc3MgY2xpY2sgZXZlbnRzXG4gICAgICAgICAgICAgICAgLy8gZ2VuZXJhdGVkIHNpbXVsdGFuZW91c2x5IHdpdGggbW91c2V1cC5cbiAgICAgICAgICAgICAgICBlbERvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX3RoaXMucHJldmVudENsaWNrLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBlbERvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgX3RoaXMucHJldmVudENsaWNrLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5yZW1vdmVQcmV2ZW50Q2xpY2tJZCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhhbmRsZXIgdG8gaWdub3JlIGNsaWNrIGV2ZW50cyBkdXJpbmcgZHJhZ1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wcmV2ZW50Q2xpY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5lbCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBTaW1wbGVCYXJDb3JlLmRlZmF1bHRPcHRpb25zKSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuY2xhc3NOYW1lcyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBTaW1wbGVCYXJDb3JlLmRlZmF1bHRPcHRpb25zLmNsYXNzTmFtZXMpLCBvcHRpb25zLmNsYXNzTmFtZXMpO1xuICAgICAgICB0aGlzLmF4aXMgPSB7XG4gICAgICAgICAgICB4OiB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsT2Zmc2V0QXR0cjogJ3Njcm9sbExlZnQnLFxuICAgICAgICAgICAgICAgIHNpemVBdHRyOiAnd2lkdGgnLFxuICAgICAgICAgICAgICAgIHNjcm9sbFNpemVBdHRyOiAnc2Nyb2xsV2lkdGgnLFxuICAgICAgICAgICAgICAgIG9mZnNldFNpemVBdHRyOiAnb2Zmc2V0V2lkdGgnLFxuICAgICAgICAgICAgICAgIG9mZnNldEF0dHI6ICdsZWZ0JyxcbiAgICAgICAgICAgICAgICBvdmVyZmxvd0F0dHI6ICdvdmVyZmxvd1gnLFxuICAgICAgICAgICAgICAgIGRyYWdPZmZzZXQ6IDAsXG4gICAgICAgICAgICAgICAgaXNPdmVyZmxvd2luZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmb3JjZVZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHRyYWNrOiB7IHNpemU6IG51bGwsIGVsOiBudWxsLCByZWN0OiBudWxsLCBpc1Zpc2libGU6IGZhbHNlIH0sXG4gICAgICAgICAgICAgICAgc2Nyb2xsYmFyOiB7IHNpemU6IG51bGwsIGVsOiBudWxsLCByZWN0OiBudWxsLCBpc1Zpc2libGU6IGZhbHNlIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB5OiB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsT2Zmc2V0QXR0cjogJ3Njcm9sbFRvcCcsXG4gICAgICAgICAgICAgICAgc2l6ZUF0dHI6ICdoZWlnaHQnLFxuICAgICAgICAgICAgICAgIHNjcm9sbFNpemVBdHRyOiAnc2Nyb2xsSGVpZ2h0JyxcbiAgICAgICAgICAgICAgICBvZmZzZXRTaXplQXR0cjogJ29mZnNldEhlaWdodCcsXG4gICAgICAgICAgICAgICAgb2Zmc2V0QXR0cjogJ3RvcCcsXG4gICAgICAgICAgICAgICAgb3ZlcmZsb3dBdHRyOiAnb3ZlcmZsb3dZJyxcbiAgICAgICAgICAgICAgICBkcmFnT2Zmc2V0OiAwLFxuICAgICAgICAgICAgICAgIGlzT3ZlcmZsb3dpbmc6IHRydWUsXG4gICAgICAgICAgICAgICAgZm9yY2VWaXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0cmFjazogeyBzaXplOiBudWxsLCBlbDogbnVsbCwgcmVjdDogbnVsbCwgaXNWaXNpYmxlOiBmYWxzZSB9LFxuICAgICAgICAgICAgICAgIHNjcm9sbGJhcjogeyBzaXplOiBudWxsLCBlbDogbnVsbCwgcmVjdDogbnVsbCwgaXNWaXNpYmxlOiBmYWxzZSB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5lbCAhPT0gJ29iamVjdCcgfHwgIXRoaXMuZWwubm9kZU5hbWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFyZ3VtZW50IHBhc3NlZCB0byBTaW1wbGVCYXIgbXVzdCBiZSBhbiBIVE1MIGVsZW1lbnQgaW5zdGVhZCBvZiBcIi5jb25jYXQodGhpcy5lbCkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25Nb3VzZU1vdmUgPSB0aHJvdHRsZSh0aGlzLl9vbk1vdXNlTW92ZSwgNjQpO1xuICAgICAgICB0aGlzLm9uV2luZG93UmVzaXplID0gZGVib3VuY2UodGhpcy5fb25XaW5kb3dSZXNpemUsIDY0LCB7IGxlYWRpbmc6IHRydWUgfSk7XG4gICAgICAgIHRoaXMub25TdG9wU2Nyb2xsaW5nID0gZGVib3VuY2UodGhpcy5fb25TdG9wU2Nyb2xsaW5nLCB0aGlzLnN0b3BTY3JvbGxEZWxheSk7XG4gICAgICAgIHRoaXMub25Nb3VzZUVudGVyZWQgPSBkZWJvdW5jZSh0aGlzLl9vbk1vdXNlRW50ZXJlZCwgdGhpcy5zdG9wU2Nyb2xsRGVsYXkpO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGVscGVyIHRvIGZpeCBicm93c2VycyBpbmNvbnNpc3RlbmN5IG9uIFJUTDpcbiAgICAgKiAgLSBGaXJlZm94IGludmVydHMgdGhlIHNjcm9sbGJhciBpbml0aWFsIHBvc2l0aW9uXG4gICAgICogIC0gSUUxMSBpbnZlcnRzIGJvdGggc2Nyb2xsYmFyIHBvc2l0aW9uIGFuZCBzY3JvbGxpbmcgb2Zmc2V0XG4gICAgICogRGlyZWN0bHkgaW5zcGlyZWQgYnkgQEtpbmdTb3JhJ3MgT3ZlcmxheVNjcm9sbGJhcnMgaHR0cHM6Ly9naXRodWIuY29tL0tpbmdTb3JhL092ZXJsYXlTY3JvbGxiYXJzL2Jsb2IvbWFzdGVyL2pzL092ZXJsYXlTY3JvbGxiYXJzLmpzI0wxNjM0XG4gICAgICovXG4gICAgU2ltcGxlQmFyQ29yZS5nZXRSdGxIZWxwZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoU2ltcGxlQmFyQ29yZS5ydGxIZWxwZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gU2ltcGxlQmFyQ29yZS5ydGxIZWxwZXJzO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkdW1teURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkdW1teURpdi5pbm5lckhUTUwgPVxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJzaW1wbGViYXItZHVtbXktc2Nyb2xsYmFyLXNpemVcIj48ZGl2PjwvZGl2PjwvZGl2Pic7XG4gICAgICAgIHZhciBzY3JvbGxiYXJEdW1teUVsID0gZHVtbXlEaXYuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIHZhciBkdW1teUNoaWxkID0gc2Nyb2xsYmFyRHVtbXlFbCA9PT0gbnVsbCB8fCBzY3JvbGxiYXJEdW1teUVsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzY3JvbGxiYXJEdW1teUVsLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICBpZiAoIWR1bW15Q2hpbGQpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JvbGxiYXJEdW1teUVsKTtcbiAgICAgICAgc2Nyb2xsYmFyRHVtbXlFbC5zY3JvbGxMZWZ0ID0gMDtcbiAgICAgICAgdmFyIGR1bW15Q29udGFpbmVyT2Zmc2V0ID0gU2ltcGxlQmFyQ29yZS5nZXRPZmZzZXQoc2Nyb2xsYmFyRHVtbXlFbCk7XG4gICAgICAgIHZhciBkdW1teUNoaWxkT2Zmc2V0ID0gU2ltcGxlQmFyQ29yZS5nZXRPZmZzZXQoZHVtbXlDaGlsZCk7XG4gICAgICAgIHNjcm9sbGJhckR1bW15RWwuc2Nyb2xsTGVmdCA9IC05OTk7XG4gICAgICAgIHZhciBkdW1teUNoaWxkT2Zmc2V0QWZ0ZXJTY3JvbGwgPSBTaW1wbGVCYXJDb3JlLmdldE9mZnNldChkdW1teUNoaWxkKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzY3JvbGxiYXJEdW1teUVsKTtcbiAgICAgICAgU2ltcGxlQmFyQ29yZS5ydGxIZWxwZXJzID0ge1xuICAgICAgICAgICAgLy8gZGV0ZXJtaW5lcyBpZiB0aGUgc2Nyb2xsaW5nIGlzIHJlc3BvbmRpbmcgd2l0aCBuZWdhdGl2ZSB2YWx1ZXNcbiAgICAgICAgICAgIGlzU2Nyb2xsT3JpZ2luQXRaZXJvOiBkdW1teUNvbnRhaW5lck9mZnNldC5sZWZ0ICE9PSBkdW1teUNoaWxkT2Zmc2V0LmxlZnQsXG4gICAgICAgICAgICAvLyBkZXRlcm1pbmVzIGlmIHRoZSBvcmlnaW4gc2Nyb2xsYmFyIHBvc2l0aW9uIGlzIGludmVydGVkIG9yIG5vdCAocG9zaXRpb25lZCBvbiBsZWZ0IG9yIHJpZ2h0KVxuICAgICAgICAgICAgaXNTY3JvbGxpbmdUb05lZ2F0aXZlOiBkdW1teUNoaWxkT2Zmc2V0LmxlZnQgIT09IGR1bW15Q2hpbGRPZmZzZXRBZnRlclNjcm9sbC5sZWZ0XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBTaW1wbGVCYXJDb3JlLnJ0bEhlbHBlcnM7XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5nZXRTY3JvbGxiYXJXaWR0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gVHJ5L2NhdGNoIGZvciBGRiA1NiB0aHJvd2luZyBvbiB1bmRlZmluZWQgY29tcHV0ZWRTdHlsZXNcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIERldGVjdCBicm93c2VycyBzdXBwb3J0aW5nIENTUyBzY3JvbGxiYXIgc3R5bGluZyBhbmQgZG8gbm90IGNhbGN1bGF0ZVxuICAgICAgICAgICAgaWYgKCh0aGlzLmNvbnRlbnRXcmFwcGVyRWwgJiZcbiAgICAgICAgICAgICAgICBnZXRDb21wdXRlZFN0eWxlKHRoaXMuY29udGVudFdyYXBwZXJFbCwgJzo6LXdlYmtpdC1zY3JvbGxiYXInKVxuICAgICAgICAgICAgICAgICAgICAuZGlzcGxheSA9PT0gJ25vbmUnKSB8fFxuICAgICAgICAgICAgICAgICdzY3JvbGxiYXJXaWR0aCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlIHx8XG4gICAgICAgICAgICAgICAgJy1tcy1vdmVyZmxvdy1zdHlsZScgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2Nyb2xsYmFyV2lkdGgoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIHNjcm9sbGJhcldpZHRoKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNpbXBsZUJhckNvcmUuZ2V0T2Zmc2V0ID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIHZhciByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHZhciBlbERvY3VtZW50ID0gZ2V0RWxlbWVudERvY3VtZW50KGVsKTtcbiAgICAgICAgdmFyIGVsV2luZG93ID0gZ2V0RWxlbWVudFdpbmRvdyhlbCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b3A6IHJlY3QudG9wICtcbiAgICAgICAgICAgICAgICAoZWxXaW5kb3cucGFnZVlPZmZzZXQgfHwgZWxEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wKSxcbiAgICAgICAgICAgIGxlZnQ6IHJlY3QubGVmdCArXG4gICAgICAgICAgICAgICAgKGVsV2luZG93LnBhZ2VYT2Zmc2V0IHx8IGVsRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQpXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBXZSBzdG9wIGhlcmUgb24gc2VydmVyLXNpZGVcbiAgICAgICAgaWYgKGNhblVzZURPTSkge1xuICAgICAgICAgICAgdGhpcy5pbml0RE9NKCk7XG4gICAgICAgICAgICB0aGlzLnJ0bEhlbHBlcnMgPSBTaW1wbGVCYXJDb3JlLmdldFJ0bEhlbHBlcnMoKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsYmFyV2lkdGggPSB0aGlzLmdldFNjcm9sbGJhcldpZHRoKCk7XG4gICAgICAgICAgICB0aGlzLnJlY2FsY3VsYXRlKCk7XG4gICAgICAgICAgICB0aGlzLmluaXRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUuaW5pdERPTSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgLy8gYXNzdW1lIHRoYXQgZWxlbWVudCBoYXMgaGlzIERPTSBhbHJlYWR5IGluaXRpYXRlZFxuICAgICAgICB0aGlzLndyYXBwZXJFbCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcihjbGFzc05hbWVzVG9RdWVyeSh0aGlzLmNsYXNzTmFtZXMud3JhcHBlcikpO1xuICAgICAgICB0aGlzLmNvbnRlbnRXcmFwcGVyRWwgPVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnNjcm9sbGFibGVOb2RlIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5xdWVyeVNlbGVjdG9yKGNsYXNzTmFtZXNUb1F1ZXJ5KHRoaXMuY2xhc3NOYW1lcy5jb250ZW50V3JhcHBlcikpO1xuICAgICAgICB0aGlzLmNvbnRlbnRFbCA9XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuY29udGVudE5vZGUgfHxcbiAgICAgICAgICAgICAgICB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoY2xhc3NOYW1lc1RvUXVlcnkodGhpcy5jbGFzc05hbWVzLmNvbnRlbnRFbCkpO1xuICAgICAgICB0aGlzLm9mZnNldEVsID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKGNsYXNzTmFtZXNUb1F1ZXJ5KHRoaXMuY2xhc3NOYW1lcy5vZmZzZXQpKTtcbiAgICAgICAgdGhpcy5tYXNrRWwgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoY2xhc3NOYW1lc1RvUXVlcnkodGhpcy5jbGFzc05hbWVzLm1hc2spKTtcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlckVsID0gdGhpcy5maW5kQ2hpbGQodGhpcy53cmFwcGVyRWwsIGNsYXNzTmFtZXNUb1F1ZXJ5KHRoaXMuY2xhc3NOYW1lcy5wbGFjZWhvbGRlcikpO1xuICAgICAgICB0aGlzLmhlaWdodEF1dG9PYnNlcnZlcldyYXBwZXJFbCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcihjbGFzc05hbWVzVG9RdWVyeSh0aGlzLmNsYXNzTmFtZXMuaGVpZ2h0QXV0b09ic2VydmVyV3JhcHBlckVsKSk7XG4gICAgICAgIHRoaXMuaGVpZ2h0QXV0b09ic2VydmVyRWwgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoY2xhc3NOYW1lc1RvUXVlcnkodGhpcy5jbGFzc05hbWVzLmhlaWdodEF1dG9PYnNlcnZlckVsKSk7XG4gICAgICAgIHRoaXMuYXhpcy54LnRyYWNrLmVsID0gdGhpcy5maW5kQ2hpbGQodGhpcy5lbCwgXCJcIi5jb25jYXQoY2xhc3NOYW1lc1RvUXVlcnkodGhpcy5jbGFzc05hbWVzLnRyYWNrKSkuY29uY2F0KGNsYXNzTmFtZXNUb1F1ZXJ5KHRoaXMuY2xhc3NOYW1lcy5ob3Jpem9udGFsKSkpO1xuICAgICAgICB0aGlzLmF4aXMueS50cmFjay5lbCA9IHRoaXMuZmluZENoaWxkKHRoaXMuZWwsIFwiXCIuY29uY2F0KGNsYXNzTmFtZXNUb1F1ZXJ5KHRoaXMuY2xhc3NOYW1lcy50cmFjaykpLmNvbmNhdChjbGFzc05hbWVzVG9RdWVyeSh0aGlzLmNsYXNzTmFtZXMudmVydGljYWwpKSk7XG4gICAgICAgIHRoaXMuYXhpcy54LnNjcm9sbGJhci5lbCA9XG4gICAgICAgICAgICAoKF9hID0gdGhpcy5heGlzLngudHJhY2suZWwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5xdWVyeVNlbGVjdG9yKGNsYXNzTmFtZXNUb1F1ZXJ5KHRoaXMuY2xhc3NOYW1lcy5zY3JvbGxiYXIpKSkgfHwgbnVsbDtcbiAgICAgICAgdGhpcy5heGlzLnkuc2Nyb2xsYmFyLmVsID1cbiAgICAgICAgICAgICgoX2IgPSB0aGlzLmF4aXMueS50cmFjay5lbCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnF1ZXJ5U2VsZWN0b3IoY2xhc3NOYW1lc1RvUXVlcnkodGhpcy5jbGFzc05hbWVzLnNjcm9sbGJhcikpKSB8fCBudWxsO1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5hdXRvSGlkZSkge1xuICAgICAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLmF4aXMueC5zY3JvbGxiYXIuZWwsIHRoaXMuY2xhc3NOYW1lcy52aXNpYmxlKTtcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5heGlzLnkuc2Nyb2xsYmFyLmVsLCB0aGlzLmNsYXNzTmFtZXMudmlzaWJsZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLmluaXRMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdmFyIGVsV2luZG93ID0gZ2V0RWxlbWVudFdpbmRvdyh0aGlzLmVsKTtcbiAgICAgICAgLy8gRXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMub25Nb3VzZUVudGVyKTtcbiAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIHRoaXMub25Qb2ludGVyRXZlbnQsIHRydWUpO1xuICAgICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMub25Nb3VzZU1vdmUpO1xuICAgICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLm9uTW91c2VMZWF2ZSk7XG4gICAgICAgIChfYSA9IHRoaXMuY29udGVudFdyYXBwZXJFbCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMub25TY3JvbGwpO1xuICAgICAgICAvLyBCcm93c2VyIHpvb20gdHJpZ2dlcnMgYSB3aW5kb3cgcmVzaXplXG4gICAgICAgIGVsV2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25XaW5kb3dSZXNpemUpO1xuICAgICAgICBpZiAoIXRoaXMuY29udGVudEVsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAod2luZG93LlJlc2l6ZU9ic2VydmVyKSB7XG4gICAgICAgICAgICAvLyBIYWNrIGZvciBodHRwczovL2dpdGh1Yi5jb20vV0lDRy9SZXNpemVPYnNlcnZlci9pc3N1ZXMvMzhcbiAgICAgICAgICAgIHZhciByZXNpemVPYnNlcnZlclN0YXJ0ZWRfMSA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHJlc2l6ZU9ic2VydmVyID0gZWxXaW5kb3cuUmVzaXplT2JzZXJ2ZXIgfHwgUmVzaXplT2JzZXJ2ZXI7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbmV3IHJlc2l6ZU9ic2VydmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc2l6ZU9ic2VydmVyU3RhcnRlZF8xKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgZWxXaW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucmVjYWxjdWxhdGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuZWwpO1xuICAgICAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuY29udGVudEVsKTtcbiAgICAgICAgICAgIGVsV2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVzaXplT2JzZXJ2ZXJTdGFydGVkXzEgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhpcyBpcyByZXF1aXJlZCB0byBkZXRlY3QgaG9yaXpvbnRhbCBzY3JvbGwuIFZlcnRpY2FsIHNjcm9sbCBvbmx5IG5lZWRzIHRoZSByZXNpemVPYnNlcnZlci5cbiAgICAgICAgdGhpcy5tdXRhdGlvbk9ic2VydmVyID0gbmV3IGVsV2luZG93Lk11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZWxXaW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5yZWNhbGN1bGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmNvbnRlbnRFbCwge1xuICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgIGNoYXJhY3RlckRhdGE6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5yZWNhbGN1bGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhlaWdodEF1dG9PYnNlcnZlckVsIHx8XG4gICAgICAgICAgICAhdGhpcy5jb250ZW50RWwgfHxcbiAgICAgICAgICAgICF0aGlzLmNvbnRlbnRXcmFwcGVyRWwgfHxcbiAgICAgICAgICAgICF0aGlzLndyYXBwZXJFbCB8fFxuICAgICAgICAgICAgIXRoaXMucGxhY2Vob2xkZXJFbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIGVsV2luZG93ID0gZ2V0RWxlbWVudFdpbmRvdyh0aGlzLmVsKTtcbiAgICAgICAgdGhpcy5lbFN0eWxlcyA9IGVsV2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbCk7XG4gICAgICAgIHRoaXMuaXNSdGwgPSB0aGlzLmVsU3R5bGVzLmRpcmVjdGlvbiA9PT0gJ3J0bCc7XG4gICAgICAgIHZhciBjb250ZW50RWxPZmZzZXRXaWR0aCA9IHRoaXMuY29udGVudEVsLm9mZnNldFdpZHRoO1xuICAgICAgICB2YXIgaXNIZWlnaHRBdXRvID0gdGhpcy5oZWlnaHRBdXRvT2JzZXJ2ZXJFbC5vZmZzZXRIZWlnaHQgPD0gMTtcbiAgICAgICAgdmFyIGlzV2lkdGhBdXRvID0gdGhpcy5oZWlnaHRBdXRvT2JzZXJ2ZXJFbC5vZmZzZXRXaWR0aCA8PSAxIHx8IGNvbnRlbnRFbE9mZnNldFdpZHRoID4gMDtcbiAgICAgICAgdmFyIGNvbnRlbnRXcmFwcGVyRWxPZmZzZXRXaWR0aCA9IHRoaXMuY29udGVudFdyYXBwZXJFbC5vZmZzZXRXaWR0aDtcbiAgICAgICAgdmFyIGVsT3ZlcmZsb3dYID0gdGhpcy5lbFN0eWxlcy5vdmVyZmxvd1g7XG4gICAgICAgIHZhciBlbE92ZXJmbG93WSA9IHRoaXMuZWxTdHlsZXMub3ZlcmZsb3dZO1xuICAgICAgICB0aGlzLmNvbnRlbnRFbC5zdHlsZS5wYWRkaW5nID0gXCJcIi5jb25jYXQodGhpcy5lbFN0eWxlcy5wYWRkaW5nVG9wLCBcIiBcIikuY29uY2F0KHRoaXMuZWxTdHlsZXMucGFkZGluZ1JpZ2h0LCBcIiBcIikuY29uY2F0KHRoaXMuZWxTdHlsZXMucGFkZGluZ0JvdHRvbSwgXCIgXCIpLmNvbmNhdCh0aGlzLmVsU3R5bGVzLnBhZGRpbmdMZWZ0KTtcbiAgICAgICAgdGhpcy53cmFwcGVyRWwuc3R5bGUubWFyZ2luID0gXCItXCIuY29uY2F0KHRoaXMuZWxTdHlsZXMucGFkZGluZ1RvcCwgXCIgLVwiKS5jb25jYXQodGhpcy5lbFN0eWxlcy5wYWRkaW5nUmlnaHQsIFwiIC1cIikuY29uY2F0KHRoaXMuZWxTdHlsZXMucGFkZGluZ0JvdHRvbSwgXCIgLVwiKS5jb25jYXQodGhpcy5lbFN0eWxlcy5wYWRkaW5nTGVmdCk7XG4gICAgICAgIHZhciBjb250ZW50RWxTY3JvbGxIZWlnaHQgPSB0aGlzLmNvbnRlbnRFbC5zY3JvbGxIZWlnaHQ7XG4gICAgICAgIHZhciBjb250ZW50RWxTY3JvbGxXaWR0aCA9IHRoaXMuY29udGVudEVsLnNjcm9sbFdpZHRoO1xuICAgICAgICB0aGlzLmNvbnRlbnRXcmFwcGVyRWwuc3R5bGUuaGVpZ2h0ID0gaXNIZWlnaHRBdXRvID8gJ2F1dG8nIDogJzEwMCUnO1xuICAgICAgICAvLyBEZXRlcm1pbmUgcGxhY2Vob2xkZXIgc2l6ZVxuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyRWwuc3R5bGUud2lkdGggPSBpc1dpZHRoQXV0b1xuICAgICAgICAgICAgPyBcIlwiLmNvbmNhdChjb250ZW50RWxPZmZzZXRXaWR0aCB8fCBjb250ZW50RWxTY3JvbGxXaWR0aCwgXCJweFwiKVxuICAgICAgICAgICAgOiAnYXV0byc7XG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXJFbC5zdHlsZS5oZWlnaHQgPSBcIlwiLmNvbmNhdChjb250ZW50RWxTY3JvbGxIZWlnaHQsIFwicHhcIik7XG4gICAgICAgIHZhciBjb250ZW50V3JhcHBlckVsT2Zmc2V0SGVpZ2h0ID0gdGhpcy5jb250ZW50V3JhcHBlckVsLm9mZnNldEhlaWdodDtcbiAgICAgICAgdGhpcy5heGlzLnguaXNPdmVyZmxvd2luZyA9XG4gICAgICAgICAgICBjb250ZW50RWxPZmZzZXRXaWR0aCAhPT0gMCAmJiBjb250ZW50RWxTY3JvbGxXaWR0aCA+IGNvbnRlbnRFbE9mZnNldFdpZHRoO1xuICAgICAgICB0aGlzLmF4aXMueS5pc092ZXJmbG93aW5nID1cbiAgICAgICAgICAgIGNvbnRlbnRFbFNjcm9sbEhlaWdodCA+IGNvbnRlbnRXcmFwcGVyRWxPZmZzZXRIZWlnaHQ7XG4gICAgICAgIC8vIFNldCBpc092ZXJmbG93aW5nIHRvIGZhbHNlIGlmIHVzZXIgZXhwbGljaXRlbHkgc2V0IGhpZGRlbiBvdmVyZmxvd1xuICAgICAgICB0aGlzLmF4aXMueC5pc092ZXJmbG93aW5nID1cbiAgICAgICAgICAgIGVsT3ZlcmZsb3dYID09PSAnaGlkZGVuJyA/IGZhbHNlIDogdGhpcy5heGlzLnguaXNPdmVyZmxvd2luZztcbiAgICAgICAgdGhpcy5heGlzLnkuaXNPdmVyZmxvd2luZyA9XG4gICAgICAgICAgICBlbE92ZXJmbG93WSA9PT0gJ2hpZGRlbicgPyBmYWxzZSA6IHRoaXMuYXhpcy55LmlzT3ZlcmZsb3dpbmc7XG4gICAgICAgIHRoaXMuYXhpcy54LmZvcmNlVmlzaWJsZSA9XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuZm9yY2VWaXNpYmxlID09PSAneCcgfHwgdGhpcy5vcHRpb25zLmZvcmNlVmlzaWJsZSA9PT0gdHJ1ZTtcbiAgICAgICAgdGhpcy5heGlzLnkuZm9yY2VWaXNpYmxlID1cbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5mb3JjZVZpc2libGUgPT09ICd5JyB8fCB0aGlzLm9wdGlvbnMuZm9yY2VWaXNpYmxlID09PSB0cnVlO1xuICAgICAgICB0aGlzLmhpZGVOYXRpdmVTY3JvbGxiYXIoKTtcbiAgICAgICAgLy8gU2V0IGlzT3ZlcmZsb3dpbmcgdG8gZmFsc2UgaWYgc2Nyb2xsYmFyIGlzIG5vdCBuZWNlc3NhcnkgKGNvbnRlbnQgaXMgc2hvcnRlciB0aGFuIG9mZnNldClcbiAgICAgICAgdmFyIG9mZnNldEZvclhTY3JvbGxiYXIgPSB0aGlzLmF4aXMueC5pc092ZXJmbG93aW5nXG4gICAgICAgICAgICA/IHRoaXMuc2Nyb2xsYmFyV2lkdGhcbiAgICAgICAgICAgIDogMDtcbiAgICAgICAgdmFyIG9mZnNldEZvcllTY3JvbGxiYXIgPSB0aGlzLmF4aXMueS5pc092ZXJmbG93aW5nXG4gICAgICAgICAgICA/IHRoaXMuc2Nyb2xsYmFyV2lkdGhcbiAgICAgICAgICAgIDogMDtcbiAgICAgICAgdGhpcy5heGlzLnguaXNPdmVyZmxvd2luZyA9XG4gICAgICAgICAgICB0aGlzLmF4aXMueC5pc092ZXJmbG93aW5nICYmXG4gICAgICAgICAgICAgICAgY29udGVudEVsU2Nyb2xsV2lkdGggPiBjb250ZW50V3JhcHBlckVsT2Zmc2V0V2lkdGggLSBvZmZzZXRGb3JZU2Nyb2xsYmFyO1xuICAgICAgICB0aGlzLmF4aXMueS5pc092ZXJmbG93aW5nID1cbiAgICAgICAgICAgIHRoaXMuYXhpcy55LmlzT3ZlcmZsb3dpbmcgJiZcbiAgICAgICAgICAgICAgICBjb250ZW50RWxTY3JvbGxIZWlnaHQgPlxuICAgICAgICAgICAgICAgICAgICBjb250ZW50V3JhcHBlckVsT2Zmc2V0SGVpZ2h0IC0gb2Zmc2V0Rm9yWFNjcm9sbGJhcjtcbiAgICAgICAgdGhpcy5heGlzLnguc2Nyb2xsYmFyLnNpemUgPSB0aGlzLmdldFNjcm9sbGJhclNpemUoJ3gnKTtcbiAgICAgICAgdGhpcy5heGlzLnkuc2Nyb2xsYmFyLnNpemUgPSB0aGlzLmdldFNjcm9sbGJhclNpemUoJ3knKTtcbiAgICAgICAgaWYgKHRoaXMuYXhpcy54LnNjcm9sbGJhci5lbClcbiAgICAgICAgICAgIHRoaXMuYXhpcy54LnNjcm9sbGJhci5lbC5zdHlsZS53aWR0aCA9IFwiXCIuY29uY2F0KHRoaXMuYXhpcy54LnNjcm9sbGJhci5zaXplLCBcInB4XCIpO1xuICAgICAgICBpZiAodGhpcy5heGlzLnkuc2Nyb2xsYmFyLmVsKVxuICAgICAgICAgICAgdGhpcy5heGlzLnkuc2Nyb2xsYmFyLmVsLnN0eWxlLmhlaWdodCA9IFwiXCIuY29uY2F0KHRoaXMuYXhpcy55LnNjcm9sbGJhci5zaXplLCBcInB4XCIpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uU2Nyb2xsYmFyKCd4Jyk7XG4gICAgICAgIHRoaXMucG9zaXRpb25TY3JvbGxiYXIoJ3knKTtcbiAgICAgICAgdGhpcy50b2dnbGVUcmFja1Zpc2liaWxpdHkoJ3gnKTtcbiAgICAgICAgdGhpcy50b2dnbGVUcmFja1Zpc2liaWxpdHkoJ3knKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZSBzY3JvbGxiYXIgc2l6ZVxuICAgICAqL1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLmdldFNjcm9sbGJhclNpemUgPSBmdW5jdGlvbiAoYXhpcykge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBpZiAoYXhpcyA9PT0gdm9pZCAwKSB7IGF4aXMgPSAneSc7IH1cbiAgICAgICAgaWYgKCF0aGlzLmF4aXNbYXhpc10uaXNPdmVyZmxvd2luZyB8fCAhdGhpcy5jb250ZW50RWwpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb250ZW50U2l6ZSA9IHRoaXMuY29udGVudEVsW3RoaXMuYXhpc1theGlzXS5zY3JvbGxTaXplQXR0cl07XG4gICAgICAgIHZhciB0cmFja1NpemUgPSAoX2IgPSAoX2EgPSB0aGlzLmF4aXNbYXhpc10udHJhY2suZWwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVt0aGlzLmF4aXNbYXhpc10ub2Zmc2V0U2l6ZUF0dHJdKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAwO1xuICAgICAgICB2YXIgc2Nyb2xsYmFyUmF0aW8gPSB0cmFja1NpemUgLyBjb250ZW50U2l6ZTtcbiAgICAgICAgdmFyIHNjcm9sbGJhclNpemU7XG4gICAgICAgIC8vIENhbGN1bGF0ZSBuZXcgaGVpZ2h0L3Bvc2l0aW9uIG9mIGRyYWcgaGFuZGxlLlxuICAgICAgICBzY3JvbGxiYXJTaXplID0gTWF0aC5tYXgofn4oc2Nyb2xsYmFyUmF0aW8gKiB0cmFja1NpemUpLCB0aGlzLm9wdGlvbnMuc2Nyb2xsYmFyTWluU2l6ZSk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2Nyb2xsYmFyTWF4U2l6ZSkge1xuICAgICAgICAgICAgc2Nyb2xsYmFyU2l6ZSA9IE1hdGgubWluKHNjcm9sbGJhclNpemUsIHRoaXMub3B0aW9ucy5zY3JvbGxiYXJNYXhTaXplKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2Nyb2xsYmFyU2l6ZTtcbiAgICB9O1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLnBvc2l0aW9uU2Nyb2xsYmFyID0gZnVuY3Rpb24gKGF4aXMpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIGlmIChheGlzID09PSB2b2lkIDApIHsgYXhpcyA9ICd5JzsgfVxuICAgICAgICB2YXIgc2Nyb2xsYmFyID0gdGhpcy5heGlzW2F4aXNdLnNjcm9sbGJhcjtcbiAgICAgICAgaWYgKCF0aGlzLmF4aXNbYXhpc10uaXNPdmVyZmxvd2luZyB8fFxuICAgICAgICAgICAgIXRoaXMuY29udGVudFdyYXBwZXJFbCB8fFxuICAgICAgICAgICAgIXNjcm9sbGJhci5lbCB8fFxuICAgICAgICAgICAgIXRoaXMuZWxTdHlsZXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29udGVudFNpemUgPSB0aGlzLmNvbnRlbnRXcmFwcGVyRWxbdGhpcy5heGlzW2F4aXNdLnNjcm9sbFNpemVBdHRyXTtcbiAgICAgICAgdmFyIHRyYWNrU2l6ZSA9ICgoX2EgPSB0aGlzLmF4aXNbYXhpc10udHJhY2suZWwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVt0aGlzLmF4aXNbYXhpc10ub2Zmc2V0U2l6ZUF0dHJdKSB8fCAwO1xuICAgICAgICB2YXIgaG9zdFNpemUgPSBwYXJzZUludCh0aGlzLmVsU3R5bGVzW3RoaXMuYXhpc1theGlzXS5zaXplQXR0cl0sIDEwKTtcbiAgICAgICAgdmFyIHNjcm9sbE9mZnNldCA9IHRoaXMuY29udGVudFdyYXBwZXJFbFt0aGlzLmF4aXNbYXhpc10uc2Nyb2xsT2Zmc2V0QXR0cl07XG4gICAgICAgIHNjcm9sbE9mZnNldCA9XG4gICAgICAgICAgICBheGlzID09PSAneCcgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmlzUnRsICYmXG4gICAgICAgICAgICAgICAgKChfYiA9IFNpbXBsZUJhckNvcmUuZ2V0UnRsSGVscGVycygpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuaXNTY3JvbGxPcmlnaW5BdFplcm8pXG4gICAgICAgICAgICAgICAgPyAtc2Nyb2xsT2Zmc2V0XG4gICAgICAgICAgICAgICAgOiBzY3JvbGxPZmZzZXQ7XG4gICAgICAgIGlmIChheGlzID09PSAneCcgJiYgdGhpcy5pc1J0bCkge1xuICAgICAgICAgICAgc2Nyb2xsT2Zmc2V0ID0gKChfYyA9IFNpbXBsZUJhckNvcmUuZ2V0UnRsSGVscGVycygpKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuaXNTY3JvbGxpbmdUb05lZ2F0aXZlKVxuICAgICAgICAgICAgICAgID8gc2Nyb2xsT2Zmc2V0XG4gICAgICAgICAgICAgICAgOiAtc2Nyb2xsT2Zmc2V0O1xuICAgICAgICB9XG4gICAgICAgIHZhciBzY3JvbGxQb3VyY2VudCA9IHNjcm9sbE9mZnNldCAvIChjb250ZW50U2l6ZSAtIGhvc3RTaXplKTtcbiAgICAgICAgdmFyIGhhbmRsZU9mZnNldCA9IH5+KCh0cmFja1NpemUgLSBzY3JvbGxiYXIuc2l6ZSkgKiBzY3JvbGxQb3VyY2VudCk7XG4gICAgICAgIGhhbmRsZU9mZnNldCA9XG4gICAgICAgICAgICBheGlzID09PSAneCcgJiYgdGhpcy5pc1J0bFxuICAgICAgICAgICAgICAgID8gLWhhbmRsZU9mZnNldCArICh0cmFja1NpemUgLSBzY3JvbGxiYXIuc2l6ZSlcbiAgICAgICAgICAgICAgICA6IGhhbmRsZU9mZnNldDtcbiAgICAgICAgc2Nyb2xsYmFyLmVsLnN0eWxlLnRyYW5zZm9ybSA9XG4gICAgICAgICAgICBheGlzID09PSAneCdcbiAgICAgICAgICAgICAgICA/IFwidHJhbnNsYXRlM2QoXCIuY29uY2F0KGhhbmRsZU9mZnNldCwgXCJweCwgMCwgMClcIilcbiAgICAgICAgICAgICAgICA6IFwidHJhbnNsYXRlM2QoMCwgXCIuY29uY2F0KGhhbmRsZU9mZnNldCwgXCJweCwgMClcIik7XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS50b2dnbGVUcmFja1Zpc2liaWxpdHkgPSBmdW5jdGlvbiAoYXhpcykge1xuICAgICAgICBpZiAoYXhpcyA9PT0gdm9pZCAwKSB7IGF4aXMgPSAneSc7IH1cbiAgICAgICAgdmFyIHRyYWNrID0gdGhpcy5heGlzW2F4aXNdLnRyYWNrLmVsO1xuICAgICAgICB2YXIgc2Nyb2xsYmFyID0gdGhpcy5heGlzW2F4aXNdLnNjcm9sbGJhci5lbDtcbiAgICAgICAgaWYgKCF0cmFjayB8fCAhc2Nyb2xsYmFyIHx8ICF0aGlzLmNvbnRlbnRXcmFwcGVyRWwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLmF4aXNbYXhpc10uaXNPdmVyZmxvd2luZyB8fCB0aGlzLmF4aXNbYXhpc10uZm9yY2VWaXNpYmxlKSB7XG4gICAgICAgICAgICB0cmFjay5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50V3JhcHBlckVsLnN0eWxlW3RoaXMuYXhpc1theGlzXS5vdmVyZmxvd0F0dHJdID0gJ3Njcm9sbCc7XG4gICAgICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoXCJcIi5jb25jYXQodGhpcy5jbGFzc05hbWVzLnNjcm9sbGFibGUsIFwiLVwiKS5jb25jYXQoYXhpcykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJhY2suc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50V3JhcHBlckVsLnN0eWxlW3RoaXMuYXhpc1theGlzXS5vdmVyZmxvd0F0dHJdID0gJ2hpZGRlbic7XG4gICAgICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoXCJcIi5jb25jYXQodGhpcy5jbGFzc05hbWVzLnNjcm9sbGFibGUsIFwiLVwiKS5jb25jYXQoYXhpcykpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEV2ZW4gaWYgZm9yY2VWaXNpYmxlIGlzIGVuYWJsZWQsIHNjcm9sbGJhciBpdHNlbGYgc2hvdWxkIGJlIGhpZGRlblxuICAgICAgICBpZiAodGhpcy5heGlzW2F4aXNdLmlzT3ZlcmZsb3dpbmcpIHtcbiAgICAgICAgICAgIHNjcm9sbGJhci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNjcm9sbGJhci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5zaG93U2Nyb2xsYmFyID0gZnVuY3Rpb24gKGF4aXMpIHtcbiAgICAgICAgaWYgKGF4aXMgPT09IHZvaWQgMCkgeyBheGlzID0gJ3knOyB9XG4gICAgICAgIGlmICh0aGlzLmF4aXNbYXhpc10uaXNPdmVyZmxvd2luZyAmJiAhdGhpcy5heGlzW2F4aXNdLnNjcm9sbGJhci5pc1Zpc2libGUpIHtcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5heGlzW2F4aXNdLnNjcm9sbGJhci5lbCwgdGhpcy5jbGFzc05hbWVzLnZpc2libGUpO1xuICAgICAgICAgICAgdGhpcy5heGlzW2F4aXNdLnNjcm9sbGJhci5pc1Zpc2libGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5oaWRlU2Nyb2xsYmFyID0gZnVuY3Rpb24gKGF4aXMpIHtcbiAgICAgICAgaWYgKGF4aXMgPT09IHZvaWQgMCkgeyBheGlzID0gJ3knOyB9XG4gICAgICAgIGlmICh0aGlzLmF4aXNbYXhpc10uaXNPdmVyZmxvd2luZyAmJiB0aGlzLmF4aXNbYXhpc10uc2Nyb2xsYmFyLmlzVmlzaWJsZSkge1xuICAgICAgICAgICAgcmVtb3ZlQ2xhc3Nlcyh0aGlzLmF4aXNbYXhpc10uc2Nyb2xsYmFyLmVsLCB0aGlzLmNsYXNzTmFtZXMudmlzaWJsZSk7XG4gICAgICAgICAgICB0aGlzLmF4aXNbYXhpc10uc2Nyb2xsYmFyLmlzVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5oaWRlTmF0aXZlU2Nyb2xsYmFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMub2Zmc2V0RWwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMub2Zmc2V0RWwuc3R5bGVbdGhpcy5pc1J0bCA/ICdsZWZ0JyA6ICdyaWdodCddID1cbiAgICAgICAgICAgIHRoaXMuYXhpcy55LmlzT3ZlcmZsb3dpbmcgfHwgdGhpcy5heGlzLnkuZm9yY2VWaXNpYmxlXG4gICAgICAgICAgICAgICAgPyBcIi1cIi5jb25jYXQodGhpcy5zY3JvbGxiYXJXaWR0aCwgXCJweFwiKVxuICAgICAgICAgICAgICAgIDogJzBweCc7XG4gICAgICAgIHRoaXMub2Zmc2V0RWwuc3R5bGUuYm90dG9tID1cbiAgICAgICAgICAgIHRoaXMuYXhpcy54LmlzT3ZlcmZsb3dpbmcgfHwgdGhpcy5heGlzLnguZm9yY2VWaXNpYmxlXG4gICAgICAgICAgICAgICAgPyBcIi1cIi5jb25jYXQodGhpcy5zY3JvbGxiYXJXaWR0aCwgXCJweFwiKVxuICAgICAgICAgICAgICAgIDogJzBweCc7XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5vbk1vdXNlTW92ZUZvckF4aXMgPSBmdW5jdGlvbiAoYXhpcykge1xuICAgICAgICBpZiAoYXhpcyA9PT0gdm9pZCAwKSB7IGF4aXMgPSAneSc7IH1cbiAgICAgICAgdmFyIGN1cnJlbnRBeGlzID0gdGhpcy5heGlzW2F4aXNdO1xuICAgICAgICBpZiAoIWN1cnJlbnRBeGlzLnRyYWNrLmVsIHx8ICFjdXJyZW50QXhpcy5zY3JvbGxiYXIuZWwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGN1cnJlbnRBeGlzLnRyYWNrLnJlY3QgPSBjdXJyZW50QXhpcy50cmFjay5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY3VycmVudEF4aXMuc2Nyb2xsYmFyLnJlY3QgPVxuICAgICAgICAgICAgY3VycmVudEF4aXMuc2Nyb2xsYmFyLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBpZiAodGhpcy5pc1dpdGhpbkJvdW5kcyhjdXJyZW50QXhpcy50cmFjay5yZWN0KSkge1xuICAgICAgICAgICAgdGhpcy5zaG93U2Nyb2xsYmFyKGF4aXMpO1xuICAgICAgICAgICAgYWRkQ2xhc3NlcyhjdXJyZW50QXhpcy50cmFjay5lbCwgdGhpcy5jbGFzc05hbWVzLmhvdmVyKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzV2l0aGluQm91bmRzKGN1cnJlbnRBeGlzLnNjcm9sbGJhci5yZWN0KSkge1xuICAgICAgICAgICAgICAgIGFkZENsYXNzZXMoY3VycmVudEF4aXMuc2Nyb2xsYmFyLmVsLCB0aGlzLmNsYXNzTmFtZXMuaG92ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3NlcyhjdXJyZW50QXhpcy5zY3JvbGxiYXIuZWwsIHRoaXMuY2xhc3NOYW1lcy5ob3Zlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZW1vdmVDbGFzc2VzKGN1cnJlbnRBeGlzLnRyYWNrLmVsLCB0aGlzLmNsYXNzTmFtZXMuaG92ZXIpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvSGlkZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZVNjcm9sbGJhcihheGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUub25Nb3VzZUxlYXZlRm9yQXhpcyA9IGZ1bmN0aW9uIChheGlzKSB7XG4gICAgICAgIGlmIChheGlzID09PSB2b2lkIDApIHsgYXhpcyA9ICd5JzsgfVxuICAgICAgICByZW1vdmVDbGFzc2VzKHRoaXMuYXhpc1theGlzXS50cmFjay5lbCwgdGhpcy5jbGFzc05hbWVzLmhvdmVyKTtcbiAgICAgICAgcmVtb3ZlQ2xhc3Nlcyh0aGlzLmF4aXNbYXhpc10uc2Nyb2xsYmFyLmVsLCB0aGlzLmNsYXNzTmFtZXMuaG92ZXIpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmF1dG9IaWRlKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVTY3JvbGxiYXIoYXhpcyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIG9uIHNjcm9sbGJhciBoYW5kbGUgZHJhZyBtb3ZlbWVudCBzdGFydHNcbiAgICAgKi9cbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5vbkRyYWdTdGFydCA9IGZ1bmN0aW9uIChlLCBheGlzKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKGF4aXMgPT09IHZvaWQgMCkgeyBheGlzID0gJ3knOyB9XG4gICAgICAgIHZhciBlbERvY3VtZW50ID0gZ2V0RWxlbWVudERvY3VtZW50KHRoaXMuZWwpO1xuICAgICAgICB2YXIgZWxXaW5kb3cgPSBnZXRFbGVtZW50V2luZG93KHRoaXMuZWwpO1xuICAgICAgICB2YXIgc2Nyb2xsYmFyID0gdGhpcy5heGlzW2F4aXNdLnNjcm9sbGJhcjtcbiAgICAgICAgLy8gTWVhc3VyZSBob3cgZmFyIHRoZSB1c2VyJ3MgbW91c2UgaXMgZnJvbSB0aGUgdG9wIG9mIHRoZSBzY3JvbGxiYXIgZHJhZyBoYW5kbGUuXG4gICAgICAgIHZhciBldmVudE9mZnNldCA9IGF4aXMgPT09ICd5JyA/IGUucGFnZVkgOiBlLnBhZ2VYO1xuICAgICAgICB0aGlzLmF4aXNbYXhpc10uZHJhZ09mZnNldCA9XG4gICAgICAgICAgICBldmVudE9mZnNldCAtICgoKF9hID0gc2Nyb2xsYmFyLnJlY3QpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVt0aGlzLmF4aXNbYXhpc10ub2Zmc2V0QXR0cl0pIHx8IDApO1xuICAgICAgICB0aGlzLmRyYWdnZWRBeGlzID0gYXhpcztcbiAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLmVsLCB0aGlzLmNsYXNzTmFtZXMuZHJhZ2dpbmcpO1xuICAgICAgICBlbERvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuZHJhZywgdHJ1ZSk7XG4gICAgICAgIGVsRG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25FbmREcmFnLCB0cnVlKTtcbiAgICAgICAgaWYgKHRoaXMucmVtb3ZlUHJldmVudENsaWNrSWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGVsRG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnByZXZlbnRDbGljaywgdHJ1ZSk7XG4gICAgICAgICAgICBlbERvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgdGhpcy5wcmV2ZW50Q2xpY2ssIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZWxXaW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMucmVtb3ZlUHJldmVudENsaWNrSWQpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVQcmV2ZW50Q2xpY2tJZCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLm9uVHJhY2tDbGljayA9IGZ1bmN0aW9uIChlLCBheGlzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICAgICAgaWYgKGF4aXMgPT09IHZvaWQgMCkgeyBheGlzID0gJ3knOyB9XG4gICAgICAgIHZhciBjdXJyZW50QXhpcyA9IHRoaXMuYXhpc1theGlzXTtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuY2xpY2tPblRyYWNrIHx8XG4gICAgICAgICAgICAhY3VycmVudEF4aXMuc2Nyb2xsYmFyLmVsIHx8XG4gICAgICAgICAgICAhdGhpcy5jb250ZW50V3JhcHBlckVsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvLyBQcmV2ZW50aW5nIHRoZSBldmVudCdzIGRlZmF1bHQgdG8gdHJpZ2dlciBjbGljayB1bmRlcm5lYXRoXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdmFyIGVsV2luZG93ID0gZ2V0RWxlbWVudFdpbmRvdyh0aGlzLmVsKTtcbiAgICAgICAgdGhpcy5heGlzW2F4aXNdLnNjcm9sbGJhci5yZWN0ID1cbiAgICAgICAgICAgIGN1cnJlbnRBeGlzLnNjcm9sbGJhci5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdmFyIHNjcm9sbGJhciA9IHRoaXMuYXhpc1theGlzXS5zY3JvbGxiYXI7XG4gICAgICAgIHZhciBzY3JvbGxiYXJPZmZzZXQgPSAoX2IgPSAoX2EgPSBzY3JvbGxiYXIucmVjdCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW3RoaXMuYXhpc1theGlzXS5vZmZzZXRBdHRyXSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogMDtcbiAgICAgICAgdmFyIGhvc3RTaXplID0gcGFyc2VJbnQoKF9kID0gKF9jID0gdGhpcy5lbFN0eWxlcykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jW3RoaXMuYXhpc1theGlzXS5zaXplQXR0cl0pICE9PSBudWxsICYmIF9kICE9PSB2b2lkIDAgPyBfZCA6ICcwcHgnLCAxMCk7XG4gICAgICAgIHZhciBzY3JvbGxlZCA9IHRoaXMuY29udGVudFdyYXBwZXJFbFt0aGlzLmF4aXNbYXhpc10uc2Nyb2xsT2Zmc2V0QXR0cl07XG4gICAgICAgIHZhciB0ID0gYXhpcyA9PT0gJ3knXG4gICAgICAgICAgICA/IHRoaXMubW91c2VZIC0gc2Nyb2xsYmFyT2Zmc2V0XG4gICAgICAgICAgICA6IHRoaXMubW91c2VYIC0gc2Nyb2xsYmFyT2Zmc2V0O1xuICAgICAgICB2YXIgZGlyID0gdCA8IDAgPyAtMSA6IDE7XG4gICAgICAgIHZhciBzY3JvbGxTaXplID0gZGlyID09PSAtMSA/IHNjcm9sbGVkIC0gaG9zdFNpemUgOiBzY3JvbGxlZCArIGhvc3RTaXplO1xuICAgICAgICB2YXIgc3BlZWQgPSA0MDtcbiAgICAgICAgdmFyIHNjcm9sbFRvID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFfdGhpcy5jb250ZW50V3JhcHBlckVsKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGlmIChkaXIgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbGVkID4gc2Nyb2xsU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxlZCAtPSBzcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29udGVudFdyYXBwZXJFbFtfdGhpcy5heGlzW2F4aXNdLnNjcm9sbE9mZnNldEF0dHJdID0gc2Nyb2xsZWQ7XG4gICAgICAgICAgICAgICAgICAgIGVsV2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzY3JvbGxUbyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbGVkIDwgc2Nyb2xsU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxlZCArPSBzcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29udGVudFdyYXBwZXJFbFtfdGhpcy5heGlzW2F4aXNdLnNjcm9sbE9mZnNldEF0dHJdID0gc2Nyb2xsZWQ7XG4gICAgICAgICAgICAgICAgICAgIGVsV2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzY3JvbGxUbyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzY3JvbGxUbygpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0dGVyIGZvciBjb250ZW50IGVsZW1lbnRcbiAgICAgKi9cbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5nZXRDb250ZW50RWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudEVsO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0dGVyIGZvciBvcmlnaW5hbCBzY3JvbGxpbmcgZWxlbWVudFxuICAgICAqL1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLmdldFNjcm9sbEVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnRXcmFwcGVyRWw7XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbFdpbmRvdyA9IGdldEVsZW1lbnRXaW5kb3codGhpcy5lbCk7XG4gICAgICAgIC8vIEV2ZW50IGxpc3RlbmVyc1xuICAgICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLm9uTW91c2VFbnRlcik7XG4gICAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCB0aGlzLm9uUG9pbnRlckV2ZW50LCB0cnVlKTtcbiAgICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlKTtcbiAgICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5vbk1vdXNlTGVhdmUpO1xuICAgICAgICBpZiAodGhpcy5jb250ZW50V3JhcHBlckVsKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRXcmFwcGVyRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5vblNjcm9sbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxXaW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5vbldpbmRvd1Jlc2l6ZSk7XG4gICAgICAgIGlmICh0aGlzLm11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENhbmNlbCBhbGwgZGVib3VuY2VkIGZ1bmN0aW9uc1xuICAgICAgICB0aGlzLm9uTW91c2VNb3ZlLmNhbmNlbCgpO1xuICAgICAgICB0aGlzLm9uV2luZG93UmVzaXplLmNhbmNlbCgpO1xuICAgICAgICB0aGlzLm9uU3RvcFNjcm9sbGluZy5jYW5jZWwoKTtcbiAgICAgICAgdGhpcy5vbk1vdXNlRW50ZXJlZC5jYW5jZWwoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbGwgbGlzdGVuZXJzIGZyb20gRE9NIG5vZGVzXG4gICAgICovXG4gICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUudW5Nb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcnMoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIG1vdXNlIGlzIHdpdGhpbiBib3VuZHNcbiAgICAgKi9cbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5pc1dpdGhpbkJvdW5kcyA9IGZ1bmN0aW9uIChiYm94KSB7XG4gICAgICAgIHJldHVybiAodGhpcy5tb3VzZVggPj0gYmJveC5sZWZ0ICYmXG4gICAgICAgICAgICB0aGlzLm1vdXNlWCA8PSBiYm94LmxlZnQgKyBiYm94LndpZHRoICYmXG4gICAgICAgICAgICB0aGlzLm1vdXNlWSA+PSBiYm94LnRvcCAmJlxuICAgICAgICAgICAgdGhpcy5tb3VzZVkgPD0gYmJveC50b3AgKyBiYm94LmhlaWdodCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBGaW5kIGVsZW1lbnQgY2hpbGRyZW4gbWF0Y2hlcyBxdWVyeVxuICAgICAqL1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLmZpbmRDaGlsZCA9IGZ1bmN0aW9uIChlbCwgcXVlcnkpIHtcbiAgICAgICAgdmFyIG1hdGNoZXMgPSBlbC5tYXRjaGVzIHx8XG4gICAgICAgICAgICBlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgIGVsLm1vek1hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICAgICAgZWwubXNNYXRjaGVzU2VsZWN0b3I7XG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwoZWwuY2hpbGRyZW4sIGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXMuY2FsbChjaGlsZCwgcXVlcnkpO1xuICAgICAgICB9KVswXTtcbiAgICB9O1xuICAgIFNpbXBsZUJhckNvcmUucnRsSGVscGVycyA9IG51bGw7XG4gICAgU2ltcGxlQmFyQ29yZS5kZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgICAgZm9yY2VWaXNpYmxlOiBmYWxzZSxcbiAgICAgICAgY2xpY2tPblRyYWNrOiB0cnVlLFxuICAgICAgICBzY3JvbGxiYXJNaW5TaXplOiAyNSxcbiAgICAgICAgc2Nyb2xsYmFyTWF4U2l6ZTogMCxcbiAgICAgICAgYXJpYUxhYmVsOiAnc2Nyb2xsYWJsZSBjb250ZW50JyxcbiAgICAgICAgY2xhc3NOYW1lczoge1xuICAgICAgICAgICAgY29udGVudEVsOiAnc2ltcGxlYmFyLWNvbnRlbnQnLFxuICAgICAgICAgICAgY29udGVudFdyYXBwZXI6ICdzaW1wbGViYXItY29udGVudC13cmFwcGVyJyxcbiAgICAgICAgICAgIG9mZnNldDogJ3NpbXBsZWJhci1vZmZzZXQnLFxuICAgICAgICAgICAgbWFzazogJ3NpbXBsZWJhci1tYXNrJyxcbiAgICAgICAgICAgIHdyYXBwZXI6ICdzaW1wbGViYXItd3JhcHBlcicsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ3NpbXBsZWJhci1wbGFjZWhvbGRlcicsXG4gICAgICAgICAgICBzY3JvbGxiYXI6ICdzaW1wbGViYXItc2Nyb2xsYmFyJyxcbiAgICAgICAgICAgIHRyYWNrOiAnc2ltcGxlYmFyLXRyYWNrJyxcbiAgICAgICAgICAgIGhlaWdodEF1dG9PYnNlcnZlcldyYXBwZXJFbDogJ3NpbXBsZWJhci1oZWlnaHQtYXV0by1vYnNlcnZlci13cmFwcGVyJyxcbiAgICAgICAgICAgIGhlaWdodEF1dG9PYnNlcnZlckVsOiAnc2ltcGxlYmFyLWhlaWdodC1hdXRvLW9ic2VydmVyJyxcbiAgICAgICAgICAgIHZpc2libGU6ICdzaW1wbGViYXItdmlzaWJsZScsXG4gICAgICAgICAgICBob3Jpem9udGFsOiAnc2ltcGxlYmFyLWhvcml6b250YWwnLFxuICAgICAgICAgICAgdmVydGljYWw6ICdzaW1wbGViYXItdmVydGljYWwnLFxuICAgICAgICAgICAgaG92ZXI6ICdzaW1wbGViYXItaG92ZXInLFxuICAgICAgICAgICAgZHJhZ2dpbmc6ICdzaW1wbGViYXItZHJhZ2dpbmcnLFxuICAgICAgICAgICAgc2Nyb2xsaW5nOiAnc2ltcGxlYmFyLXNjcm9sbGluZycsXG4gICAgICAgICAgICBzY3JvbGxhYmxlOiAnc2ltcGxlYmFyLXNjcm9sbGFibGUnLFxuICAgICAgICAgICAgbW91c2VFbnRlcmVkOiAnc2ltcGxlYmFyLW1vdXNlLWVudGVyZWQnXG4gICAgICAgIH0sXG4gICAgICAgIHNjcm9sbGFibGVOb2RlOiBudWxsLFxuICAgICAgICBjb250ZW50Tm9kZTogbnVsbCxcbiAgICAgICAgYXV0b0hpZGU6IHRydWVcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFN0YXRpYyBmdW5jdGlvbnNcbiAgICAgKi9cbiAgICBTaW1wbGVCYXJDb3JlLmdldE9wdGlvbnMgPSBnZXRPcHRpb25zO1xuICAgIFNpbXBsZUJhckNvcmUuaGVscGVycyA9IGhlbHBlcnM7XG4gICAgcmV0dXJuIFNpbXBsZUJhckNvcmU7XG59KCkpO1xuXG5leHBvcnQgeyBTaW1wbGVCYXJDb3JlIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8qKlxuICogc2ltcGxlYmFyIC0gdjYuMi41XG4gKiBTY3JvbGxiYXJzLCBzaW1wbGVyLlxuICogaHR0cHM6Ly9ncnNtdG8uZ2l0aHViLmlvL3NpbXBsZWJhci9cbiAqXG4gKiBNYWRlIGJ5IEFkcmllbiBEZW5hdCBmcm9tIGEgZm9yayBieSBKb25hdGhhbiBOaWNvbFxuICogVW5kZXIgTUlUIExpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgY2FuVXNlRE9NIGZyb20gJ2Nhbi11c2UtZG9tJztcbmltcG9ydCBTaW1wbGVCYXJDb3JlIGZyb20gJ3NpbXBsZWJhci1jb3JlJztcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XG5cbnZhciBfYSA9IFNpbXBsZUJhckNvcmUuaGVscGVycywgZ2V0T3B0aW9ucyA9IF9hLmdldE9wdGlvbnMsIGFkZENsYXNzZXMgPSBfYS5hZGRDbGFzc2VzO1xudmFyIFNpbXBsZUJhciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2ltcGxlQmFyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNpbXBsZUJhcigpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuYXBwbHkodGhpcywgYXJncykgfHwgdGhpcztcbiAgICAgICAgLy8gLy8gU2F2ZSBhIHJlZmVyZW5jZSB0byB0aGUgaW5zdGFuY2UsIHNvIHdlIGtub3cgdGhpcyBET00gbm9kZSBoYXMgYWxyZWFkeSBiZWVuIGluc3RhbmNpZWRcbiAgICAgICAgU2ltcGxlQmFyLmluc3RhbmNlcy5zZXQoYXJnc1swXSwgX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFNpbXBsZUJhci5pbml0RE9NTG9hZGVkRWxlbWVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCB0aGlzLmluaXRET01Mb2FkZWRFbGVtZW50cyk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgdGhpcy5pbml0RE9NTG9hZGVkRWxlbWVudHMpO1xuICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNpbXBsZWJhcl0nKSwgZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICBpZiAoZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXNpbXBsZWJhcicpICE9PSAnaW5pdCcgJiZcbiAgICAgICAgICAgICAgICAhU2ltcGxlQmFyLmluc3RhbmNlcy5oYXMoZWwpKVxuICAgICAgICAgICAgICAgIG5ldyBTaW1wbGVCYXIoZWwsIGdldE9wdGlvbnMoZWwuYXR0cmlidXRlcykpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFNpbXBsZUJhci5yZW1vdmVPYnNlcnZlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAoX2EgPSBTaW1wbGVCYXIuZ2xvYmFsT2JzZXJ2ZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5kaXNjb25uZWN0KCk7XG4gICAgfTtcbiAgICBTaW1wbGVCYXIucHJvdG90eXBlLmluaXRET00gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICAvLyBtYWtlIHN1cmUgdGhpcyBlbGVtZW50IGRvZXNuJ3QgaGF2ZSB0aGUgZWxlbWVudHMgeWV0XG4gICAgICAgIGlmICghQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKHRoaXMuZWwuY2hpbGRyZW4sIGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNoaWxkLmNsYXNzTGlzdC5jb250YWlucyhfdGhpcy5jbGFzc05hbWVzLndyYXBwZXIpO1xuICAgICAgICB9KS5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIFByZXBhcmUgRE9NXG4gICAgICAgICAgICB0aGlzLndyYXBwZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50V3JhcHBlckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLm9mZnNldEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLm1hc2tFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHRBdXRvT2JzZXJ2ZXJXcmFwcGVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0QXV0b09ic2VydmVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy53cmFwcGVyRWwsIHRoaXMuY2xhc3NOYW1lcy53cmFwcGVyKTtcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5jb250ZW50V3JhcHBlckVsLCB0aGlzLmNsYXNzTmFtZXMuY29udGVudFdyYXBwZXIpO1xuICAgICAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLm9mZnNldEVsLCB0aGlzLmNsYXNzTmFtZXMub2Zmc2V0KTtcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5tYXNrRWwsIHRoaXMuY2xhc3NOYW1lcy5tYXNrKTtcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5jb250ZW50RWwsIHRoaXMuY2xhc3NOYW1lcy5jb250ZW50RWwpO1xuICAgICAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLnBsYWNlaG9sZGVyRWwsIHRoaXMuY2xhc3NOYW1lcy5wbGFjZWhvbGRlcik7XG4gICAgICAgICAgICBhZGRDbGFzc2VzKHRoaXMuaGVpZ2h0QXV0b09ic2VydmVyV3JhcHBlckVsLCB0aGlzLmNsYXNzTmFtZXMuaGVpZ2h0QXV0b09ic2VydmVyV3JhcHBlckVsKTtcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5oZWlnaHRBdXRvT2JzZXJ2ZXJFbCwgdGhpcy5jbGFzc05hbWVzLmhlaWdodEF1dG9PYnNlcnZlckVsKTtcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLmVsLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRFbC5hcHBlbmRDaGlsZCh0aGlzLmVsLmZpcnN0Q2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb250ZW50V3JhcHBlckVsLmFwcGVuZENoaWxkKHRoaXMuY29udGVudEVsKTtcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0RWwuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50V3JhcHBlckVsKTtcbiAgICAgICAgICAgIHRoaXMubWFza0VsLmFwcGVuZENoaWxkKHRoaXMub2Zmc2V0RWwpO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHRBdXRvT2JzZXJ2ZXJXcmFwcGVyRWwuYXBwZW5kQ2hpbGQodGhpcy5oZWlnaHRBdXRvT2JzZXJ2ZXJFbCk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZXJFbC5hcHBlbmRDaGlsZCh0aGlzLmhlaWdodEF1dG9PYnNlcnZlcldyYXBwZXJFbCk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZXJFbC5hcHBlbmRDaGlsZCh0aGlzLm1hc2tFbCk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZXJFbC5hcHBlbmRDaGlsZCh0aGlzLnBsYWNlaG9sZGVyRWwpO1xuICAgICAgICAgICAgdGhpcy5lbC5hcHBlbmRDaGlsZCh0aGlzLndyYXBwZXJFbCk7XG4gICAgICAgICAgICAoX2EgPSB0aGlzLmNvbnRlbnRXcmFwcGVyRWwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcbiAgICAgICAgICAgIChfYiA9IHRoaXMuY29udGVudFdyYXBwZXJFbCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnNldEF0dHJpYnV0ZSgncm9sZScsICdyZWdpb24nKTtcbiAgICAgICAgICAgIChfYyA9IHRoaXMuY29udGVudFdyYXBwZXJFbCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIHRoaXMub3B0aW9ucy5hcmlhTGFiZWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5heGlzLngudHJhY2suZWwgfHwgIXRoaXMuYXhpcy55LnRyYWNrLmVsKSB7XG4gICAgICAgICAgICB2YXIgdHJhY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHZhciBzY3JvbGxiYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGFkZENsYXNzZXModHJhY2ssIHRoaXMuY2xhc3NOYW1lcy50cmFjayk7XG4gICAgICAgICAgICBhZGRDbGFzc2VzKHNjcm9sbGJhciwgdGhpcy5jbGFzc05hbWVzLnNjcm9sbGJhcik7XG4gICAgICAgICAgICB0cmFjay5hcHBlbmRDaGlsZChzY3JvbGxiYXIpO1xuICAgICAgICAgICAgdGhpcy5heGlzLngudHJhY2suZWwgPSB0cmFjay5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICBhZGRDbGFzc2VzKHRoaXMuYXhpcy54LnRyYWNrLmVsLCB0aGlzLmNsYXNzTmFtZXMuaG9yaXpvbnRhbCk7XG4gICAgICAgICAgICB0aGlzLmF4aXMueS50cmFjay5lbCA9IHRyYWNrLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5heGlzLnkudHJhY2suZWwsIHRoaXMuY2xhc3NOYW1lcy52ZXJ0aWNhbCk7XG4gICAgICAgICAgICB0aGlzLmVsLmFwcGVuZENoaWxkKHRoaXMuYXhpcy54LnRyYWNrLmVsKTtcbiAgICAgICAgICAgIHRoaXMuZWwuYXBwZW5kQ2hpbGQodGhpcy5heGlzLnkudHJhY2suZWwpO1xuICAgICAgICB9XG4gICAgICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLmluaXRET00uY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2ltcGxlYmFyJywgJ2luaXQnKTtcbiAgICB9O1xuICAgIFNpbXBsZUJhci5wcm90b3R5cGUudW5Nb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUudW5Nb3VudC5jYWxsKHRoaXMpO1xuICAgICAgICBTaW1wbGVCYXIuaW5zdGFuY2VzW1wiZGVsZXRlXCJdKHRoaXMuZWwpO1xuICAgIH07XG4gICAgU2ltcGxlQmFyLmluaXRIdG1sQXBpID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmluaXRET01Mb2FkZWRFbGVtZW50cyA9IHRoaXMuaW5pdERPTUxvYWRlZEVsZW1lbnRzLmJpbmQodGhpcyk7XG4gICAgICAgIC8vIE11dGF0aW9uT2JzZXJ2ZXIgaXMgSUUxMStcbiAgICAgICAgaWYgKHR5cGVvZiBNdXRhdGlvbk9ic2VydmVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgLy8gTXV0YXRpb24gb2JzZXJ2ZXIgdG8gb2JzZXJ2ZSBkeW5hbWljYWxseSBhZGRlZCBlbGVtZW50c1xuICAgICAgICAgICAgdGhpcy5nbG9iYWxPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKFNpbXBsZUJhci5oYW5kbGVNdXRhdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5nbG9iYWxPYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUYWtlbiBmcm9tIGpRdWVyeSBgcmVhZHlgIGZ1bmN0aW9uXG4gICAgICAgIC8vIEluc3RhbnRpYXRlIGVsZW1lbnRzIGFscmVhZHkgcHJlc2VudCBvbiB0aGUgcGFnZVxuICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJyB8fCAvLyBAdHMtaWdub3JlOiBJRSBzcGVjaWZpY1xuICAgICAgICAgICAgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT09ICdsb2FkaW5nJyAmJiAhZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmRvU2Nyb2xsKSkge1xuICAgICAgICAgICAgLy8gSGFuZGxlIGl0IGFzeW5jaHJvbm91c2x5IHRvIGFsbG93IHNjcmlwdHMgdGhlIG9wcG9ydHVuaXR5IHRvIGRlbGF5IGluaXRcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMuaW5pdERPTUxvYWRlZEVsZW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCB0aGlzLmluaXRET01Mb2FkZWRFbGVtZW50cyk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHRoaXMuaW5pdERPTUxvYWRlZEVsZW1lbnRzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2ltcGxlQmFyLmhhbmRsZU11dGF0aW9ucyA9IGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG11dGF0aW9uKSB7XG4gICAgICAgICAgICBtdXRhdGlvbi5hZGRlZE5vZGVzLmZvckVhY2goZnVuY3Rpb24gKGFkZGVkTm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChhZGRlZE5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFkZGVkTm9kZS5oYXNBdHRyaWJ1dGUoJ2RhdGEtc2ltcGxlYmFyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICFTaW1wbGVCYXIuaW5zdGFuY2VzLmhhcyhhZGRlZE5vZGUpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNvbnRhaW5zKGFkZGVkTm9kZSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgU2ltcGxlQmFyKGFkZGVkTm9kZSwgZ2V0T3B0aW9ucyhhZGRlZE5vZGUuYXR0cmlidXRlcykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkZWROb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNpbXBsZWJhcl0nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2ltcGxlYmFyJykgIT09ICdpbml0JyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhU2ltcGxlQmFyLmluc3RhbmNlcy5oYXMoZWwpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jb250YWlucyhlbCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBTaW1wbGVCYXIoZWwsIGdldE9wdGlvbnMoZWwuYXR0cmlidXRlcykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG11dGF0aW9uLnJlbW92ZWROb2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChyZW1vdmVkTm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChyZW1vdmVkTm9kZS5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVtb3ZlZE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXNpbXBsZWJhcicpID09PSAnaW5pdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFNpbXBsZUJhci5pbnN0YW5jZXMuaGFzKHJlbW92ZWROb2RlKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY29udGFpbnMocmVtb3ZlZE5vZGUpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2ltcGxlQmFyLmluc3RhbmNlcy5nZXQocmVtb3ZlZE5vZGUpLnVuTW91bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwocmVtb3ZlZE5vZGUucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2ltcGxlYmFyPVwiaW5pdFwiXScpLCBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaW1wbGVCYXIuaW5zdGFuY2VzLmhhcyhlbCkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jb250YWlucyhlbCkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2ltcGxlQmFyLmluc3RhbmNlcy5nZXQoZWwpLnVuTW91bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU2ltcGxlQmFyLmluc3RhbmNlcyA9IG5ldyBXZWFrTWFwKCk7XG4gICAgcmV0dXJuIFNpbXBsZUJhcjtcbn0oU2ltcGxlQmFyQ29yZSkpO1xuLyoqXG4gKiBIVE1MIEFQSVxuICogQ2FsbGVkIG9ubHkgaW4gYSBicm93c2VyIGVudi5cbiAqL1xuaWYgKGNhblVzZURPTSkge1xuICAgIFNpbXBsZUJhci5pbml0SHRtbEFwaSgpO1xufVxuXG5leHBvcnQgeyBTaW1wbGVCYXIgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuLi9zY3NzL3N0eWxlLnNjc3MnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHV0aWxzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzL3V0aWxzLmpzJztcblxuLy8gaGFtYnVyZ2VyIG1lbnVcbnV0aWxzLm1lbnVJbml0KCk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gY29tcG9uZW50cyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIGZvcm1zXG5pbXBvcnQgJy4vdXRpbHMvZm9ybXMnO1xuXG4vLyB0YWJzXG5pbXBvcnQgJy4vdXRpbHMvdGFicy5qcyc7XG5cbi8vIGFjY29yZGlvblxuaW1wb3J0ICcuL3V0aWxzL2FjY29yZGlvbi5qcyc7XG5cbi8vIHNlbGVjdFxuaW1wb3J0ICcuL3V0aWxzL3NlbGVjdC5qcyc7XG5cbi8vIG1vZGFsc1xuaW1wb3J0ICcuL3V0aWxzL21vZGFscy5qcyc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmltcG9ydCAnLi9kZXYvdnptc2sxLmpzJztcbmltcG9ydCAnLi9kZXYvbWFya3VzRE0uanMnO1xuaW1wb3J0ICcuL2Rldi91a2lrMC5qcyc7XG5pbXBvcnQgJy4vZGV2L2tpZTZlci5qcyc7XG4iXSwibmFtZXMiOlsibW9kdWxlcyIsImRhdGFNZWRpYVF1ZXJpZXMiLCJfc2xpZGVUb2dnbGUiLCJfc2xpZGVVcCIsIl9zbGlkZURvd24iLCJBY2NvcmRpb24iLCJjb25zdHJ1Y3RvciIsImFjY29yZGlvbkl0ZW1zIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwibWRRdWVyaWVzQXJyYXkiLCJyZWdJdGVtcyIsIkFycmF5IiwiZnJvbSIsImZpbHRlciIsIml0ZW0iLCJpbmRleCIsInNlbGYiLCJkYXRhc2V0IiwiYWNjb3JkaW9uIiwic3BsaXQiLCJhdHRycyIsIkFDQ09SRElPTiIsIklURU0iLCJTSU5HTEUiLCJjbGFzc2VzIiwiSU5JVCIsIkFDVElWRSIsImxlbmd0aCIsImluaXQiLCJfdGhpcyIsImZvckVhY2giLCJtZFF1ZXJpZXNJdGVtIiwibWF0Y2hNZWRpYSIsImFkZEV2ZW50TGlzdGVuZXIiLCJpdGVtc0FycmF5IiwiaGlkZUJvZHkiLCJhY2NvcmRpb25Hcm91cCIsImFjdGl2ZVRpdGxlIiwicXVlcnlTZWxlY3RvciIsInNwZWVkIiwiYWNjb3JkaW9uU3BlZWQiLCJwYXJzZUludCIsImNsYXNzTGlzdCIsInJlbW92ZSIsIm5leHRFbGVtZW50U2libGluZyIsInNldEFjdGlvbnMiLCJlIiwidGFyZ2V0IiwiY2xvc2VzdCIsInRpdGxlIiwiZ3JvdXAiLCJpc1NpbmdsZSIsImhhc0F0dHJpYnV0ZSIsImNvbnRhaW5zIiwidG9nZ2xlIiwicHJldmVudERlZmF1bHQiLCJpbml0Qm9keSIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsInRpdGxlcyIsInJlbW92ZUF0dHJpYnV0ZSIsImhpZGRlbiIsInNldEF0dHJpYnV0ZSIsIm1hdGNoZXMiLCJhZGQiLCJiaW5kIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIlZhbGlkYXRpb24iLCJSRVFVSVJFRCIsIklHTk9SRV9WQUxJREFUSU9OIiwiQUpBWCIsIkRFViIsIklHTk9SRV9GT0NVUyIsIlNIT1dfUExBQ0VIT0xERVIiLCJWQUxJREFURSIsIkhBU19FUlJPUiIsIkhBU19GT0NVUyIsImdldEVycm9ycyIsImZvcm0iLCJlcnIiLCJyZXF1aXJlZEZpZWxkcyIsInJlcXVpcmVkRmllbGQiLCJvZmZzZXRQYXJlbnQiLCJ0YWdOYW1lIiwiZGlzYWJsZWQiLCJ2YWxpZGF0ZUZpZWxkIiwiYWRkRXJyb3IiLCJwYXJlbnRFbGVtZW50IiwicmVtb3ZlRXJyb3IiLCJyZXF1aXJlZCIsInZhbHVlIiwicmVwbGFjZSIsInRlc3RFbWFpbCIsInR5cGUiLCJjaGVja2VkIiwidHJpbSIsImNsZWFyRmllbGRzIiwicmVzZXQiLCJzZXRUaW1lb3V0IiwiaW5wdXRzIiwiY2hlY2tib3hlcyIsImlucHV0IiwiY2hlY2tib3giLCJ0ZXN0IiwiRm9ybVN1Ym1pdGlvbiIsInNob3VsZFZhbGlkYXRlIiwiZm9ybXMiLCJzZW5kRm9ybSIsInJlc3BvbnNlUmVzdWx0IiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwicG9wdXAiLCJtb2RhbCIsIm1vZGFsTWVzc2FnZSIsIm9wZW4iLCJjb25zb2xlIiwibG9nIiwiaGFuZGxlU3VibWl0aW9uIiwiYWpheCIsImFjdGlvbiIsImdldEF0dHJpYnV0ZSIsIm1ldGhvZCIsImRhdGEiLCJGb3JtRGF0YSIsInJlc3BvbnNlIiwiZmV0Y2giLCJib2R5Iiwib2siLCJyZXN1bHQiLCJqc29uIiwiYWxlcnQiLCJGb3JtRmllbGRzIiwiZmllbGRzIiwic2F2ZVBsYWNlaG9sZGVyIiwiZmllbGQiLCJwbGFjZWhvbGRlciIsImhhbmRsZUZvY3VzaW4iLCJoYW5kbGVGb2N1c291dCIsImJvZHlMb2NrU3RhdHVzIiwiYm9keUxvY2siLCJib2R5VW5sb2NrIiwiTW9kYWwiLCJvcHRpb25zIiwiY29uZmlnIiwibG9nZ2luZyIsImF0dHJpYnV0ZU9wZW5CdXR0b24iLCJhdHRyaWJ1dGVDbG9zZUJ1dHRvbiIsImZpeEVsZW1lbnRTZWxlY3RvciIsInlvdXR1YmVBdHRyaWJ1dGUiLCJ5b3V0dWJlUGxhY2VBdHRyaWJ1dGUiLCJzZXRBdXRvcGxheVlvdXR1YmUiLCJtb2RhbENvbnRlbnQiLCJtb2RhbEFjdGl2ZSIsImJvZHlBY3RpdmUiLCJmb2N1c0NhdGNoIiwiY2xvc2VFc2MiLCJoYXNoU2V0dGluZ3MiLCJsb2NhdGlvbiIsImdvSGFzaCIsIm9uIiwiYmVmb3JlT3BlbiIsImFmdGVyT3BlbiIsImJlZm9yZUNsb3NlIiwiYWZ0ZXJDbG9zZSIsInlvdVR1YmVDb2RlIiwiaXNPcGVuIiwidGFyZ2V0T3BlbiIsInNlbGVjdG9yIiwiZWxlbWVudCIsInByZXZpb3VzT3BlbiIsImxhc3RDbG9zZWQiLCJfZGF0YVZhbHVlIiwiaGFzaCIsIl9yZW9wZW4iLCJfc2VsZWN0b3JPcGVuIiwibGFzdEZvY3VzRWwiLCJfZm9jdXNFbCIsImluaXRtb2RhbHMiLCJldmVudHNtb2RhbCIsImJ1dHRvbk9wZW4iLCJidXR0b25DbG9zZSIsImNsb3NlIiwid2hpY2giLCJjb2RlIiwiX2ZvY3VzQ2F0Y2giLCJ3aW5kb3ciLCJfb3BlblRvSGFzaCIsInNlbGVjdG9yVmFsdWUiLCJkb2N1bWVudEVsZW1lbnQiLCJwcmV2aW91c0FjdGl2ZUVsZW1lbnQiLCJhY3RpdmVFbGVtZW50IiwiY29kZVZpZGVvIiwidXJsVmlkZW8iLCJpZnJhbWUiLCJjcmVhdGVFbGVtZW50IiwiYXV0b3BsYXkiLCJ5b3V0dWJlUGxhY2UiLCJhcHBlbmRDaGlsZCIsIl9nZXRIYXNoIiwiX3NldEhhc2giLCJtIiwiaW5uZXJXaWR0aCIsIl9mb2N1c1RyYXAiLCJpbm5lckhUTUwiLCJfcmVtb3ZlSGFzaCIsImluY2x1ZGVzIiwiY2xhc3NJbkhhc2giLCJidXR0b25zIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImhyZWYiLCJmb2N1c2FibGUiLCJmb2N1c0FycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJjYWxsIiwiZm9jdXNlZEluZGV4IiwiaW5kZXhPZiIsInNoaWZ0S2V5IiwiZm9jdXMiLCJjb25maXJtQWdlQnRuIiwiZ2V0RWxlbWVudEJ5SWQiLCJTaW1wbGVCYXIiLCJTZWxlY3QiLCJTRUxFQ1QiLCJCT0RZIiwiTEFCRUwiLCJUSVRMRSIsIlZBTFVFIiwiQ09OVEVOVCIsIk9QVElPTlMiLCJPUFRJT04iLCJTQ1JPTEwiLCJHUk9VUCIsIklOUFVUIiwiQVNTRVQiLCJUWFQiLCJJU19BQ1RJVkUiLCJJU19GT0NVU0VEIiwiSVNfT1BFTkVEIiwiSVNfRklMTEVEIiwiSVNfU0VMRUNURUQiLCJJU19ESVNBQkxFRCIsIkhBU19MSVNUIiwiSEFTX01VTFRJUExFIiwiSEFTX0NIRUNLQk9YIiwiSEFTX0xBQkVMIiwic2VsZWN0TGlzdCIsInNlbGVjdCIsImluaXRTZWxJdGVtIiwicmVsYXRpdmVTZWwiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwic2VsSWQiLCJnZXRQbGFjZWhvbGRlciIsIm9wdFBsYWNlaG9sZGVyIiwibGFiZWwiLCJzaG93Iiwic2VsVGl0bGUiLCJnZXRTZWxlY3QiLCJ0d2luU2VsIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwidGV4dCIsImJ1aWxkIiwiaW5pdFNlbGVjdGlvbnMiLCJzZXRWYWx1ZSIsInNldE9wdGlvbnMiLCJzZWxBZGRvbkNsYXNzIiwibXVsdGlwbGUiLCJkaXNhYmxlU2VsZWN0Iiwic2V0U2VhcmNoQWN0aW9ucyIsInNldEFjdGlvbiIsInNlbEhpbnQiLCJzZWxCb2R5IiwiZ2V0VmFsdWUiLCJyZWxhdGl2ZVNlbE9wdGlvbnMiLCJnZXRPcHRpb25zIiwiZ2V0Q2xhc3MiLCJzZWwiLCJzZWxlY3RJZCIsInNlbExpc3QiLCJzZWxPcHRpb24iLCJvcHRWYWwiLCJzZXRPcHRpb25BY3Rpb24iLCJhZGRFcnIiLCJyZW1vdmVFcnIiLCJjbG9zZUdyb3VwIiwic2VsT3B0aW9ucyIsInNlbGVjdE9uZUdyb3VwIiwic2VsR3JvdXAiLCJzZWxlY3Rpb25zIiwic2VsZWN0aW9uIiwiY2xvc2VJdGVtIiwib3B0aW9uIiwicmVsYXRpdmVTZWxlY3Rpb25zIiwiZ2V0RGF0YSIsImVsZW1lbnRzIiwicmVsYXRpdmVTZWxlY3Rpb24iLCJ0d2luU2VsZWN0aW9ucyIsInR3aW5TZWxlY3Rpb24iLCJvcHQiLCJ0ZXh0Q29udGVudCIsInNldFNlbGVjdGlvbnMiLCJzZWxJbnB1dCIsInRvVXBwZXJDYXNlIiwic2V0U3VidGl0bGUiLCJzZWxFcnJvciIsInJlbW92ZUNoaWxkIiwiY3NzQ2xhc3MiLCJhdHRyIiwiYXR0ckNsYXNzIiwidGl0bGVWYWwiLCJodG1sIiwic2VsTGFiZWwiLCJ2YWx1ZXMiLCJtYXAiLCJnZXRDb250ZW50Iiwiam9pbiIsImxpc3QiLCJWQUxVRVVFIiwiY3VzdG9tQ2xhc3MiLCJvcHRDbGFzcyIsInNlbFNjcm9sbCIsInNlbFNjcm9sbEhlaWdodCIsInNlbE9wdGlvbnNIVE1MIiwiZ2V0T3B0aW9uIiwic2VsZWN0ZWQiLCJzaG93U2VsZWN0aW9uIiwib3B0aW9uQ2xhc3MiLCJvcHRpb25MaW5rIiwib3B0aW9uTGlua1RhcmdldCIsIm9wdGlvbkhUTUwiLCJvcHRpb25EYXRhIiwib3B0QXNzZXQiLCJvcHRpb25EYXRhSFRNTCIsIm9wdGlvbkNvbnRlbnRIVE1MIiwiZmluZCIsInN1YnRpdGxlIiwicHVzaCIsInNlbGVjdGVkSW5kZXgiLCJ0ZW1wQnV0dG9uIiwiYXBwZW5kIiwiY2xpY2siLCJzY3JvbGxCbG9jayIsImF1dG9IaWRlIiwic2V0SGFzaCIsImdldEhhc2giLCJUYWJzIiwiVEFCUyIsIklOREVYIiwiVElUTEVTIiwiVEFCX0lURU0iLCJIQVNIIiwiTU9EQUwiLCJ0YWJzIiwiYWN0aXZlSGFzaCIsInN0YXJ0c1dpdGgiLCJ0YWJzQmxvY2siLCJzZXRTdGF0dXMiLCJjb250ZW50IiwidGFic0luZGV4IiwiaGFzSGFzaCIsImluZHgiLCJhY3RpdmVIYXNoQmxvY2siLCJtZW51SW5pdCIsIm1lbnVPcGVuIiwibWVudUNsb3NlIiwiYm9keUxvY2tUb2dnbGUiLCJkZWxheSIsInVuaXF1ZUFycmF5IiwiYXJyYXkiLCJkYXRhU2V0VmFsdWUiLCJtZWRpYSIsImJyZWFrcG9pbnRzQXJyYXkiLCJwYXJhbXMiLCJicmVha3BvaW50IiwicGFyYW1zQXJyYXkiLCJtZFF1ZXJpZXMiLCJtZWRpYUJyZWFrcG9pbnQiLCJtZWRpYVR5cGUiLCJkdXJhdGlvbiIsInNob3dtb3JlIiwic3R5bGUiLCJ0cmFuc2l0aW9uUHJvcGVydHkiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJoZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJvdmVyZmxvdyIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwibWFyZ2luVG9wIiwibWFyZ2luQm90dG9tIiwicmVtb3ZlUHJvcGVydHkiLCJyZW1Ub1B4IiwicmVtVmFsdWUiLCJodG1sRm9udFNpemUiLCJwYXJzZUZsb2F0IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImZvbnRTaXplIiwicHhWYWx1ZSIsIk1hdGgiLCJyb3VuZCIsInJlbW92ZUNsYXNzZXMiLCJjbGFzc05hbWUiLCJpIiwidXRpbHMiXSwic291cmNlUm9vdCI6IiJ9