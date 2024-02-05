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

// --------------------------------------------------------------------------

_modules_js__WEBPACK_IMPORTED_MODULE_0__.modules.modal = new Modal({});

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
    if (relativeSel.closest('[data-select-single]')) {
      const selectOneGroup = relativeSel.closest('[data-select-single]');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxPQUFPLDRHQUE0RyxXQUFXLFdBQVcsVUFBVSxXQUFXLFdBQVcsV0FBVyxNQUFNLEtBQUssV0FBVyxVQUFVLFVBQVUsV0FBVyxXQUFXLE1BQU0sS0FBSyxXQUFXLFdBQVcsV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsVUFBVSxNQUFNLEtBQUssV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLE1BQU0sS0FBSyxXQUFXLFdBQVcsV0FBVyxVQUFVLHFCQUFxQixVQUFVLHFCQUFxQixzQkFBc0IsVUFBVSxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsVUFBVSxVQUFVLE1BQU0sTUFBTSxVQUFVLFVBQVUsTUFBTSxLQUFLLFdBQVcsVUFBVSxVQUFVLFdBQVcsTUFBTSxLQUFLLFdBQVcsVUFBVSxV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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxPQUFPLDhVQUE4VSxXQUFXLE1BQU0sS0FBSyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLFVBQVUsVUFBVSxNQUFNLEtBQUssV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsYUFBYSxPQUFPLE1BQU0sV0FBVyxXQUFXLFVBQVUsVUFBVSxXQUFXLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLE1BQU0sV0FBVyxNQUFNLFFBQVEsVUFBVSxVQUFVLFVBQVUsS0FBSyxRQUFRLFVBQVUsS0FBSyxRQUFRLFVBQVUsTUFBTSxVQUFVLFVBQVUsVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFdBQVcsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxXQUFXLFVBQVUsV0FBVyxNQUFNLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsV0FBVyxNQUFNLEtBQUssVUFBVSxVQUFVLE1BQU0sTUFBTSxXQUFXLFVBQVUsTUFBTSxLQUFLLFdBQVcsTUFBTSxNQUFNLFVBQVUsVUFBVSxXQUFXLEtBQUssT0FBTyxXQUFXLFdBQVcsT0FBTyxPQUFPLFdBQVcsT0FBTyxNQUFNLFdBQVcsT0FBTyxNQUFNLFVBQVUsV0FBVyxPQUFPLE1BQU0sV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsT0FBTyxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsT0FBTyxTQUFTLFdBQVcsV0FBVyxXQUFXLE9BQU8sT0FBTyxVQUFVLE9BQU8sTUFBTSxXQUFXLFVBQVUsV0FBVyxVQUFVLE1BQU0sTUFBTSxXQUFXLFVBQVUsVUFBVSxZQUFZLFdBQVcsV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsWUFBWSxNQUFNLE1BQU0sV0FBVyxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxVQUFVLFVBQVUsV0FBVyxZQUFZLE1BQU0sTUFBTSxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsT0FBTyxNQUFNLFVBQVUsV0FBVyxVQUFVLE1BQU0sTUFBTSxVQUFVLE9BQU8sTUFBTSxXQUFXLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxXQUFXLFVBQVUsVUFBVSxXQUFXLFlBQVksV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFdBQVcsVUFBVSxVQUFVLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsTUFBTSxPQUFPLFdBQVcsV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsVUFBVSxXQUFXLE1BQU0sTUFBTSxXQUFXLFVBQVUsV0FBVyxVQUFVLFVBQVUsVUFBVSxXQUFXLFlBQVksWUFBWSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sVUFBVSxVQUFVLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsVUFBVSxXQUFXLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxPQUFPLE1BQU0sVUFBVSxPQUFPLE1BQU0sV0FBVyxVQUFV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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0MsOENBQThDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsb0RBQW9EO0FBQzdFLDZCQUE2QjtBQUM3QixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsb0RBQW9EO0FBQzdFLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHFEQUFRO0FBQ25DLDhCQUE4QixxREFBUSw2QkFBNkIsZUFBZTtBQUNsRiwrQkFBK0IscURBQVE7QUFDdkMsOEJBQThCLHFEQUFRO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksd0NBQVM7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0E0Qjs7QUFFNUI7O0FBRTBDOztBQUUxQztBQUNBRSxxREFBYyxDQUFDLENBQUM7O0FBRWhCOztBQUVBO0FBQ3VCOztBQUV2QjtBQUN5Qjs7QUFFekI7QUFDOEI7O0FBRTlCO0FBQzJCOztBQUUzQjtBQUMyQjs7QUFFM0I7O0FBRXlCO0FBQ0U7QUFDSCIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL3NyYy9qcy9tb2R1bGVzLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL3NyYy9qcy91dGlscy9hY2NvcmRpb24uanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vc3JjL2pzL3V0aWxzL2Zvcm1zLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL3NyYy9qcy91dGlscy9tb2RhbHMuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vc3JjL2pzL3V0aWxzL3NlbGVjdC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9zcmMvanMvdXRpbHMvdGFicy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9zcmMvanMvdXRpbHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2Nhbi11c2UtZG9tL2luZGV4LmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9zaW1wbGViYXIvZGlzdC9zaW1wbGViYXIuY3NzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL3NyYy9zY3NzL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvc2ltcGxlYmFyL2Rpc3Qvc2ltcGxlYmFyLmNzcz8xZTA1Iiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL3NyYy9zY3NzL3N0eWxlLnNjc3M/NmMyZCIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX1N5bWJvbC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlR2V0VGFnLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VUcmltLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2ZyZWVHbG9iYWwuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0UmF3VGFnLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX29iamVjdFRvU3RyaW5nLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3Jvb3QuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fdHJpbW1lZEVuZEluZGV4LmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvZGVib3VuY2UuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc09iamVjdC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzT2JqZWN0TGlrZS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzU3ltYm9sLmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvbm93LmpzIiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvdGhyb3R0bGUuanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy90b051bWJlci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9ub2RlX21vZHVsZXMvc2ltcGxlYmFyLWNvcmUvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlLy4vbm9kZV9tb2R1bGVzL3NpbXBsZWJhci9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3dlYnBhY2tfZXhhbXBsZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VicGFja19leGFtcGxlL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly93ZWJwYWNrX2V4YW1wbGUvLi9zcmMvanMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBtb2R1bGVzID0ge307XG4iLCJpbXBvcnQge1xuICBkYXRhTWVkaWFRdWVyaWVzLFxuICBfc2xpZGVUb2dnbGUsXG4gIF9zbGlkZVVwLFxuICBfc2xpZGVEb3duLFxufSBmcm9tICcuL3V0aWxzLmpzJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY2xhc3MgQWNjb3JkaW9uIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5hY2NvcmRpb25JdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWFjY29yZGlvbl0nKTtcbiAgICB0aGlzLm1kUXVlcmllc0FycmF5ID0gZGF0YU1lZGlhUXVlcmllcyh0aGlzLmFjY29yZGlvbkl0ZW1zLCAnYWNjb3JkaW9uJyk7XG4gICAgdGhpcy5yZWdJdGVtcyA9IEFycmF5LmZyb20odGhpcy5hY2NvcmRpb25JdGVtcykuZmlsdGVyKGZ1bmN0aW9uIChcbiAgICAgIGl0ZW0sXG4gICAgICBpbmRleCxcbiAgICAgIHNlbGZcbiAgICApIHtcbiAgICAgIHJldHVybiAhaXRlbS5kYXRhc2V0LmFjY29yZGlvbi5zcGxpdCgnLCcpWzBdO1xuICAgIH0pO1xuICAgIHRoaXMuYXR0cnMgPSB7XG4gICAgICBBQ0NPUkRJT046ICdkYXRhLWFjY29yZGlvbicsXG4gICAgICBJVEVNOiAnZGF0YS1hY2NvcmRpb24taXRlbScsXG4gICAgICBTSU5HTEU6ICdkYXRhLWFjY29yZGlvbi1zaW5nbGUnLFxuICAgIH07XG4gICAgdGhpcy5jbGFzc2VzID0ge1xuICAgICAgSU5JVDogJ19hY2NvcmRpb24taW5pdCcsXG4gICAgICBBQ1RJVkU6ICdfaXMtYWN0aXZlJyxcbiAgICB9O1xuXG4gICAgLy8gaW5pdCByZWd1bGFyIGFjY29yZGlvbiBpdGVtc1xuICAgIGlmICh0aGlzLnJlZ0l0ZW1zLmxlbmd0aCkge1xuICAgICAgdGhpcy5pbml0KHRoaXMucmVnSXRlbXMpO1xuICAgIH1cbiAgICAvLyBpbml0IGFjY29yZGlvbiBpdGVtcyB3aXRoIG1lZGlhIHF1ZXJpZXNcbiAgICBpZiAodGhpcy5tZFF1ZXJpZXNBcnJheSAmJiB0aGlzLm1kUXVlcmllc0FycmF5Lmxlbmd0aCkge1xuICAgICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB0aGlzLm1kUXVlcmllc0FycmF5LmZvckVhY2gobWRRdWVyaWVzSXRlbSA9PiB7XG4gICAgICAgIG1kUXVlcmllc0l0ZW0ubWF0Y2hNZWRpYS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgX3RoaXMuaW5pdChtZFF1ZXJpZXNJdGVtLml0ZW1zQXJyYXksIG1kUXVlcmllc0l0ZW0ubWF0Y2hNZWRpYSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmluaXQobWRRdWVyaWVzSXRlbS5pdGVtc0FycmF5LCBtZFF1ZXJpZXNJdGVtLm1hdGNoTWVkaWEpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGlkZUJvZHkoYWNjb3JkaW9uR3JvdXApIHtcbiAgICBjb25zdCBhY3RpdmVUaXRsZSA9IGFjY29yZGlvbkdyb3VwLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgWyR7dGhpcy5hdHRycy5JVEVNfV0uJHt0aGlzLmNsYXNzZXMuQUNUSVZFfWBcbiAgICApO1xuICAgIGNvbnN0IHNwZWVkID0gYWNjb3JkaW9uR3JvdXAuZGF0YXNldC5hY2NvcmRpb25TcGVlZFxuICAgICAgPyBwYXJzZUludChhY2NvcmRpb25Hcm91cC5kYXRhc2V0LmFjY29yZGlvblNwZWVkKVxuICAgICAgOiA1MDA7XG5cbiAgICBpZiAoYWN0aXZlVGl0bGUgJiYgIWFjY29yZGlvbkdyb3VwLnF1ZXJ5U2VsZWN0b3JBbGwoJy5fc2xpZGUnKS5sZW5ndGgpIHtcbiAgICAgIGFjdGl2ZVRpdGxlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLkFDVElWRSk7XG4gICAgICBfc2xpZGVVcChhY3RpdmVUaXRsZS5uZXh0RWxlbWVudFNpYmxpbmcsIHNwZWVkKTtcbiAgICB9XG4gIH1cblxuICBzZXRBY3Rpb25zKGUpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcblxuICAgIGlmICh0YXJnZXQuY2xvc2VzdChgWyR7dGhpcy5hdHRycy5JVEVNfV1gKSkge1xuICAgICAgY29uc3QgdGl0bGUgPSB0YXJnZXQuY2xvc2VzdChgWyR7dGhpcy5hdHRycy5JVEVNfV1gKTtcbiAgICAgIGNvbnN0IGdyb3VwID0gdGl0bGUuY2xvc2VzdChgWyR7dGhpcy5hdHRycy5BQ0NPUkRJT059XWApO1xuICAgICAgY29uc3QgaXNTaW5nbGUgPSBncm91cC5oYXNBdHRyaWJ1dGUodGhpcy5hdHRycy5TSU5HTEUpO1xuICAgICAgY29uc3Qgc3BlZWQgPSBncm91cC5kYXRhc2V0LmFjY29yZGlvblNwZWVkXG4gICAgICAgID8gcGFyc2VJbnQoZ3JvdXAuZGF0YXNldC5hY2NvcmRpb25TcGVlZClcbiAgICAgICAgOiA1MDA7XG5cbiAgICAgIGlmICghZ3JvdXAucXVlcnlTZWxlY3RvckFsbCgnLl9zbGlkZScpLmxlbmd0aCkge1xuICAgICAgICBpZiAoaXNTaW5nbGUgJiYgIXRpdGxlLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmNsYXNzZXMuQUNUSVZFKSkge1xuICAgICAgICAgIHRoaXMuaGlkZUJvZHkoZ3JvdXApO1xuICAgICAgICB9XG4gICAgICAgIHRpdGxlLmNsYXNzTGlzdC50b2dnbGUodGhpcy5jbGFzc2VzLkFDVElWRSk7XG4gICAgICAgIF9zbGlkZVRvZ2dsZSh0aXRsZS5uZXh0RWxlbWVudFNpYmxpbmcsIHNwZWVkKTtcbiAgICAgIH1cbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICBpbml0Qm9keShhY2NvcmRpb25Hcm91cCwgaGlkZUJvZHkgPSB0cnVlKSB7XG4gICAgbGV0IHRpdGxlcyA9IGFjY29yZGlvbkdyb3VwLnF1ZXJ5U2VsZWN0b3JBbGwoYFske3RoaXMuYXR0cnMuSVRFTX1dYCk7XG5cbiAgICBpZiAodGl0bGVzLmxlbmd0aCkge1xuICAgICAgdGl0bGVzID0gQXJyYXkuZnJvbSh0aXRsZXMpLmZpbHRlcihcbiAgICAgICAgaXRlbSA9PiBpdGVtLmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuQUNDT1JESU9OfV1gKSA9PT0gYWNjb3JkaW9uR3JvdXBcbiAgICAgICk7XG4gICAgICB0aXRsZXMuZm9yRWFjaCh0aXRsZSA9PiB7XG4gICAgICAgIGlmIChoaWRlQm9keSkge1xuICAgICAgICAgIHRpdGxlLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTtcbiAgICAgICAgICBpZiAoIXRpdGxlLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmNsYXNzZXMuQUNUSVZFKSkge1xuICAgICAgICAgICAgdGl0bGUubmV4dEVsZW1lbnRTaWJsaW5nLmhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRpdGxlLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnLTEnKTtcbiAgICAgICAgICB0aXRsZS5uZXh0RWxlbWVudFNpYmxpbmcuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGluaXQoYWNjb3JkaW9uSXRlbXMsIG1hdGNoTWVkaWEgPSBmYWxzZSkge1xuICAgIGFjY29yZGlvbkl0ZW1zLmZvckVhY2goYWNjb3JkaW9uR3JvdXAgPT4ge1xuICAgICAgYWNjb3JkaW9uR3JvdXAgPSBtYXRjaE1lZGlhID8gYWNjb3JkaW9uR3JvdXAuaXRlbSA6IGFjY29yZGlvbkdyb3VwO1xuICAgICAgaWYgKG1hdGNoTWVkaWEubWF0Y2hlcyB8fCAhbWF0Y2hNZWRpYSkge1xuICAgICAgICBhY2NvcmRpb25Hcm91cC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5JTklUKTtcbiAgICAgICAgdGhpcy5pbml0Qm9keShhY2NvcmRpb25Hcm91cCk7XG4gICAgICAgIGFjY29yZGlvbkdyb3VwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zZXRBY3Rpb25zLmJpbmQodGhpcykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWNjb3JkaW9uR3JvdXAuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSU5JVCk7XG4gICAgICAgIHRoaXMuaW5pdEJvZHkoYWNjb3JkaW9uR3JvdXAsIGZhbHNlKTtcbiAgICAgICAgYWNjb3JkaW9uR3JvdXAucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnNldEFjdGlvbnMuYmluZCh0aGlzKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubmV3IEFjY29yZGlvbigpO1xuIiwiaW1wb3J0IHsgbW9kdWxlcyB9IGZyb20gJy4uL21vZHVsZXMuanMnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jbGFzcyBWYWxpZGF0aW9uIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5hdHRycyA9IHtcbiAgICAgIFJFUVVJUkVEOiAnZGF0YS1yZXF1aXJlZCcsXG4gICAgICBJR05PUkVfVkFMSURBVElPTjogJ2RhdGEtaWdub3JlLXZhbGlkYXRpb24nLFxuICAgICAgQUpBWDogJ2RhdGEtYWpheCcsXG4gICAgICBERVY6ICdkYXRhLWRldicsXG4gICAgICBJR05PUkVfRk9DVVM6ICdkYXRhLWlnbm9yZS1mb2N1cycsXG4gICAgICBTSE9XX1BMQUNFSE9MREVSOiAnZGF0YS1zaG93LXBsYWNlaG9sZGVyJyxcbiAgICAgIFZBTElEQVRFOiAnZGF0YS12YWxpZGF0ZScsXG4gICAgfTtcbiAgICB0aGlzLmNsYXNzZXMgPSB7XG4gICAgICBIQVNfRVJST1I6ICdfaGFzLWVycm9yJyxcbiAgICAgIEhBU19GT0NVUzogJ19oYXMtZm9jdXMnLFxuICAgIH07XG4gIH1cblxuICBnZXRFcnJvcnMoZm9ybSkge1xuICAgIGxldCBlcnIgPSAwO1xuICAgIGxldCByZXF1aXJlZEZpZWxkcyA9IGZvcm0ucXVlcnlTZWxlY3RvckFsbChgKlske3RoaXMuYXR0cnMuUkVRVUlSRUR9XWApO1xuXG4gICAgaWYgKHJlcXVpcmVkRmllbGRzLmxlbmd0aCkge1xuICAgICAgcmVxdWlyZWRGaWVsZHMuZm9yRWFjaChyZXF1aXJlZEZpZWxkID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIChyZXF1aXJlZEZpZWxkLm9mZnNldFBhcmVudCAhPT0gbnVsbCB8fFxuICAgICAgICAgICAgcmVxdWlyZWRGaWVsZC50YWdOYW1lID09PSAnU0VMRUNUJykgJiZcbiAgICAgICAgICAhcmVxdWlyZWRGaWVsZC5kaXNhYmxlZFxuICAgICAgICApIHtcbiAgICAgICAgICBlcnIgKz0gdGhpcy52YWxpZGF0ZUZpZWxkKHJlcXVpcmVkRmllbGQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGVycjtcbiAgfVxuXG4gIGFkZEVycm9yKHJlcXVpcmVkRmllbGQpIHtcbiAgICByZXF1aXJlZEZpZWxkLmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLkhBU19FUlJPUik7XG4gICAgcmVxdWlyZWRGaWVsZC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLkhBU19FUlJPUik7XG4gIH1cblxuICByZW1vdmVFcnJvcihyZXF1aXJlZEZpZWxkKSB7XG4gICAgcmVxdWlyZWRGaWVsZC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5IQVNfRVJST1IpO1xuICAgIHJlcXVpcmVkRmllbGQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5IQVNfRVJST1IpO1xuICB9XG5cbiAgdmFsaWRhdGVGaWVsZChyZXF1aXJlZEZpZWxkKSB7XG4gICAgbGV0IGVyciA9IDA7XG5cbiAgICBpZiAocmVxdWlyZWRGaWVsZC5kYXRhc2V0LnJlcXVpcmVkID09PSAnZW1haWwnKSB7XG4gICAgICByZXF1aXJlZEZpZWxkLnZhbHVlID0gcmVxdWlyZWRGaWVsZC52YWx1ZS5yZXBsYWNlKCcgJywgJycpO1xuXG4gICAgICBpZiAodGhpcy50ZXN0RW1haWwocmVxdWlyZWRGaWVsZCkpIHtcbiAgICAgICAgdGhpcy5hZGRFcnJvcihyZXF1aXJlZEZpZWxkKTtcbiAgICAgICAgZXJyKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbW92ZUVycm9yKHJlcXVpcmVkRmllbGQpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocmVxdWlyZWRGaWVsZC50eXBlID09PSAnY2hlY2tib3gnICYmICFyZXF1aXJlZEZpZWxkLmNoZWNrZWQpIHtcbiAgICAgIHRoaXMuYWRkRXJyb3IocmVxdWlyZWRGaWVsZCk7XG4gICAgICBlcnIrKztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFyZXF1aXJlZEZpZWxkLnZhbHVlLnRyaW0oKSkge1xuICAgICAgICB0aGlzLmFkZEVycm9yKHJlcXVpcmVkRmllbGQpO1xuICAgICAgICBlcnIrKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVtb3ZlRXJyb3IocmVxdWlyZWRGaWVsZCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlcnI7XG4gIH1cblxuICBjbGVhckZpZWxkcyhmb3JtKSB7XG4gICAgZm9ybS5yZXNldCgpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCBpbnB1dHMgPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LHRleHRhcmVhJyk7XG4gICAgICBjb25zdCBjaGVja2JveGVzID0gZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKTtcblxuICAgICAgaWYgKGlucHV0cy5sZW5ndGgpIHtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGlucHV0cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICBjb25zdCBpbnB1dCA9IGlucHV0c1tpbmRleF07XG5cbiAgICAgICAgICBpbnB1dC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLkhBU19GT0NVUyk7XG4gICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSEFTX0ZPQ1VTKTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUVycm9yKGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGNoZWNrYm94ZXMubGVuZ3RoKSB7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjaGVja2JveGVzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgIGNvbnN0IGNoZWNrYm94ID0gY2hlY2tib3hlc1tpbmRleF07XG4gICAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgMCk7XG4gIH1cblxuICB0ZXN0RW1haWwocmVxdWlyZWRGaWVsZCkge1xuICAgIHJldHVybiAhL15cXHcrKFtcXC4tXT9cXHcrKSpAXFx3KyhbXFwuLV0/XFx3KykqKFxcLlxcd3syLDh9KSskLy50ZXN0KFxuICAgICAgcmVxdWlyZWRGaWVsZC52YWx1ZVxuICAgICk7XG4gIH1cbn1cbmNsYXNzIEZvcm1TdWJtaXRpb24gZXh0ZW5kcyBWYWxpZGF0aW9uIHtcbiAgY29uc3RydWN0b3Ioc2hvdWxkVmFsaWRhdGUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc2hvdWxkVmFsaWRhdGUgPSBzaG91bGRWYWxpZGF0ZSA/IHNob3VsZFZhbGlkYXRlIDogdHJ1ZTtcbiAgICB0aGlzLmZvcm1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZm9ybScpO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgc2VuZEZvcm0oZm9ybSwgcmVzcG9uc2VSZXN1bHQgPSBgYCkge1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3NlbmRGb3JtJywge1xuICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICBmb3JtOiBmb3JtLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgLy8gc2hvdyBtb2RhbCwgaWYgcG9wdXAgbW9kdWxlIGlzIGNvbm5lY3RlZFxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKG1vZHVsZXMucG9wdXApIHtcbiAgICAgICAgY29uc3QgbW9kYWwgPSBmb3JtLmRhdGFzZXQubW9kYWxNZXNzYWdlO1xuICAgICAgICBtb2RhbCA/IG1vZHVsZXMubW9kYWwub3Blbihtb2RhbCkgOiBudWxsO1xuICAgICAgfVxuICAgIH0sIDApO1xuXG4gICAgdGhpcy5jbGVhckZpZWxkcyhmb3JtKTtcblxuICAgIGNvbnNvbGUubG9nKCdpcyBzZW50Jyk7XG4gIH1cblxuICBhc3luYyBoYW5kbGVTdWJtaXRpb24oZm9ybSwgZSkge1xuICAgIGNvbnN0IGVyciA9ICFmb3JtLmhhc0F0dHJpYnV0ZSh0aGlzLmF0dHJzLklHTk9SRV9WQUxJREFUSU9OKVxuICAgICAgPyB0aGlzLmdldEVycm9ycyhmb3JtKVxuICAgICAgOiAwO1xuXG4gICAgaWYgKGVyciA9PT0gMCkge1xuICAgICAgY29uc3QgYWpheCA9IGZvcm0uaGFzQXR0cmlidXRlKHRoaXMuYXR0cnMuQUpBWCk7XG5cbiAgICAgIGlmIChhamF4KSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCBhY3Rpb24gPSBmb3JtLmdldEF0dHJpYnV0ZSgnYWN0aW9uJylcbiAgICAgICAgICA/IGZvcm0uZ2V0QXR0cmlidXRlKCdhY3Rpb24nKS50cmltKClcbiAgICAgICAgICA6ICcjJztcbiAgICAgICAgY29uc3QgbWV0aG9kID0gZm9ybS5nZXRBdHRyaWJ1dGUoJ21ldGhvZCcpXG4gICAgICAgICAgPyBmb3JtLmdldEF0dHJpYnV0ZSgnbWV0aG9kJykudHJpbSgpXG4gICAgICAgICAgOiAnR0VUJztcbiAgICAgICAgY29uc3QgZGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcblxuICAgICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ19pcy1zZW5kaW5nJyk7XG5cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChhY3Rpb24sIHtcbiAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICBib2R5OiBkYXRhLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdfaXMtc2VuZGluZycpO1xuICAgICAgICAgIHRoaXMuc2VuZEZvcm0oZm9ybSwgcmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhbGVydCgnZXJyb3InKTtcbiAgICAgICAgICBmb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ19pcy1zZW5kaW5nJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZm9ybS5oYXNBdHRyaWJ1dGUodGhpcy5hdHRycy5ERVYpKSB7XG4gICAgICAgIC8vIGluIGRldmVsb3BtZW50IG1vZGVcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnNlbmRGb3JtKGZvcm0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zdCBfdGhpcyA9IHRoaXM7XG5cbiAgICBpZiAodGhpcy5mb3Jtcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZm9ybXMuZm9yRWFjaChmb3JtID0+IHtcbiAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIF90aGlzLmhhbmRsZVN1Ym1pdGlvbihlLnRhcmdldCwgZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2V0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBfdGhpcy5jbGVhckZpZWxkcyhlLnRhcmdldCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5jbGFzcyBGb3JtRmllbGRzIGV4dGVuZHMgVmFsaWRhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5maWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCx0ZXh0YXJlYScpO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgc2F2ZVBsYWNlaG9sZGVyKCkge1xuICAgIGlmICh0aGlzLmZpZWxkcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgICBpZiAoIWZpZWxkLmhhc0F0dHJpYnV0ZSh0aGlzLmF0dHJzLlNIT1dfUExBQ0VIT0xERVIpKSB7XG4gICAgICAgICAgZmllbGQuZGF0YXNldC5wbGFjZWhvbGRlciA9IGZpZWxkLnBsYWNlaG9sZGVyO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVGb2N1c2luKGUpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcblxuICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PT0gJ0lOUFVUJyB8fCB0YXJnZXQudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJykge1xuICAgICAgaWYgKHRhcmdldC5kYXRhc2V0LnBsYWNlaG9sZGVyKSB0YXJnZXQucGxhY2Vob2xkZXIgPSAnJztcblxuICAgICAgaWYgKCF0YXJnZXQuaGFzQXR0cmlidXRlKHRoaXMuYXR0cnMuSUdOT1JFX0ZPQ1VTKSkge1xuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzZXMuSEFTX0ZPQ1VTKTtcbiAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzZXMuSEFTX0ZPQ1VTKTtcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLkhBU19FUlJPUik7XG4gICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLkhBU19FUlJPUik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVtb3ZlRXJyb3IodGFyZ2V0KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVGb2N1c291dChlKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgaWYgKHRhcmdldC50YWdOYW1lID09PSAnSU5QVVQnIHx8IHRhcmdldC50YWdOYW1lID09PSAnVEVYVEFSRUEnKSB7XG4gICAgICBpZiAodGFyZ2V0LmRhdGFzZXQucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgdGFyZ2V0LnBsYWNlaG9sZGVyID0gdGFyZ2V0LmRhdGFzZXQucGxhY2Vob2xkZXI7XG4gICAgICB9XG5cbiAgICAgIGlmICghdGFyZ2V0Lmhhc0F0dHJpYnV0ZSh0aGlzLmF0dHJzLklHTk9SRV9GT0NVUykpIHtcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLkhBU19GT0NVUyk7XG4gICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLkhBU19GT0NVUyk7XG4gICAgICB9XG4gICAgICBpZiAodGFyZ2V0Lmhhc0F0dHJpYnV0ZSh0aGlzLmF0dHJzLlZBTElEQVRFKSkge1xuICAgICAgICB0aGlzLnZhbGlkYXRlRmllbGQodGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpbml0KCkge1xuICAgIC8vIHNhdmUgcGxhY2Vob2xkZXIgaW4gZGF0YSBhdHRyaWJ1dGVcbiAgICB0aGlzLnNhdmVQbGFjZWhvbGRlcigpO1xuXG4gICAgLy8gaGFuZGxlIHN1Ym1pdGlvblxuICAgIG5ldyBGb3JtU3VibWl0aW9uKCk7XG5cbiAgICAvLyBldmVudHNcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzaW4nLCB0aGlzLmhhbmRsZUZvY3VzaW4uYmluZCh0aGlzKSk7XG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIHRoaXMuaGFuZGxlRm9jdXNvdXQuYmluZCh0aGlzKSk7XG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubmV3IEZvcm1GaWVsZHMoKTtcbiIsImltcG9ydCB7IG1vZHVsZXMgfSBmcm9tICcuLi9tb2R1bGVzLmpzJztcbmltcG9ydCB7IGJvZHlMb2NrU3RhdHVzLCBib2R5TG9jaywgYm9keVVubG9jayB9IGZyb20gJy4uL3V0aWxzL3V0aWxzLmpzJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY2xhc3MgTW9kYWwge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgbGV0IGNvbmZpZyA9IHtcbiAgICAgIGxvZ2dpbmc6IHRydWUsXG4gICAgICBpbml0OiB0cnVlLFxuICAgICAgYXR0cmlidXRlT3BlbkJ1dHRvbjogJ2RhdGEtbW9kYWwnLFxuICAgICAgYXR0cmlidXRlQ2xvc2VCdXR0b246ICdkYXRhLWNsb3NlJyxcbiAgICAgIGZpeEVsZW1lbnRTZWxlY3RvcjogJ1tkYXRhLWxwXScsXG4gICAgICB5b3V0dWJlQXR0cmlidXRlOiAnZGF0YS1tb2RhbC15b3V0dWJlJyxcbiAgICAgIHlvdXR1YmVQbGFjZUF0dHJpYnV0ZTogJ2RhdGEtbW9kYWwteW91dHViZS1wbGFjZScsXG4gICAgICBzZXRBdXRvcGxheVlvdXR1YmU6IHRydWUsXG4gICAgICBjbGFzc2VzOiB7XG4gICAgICAgIG1vZGFsOiAnbW9kYWwnLFxuICAgICAgICAvLyBtb2RhbFdyYXBwZXI6ICdtb2RhbF9fd3JhcHBlcicsXG4gICAgICAgIG1vZGFsQ29udGVudDogJ21vZGFsX19jb250ZW50JyxcbiAgICAgICAgbW9kYWxBY3RpdmU6ICdtb2RhbF9zaG93JyxcbiAgICAgICAgYm9keUFjdGl2ZTogJ21vZGFsLXNob3cnLFxuICAgICAgfSxcbiAgICAgIGZvY3VzQ2F0Y2g6IHRydWUsXG4gICAgICBjbG9zZUVzYzogdHJ1ZSxcbiAgICAgIGJvZHlMb2NrOiB0cnVlLFxuICAgICAgaGFzaFNldHRpbmdzOiB7XG4gICAgICAgIGxvY2F0aW9uOiB0cnVlLFxuICAgICAgICBnb0hhc2g6IHRydWUsXG4gICAgICB9LFxuICAgICAgb246IHtcbiAgICAgICAgYmVmb3JlT3BlbjogZnVuY3Rpb24gKCkge30sXG4gICAgICAgIGFmdGVyT3BlbjogZnVuY3Rpb24gKCkge30sXG4gICAgICAgIGJlZm9yZUNsb3NlOiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgICAgYWZ0ZXJDbG9zZTogZnVuY3Rpb24gKCkge30sXG4gICAgICB9LFxuICAgIH07XG4gICAgdGhpcy55b3VUdWJlQ29kZTtcbiAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgIHRoaXMudGFyZ2V0T3BlbiA9IHtcbiAgICAgIHNlbGVjdG9yOiBmYWxzZSxcbiAgICAgIGVsZW1lbnQ6IGZhbHNlLFxuICAgIH07XG4gICAgdGhpcy5wcmV2aW91c09wZW4gPSB7XG4gICAgICBzZWxlY3RvcjogZmFsc2UsXG4gICAgICBlbGVtZW50OiBmYWxzZSxcbiAgICB9O1xuICAgIHRoaXMubGFzdENsb3NlZCA9IHtcbiAgICAgIHNlbGVjdG9yOiBmYWxzZSxcbiAgICAgIGVsZW1lbnQ6IGZhbHNlLFxuICAgIH07XG4gICAgdGhpcy5fZGF0YVZhbHVlID0gZmFsc2U7XG4gICAgdGhpcy5oYXNoID0gZmFsc2U7XG5cbiAgICB0aGlzLl9yZW9wZW4gPSBmYWxzZTtcbiAgICB0aGlzLl9zZWxlY3Rvck9wZW4gPSBmYWxzZTtcblxuICAgIHRoaXMubGFzdEZvY3VzRWwgPSBmYWxzZTtcbiAgICB0aGlzLl9mb2N1c0VsID0gW1xuICAgICAgJ2FbaHJlZl0nLFxuICAgICAgJ2lucHV0Om5vdChbZGlzYWJsZWRdKTpub3QoW3R5cGU9XCJoaWRkZW5cIl0pOm5vdChbYXJpYS1oaWRkZW5dKScsXG4gICAgICAnYnV0dG9uOm5vdChbZGlzYWJsZWRdKTpub3QoW2FyaWEtaGlkZGVuXSknLFxuICAgICAgJ3NlbGVjdDpub3QoW2Rpc2FibGVkXSk6bm90KFthcmlhLWhpZGRlbl0pJyxcbiAgICAgICd0ZXh0YXJlYTpub3QoW2Rpc2FibGVkXSk6bm90KFthcmlhLWhpZGRlbl0pJyxcbiAgICAgICdhcmVhW2hyZWZdJyxcbiAgICAgICdpZnJhbWUnLFxuICAgICAgJ29iamVjdCcsXG4gICAgICAnZW1iZWQnLFxuICAgICAgJ1tjb250ZW50ZWRpdGFibGVdJyxcbiAgICAgICdbdGFiaW5kZXhdOm5vdChbdGFiaW5kZXhePVwiLVwiXSknLFxuICAgIF07XG4gICAgLy90aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKGNvbmZpZywgb3B0aW9ucyk7XG4gICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgLi4uY29uZmlnLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIGNsYXNzZXM6IHtcbiAgICAgICAgLi4uY29uZmlnLmNsYXNzZXMsXG4gICAgICAgIC4uLm9wdGlvbnM/LmNsYXNzZXMsXG4gICAgICB9LFxuICAgICAgaGFzaFNldHRpbmdzOiB7XG4gICAgICAgIC4uLmNvbmZpZy5oYXNoU2V0dGluZ3MsXG4gICAgICAgIC4uLm9wdGlvbnM/Lmhhc2hTZXR0aW5ncyxcbiAgICAgIH0sXG4gICAgICBvbjoge1xuICAgICAgICAuLi5jb25maWcub24sXG4gICAgICAgIC4uLm9wdGlvbnM/Lm9uLFxuICAgICAgfSxcbiAgICB9O1xuICAgIHRoaXMuYm9keUxvY2sgPSBmYWxzZTtcbiAgICB0aGlzLm9wdGlvbnMuaW5pdCA/IHRoaXMuaW5pdG1vZGFscygpIDogbnVsbDtcbiAgfVxuICBpbml0bW9kYWxzKCkge1xuICAgIHRoaXMuZXZlbnRzbW9kYWwoKTtcbiAgfVxuICBldmVudHNtb2RhbCgpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ2NsaWNrJyxcbiAgICAgIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbk9wZW4gPSBlLnRhcmdldC5jbG9zZXN0KFxuICAgICAgICAgIGBbJHt0aGlzLm9wdGlvbnMuYXR0cmlidXRlT3BlbkJ1dHRvbn1dYFxuICAgICAgICApO1xuICAgICAgICBpZiAoYnV0dG9uT3Blbikge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLl9kYXRhVmFsdWUgPSBidXR0b25PcGVuLmdldEF0dHJpYnV0ZShcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5hdHRyaWJ1dGVPcGVuQnV0dG9uXG4gICAgICAgICAgKVxuICAgICAgICAgICAgPyBidXR0b25PcGVuLmdldEF0dHJpYnV0ZSh0aGlzLm9wdGlvbnMuYXR0cmlidXRlT3BlbkJ1dHRvbilcbiAgICAgICAgICAgIDogJ2Vycm9yJztcbiAgICAgICAgICB0aGlzLnlvdVR1YmVDb2RlID0gYnV0dG9uT3Blbi5nZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMueW91dHViZUF0dHJpYnV0ZVxuICAgICAgICAgIClcbiAgICAgICAgICAgID8gYnV0dG9uT3Blbi5nZXRBdHRyaWJ1dGUodGhpcy5vcHRpb25zLnlvdXR1YmVBdHRyaWJ1dGUpXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgICAgICAgaWYgKHRoaXMuX2RhdGFWYWx1ZSAhPT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzT3BlbikgdGhpcy5sYXN0Rm9jdXNFbCA9IGJ1dHRvbk9wZW47XG4gICAgICAgICAgICB0aGlzLnRhcmdldE9wZW4uc2VsZWN0b3IgPSBgJHt0aGlzLl9kYXRhVmFsdWV9YDtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdG9yT3BlbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYnV0dG9uQ2xvc2UgPSBlLnRhcmdldC5jbG9zZXN0KFxuICAgICAgICAgIGBbJHt0aGlzLm9wdGlvbnMuYXR0cmlidXRlQ2xvc2VCdXR0b259XWBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICFlLnRhcmdldC5jbG9zZXN0KCcjdW5jb25maXJtZWRBZ2VNb2RhbCcpICYmXG4gICAgICAgICAgIWUudGFyZ2V0LmNsb3Nlc3QoJyNjb25maXJtQWdlTW9kYWwnKSAmJlxuICAgICAgICAgIChidXR0b25DbG9zZSB8fFxuICAgICAgICAgICAgKCFlLnRhcmdldC5jbG9zZXN0KGAuJHt0aGlzLm9wdGlvbnMuY2xhc3Nlcy5tb2RhbENvbnRlbnR9YCkgJiZcbiAgICAgICAgICAgICAgdGhpcy5pc09wZW4pKVxuICAgICAgICApIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ2tleWRvd24nLFxuICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMub3B0aW9ucy5jbG9zZUVzYyAmJlxuICAgICAgICAgIGUud2hpY2ggPT0gMjcgJiZcbiAgICAgICAgICBlLmNvZGUgPT09ICdFc2NhcGUnICYmXG4gICAgICAgICAgdGhpcy5pc09wZW5cbiAgICAgICAgKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5mb2N1c0NhdGNoICYmIGUud2hpY2ggPT0gOSAmJiB0aGlzLmlzT3Blbikge1xuICAgICAgICAgIHRoaXMuX2ZvY3VzQ2F0Y2goZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5oYXNoU2V0dGluZ3MuZ29IYXNoKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgJ2hhc2hjaGFuZ2UnLFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XG4gICAgICAgICAgICB0aGlzLl9vcGVuVG9IYXNoKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UodGhpcy50YXJnZXRPcGVuLnNlbGVjdG9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgKTtcblxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICdsb2FkJyxcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaCkge1xuICAgICAgICAgICAgdGhpcy5fb3BlblRvSGFzaCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICApO1xuICAgIH1cbiAgfVxuICBvcGVuKHNlbGVjdG9yVmFsdWUpIHtcbiAgICBpZiAoYm9keUxvY2tTdGF0dXMpIHtcbiAgICAgIHRoaXMuYm9keUxvY2sgPVxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsb2NrJykgJiYgIXRoaXMuaXNPcGVuXG4gICAgICAgICAgPyB0cnVlXG4gICAgICAgICAgOiBmYWxzZTtcblxuICAgICAgaWYgKFxuICAgICAgICBzZWxlY3RvclZhbHVlICYmXG4gICAgICAgIHR5cGVvZiBzZWxlY3RvclZhbHVlID09PSAnc3RyaW5nJyAmJlxuICAgICAgICBzZWxlY3RvclZhbHVlLnRyaW0oKSAhPT0gJydcbiAgICAgICkge1xuICAgICAgICB0aGlzLnRhcmdldE9wZW4uc2VsZWN0b3IgPSBzZWxlY3RvclZhbHVlO1xuICAgICAgICB0aGlzLl9zZWxlY3Rvck9wZW4gPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICAgIHRoaXMuX3Jlb3BlbiA9IHRydWU7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5fc2VsZWN0b3JPcGVuKVxuICAgICAgICB0aGlzLnRhcmdldE9wZW4uc2VsZWN0b3IgPSB0aGlzLmxhc3RDbG9zZWQuc2VsZWN0b3I7XG4gICAgICBpZiAoIXRoaXMuX3Jlb3BlbikgdGhpcy5wcmV2aW91c0FjdGl2ZUVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXG4gICAgICB0aGlzLnRhcmdldE9wZW4uZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIHRoaXMudGFyZ2V0T3Blbi5zZWxlY3RvclxuICAgICAgKTtcblxuICAgICAgaWYgKHRoaXMudGFyZ2V0T3Blbi5lbGVtZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnlvdVR1YmVDb2RlKSB7XG4gICAgICAgICAgY29uc3QgY29kZVZpZGVvID0gdGhpcy55b3VUdWJlQ29kZTtcbiAgICAgICAgICBjb25zdCB1cmxWaWRlbyA9IGBodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8ke2NvZGVWaWRlb30/cmVsPTAmc2hvd2luZm89MCZhdXRvcGxheT0xYDtcbiAgICAgICAgICBjb25zdCBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdhbGxvd2Z1bGxzY3JlZW4nLCAnJyk7XG5cbiAgICAgICAgICBjb25zdCBhdXRvcGxheSA9IHRoaXMub3B0aW9ucy5zZXRBdXRvcGxheVlvdXR1YmUgPyAnYXV0b3BsYXk7JyA6ICcnO1xuICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2FsbG93JywgYCR7YXV0b3BsYXl9OyBlbmNyeXB0ZWQtbWVkaWFgKTtcblxuICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIHVybFZpZGVvKTtcblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICF0aGlzLnRhcmdldE9wZW4uZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICBgWyR7dGhpcy5vcHRpb25zLnlvdXR1YmVQbGFjZUF0dHJpYnV0ZX1dYFxuICAgICAgICAgICAgKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgY29uc3QgeW91dHViZVBsYWNlID0gdGhpcy50YXJnZXRPcGVuLmVsZW1lbnRcbiAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9fdGV4dCcpXG4gICAgICAgICAgICAgIC5zZXRBdHRyaWJ1dGUoYCR7dGhpcy5vcHRpb25zLnlvdXR1YmVQbGFjZUF0dHJpYnV0ZX1gLCAnJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMudGFyZ2V0T3Blbi5lbGVtZW50XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvcihgWyR7dGhpcy5vcHRpb25zLnlvdXR1YmVQbGFjZUF0dHJpYnV0ZX1dYClcbiAgICAgICAgICAgIC5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaGFzaFNldHRpbmdzLmxvY2F0aW9uKSB7XG4gICAgICAgICAgdGhpcy5fZ2V0SGFzaCgpO1xuICAgICAgICAgIHRoaXMuX3NldEhhc2goKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub3B0aW9ucy5vbi5iZWZvcmVPcGVuKHRoaXMpO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgIG5ldyBDdXN0b21FdmVudCgnYmVmb3JlbW9kYWxPcGVuJywge1xuICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgIG1vZGFsOiB0aGlzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMudGFyZ2V0T3Blbi5lbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5vcHRpb25zLmNsYXNzZXMubW9kYWxBY3RpdmUpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLm9wdGlvbnMuY2xhc3Nlcy5ib2R5QWN0aXZlKTtcblxuICAgICAgICBpZiAoIXRoaXMuX3Jlb3Blbikge1xuICAgICAgICAgIGNvbnN0IG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuaGFzaCk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAoIXRoaXMuYm9keUxvY2sgJiYgIW0uaGFzQXR0cmlidXRlKCdkYXRhLWJsLW1vYmlsZScpKSB8fFxuICAgICAgICAgICAgKCF0aGlzLmJvZHlMb2NrICYmXG4gICAgICAgICAgICAgIHdpbmRvdy5pbm5lcldpZHRoIDw9IDc2OCAmJlxuICAgICAgICAgICAgICBtLmhhc0F0dHJpYnV0ZSgnZGF0YS1ibC1tb2JpbGUnKSlcbiAgICAgICAgICAgICAgPyBib2R5TG9jaygpXG4gICAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfSBlbHNlIHRoaXMuX3Jlb3BlbiA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMudGFyZ2V0T3Blbi5lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuICAgICAgICB0aGlzLnByZXZpb3VzT3Blbi5zZWxlY3RvciA9IHRoaXMudGFyZ2V0T3Blbi5zZWxlY3RvcjtcbiAgICAgICAgdGhpcy5wcmV2aW91c09wZW4uZWxlbWVudCA9IHRoaXMudGFyZ2V0T3Blbi5lbGVtZW50O1xuXG4gICAgICAgIHRoaXMuX3NlbGVjdG9yT3BlbiA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLl9mb2N1c1RyYXAoKTtcbiAgICAgICAgfSwgNTApO1xuXG4gICAgICAgIHRoaXMub3B0aW9ucy5vbi5hZnRlck9wZW4odGhpcyk7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdhZnRlcm1vZGFsT3BlbicsIHtcbiAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICBtb2RhbDogdGhpcyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgY2xvc2Uoc2VsZWN0b3JWYWx1ZSkge1xuICAgIGlmIChcbiAgICAgIHNlbGVjdG9yVmFsdWUgJiZcbiAgICAgIHR5cGVvZiBzZWxlY3RvclZhbHVlID09PSAnc3RyaW5nJyAmJlxuICAgICAgc2VsZWN0b3JWYWx1ZS50cmltKCkgIT09ICcnXG4gICAgKSB7XG4gICAgICB0aGlzLnByZXZpb3VzT3Blbi5zZWxlY3RvciA9IHNlbGVjdG9yVmFsdWU7XG4gICAgfVxuICAgIGlmICghdGhpcy5pc09wZW4gfHwgIWJvZHlMb2NrU3RhdHVzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMub3B0aW9ucy5vbi5iZWZvcmVDbG9zZSh0aGlzKTtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgbmV3IEN1c3RvbUV2ZW50KCdiZWZvcmVtb2RhbENsb3NlJywge1xuICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICBtb2RhbDogdGhpcyxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGlmICh0aGlzLnlvdVR1YmVDb2RlKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMudGFyZ2V0T3Blbi5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYFske3RoaXMub3B0aW9ucy55b3V0dWJlUGxhY2VBdHRyaWJ1dGV9XWBcbiAgICAgICAgKVxuICAgICAgKVxuICAgICAgICB0aGlzLnRhcmdldE9wZW4uZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGBbJHt0aGlzLm9wdGlvbnMueW91dHViZVBsYWNlQXR0cmlidXRlfV1gXG4gICAgICAgICkuaW5uZXJIVE1MID0gJyc7XG4gICAgfVxuICAgIHRoaXMucHJldmlvdXNPcGVuLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcbiAgICAgIHRoaXMub3B0aW9ucy5jbGFzc2VzLm1vZGFsQWN0aXZlXG4gICAgKTtcbiAgICAvLyBhcmlhLWhpZGRlblxuICAgIHRoaXMucHJldmlvdXNPcGVuLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgaWYgKCF0aGlzLl9yZW9wZW4pIHtcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFxuICAgICAgICB0aGlzLm9wdGlvbnMuY2xhc3Nlcy5ib2R5QWN0aXZlXG4gICAgICApO1xuICAgICAgIXRoaXMuYm9keUxvY2sgPyBib2R5VW5sb2NrKCkgOiBudWxsO1xuICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5fcmVtb3ZlSGFzaCgpO1xuICAgIGlmICh0aGlzLl9zZWxlY3Rvck9wZW4pIHtcbiAgICAgIHRoaXMubGFzdENsb3NlZC5zZWxlY3RvciA9IHRoaXMucHJldmlvdXNPcGVuLnNlbGVjdG9yO1xuICAgICAgdGhpcy5sYXN0Q2xvc2VkLmVsZW1lbnQgPSB0aGlzLnByZXZpb3VzT3Blbi5lbGVtZW50O1xuICAgIH1cbiAgICB0aGlzLm9wdGlvbnMub24uYWZ0ZXJDbG9zZSh0aGlzKTtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgbmV3IEN1c3RvbUV2ZW50KCdhZnRlcm1vZGFsQ2xvc2UnLCB7XG4gICAgICAgIGRldGFpbDoge1xuICAgICAgICAgIG1vZGFsOiB0aGlzLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl9mb2N1c1RyYXAoKTtcbiAgICB9LCA1MCk7XG4gIH1cbiAgX2dldEhhc2goKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5oYXNoU2V0dGluZ3MubG9jYXRpb24pIHtcbiAgICAgIHRoaXMuaGFzaCA9IHRoaXMudGFyZ2V0T3Blbi5zZWxlY3Rvci5pbmNsdWRlcygnIycpXG4gICAgICAgID8gdGhpcy50YXJnZXRPcGVuLnNlbGVjdG9yXG4gICAgICAgIDogdGhpcy50YXJnZXRPcGVuLnNlbGVjdG9yLnJlcGxhY2UoJy4nLCAnIycpO1xuICAgIH1cbiAgfVxuICBfb3BlblRvSGFzaCgpIHtcbiAgICBsZXQgY2xhc3NJbkhhc2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYC4ke3dpbmRvdy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJyl9YFxuICAgIClcbiAgICAgID8gYC4ke3dpbmRvdy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJyl9YFxuICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke3dpbmRvdy5sb2NhdGlvbi5oYXNofWApXG4gICAgICA/IGAke3dpbmRvdy5sb2NhdGlvbi5oYXNofWBcbiAgICAgIDogbnVsbDtcblxuICAgIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYFske3RoaXMub3B0aW9ucy5hdHRyaWJ1dGVPcGVuQnV0dG9ufSA9IFwiJHtjbGFzc0luSGFzaH1cIl1gXG4gICAgKVxuICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGBbJHt0aGlzLm9wdGlvbnMuYXR0cmlidXRlT3BlbkJ1dHRvbn0gPSBcIiR7Y2xhc3NJbkhhc2h9XCJdYFxuICAgICAgICApXG4gICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYFske3RoaXMub3B0aW9ucy5hdHRyaWJ1dGVPcGVuQnV0dG9ufSA9IFwiJHtjbGFzc0luSGFzaC5yZXBsYWNlKFxuICAgICAgICAgICAgJy4nLFxuICAgICAgICAgICAgJyMnXG4gICAgICAgICAgKX1cIl1gXG4gICAgICAgICk7XG4gICAgaWYgKGJ1dHRvbnMgJiYgY2xhc3NJbkhhc2gpIHRoaXMub3BlbihjbGFzc0luSGFzaCk7XG4gIH1cbiAgX3NldEhhc2goKSB7XG4gICAgaGlzdG9yeS5wdXNoU3RhdGUoJycsICcnLCB0aGlzLmhhc2gpO1xuICB9XG4gIF9yZW1vdmVIYXNoKCkge1xuICAgIGhpc3RvcnkucHVzaFN0YXRlKCcnLCAnJywgd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJyMnKVswXSk7XG4gIH1cbiAgX2ZvY3VzQ2F0Y2goZSkge1xuICAgIGNvbnN0IGZvY3VzYWJsZSA9IHRoaXMudGFyZ2V0T3Blbi5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fZm9jdXNFbCk7XG4gICAgY29uc3QgZm9jdXNBcnJheSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZvY3VzYWJsZSk7XG4gICAgY29uc3QgZm9jdXNlZEluZGV4ID0gZm9jdXNBcnJheS5pbmRleE9mKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuXG4gICAgaWYgKGUuc2hpZnRLZXkgJiYgZm9jdXNlZEluZGV4ID09PSAwKSB7XG4gICAgICBmb2N1c0FycmF5W2ZvY3VzQXJyYXkubGVuZ3RoIC0gMV0uZm9jdXMoKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgaWYgKCFlLnNoaWZ0S2V5ICYmIGZvY3VzZWRJbmRleCA9PT0gZm9jdXNBcnJheS5sZW5ndGggLSAxKSB7XG4gICAgICBmb2N1c0FycmF5WzBdLmZvY3VzKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG4gIF9mb2N1c1RyYXAoKSB7XG4gICAgY29uc3QgZm9jdXNhYmxlID0gdGhpcy5wcmV2aW91c09wZW4uZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX2ZvY3VzRWwpO1xuICAgIGlmICghdGhpcy5pc09wZW4gJiYgdGhpcy5sYXN0Rm9jdXNFbCkge1xuICAgICAgdGhpcy5sYXN0Rm9jdXNFbC5mb2N1cygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb2N1c2FibGVbMF0uZm9jdXMoKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlcy5tb2RhbCA9IG5ldyBNb2RhbCh7fSk7XG4iLCJpbXBvcnQgU2ltcGxlQmFyIGZyb20gJ3NpbXBsZWJhcic7XG5pbXBvcnQgJ3NpbXBsZWJhci9kaXN0L3NpbXBsZWJhci5jc3MnO1xuaW1wb3J0IHsgX3NsaWRlVXAsIF9zbGlkZURvd24sIF9zbGlkZVRvZ2dsZSB9IGZyb20gJy4vdXRpbHMuanMnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnQgY2xhc3MgU2VsZWN0IHtcbiAgLy8gc2V0dXAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fdGhpcyA9IHRoaXM7XG5cbiAgICAvLyBjdXN0b20gc2VsZWN0IGNsYXNzZXNcbiAgICB0aGlzLmNsYXNzZXMgPSB7XG4gICAgICAvLyBodG1sIGJ1aWxkIGNsYXNzZXNcbiAgICAgIFNFTEVDVDogJ3NlbGVjdCcsXG4gICAgICBCT0RZOiAnc2VsZWN0X19ib2R5JyxcbiAgICAgIExBQkVMOiAnc2VsZWN0X19sYWJlbCcsXG4gICAgICBUSVRMRTogJ3NlbGVjdF9fdGl0bGUnLFxuICAgICAgVkFMVUU6ICdzZWxlY3RfX3ZhbHVlJyxcbiAgICAgIENPTlRFTlQ6ICdzZWxlY3RfX2NvbnRlbnQnLFxuICAgICAgT1BUSU9OUzogJ3NlbGVjdF9fb3B0aW9ucycsXG4gICAgICBPUFRJT046ICdzZWxlY3RfX29wdGlvbicsXG4gICAgICBTQ1JPTEw6ICdzZWxlY3RfX3Njcm9sbCcsXG4gICAgICBHUk9VUDogJ3NlbGVjdF9fZ3JvdXAnLFxuICAgICAgSU5QVVQ6ICdzZWxlY3RfX2lucHV0JyxcbiAgICAgIEFTU0VUOiAnc2VsZWN0X19hc3NldCcsXG4gICAgICBUWFQ6ICdzZWxlY3RfX3RleHQnLFxuXG4gICAgICAvLyBzdGF0ZSBjbGFzc2VzXG4gICAgICBJU19BQ1RJVkU6ICdfaXMtYWN0aXZlJyxcbiAgICAgIElTX0ZPQ1VTRUQ6ICdfaXMtZm9jdXNlZCcsXG4gICAgICBJU19PUEVORUQ6ICdfaXMtb3BlbmVkJyxcbiAgICAgIElTX0ZJTExFRDogJ19pcy1maWxsZWQnLFxuICAgICAgSVNfU0VMRUNURUQ6ICdfaXMtc2VsZWN0ZWQnLFxuICAgICAgSVNfRElTQUJMRUQ6ICdfaXMtZGlzYWJsZWQnLFxuXG4gICAgICAvLyBhZGRpdGlvbmFsIGNsYXNzZXNcbiAgICAgIEhBU19MSVNUOiAnX2hhcy1saXN0JyxcbiAgICAgIEhBU19FUlJPUjogJ19oYXMtZXJyb3InLFxuICAgICAgSEFTX01VTFRJUExFOiAnX2hhcy1tdWx0aXBsZScsXG4gICAgICBIQVNfQ0hFQ0tCT1g6ICdfaGFzLWNoZWNrYm94JyxcbiAgICAgIEhBU19MQUJFTDogJ19oYXMtbGFiZWwnLFxuICAgIH07XG5cbiAgICAvLyBhbGwgc2VsZWN0IGl0ZW1zXG4gICAgY29uc3Qgc2VsZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlbGVjdCcpO1xuICAgIGlmIChzZWxlY3RMaXN0Lmxlbmd0aCkge1xuICAgICAgdGhpcy5pbml0KHNlbGVjdExpc3QpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHNlbGVjdCBpbml0aWFsaXphdGlvbiAmIGJ1aWxkIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIGluaXRpYWxpemF0aW9uXG4gIGluaXQoc2VsZWN0TGlzdCkge1xuICAgIC8vIGluaXRcbiAgICBzZWxlY3RMaXN0LmZvckVhY2goKHNlbGVjdCwgaW5kZXgpID0+IHtcbiAgICAgIHRoaXMuaW5pdFNlbEl0ZW0oc2VsZWN0LCBpbmRleCArIDEpO1xuICAgIH0pO1xuXG4gICAgLy8gZXZlbnRzXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdjbGljaycsXG4gICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGlzLnNldEFjdGlvbnMoZSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAna2V5ZG93bicsXG4gICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGlzLnNldEFjdGlvbnMoZSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnZm9jdXNpbicsXG4gICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGlzLnNldEFjdGlvbnMoZSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnZm9jdXNvdXQnLFxuICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdGhpcy5zZXRBY3Rpb25zKGUpO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgKTtcbiAgfVxuICAvLyBzaW5nbGUgc2VsZWN0IGl0ZW0gaW5pdGlhbGl6YXRpb25cbiAgaW5pdFNlbEl0ZW0ocmVsYXRpdmVTZWwsIGluZGV4KSB7XG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgc2VsZWN0LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLlNFTEVDVCk7XG4gICAgcmVsYXRpdmVTZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc2VsZWN0LCByZWxhdGl2ZVNlbCk7XG4gICAgc2VsZWN0LmFwcGVuZENoaWxkKHJlbGF0aXZlU2VsKTtcbiAgICByZWxhdGl2ZVNlbC5oaWRkZW4gPSB0cnVlO1xuICAgIGluZGV4ID8gKHJlbGF0aXZlU2VsLmRhdGFzZXQuc2VsSWQgPSBpbmRleCkgOiBudWxsO1xuXG4gICAgaWYgKHRoaXMuZ2V0UGxhY2Vob2xkZXIocmVsYXRpdmVTZWwpKSB7XG4gICAgICByZWxhdGl2ZVNlbC5kYXRhc2V0Lm9wdFBsYWNlaG9sZGVyID1cbiAgICAgICAgdGhpcy5nZXRQbGFjZWhvbGRlcihyZWxhdGl2ZVNlbCkudmFsdWU7XG4gICAgICBpZiAodGhpcy5nZXRQbGFjZWhvbGRlcihyZWxhdGl2ZVNlbCkubGFiZWwuc2hvdykge1xuICAgICAgICBjb25zdCBzZWxUaXRsZSA9IHRoaXMuZ2V0U2VsZWN0KHNlbGVjdCwgdGhpcy5jbGFzc2VzLlRJVExFKS50d2luU2VsO1xuICAgICAgICBzZWxUaXRsZS5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAgICAgJ2FmdGVyYmVnaW4nLFxuICAgICAgICAgIGA8c3BhbiBjbGFzcz1cIiR7dGhpcy5jbGFzc2VzLkxBQkVMfVwiPiR7XG4gICAgICAgICAgICB0aGlzLmdldFBsYWNlaG9sZGVyKHJlbGF0aXZlU2VsKS5sYWJlbC50ZXh0XG4gICAgICAgICAgICAgID8gdGhpcy5nZXRQbGFjZWhvbGRlcihyZWxhdGl2ZVNlbCkubGFiZWwudGV4dFxuICAgICAgICAgICAgICA6IHRoaXMuZ2V0UGxhY2Vob2xkZXIocmVsYXRpdmVTZWwpLnZhbHVlXG4gICAgICAgICAgfTwvc3Bhbj5gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIHNlbGVjdC5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAnYmVmb3JlZW5kJyxcbiAgICAgIGA8ZGl2IGNsYXNzPVwiJHt0aGlzLmNsYXNzZXMuQk9EWX1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAke1xuICAgICAgICAgICAgICAgICAgICAgICFyZWxhdGl2ZVNlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbm8tc2xpZGUnKSA/ICdoaWRkZW4nIDogJydcbiAgICAgICAgICAgICAgICAgICAgfSAgY2xhc3M9XCIke3RoaXMuY2xhc3Nlcy5PUFRJT05TfVwiPlxuXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PmBcbiAgICApO1xuXG4gICAgdGhpcy5idWlsZChyZWxhdGl2ZVNlbCk7XG5cbiAgICByZWxhdGl2ZVNlbC5kYXRhc2V0LnNwZWVkID0gcmVsYXRpdmVTZWwuZGF0YXNldC5zcGVlZFxuICAgICAgPyByZWxhdGl2ZVNlbC5kYXRhc2V0LnNwZWVkXG4gICAgICA6ICcxNTAnO1xuICAgIHJlbGF0aXZlU2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBfdGhpcy5pbml0U2VsZWN0aW9ucyhlKTtcbiAgICB9KTtcbiAgfVxuICAvLyBzZWxlY3QgYnVpbGRcbiAgYnVpbGQocmVsYXRpdmVTZWwpIHtcbiAgICBjb25zdCBzZWxlY3QgPSByZWxhdGl2ZVNlbC5wYXJlbnRFbGVtZW50O1xuXG4gICAgLy8gc2V0IGlkXG4gICAgc2VsZWN0LmRhdGFzZXQuc2VsSWQgPSByZWxhdGl2ZVNlbC5kYXRhc2V0LnNlbElkO1xuICAgIC8vIHNldCB2YWx1ZVxuICAgIHRoaXMuc2V0VmFsdWUoc2VsZWN0LCByZWxhdGl2ZVNlbCk7XG4gICAgLy8gc2V0IG9wdGlvbnNcbiAgICB0aGlzLnNldE9wdGlvbnMoc2VsZWN0LCByZWxhdGl2ZVNlbCk7XG4gICAgLy8gc2V0IGNzcyBtb2RpZmljYXRvclxuICAgIHJlbGF0aXZlU2VsLmRhdGFzZXQuc2VsQWRkb25DbGFzc1xuICAgICAgPyBzZWxlY3QuY2xhc3NMaXN0LmFkZChgc2VsZWN0XyR7cmVsYXRpdmVTZWwuZGF0YXNldC5zZWxBZGRvbkNsYXNzfWApXG4gICAgICA6IG51bGw7XG4gICAgLy8gc2V0IGNsYXNzIGlmIHNlbGVjdCBpcyBtdWx0aXBsZVxuICAgIHJlbGF0aXZlU2VsLm11bHRpcGxlXG4gICAgICA/IHNlbGVjdC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5IQVNfTVVMVElQTEUpXG4gICAgICA6IHNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5IQVNfTVVMVElQTEUpO1xuICAgIC8vIHNldCBjbGFzcyBpZiBzZWxlY3QgY2hlY2tib3hlcyBhcmUgc2V0XG4gICAgcmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNlbC1jaGVja2JveGVzJykgJiYgcmVsYXRpdmVTZWwubXVsdGlwbGVcbiAgICAgID8gc2VsZWN0LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLkhBU19DSEVDS0JPWClcbiAgICAgIDogc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLkhBU19DSEVDS0JPWCk7XG4gICAgLy8gZGlzYWJsZSBzZWxlY3RcbiAgICB0aGlzLmRpc2FibGVTZWxlY3Qoc2VsZWN0LCByZWxhdGl2ZVNlbCk7XG4gICAgLy8gc2V0IHNlYXJjaCBhY3Rpb25zIGlmIGRhdGEtc2VsLXNlYXJjaCBpcyBzZXRcbiAgICByZWxhdGl2ZVNlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtc2VsLXNlYXJjaCcpXG4gICAgICA/IHRoaXMuc2V0U2VhcmNoQWN0aW9ucyhzZWxlY3QpXG4gICAgICA6IG51bGw7XG4gICAgLy8gc2V0IHNlbGVjdCBhY3Rpb25zIGlmIGl0J3MgaW5pdGlhbGx5IG9wZW5lZFxuICAgIHJlbGF0aXZlU2VsLmhhc0F0dHJpYnV0ZSgnZGF0YS1zZWwtb3BlbmVkJykgPyB0aGlzLnNldEFjdGlvbihzZWxlY3QpIDogbnVsbDtcblxuICAgIC8vIHNldCBzZWxlY3QgaGludFxuICAgIGlmIChyZWxhdGl2ZVNlbC5kYXRhc2V0LnNlbEhpbnQpIHtcbiAgICAgIHJlbGF0aXZlU2VsLnBhcmVudEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgICAnYmVmb3JlZW5kJyxcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJzZWxlY3RfX2hpbnRcIj4ke3JlbGF0aXZlU2VsLmRhdGFzZXQuc2VsSGludH08L2Rpdj5gXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIHNob3cgLyBoaWRlIHNlbGVjdGlvbiBmcm9tIHNlbGVjdCB0aXRsZVxuICAgIGlmIChyZWxhdGl2ZVNlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtc2hvdy12YWwnKSkge1xuICAgICAgc2VsZWN0LmNsYXNzTGlzdC5hZGQoJ19zZWxlY3Qtc2hvdy12YWwnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ19zZWxlY3Qtc2hvdy12YWwnKTtcbiAgICB9XG4gIH1cbiAgLy8gc2V0IHR3aW4gc2VsZWN0IHRpdGxlIHZhbHVlXG4gIHNldFZhbHVlKHNlbGVjdCwgcmVsYXRpdmVTZWwpIHtcbiAgICBjb25zdCBzZWxCb2R5ID0gdGhpcy5nZXRTZWxlY3Qoc2VsZWN0LCB0aGlzLmNsYXNzZXMuQk9EWSkudHdpblNlbDtcbiAgICBjb25zdCBzZWxUaXRsZSA9IHRoaXMuZ2V0U2VsZWN0KHNlbGVjdCwgdGhpcy5jbGFzc2VzLlRJVExFKS50d2luU2VsO1xuXG4gICAgaWYgKHNlbFRpdGxlKSBzZWxUaXRsZS5yZW1vdmUoKTtcbiAgICBzZWxCb2R5Lmluc2VydEFkamFjZW50SFRNTChcbiAgICAgICdhZnRlcmJlZ2luJyxcbiAgICAgIHRoaXMuZ2V0VmFsdWUoc2VsZWN0LCByZWxhdGl2ZVNlbClcbiAgICApO1xuICB9XG4gIC8vIHNldCB0d2luIHNlbGVjdCBvcHRpb25zXG4gIHNldE9wdGlvbnMoc2VsZWN0LCByZWxhdGl2ZVNlbCkge1xuICAgIGNvbnN0IF90aGlzID0gdGhpcztcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5nZXRTZWxlY3Qoc2VsZWN0LCB0aGlzLmNsYXNzZXMuT1BUSU9OUykudHdpblNlbDtcbiAgICBjb25zdCByZWxhdGl2ZVNlbE9wdGlvbnMgPSB0aGlzLmdldFNlbGVjdChcbiAgICAgIHNlbGVjdCxcbiAgICAgIHRoaXMuY2xhc3Nlcy5PUFRJT05TXG4gICAgKS5yZWxhdGl2ZVNlbDtcbiAgICBvcHRpb25zLmlubmVySFRNTCA9IHRoaXMuZ2V0T3B0aW9ucyhyZWxhdGl2ZVNlbCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmdldE9wdGlvbnMocmVsYXRpdmVTZWwpO1xuICAgIH0pO1xuICAgIGlmIChyZWxhdGl2ZVNlbE9wdGlvbnMucXVlcnlTZWxlY3RvcignW3NlbGVjdGVkXScpKSB7XG4gICAgICBvcHRpb25zXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKGAuJHt0aGlzLmNsYXNzZXMuT1BUSU9OfWApXG4gICAgICAgIC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5JU19TRUxFQ1RFRCk7XG4gICAgfVxuICB9XG4gIC8vIGRpc2FibGUgc2VsZWN0XG4gIGRpc2FibGVTZWxlY3Qoc2VsZWN0LCByZWxhdGl2ZVNlbCkge1xuICAgIGlmIChyZWxhdGl2ZVNlbC5kaXNhYmxlZCkge1xuICAgICAgc2VsZWN0LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLklTX0RJU0FCTEVEKTtcbiAgICAgIHRoaXMuZ2V0U2VsZWN0KHNlbGVjdCwgdGhpcy5jbGFzc2VzLlRJVExFKS50d2luU2VsLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLklTX0RJU0FCTEVEKTtcbiAgICAgIHRoaXMuZ2V0U2VsZWN0KHNlbGVjdCwgdGhpcy5jbGFzc2VzLlRJVExFKS50d2luU2VsLmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLy8gbWFpbiBhY3Rpb25zIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gc2V0IG1haW4gYWN0aW9uc1xuICBzZXRBY3Rpb25zKGUpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBjb25zdCB0eXBlID0gZS50eXBlO1xuXG4gICAgaWYgKFxuICAgICAgdGFyZ2V0LmNsb3Nlc3QodGhpcy5nZXRDbGFzcyh0aGlzLmNsYXNzZXMuU0VMRUNUKSkgfHxcbiAgICAgIHRhcmdldC5jbG9zZXN0KHRoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLkhBU19MSVNUKSlcbiAgICApIHtcbiAgICAgIGNvbnN0IHNlbGVjdCA9IHRhcmdldC5jbG9zZXN0KCcuc2VsZWN0JylcbiAgICAgICAgPyB0YXJnZXQuY2xvc2VzdCgnLnNlbGVjdCcpXG4gICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGAuJHt0aGlzLmNsYXNzZXMuc2VsfVtkYXRhLXNlbC1pZD1cIiR7XG4gICAgICAgICAgICAgIHRhcmdldC5jbG9zZXN0KHRoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLkhBU19MSVNUKSkuZGF0YXNldFxuICAgICAgICAgICAgICAgIC5zZWxlY3RJZFxuICAgICAgICAgICAgfVwiXWBcbiAgICAgICAgICApO1xuICAgICAgY29uc3QgcmVsYXRpdmVTZWwgPSB0aGlzLmdldFNlbGVjdChzZWxlY3QpLnJlbGF0aXZlU2VsO1xuICAgICAgaWYgKHR5cGUgPT09ICdjbGljaycpIHtcbiAgICAgICAgaWYgKCFyZWxhdGl2ZVNlbC5kaXNhYmxlZCkge1xuICAgICAgICAgIGlmICh0YXJnZXQuY2xvc2VzdCh0aGlzLmdldENsYXNzKHRoaXMuY2xhc3Nlcy5IQVNfTElTVCkpKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxMaXN0ID0gdGFyZ2V0LmNsb3Nlc3QoXG4gICAgICAgICAgICAgIHRoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLkhBU19MSVNUKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IHNlbE9wdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgIGAuJHt0aGlzLmNsYXNzZXMuU0VMRUNUfVtkYXRhLXNlbC1pZD1cIiR7c2VsTGlzdC5kYXRhc2V0LnNlbElkfVwiXSAuc2VsZWN0X19vcHRpb25bZGF0YS1vcHQtdmFsPVwiJHtzZWxMaXN0LmRhdGFzZXQub3B0VmFsfVwiXWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbkFjdGlvbihzZWxlY3QsIHJlbGF0aXZlU2VsLCBzZWxPcHRpb24pO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsb3Nlc3QodGhpcy5nZXRDbGFzcyh0aGlzLmNsYXNzZXMuVElUTEUpKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRBY3Rpb24oc2VsZWN0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbG9zZXN0KHRoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLk9QVElPTikpKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxPcHRpb24gPSB0YXJnZXQuY2xvc2VzdChcbiAgICAgICAgICAgICAgdGhpcy5nZXRDbGFzcyh0aGlzLmNsYXNzZXMuT1BUSU9OKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9uQWN0aW9uKHNlbGVjdCwgcmVsYXRpdmVTZWwsIHNlbE9wdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdmb2N1c2luJyB8fCB0eXBlID09PSAnZm9jdXNvdXQnKSB7XG4gICAgICAgIGlmICh0YXJnZXQuY2xvc2VzdCh0aGlzLmdldENsYXNzKHRoaXMuY2xhc3Nlcy5TRUxFQ1QpKSkge1xuICAgICAgICAgIGlmICh0eXBlID09PSAnZm9jdXNpbicpIHtcbiAgICAgICAgICAgIHNlbGVjdC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5JU19GT0NVU0VEKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLklTX0ZPQ1VTRUQpO1xuICAgICAgICAgICAgaWYgKHJlbGF0aXZlU2VsLmhhc0F0dHJpYnV0ZSgnZGF0YS12YWxpZGF0ZScpKSB7XG4gICAgICAgICAgICAgIGlmICghc2VsZWN0LmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmNsYXNzZXMuSVNfRklMTEVEKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyKHJlbGF0aXZlU2VsLCBzZWxlY3QpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRXJyKHJlbGF0aXZlU2VsLCBzZWxlY3QpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdrZXlkb3duJyAmJiBlLmNvZGUgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgIHRoaXMuY2xvc2VHcm91cCgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsb3NlR3JvdXAoKTtcbiAgICB9XG4gIH1cbiAgLy8gc2V0IHNpbmdsZSBzZWxlY3QgYWN0aW9uXG4gIHNldEFjdGlvbihzZWxlY3QpIHtcbiAgICBjb25zdCByZWxhdGl2ZVNlbCA9IHRoaXMuZ2V0U2VsZWN0KHNlbGVjdCkucmVsYXRpdmVTZWw7XG4gICAgY29uc3Qgc2VsT3B0aW9ucyA9IHRoaXMuZ2V0U2VsZWN0KHNlbGVjdCwgdGhpcy5jbGFzc2VzLk9QVElPTlMpLnR3aW5TZWw7XG5cbiAgICBpZiAocmVsYXRpdmVTZWwuY2xvc2VzdCgnW2RhdGEtc2VsZWN0LXNpbmdsZV0nKSkge1xuICAgICAgY29uc3Qgc2VsZWN0T25lR3JvdXAgPSByZWxhdGl2ZVNlbC5jbG9zZXN0KCdbZGF0YS1zZWxlY3Qtc2luZ2xlXScpO1xuICAgICAgdGhpcy5jbG9zZUdyb3VwKHNlbGVjdE9uZUdyb3VwLCByZWxhdGl2ZVNlbCk7XG4gICAgfVxuXG4gICAgaWYgKCFzZWxPcHRpb25zLmNsYXNzTGlzdC5jb250YWlucygnX3NsaWRlJykpIHtcbiAgICAgIHNlbGVjdC5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuY2xhc3Nlcy5JU19PUEVORUQpO1xuICAgICAgaWYgKCFyZWxhdGl2ZVNlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbm8tc2xpZGUnKSlcbiAgICAgICAgX3NsaWRlVG9nZ2xlKHNlbE9wdGlvbnMsIHJlbGF0aXZlU2VsLmRhdGFzZXQuc3BlZWQpO1xuICAgICAgaWYgKFxuICAgICAgICBzZWxlY3QuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuY2xhc3Nlcy5JU19PUEVORUQpICYmXG4gICAgICAgIHJlbGF0aXZlU2VsLmhhc0F0dHJpYnV0ZSgnZGF0YS12YWxpZGF0ZScpICYmXG4gICAgICAgIHNlbGVjdC5jbGFzc0xpc3QuY29udGFpbnModGhpcy5jbGFzc2VzLkhBU19FUlJPUilcbiAgICAgICkge1xuICAgICAgICB0aGlzLnJlbW92ZUVycihyZWxhdGl2ZVNlbCwgc2VsZWN0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy8gY2xvc2Ugc2luZ2xlIHNlbGVjdCBncm91cFxuICBjbG9zZUdyb3VwKGdyb3VwLCBzZWxlY3QpIHtcbiAgICBjb25zdCBzZWxHcm91cCA9IGdyb3VwID8gZ3JvdXAgOiBkb2N1bWVudDtcbiAgICBjb25zdCBzZWxlY3Rpb25zID0gc2VsR3JvdXAucXVlcnlTZWxlY3RvckFsbChcbiAgICAgIGAke3RoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLlNFTEVDVCl9JHt0aGlzLmdldENsYXNzKFxuICAgICAgICB0aGlzLmNsYXNzZXMuSVNfT1BFTkVEXG4gICAgICApfWBcbiAgICApO1xuICAgIGlmIChzZWxlY3Rpb25zLmxlbmd0aCkge1xuICAgICAgc2VsZWN0aW9ucy5mb3JFYWNoKHNlbGVjdGlvbiA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhc2VsZWN0IHx8XG4gICAgICAgICAgKHNlbGVjdCAmJiBzZWxlY3Rpb24uZGF0YXNldC5zZWxJZCAhPT0gc2VsZWN0LmRhdGFzZXQuc2VsSWQpXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2xvc2VJdGVtKHNlbGVjdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICAvLyBjbG9zZSBzaW5nbGUgc2VsZWN0IGl0ZW1cbiAgY2xvc2VJdGVtKHNlbGVjdCkge1xuICAgIGNvbnN0IHJlbGF0aXZlU2VsID0gdGhpcy5nZXRTZWxlY3Qoc2VsZWN0KS5yZWxhdGl2ZVNlbDtcbiAgICBjb25zdCBzZWxPcHRpb25zID0gdGhpcy5nZXRTZWxlY3Qoc2VsZWN0LCB0aGlzLmNsYXNzZXMuT1BUSU9OUykudHdpblNlbDtcblxuICAgIGlmICghc2VsT3B0aW9ucy5jbGFzc0xpc3QuY29udGFpbnMoJ19zbGlkZScpKSB7XG4gICAgICBzZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSVNfT1BFTkVEKTtcbiAgICAgIGlmICghcmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLW5vLXNsaWRlJykpXG4gICAgICAgIF9zbGlkZVVwKHNlbE9wdGlvbnMsIHJlbGF0aXZlU2VsLmRhdGFzZXQuc3BlZWQpO1xuICAgIH1cbiAgfVxuICAvLyBzZXQgc2luZ2xlIG9wdGlvbiBhY3Rpb25zXG4gIHNldE9wdGlvbkFjdGlvbihzZWxlY3QsIHJlbGF0aXZlU2VsLCBvcHRpb24pIHtcbiAgICBpZiAocmVsYXRpdmVTZWwubXVsdGlwbGUpIHtcbiAgICAgIG9wdGlvbi5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuY2xhc3Nlcy5JU19TRUxFQ1RFRCk7XG4gICAgICBjb25zdCByZWxhdGl2ZVNlbGVjdGlvbnMgPSB0aGlzLmdldERhdGEocmVsYXRpdmVTZWwpLmVsZW1lbnRzO1xuXG4gICAgICByZWxhdGl2ZVNlbGVjdGlvbnMuZm9yRWFjaChyZWxhdGl2ZVNlbGVjdGlvbiA9PiB7XG4gICAgICAgIHJlbGF0aXZlU2VsZWN0aW9uLnJlbW92ZUF0dHJpYnV0ZSgnc2VsZWN0ZWQnKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCB0d2luU2VsZWN0aW9ucyA9IHNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICB0aGlzLmdldENsYXNzKHRoaXMuY2xhc3Nlcy5JU19TRUxFQ1RFRClcbiAgICAgICk7XG4gICAgICB0d2luU2VsZWN0aW9ucy5mb3JFYWNoKHR3aW5TZWxlY3Rpb24gPT4ge1xuICAgICAgICByZWxhdGl2ZVNlbFxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGBvcHRpb25bdmFsdWU9XCIke3R3aW5TZWxlY3Rpb24uZGF0YXNldC5vcHRWYWx9XCJdYClcbiAgICAgICAgICAuc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICdzZWxlY3RlZCcpO1xuICAgICAgfSk7XG4gICAgICBpZiAoIW9wdGlvbi5jbGFzc0xpc3QuY29udGFpbnModGhpcy5jbGFzc2VzLklTX1NFTEVDVEVEKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICByZWxhdGl2ZVNlbC5xdWVyeVNlbGVjdG9yKGBvcHRpb25bdmFsdWU9XCIke29wdGlvbi5kYXRhc2V0Lm9wdFZhbH1cIl1gKVxuICAgICAgICApO1xuICAgICAgICByZWxhdGl2ZVNlbFxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGBvcHRpb25bdmFsdWU9XCIke29wdGlvbi5kYXRhc2V0Lm9wdFZhbH1cIl1gKVxuICAgICAgICAgIC5yZW1vdmVBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGVjdFxuICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnLnNlbGVjdF9fb3B0aW9uJylcbiAgICAgICAgLmZvckVhY2gob3B0ID0+IG9wdC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5JU19TRUxFQ1RFRCkpO1xuICAgICAgb3B0aW9uLmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLklTX1NFTEVDVEVEKTtcbiAgICAgIGlmICghcmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNob3ctc2VsZWN0aW9uJykpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHNlbGVjdC5xdWVyeVNlbGVjdG9yKGAke3RoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLk9QVElPTil9W2hpZGRlbl1gKVxuICAgICAgICApIHtcbiAgICAgICAgICBzZWxlY3QucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGAke3RoaXMuZ2V0Q2xhc3ModGhpcy5jbGFzc2VzLk9QVElPTil9W2hpZGRlbl1gXG4gICAgICAgICAgKS5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb24uaGlkZGVuID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJlbGF0aXZlU2VsLnZhbHVlID0gb3B0aW9uLmhhc0F0dHJpYnV0ZSgnZGF0YS1vcHQtdmFsJylcbiAgICAgICAgPyBvcHRpb24uZGF0YXNldC5vcHRWYWxcbiAgICAgICAgOiBvcHRpb24udGV4dENvbnRlbnQ7XG4gICAgICB0aGlzLnNldEFjdGlvbihzZWxlY3QpO1xuICAgIH1cbiAgICB0aGlzLnNldFZhbHVlKHNlbGVjdCwgcmVsYXRpdmVTZWwpO1xuICAgIHRoaXMuc2V0U2VsZWN0aW9ucyhyZWxhdGl2ZVNlbCk7XG4gIH1cbiAgLy8gc2V0IHNlYXJjaCBhY3Rpb25zXG4gIHNldFNlYXJjaEFjdGlvbnMoc2VsZWN0KSB7XG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuICAgIGNvbnN0IHNlbElucHV0ID0gdGhpcy5nZXRTZWxlY3Qoc2VsZWN0LCB0aGlzLmNsYXNzZXMuSU5QVVQpLnR3aW5TZWw7XG4gICAgY29uc3Qgc2VsT3B0aW9ucyA9IHRoaXMuZ2V0U2VsZWN0KFxuICAgICAgc2VsZWN0LFxuICAgICAgdGhpcy5jbGFzc2VzLk9QVElPTlNcbiAgICApLnR3aW5TZWwucXVlcnlTZWxlY3RvckFsbChgLiR7dGhpcy5jbGFzc2VzLk9QVElPTn1gKTtcblxuICAgIHNlbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsT3B0aW9ucy5mb3JFYWNoKHNlbE9wdGlvbiA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzZWxPcHRpb24udGV4dENvbnRlbnRcbiAgICAgICAgICAgIC50b1VwcGVyQ2FzZSgpXG4gICAgICAgICAgICAuaW5kZXhPZihzZWxJbnB1dC52YWx1ZS50b1VwcGVyQ2FzZSgpKSA+PSAwXG4gICAgICAgICkge1xuICAgICAgICAgIHNlbE9wdGlvbi5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWxPcHRpb24uaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzZWxPcHRpb25zLmhpZGRlbiA9PT0gdHJ1ZSA/IF90aGlzLnNldEFjdGlvbihzZWxlY3QpIDogbnVsbDtcbiAgICB9KTtcbiAgfVxuICAvLyBzZXQgc2VsZWN0IHN1YnRpdGxlXG4gIHNldFN1YnRpdGxlKHJlbGF0aXZlU2VsKSB7fVxuXG4gIC8vIHZhbGlkYXRpb24gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIGFkZCBhbiBlcnJvciB0byBhIHNlbGVjdFxuICBhZGRFcnIocmVsYXRpdmVTZWwsIHNlbGVjdCkge1xuICAgIHNlbGVjdC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5IQVNfRVJST1IpO1xuXG4gICAgaWYgKHJlbGF0aXZlU2VsLmRhdGFzZXQuc2VsRXJyb3IgJiYgIXJlbGF0aXZlU2VsLmRhdGFzZXQuc2VsSGludCkge1xuICAgICAgcmVsYXRpdmVTZWwucGFyZW50RWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAgICdiZWZvcmVlbmQnLFxuICAgICAgICBgPGRpdiBjbGFzcz1cInNlbGVjdF9faGludFwiPiR7cmVsYXRpdmVTZWwuZGF0YXNldC5zZWxFcnJvcn08L2Rpdj5gXG4gICAgICApO1xuICAgIH1cbiAgfVxuICAvLyByZW1vdmUgYW4gZXJyb3IgZnJvbSBhIHNlbGVjdFxuICByZW1vdmVFcnIocmVsYXRpdmVTZWwsIHNlbGVjdCkge1xuICAgIGlmIChzZWxlY3QuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuY2xhc3Nlcy5IQVNfRVJST1IpKSB7XG4gICAgICBzZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuSEFTX0VSUk9SKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgcmVsYXRpdmVTZWwucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0X19oaW50JykgJiZcbiAgICAgICFyZWxhdGl2ZVNlbC5kYXRhc2V0LnNlbEhpbnRcbiAgICApIHtcbiAgICAgIHJlbGF0aXZlU2VsLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoXG4gICAgICAgIHJlbGF0aXZlU2VsLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdF9faGludCcpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8vIHV0aWxzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIGdldCBjdXN0b20gY2xhc3NcbiAgZ2V0Q2xhc3MoY3NzQ2xhc3MpIHtcbiAgICByZXR1cm4gYC4ke2Nzc0NsYXNzfWA7XG4gIH1cbiAgLy8gZ2V0IHNpbmdsZSBzZWxlY3QgaXRlbVxuICBnZXRTZWxlY3Qoc2VsZWN0LCBjc3NDbGFzcykge1xuICAgIHJldHVybiB7XG4gICAgICByZWxhdGl2ZVNlbDogc2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdCcpLFxuICAgICAgdHdpblNlbDogc2VsZWN0LnF1ZXJ5U2VsZWN0b3IodGhpcy5nZXRDbGFzcyhjc3NDbGFzcykpLFxuICAgIH07XG4gIH1cbiAgLy8gZ2V0IHNlbGVjdGVkIGl0ZW0gdmFsdWVcbiAgZ2V0VmFsdWUoc2VsZWN0LCByZWxhdGl2ZVNlbCkge1xuICAgIGxldCBhdHRyLFxuICAgICAgYXR0ckNsYXNzLFxuICAgICAgdGl0bGVWYWwgPSB0aGlzLmdldERhdGEocmVsYXRpdmVTZWwsIDIpLmh0bWw7XG5cbiAgICAvLyBzZXQgdGl0bGUgdmFsdWVcbiAgICB0aXRsZVZhbCA9IHRpdGxlVmFsLmxlbmd0aFxuICAgICAgPyB0aXRsZVZhbFxuICAgICAgOiByZWxhdGl2ZVNlbC5kYXRhc2V0LnNlbExhYmVsXG4gICAgICA/IHJlbGF0aXZlU2VsLmRhdGFzZXQuc2VsTGFiZWxcbiAgICAgIDogJyc7XG5cbiAgICAvLyBzZXQgYWN0aXZlIGNsYXNzIHRvIHNlbGVjdCBpZiBpdCBjb250YWlucyBhbnkgdmFsdWVzXG4gICAgaWYgKHRoaXMuZ2V0RGF0YShyZWxhdGl2ZVNlbCkudmFsdWVzLmxlbmd0aCkge1xuICAgICAgc2VsZWN0LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc2VzLklTX0FDVElWRSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5JU19BQ1RJVkUpO1xuICAgIH1cblxuICAgIC8vIHNldCBzZWxlY3QgbGFiZWxcbiAgICBpZiAocmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNlbC1sYWJlbCcpKSB7XG4gICAgICBhdHRyID0gcmVsYXRpdmVTZWwuZGF0YXNldC5zZWxMYWJlbFxuICAgICAgICA/IGAgZGF0YS1zZWwtbGFiZWw9XCIke3JlbGF0aXZlU2VsLmRhdGFzZXQuc2VsTGFiZWx9XCJgXG4gICAgICAgIDogYCBkYXRhLXNlbC1sYWJlbD1cItCS0YvQsdC+0YBcImA7XG4gICAgICBhdHRyQ2xhc3MgPSBgICR7dGhpcy5jbGFzc2VzLkhBU19MQUJFTH1gO1xuICAgIH1cblxuICAgIC8vIHB1c2ggc2VsZWN0aW9ucyB0byB0aGUgbGlzdCBpbnNpZGUgb2Ygc2VsZWN0IHRpdGxlXG4gICAgaWYgKHJlbGF0aXZlU2VsLm11bHRpcGxlICYmIHJlbGF0aXZlU2VsLmhhc0F0dHJpYnV0ZSgnZGF0YS1zZWwtbGlzdCcpKSB7XG4gICAgICB0aXRsZVZhbCA9IHRoaXMuZ2V0RGF0YShyZWxhdGl2ZVNlbClcbiAgICAgICAgLmVsZW1lbnRzLm1hcChcbiAgICAgICAgICBvcHRpb24gPT5cbiAgICAgICAgICAgIGA8c3BhbiBkYXRhLW9wdC1pZD1cIiR7c2VsZWN0LmRhdGFzZXQuc2VsSWR9XCIgZGF0YS1vcHQtdmFsPVwiJHtcbiAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlXG4gICAgICAgICAgICB9XCIgY2xhc3M9XCJfbGlzdC1pdGVtXCI+JHt0aGlzLmdldENvbnRlbnQob3B0aW9uKX08L3NwYW4+YFxuICAgICAgICApXG4gICAgICAgIC5qb2luKCcnKTtcblxuICAgICAgaWYgKFxuICAgICAgICByZWxhdGl2ZVNlbC5kYXRhc2V0Lmxpc3QgJiZcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihyZWxhdGl2ZVNlbC5kYXRhc2V0Lmxpc3QpXG4gICAgICApIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihyZWxhdGl2ZVNlbC5kYXRhc2V0Lmxpc3QpLmlubmVySFRNTCA9IHRpdGxlVmFsO1xuICAgICAgICBpZiAocmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNlbC1zZWFyY2gnKSkgdGl0bGVWYWwgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpbml0IHNlbGVjdCBzZWFyY2hcbiAgICBpZiAocmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNlbC1zZWFyY2gnKSkge1xuICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiJHt0aGlzLmNsYXNzZXMuVElUTEV9XCI+PHNwYW4gJHthdHRyfSBjbGFzcz1cIiR7dGhpcy5jbGFzc2VzLlZBTFVFVUV9XCI+PGlucHV0IGF1dG9jb21wbGV0ZT1cIm9mZlwiIHR5cGU9XCJzZWFyY2hcIiBwbGFjZWhvbGRlcj1cIiR7dGl0bGVWYWx9XCIgZGF0YS1wbGFjZWhvbGRlcj1cIiR7dGl0bGVWYWx9XCIgY2xhc3M9XCIke3RoaXMuY2xhc3Nlcy5JTlBVVH1cIj48L3NwYW4+PC9kaXY+YDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY3VzdG9tQ2xhc3MgPVxuICAgICAgICB0aGlzLmdldERhdGEocmVsYXRpdmVTZWwpLmVsZW1lbnRzLmxlbmd0aCAmJlxuICAgICAgICB0aGlzLmdldERhdGEocmVsYXRpdmVTZWwpLmVsZW1lbnRzWzBdLmRhdGFzZXQub3B0Q2xhc3NcbiAgICAgICAgICA/IGAgJHt0aGlzLmdldERhdGEocmVsYXRpdmVTZWwpLmVsZW1lbnRzWzBdLmRhdGFzZXQub3B0Q2xhc3N9YFxuICAgICAgICAgIDogJyc7XG4gICAgICByZXR1cm4gYDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiJHt0aGlzLmNsYXNzZXMuVElUTEV9XCI+PHNwYW4gJHtcbiAgICAgICAgYXR0ciA/IGF0dHIgOiAnJ1xuICAgICAgfSBjbGFzcz1cIiR7dGhpcy5jbGFzc2VzLlZBTFVFfSAke1xuICAgICAgICBhdHRyQ2xhc3MgPyBhdHRyQ2xhc3MgOiAnJ1xuICAgICAgfVwiPjxzcGFuIGNsYXNzPVwiJHtcbiAgICAgICAgdGhpcy5jbGFzc2VzLkNPTlRFTlRcbiAgICAgIH0ke2N1c3RvbUNsYXNzfVwiPiR7dGl0bGVWYWx9PC9zcGFuPjwvc3Bhbj48L2J1dHRvbj5gO1xuICAgIH1cbiAgfVxuICAvLyBnZXQgb3B0aW9uc1xuICBnZXRPcHRpb25zKHJlbGF0aXZlU2VsKSB7XG4gICAgY29uc3Qgc2VsU2Nyb2xsID0gcmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNlbC1zY3JvbGwnKVxuICAgICAgPyBgZGF0YS1zaW1wbGViYXJgXG4gICAgICA6ICcnO1xuICAgIGNvbnN0IGRhdGEgPSBzZWxTY3JvbGxcbiAgICAgID8gcmVsYXRpdmVTZWwuZGF0YXNldC5zZWxTY3JvbGwudHJpbSgpLnNwbGl0KCcsJylcbiAgICAgIDogbnVsbDtcbiAgICBsZXQgc2VsU2Nyb2xsSGVpZ2h0ID1cbiAgICAgIHJlbGF0aXZlU2VsLmRhdGFzZXQuc2VsU2Nyb2xsICYmIGRhdGFcbiAgICAgICAgPyBgc3R5bGU9XCJtYXgtaGVpZ2h0OiR7d2luZG93LmlubmVyV2lkdGggPiA3NjggPyBkYXRhWzBdIDogZGF0YVsxXX1yZW1cImBcbiAgICAgICAgOiAnJztcbiAgICBsZXQgc2VsT3B0aW9ucyA9IEFycmF5LmZyb20ocmVsYXRpdmVTZWwub3B0aW9ucyk7XG5cbiAgICBpZiAoc2VsT3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgIGxldCBzZWxPcHRpb25zSFRNTCA9IGBgO1xuXG4gICAgICBpZiAoXG4gICAgICAgICh0aGlzLmdldFBsYWNlaG9sZGVyKHJlbGF0aXZlU2VsKSAmJlxuICAgICAgICAgICF0aGlzLmdldFBsYWNlaG9sZGVyKHJlbGF0aXZlU2VsKS5zaG93KSB8fFxuICAgICAgICByZWxhdGl2ZVNlbC5tdWx0aXBsZVxuICAgICAgKSB7XG4gICAgICAgIHNlbE9wdGlvbnMgPSBzZWxPcHRpb25zLmZpbHRlcihvcHRpb24gPT4gb3B0aW9uLnZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHNlbE9wdGlvbnNIVE1MICs9IHNlbFNjcm9sbFxuICAgICAgICA/IGA8ZGl2ICR7c2VsU2Nyb2xsfSAke3NlbFNjcm9sbEhlaWdodH0gZGF0YS1zZWwtc2Nyb2xsPVwiJHtyZWxhdGl2ZVNlbC5kYXRhc2V0LnNlbFNjcm9sbH1cIiBjbGFzcz1cIiR7dGhpcy5jbGFzc2VzLlNDUk9MTH1cIj5gXG4gICAgICAgIDogJyc7XG4gICAgICBzZWxPcHRpb25zLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgICAgc2VsT3B0aW9uc0hUTUwgKz0gdGhpcy5nZXRPcHRpb24ob3B0aW9uLCByZWxhdGl2ZVNlbCk7XG4gICAgICB9KTtcbiAgICAgIHNlbE9wdGlvbnNIVE1MICs9IHNlbFNjcm9sbCA/IGA8L2Rpdj5gIDogJyc7XG4gICAgICByZXR1cm4gc2VsT3B0aW9uc0hUTUw7XG4gICAgfVxuICB9XG4gIC8vIGdldCBvcHRpb25cbiAgZ2V0T3B0aW9uKG9wdGlvbiwgcmVsYXRpdmVTZWwpIHtcbiAgICBjb25zdCBzZWxlY3Rpb25zID1cbiAgICAgIG9wdGlvbi5zZWxlY3RlZCAmJiByZWxhdGl2ZVNlbC5tdWx0aXBsZVxuICAgICAgICA/IGAgJHt0aGlzLmNsYXNzZXMuSVNfU0VMRUNURUR9YFxuICAgICAgICA6ICcnO1xuICAgIGNvbnN0IHNob3dTZWxlY3Rpb24gPVxuICAgICAgb3B0aW9uLnNlbGVjdGVkICYmXG4gICAgICAhcmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXNob3ctc2VsZWN0aW9uJykgJiZcbiAgICAgICFyZWxhdGl2ZVNlbC5tdWx0aXBsZVxuICAgICAgICA/IGBoaWRkZW5gXG4gICAgICAgIDogYGA7XG4gICAgY29uc3Qgb3B0aW9uQ2xhc3MgPSBvcHRpb24uZGF0YXNldC5vcHRDbGFzc1xuICAgICAgPyBgICR7b3B0aW9uLmRhdGFzZXQub3B0Q2xhc3N9YFxuICAgICAgOiAnJztcbiAgICBjb25zdCBvcHRpb25MaW5rID0gb3B0aW9uLmRhdGFzZXQub3B0aW9uTGlua1xuICAgICAgPyBvcHRpb24uZGF0YXNldC5vcHRpb25MaW5rXG4gICAgICA6IGZhbHNlO1xuICAgIGNvbnN0IG9wdGlvbkxpbmtUYXJnZXQgPSBvcHRpb24uaGFzQXR0cmlidXRlKCdkYXRhLW9wdGlvbi1saW5rLXRhcmdldCcpXG4gICAgICA/IGB0YXJnZXQ9XCJfYmxhbmtcImBcbiAgICAgIDogJyc7XG4gICAgbGV0IG9wdGlvbkhUTUwgPSBgYDtcblxuICAgIG9wdGlvbkhUTUwgKz0gb3B0aW9uTGlua1xuICAgICAgPyBgPGEgJHtvcHRpb25MaW5rVGFyZ2V0fSAke3Nob3dTZWxlY3Rpb259IGhyZWY9XCIke29wdGlvbkxpbmt9XCIgZGF0YS1vcHQtdmFsPVwiJHtvcHRpb24udmFsdWV9XCIgY2xhc3M9XCIke3RoaXMuY2xhc3Nlcy5PUFRJT059JHtvcHRpb25DbGFzc30ke3NlbGVjdGlvbnN9XCI+YFxuICAgICAgOiBgPGJ1dHRvbiAke3Nob3dTZWxlY3Rpb259IGNsYXNzPVwiJHt0aGlzLmNsYXNzZXMuT1BUSU9OfSR7b3B0aW9uQ2xhc3N9JHtzZWxlY3Rpb25zfVwiIGRhdGEtb3B0LXZhbD1cIiR7b3B0aW9uLnZhbHVlfVwiIHR5cGU9XCJidXR0b25cIj5gO1xuICAgIG9wdGlvbkhUTUwgKz0gdGhpcy5nZXRDb250ZW50KG9wdGlvbik7XG4gICAgb3B0aW9uSFRNTCArPSBvcHRpb25MaW5rID8gYDwvYT5gIDogYDwvYnV0dG9uPmA7XG4gICAgcmV0dXJuIG9wdGlvbkhUTUw7XG4gIH1cbiAgLy8gZ2V0IHNlbGVjdCBjb250ZW50XG4gIGdldENvbnRlbnQob3B0aW9uKSB7XG4gICAgY29uc3Qgb3B0aW9uRGF0YSA9IG9wdGlvbi5kYXRhc2V0Lm9wdEFzc2V0XG4gICAgICA/IGAke29wdGlvbi5kYXRhc2V0Lm9wdEFzc2V0fWBcbiAgICAgIDogJyc7XG4gICAgY29uc3Qgb3B0aW9uRGF0YUhUTUwgPVxuICAgICAgb3B0aW9uRGF0YS5pbmRleE9mKCdpbWcnKSA+PSAwXG4gICAgICAgID8gYDxpbWcgc3JjPVwiJHtvcHRpb25EYXRhfVwiIGFsdD1cIlwiPmBcbiAgICAgICAgOiBvcHRpb25EYXRhO1xuICAgIGxldCBvcHRpb25Db250ZW50SFRNTCA9IGBgO1xuXG4gICAgb3B0aW9uQ29udGVudEhUTUwgKz0gb3B0aW9uRGF0YVxuICAgICAgPyBgPHNwYW4gY2xhc3M9XCIke3RoaXMuY2xhc3Nlcy5HUk9VUH1cIj5gXG4gICAgICA6ICcnO1xuICAgIG9wdGlvbkNvbnRlbnRIVE1MICs9IG9wdGlvbkRhdGFcbiAgICAgID8gYDxzcGFuIGNsYXNzPVwiJHt0aGlzLmNsYXNzZXMuQVNTRVR9XCI+YFxuICAgICAgOiAnJztcbiAgICBvcHRpb25Db250ZW50SFRNTCArPSBvcHRpb25EYXRhID8gb3B0aW9uRGF0YUhUTUwgOiAnJztcbiAgICBvcHRpb25Db250ZW50SFRNTCArPSBvcHRpb25EYXRhID8gYDwvc3Bhbj5gIDogJyc7XG4gICAgb3B0aW9uQ29udGVudEhUTUwgKz0gb3B0aW9uRGF0YSA/IGA8c3BhbiBjbGFzcz1cIiR7dGhpcy5jbGFzc2VzLlRYVH1cIj5gIDogJyc7XG4gICAgb3B0aW9uQ29udGVudEhUTUwgKz0gb3B0aW9uLnRleHRDb250ZW50O1xuICAgIG9wdGlvbkNvbnRlbnRIVE1MICs9IG9wdGlvbkRhdGEgPyBgPC9zcGFuPmAgOiAnJztcbiAgICBvcHRpb25Db250ZW50SFRNTCArPSBvcHRpb25EYXRhID8gYDwvc3Bhbj5gIDogJyc7XG4gICAgcmV0dXJuIG9wdGlvbkNvbnRlbnRIVE1MO1xuICB9XG4gIC8vIGdldCBzZWxlY3QgcGxhY2Vob2xkZXJcbiAgZ2V0UGxhY2Vob2xkZXIocmVsYXRpdmVTZWwpIHtcbiAgICBjb25zdCBwbGFjZWhvbGRlciA9IEFycmF5LmZyb20ocmVsYXRpdmVTZWwub3B0aW9ucykuZmluZChcbiAgICAgIG9wdGlvbiA9PiAhb3B0aW9uLnZhbHVlXG4gICAgKTtcblxuICAgIGlmIChwbGFjZWhvbGRlcikge1xuICAgICAgcGxhY2Vob2xkZXIuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzZXMuc3VidGl0bGUpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IHBsYWNlaG9sZGVyLnRleHRDb250ZW50LFxuICAgICAgICBzaG93OiBwbGFjZWhvbGRlci5oYXNBdHRyaWJ1dGUoJ2RhdGEtc2VsLXBoLXNob3cnKSxcbiAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICBzaG93OiBwbGFjZWhvbGRlci5oYXNBdHRyaWJ1dGUoJ2RhdGEtc2VsLXBoJyksXG4gICAgICAgICAgdGV4dDogcGxhY2Vob2xkZXIuZGF0YXNldC5vcHRQbGFjZWhvbGRlcixcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIC8vIGdldCBzZWxlY3RlZCBvcHRpb25zIGRhdGFcbiAgZ2V0RGF0YShyZWxhdGl2ZVNlbCkge1xuICAgIGxldCBzZWxlY3Rpb25zID0gW107XG5cbiAgICBpZiAocmVsYXRpdmVTZWwubXVsdGlwbGUpIHtcbiAgICAgIHNlbGVjdGlvbnMgPSBBcnJheS5mcm9tKHJlbGF0aXZlU2VsLm9wdGlvbnMpXG4gICAgICAgIC5maWx0ZXIob3B0aW9uID0+IG9wdGlvbi52YWx1ZSlcbiAgICAgICAgLmZpbHRlcihvcHRpb24gPT4gb3B0aW9uLnNlbGVjdGVkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZWN0aW9ucy5wdXNoKHJlbGF0aXZlU2VsLm9wdGlvbnNbcmVsYXRpdmVTZWwuc2VsZWN0ZWRJbmRleF0pO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgZWxlbWVudHM6IHNlbGVjdGlvbnMubWFwKG9wdGlvbiA9PiBvcHRpb24pLFxuICAgICAgdmFsdWVzOiBzZWxlY3Rpb25zXG4gICAgICAgIC5maWx0ZXIob3B0aW9uID0+IG9wdGlvbi52YWx1ZSlcbiAgICAgICAgLm1hcChvcHRpb24gPT4gb3B0aW9uLnZhbHVlKSxcbiAgICAgIGh0bWw6IHNlbGVjdGlvbnMubWFwKG9wdGlvbiA9PiB0aGlzLmdldENvbnRlbnQob3B0aW9uKSksXG4gICAgfTtcbiAgfVxuXG4gIC8vIHNlbGVjdGlvbnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIGluaXQgc2VsZWN0aW9uc1xuICBpbml0U2VsZWN0aW9ucyhlKSB7XG4gICAgY29uc3QgcmVsYXRpdmVTZWwgPSBlLnRhcmdldDtcblxuICAgIHRoaXMuYnVpbGQocmVsYXRpdmVTZWwpO1xuICAgIHRoaXMuc2V0U2VsZWN0aW9ucyhyZWxhdGl2ZVNlbCk7XG4gIH1cbiAgLy8gc2V0IHNlbGVjdGlvbnNcbiAgc2V0U2VsZWN0aW9ucyhyZWxhdGl2ZVNlbCkge1xuICAgIGNvbnN0IHNlbGVjdCA9IHJlbGF0aXZlU2VsLnBhcmVudEVsZW1lbnQ7XG5cbiAgICBpZiAocmVsYXRpdmVTZWwuaGFzQXR0cmlidXRlKCdkYXRhLXN1Ym1pdCcpICYmIHJlbGF0aXZlU2VsLnZhbHVlKSB7XG4gICAgICBsZXQgdGVtcEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgdGVtcEJ1dHRvbi50eXBlID0gJ3N1Ym1pdCc7XG4gICAgICByZWxhdGl2ZVNlbC5jbG9zZXN0KCdmb3JtJykuYXBwZW5kKHRlbXBCdXR0b24pO1xuICAgICAgdGVtcEJ1dHRvbi5jbGljaygpO1xuICAgICAgdGVtcEJ1dHRvbi5yZW1vdmUoKTtcbiAgICB9XG4gICAgcmVsYXRpdmVTZWwucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5JU19GSUxMRUQpO1xuICAgIHRoaXMuc2VsZWN0aW9uKHNlbGVjdCwgcmVsYXRpdmVTZWwpO1xuICB9XG4gIC8vIGN1c3RvbSBzZWxlY3QgZXZlbnQgKGxpc3RlbiB0byBhbnkgc2VsZWN0aW9ucyAvIG11dGF0aW9ucylcbiAgc2VsZWN0aW9uKHNlbGVjdCwgcmVsYXRpdmVTZWwpIHtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzZWxlY3Rpb24nLCB7XG4gICAgICAgIGRldGFpbDoge1xuICAgICAgICAgIHNlbGVjdDogcmVsYXRpdmVTZWwsXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cblxubmV3IFNlbGVjdCh7fSk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zaW1wbGViYXJdJykubGVuZ3RoKSB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNpbXBsZWJhcl0nKS5mb3JFYWNoKHNjcm9sbEJsb2NrID0+IHtcbiAgICBuZXcgU2ltcGxlQmFyKHNjcm9sbEJsb2NrLCB7XG4gICAgICBhdXRvSGlkZTogZmFsc2UsXG4gICAgfSk7XG4gIH0pO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIiwiaW1wb3J0IHsgc2V0SGFzaCwgZ2V0SGFzaCB9IGZyb20gJy4vdXRpbHMnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jbGFzcyBUYWJzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5hdHRycyA9IHtcbiAgICAgIFRBQlM6ICdkYXRhLXRhYnMnLFxuICAgICAgSU5ERVg6ICdkYXRhLXRhYnMtaW5kZXgnLFxuICAgICAgVElUTEVTOiAnZGF0YS10YWJzLXRpdGxlcycsXG4gICAgICBUSVRMRTogJ2RhdGEtdGFicy10aXRsZScsXG4gICAgICBUQUJfSVRFTTogJ2RhdGEtdGFicy1pdGVtJyxcbiAgICAgIEJPRFk6ICdkYXRhLXRhYnMtYm9keScsXG4gICAgICBIQVNIOiAnZGF0YS10YWJzLWhhc2gnLFxuICAgIH07XG4gICAgdGhpcy5jbGFzc2VzID0ge1xuICAgICAgSU5JVDogJ190YWJzLWluaXQnLFxuICAgICAgQUNUSVZFOiAnX2lzLWFjdGl2ZScsXG4gICAgICBNT0RBTDogJ21vZGFsJyxcbiAgICB9O1xuICAgIHRoaXMudGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLXRhYnNdYCk7XG4gICAgdGhpcy5hY3RpdmVIYXNoID0gW107XG5cbiAgICBpZiAodGhpcy50YWJzLmxlbmd0aCkge1xuICAgICAgY29uc3QgaGFzaCA9IGdldEhhc2goKTtcblxuICAgICAgaWYgKGhhc2ggJiYgaGFzaC5zdGFydHNXaXRoKCd0YWItJykpIHtcbiAgICAgICAgYWN0aXZlSGFzaCA9IGhhc2gucmVwbGFjZSgndGFiLScsICcnKS5zcGxpdCgnLScpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRhYnMuZm9yRWFjaCgodGFic0Jsb2NrLCBpbmRleCkgPT4ge1xuICAgICAgICB0YWJzQmxvY2suY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzZXMuSU5JVCk7XG4gICAgICAgIHRhYnNCbG9jay5zZXRBdHRyaWJ1dGUodGhpcy5hdHRycy5JTkRFWCwgaW5kZXgpO1xuICAgICAgICB0YWJzQmxvY2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnNldEFjdGlvbnMuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuaW5pdCh0YWJzQmxvY2spO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0U3RhdHVzKHRhYnNCbG9jaykge1xuICAgIGxldCB0aXRsZXMgPSB0YWJzQmxvY2sucXVlcnlTZWxlY3RvckFsbChgWyR7dGhpcy5hdHRycy5USVRMRX1dYCk7XG4gICAgbGV0IGNvbnRlbnQgPSB0YWJzQmxvY2sucXVlcnlTZWxlY3RvckFsbChgWyR7dGhpcy5hdHRycy5UQUJfSVRFTX1dYCk7XG4gICAgY29uc3QgaW5kZXggPSB0YWJzQmxvY2suZGF0YXNldC50YWJzSW5kZXg7XG5cbiAgICBpZiAoY29udGVudC5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGhhc0hhc2ggPSB0YWJzQmxvY2suaGFzQXR0cmlidXRlKHRoaXMuYXR0cnMuSEFTSCk7XG5cbiAgICAgIGNvbnRlbnQgPSBBcnJheS5mcm9tKGNvbnRlbnQpLmZpbHRlcihcbiAgICAgICAgaXRlbSA9PiBpdGVtLmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuVEFCU31dYCkgPT09IHRhYnNCbG9ja1xuICAgICAgKTtcblxuICAgICAgdGl0bGVzID0gQXJyYXkuZnJvbSh0aXRsZXMpLmZpbHRlcihcbiAgICAgICAgaXRlbSA9PiBpdGVtLmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuVEFCU31dYCkgPT09IHRhYnNCbG9ja1xuICAgICAgKTtcblxuICAgICAgY29udGVudC5mb3JFYWNoKChpdGVtLCBpbmR4KSA9PiB7XG4gICAgICAgIGlmICh0aXRsZXNbaW5keF0uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuY2xhc3Nlcy5BQ1RJVkUpKSB7XG4gICAgICAgICAgaXRlbS5oaWRkZW4gPSBmYWxzZTtcblxuICAgICAgICAgIGlmIChoYXNIYXNoICYmICFpdGVtLmNsb3Nlc3QoYC4ke3RoaXMuY2xhc3Nlcy5NT0RBTH1gKSkge1xuICAgICAgICAgICAgc2V0SGFzaChgdGFiLSR7aW5kZXh9LSR7aW5keH1gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbS5oaWRkZW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzZXRBY3Rpb25zKGUpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcblxuICAgIGlmICh0YXJnZXQuY2xvc2VzdChgWyR7dGhpcy5hdHRycy5USVRMRX1dYCkpIHtcbiAgICAgIGNvbnN0IHRpdGxlID0gdGFyZ2V0LmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuVElUTEV9XWApO1xuICAgICAgY29uc3QgdGFic0Jsb2NrID0gdGl0bGUuY2xvc2VzdChgWyR7dGhpcy5hdHRycy5UQUJTfV1gKTtcblxuICAgICAgaWYgKCF0aXRsZS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5jbGFzc2VzLkFDVElWRSkpIHtcbiAgICAgICAgbGV0IGFjdGl2ZVRpdGxlID0gdGFic0Jsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgYFske3RoaXMuYXR0cnMuVElUTEV9XS4ke3RoaXMuY2xhc3Nlcy5BQ1RJVkV9YFxuICAgICAgICApO1xuXG4gICAgICAgIGFjdGl2ZVRpdGxlLmxlbmd0aFxuICAgICAgICAgID8gKGFjdGl2ZVRpdGxlID0gQXJyYXkuZnJvbShhY3RpdmVUaXRsZSkuZmlsdGVyKFxuICAgICAgICAgICAgICBpdGVtID0+IGl0ZW0uY2xvc2VzdChgWyR7dGhpcy5hdHRycy5UQUJTfV1gKSA9PT0gdGFic0Jsb2NrXG4gICAgICAgICAgICApKVxuICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgYWN0aXZlVGl0bGUubGVuZ3RoXG4gICAgICAgICAgPyBhY3RpdmVUaXRsZVswXS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3Nlcy5BQ1RJVkUpXG4gICAgICAgICAgOiBudWxsO1xuICAgICAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3Nlcy5BQ1RJVkUpO1xuICAgICAgICB0aGlzLnNldFN0YXR1cyh0YWJzQmxvY2spO1xuICAgICAgfVxuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdCh0YWJzQmxvY2spIHtcbiAgICBsZXQgdGl0bGVzID0gdGFic0Jsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoYFske3RoaXMuYXR0cnMuVElUTEVTfV0+KmApO1xuICAgIGxldCBjb250ZW50ID0gdGFic0Jsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoYFske3RoaXMuYXR0cnMuQk9EWX1dPipgKTtcbiAgICBjb25zdCBpbmRleCA9IHRhYnNCbG9jay5kYXRhc2V0LnRhYnNJbmRleDtcbiAgICBjb25zdCBhY3RpdmVIYXNoQmxvY2sgPSB0aGlzLmFjdGl2ZUhhc2hbMF0gPT0gaW5kZXg7XG5cbiAgICBpZiAoYWN0aXZlSGFzaEJsb2NrKSB7XG4gICAgICBjb25zdCBhY3RpdmVUaXRsZSA9IHRhYnNCbG9jay5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgWyR7dGhpcy5hdHRycy5USVRMRVN9XT4uJHt0aGlzLmNsYXNzZXMuQUNUSVZFfWBcbiAgICAgICk7XG4gICAgICBhY3RpdmVUaXRsZSA/IGFjdGl2ZVRpdGxlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLkFDVElWRSkgOiBudWxsO1xuICAgIH1cblxuICAgIGlmIChjb250ZW50Lmxlbmd0aCkge1xuICAgICAgY29udGVudCA9IEFycmF5LmZyb20oY29udGVudCkuZmlsdGVyKFxuICAgICAgICBpdGVtID0+IGl0ZW0uY2xvc2VzdChgWyR7dGhpcy5hdHRycy5UQUJTfV1gKSA9PT0gdGFic0Jsb2NrXG4gICAgICApO1xuICAgICAgdGl0bGVzID0gQXJyYXkuZnJvbSh0aXRsZXMpLmZpbHRlcihcbiAgICAgICAgaXRlbSA9PiBpdGVtLmNsb3Nlc3QoYFske3RoaXMuYXR0cnMuVEFCU31dYCkgPT09IHRhYnNCbG9ja1xuICAgICAgKTtcblxuICAgICAgY29udGVudC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICB0aXRsZXNbaW5kZXhdLnNldEF0dHJpYnV0ZSh0aGlzLmF0dHJzLlRJVExFLCAnJyk7XG4gICAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKHRoaXMuYXR0cnMuVEFCX0lURU0sICcnKTtcblxuICAgICAgICBpZiAoYWN0aXZlSGFzaEJsb2NrICYmIGluZGV4ID09IHRoaXMuYWN0aXZlSGFzaFsxXSkge1xuICAgICAgICAgIHRpdGxlc1tpbmRleF0uY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzZXMuQUNUSVZFKTtcbiAgICAgICAgfVxuICAgICAgICBpdGVtLmhpZGRlbiA9ICF0aXRsZXNbaW5kZXhdLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmNsYXNzZXMuQUNUSVZFKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5uZXcgVGFicygpO1xuIiwiLyoqXG4gKiBzZXQgaGFzaCB0byB1cmxcbiAqIEBwYXJhbSB7c3RyaW5nfSBoYXNoXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRIYXNoID0gaGFzaCA9PiB7XG4gIGhhc2ggPSBoYXNoID8gYCMke2hhc2h9YCA6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KCcjJylbMF07XG4gIGhpc3RvcnkucHVzaFN0YXRlKCcnLCAnJywgaGFzaCk7XG59O1xuXG4vKipcbiAqIGdldCBoYXNoIGZyb20gdXJsXG4gKiBAcmV0dXJucyBzdHJpbmdcbiAqL1xuZXhwb3J0IGNvbnN0IGdldEhhc2ggPSAoKSA9PiB7XG4gIGlmIChsb2NhdGlvbi5oYXNoKSB7XG4gICAgcmV0dXJuIGxvY2F0aW9uLmhhc2gucmVwbGFjZSgnIycsICcnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBpbml0aWFsaXplcyBoYW1idXJnZXIgbWVudVxuICovXG5leHBvcnQgY29uc3QgbWVudUluaXQgPSAoKSA9PiB7XG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGFtYnVyZ2VyJykpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoYm9keUxvY2tTdGF0dXMgJiYgZS50YXJnZXQuY2xvc2VzdCgnLmhhbWJ1cmdlcicpKSB7XG4gICAgICAgIG1lbnVPcGVuKCk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBib2R5TG9ja1N0YXR1cyAmJlxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdfbWVudS1vcGVuZWQnKSAmJlxuICAgICAgICAoZS50YXJnZXQuY2xvc2VzdCgnLm1lbnVfX2Nsb3NlLWJ0bicpIHx8ICFlLnRhcmdldC5jbG9zZXN0KCcubWVudScpKVxuICAgICAgKSB7XG4gICAgICAgIG1lbnVDbG9zZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59O1xuLyoqXG4gKiBvcGVucyBoYW1idXJnZXIgbWVudVxuICovXG5leHBvcnQgY29uc3QgbWVudU9wZW4gPSAoKSA9PiB7XG4gIGJvZHlMb2NrKCk7XG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdfbWVudS1vcGVuZWQnKTtcbn07XG4vKipcbiAqIGNsb3NlcyBoYW1idXJnZXIgbWVudVxuICovXG5leHBvcnQgY29uc3QgbWVudUNsb3NlID0gKCkgPT4ge1xuICBib2R5VW5sb2NrKCk7XG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdfbWVudS1vcGVuZWQnKTtcbn07XG5cbi8vIGJvZHkgbG9ja1xuZXhwb3J0IGxldCBib2R5TG9ja1N0YXR1cyA9IHRydWU7XG4vKipcbiAqIHRvZ2dsZXMgYm9keSBsb2NrXG4gKiBAcGFyYW0ge251bWJlcn0gZGVsYXlcbiAqL1xuZXhwb3J0IGNvbnN0IGJvZHlMb2NrVG9nZ2xlID0gKGRlbGF5ID0gNTAwKSA9PiB7XG4gIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsb2NrJykpIHtcbiAgICBib2R5VW5sb2NrKGRlbGF5KTtcbiAgfSBlbHNlIHtcbiAgICBib2R5TG9jayhkZWxheSk7XG4gIH1cbn07XG4vKipcbiAqIHVubG9ja3MgYm9keVxuICogQHBhcmFtIHtudW1iZXJ9IGRlbGF5XG4gKi9cbmV4cG9ydCBjb25zdCBib2R5VW5sb2NrID0gKGRlbGF5ID0gNTAwKSA9PiB7XG4gIGlmIChib2R5TG9ja1N0YXR1cykge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2xvY2snKTtcbiAgICB9LCBkZWxheSk7XG4gICAgYm9keUxvY2tTdGF0dXMgPSBmYWxzZTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGJvZHlMb2NrU3RhdHVzID0gdHJ1ZTtcbiAgICB9LCBkZWxheSk7XG4gIH1cbn07XG4vKipcbiAqIGxvY2tzIGJvZHlcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWxheVxuICovXG5leHBvcnQgY29uc3QgYm9keUxvY2sgPSAoZGVsYXkgPSA1MDApID0+IHtcbiAgaWYgKGJvZHlMb2NrU3RhdHVzKSB7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2xvY2snKTtcblxuICAgIGJvZHlMb2NrU3RhdHVzID0gZmFsc2U7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBib2R5TG9ja1N0YXR1cyA9IHRydWU7XG4gICAgfSwgZGVsYXkpO1xuICB9XG59O1xuXG4vKipcbiAqIG1ha2UgdGhlIGFycmF5IHVuaXF1ZVxuICogQHBhcmFtIHthcnJheX0gYXJyYXlcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bmlxdWVBcnJheShhcnJheSkge1xuICByZXR1cm4gYXJyYXkuZmlsdGVyKGZ1bmN0aW9uIChpdGVtLCBpbmRleCwgc2VsZikge1xuICAgIHJldHVybiBzZWxmLmluZGV4T2YoaXRlbSkgPT09IGluZGV4O1xuICB9KTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHthcnJheX0gYXJyYXlcbiAqIEBwYXJhbSB7bnVtYmVyfSBkYXRhU2V0VmFsdWVcbiAqIHByb2Nlc3MgbWVkaWEgcmVxdWVzdHMgZnJvbSBhdHRyaWJ1dGVzXG4gKi9cbmV4cG9ydCBjb25zdCBkYXRhTWVkaWFRdWVyaWVzID0gKGFycmF5LCBkYXRhU2V0VmFsdWUpID0+IHtcbiAgLy8gZ2V0IG9iamVjdHMgd2l0aCBtZWRpYSBxdWVyaWVzXG4gIGNvbnN0IG1lZGlhID0gQXJyYXkuZnJvbShhcnJheSkuZmlsdGVyKGZ1bmN0aW9uIChpdGVtLCBpbmRleCwgc2VsZikge1xuICAgIGlmIChpdGVtLmRhdGFzZXRbZGF0YVNldFZhbHVlXSkge1xuICAgICAgcmV0dXJuIGl0ZW0uZGF0YXNldFtkYXRhU2V0VmFsdWVdLnNwbGl0KCcsJylbMF07XG4gICAgfVxuICB9KTtcbiAgLy8gb2JqZWN0cyB3aXRoIG1lZGlhIHF1ZXJpZXMgaW5pdGlhbGl6YXRpb25cbiAgaWYgKG1lZGlhLmxlbmd0aCkge1xuICAgIGNvbnN0IGJyZWFrcG9pbnRzQXJyYXkgPSBbXTtcbiAgICBtZWRpYS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgY29uc3QgcGFyYW1zID0gaXRlbS5kYXRhc2V0W2RhdGFTZXRWYWx1ZV07XG4gICAgICBjb25zdCBicmVha3BvaW50ID0ge307XG4gICAgICBjb25zdCBwYXJhbXNBcnJheSA9IHBhcmFtcy5zcGxpdCgnLCcpO1xuICAgICAgYnJlYWtwb2ludC52YWx1ZSA9IHBhcmFtc0FycmF5WzBdO1xuICAgICAgYnJlYWtwb2ludC50eXBlID0gcGFyYW1zQXJyYXlbMV0gPyBwYXJhbXNBcnJheVsxXS50cmltKCkgOiAnbWF4JztcbiAgICAgIGJyZWFrcG9pbnQuaXRlbSA9IGl0ZW07XG4gICAgICBicmVha3BvaW50c0FycmF5LnB1c2goYnJlYWtwb2ludCk7XG4gICAgfSk7XG4gICAgLy8gZ2V0IHVuaXF1ZSBicmVha3BvaW50c1xuICAgIGxldCBtZFF1ZXJpZXMgPSBicmVha3BvaW50c0FycmF5Lm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgJygnICtcbiAgICAgICAgaXRlbS50eXBlICtcbiAgICAgICAgJy13aWR0aDogJyArXG4gICAgICAgIGl0ZW0udmFsdWUgK1xuICAgICAgICAncHgpLCcgK1xuICAgICAgICBpdGVtLnZhbHVlICtcbiAgICAgICAgJywnICtcbiAgICAgICAgaXRlbS50eXBlXG4gICAgICApO1xuICAgIH0pO1xuICAgIG1kUXVlcmllcyA9IHVuaXF1ZUFycmF5KG1kUXVlcmllcyk7XG4gICAgY29uc3QgbWRRdWVyaWVzQXJyYXkgPSBbXTtcblxuICAgIGlmIChtZFF1ZXJpZXMubGVuZ3RoKSB7XG4gICAgICAvLyB3b3JrIHdpdGggZXZlcnkgYnJlYWtwb2ludFxuICAgICAgbWRRdWVyaWVzLmZvckVhY2goYnJlYWtwb2ludCA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmFtc0FycmF5ID0gYnJlYWtwb2ludC5zcGxpdCgnLCcpO1xuICAgICAgICBjb25zdCBtZWRpYUJyZWFrcG9pbnQgPSBwYXJhbXNBcnJheVsxXTtcbiAgICAgICAgY29uc3QgbWVkaWFUeXBlID0gcGFyYW1zQXJyYXlbMl07XG4gICAgICAgIGNvbnN0IG1hdGNoTWVkaWEgPSB3aW5kb3cubWF0Y2hNZWRpYShwYXJhbXNBcnJheVswXSk7XG4gICAgICAgIC8vIG9iamVjdHMgd2l0aCBjb25kaXRpb25zXG4gICAgICAgIGNvbnN0IGl0ZW1zQXJyYXkgPSBicmVha3BvaW50c0FycmF5LmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgIGlmIChpdGVtLnZhbHVlID09PSBtZWRpYUJyZWFrcG9pbnQgJiYgaXRlbS50eXBlID09PSBtZWRpYVR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIG1kUXVlcmllc0FycmF5LnB1c2goe1xuICAgICAgICAgIGl0ZW1zQXJyYXksXG4gICAgICAgICAgbWF0Y2hNZWRpYSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBtZFF1ZXJpZXNBcnJheTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogc21vb3RobHkgc2xpZGVzIHVwXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXRcbiAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvblxuICogQHBhcmFtIHtib29sZWFufSBzaG93bW9yZVxuICovXG5leHBvcnQgY29uc3QgX3NsaWRlVXAgPSAodGFyZ2V0LCBkdXJhdGlvbiA9IDUwMCwgc2hvd21vcmUgPSAwKSA9PiB7XG4gIGlmICghdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnX3NsaWRlJykpIHtcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnX3NsaWRlJyk7XG4gICAgdGFyZ2V0LnN0eWxlLnRyYW5zaXRpb25Qcm9wZXJ0eSA9ICdoZWlnaHQsIG1hcmdpbiwgcGFkZGluZyc7XG4gICAgdGFyZ2V0LnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IGR1cmF0aW9uICsgJ21zJztcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gYCR7dGFyZ2V0Lm9mZnNldEhlaWdodH1weGA7XG4gICAgdGFyZ2V0Lm9mZnNldEhlaWdodDtcbiAgICB0YXJnZXQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gc2hvd21vcmUgPyBgJHtzaG93bW9yZX1yZW1gIDogYDBgO1xuICAgIHRhcmdldC5zdHlsZS5wYWRkaW5nVG9wID0gMDtcbiAgICB0YXJnZXQuc3R5bGUucGFkZGluZ0JvdHRvbSA9IDA7XG4gICAgdGFyZ2V0LnN0eWxlLm1hcmdpblRvcCA9IDA7XG4gICAgdGFyZ2V0LnN0eWxlLm1hcmdpbkJvdHRvbSA9IDA7XG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGFyZ2V0LmhpZGRlbiA9ICFzaG93bW9yZSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICFzaG93bW9yZSA/IHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnaGVpZ2h0JykgOiBudWxsO1xuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nLXRvcCcpO1xuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nLWJvdHRvbScpO1xuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdtYXJnaW4tdG9wJyk7XG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ21hcmdpbi1ib3R0b20nKTtcbiAgICAgICFzaG93bW9yZSA/IHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnb3ZlcmZsb3cnKSA6IG51bGw7XG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zaXRpb24tZHVyYXRpb24nKTtcbiAgICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndHJhbnNpdGlvbi1wcm9wZXJ0eScpO1xuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ19zbGlkZScpO1xuICAgICAgLy8gY3JlYXRlIGV2ZW50XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3NsaWRlVXBEb25lJywge1xuICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSwgZHVyYXRpb24pO1xuICB9XG59O1xuXG4vKipcbiAqIHNtb290aGx5IHNsaWRlcyBkb3duXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXRcbiAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvblxuICogQHBhcmFtIHtib29sZWFufSBzaG93bW9yZVxuICovXG5leHBvcnQgY29uc3QgX3NsaWRlRG93biA9ICh0YXJnZXQsIGR1cmF0aW9uID0gNTAwLCBzaG93bW9yZSA9IDApID0+IHtcbiAgaWYgKCF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdfc2xpZGUnKSkge1xuICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdfc2xpZGUnKTtcbiAgICB0YXJnZXQuaGlkZGVuID0gdGFyZ2V0LmhpZGRlbiA/IGZhbHNlIDogbnVsbDtcbiAgICBzaG93bW9yZSA/IHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnaGVpZ2h0JykgOiBudWxsO1xuICAgIGxldCBoZWlnaHQgPSB0YXJnZXQub2Zmc2V0SGVpZ2h0O1xuICAgIHRhcmdldC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSBzaG93bW9yZSA/IGAke3Nob3dtb3JlfXJlbWAgOiBgMGA7XG4gICAgdGFyZ2V0LnN0eWxlLnBhZGRpbmdUb3AgPSAwO1xuICAgIHRhcmdldC5zdHlsZS5wYWRkaW5nQm90dG9tID0gMDtcbiAgICB0YXJnZXQuc3R5bGUubWFyZ2luVG9wID0gMDtcbiAgICB0YXJnZXQuc3R5bGUubWFyZ2luQm90dG9tID0gMDtcbiAgICB0YXJnZXQub2Zmc2V0SGVpZ2h0O1xuICAgIHRhcmdldC5zdHlsZS50cmFuc2l0aW9uUHJvcGVydHkgPSAnaGVpZ2h0LCBtYXJnaW4sIHBhZGRpbmcnO1xuICAgIHRhcmdldC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBkdXJhdGlvbiArICdtcyc7XG4gICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XG4gICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nLXRvcCcpO1xuICAgIHRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgncGFkZGluZy1ib3R0b20nKTtcbiAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ21hcmdpbi10b3AnKTtcbiAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ21hcmdpbi1ib3R0b20nKTtcbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2hlaWdodCcpO1xuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdvdmVyZmxvdycpO1xuICAgICAgdGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCd0cmFuc2l0aW9uLWR1cmF0aW9uJyk7XG4gICAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zaXRpb24tcHJvcGVydHknKTtcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdfc2xpZGUnKTtcbiAgICAgIC8vIGNyZWF0ZSBldmVudFxuICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzbGlkZURvd25Eb25lJywge1xuICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSwgZHVyYXRpb24pO1xuICB9XG59O1xuXG4vKipcbiAqIHRvZ2dsZXMgc21vb3RoIHNsaWRlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXRcbiAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvblxuICogQHJldHVybnMgZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IF9zbGlkZVRvZ2dsZSA9ICh0YXJnZXQsIGR1cmF0aW9uID0gNTAwKSA9PiB7XG4gIGlmICh0YXJnZXQuaGlkZGVuKSB7XG4gICAgcmV0dXJuIF9zbGlkZURvd24odGFyZ2V0LCBkdXJhdGlvbik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIF9zbGlkZVVwKHRhcmdldCwgZHVyYXRpb24pO1xuICB9XG59O1xuXG4vKipcbiAqIGNvbnZlcnRzIHJlbSB0byBwaXhlbHNcbiAqIEBwYXJhbSB7bnVtYmVyfSByZW1WYWx1ZVxuICogQHJldHVybnMgc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1Ub1B4KHJlbVZhbHVlKSB7XG4gIGNvbnN0IGh0bWxGb250U2l6ZSA9IHBhcnNlRmxvYXQoXG4gICAgZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpLmZvbnRTaXplXG4gICk7XG5cbiAgY29uc3QgcHhWYWx1ZSA9IHJlbVZhbHVlICogaHRtbEZvbnRTaXplO1xuXG4gIHJldHVybiBNYXRoLnJvdW5kKHB4VmFsdWUpICsgJ3B4Jztcbn1cblxuLy8gcmVtb3ZlIGNsYXNzIGZyb20gYWxsIGFycmF5IGVsZW1lbnRzXG5leHBvcnQgY29uc3QgcmVtb3ZlQ2xhc3NlcyA9IChhcnJheSwgY2xhc3NOYW1lKSA9PiB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICBhcnJheVtpXS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gIH1cbn07XG4iLCJ2YXIgY2FuVXNlRE9NID0gISEoXG4gIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gIHdpbmRvdy5kb2N1bWVudCAmJlxuICB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudFxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjYW5Vc2VET007IiwiLy8gSW1wb3J0c1xudmFyIF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gPSByZXF1aXJlKFwiLi4vLi4vY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiKTtcbnZhciBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gPSByZXF1aXJlKFwiLi4vLi4vY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBbZGF0YS1zaW1wbGViYXJdIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgYWxpZ24tY29udGVudDogZmxleC1zdGFydDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG59XG5cbi5zaW1wbGViYXItd3JhcHBlciB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHdpZHRoOiBpbmhlcml0O1xuICBoZWlnaHQ6IGluaGVyaXQ7XG4gIG1heC13aWR0aDogaW5oZXJpdDtcbiAgbWF4LWhlaWdodDogaW5oZXJpdDtcbn1cblxuLnNpbXBsZWJhci1tYXNrIHtcbiAgZGlyZWN0aW9uOiBpbmhlcml0O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICBib3R0b206IDA7XG4gIHJpZ2h0OiAwO1xuICB3aWR0aDogYXV0byAhaW1wb3J0YW50O1xuICBoZWlnaHQ6IGF1dG8gIWltcG9ydGFudDtcbiAgei1pbmRleDogMDtcbn1cblxuLnNpbXBsZWJhci1vZmZzZXQge1xuICBkaXJlY3Rpb246IGluaGVyaXQgIWltcG9ydGFudDtcbiAgYm94LXNpemluZzogaW5oZXJpdCAhaW1wb3J0YW50O1xuICByZXNpemU6IG5vbmUgIWltcG9ydGFudDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgcmlnaHQ6IDA7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xufVxuXG4uc2ltcGxlYmFyLWNvbnRlbnQtd3JhcHBlciB7XG4gIGRpcmVjdGlvbjogaW5oZXJpdDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveCAhaW1wb3J0YW50O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBoZWlnaHQ6IDEwMCU7IC8qIFJlcXVpcmVkIGZvciBob3Jpem9udGFsIG5hdGl2ZSBzY3JvbGxiYXIgdG8gbm90IGFwcGVhciBpZiBwYXJlbnQgaXMgdGFsbGVyIHRoYW4gbmF0dXJhbCBoZWlnaHQgKi9cbiAgd2lkdGg6IGF1dG87XG4gIG1heC13aWR0aDogMTAwJTsgLyogTm90IHJlcXVpcmVkIGZvciBob3Jpem9udGFsIHNjcm9sbCB0byB0cmlnZ2VyICovXG4gIG1heC1oZWlnaHQ6IDEwMCU7IC8qIE5lZWRlZCBmb3IgdmVydGljYWwgc2Nyb2xsIHRvIHRyaWdnZXIgKi9cbiAgb3ZlcmZsb3c6IGF1dG87XG4gIHNjcm9sbGJhci13aWR0aDogbm9uZTtcbiAgLW1zLW92ZXJmbG93LXN0eWxlOiBub25lO1xufVxuXG4uc2ltcGxlYmFyLWNvbnRlbnQtd3JhcHBlcjo6LXdlYmtpdC1zY3JvbGxiYXIsXG4uc2ltcGxlYmFyLWhpZGUtc2Nyb2xsYmFyOjotd2Via2l0LXNjcm9sbGJhciB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIHdpZHRoOiAwO1xuICBoZWlnaHQ6IDA7XG59XG5cbi5zaW1wbGViYXItY29udGVudDpiZWZvcmUsXG4uc2ltcGxlYmFyLWNvbnRlbnQ6YWZ0ZXIge1xuICBjb250ZW50OiBcIiBcIjtcbiAgZGlzcGxheTogdGFibGU7XG59XG5cbi5zaW1wbGViYXItcGxhY2Vob2xkZXIge1xuICBtYXgtaGVpZ2h0OiAxMDAlO1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cblxuLnNpbXBsZWJhci1oZWlnaHQtYXV0by1vYnNlcnZlci13cmFwcGVyIHtcbiAgYm94LXNpemluZzogaW5oZXJpdCAhaW1wb3J0YW50O1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDFweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBmbG9hdDogbGVmdDtcbiAgbWF4LWhlaWdodDogMXB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB6LWluZGV4OiAtMTtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgZmxleC1ncm93OiBpbmhlcml0O1xuICBmbGV4LXNocmluazogMDtcbiAgZmxleC1iYXNpczogMDtcbn1cblxuLnNpbXBsZWJhci1oZWlnaHQtYXV0by1vYnNlcnZlciB7XG4gIGJveC1zaXppbmc6IGluaGVyaXQ7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBvcGFjaXR5OiAwO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgaGVpZ2h0OiAxMDAwJTtcbiAgd2lkdGg6IDEwMDAlO1xuICBtaW4taGVpZ2h0OiAxcHg7XG4gIG1pbi13aWR0aDogMXB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgei1pbmRleDogLTE7XG59XG5cbi5zaW1wbGViYXItdHJhY2sge1xuICB6LWluZGV4OiAxO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG5bZGF0YS1zaW1wbGViYXJdLnNpbXBsZWJhci1kcmFnZ2luZyB7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTtcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbn1cblxuW2RhdGEtc2ltcGxlYmFyXS5zaW1wbGViYXItZHJhZ2dpbmcgLnNpbXBsZWJhci1jb250ZW50IHtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIHVzZXItc2VsZWN0OiBub25lO1xufVxuXG5bZGF0YS1zaW1wbGViYXJdLnNpbXBsZWJhci1kcmFnZ2luZyAuc2ltcGxlYmFyLXRyYWNrIHtcbiAgcG9pbnRlci1ldmVudHM6IGFsbDtcbn1cblxuLnNpbXBsZWJhci1zY3JvbGxiYXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBtaW4taGVpZ2h0OiAxMHB4O1xufVxuXG4uc2ltcGxlYmFyLXNjcm9sbGJhcjpiZWZvcmUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIGJhY2tncm91bmQ6IGJsYWNrO1xuICBib3JkZXItcmFkaXVzOiA3cHg7XG4gIGxlZnQ6IDJweDtcbiAgcmlnaHQ6IDJweDtcbiAgb3BhY2l0eTogMDtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzIDAuNXMgbGluZWFyO1xufVxuXG4uc2ltcGxlYmFyLXNjcm9sbGJhci5zaW1wbGViYXItdmlzaWJsZTpiZWZvcmUge1xuICBvcGFjaXR5OiAwLjU7XG4gIHRyYW5zaXRpb24tZGVsYXk6IDBzO1xuICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAwcztcbn1cblxuLnNpbXBsZWJhci10cmFjay5zaW1wbGViYXItdmVydGljYWwge1xuICB0b3A6IDA7XG4gIHdpZHRoOiAxMXB4O1xufVxuXG4uc2ltcGxlYmFyLXNjcm9sbGJhcjpiZWZvcmUge1xuICB0b3A6IDJweDtcbiAgYm90dG9tOiAycHg7XG4gIGxlZnQ6IDJweDtcbiAgcmlnaHQ6IDJweDtcbn1cblxuLnNpbXBsZWJhci10cmFjay5zaW1wbGViYXItaG9yaXpvbnRhbCB7XG4gIGxlZnQ6IDA7XG4gIGhlaWdodDogMTFweDtcbn1cblxuLnNpbXBsZWJhci10cmFjay5zaW1wbGViYXItaG9yaXpvbnRhbCAuc2ltcGxlYmFyLXNjcm9sbGJhciB7XG4gIHJpZ2h0OiBhdXRvO1xuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG4gIGJvdHRvbTogMDtcbiAgbWluLWhlaWdodDogMDtcbiAgbWluLXdpZHRoOiAxMHB4O1xuICB3aWR0aDogYXV0bztcbn1cblxuLyogUnRsIHN1cHBvcnQgKi9cbltkYXRhLXNpbXBsZWJhci1kaXJlY3Rpb249cnRsXSAuc2ltcGxlYmFyLXRyYWNrLnNpbXBsZWJhci12ZXJ0aWNhbCB7XG4gIHJpZ2h0OiBhdXRvO1xuICBsZWZ0OiAwO1xufVxuXG4uc2ltcGxlYmFyLWR1bW15LXNjcm9sbGJhci1zaXplIHtcbiAgZGlyZWN0aW9uOiBydGw7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgb3BhY2l0eTogMDtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICBoZWlnaHQ6IDUwMHB4O1xuICB3aWR0aDogNTAwcHg7XG4gIG92ZXJmbG93LXk6IGhpZGRlbjtcbiAgb3ZlcmZsb3cteDogc2Nyb2xsO1xuICAtbXMtb3ZlcmZsb3ctc3R5bGU6IHNjcm9sbGJhciAhaW1wb3J0YW50O1xufVxuXG4uc2ltcGxlYmFyLWR1bW15LXNjcm9sbGJhci1zaXplID4gZGl2IHtcbiAgd2lkdGg6IDIwMCU7XG4gIGhlaWdodDogMjAwJTtcbiAgbWFyZ2luOiAxMHB4IDA7XG59XG5cbi5zaW1wbGViYXItaGlkZS1zY3JvbGxiYXIge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGxlZnQ6IDA7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuICBzY3JvbGxiYXItd2lkdGg6IG5vbmU7XG4gIC1tcy1vdmVyZmxvdy1zdHlsZTogbm9uZTtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL25vZGVfbW9kdWxlcy9zaW1wbGViYXIvZGlzdC9zaW1wbGViYXIuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0Usa0JBQUE7RUFDQSxzQkFBQTtFQUNBLGVBQUE7RUFDQSwyQkFBQTtFQUNBLHlCQUFBO0VBQ0EsdUJBQUE7QUFDRjs7QUFFQTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLE9BQUE7RUFDQSxNQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0EsVUFBQTtBQUNGOztBQUVBO0VBQ0UsNkJBQUE7RUFDQSw4QkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFNBQUE7RUFDQSxRQUFBO0VBQ0EsVUFBQTtFQUNBLFNBQUE7RUFDQSxpQ0FBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxpQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLFlBQUEsRUFBQSxtR0FBQTtFQUNBLFdBQUE7RUFDQSxlQUFBLEVBQUEsa0RBQUE7RUFDQSxnQkFBQSxFQUFBLDBDQUFBO0VBQ0EsY0FBQTtFQUNBLHFCQUFBO0VBQ0Esd0JBQUE7QUFDRjs7QUFFQTs7RUFFRSxhQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7QUFDRjs7QUFFQTs7RUFFRSxZQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUVBO0VBQ0UsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtFQUNBLG9CQUFBO0FBQ0Y7O0FBRUE7RUFDRSw4QkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLG9CQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0VBQ0EsYUFBQTtBQUNGOztBQUVBO0VBQ0UsbUJBQUE7RUFDQSxjQUFBO0VBQ0EsVUFBQTtFQUNBLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLE9BQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQkFBQTtFQUNBLFdBQUE7QUFDRjs7QUFFQTtFQUNFLFVBQUE7RUFDQSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0Esb0JBQUE7RUFDQSxnQkFBQTtBQUNGOztBQUVBO0VBQ0Usb0JBQUE7RUFDQSwyQkFBQTtFQUNBLHlCQUFBO0VBQ0Esd0JBQUE7RUFDQSxzQkFBQTtFQUNBLHFCQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLG9CQUFBO0VBQ0EsMkJBQUE7RUFDQSx5QkFBQTtFQUNBLHdCQUFBO0VBQ0Esc0JBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxtQkFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSxVQUFBO0VBQ0Esb0NBQUE7QUFDRjs7QUFFQTtFQUNFLFlBQUE7RUFDQSxvQkFBQTtFQUNBLHVCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxNQUFBO0VBQ0EsV0FBQTtBQUNGOztBQUVBO0VBQ0UsUUFBQTtFQUNBLFdBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtBQUNGOztBQUVBO0VBQ0UsT0FBQTtFQUNBLFlBQUE7QUFDRjs7QUFFQTtFQUNFLFdBQUE7RUFDQSxPQUFBO0VBQ0EsTUFBQTtFQUNBLFNBQUE7RUFDQSxhQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7QUFDRjs7QUFFQSxnQkFBQTtBQUNBO0VBQ0UsV0FBQTtFQUNBLE9BQUE7QUFDRjs7QUFFQTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0EsVUFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0Esd0NBQUE7QUFDRjs7QUFFQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUVBO0VBQ0UsZUFBQTtFQUNBLE9BQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSx3QkFBQTtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIltkYXRhLXNpbXBsZWJhcl0ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIGFsaWduLWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG59XFxuXFxuLnNpbXBsZWJhci13cmFwcGVyIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB3aWR0aDogaW5oZXJpdDtcXG4gIGhlaWdodDogaW5oZXJpdDtcXG4gIG1heC13aWR0aDogaW5oZXJpdDtcXG4gIG1heC1oZWlnaHQ6IGluaGVyaXQ7XFxufVxcblxcbi5zaW1wbGViYXItbWFzayB7XFxuICBkaXJlY3Rpb246IGluaGVyaXQ7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDA7XFxuICBib3R0b206IDA7XFxuICByaWdodDogMDtcXG4gIHdpZHRoOiBhdXRvICFpbXBvcnRhbnQ7XFxuICBoZWlnaHQ6IGF1dG8gIWltcG9ydGFudDtcXG4gIHotaW5kZXg6IDA7XFxufVxcblxcbi5zaW1wbGViYXItb2Zmc2V0IHtcXG4gIGRpcmVjdGlvbjogaW5oZXJpdCAhaW1wb3J0YW50O1xcbiAgYm94LXNpemluZzogaW5oZXJpdCAhaW1wb3J0YW50O1xcbiAgcmVzaXplOiBub25lICFpbXBvcnRhbnQ7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xcbn1cXG5cXG4uc2ltcGxlYmFyLWNvbnRlbnQtd3JhcHBlciB7XFxuICBkaXJlY3Rpb246IGluaGVyaXQ7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94ICFpbXBvcnRhbnQ7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGhlaWdodDogMTAwJTsgLyogUmVxdWlyZWQgZm9yIGhvcml6b250YWwgbmF0aXZlIHNjcm9sbGJhciB0byBub3QgYXBwZWFyIGlmIHBhcmVudCBpcyB0YWxsZXIgdGhhbiBuYXR1cmFsIGhlaWdodCAqL1xcbiAgd2lkdGg6IGF1dG87XFxuICBtYXgtd2lkdGg6IDEwMCU7IC8qIE5vdCByZXF1aXJlZCBmb3IgaG9yaXpvbnRhbCBzY3JvbGwgdG8gdHJpZ2dlciAqL1xcbiAgbWF4LWhlaWdodDogMTAwJTsgLyogTmVlZGVkIGZvciB2ZXJ0aWNhbCBzY3JvbGwgdG8gdHJpZ2dlciAqL1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBzY3JvbGxiYXItd2lkdGg6IG5vbmU7XFxuICAtbXMtb3ZlcmZsb3ctc3R5bGU6IG5vbmU7XFxufVxcblxcbi5zaW1wbGViYXItY29udGVudC13cmFwcGVyOjotd2Via2l0LXNjcm9sbGJhcixcXG4uc2ltcGxlYmFyLWhpZGUtc2Nyb2xsYmFyOjotd2Via2l0LXNjcm9sbGJhciB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgd2lkdGg6IDA7XFxuICBoZWlnaHQ6IDA7XFxufVxcblxcbi5zaW1wbGViYXItY29udGVudDpiZWZvcmUsXFxuLnNpbXBsZWJhci1jb250ZW50OmFmdGVyIHtcXG4gIGNvbnRlbnQ6ICcgJztcXG4gIGRpc3BsYXk6IHRhYmxlO1xcbn1cXG5cXG4uc2ltcGxlYmFyLXBsYWNlaG9sZGVyIHtcXG4gIG1heC1oZWlnaHQ6IDEwMCU7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG5cXG4uc2ltcGxlYmFyLWhlaWdodC1hdXRvLW9ic2VydmVyLXdyYXBwZXIge1xcbiAgYm94LXNpemluZzogaW5oZXJpdCAhaW1wb3J0YW50O1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXgtd2lkdGg6IDFweDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgbWF4LWhlaWdodDogMXB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHotaW5kZXg6IC0xO1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgZmxleC1ncm93OiBpbmhlcml0O1xcbiAgZmxleC1zaHJpbms6IDA7XFxuICBmbGV4LWJhc2lzOiAwO1xcbn1cXG5cXG4uc2ltcGxlYmFyLWhlaWdodC1hdXRvLW9ic2VydmVyIHtcXG4gIGJveC1zaXppbmc6IGluaGVyaXQ7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG9wYWNpdHk6IDA7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgaGVpZ2h0OiAxMDAwJTtcXG4gIHdpZHRoOiAxMDAwJTtcXG4gIG1pbi1oZWlnaHQ6IDFweDtcXG4gIG1pbi13aWR0aDogMXB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgei1pbmRleDogLTE7XFxufVxcblxcbi5zaW1wbGViYXItdHJhY2sge1xcbiAgei1pbmRleDogMTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHJpZ2h0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG5bZGF0YS1zaW1wbGViYXJdLnNpbXBsZWJhci1kcmFnZ2luZyB7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcblxcbltkYXRhLXNpbXBsZWJhcl0uc2ltcGxlYmFyLWRyYWdnaW5nIC5zaW1wbGViYXItY29udGVudCB7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcblxcbltkYXRhLXNpbXBsZWJhcl0uc2ltcGxlYmFyLWRyYWdnaW5nIC5zaW1wbGViYXItdHJhY2sge1xcbiAgcG9pbnRlci1ldmVudHM6IGFsbDtcXG59XFxuXFxuLnNpbXBsZWJhci1zY3JvbGxiYXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgbWluLWhlaWdodDogMTBweDtcXG59XFxuXFxuLnNpbXBsZWJhci1zY3JvbGxiYXI6YmVmb3JlIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgYmFja2dyb3VuZDogYmxhY2s7XFxuICBib3JkZXItcmFkaXVzOiA3cHg7XFxuICBsZWZ0OiAycHg7XFxuICByaWdodDogMnB4O1xcbiAgb3BhY2l0eTogMDtcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyAwLjVzIGxpbmVhcjtcXG59XFxuXFxuLnNpbXBsZWJhci1zY3JvbGxiYXIuc2ltcGxlYmFyLXZpc2libGU6YmVmb3JlIHtcXG4gIG9wYWNpdHk6IDAuNTtcXG4gIHRyYW5zaXRpb24tZGVsYXk6IDBzO1xcbiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMHM7XFxufVxcblxcbi5zaW1wbGViYXItdHJhY2suc2ltcGxlYmFyLXZlcnRpY2FsIHtcXG4gIHRvcDogMDtcXG4gIHdpZHRoOiAxMXB4O1xcbn1cXG5cXG4uc2ltcGxlYmFyLXNjcm9sbGJhcjpiZWZvcmUge1xcbiAgdG9wOiAycHg7XFxuICBib3R0b206IDJweDtcXG4gIGxlZnQ6IDJweDtcXG4gIHJpZ2h0OiAycHg7XFxufVxcblxcbi5zaW1wbGViYXItdHJhY2suc2ltcGxlYmFyLWhvcml6b250YWwge1xcbiAgbGVmdDogMDtcXG4gIGhlaWdodDogMTFweDtcXG59XFxuXFxuLnNpbXBsZWJhci10cmFjay5zaW1wbGViYXItaG9yaXpvbnRhbCAuc2ltcGxlYmFyLXNjcm9sbGJhciB7XFxuICByaWdodDogYXV0bztcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDA7XFxuICBib3R0b206IDA7XFxuICBtaW4taGVpZ2h0OiAwO1xcbiAgbWluLXdpZHRoOiAxMHB4O1xcbiAgd2lkdGg6IGF1dG87XFxufVxcblxcbi8qIFJ0bCBzdXBwb3J0ICovXFxuW2RhdGEtc2ltcGxlYmFyLWRpcmVjdGlvbj0ncnRsJ10gLnNpbXBsZWJhci10cmFjay5zaW1wbGViYXItdmVydGljYWwge1xcbiAgcmlnaHQ6IGF1dG87XFxuICBsZWZ0OiAwO1xcbn1cXG5cXG4uc2ltcGxlYmFyLWR1bW15LXNjcm9sbGJhci1zaXplIHtcXG4gIGRpcmVjdGlvbjogcnRsO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgb3BhY2l0eTogMDtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIGhlaWdodDogNTAwcHg7XFxuICB3aWR0aDogNTAwcHg7XFxuICBvdmVyZmxvdy15OiBoaWRkZW47XFxuICBvdmVyZmxvdy14OiBzY3JvbGw7XFxuICAtbXMtb3ZlcmZsb3ctc3R5bGU6IHNjcm9sbGJhciAhaW1wb3J0YW50O1xcbn1cXG5cXG4uc2ltcGxlYmFyLWR1bW15LXNjcm9sbGJhci1zaXplID4gZGl2IHtcXG4gIHdpZHRoOiAyMDAlO1xcbiAgaGVpZ2h0OiAyMDAlO1xcbiAgbWFyZ2luOiAxMHB4IDA7XFxufVxcblxcbi5zaW1wbGViYXItaGlkZS1zY3JvbGxiYXIge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgbGVmdDogMDtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcXG4gIHNjcm9sbGJhci13aWR0aDogbm9uZTtcXG4gIC1tcy1vdmVyZmxvdy1zdHlsZTogbm9uZTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xudmFyIF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIik7XG52YXIgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIik7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PU1vbnRzZXJyYXQ6MzAwLHJlZ3VsYXIsNzAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9Um9ib3RvK0ZsZXg6cmVndWxhciw1MDAsNjAwLDgwMCZkaXNwbGF5PXN3YXApO1wiXSk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PU51bml0bzpyZWd1bGFyLDUwMCw2MDAsNzAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgKixcbio6OmJlZm9yZSxcbio6OmFmdGVyIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuaHRtbCB7XG4gIGZvbnQtZmFtaWx5OiBcIlJvYm90byBGbGV4XCI7XG4gIGZvbnQtc2l6ZTogMC41MjA4MzM1dnc7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgLXdlYmtpdC1hbmltYXRpb246IGJ1Z2ZpeCBpbmZpbml0ZSAxcztcbiAgbGluZS1oZWlnaHQ6IDEuMjtcbiAgbWFyZ2luOiAwO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHBhZGRpbmc6IDA7XG59XG5cbmJvZHkge1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIC13ZWJraXQtYW5pbWF0aW9uOiBidWdmaXggaW5maW5pdGUgMXM7XG4gIGxpbmUtaGVpZ2h0OiAxLjI7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbiAgaGVpZ2h0OiAxMDAlO1xuICBmb250LXNpemU6IDEuOHJlbTtcbiAgY29sb3I6ICMyZTJlMmU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZmYxZjM7XG59XG5cbmlucHV0LFxudGV4dGFyZWEge1xuICAtd2Via2l0LWFuaW1hdGlvbjogYnVnZml4IGluZmluaXRlIDFzO1xuICBsaW5lLWhlaWdodDogaW5oZXJpdDtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICBjb2xvcjogaW5oZXJpdDtcbn1cblxuYSB7XG4gIGNvbG9yOiB1bnNldDtcbn1cblxuYSxcbmE6aG92ZXIge1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG5cbmJ1dHRvbixcbmlucHV0LFxuYSxcbnRleHRhcmVhIHtcbiAgb3V0bGluZTogbm9uZTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmb250OiBpbmhlcml0O1xufVxuYnV0dG9uOmZvY3VzLFxuaW5wdXQ6Zm9jdXMsXG5hOmZvY3VzLFxudGV4dGFyZWE6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xufVxuYnV0dG9uOmFjdGl2ZSxcbmlucHV0OmFjdGl2ZSxcbmE6YWN0aXZlLFxudGV4dGFyZWE6YWN0aXZlIHtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuaDEsXG5oMixcbmgzLFxuaDQsXG5oNSxcbmg2IHtcbiAgZm9udDogaW5oZXJpdDtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xufVxuXG5wIHtcbiAgbWFyZ2luLXRvcDogMDtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbn1cblxuaW1nIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbmJ1dHRvbiB7XG4gIGJvcmRlcjogbm9uZTtcbiAgY29sb3I6IGluaGVyaXQ7XG4gIGZvbnQ6IGluaGVyaXQ7XG4gIHRleHQtYWxpZ246IGluaGVyaXQ7XG4gIHBhZGRpbmc6IDA7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG51bCB7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbn1cblxudWwgbGkge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG59XG5cbi5jb250YWluZXIge1xuICB3aWR0aDogMTU2cmVtO1xuICBtYXJnaW46IDAgYXV0bztcbn1cblxuaW5wdXRbdHlwZT1udW1iZXJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxuaW5wdXRbdHlwZT1udW1iZXJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICBtYXJnaW46IDA7XG59XG5cbmlucHV0W3R5cGU9bnVtYmVyXSB7XG4gIC1tb3otYXBwZWFyYW5jZTogdGV4dGZpZWxkO1xufVxuXG5zdmcsXG5pbWcge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiBhdXRvO1xuICBvYmplY3QtZml0OiBjb250YWluO1xufVxuaHRtbC5sb2NrLFxuaHRtbC5sb2NrIGJvZHkge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0b3VjaC1hY3Rpb246IG5vbmU7XG59XG5cbmh0bWwsXG5ib2R5IHtcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xufVxuXG5tYWluIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4ud3JhcHBlciB7XG4gIG1hcmdpbjogMCBhdXRvO1xuICBtYXgtd2lkdGg6IDE5MjBweDtcbn1cblxuLmgge1xuICBmb250LWZhbWlseTogXCJOdW5pdG9cIjtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgbGluZS1oZWlnaHQ6IDEyMCU7XG59XG4uaF9oMSB7XG4gIGZvbnQtc2l6ZTogNnJlbTtcbn1cbi5oX2gyIHtcbiAgZm9udC1zaXplOiAzLjRyZW07XG59XG4uaF9oMyB7XG4gIGZvbnQtc2l6ZTogMi40cmVtO1xufVxuXG4udHh0MTYge1xuICBsaW5lLWhlaWdodDogMTIwJTtcbn1cbi50eHQxNl9jYXBzIHtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cblxuaW5wdXRbdHlwZT10ZXh0XSxcbmlucHV0W3R5cGU9ZW1haWxdLFxuaW5wdXRbdHlwZT10ZWxdLFxudGV4dGFyZWEge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gIC1tb3otYXBwZWFyYW5jZTogbm9uZTtcbiAgYXBwZWFyYW5jZTogbm9uZTtcbn1cblxudGV4dGFyZWE6Zm9jdXMsXG5pbnB1dDpmb2N1cyB7XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbi5pbnB1dCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgcm93LWdhcDogMS4ycmVtO1xufVxuLmlucHV0X19maWVsZCB7XG4gIHBhZGRpbmc6IDEuNnJlbSAycmVtO1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXJhZGl1czogMS42cmVtO1xuICB0cmFuc2l0aW9uOiBjb2xvciAwLjNzIGVhc2UsIGJvcmRlciAwLjNzIGVhc2U7XG59XG4uaW5wdXRfX2ZpZWxkOjpwbGFjZWhvbGRlciB7XG4gIGNvbG9yOiAjODk4ZTlmO1xuICB0cmFuc2l0aW9uOiBjb2xvciAwLjNzIGVhc2U7XG59XG4uaW5wdXRfX2xhYmVsIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGNvbHVtbi1nYXA6IDNyZW07XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG4uaW5wdXQuX2hhcy1mb2N1cyAuaW5wdXRfX2ZpZWxkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgIzAwMDAwMDtcbn1cbi5pbnB1dC5faGFzLWVycm9yIC5pbnB1dF9fbGFiZWwge1xuICBjb2xvcjogdHJhbnNwYXJlbnQ7XG59XG4uaW5wdXQuX2hhcy1lcnJvciAuaW5wdXRfX2xhYmVsOjphZnRlciB7XG4gIGNvbnRlbnQ6IGF0dHIoZGF0YS1oaW50KTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIGNvbG9yOiAjZDc2OTdkO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuLmlucHV0Ll9oYXMtZXJyb3IgLmlucHV0X19maWVsZCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkNzY5N2Q7XG4gIGNvbG9yOiAjZDc2OTdkO1xufVxuLmlucHV0Ll9oYXMtZXJyb3IgLmlucHV0X19maWVsZDo6cGxhY2Vob2xkZXIge1xuICBjb2xvcjogI2Q3Njk3ZDtcbn1cblxuLmRyb3Bkb3duIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgcm93LWdhcDogMS4ycmVtO1xufVxuLmRyb3Bkb3duX19sYWJlbCB7XG4gIGNvbG9yOiAjZTllY2Y1O1xufVxuXG4uc2VsZWN0IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLnNlbGVjdF9fYm9keSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi5zZWxlY3RfX3RpdGxlIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB6LWluZGV4OiAzO1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyLXJhZGl1czogMS42cmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uc2VsZWN0X192YWx1ZSB7XG4gIHBhZGRpbmc6IDEuNnJlbSAycmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDFyZW07XG4gIGhlaWdodDogNS42cmVtO1xuICB3aWR0aDogMTAwJTtcbn1cbi5zZWxlY3RfX3ZhbHVlID4gKiB7XG4gIGZsZXg6IDEgMSBhdXRvO1xufVxuLnNlbGVjdF9fdmFsdWU6OmFmdGVyIHtcbiAgY29udGVudDogXCJcIjtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmbGV4OiAwIDAgMnJlbTtcbiAgd2lkdGg6IDJyZW07XG4gIGhlaWdodDogMnJlbTtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vYXNzZXRzL2ltYWdlcy9pY29ucy9zZWwtYXJyLnN2Zyk7XG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlO1xufVxuLnNlbGVjdF9fdmFsdWUuX2hhcy1sYWJlbDo6YmVmb3JlIHtcbiAgY29udGVudDogYXR0cihkYXRhLXNlbC1sYWJlbCk7XG4gIHRyYW5zaXRpb246IGNvbG9yIDAuM3MgZWFzZTtcbn1cbi5zZWxlY3RfX3ZhbHVlLl9oYXMtbGFiZWw6OmJlZm9yZSxcbi5zZWxlY3RfX3ZhbHVlIC5zZWxlY3RfX2NvbnRlbnQge1xuICBtYXgtd2lkdGg6IDMxLjRyZW07XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xufVxuLnNlbGVjdF9fY29udGVudCB7XG4gIG1hcmdpbi1yaWdodDogYXV0bztcbn1cbi5zZWxlY3RfX3RleHQge1xuICBmbGV4OiAxIDEgYXV0bztcbn1cbi5zZWxlY3RfX2lucHV0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG4uc2VsZWN0X19vcHRpb25zIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiAyO1xuICB0b3A6IGNhbGMoMTAwJSArIDAuOHJlbSk7XG4gIGxlZnQ6IDA7XG4gIHBhZGRpbmc6IDJyZW07XG4gIG1pbi13aWR0aDogMTAwJTtcbiAgYm9yZGVyLXJhZGl1czogMS42cmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICBib3gtc2hhZG93OiAwIDAgMnJlbSByZ2JhKDUyLCA1MiwgNTIsIDAuMTUpO1xufVxuLnNlbGVjdF9fc2Nyb2xsIHtcbiAgbWF4LWhlaWdodDogMTlyZW07XG59XG4uc2VsZWN0X19zY3JvbGwuc2ltcGxlYmFyLXNjcm9sbGFibGUteSAuc2ltcGxlYmFyLXRyYWNrLnNpbXBsZWJhci12ZXJ0aWNhbCB7XG4gIHJpZ2h0OiAxLjJyZW07XG4gIHdpZHRoOiAwLjRyZW07XG4gIGJvcmRlci1yYWRpdXM6IDAuOHJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U0ZTdlZTtcbn1cbi5zZWxlY3RfX3Njcm9sbC5zaW1wbGViYXItc2Nyb2xsYWJsZS15IC5zaW1wbGViYXItc2Nyb2xsYmFyIHtcbiAgbWluLWhlaWdodDogMy4ycmVtO1xuICBib3JkZXItcmFkaXVzOiAwLjhyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICNhMmFkYzE7XG59XG4uc2VsZWN0X19vcHRpb24ge1xuICBwYWRkaW5nOiAxLjVyZW0gMDtcbiAgd2lkdGg6IDEwMCU7XG4gIHRyYW5zaXRpb246IGNvbG9yIDAuM3MgZWFzZTtcbn1cbi5zZWxlY3RfX29wdGlvbjpmaXJzdC1jaGlsZCB7XG4gIHBhZGRpbmctdG9wOiAwO1xufVxuLnNlbGVjdF9fb3B0aW9uOmxhc3QtY2hpbGQge1xuICBwYWRkaW5nLWJvdHRvbTogMDtcbn1cbi5zZWxlY3RfX29wdGlvbi5faXMtc2VsZWN0ZWQge1xuICBmb250LXdlaWdodDogNTAwO1xufVxuLnNlbGVjdF9fZ3JvdXAge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4tcmV2ZXJzZTtcbn1cbi5zZWxlY3RfX3N1YnRpdGxlIHtcbiAgY3Vyc29yOiB0ZXh0O1xufVxuLnNlbGVjdC5faXMtb3BlbmVkIHtcbiAgei1pbmRleDogNTtcbn1cbi5zZWxlY3QuX2lzLW9wZW5lZCAuc2VsZWN0X192YWx1ZTo6YWZ0ZXIge1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgtMTgwZGVnKTtcbn1cbi5zZWxlY3QuX2hhcy1lcnJvcjpub3QoLnNlbGVjdC5faGFzLWVycm9yLl9pcy1maWxsZWQsIC5zZWxlY3QuX2hhcy1lcnJvci5faXMtb3BlbmVkKSAuc2VsZWN0X192YWx1ZS5fc2VsZWN0LWxhYmVsOjpiZWZvcmUge1xuICBjb2xvcjogI2Q3Njk3ZDtcbn1cblxuLl9zZWxlY3QtbGlzdCB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmFjY29yZGlvbiB7XG4gIG1hcmdpbjogM3JlbSBhdXRvO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICByb3ctZ2FwOiAxcmVtO1xuICBtYXgtd2lkdGg6IDgwcmVtO1xufVxuLmFjY29yZGlvbl9faXRlbSB7XG4gIGJvcmRlci1yYWRpdXM6IDIuNHJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbn1cbi5hY2NvcmRpb25fX3RpdGxlIHtcbiAgcGFkZGluZzogMi40cmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHdpZHRoOiAxMDAlO1xufVxuLmFjY29yZGlvbl9fdGl0bGUuX2FjY29yZGlvbi1hY3RpdmUgLmFyciBzdmcge1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgtOTBkZWcpO1xufVxuLmFjY29yZGlvbl9fdGl0bGUuX2FjY29yZGlvbi1hY3RpdmUgLmFyciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM2OTgxZDc7XG59XG4uYWNjb3JkaW9uX190aXRsZSAuYXJyIHtcbiAgZmxleDogMCAwIDVyZW07XG4gIHdpZHRoOiA1cmVtO1xuICBoZWlnaHQ6IDVyZW07XG59XG4uYWNjb3JkaW9uX19ib2R5IHtcbiAgcGFkZGluZzogMi40cmVtO1xuICBwYWRkaW5nLXRvcDogMDtcbn1cbi5hY2NvcmRpb25fX3RleHQge1xuICBjb2xvcjogcmdiKDEzMiwgMTMyLCAxMzIpO1xufVxuLmFjY29yZGlvbl9fdGV4dDpub3QoOmxhc3QtY2hpbGQpIHtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbn1cblxuLmZvcm0ge1xuICBtYXJnaW46IDNyZW0gYXV0bztcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcm93LWdhcDogMnJlbTtcbiAgbWF4LXdpZHRoOiA4MHJlbTtcbn1cbi5mb3JtX19maWVsZHMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBjb2x1bW4tZ2FwOiAycmVtO1xufVxuXG4uYnRuIHtcbiAgcGFkZGluZzogMS42cmVtIDMuMnJlbTtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBjb2x1bW4tZ2FwOiAxLjZyZW07XG4gIGJvcmRlci1yYWRpdXM6IDVyZW07XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xufVxuXG4udGFicyB7XG4gIG1hcmdpbjogNnJlbSBhdXRvO1xuICBtYXgtd2lkdGg6IDgwcmVtO1xufVxuLnRhYnNfX25hdmlnYXRpb24ge1xuICBtYXJnaW4tYm90dG9tOiAzcmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgY29sdW1uLWdhcDogMnJlbTtcbn1cbi50YWJzX19ib2R5IHtcbiAgcGFkZGluZzogM3JlbTtcbiAgYm9yZGVyLXJhZGl1czogM3JlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNCk7XG59XG5cbi5kcm9wZG93bnMge1xuICBtYXJnaW46IDNyZW0gYXV0bztcbiAgbWF4LXdpZHRoOiA4MHJlbTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgcm93LWdhcDogMXJlbTtcbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDQ4ZW0pe1xuICAudHh0MTYge1xuICAgIGZvbnQtc2l6ZTogMS42cmVtO1xuICB9XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiAxOTIwcHgpe1xuICBodG1sIHtcbiAgICBmb250LXNpemU6IDEwcHg7XG4gIH1cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pe1xuICBodG1sIHtcbiAgICBmb250LXNpemU6IDVweDtcbiAgICBmb250LXNpemU6IDEuNTYyNXZ3O1xuICAgIGZvbnQtc2l6ZTogMS4zMzMzMzMzMzMzdnc7XG4gICAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiBub25lO1xuICB9XG4gIGJvZHkge1xuICAgIGZvbnQtc2l6ZTogM3JlbTtcbiAgICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IG5vbmU7XG4gIH1cbiAgLmNvbnRhaW5lciB7XG4gICAgcGFkZGluZzogMCAzLjJyZW07XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbiAgLmhfaDIge1xuICAgIGZvbnQtc2l6ZTogNC40cmVtO1xuICB9XG4gIC5oX2gzIHtcbiAgICBmb250LXNpemU6IDMuNnJlbTtcbiAgfVxuICAuaW5wdXQge1xuICAgIHJvdy1nYXA6IDEuNnJlbTtcbiAgfVxuICAuaW5wdXRfX2ZpZWxkIHtcbiAgICBwYWRkaW5nOiAyLjRyZW0gMy42cmVtO1xuICAgIGJvcmRlci1yYWRpdXM6IDMuMnJlbTtcbiAgfVxuICAuZHJvcGRvd24ge1xuICAgIHJvdy1nYXA6IDEuNnJlbTtcbiAgfVxuICAuc2VsZWN0X190aXRsZSB7XG4gICAgYm9yZGVyLXJhZGl1czogMy4ycmVtO1xuICB9XG4gIC5zZWxlY3RfX3ZhbHVlIHtcbiAgICBwYWRkaW5nOiAyLjRyZW0gMy4ycmVtO1xuICAgIGdhcDogNHJlbTtcbiAgICBoZWlnaHQ6IDguOHJlbTtcbiAgfVxuICAuc2VsZWN0X192YWx1ZTo6YWZ0ZXIge1xuICAgIGZsZXg6IDAgMCAzLjJyZW07XG4gICAgd2lkdGg6IDMuMnJlbTtcbiAgICBoZWlnaHQ6IDMuMnJlbTtcbiAgfVxuICAuc2VsZWN0X19vcHRpb25zIHtcbiAgICBwYWRkaW5nOiAzLjJyZW07XG4gICAgYm9yZGVyLXJhZGl1czogMy4ycmVtO1xuICB9XG4gIC5zZWxlY3RfX29wdGlvbiB7XG4gICAgcGFkZGluZzogMi40cmVtIDA7XG4gIH1cbiAgLmFjY29yZGlvbl9faXRlbSB7XG4gICAgYm9yZGVyLXJhZGl1czogNXJlbTtcbiAgfVxuICAuYWNjb3JkaW9uX190aXRsZSB7XG4gICAgcGFkZGluZzogMy4ycmVtO1xuICB9XG4gIC5hY2NvcmRpb25fX3RpdGxlIC5hcnIge1xuICAgIGZsZXg6IDAgMCA5cmVtO1xuICAgIHdpZHRoOiA5cmVtO1xuICAgIGhlaWdodDogOXJlbTtcbiAgfVxuICAuYWNjb3JkaW9uX19ib2R5IHtcbiAgICBwYWRkaW5nOiAzLjJyZW07XG4gICAgcGFkZGluZy10b3A6IDA7XG4gIH1cbn1cblxuQG1lZGlhIChhbnktaG92ZXI6IGhvdmVyKXtcbiAgLnNlbGVjdF9fb3B0aW9uOmhvdmVyOm5vdCguc2VsZWN0X19vcHRpb246aG92ZXIuc2VsZWN0X19zdWJ0aXRsZSkge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuICAuYWNjb3JkaW9uX190aXRsZSAuYXJyOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNjk4MWQ3O1xuICB9XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9zZXQuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3Mvc3R5bGUuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3VpL3N0eWxlcy9fdHlwby5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvdWkvc3R5bGVzL19pbnB1dC5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvdWkvc3R5bGVzL19zZWxlY3Quc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3VpL3N0eWxlcy9fYWNjb3JkaW9uLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy91aS9zdHlsZXMvdWkuc2Nzc1wiLFwiPG5vIHNvdXJjZT5cIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7OztFQUdJLHNCQUFBO0FDSUo7O0FERkE7RUFDSSwwQkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLHFDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxTQUFBO0VBQ0EsWUFBQTtFQUNBLFVBQUE7QUNLSjs7QURGQTtFQUNJLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQ2pCUTtFRGtCUix5QkNqQk07QUFzQlY7O0FERkE7O0VBRUkscUNBQUE7RUFDQSxvQkFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0VBQ0EsNkJBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtBQ0tKOztBREhBO0VBQ0ksWUFBQTtBQ01KOztBREpBOztFQUVJLHFCQUFBO0FDT0o7O0FESkE7Ozs7RUFJSSxhQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7QUNPSjtBRE5JOzs7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Y0o7RUl4Y0E7SUF5QkksZUFBQTtFSjJjSjtFSTFjSTtJQUNFLGNBQUE7SUFDQSxXQUFBO0lBQ0EsWUFBQTtFSjRjTjtFSWhjQTtJQUlJLGVBQUE7SUFDQSxjQUFBO0VKcWNKO0FBd0JGOztBTTloQkE7RUhnTFE7SUFDRSxlQUFBO0VIK1BSO0VJMVlNO0lBQ0UseUJKNUJIO0VBdWVMO0FBcURGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIiosXFxuKjo6YmVmb3JlLFxcbio6OmFmdGVyIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuaHRtbCB7XFxuICAgIGZvbnQtZmFtaWx5OiAnUm9ib3RvIEZsZXgnOyAvLyDRiNGA0LjRhNGCINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOINC/0L4g0YHQsNC50YLRg1xcbiAgICBmb250LXNpemU6IDAuNTIwODMzNXZ3OyAvLyDQvdCwINGA0LDQt9GA0LXRiNC10L3QuNC4IDE5MjAgMC41MjA4MzV2dyA9PT0gMTBweFxcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBidWdmaXggaW5maW5pdGUgMXM7XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjI7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBwYWRkaW5nOiAwO1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogYnVnZml4IGluZmluaXRlIDFzO1xcbiAgICBsaW5lLWhlaWdodDogMS4yO1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgZm9udC1zaXplOiAxLjhyZW07XFxuICAgIGNvbG9yOiAkZm9udENvbG9yOyAvLyDRhtCy0LXRgiDQv9C+INGD0LzQvtC70YfQsNC90LjRjiDRgtC10LrRgdGC0LAg0L/QviDRgdCw0LnRgtGDXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRiZ0NvbG9yO1xcbn1cXG5cXG5pbnB1dCxcXG50ZXh0YXJlYSB7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBidWdmaXggaW5maW5pdGUgMXM7XFxuICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGNvbG9yOiBpbmhlcml0O1xcbn1cXG5hIHtcXG4gICAgY29sb3I6IHVuc2V0O1xcbn1cXG5hLFxcbmE6aG92ZXIge1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxufVxcblxcbmJ1dHRvbixcXG5pbnB1dCxcXG5hLFxcbnRleHRhcmVhIHtcXG4gICAgb3V0bGluZTogbm9uZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBmb250OiBpbmhlcml0O1xcbiAgICAmOmZvY3VzIHtcXG4gICAgICAgIG91dGxpbmU6IG5vbmU7XFxuICAgIH1cXG4gICAgJjphY3RpdmUge1xcbiAgICAgICAgb3V0bGluZTogbm9uZTtcXG4gICAgfVxcbn1cXG5cXG5oMSxcXG5oMixcXG5oMyxcXG5oNCxcXG5oNSxcXG5oNiB7XFxuICAgIGZvbnQ6IGluaGVyaXQ7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG59XFxucCB7XFxuICAgIG1hcmdpbi10b3A6IDA7XFxuICAgIG1hcmdpbi1ib3R0b206IDA7XFxufVxcblxcbmltZyB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG5idXR0b24ge1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGNvbG9yOiBpbmhlcml0O1xcbiAgICBmb250OiBpbmhlcml0O1xcbiAgICB0ZXh0LWFsaWduOiBpbmhlcml0O1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxudWwge1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBtYXJnaW46IDA7XFxufVxcblxcbnVsIGxpIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5cXG4uY29udGFpbmVyIHtcXG4gICAgd2lkdGg6IDE1NnJlbTtcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxufVxcblxcbmlucHV0W3R5cGU9J251bWJlciddOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxcbmlucHV0W3R5cGU9J251bWJlciddOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcXG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbiAgICBtYXJnaW46IDA7XFxufVxcblxcbmlucHV0W3R5cGU9J251bWJlciddIHtcXG4gICAgLW1vei1hcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7XFxufVxcblxcbnN2ZyxcXG5pbWcge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgICBvYmplY3QtZml0OiBjb250YWluO1xcbn1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogMTkyMHB4KSB7XFxuICAgIGh0bWwge1xcbiAgICAgICAgZm9udC1zaXplOiAxMHB4O1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA0OGVtKSB7XFxuICAgIGh0bWwge1xcbiAgICAgICAgZm9udC1zaXplOiA1cHg7XFxuICAgICAgICBmb250LXNpemU6IDEuNTYyNXZ3O1xcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCgxMDAgLyAzNzUpICogNXZ3KTsgLy8g0LPQtNC1IDM3NSDRjdGC0L4g0YjQuNGA0LjQvdCwINC80L7QsSDQstC10YDRgdC40Lgg0LzQsNC60LXRgtCwXFxuICAgICAgICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IG5vbmU7XFxuICAgIH1cXG5cXG4gICAgYm9keSB7XFxuICAgICAgICBmb250LXNpemU6IDNyZW07XFxuICAgICAgICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IG5vbmU7XFxuICAgIH1cXG5cXG4gICAgLmNvbnRhaW5lciB7XFxuICAgICAgICBwYWRkaW5nOiAwIDMuMnJlbTsgLy8g0LIg0LzQvtCxINCy0LXRgNGB0LjQuCDQvtGC0YHRgtGD0L8g0L7RgiDQutGA0LDRjyDQt9Cw0LTQsNC10Lwg0LTQu9GPINCy0YHQtdGFINC60L7QvdGC0LXQudC90LXRgNC+0LIsINCwINGC0LDQvCDQs9C00LUg0L3QtSDQvdGD0LbQvdC+INC80L7QttC10Lwg0YLQvtGH0LXRh9C90L4g0YPQsdGA0LDRgtGMXFxuICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgfVxcbn1cXG5cIixcIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBtaXhpbnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxuXFxuQGltcG9ydCAnLi9taXhpbnMnO1xcblxcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHZhcmlhYmxlcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxuXFxuLy8gY29sb3JzXFxuJHdoaXRlOiAjZmZmZmZmO1xcbiRibGFjazogIzAwMDAwMDtcXG4kZm9udENvbG9yOiAjMmUyZTJlO1xcbiRiZ0NvbG9yOiAjZWZmMWYzO1xcbiRibHVlOiAjNjk4MWQ3O1xcbiRsaWdodEJsdWU6ICM2M2IzZGY7XFxuJHJlZDogI2Q3Njk3ZDtcXG4kZ3JheTogI2RlZTJlNztcXG4kdGV4dEdyYXk6ICM4OThlOWY7XFxuJGxpZ2h0R3JheTogI2U5ZWNmNTtcXG5cXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGZvbnRzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcblxcbkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Nb250c2VycmF0OjMwMCxyZWd1bGFyLDcwMCZkaXNwbGF5PXN3YXApO1xcbkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Sb2JvdG8rRmxleDpyZWd1bGFyLDUwMCw2MDAsODAwJmRpc3BsYXk9c3dhcCk7XFxuQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PU51bml0bzpyZWd1bGFyLDUwMCw2MDAsNzAwJmRpc3BsYXk9c3dhcCk7XFxuXFxuLy8gbG9jYWwgZm9udHNcXG4vLyBAaW1wb3J0ICcuL2ZvbnRzJztcXG5cXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGJhc2Ugc3R5bGVzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcblxcbi8vIGJhc2Ugc2NzcyBmaWxlXFxuQGltcG9ydCAnLi9zZXQnO1xcblxcbi8vIGh0bWxcXG5odG1sLmxvY2ssXFxuaHRtbC5sb2NrIGJvZHkge1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICB0b3VjaC1hY3Rpb246IG5vbmU7XFxufVxcbmh0bWwsXFxuYm9keSB7XFxuICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcXG59XFxuXFxuLy8gbWFpblxcbm1haW4ge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi53cmFwcGVyIHtcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxuICAgIG1heC13aWR0aDogMTkyMHB4O1xcbn1cXG5cXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcblxcbi8vIGhlYWRlciAvIGZvb3RlclxcbkBpbXBvcnQgJy4vc2VjdGlvbnMvaGVhZGVyJztcXG5AaW1wb3J0ICcuL3NlY3Rpb25zL2Zvb3Rlcic7XFxuXFxuLy8gdWlcXG5AaW1wb3J0ICcuLi91aS9zdHlsZXMvdWkuc2Nzcyc7XFxuXFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG5cXG5AaW1wb3J0ICcuL2Rldi92em1zazEuc2Nzcyc7XFxuQGltcG9ydCAnLi9kZXYvbWFya3VzRE0uc2Nzcyc7XFxuQGltcG9ydCAnLi9kZXYvdWtpazAuc2Nzcyc7XFxuQGltcG9ydCAnLi9kZXYva2llNmVyLnNjc3MnO1xcblwiLFwiLmgge1xcbiAgICBmb250LWZhbWlseTogJ051bml0byc7XFxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICAgIGxpbmUtaGVpZ2h0OiAxMjAlO1xcblxcbiAgICAmX2gxIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogNnJlbTtcXG4gICAgfVxcblxcbiAgICAmX2gyIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogMy40cmVtO1xcbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pIHtcXG4gICAgICAgICAgICBmb250LXNpemU6IDQuNHJlbTtcXG4gICAgICAgIH1cXG4gICAgfVxcblxcbiAgICAmX2gzIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogMi40cmVtO1xcblxcbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pIHtcXG4gICAgICAgICAgICBmb250LXNpemU6IDMuNnJlbTtcXG4gICAgICAgIH1cXG4gICAgfVxcbn1cXG5cXG4udHh0MTYge1xcbiAgICBsaW5lLWhlaWdodDogMTIwJTtcXG5cXG4gICAgJl9jYXBzIHtcXG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgIH1cXG5cXG4gICAgQG1lZGlhIChtaW4td2lkdGg6IDQ4ZW0pIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogMS42cmVtO1xcbiAgICB9XFxufVxcblwiLFwiaW5wdXRbdHlwZT0ndGV4dCddLFxcbmlucHV0W3R5cGU9J2VtYWlsJ10sXFxuaW5wdXRbdHlwZT0ndGVsJ10sXFxudGV4dGFyZWEge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbiAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xcbiAgYXBwZWFyYW5jZTogbm9uZTtcXG59XFxudGV4dGFyZWE6Zm9jdXMsXFxuaW5wdXQ6Zm9jdXMge1xcbiAgb3V0bGluZTogbm9uZTtcXG59XFxuXFxuLmlucHV0IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgcm93LWdhcDogMS4ycmVtO1xcblxcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pIHtcXG4gICAgcm93LWdhcDogMS42cmVtO1xcbiAgfVxcblxcbiAgLy8gLmlucHV0X19maWVsZFxcblxcbiAgJl9fZmllbGQge1xcbiAgICBwYWRkaW5nOiAxLjZyZW0gMnJlbTtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkd2hpdGU7XFxuICAgIGxpbmUtaGVpZ2h0OiAxO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyLXJhZGl1czogMS42cmVtO1xcbiAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjNzIGVhc2UsIGJvcmRlciAwLjNzIGVhc2U7XFxuICAgICY6OnBsYWNlaG9sZGVyIHtcXG4gICAgICBjb2xvcjogJHRleHRHcmF5O1xcbiAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuM3MgZWFzZTtcXG4gICAgfVxcblxcbiAgICBAbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICAgIHBhZGRpbmc6IDIuNHJlbSAzLjZyZW07XFxuICAgICAgYm9yZGVyLXJhZGl1czogMy4ycmVtO1xcbiAgICB9XFxuICB9XFxuXFxuICAvLyAuaW5wdXRfX2xhYmVsXFxuXFxuICAmX19sYWJlbCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgICBjb2x1bW4tZ2FwOiAzcmVtO1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgfVxcblxcbiAgJi5faGFzLWZvY3VzIHtcXG4gICAgLmlucHV0X19maWVsZCB7XFxuICAgICAgYm9yZGVyOiAxcHggc29saWQgJGJsYWNrO1xcbiAgICB9XFxuICB9XFxuICAmLl9oYXMtZXJyb3Ige1xcbiAgICAuaW5wdXRfX2xhYmVsIHtcXG4gICAgICBjb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgICAgJjo6YWZ0ZXIge1xcbiAgICAgICAgY29udGVudDogYXR0cihkYXRhLWhpbnQpO1xcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgdG9wOiAwO1xcbiAgICAgICAgbGVmdDogMDtcXG4gICAgICAgIGNvbG9yOiAkcmVkO1xcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgICB9XFxuICAgIH1cXG4gICAgLmlucHV0X19maWVsZCB7XFxuICAgICAgYm9yZGVyOiAxcHggc29saWQgJHJlZDtcXG4gICAgICBjb2xvcjogJHJlZDtcXG4gICAgICAmOjpwbGFjZWhvbGRlciB7XFxuICAgICAgICBjb2xvcjogJHJlZDtcXG4gICAgICB9XFxuICAgIH1cXG4gIH1cXG59XFxuXCIsXCIuZHJvcGRvd24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICByb3ctZ2FwOiAxLjJyZW07XFxuXFxuICBAbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICByb3ctZ2FwOiAxLjZyZW07XFxuICB9XFxuXFxuICAvLyAuZHJvcGRvd25fX2xhYmVsXFxuXFxuICAmX19sYWJlbCB7XFxuICAgIGNvbG9yOiAkbGlnaHRHcmF5O1xcbiAgfVxcbn1cXG5cXG4uc2VsZWN0IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXG4gIC8vIC5zZWxlY3RfX2JvZHlcXG5cXG4gICZfX2JvZHkge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB9XFxuXFxuICAvLyAuc2VsZWN0X190aXRsZVxcblxcbiAgJl9fdGl0bGUge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHotaW5kZXg6IDM7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBib3JkZXItcmFkaXVzOiAxLjZyZW07XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICR3aGl0ZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcblxcbiAgICBAbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDMuMnJlbTtcXG4gICAgfVxcbiAgfVxcblxcbiAgLy8gLnNlbGVjdF9fdmFsdWVcXG5cXG4gICZfX3ZhbHVlIHtcXG4gICAgcGFkZGluZzogMS42cmVtIDJyZW07XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdhcDogMXJlbTtcXG4gICAgaGVpZ2h0OiA1LjZyZW07XFxuICAgIHdpZHRoOiAxMDAlO1xcblxcbiAgICA+ICoge1xcbiAgICAgIGZsZXg6IDEgMSBhdXRvO1xcbiAgICB9XFxuXFxuICAgICY6OmFmdGVyIHtcXG4gICAgICBjb250ZW50OiAnJztcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICAgIGZsZXg6IDAgMCAycmVtO1xcbiAgICAgIHdpZHRoOiAycmVtO1xcbiAgICAgIGhlaWdodDogMnJlbTtcXG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9hc3NldHMvaW1hZ2VzL2ljb25zL3NlbC1hcnIuc3ZnKTtcXG4gICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcbiAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZTtcXG4gICAgfVxcbiAgICAmLl9oYXMtbGFiZWwge1xcbiAgICAgICY6OmJlZm9yZSB7XFxuICAgICAgICBjb250ZW50OiBhdHRyKGRhdGEtc2VsLWxhYmVsKTtcXG4gICAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuM3MgZWFzZTtcXG4gICAgICB9XFxuICAgIH1cXG4gICAgJi5faGFzLWxhYmVsOjpiZWZvcmUsXFxuICAgIC5zZWxlY3RfX2NvbnRlbnQge1xcbiAgICAgIG1heC13aWR0aDogMzEuNHJlbTtcXG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAgIH1cXG5cXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pIHtcXG4gICAgICBwYWRkaW5nOiAyLjRyZW0gMy4ycmVtO1xcbiAgICAgIGdhcDogNHJlbTtcXG4gICAgICBoZWlnaHQ6IDguOHJlbTtcXG4gICAgICAmOjphZnRlciB7XFxuICAgICAgICBmbGV4OiAwIDAgMy4ycmVtO1xcbiAgICAgICAgd2lkdGg6IDMuMnJlbTtcXG4gICAgICAgIGhlaWdodDogMy4ycmVtO1xcbiAgICAgIH1cXG4gICAgfVxcbiAgfVxcblxcbiAgLy8gLnNlbGVjdF9fY29udGVudFxcblxcbiAgJl9fY29udGVudCB7XFxuICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG4gICAgLy8gaGlkZSAvIHNob3cgc2VsZWN0ZWQgdmFsdWVcXG4gICAgLy8gJjpub3QoLl9zZWxlY3QtZmlsbGVkICYpIHtcXG4gICAgLy8gICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIC8vIH1cXG4gIH1cXG5cXG4gIC8vIC5zZWxlY3RfX3RleHRcXG5cXG4gICZfX3RleHQge1xcbiAgICBmbGV4OiAxIDEgYXV0bztcXG4gIH1cXG5cXG4gIC8vIC5zZWxlY3RfX2lucHV0XFxuXFxuICAmX19pbnB1dCB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgfVxcblxcbiAgLy8gLnNlbGVjdF9fb3B0aW9uc1xcblxcbiAgJl9fb3B0aW9ucyB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgei1pbmRleDogMjtcXG4gICAgdG9wOiBjYWxjKDEwMCUgKyAwLjhyZW0pO1xcbiAgICBsZWZ0OiAwO1xcbiAgICBwYWRkaW5nOiAycmVtO1xcbiAgICBtaW4td2lkdGg6IDEwMCU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDEuNnJlbTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHdoaXRlO1xcbiAgICBib3gtc2hhZG93OiAwIDAgMnJlbSByZ2JhKDUyLCA1MiwgNTIsIDAuMTUpO1xcblxcbiAgICBAbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICAgIHBhZGRpbmc6IDMuMnJlbTtcXG4gICAgICBib3JkZXItcmFkaXVzOiAzLjJyZW07XFxuICAgIH1cXG4gIH1cXG5cXG4gIC8vIC5zZWxlY3RfX3Njcm9sbFxcblxcbiAgJl9fc2Nyb2xsIHtcXG4gICAgLy8gLy8gbWF4aW11bSBoZWlnaHRcXG4gICAgbWF4LWhlaWdodDogMTlyZW07XFxuXFxuICAgIC8vIC8vIHNjcm9sbGJhciBzdHlsZXNcXG4gICAgJi5zaW1wbGViYXItc2Nyb2xsYWJsZS15IHtcXG4gICAgICAuc2ltcGxlYmFyLXRyYWNrLnNpbXBsZWJhci12ZXJ0aWNhbCB7XFxuICAgICAgICByaWdodDogMS4ycmVtO1xcbiAgICAgICAgd2lkdGg6IDAuNHJlbTtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDAuOHJlbTtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlNGU3ZWU7XFxuICAgICAgfVxcbiAgICAgIC5zaW1wbGViYXItc2Nyb2xsYmFyIHtcXG4gICAgICAgIG1pbi1oZWlnaHQ6IDMuMnJlbTtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDAuOHJlbTtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNhMmFkYzE7XFxuICAgICAgfVxcbiAgICB9XFxuICB9XFxuXFxuICAvLyAuc2VsZWN0X19vcHRpb25cXG4gICZfX29wdGlvbiB7XFxuICAgIHBhZGRpbmc6IDEuNXJlbSAwO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgdHJhbnNpdGlvbjogY29sb3IgMC4zcyBlYXNlO1xcbiAgICAmOmZpcnN0LWNoaWxkIHtcXG4gICAgICBwYWRkaW5nLXRvcDogMDtcXG4gICAgfVxcbiAgICAmOmxhc3QtY2hpbGQge1xcbiAgICAgIHBhZGRpbmctYm90dG9tOiAwO1xcbiAgICB9XFxuXFxuICAgICYuX2lzLXNlbGVjdGVkIHtcXG4gICAgICBmb250LXdlaWdodDogNTAwO1xcbiAgICB9XFxuICAgIEBtZWRpYSAoYW55LWhvdmVyOiBob3Zlcikge1xcbiAgICAgICY6aG92ZXIge1xcbiAgICAgICAgJjpub3QoJi5zZWxlY3RfX3N1YnRpdGxlKSB7XFxuICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICAgIH1cXG4gICAgICB9XFxuICAgIH1cXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ4ZW0pIHtcXG4gICAgICBwYWRkaW5nOiAyLjRyZW0gMDtcXG4gICAgfVxcbiAgfVxcblxcbiAgLy8gLnNlbGVjdF9fZ3JvdXBcXG5cXG4gICZfX2dyb3VwIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uLXJldmVyc2U7XFxuICB9XFxuXFxuICAvLyAuc2VsZWN0X19hc3NldFxcblxcbiAgJl9fYXNzZXQge1xcbiAgfVxcblxcbiAgLy8gLnNlbGVjdF9fdGV4dFxcblxcbiAgJl9fdGV4dCB7XFxuICB9XFxuXFxuICAvLyAuc2VsZWN0X19oaW50XFxuXFxuICAmX19oaW50IHtcXG4gIH1cXG5cXG4gIC8vIC5zZWxlY3RfX3N1YnRpdGxlXFxuXFxuICAmX19zdWJ0aXRsZSB7XFxuICAgIGN1cnNvcjogdGV4dDtcXG4gIH1cXG5cXG4gIC8vIHNlbGVjdCBzdGF0ZVxcbiAgJi5faXMtb3BlbmVkIHtcXG4gICAgei1pbmRleDogNTtcXG4gICAgLnNlbGVjdF9fdmFsdWU6OmFmdGVyIHtcXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMTgwZGVnKTtcXG4gICAgfVxcbiAgfVxcbiAgJi5faGFzLWVycm9yIHtcXG4gICAgJjpub3QoJi5faXMtZmlsbGVkLCAmLl9pcy1vcGVuZWQpIHtcXG4gICAgICAuc2VsZWN0X192YWx1ZS5fc2VsZWN0LWxhYmVsIHtcXG4gICAgICAgICY6OmJlZm9yZSB7XFxuICAgICAgICAgIGNvbG9yOiAkcmVkO1xcbiAgICAgICAgfVxcbiAgICAgIH1cXG4gICAgfVxcbiAgfVxcbn1cXG5cXG4vLyBsaXN0XFxuLl9zZWxlY3QtbGlzdCB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblwiLFwiLmFjY29yZGlvbiB7XFxuICBtYXJnaW46IDNyZW0gYXV0bztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgcm93LWdhcDogMXJlbTtcXG4gIG1heC13aWR0aDogODByZW07XFxuXFxuICAvLyAuYWNjb3JkaW9uX19pdGVtXFxuXFxuICAmX19pdGVtIHtcXG4gICAgYm9yZGVyLXJhZGl1czogMi40cmVtO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkd2hpdGU7XFxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA0OGVtKSB7XFxuICAgICAgYm9yZGVyLXJhZGl1czogNXJlbTtcXG4gICAgfVxcbiAgfVxcblxcbiAgLy8gLmFjY29yZGlvbl9fdGl0bGVcXG5cXG4gICZfX3RpdGxlIHtcXG4gICAgcGFkZGluZzogMi40cmVtO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICAmLl9hY2NvcmRpb24tYWN0aXZlIHtcXG4gICAgICAuYXJyIHN2ZyB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtOTBkZWcpO1xcbiAgICAgIH1cXG4gICAgICAuYXJyIHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRibHVlO1xcbiAgICAgIH1cXG4gICAgfVxcbiAgICAuYXJyIHtcXG4gICAgICBmbGV4OiAwIDAgNXJlbTtcXG4gICAgICB3aWR0aDogNXJlbTtcXG4gICAgICBoZWlnaHQ6IDVyZW07XFxuICAgICAgQG1lZGlhIChhbnktaG92ZXI6IGhvdmVyKSB7XFxuICAgICAgICAmOmhvdmVyIHtcXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGJsdWU7XFxuICAgICAgICB9XFxuICAgICAgfVxcbiAgICB9XFxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA0OGVtKSB7XFxuICAgICAgcGFkZGluZzogMy4ycmVtO1xcbiAgICAgIC5hcnIge1xcbiAgICAgICAgZmxleDogMCAwIDlyZW07XFxuICAgICAgICB3aWR0aDogOXJlbTtcXG4gICAgICAgIGhlaWdodDogOXJlbTtcXG4gICAgICB9XFxuICAgIH1cXG4gIH1cXG5cXG4gIC8vIC5hY2NvcmRpb25fX3RpdGxlLXR4dFxcblxcbiAgJl9fdGl0bGUtdHh0IHtcXG4gIH1cXG5cXG4gIC8vIC5hY2NvcmRpb25fX2JvZHlcXG5cXG4gICZfX2JvZHkge1xcbiAgICBwYWRkaW5nOiAyLjRyZW07XFxuICAgIHBhZGRpbmctdG9wOiAwO1xcbiAgICBAbWVkaWEgKG1heC13aWR0aDogNDhlbSkge1xcbiAgICAgIHBhZGRpbmc6IDMuMnJlbTtcXG4gICAgICBwYWRkaW5nLXRvcDogMDtcXG4gICAgfVxcbiAgfVxcblxcbiAgLy8gLmFjY29yZGlvbl9fdGV4dFxcblxcbiAgJl9fdGV4dCB7XFxuICAgIGNvbG9yOiByZ2JhKDEzMiwgMTMyLCAxMzIsIDEpO1xcbiAgICAmOm5vdCg6bGFzdC1jaGlsZCkge1xcbiAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XFxuICAgIH1cXG4gIH1cXG59XFxuXCIsXCIvLyB0eXBvZ3JhcGh5XFxuQGltcG9ydCAnLi90eXBvJztcXG5cXG4vLyBpbnB1dFxcbkBpbXBvcnQgJy4vaW5wdXQnO1xcblxcbi8vIHNlbGVjdFxcbkBpbXBvcnQgJy4vc2VsZWN0JztcXG5cXG4vLyBhY2NvcmRpb25cXG5AaW1wb3J0ICcuL2FjY29yZGlvbic7XFxuXFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSDQtNC70Y8g0LTQtdC80L7QvdGB0YLRgNCw0YbQuNC4IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcblxcbi5mb3JtIHtcXG4gIG1hcmdpbjogM3JlbSBhdXRvO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgcm93LWdhcDogMnJlbTtcXG4gIG1heC13aWR0aDogODByZW07XFxuXFxuICAvLyAuZm9ybV9fZmllbGRzXFxuXFxuICAmX19maWVsZHMge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBjb2x1bW4tZ2FwOiAycmVtO1xcbiAgfVxcbn1cXG5cXG4uYnRuIHtcXG4gIHBhZGRpbmc6IDEuNnJlbSAzLjJyZW07XFxuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGNvbHVtbi1nYXA6IDEuNnJlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDVyZW07XFxuICBjb2xvcjogJHdoaXRlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogJGJsYWNrO1xcbn1cXG5cXG4udGFicyB7XFxuICBtYXJnaW46IDZyZW0gYXV0bztcXG4gIG1heC13aWR0aDogODByZW07XFxuXFxuICAvLyAudGFic19fbmF2aWdhdGlvblxcblxcbiAgJl9fbmF2aWdhdGlvbiB7XFxuICAgIG1hcmdpbi1ib3R0b206IDNyZW07XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBjb2x1bW4tZ2FwOiAycmVtO1xcbiAgfVxcblxcbiAgLy8gLnRhYnNfX2JvZHlcXG5cXG4gICZfX2JvZHkge1xcbiAgICBwYWRkaW5nOiAzcmVtO1xcbiAgICBib3JkZXItcmFkaXVzOiAzcmVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC40KTtcXG4gIH1cXG59XFxuXFxuLmRyb3Bkb3ducyB7XFxuICBtYXJnaW46IDNyZW0gYXV0bztcXG4gIG1heC13aWR0aDogODByZW07XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIHJvdy1nYXA6IDFyZW07XFxufVxcblxcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG5cIixudWxsXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbMl0udXNlWzFdIS4uLy4uL2dyb3VwLWNzcy1tZWRpYS1xdWVyaWVzLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zaW1wbGViYXIuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1syXS51c2VbMV0hLi4vLi4vZ3JvdXAtY3NzLW1lZGlhLXF1ZXJpZXMtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3NpbXBsZWJhci5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzJdLnVzZVsxXSEuLi8uLi9ub2RlX21vZHVsZXMvZ3JvdXAtY3NzLW1lZGlhLXF1ZXJpZXMtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbMl0udXNlWzFdIS4uLy4uL25vZGVfbW9kdWxlcy9ncm91cC1jc3MtbWVkaWEtcXVlcmllcy1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxuZXhwb3J0IGRlZmF1bHQgU3ltYm9sO1xuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuaW1wb3J0IGdldFJhd1RhZyBmcm9tICcuL19nZXRSYXdUYWcuanMnO1xuaW1wb3J0IG9iamVjdFRvU3RyaW5nIGZyb20gJy4vX29iamVjdFRvU3RyaW5nLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG51bGxUYWcgPSAnW29iamVjdCBOdWxsXScsXG4gICAgdW5kZWZpbmVkVGFnID0gJ1tvYmplY3QgVW5kZWZpbmVkXSc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRUYWdgIHdpdGhvdXQgZmFsbGJhY2tzIGZvciBidWdneSBlbnZpcm9ubWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldFRhZyh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkVGFnIDogbnVsbFRhZztcbiAgfVxuICByZXR1cm4gKHN5bVRvU3RyaW5nVGFnICYmIHN5bVRvU3RyaW5nVGFnIGluIE9iamVjdCh2YWx1ZSkpXG4gICAgPyBnZXRSYXdUYWcodmFsdWUpXG4gICAgOiBvYmplY3RUb1N0cmluZyh2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VHZXRUYWc7XG4iLCJpbXBvcnQgdHJpbW1lZEVuZEluZGV4IGZyb20gJy4vX3RyaW1tZWRFbmRJbmRleC5qcyc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgd2hpdGVzcGFjZS4gKi9cbnZhciByZVRyaW1TdGFydCA9IC9eXFxzKy87XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udHJpbWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byB0cmltLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgdHJpbW1lZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUcmltKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nXG4gICAgPyBzdHJpbmcuc2xpY2UoMCwgdHJpbW1lZEVuZEluZGV4KHN0cmluZykgKyAxKS5yZXBsYWNlKHJlVHJpbVN0YXJ0LCAnJylcbiAgICA6IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVRyaW07XG4iLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5leHBvcnQgZGVmYXVsdCBmcmVlR2xvYmFsO1xuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFJhd1RhZztcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBvYmplY3RUb1N0cmluZztcbiIsImltcG9ydCBmcmVlR2xvYmFsIGZyb20gJy4vX2ZyZWVHbG9iYWwuanMnO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvb3Q7XG4iLCIvKiogVXNlZCB0byBtYXRjaCBhIHNpbmdsZSB3aGl0ZXNwYWNlIGNoYXJhY3Rlci4gKi9cbnZhciByZVdoaXRlc3BhY2UgPSAvXFxzLztcblxuLyoqXG4gKiBVc2VkIGJ5IGBfLnRyaW1gIGFuZCBgXy50cmltRW5kYCB0byBnZXQgdGhlIGluZGV4IG9mIHRoZSBsYXN0IG5vbi13aGl0ZXNwYWNlXG4gKiBjaGFyYWN0ZXIgb2YgYHN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBpbnNwZWN0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGxhc3Qgbm9uLXdoaXRlc3BhY2UgY2hhcmFjdGVyLlxuICovXG5mdW5jdGlvbiB0cmltbWVkRW5kSW5kZXgoc3RyaW5nKSB7XG4gIHZhciBpbmRleCA9IHN0cmluZy5sZW5ndGg7XG5cbiAgd2hpbGUgKGluZGV4LS0gJiYgcmVXaGl0ZXNwYWNlLnRlc3Qoc3RyaW5nLmNoYXJBdChpbmRleCkpKSB7fVxuICByZXR1cm4gaW5kZXg7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRyaW1tZWRFbmRJbmRleDtcbiIsImltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcbmltcG9ydCBub3cgZnJvbSAnLi9ub3cuanMnO1xuaW1wb3J0IHRvTnVtYmVyIGZyb20gJy4vdG9OdW1iZXIuanMnO1xuXG4vKiogRXJyb3IgbWVzc2FnZSBjb25zdGFudHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXgsXG4gICAgbmF0aXZlTWluID0gTWF0aC5taW47XG5cbi8qKlxuICogQ3JlYXRlcyBhIGRlYm91bmNlZCBmdW5jdGlvbiB0aGF0IGRlbGF5cyBpbnZva2luZyBgZnVuY2AgdW50aWwgYWZ0ZXIgYHdhaXRgXG4gKiBtaWxsaXNlY29uZHMgaGF2ZSBlbGFwc2VkIHNpbmNlIHRoZSBsYXN0IHRpbWUgdGhlIGRlYm91bmNlZCBmdW5jdGlvbiB3YXNcbiAqIGludm9rZWQuIFRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gY29tZXMgd2l0aCBhIGBjYW5jZWxgIG1ldGhvZCB0byBjYW5jZWxcbiAqIGRlbGF5ZWQgYGZ1bmNgIGludm9jYXRpb25zIGFuZCBhIGBmbHVzaGAgbWV0aG9kIHRvIGltbWVkaWF0ZWx5IGludm9rZSB0aGVtLlxuICogUHJvdmlkZSBgb3B0aW9uc2AgdG8gaW5kaWNhdGUgd2hldGhlciBgZnVuY2Agc2hvdWxkIGJlIGludm9rZWQgb24gdGhlXG4gKiBsZWFkaW5nIGFuZC9vciB0cmFpbGluZyBlZGdlIG9mIHRoZSBgd2FpdGAgdGltZW91dC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkXG4gKiB3aXRoIHRoZSBsYXN0IGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uLiBTdWJzZXF1ZW50XG4gKiBjYWxscyB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYFxuICogaW52b2NhdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogSWYgYGxlYWRpbmdgIGFuZCBgdHJhaWxpbmdgIG9wdGlvbnMgYXJlIGB0cnVlYCwgYGZ1bmNgIGlzXG4gKiBpbnZva2VkIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0IG9ubHkgaWYgdGhlIGRlYm91bmNlZCBmdW5jdGlvblxuICogaXMgaW52b2tlZCBtb3JlIHRoYW4gb25jZSBkdXJpbmcgdGhlIGB3YWl0YCB0aW1lb3V0LlxuICpcbiAqIElmIGB3YWl0YCBpcyBgMGAgYW5kIGBsZWFkaW5nYCBpcyBgZmFsc2VgLCBgZnVuY2AgaW52b2NhdGlvbiBpcyBkZWZlcnJlZFxuICogdW50aWwgdG8gdGhlIG5leHQgdGljaywgc2ltaWxhciB0byBgc2V0VGltZW91dGAgd2l0aCBhIHRpbWVvdXQgb2YgYDBgLlxuICpcbiAqIFNlZSBbRGF2aWQgQ29yYmFjaG8ncyBhcnRpY2xlXShodHRwczovL2Nzcy10cmlja3MuY29tL2RlYm91bmNpbmctdGhyb3R0bGluZy1leHBsYWluZWQtZXhhbXBsZXMvKVxuICogZm9yIGRldGFpbHMgb3ZlciB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiBgXy5kZWJvdW5jZWAgYW5kIGBfLnRocm90dGxlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRlYm91bmNlLlxuICogQHBhcmFtIHtudW1iZXJ9IFt3YWl0PTBdIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIGRlbGF5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlYWRpbmc9ZmFsc2VdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgbGVhZGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFdhaXRdXG4gKiAgVGhlIG1heGltdW0gdGltZSBgZnVuY2AgaXMgYWxsb3dlZCB0byBiZSBkZWxheWVkIGJlZm9yZSBpdCdzIGludm9rZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnRyYWlsaW5nPXRydWVdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGRlYm91bmNlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gQXZvaWQgY29zdGx5IGNhbGN1bGF0aW9ucyB3aGlsZSB0aGUgd2luZG93IHNpemUgaXMgaW4gZmx1eC5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdyZXNpemUnLCBfLmRlYm91bmNlKGNhbGN1bGF0ZUxheW91dCwgMTUwKSk7XG4gKlxuICogLy8gSW52b2tlIGBzZW5kTWFpbGAgd2hlbiBjbGlja2VkLCBkZWJvdW5jaW5nIHN1YnNlcXVlbnQgY2FsbHMuXG4gKiBqUXVlcnkoZWxlbWVudCkub24oJ2NsaWNrJywgXy5kZWJvdW5jZShzZW5kTWFpbCwgMzAwLCB7XG4gKiAgICdsZWFkaW5nJzogdHJ1ZSxcbiAqICAgJ3RyYWlsaW5nJzogZmFsc2VcbiAqIH0pKTtcbiAqXG4gKiAvLyBFbnN1cmUgYGJhdGNoTG9nYCBpcyBpbnZva2VkIG9uY2UgYWZ0ZXIgMSBzZWNvbmQgb2YgZGVib3VuY2VkIGNhbGxzLlxuICogdmFyIGRlYm91bmNlZCA9IF8uZGVib3VuY2UoYmF0Y2hMb2csIDI1MCwgeyAnbWF4V2FpdCc6IDEwMDAgfSk7XG4gKiB2YXIgc291cmNlID0gbmV3IEV2ZW50U291cmNlKCcvc3RyZWFtJyk7XG4gKiBqUXVlcnkoc291cmNlKS5vbignbWVzc2FnZScsIGRlYm91bmNlZCk7XG4gKlxuICogLy8gQ2FuY2VsIHRoZSB0cmFpbGluZyBkZWJvdW5jZWQgaW52b2NhdGlvbi5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIGRlYm91bmNlZC5jYW5jZWwpO1xuICovXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBsYXN0QXJncyxcbiAgICAgIGxhc3RUaGlzLFxuICAgICAgbWF4V2FpdCxcbiAgICAgIHJlc3VsdCxcbiAgICAgIHRpbWVySWQsXG4gICAgICBsYXN0Q2FsbFRpbWUsXG4gICAgICBsYXN0SW52b2tlVGltZSA9IDAsXG4gICAgICBsZWFkaW5nID0gZmFsc2UsXG4gICAgICBtYXhpbmcgPSBmYWxzZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB3YWl0ID0gdG9OdW1iZXIod2FpdCkgfHwgMDtcbiAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgbGVhZGluZyA9ICEhb3B0aW9ucy5sZWFkaW5nO1xuICAgIG1heGluZyA9ICdtYXhXYWl0JyBpbiBvcHRpb25zO1xuICAgIG1heFdhaXQgPSBtYXhpbmcgPyBuYXRpdmVNYXgodG9OdW1iZXIob3B0aW9ucy5tYXhXYWl0KSB8fCAwLCB3YWl0KSA6IG1heFdhaXQ7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGludm9rZUZ1bmModGltZSkge1xuICAgIHZhciBhcmdzID0gbGFzdEFyZ3MsXG4gICAgICAgIHRoaXNBcmcgPSBsYXN0VGhpcztcblxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxlYWRpbmdFZGdlKHRpbWUpIHtcbiAgICAvLyBSZXNldCBhbnkgYG1heFdhaXRgIHRpbWVyLlxuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICAvLyBTdGFydCB0aGUgdGltZXIgZm9yIHRoZSB0cmFpbGluZyBlZGdlLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgLy8gSW52b2tlIHRoZSBsZWFkaW5nIGVkZ2UuXG4gICAgcmV0dXJuIGxlYWRpbmcgPyBpbnZva2VGdW5jKHRpbWUpIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtYWluaW5nV2FpdCh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZSxcbiAgICAgICAgdGltZVdhaXRpbmcgPSB3YWl0IC0gdGltZVNpbmNlTGFzdENhbGw7XG5cbiAgICByZXR1cm4gbWF4aW5nXG4gICAgICA/IG5hdGl2ZU1pbih0aW1lV2FpdGluZywgbWF4V2FpdCAtIHRpbWVTaW5jZUxhc3RJbnZva2UpXG4gICAgICA6IHRpbWVXYWl0aW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkSW52b2tlKHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lO1xuXG4gICAgLy8gRWl0aGVyIHRoaXMgaXMgdGhlIGZpcnN0IGNhbGwsIGFjdGl2aXR5IGhhcyBzdG9wcGVkIGFuZCB3ZSdyZSBhdCB0aGVcbiAgICAvLyB0cmFpbGluZyBlZGdlLCB0aGUgc3lzdGVtIHRpbWUgaGFzIGdvbmUgYmFja3dhcmRzIGFuZCB3ZSdyZSB0cmVhdGluZ1xuICAgIC8vIGl0IGFzIHRoZSB0cmFpbGluZyBlZGdlLCBvciB3ZSd2ZSBoaXQgdGhlIGBtYXhXYWl0YCBsaW1pdC5cbiAgICByZXR1cm4gKGxhc3RDYWxsVGltZSA9PT0gdW5kZWZpbmVkIHx8ICh0aW1lU2luY2VMYXN0Q2FsbCA+PSB3YWl0KSB8fFxuICAgICAgKHRpbWVTaW5jZUxhc3RDYWxsIDwgMCkgfHwgKG1heGluZyAmJiB0aW1lU2luY2VMYXN0SW52b2tlID49IG1heFdhaXQpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRpbWVyRXhwaXJlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpO1xuICAgIGlmIChzaG91bGRJbnZva2UodGltZSkpIHtcbiAgICAgIHJldHVybiB0cmFpbGluZ0VkZ2UodGltZSk7XG4gICAgfVxuICAgIC8vIFJlc3RhcnQgdGhlIHRpbWVyLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgcmVtYWluaW5nV2FpdCh0aW1lKSk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFpbGluZ0VkZ2UodGltZSkge1xuICAgIHRpbWVySWQgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBPbmx5IGludm9rZSBpZiB3ZSBoYXZlIGBsYXN0QXJnc2Agd2hpY2ggbWVhbnMgYGZ1bmNgIGhhcyBiZWVuXG4gICAgLy8gZGVib3VuY2VkIGF0IGxlYXN0IG9uY2UuXG4gICAgaWYgKHRyYWlsaW5nICYmIGxhc3RBcmdzKSB7XG4gICAgICByZXR1cm4gaW52b2tlRnVuYyh0aW1lKTtcbiAgICB9XG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIGlmICh0aW1lcklkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICB9XG4gICAgbGFzdEludm9rZVRpbWUgPSAwO1xuICAgIGxhc3RBcmdzID0gbGFzdENhbGxUaW1lID0gbGFzdFRoaXMgPSB0aW1lcklkID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgcmV0dXJuIHRpbWVySWQgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IHRyYWlsaW5nRWRnZShub3coKSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWJvdW5jZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKSxcbiAgICAgICAgaXNJbnZva2luZyA9IHNob3VsZEludm9rZSh0aW1lKTtcblxuICAgIGxhc3RBcmdzID0gYXJndW1lbnRzO1xuICAgIGxhc3RUaGlzID0gdGhpcztcbiAgICBsYXN0Q2FsbFRpbWUgPSB0aW1lO1xuXG4gICAgaWYgKGlzSW52b2tpbmcpIHtcbiAgICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGxlYWRpbmdFZGdlKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgICBpZiAobWF4aW5nKSB7XG4gICAgICAgIC8vIEhhbmRsZSBpbnZvY2F0aW9ucyBpbiBhIHRpZ2h0IGxvb3AuXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAgICAgcmV0dXJuIGludm9rZUZ1bmMobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBkZWJvdW5jZWQuY2FuY2VsID0gY2FuY2VsO1xuICBkZWJvdW5jZWQuZmx1c2ggPSBmbHVzaDtcbiAgcmV0dXJuIGRlYm91bmNlZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVib3VuY2U7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNPYmplY3Q7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNPYmplY3RMaWtlO1xuIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc1N5bWJvbDtcbiIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKipcbiAqIEdldHMgdGhlIHRpbWVzdGFtcCBvZiB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IGhhdmUgZWxhcHNlZCBzaW5jZVxuICogdGhlIFVuaXggZXBvY2ggKDEgSmFudWFyeSAxOTcwIDAwOjAwOjAwIFVUQykuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IERhdGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHRpbWVzdGFtcC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5kZWZlcihmdW5jdGlvbihzdGFtcCkge1xuICogICBjb25zb2xlLmxvZyhfLm5vdygpIC0gc3RhbXApO1xuICogfSwgXy5ub3coKSk7XG4gKiAvLyA9PiBMb2dzIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGl0IHRvb2sgZm9yIHRoZSBkZWZlcnJlZCBpbnZvY2F0aW9uLlxuICovXG52YXIgbm93ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiByb290LkRhdGUubm93KCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBub3c7XG4iLCJpbXBvcnQgZGVib3VuY2UgZnJvbSAnLi9kZWJvdW5jZS5qcyc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5cbi8qKiBFcnJvciBtZXNzYWdlIGNvbnN0YW50cy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHRocm90dGxlZCBmdW5jdGlvbiB0aGF0IG9ubHkgaW52b2tlcyBgZnVuY2AgYXQgbW9zdCBvbmNlIHBlclxuICogZXZlcnkgYHdhaXRgIG1pbGxpc2Vjb25kcy4gVGhlIHRocm90dGxlZCBmdW5jdGlvbiBjb21lcyB3aXRoIGEgYGNhbmNlbGBcbiAqIG1ldGhvZCB0byBjYW5jZWwgZGVsYXllZCBgZnVuY2AgaW52b2NhdGlvbnMgYW5kIGEgYGZsdXNoYCBtZXRob2QgdG9cbiAqIGltbWVkaWF0ZWx5IGludm9rZSB0aGVtLiBQcm92aWRlIGBvcHRpb25zYCB0byBpbmRpY2F0ZSB3aGV0aGVyIGBmdW5jYFxuICogc2hvdWxkIGJlIGludm9rZWQgb24gdGhlIGxlYWRpbmcgYW5kL29yIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIGB3YWl0YFxuICogdGltZW91dC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkIHdpdGggdGhlIGxhc3QgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZVxuICogdGhyb3R0bGVkIGZ1bmN0aW9uLiBTdWJzZXF1ZW50IGNhbGxzIHRvIHRoZSB0aHJvdHRsZWQgZnVuY3Rpb24gcmV0dXJuIHRoZVxuICogcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYCBpbnZvY2F0aW9uLlxuICpcbiAqICoqTm90ZToqKiBJZiBgbGVhZGluZ2AgYW5kIGB0cmFpbGluZ2Agb3B0aW9ucyBhcmUgYHRydWVgLCBgZnVuY2AgaXNcbiAqIGludm9rZWQgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQgb25seSBpZiB0aGUgdGhyb3R0bGVkIGZ1bmN0aW9uXG4gKiBpcyBpbnZva2VkIG1vcmUgdGhhbiBvbmNlIGR1cmluZyB0aGUgYHdhaXRgIHRpbWVvdXQuXG4gKlxuICogSWYgYHdhaXRgIGlzIGAwYCBhbmQgYGxlYWRpbmdgIGlzIGBmYWxzZWAsIGBmdW5jYCBpbnZvY2F0aW9uIGlzIGRlZmVycmVkXG4gKiB1bnRpbCB0byB0aGUgbmV4dCB0aWNrLCBzaW1pbGFyIHRvIGBzZXRUaW1lb3V0YCB3aXRoIGEgdGltZW91dCBvZiBgMGAuXG4gKlxuICogU2VlIFtEYXZpZCBDb3JiYWNobydzIGFydGljbGVdKGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vZGVib3VuY2luZy10aHJvdHRsaW5nLWV4cGxhaW5lZC1leGFtcGxlcy8pXG4gKiBmb3IgZGV0YWlscyBvdmVyIHRoZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIGBfLnRocm90dGxlYCBhbmQgYF8uZGVib3VuY2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gdGhyb3R0bGUuXG4gKiBAcGFyYW0ge251bWJlcn0gW3dhaXQ9MF0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gdGhyb3R0bGUgaW52b2NhdGlvbnMgdG8uXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVhZGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudHJhaWxpbmc9dHJ1ZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgdGhyb3R0bGVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBBdm9pZCBleGNlc3NpdmVseSB1cGRhdGluZyB0aGUgcG9zaXRpb24gd2hpbGUgc2Nyb2xsaW5nLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3Njcm9sbCcsIF8udGhyb3R0bGUodXBkYXRlUG9zaXRpb24sIDEwMCkpO1xuICpcbiAqIC8vIEludm9rZSBgcmVuZXdUb2tlbmAgd2hlbiB0aGUgY2xpY2sgZXZlbnQgaXMgZmlyZWQsIGJ1dCBub3QgbW9yZSB0aGFuIG9uY2UgZXZlcnkgNSBtaW51dGVzLlxuICogdmFyIHRocm90dGxlZCA9IF8udGhyb3R0bGUocmVuZXdUb2tlbiwgMzAwMDAwLCB7ICd0cmFpbGluZyc6IGZhbHNlIH0pO1xuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIHRocm90dGxlZCk7XG4gKlxuICogLy8gQ2FuY2VsIHRoZSB0cmFpbGluZyB0aHJvdHRsZWQgaW52b2NhdGlvbi5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIHRocm90dGxlZC5jYW5jZWwpO1xuICovXG5mdW5jdGlvbiB0aHJvdHRsZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBsZWFkaW5nID0gdHJ1ZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICBsZWFkaW5nID0gJ2xlYWRpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMubGVhZGluZyA6IGxlYWRpbmc7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuICByZXR1cm4gZGVib3VuY2UoZnVuYywgd2FpdCwge1xuICAgICdsZWFkaW5nJzogbGVhZGluZyxcbiAgICAnbWF4V2FpdCc6IHdhaXQsXG4gICAgJ3RyYWlsaW5nJzogdHJhaWxpbmdcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRocm90dGxlO1xuIiwiaW1wb3J0IGJhc2VUcmltIGZyb20gJy4vX2Jhc2VUcmltLmpzJztcbmltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcbmltcG9ydCBpc1N5bWJvbCBmcm9tICcuL2lzU3ltYm9sLmpzJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTkFOID0gMCAvIDA7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiYWQgc2lnbmVkIGhleGFkZWNpbWFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JhZEhleCA9IC9eWy0rXTB4WzAtOWEtZl0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmluYXJ5IHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JpbmFyeSA9IC9eMGJbMDFdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG9jdGFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc09jdGFsID0gL14wb1swLTddKyQvaTtcblxuLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbnZhciBmcmVlUGFyc2VJbnQgPSBwYXJzZUludDtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvTnVtYmVyKDMuMik7XG4gKiAvLyA9PiAzLjJcbiAqXG4gKiBfLnRvTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b051bWJlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBJbmZpbml0eVxuICpcbiAqIF8udG9OdW1iZXIoJzMuMicpO1xuICogLy8gPT4gMy4yXG4gKi9cbmZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBOQU47XG4gIH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHZhciBvdGhlciA9IHR5cGVvZiB2YWx1ZS52YWx1ZU9mID09ICdmdW5jdGlvbicgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbiAgICB2YWx1ZSA9IGlzT2JqZWN0KG90aGVyKSA/IChvdGhlciArICcnKSA6IG90aGVyO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6ICt2YWx1ZTtcbiAgfVxuICB2YWx1ZSA9IGJhc2VUcmltKHZhbHVlKTtcbiAgdmFyIGlzQmluYXJ5ID0gcmVJc0JpbmFyeS50ZXN0KHZhbHVlKTtcbiAgcmV0dXJuIChpc0JpbmFyeSB8fCByZUlzT2N0YWwudGVzdCh2YWx1ZSkpXG4gICAgPyBmcmVlUGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIGlzQmluYXJ5ID8gMiA6IDgpXG4gICAgOiAocmVJc0JhZEhleC50ZXN0KHZhbHVlKSA/IE5BTiA6ICt2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRvTnVtYmVyO1xuIiwiLyoqXG4gKiBzaW1wbGViYXItY29yZSAtIHYxLjIuNFxuICogU2Nyb2xsYmFycywgc2ltcGxlci5cbiAqIGh0dHBzOi8vZ3JzbXRvLmdpdGh1Yi5pby9zaW1wbGViYXIvXG4gKlxuICogTWFkZSBieSBBZHJpZW4gRGVuYXQgZnJvbSBhIGZvcmsgYnkgSm9uYXRoYW4gTmljb2xcbiAqIFVuZGVyIE1JVCBMaWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgdGhyb3R0bGUsIGRlYm91bmNlIH0gZnJvbSAnbG9kYXNoLWVzJztcbmltcG9ydCBjYW5Vc2VET00gZnJvbSAnY2FuLXVzZS1kb20nO1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcbnZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn07XG5cbnZhciBjYWNoZWRTY3JvbGxiYXJXaWR0aCA9IG51bGw7XG52YXIgY2FjaGVkRGV2aWNlUGl4ZWxSYXRpbyA9IG51bGw7XG5pZiAoY2FuVXNlRE9NKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGNhY2hlZERldmljZVBpeGVsUmF0aW8gIT09IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKSB7XG4gICAgICAgICAgICBjYWNoZWREZXZpY2VQaXhlbFJhdGlvID0gd2luZG93LmRldmljZVBpeGVsUmF0aW87XG4gICAgICAgICAgICBjYWNoZWRTY3JvbGxiYXJXaWR0aCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHNjcm9sbGJhcldpZHRoKCkge1xuICAgIGlmIChjYWNoZWRTY3JvbGxiYXJXaWR0aCA9PT0gbnVsbCkge1xuICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgY2FjaGVkU2Nyb2xsYmFyV2lkdGggPSAwO1xuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNjcm9sbGJhcldpZHRoO1xuICAgICAgICB9XG4gICAgICAgIHZhciBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICAgICAgdmFyIGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBib3guY2xhc3NMaXN0LmFkZCgnc2ltcGxlYmFyLWhpZGUtc2Nyb2xsYmFyJyk7XG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoYm94KTtcbiAgICAgICAgdmFyIHdpZHRoID0gYm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnJpZ2h0O1xuICAgICAgICBib2R5LnJlbW92ZUNoaWxkKGJveCk7XG4gICAgICAgIGNhY2hlZFNjcm9sbGJhcldpZHRoID0gd2lkdGg7XG4gICAgfVxuICAgIHJldHVybiBjYWNoZWRTY3JvbGxiYXJXaWR0aDtcbn1cblxuZnVuY3Rpb24gZ2V0RWxlbWVudFdpbmRvdyQxKGVsZW1lbnQpIHtcbiAgICBpZiAoIWVsZW1lbnQgfHxcbiAgICAgICAgIWVsZW1lbnQub3duZXJEb2N1bWVudCB8fFxuICAgICAgICAhZWxlbWVudC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3KSB7XG4gICAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XG59XG5mdW5jdGlvbiBnZXRFbGVtZW50RG9jdW1lbnQkMShlbGVtZW50KSB7XG4gICAgaWYgKCFlbGVtZW50IHx8ICFlbGVtZW50Lm93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50O1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudC5vd25lckRvY3VtZW50O1xufVxuLy8gSGVscGVyIGZ1bmN0aW9uIHRvIHJldHJpZXZlIG9wdGlvbnMgZnJvbSBlbGVtZW50IGF0dHJpYnV0ZXNcbnZhciBnZXRPcHRpb25zJDEgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIGluaXRpYWxPYmogPSB7fTtcbiAgICB2YXIgb3B0aW9ucyA9IEFycmF5LnByb3RvdHlwZS5yZWR1Y2UuY2FsbChvYmosIGZ1bmN0aW9uIChhY2MsIGF0dHJpYnV0ZSkge1xuICAgICAgICB2YXIgb3B0aW9uID0gYXR0cmlidXRlLm5hbWUubWF0Y2goL2RhdGEtc2ltcGxlYmFyLSguKykvKTtcbiAgICAgICAgaWYgKG9wdGlvbikge1xuICAgICAgICAgICAgdmFyIGtleSA9IG9wdGlvblsxXS5yZXBsYWNlKC9cXFcrKC4pL2csIGZ1bmN0aW9uIChfLCBjaHIpIHsgcmV0dXJuIGNoci50b1VwcGVyQ2FzZSgpOyB9KTtcbiAgICAgICAgICAgIHN3aXRjaCAoYXR0cmlidXRlLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAndHJ1ZSc6XG4gICAgICAgICAgICAgICAgICAgIGFjY1trZXldID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZmFsc2UnOlxuICAgICAgICAgICAgICAgICAgICBhY2Nba2V5XSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgICAgICAgICAgICAgICAgYWNjW2tleV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBhY2Nba2V5XSA9IGF0dHJpYnV0ZS52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIGluaXRpYWxPYmopO1xuICAgIHJldHVybiBvcHRpb25zO1xufTtcbmZ1bmN0aW9uIGFkZENsYXNzZXMkMShlbCwgY2xhc3Nlcykge1xuICAgIHZhciBfYTtcbiAgICBpZiAoIWVsKVxuICAgICAgICByZXR1cm47XG4gICAgKF9hID0gZWwuY2xhc3NMaXN0KS5hZGQuYXBwbHkoX2EsIGNsYXNzZXMuc3BsaXQoJyAnKSk7XG59XG5mdW5jdGlvbiByZW1vdmVDbGFzc2VzJDEoZWwsIGNsYXNzZXMpIHtcbiAgICBpZiAoIWVsKVxuICAgICAgICByZXR1cm47XG4gICAgY2xhc3Nlcy5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjbGFzc05hbWVzVG9RdWVyeSQxKGNsYXNzTmFtZXMpIHtcbiAgICByZXR1cm4gXCIuXCIuY29uY2F0KGNsYXNzTmFtZXMuc3BsaXQoJyAnKS5qb2luKCcuJykpO1xufVxuXG52YXIgaGVscGVycyA9IC8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKHtcbiAgICBfX3Byb3RvX186IG51bGwsXG4gICAgZ2V0RWxlbWVudFdpbmRvdzogZ2V0RWxlbWVudFdpbmRvdyQxLFxuICAgIGdldEVsZW1lbnREb2N1bWVudDogZ2V0RWxlbWVudERvY3VtZW50JDEsXG4gICAgZ2V0T3B0aW9uczogZ2V0T3B0aW9ucyQxLFxuICAgIGFkZENsYXNzZXM6IGFkZENsYXNzZXMkMSxcbiAgICByZW1vdmVDbGFzc2VzOiByZW1vdmVDbGFzc2VzJDEsXG4gICAgY2xhc3NOYW1lc1RvUXVlcnk6IGNsYXNzTmFtZXNUb1F1ZXJ5JDFcbn0pO1xuXG52YXIgZ2V0RWxlbWVudFdpbmRvdyA9IGdldEVsZW1lbnRXaW5kb3ckMSwgZ2V0RWxlbWVudERvY3VtZW50ID0gZ2V0RWxlbWVudERvY3VtZW50JDEsIGdldE9wdGlvbnMgPSBnZXRPcHRpb25zJDEsIGFkZENsYXNzZXMgPSBhZGRDbGFzc2VzJDEsIHJlbW92ZUNsYXNzZXMgPSByZW1vdmVDbGFzc2VzJDEsIGNsYXNzTmFtZXNUb1F1ZXJ5ID0gY2xhc3NOYW1lc1RvUXVlcnkkMTtcbnZhciBTaW1wbGVCYXJDb3JlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNpbXBsZUJhckNvcmUoZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLnJlbW92ZVByZXZlbnRDbGlja0lkID0gbnVsbDtcbiAgICAgICAgdGhpcy5taW5TY3JvbGxiYXJXaWR0aCA9IDIwO1xuICAgICAgICB0aGlzLnN0b3BTY3JvbGxEZWxheSA9IDE3NTtcbiAgICAgICAgdGhpcy5pc1Njcm9sbGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTW91c2VFbnRlcmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjcm9sbFhUaWNraW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2Nyb2xsWVRpY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy53cmFwcGVyRWwgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRlbnRXcmFwcGVyRWwgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRlbnRFbCA9IG51bGw7XG4gICAgICAgIHRoaXMub2Zmc2V0RWwgPSBudWxsO1xuICAgICAgICB0aGlzLm1hc2tFbCA9IG51bGw7XG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXJFbCA9IG51bGw7XG4gICAgICAgIHRoaXMuaGVpZ2h0QXV0b09ic2VydmVyV3JhcHBlckVsID0gbnVsbDtcbiAgICAgICAgdGhpcy5oZWlnaHRBdXRvT2JzZXJ2ZXJFbCA9IG51bGw7XG4gICAgICAgIHRoaXMucnRsSGVscGVycyA9IG51bGw7XG4gICAgICAgIHRoaXMuc2Nyb2xsYmFyV2lkdGggPSAwO1xuICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5tdXRhdGlvbk9ic2VydmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5lbFN0eWxlcyA9IG51bGw7XG4gICAgICAgIHRoaXMuaXNSdGwgPSBudWxsO1xuICAgICAgICB0aGlzLm1vdXNlWCA9IDA7XG4gICAgICAgIHRoaXMubW91c2VZID0gMDtcbiAgICAgICAgdGhpcy5vbk1vdXNlTW92ZSA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAgICAgdGhpcy5vbldpbmRvd1Jlc2l6ZSA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAgICAgdGhpcy5vblN0b3BTY3JvbGxpbmcgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgIHRoaXMub25Nb3VzZUVudGVyZWQgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPbiBzY3JvbGwgZXZlbnQgaGFuZGxpbmdcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMub25TY3JvbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZWxXaW5kb3cgPSBnZXRFbGVtZW50V2luZG93KF90aGlzLmVsKTtcbiAgICAgICAgICAgIGlmICghX3RoaXMuc2Nyb2xsWFRpY2tpbmcpIHtcbiAgICAgICAgICAgICAgICBlbFdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoX3RoaXMuc2Nyb2xsWCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2Nyb2xsWFRpY2tpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFfdGhpcy5zY3JvbGxZVGlja2luZykge1xuICAgICAgICAgICAgICAgIGVsV2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShfdGhpcy5zY3JvbGxZKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5zY3JvbGxZVGlja2luZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIV90aGlzLmlzU2Nyb2xsaW5nKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaXNTY3JvbGxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGFkZENsYXNzZXMoX3RoaXMuZWwsIF90aGlzLmNsYXNzTmFtZXMuc2Nyb2xsaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLnNob3dTY3JvbGxiYXIoJ3gnKTtcbiAgICAgICAgICAgIF90aGlzLnNob3dTY3JvbGxiYXIoJ3knKTtcbiAgICAgICAgICAgIF90aGlzLm9uU3RvcFNjcm9sbGluZygpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjcm9sbFggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMuYXhpcy54LmlzT3ZlcmZsb3dpbmcpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5wb3NpdGlvblNjcm9sbGJhcigneCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuc2Nyb2xsWFRpY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY3JvbGxZID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKF90aGlzLmF4aXMueS5pc092ZXJmbG93aW5nKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMucG9zaXRpb25TY3JvbGxiYXIoJ3knKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLnNjcm9sbFlUaWNraW5nID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX29uU3RvcFNjcm9sbGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzZXMoX3RoaXMuZWwsIF90aGlzLmNsYXNzTmFtZXMuc2Nyb2xsaW5nKTtcbiAgICAgICAgICAgIGlmIChfdGhpcy5vcHRpb25zLmF1dG9IaWRlKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaGlkZVNjcm9sbGJhcigneCcpO1xuICAgICAgICAgICAgICAgIF90aGlzLmhpZGVTY3JvbGxiYXIoJ3knKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmlzU2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25Nb3VzZUVudGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFfdGhpcy5pc01vdXNlRW50ZXJpbmcpIHtcbiAgICAgICAgICAgICAgICBhZGRDbGFzc2VzKF90aGlzLmVsLCBfdGhpcy5jbGFzc05hbWVzLm1vdXNlRW50ZXJlZCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2hvd1Njcm9sbGJhcigneCcpO1xuICAgICAgICAgICAgICAgIF90aGlzLnNob3dTY3JvbGxiYXIoJ3knKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5pc01vdXNlRW50ZXJpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMub25Nb3VzZUVudGVyZWQoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fb25Nb3VzZUVudGVyZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZW1vdmVDbGFzc2VzKF90aGlzLmVsLCBfdGhpcy5jbGFzc05hbWVzLm1vdXNlRW50ZXJlZCk7XG4gICAgICAgICAgICBpZiAoX3RoaXMub3B0aW9ucy5hdXRvSGlkZSkge1xuICAgICAgICAgICAgICAgIF90aGlzLmhpZGVTY3JvbGxiYXIoJ3gnKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5oaWRlU2Nyb2xsYmFyKCd5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5pc01vdXNlRW50ZXJpbmcgPSBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fb25Nb3VzZU1vdmUgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgX3RoaXMubW91c2VYID0gZS5jbGllbnRYO1xuICAgICAgICAgICAgX3RoaXMubW91c2VZID0gZS5jbGllbnRZO1xuICAgICAgICAgICAgaWYgKF90aGlzLmF4aXMueC5pc092ZXJmbG93aW5nIHx8IF90aGlzLmF4aXMueC5mb3JjZVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5vbk1vdXNlTW92ZUZvckF4aXMoJ3gnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChfdGhpcy5heGlzLnkuaXNPdmVyZmxvd2luZyB8fCBfdGhpcy5heGlzLnkuZm9yY2VWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMub25Nb3VzZU1vdmVGb3JBeGlzKCd5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25Nb3VzZUxlYXZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMub25Nb3VzZU1vdmUuY2FuY2VsKCk7XG4gICAgICAgICAgICBpZiAoX3RoaXMuYXhpcy54LmlzT3ZlcmZsb3dpbmcgfHwgX3RoaXMuYXhpcy54LmZvcmNlVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIF90aGlzLm9uTW91c2VMZWF2ZUZvckF4aXMoJ3gnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChfdGhpcy5heGlzLnkuaXNPdmVyZmxvd2luZyB8fCBfdGhpcy5heGlzLnkuZm9yY2VWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMub25Nb3VzZUxlYXZlRm9yQXhpcygneScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMubW91c2VYID0gLTE7XG4gICAgICAgICAgICBfdGhpcy5tb3VzZVkgPSAtMTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fb25XaW5kb3dSZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBSZWNhbGN1bGF0ZSBzY3JvbGxiYXJXaWR0aCBpbiBjYXNlIGl0J3MgYSB6b29tXG4gICAgICAgICAgICBfdGhpcy5zY3JvbGxiYXJXaWR0aCA9IF90aGlzLmdldFNjcm9sbGJhcldpZHRoKCk7XG4gICAgICAgICAgICBfdGhpcy5oaWRlTmF0aXZlU2Nyb2xsYmFyKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25Qb2ludGVyRXZlbnQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKCFfdGhpcy5heGlzLngudHJhY2suZWwgfHxcbiAgICAgICAgICAgICAgICAhX3RoaXMuYXhpcy55LnRyYWNrLmVsIHx8XG4gICAgICAgICAgICAgICAgIV90aGlzLmF4aXMueC5zY3JvbGxiYXIuZWwgfHxcbiAgICAgICAgICAgICAgICAhX3RoaXMuYXhpcy55LnNjcm9sbGJhci5lbClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB2YXIgaXNXaXRoaW5UcmFja1hCb3VuZHMsIGlzV2l0aGluVHJhY2tZQm91bmRzO1xuICAgICAgICAgICAgX3RoaXMuYXhpcy54LnRyYWNrLnJlY3QgPSBfdGhpcy5heGlzLngudHJhY2suZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBfdGhpcy5heGlzLnkudHJhY2sucmVjdCA9IF90aGlzLmF4aXMueS50cmFjay5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGlmIChfdGhpcy5heGlzLnguaXNPdmVyZmxvd2luZyB8fCBfdGhpcy5heGlzLnguZm9yY2VWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgaXNXaXRoaW5UcmFja1hCb3VuZHMgPSBfdGhpcy5pc1dpdGhpbkJvdW5kcyhfdGhpcy5heGlzLngudHJhY2sucmVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoX3RoaXMuYXhpcy55LmlzT3ZlcmZsb3dpbmcgfHwgX3RoaXMuYXhpcy55LmZvcmNlVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIGlzV2l0aGluVHJhY2tZQm91bmRzID0gX3RoaXMuaXNXaXRoaW5Cb3VuZHMoX3RoaXMuYXhpcy55LnRyYWNrLnJlY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgYW55IHBvaW50ZXIgZXZlbnQgaXMgY2FsbGVkIG9uIHRoZSBzY3JvbGxiYXJcbiAgICAgICAgICAgIGlmIChpc1dpdGhpblRyYWNrWEJvdW5kcyB8fCBpc1dpdGhpblRyYWNrWUJvdW5kcykge1xuICAgICAgICAgICAgICAgIC8vIFByZXZlbnQgZXZlbnQgbGVha2luZ1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKGUudHlwZSA9PT0gJ3BvaW50ZXJkb3duJyAmJiBlLnBvaW50ZXJUeXBlICE9PSAndG91Y2gnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1dpdGhpblRyYWNrWEJvdW5kcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuYXhpcy54LnNjcm9sbGJhci5yZWN0ID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5heGlzLnguc2Nyb2xsYmFyLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLmlzV2l0aGluQm91bmRzKF90aGlzLmF4aXMueC5zY3JvbGxiYXIucmVjdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vbkRyYWdTdGFydChlLCAneCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub25UcmFja0NsaWNrKGUsICd4Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzV2l0aGluVHJhY2tZQm91bmRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5heGlzLnkuc2Nyb2xsYmFyLnJlY3QgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmF4aXMueS5zY3JvbGxiYXIuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuaXNXaXRoaW5Cb3VuZHMoX3RoaXMuYXhpcy55LnNjcm9sbGJhci5yZWN0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm9uRHJhZ1N0YXJ0KGUsICd5Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vblRyYWNrQ2xpY2soZSwgJ3knKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERyYWcgc2Nyb2xsYmFyIGhhbmRsZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kcmFnID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZywgX2gsIF9qLCBfaywgX2w7XG4gICAgICAgICAgICBpZiAoIV90aGlzLmRyYWdnZWRBeGlzIHx8ICFfdGhpcy5jb250ZW50V3JhcHBlckVsKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHZhciBldmVudE9mZnNldDtcbiAgICAgICAgICAgIHZhciB0cmFjayA9IF90aGlzLmF4aXNbX3RoaXMuZHJhZ2dlZEF4aXNdLnRyYWNrO1xuICAgICAgICAgICAgdmFyIHRyYWNrU2l6ZSA9IChfYiA9IChfYSA9IHRyYWNrLnJlY3QpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVtfdGhpcy5heGlzW190aGlzLmRyYWdnZWRBeGlzXS5zaXplQXR0cl0pICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IDA7XG4gICAgICAgICAgICB2YXIgc2Nyb2xsYmFyID0gX3RoaXMuYXhpc1tfdGhpcy5kcmFnZ2VkQXhpc10uc2Nyb2xsYmFyO1xuICAgICAgICAgICAgdmFyIGNvbnRlbnRTaXplID0gKF9kID0gKF9jID0gX3RoaXMuY29udGVudFdyYXBwZXJFbCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jW190aGlzLmF4aXNbX3RoaXMuZHJhZ2dlZEF4aXNdLnNjcm9sbFNpemVBdHRyXSkgIT09IG51bGwgJiYgX2QgIT09IHZvaWQgMCA/IF9kIDogMDtcbiAgICAgICAgICAgIHZhciBob3N0U2l6ZSA9IHBhcnNlSW50KChfZiA9IChfZSA9IF90aGlzLmVsU3R5bGVzKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2VbX3RoaXMuYXhpc1tfdGhpcy5kcmFnZ2VkQXhpc10uc2l6ZUF0dHJdKSAhPT0gbnVsbCAmJiBfZiAhPT0gdm9pZCAwID8gX2YgOiAnMHB4JywgMTApO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGlmIChfdGhpcy5kcmFnZ2VkQXhpcyA9PT0gJ3knKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRPZmZzZXQgPSBlLnBhZ2VZO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZXZlbnRPZmZzZXQgPSBlLnBhZ2VYO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIGhvdyBmYXIgdGhlIHVzZXIncyBtb3VzZSBpcyBmcm9tIHRoZSB0b3AvbGVmdCBvZiB0aGUgc2Nyb2xsYmFyIChtaW51cyB0aGUgZHJhZ09mZnNldCkuXG4gICAgICAgICAgICB2YXIgZHJhZ1BvcyA9IGV2ZW50T2Zmc2V0IC1cbiAgICAgICAgICAgICAgICAoKF9oID0gKF9nID0gdHJhY2sucmVjdCkgPT09IG51bGwgfHwgX2cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9nW190aGlzLmF4aXNbX3RoaXMuZHJhZ2dlZEF4aXNdLm9mZnNldEF0dHJdKSAhPT0gbnVsbCAmJiBfaCAhPT0gdm9pZCAwID8gX2ggOiAwKSAtXG4gICAgICAgICAgICAgICAgX3RoaXMuYXhpc1tfdGhpcy5kcmFnZ2VkQXhpc10uZHJhZ09mZnNldDtcbiAgICAgICAgICAgIGRyYWdQb3MgPSBfdGhpcy5kcmFnZ2VkQXhpcyA9PT0gJ3gnICYmIF90aGlzLmlzUnRsXG4gICAgICAgICAgICAgICAgPyAoKF9rID0gKF9qID0gdHJhY2sucmVjdCkgPT09IG51bGwgfHwgX2ogPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9qW190aGlzLmF4aXNbX3RoaXMuZHJhZ2dlZEF4aXNdLnNpemVBdHRyXSkgIT09IG51bGwgJiYgX2sgIT09IHZvaWQgMCA/IF9rIDogMCkgLVxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxiYXIuc2l6ZSAtXG4gICAgICAgICAgICAgICAgICAgIGRyYWdQb3NcbiAgICAgICAgICAgICAgICA6IGRyYWdQb3M7XG4gICAgICAgICAgICAvLyBDb252ZXJ0IHRoZSBtb3VzZSBwb3NpdGlvbiBpbnRvIGEgcGVyY2VudGFnZSBvZiB0aGUgc2Nyb2xsYmFyIGhlaWdodC93aWR0aC5cbiAgICAgICAgICAgIHZhciBkcmFnUGVyYyA9IGRyYWdQb3MgLyAodHJhY2tTaXplIC0gc2Nyb2xsYmFyLnNpemUpO1xuICAgICAgICAgICAgLy8gU2Nyb2xsIHRoZSBjb250ZW50IGJ5IHRoZSBzYW1lIHBlcmNlbnRhZ2UuXG4gICAgICAgICAgICB2YXIgc2Nyb2xsUG9zID0gZHJhZ1BlcmMgKiAoY29udGVudFNpemUgLSBob3N0U2l6ZSk7XG4gICAgICAgICAgICAvLyBGaXggYnJvd3NlcnMgaW5jb25zaXN0ZW5jeSBvbiBSVExcbiAgICAgICAgICAgIGlmIChfdGhpcy5kcmFnZ2VkQXhpcyA9PT0gJ3gnICYmIF90aGlzLmlzUnRsKSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsUG9zID0gKChfbCA9IFNpbXBsZUJhckNvcmUuZ2V0UnRsSGVscGVycygpKSA9PT0gbnVsbCB8fCBfbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2wuaXNTY3JvbGxpbmdUb05lZ2F0aXZlKVxuICAgICAgICAgICAgICAgICAgICA/IC1zY3JvbGxQb3NcbiAgICAgICAgICAgICAgICAgICAgOiBzY3JvbGxQb3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5jb250ZW50V3JhcHBlckVsW190aGlzLmF4aXNbX3RoaXMuZHJhZ2dlZEF4aXNdLnNjcm9sbE9mZnNldEF0dHJdID1cbiAgICAgICAgICAgICAgICBzY3JvbGxQb3M7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFbmQgc2Nyb2xsIGhhbmRsZSBkcmFnXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm9uRW5kRHJhZyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgZWxEb2N1bWVudCA9IGdldEVsZW1lbnREb2N1bWVudChfdGhpcy5lbCk7XG4gICAgICAgICAgICB2YXIgZWxXaW5kb3cgPSBnZXRFbGVtZW50V2luZG93KF90aGlzLmVsKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICByZW1vdmVDbGFzc2VzKF90aGlzLmVsLCBfdGhpcy5jbGFzc05hbWVzLmRyYWdnaW5nKTtcbiAgICAgICAgICAgIGVsRG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgX3RoaXMuZHJhZywgdHJ1ZSk7XG4gICAgICAgICAgICBlbERvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBfdGhpcy5vbkVuZERyYWcsIHRydWUpO1xuICAgICAgICAgICAgX3RoaXMucmVtb3ZlUHJldmVudENsaWNrSWQgPSBlbFdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlc2UgYXN5bmNocm9ub3VzbHkgc28gd2Ugc3RpbGwgc3VwcHJlc3MgY2xpY2sgZXZlbnRzXG4gICAgICAgICAgICAgICAgLy8gZ2VuZXJhdGVkIHNpbXVsdGFuZW91c2x5IHdpdGggbW91c2V1cC5cbiAgICAgICAgICAgICAgICBlbERvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX3RoaXMucHJldmVudENsaWNrLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBlbERvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgX3RoaXMucHJldmVudENsaWNrLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5yZW1vdmVQcmV2ZW50Q2xpY2tJZCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhhbmRsZXIgdG8gaWdub3JlIGNsaWNrIGV2ZW50cyBkdXJpbmcgZHJhZ1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wcmV2ZW50Q2xpY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5lbCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBTaW1wbGVCYXJDb3JlLmRlZmF1bHRPcHRpb25zKSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuY2xhc3NOYW1lcyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBTaW1wbGVCYXJDb3JlLmRlZmF1bHRPcHRpb25zLmNsYXNzTmFtZXMpLCBvcHRpb25zLmNsYXNzTmFtZXMpO1xuICAgICAgICB0aGlzLmF4aXMgPSB7XG4gICAgICAgICAgICB4OiB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsT2Zmc2V0QXR0cjogJ3Njcm9sbExlZnQnLFxuICAgICAgICAgICAgICAgIHNpemVBdHRyOiAnd2lkdGgnLFxuICAgICAgICAgICAgICAgIHNjcm9sbFNpemVBdHRyOiAnc2Nyb2xsV2lkdGgnLFxuICAgICAgICAgICAgICAgIG9mZnNldFNpemVBdHRyOiAnb2Zmc2V0V2lkdGgnLFxuICAgICAgICAgICAgICAgIG9mZnNldEF0dHI6ICdsZWZ0JyxcbiAgICAgICAgICAgICAgICBvdmVyZmxvd0F0dHI6ICdvdmVyZmxvd1gnLFxuICAgICAgICAgICAgICAgIGRyYWdPZmZzZXQ6IDAsXG4gICAgICAgICAgICAgICAgaXNPdmVyZmxvd2luZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmb3JjZVZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHRyYWNrOiB7IHNpemU6IG51bGwsIGVsOiBudWxsLCByZWN0OiBudWxsLCBpc1Zpc2libGU6IGZhbHNlIH0sXG4gICAgICAgICAgICAgICAgc2Nyb2xsYmFyOiB7IHNpemU6IG51bGwsIGVsOiBudWxsLCByZWN0OiBudWxsLCBpc1Zpc2libGU6IGZhbHNlIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB5OiB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsT2Zmc2V0QXR0cjogJ3Njcm9sbFRvcCcsXG4gICAgICAgICAgICAgICAgc2l6ZUF0dHI6ICdoZWlnaHQnLFxuICAgICAgICAgICAgICAgIHNjcm9sbFNpemVBdHRyOiAnc2Nyb2xsSGVpZ2h0JyxcbiAgICAgICAgICAgICAgICBvZmZzZXRTaXplQXR0cjogJ29mZnNldEhlaWdodCcsXG4gICAgICAgICAgICAgICAgb2Zmc2V0QXR0cjogJ3RvcCcsXG4gICAgICAgICAgICAgICAgb3ZlcmZsb3dBdHRyOiAnb3ZlcmZsb3dZJyxcbiAgICAgICAgICAgICAgICBkcmFnT2Zmc2V0OiAwLFxuICAgICAgICAgICAgICAgIGlzT3ZlcmZsb3dpbmc6IHRydWUsXG4gICAgICAgICAgICAgICAgZm9yY2VWaXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0cmFjazogeyBzaXplOiBudWxsLCBlbDogbnVsbCwgcmVjdDogbnVsbCwgaXNWaXNpYmxlOiBmYWxzZSB9LFxuICAgICAgICAgICAgICAgIHNjcm9sbGJhcjogeyBzaXplOiBudWxsLCBlbDogbnVsbCwgcmVjdDogbnVsbCwgaXNWaXNpYmxlOiBmYWxzZSB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5lbCAhPT0gJ29iamVjdCcgfHwgIXRoaXMuZWwubm9kZU5hbWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFyZ3VtZW50IHBhc3NlZCB0byBTaW1wbGVCYXIgbXVzdCBiZSBhbiBIVE1MIGVsZW1lbnQgaW5zdGVhZCBvZiBcIi5jb25jYXQodGhpcy5lbCkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25Nb3VzZU1vdmUgPSB0aHJvdHRsZSh0aGlzLl9vbk1vdXNlTW92ZSwgNjQpO1xuICAgICAgICB0aGlzLm9uV2luZG93UmVzaXplID0gZGVib3VuY2UodGhpcy5fb25XaW5kb3dSZXNpemUsIDY0LCB7IGxlYWRpbmc6IHRydWUgfSk7XG4gICAgICAgIHRoaXMub25TdG9wU2Nyb2xsaW5nID0gZGVib3VuY2UodGhpcy5fb25TdG9wU2Nyb2xsaW5nLCB0aGlzLnN0b3BTY3JvbGxEZWxheSk7XG4gICAgICAgIHRoaXMub25Nb3VzZUVudGVyZWQgPSBkZWJvdW5jZSh0aGlzLl9vbk1vdXNlRW50ZXJlZCwgdGhpcy5zdG9wU2Nyb2xsRGVsYXkpO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGVscGVyIHRvIGZpeCBicm93c2VycyBpbmNvbnNpc3RlbmN5IG9uIFJUTDpcbiAgICAgKiAgLSBGaXJlZm94IGludmVydHMgdGhlIHNjcm9sbGJhciBpbml0aWFsIHBvc2l0aW9uXG4gICAgICogIC0gSUUxMSBpbnZlcnRzIGJvdGggc2Nyb2xsYmFyIHBvc2l0aW9uIGFuZCBzY3JvbGxpbmcgb2Zmc2V0XG4gICAgICogRGlyZWN0bHkgaW5zcGlyZWQgYnkgQEtpbmdTb3JhJ3MgT3ZlcmxheVNjcm9sbGJhcnMgaHR0cHM6Ly9naXRodWIuY29tL0tpbmdTb3JhL092ZXJsYXlTY3JvbGxiYXJzL2Jsb2IvbWFzdGVyL2pzL092ZXJsYXlTY3JvbGxiYXJzLmpzI0wxNjM0XG4gICAgICovXG4gICAgU2ltcGxlQmFyQ29yZS5nZXRSdGxIZWxwZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoU2ltcGxlQmFyQ29yZS5ydGxIZWxwZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gU2ltcGxlQmFyQ29yZS5ydGxIZWxwZXJzO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkdW1teURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkdW1teURpdi5pbm5lckhUTUwgPVxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJzaW1wbGViYXItZHVtbXktc2Nyb2xsYmFyLXNpemVcIj48ZGl2PjwvZGl2PjwvZGl2Pic7XG4gICAgICAgIHZhciBzY3JvbGxiYXJEdW1teUVsID0gZHVtbXlEaXYuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIHZhciBkdW1teUNoaWxkID0gc2Nyb2xsYmFyRHVtbXlFbCA9PT0gbnVsbCB8fCBzY3JvbGxiYXJEdW1teUVsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzY3JvbGxiYXJEdW1teUVsLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICBpZiAoIWR1bW15Q2hpbGQpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JvbGxiYXJEdW1teUVsKTtcbiAgICAgICAgc2Nyb2xsYmFyRHVtbXlFbC5zY3JvbGxMZWZ0ID0gMDtcbiAgICAgICAgdmFyIGR1bW15Q29udGFpbmVyT2Zmc2V0ID0gU2ltcGxlQmFyQ29yZS5nZXRPZmZzZXQoc2Nyb2xsYmFyRHVtbXlFbCk7XG4gICAgICAgIHZhciBkdW1teUNoaWxkT2Zmc2V0ID0gU2ltcGxlQmFyQ29yZS5nZXRPZmZzZXQoZHVtbXlDaGlsZCk7XG4gICAgICAgIHNjcm9sbGJhckR1bW15RWwuc2Nyb2xsTGVmdCA9IC05OTk7XG4gICAgICAgIHZhciBkdW1teUNoaWxkT2Zmc2V0QWZ0ZXJTY3JvbGwgPSBTaW1wbGVCYXJDb3JlLmdldE9mZnNldChkdW1teUNoaWxkKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzY3JvbGxiYXJEdW1teUVsKTtcbiAgICAgICAgU2ltcGxlQmFyQ29yZS5ydGxIZWxwZXJzID0ge1xuICAgICAgICAgICAgLy8gZGV0ZXJtaW5lcyBpZiB0aGUgc2Nyb2xsaW5nIGlzIHJlc3BvbmRpbmcgd2l0aCBuZWdhdGl2ZSB2YWx1ZXNcbiAgICAgICAgICAgIGlzU2Nyb2xsT3JpZ2luQXRaZXJvOiBkdW1teUNvbnRhaW5lck9mZnNldC5sZWZ0ICE9PSBkdW1teUNoaWxkT2Zmc2V0LmxlZnQsXG4gICAgICAgICAgICAvLyBkZXRlcm1pbmVzIGlmIHRoZSBvcmlnaW4gc2Nyb2xsYmFyIHBvc2l0aW9uIGlzIGludmVydGVkIG9yIG5vdCAocG9zaXRpb25lZCBvbiBsZWZ0IG9yIHJpZ2h0KVxuICAgICAgICAgICAgaXNTY3JvbGxpbmdUb05lZ2F0aXZlOiBkdW1teUNoaWxkT2Zmc2V0LmxlZnQgIT09IGR1bW15Q2hpbGRPZmZzZXRBZnRlclNjcm9sbC5sZWZ0XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBTaW1wbGVCYXJDb3JlLnJ0bEhlbHBlcnM7XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5nZXRTY3JvbGxiYXJXaWR0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gVHJ5L2NhdGNoIGZvciBGRiA1NiB0aHJvd2luZyBvbiB1bmRlZmluZWQgY29tcHV0ZWRTdHlsZXNcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIERldGVjdCBicm93c2VycyBzdXBwb3J0aW5nIENTUyBzY3JvbGxiYXIgc3R5bGluZyBhbmQgZG8gbm90IGNhbGN1bGF0ZVxuICAgICAgICAgICAgaWYgKCh0aGlzLmNvbnRlbnRXcmFwcGVyRWwgJiZcbiAgICAgICAgICAgICAgICBnZXRDb21wdXRlZFN0eWxlKHRoaXMuY29udGVudFdyYXBwZXJFbCwgJzo6LXdlYmtpdC1zY3JvbGxiYXInKVxuICAgICAgICAgICAgICAgICAgICAuZGlzcGxheSA9PT0gJ25vbmUnKSB8fFxuICAgICAgICAgICAgICAgICdzY3JvbGxiYXJXaWR0aCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlIHx8XG4gICAgICAgICAgICAgICAgJy1tcy1vdmVyZmxvdy1zdHlsZScgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2Nyb2xsYmFyV2lkdGgoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIHNjcm9sbGJhcldpZHRoKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNpbXBsZUJhckNvcmUuZ2V0T2Zmc2V0ID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIHZhciByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHZhciBlbERvY3VtZW50ID0gZ2V0RWxlbWVudERvY3VtZW50KGVsKTtcbiAgICAgICAgdmFyIGVsV2luZG93ID0gZ2V0RWxlbWVudFdpbmRvdyhlbCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b3A6IHJlY3QudG9wICtcbiAgICAgICAgICAgICAgICAoZWxXaW5kb3cucGFnZVlPZmZzZXQgfHwgZWxEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wKSxcbiAgICAgICAgICAgIGxlZnQ6IHJlY3QubGVmdCArXG4gICAgICAgICAgICAgICAgKGVsV2luZG93LnBhZ2VYT2Zmc2V0IHx8IGVsRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQpXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBXZSBzdG9wIGhlcmUgb24gc2VydmVyLXNpZGVcbiAgICAgICAgaWYgKGNhblVzZURPTSkge1xuICAgICAgICAgICAgdGhpcy5pbml0RE9NKCk7XG4gICAgICAgICAgICB0aGlzLnJ0bEhlbHBlcnMgPSBTaW1wbGVCYXJDb3JlLmdldFJ0bEhlbHBlcnMoKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsYmFyV2lkdGggPSB0aGlzLmdldFNjcm9sbGJhcldpZHRoKCk7XG4gICAgICAgICAgICB0aGlzLnJlY2FsY3VsYXRlKCk7XG4gICAgICAgICAgICB0aGlzLmluaXRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUuaW5pdERPTSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgLy8gYXNzdW1lIHRoYXQgZWxlbWVudCBoYXMgaGlzIERPTSBhbHJlYWR5IGluaXRpYXRlZFxuICAgICAgICB0aGlzLndyYXBwZXJFbCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcihjbGFzc05hbWVzVG9RdWVyeSh0aGlzLmNsYXNzTmFtZXMud3JhcHBlcikpO1xuICAgICAgICB0aGlzLmNvbnRlbnRXcmFwcGVyRWwgPVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnNjcm9sbGFibGVOb2RlIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5xdWVyeVNlbGVjdG9yKGNsYXNzTmFtZXNUb1F1ZXJ5KHRoaXMuY2xhc3NOYW1lcy5jb250ZW50V3JhcHBlcikpO1xuICAgICAgICB0aGlzLmNvbnRlbnRFbCA9XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuY29udGVudE5vZGUgfHxcbiAgICAgICAgICAgICAgICB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoY2xhc3NOYW1lc1RvUXVlcnkodGhpcy5jbGFzc05hbWVzLmNvbnRlbnRFbCkpO1xuICAgICAgICB0aGlzLm9mZnNldEVsID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKGNsYXNzTmFtZXNUb1F1ZXJ5KHRoaXMuY2xhc3NOYW1lcy5vZmZzZXQpKTtcbiAgICAgICAgdGhpcy5tYXNrRWwgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoY2xhc3NOYW1lc1RvUXVlcnkodGhpcy5jbGFzc05hbWVzLm1hc2spKTtcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlckVsID0gdGhpcy5maW5kQ2hpbGQodGhpcy53cmFwcGVyRWwsIGNsYXNzTmFtZXNUb1F1ZXJ5KHRoaXMuY2xhc3NOYW1lcy5wbGFjZWhvbGRlcikpO1xuICAgICAgICB0aGlzLmhlaWdodEF1dG9PYnNlcnZlcldyYXBwZXJFbCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcihjbGFzc05hbWVzVG9RdWVyeSh0aGlzLmNsYXNzTmFtZXMuaGVpZ2h0QXV0b09ic2VydmVyV3JhcHBlckVsKSk7XG4gICAgICAgIHRoaXMuaGVpZ2h0QXV0b09ic2VydmVyRWwgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoY2xhc3NOYW1lc1RvUXVlcnkodGhpcy5jbGFzc05hbWVzLmhlaWdodEF1dG9PYnNlcnZlckVsKSk7XG4gICAgICAgIHRoaXMuYXhpcy54LnRyYWNrLmVsID0gdGhpcy5maW5kQ2hpbGQodGhpcy5lbCwgXCJcIi5jb25jYXQoY2xhc3NOYW1lc1RvUXVlcnkodGhpcy5jbGFzc05hbWVzLnRyYWNrKSkuY29uY2F0KGNsYXNzTmFtZXNUb1F1ZXJ5KHRoaXMuY2xhc3NOYW1lcy5ob3Jpem9udGFsKSkpO1xuICAgICAgICB0aGlzLmF4aXMueS50cmFjay5lbCA9IHRoaXMuZmluZENoaWxkKHRoaXMuZWwsIFwiXCIuY29uY2F0KGNsYXNzTmFtZXNUb1F1ZXJ5KHRoaXMuY2xhc3NOYW1lcy50cmFjaykpLmNvbmNhdChjbGFzc05hbWVzVG9RdWVyeSh0aGlzLmNsYXNzTmFtZXMudmVydGljYWwpKSk7XG4gICAgICAgIHRoaXMuYXhpcy54LnNjcm9sbGJhci5lbCA9XG4gICAgICAgICAgICAoKF9hID0gdGhpcy5heGlzLngudHJhY2suZWwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5xdWVyeVNlbGVjdG9yKGNsYXNzTmFtZXNUb1F1ZXJ5KHRoaXMuY2xhc3NOYW1lcy5zY3JvbGxiYXIpKSkgfHwgbnVsbDtcbiAgICAgICAgdGhpcy5heGlzLnkuc2Nyb2xsYmFyLmVsID1cbiAgICAgICAgICAgICgoX2IgPSB0aGlzLmF4aXMueS50cmFjay5lbCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnF1ZXJ5U2VsZWN0b3IoY2xhc3NOYW1lc1RvUXVlcnkodGhpcy5jbGFzc05hbWVzLnNjcm9sbGJhcikpKSB8fCBudWxsO1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5hdXRvSGlkZSkge1xuICAgICAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLmF4aXMueC5zY3JvbGxiYXIuZWwsIHRoaXMuY2xhc3NOYW1lcy52aXNpYmxlKTtcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5heGlzLnkuc2Nyb2xsYmFyLmVsLCB0aGlzLmNsYXNzTmFtZXMudmlzaWJsZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLmluaXRMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdmFyIGVsV2luZG93ID0gZ2V0RWxlbWVudFdpbmRvdyh0aGlzLmVsKTtcbiAgICAgICAgLy8gRXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMub25Nb3VzZUVudGVyKTtcbiAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIHRoaXMub25Qb2ludGVyRXZlbnQsIHRydWUpO1xuICAgICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMub25Nb3VzZU1vdmUpO1xuICAgICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLm9uTW91c2VMZWF2ZSk7XG4gICAgICAgIChfYSA9IHRoaXMuY29udGVudFdyYXBwZXJFbCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMub25TY3JvbGwpO1xuICAgICAgICAvLyBCcm93c2VyIHpvb20gdHJpZ2dlcnMgYSB3aW5kb3cgcmVzaXplXG4gICAgICAgIGVsV2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25XaW5kb3dSZXNpemUpO1xuICAgICAgICBpZiAoIXRoaXMuY29udGVudEVsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAod2luZG93LlJlc2l6ZU9ic2VydmVyKSB7XG4gICAgICAgICAgICAvLyBIYWNrIGZvciBodHRwczovL2dpdGh1Yi5jb20vV0lDRy9SZXNpemVPYnNlcnZlci9pc3N1ZXMvMzhcbiAgICAgICAgICAgIHZhciByZXNpemVPYnNlcnZlclN0YXJ0ZWRfMSA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHJlc2l6ZU9ic2VydmVyID0gZWxXaW5kb3cuUmVzaXplT2JzZXJ2ZXIgfHwgUmVzaXplT2JzZXJ2ZXI7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbmV3IHJlc2l6ZU9ic2VydmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc2l6ZU9ic2VydmVyU3RhcnRlZF8xKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgZWxXaW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucmVjYWxjdWxhdGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuZWwpO1xuICAgICAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuY29udGVudEVsKTtcbiAgICAgICAgICAgIGVsV2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVzaXplT2JzZXJ2ZXJTdGFydGVkXzEgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhpcyBpcyByZXF1aXJlZCB0byBkZXRlY3QgaG9yaXpvbnRhbCBzY3JvbGwuIFZlcnRpY2FsIHNjcm9sbCBvbmx5IG5lZWRzIHRoZSByZXNpemVPYnNlcnZlci5cbiAgICAgICAgdGhpcy5tdXRhdGlvbk9ic2VydmVyID0gbmV3IGVsV2luZG93Lk11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZWxXaW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5yZWNhbGN1bGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmNvbnRlbnRFbCwge1xuICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgIGNoYXJhY3RlckRhdGE6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5yZWNhbGN1bGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhlaWdodEF1dG9PYnNlcnZlckVsIHx8XG4gICAgICAgICAgICAhdGhpcy5jb250ZW50RWwgfHxcbiAgICAgICAgICAgICF0aGlzLmNvbnRlbnRXcmFwcGVyRWwgfHxcbiAgICAgICAgICAgICF0aGlzLndyYXBwZXJFbCB8fFxuICAgICAgICAgICAgIXRoaXMucGxhY2Vob2xkZXJFbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIGVsV2luZG93ID0gZ2V0RWxlbWVudFdpbmRvdyh0aGlzLmVsKTtcbiAgICAgICAgdGhpcy5lbFN0eWxlcyA9IGVsV2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbCk7XG4gICAgICAgIHRoaXMuaXNSdGwgPSB0aGlzLmVsU3R5bGVzLmRpcmVjdGlvbiA9PT0gJ3J0bCc7XG4gICAgICAgIHZhciBjb250ZW50RWxPZmZzZXRXaWR0aCA9IHRoaXMuY29udGVudEVsLm9mZnNldFdpZHRoO1xuICAgICAgICB2YXIgaXNIZWlnaHRBdXRvID0gdGhpcy5oZWlnaHRBdXRvT2JzZXJ2ZXJFbC5vZmZzZXRIZWlnaHQgPD0gMTtcbiAgICAgICAgdmFyIGlzV2lkdGhBdXRvID0gdGhpcy5oZWlnaHRBdXRvT2JzZXJ2ZXJFbC5vZmZzZXRXaWR0aCA8PSAxIHx8IGNvbnRlbnRFbE9mZnNldFdpZHRoID4gMDtcbiAgICAgICAgdmFyIGNvbnRlbnRXcmFwcGVyRWxPZmZzZXRXaWR0aCA9IHRoaXMuY29udGVudFdyYXBwZXJFbC5vZmZzZXRXaWR0aDtcbiAgICAgICAgdmFyIGVsT3ZlcmZsb3dYID0gdGhpcy5lbFN0eWxlcy5vdmVyZmxvd1g7XG4gICAgICAgIHZhciBlbE92ZXJmbG93WSA9IHRoaXMuZWxTdHlsZXMub3ZlcmZsb3dZO1xuICAgICAgICB0aGlzLmNvbnRlbnRFbC5zdHlsZS5wYWRkaW5nID0gXCJcIi5jb25jYXQodGhpcy5lbFN0eWxlcy5wYWRkaW5nVG9wLCBcIiBcIikuY29uY2F0KHRoaXMuZWxTdHlsZXMucGFkZGluZ1JpZ2h0LCBcIiBcIikuY29uY2F0KHRoaXMuZWxTdHlsZXMucGFkZGluZ0JvdHRvbSwgXCIgXCIpLmNvbmNhdCh0aGlzLmVsU3R5bGVzLnBhZGRpbmdMZWZ0KTtcbiAgICAgICAgdGhpcy53cmFwcGVyRWwuc3R5bGUubWFyZ2luID0gXCItXCIuY29uY2F0KHRoaXMuZWxTdHlsZXMucGFkZGluZ1RvcCwgXCIgLVwiKS5jb25jYXQodGhpcy5lbFN0eWxlcy5wYWRkaW5nUmlnaHQsIFwiIC1cIikuY29uY2F0KHRoaXMuZWxTdHlsZXMucGFkZGluZ0JvdHRvbSwgXCIgLVwiKS5jb25jYXQodGhpcy5lbFN0eWxlcy5wYWRkaW5nTGVmdCk7XG4gICAgICAgIHZhciBjb250ZW50RWxTY3JvbGxIZWlnaHQgPSB0aGlzLmNvbnRlbnRFbC5zY3JvbGxIZWlnaHQ7XG4gICAgICAgIHZhciBjb250ZW50RWxTY3JvbGxXaWR0aCA9IHRoaXMuY29udGVudEVsLnNjcm9sbFdpZHRoO1xuICAgICAgICB0aGlzLmNvbnRlbnRXcmFwcGVyRWwuc3R5bGUuaGVpZ2h0ID0gaXNIZWlnaHRBdXRvID8gJ2F1dG8nIDogJzEwMCUnO1xuICAgICAgICAvLyBEZXRlcm1pbmUgcGxhY2Vob2xkZXIgc2l6ZVxuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyRWwuc3R5bGUud2lkdGggPSBpc1dpZHRoQXV0b1xuICAgICAgICAgICAgPyBcIlwiLmNvbmNhdChjb250ZW50RWxPZmZzZXRXaWR0aCB8fCBjb250ZW50RWxTY3JvbGxXaWR0aCwgXCJweFwiKVxuICAgICAgICAgICAgOiAnYXV0byc7XG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXJFbC5zdHlsZS5oZWlnaHQgPSBcIlwiLmNvbmNhdChjb250ZW50RWxTY3JvbGxIZWlnaHQsIFwicHhcIik7XG4gICAgICAgIHZhciBjb250ZW50V3JhcHBlckVsT2Zmc2V0SGVpZ2h0ID0gdGhpcy5jb250ZW50V3JhcHBlckVsLm9mZnNldEhlaWdodDtcbiAgICAgICAgdGhpcy5heGlzLnguaXNPdmVyZmxvd2luZyA9XG4gICAgICAgICAgICBjb250ZW50RWxPZmZzZXRXaWR0aCAhPT0gMCAmJiBjb250ZW50RWxTY3JvbGxXaWR0aCA+IGNvbnRlbnRFbE9mZnNldFdpZHRoO1xuICAgICAgICB0aGlzLmF4aXMueS5pc092ZXJmbG93aW5nID1cbiAgICAgICAgICAgIGNvbnRlbnRFbFNjcm9sbEhlaWdodCA+IGNvbnRlbnRXcmFwcGVyRWxPZmZzZXRIZWlnaHQ7XG4gICAgICAgIC8vIFNldCBpc092ZXJmbG93aW5nIHRvIGZhbHNlIGlmIHVzZXIgZXhwbGljaXRlbHkgc2V0IGhpZGRlbiBvdmVyZmxvd1xuICAgICAgICB0aGlzLmF4aXMueC5pc092ZXJmbG93aW5nID1cbiAgICAgICAgICAgIGVsT3ZlcmZsb3dYID09PSAnaGlkZGVuJyA/IGZhbHNlIDogdGhpcy5heGlzLnguaXNPdmVyZmxvd2luZztcbiAgICAgICAgdGhpcy5heGlzLnkuaXNPdmVyZmxvd2luZyA9XG4gICAgICAgICAgICBlbE92ZXJmbG93WSA9PT0gJ2hpZGRlbicgPyBmYWxzZSA6IHRoaXMuYXhpcy55LmlzT3ZlcmZsb3dpbmc7XG4gICAgICAgIHRoaXMuYXhpcy54LmZvcmNlVmlzaWJsZSA9XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuZm9yY2VWaXNpYmxlID09PSAneCcgfHwgdGhpcy5vcHRpb25zLmZvcmNlVmlzaWJsZSA9PT0gdHJ1ZTtcbiAgICAgICAgdGhpcy5heGlzLnkuZm9yY2VWaXNpYmxlID1cbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5mb3JjZVZpc2libGUgPT09ICd5JyB8fCB0aGlzLm9wdGlvbnMuZm9yY2VWaXNpYmxlID09PSB0cnVlO1xuICAgICAgICB0aGlzLmhpZGVOYXRpdmVTY3JvbGxiYXIoKTtcbiAgICAgICAgLy8gU2V0IGlzT3ZlcmZsb3dpbmcgdG8gZmFsc2UgaWYgc2Nyb2xsYmFyIGlzIG5vdCBuZWNlc3NhcnkgKGNvbnRlbnQgaXMgc2hvcnRlciB0aGFuIG9mZnNldClcbiAgICAgICAgdmFyIG9mZnNldEZvclhTY3JvbGxiYXIgPSB0aGlzLmF4aXMueC5pc092ZXJmbG93aW5nXG4gICAgICAgICAgICA/IHRoaXMuc2Nyb2xsYmFyV2lkdGhcbiAgICAgICAgICAgIDogMDtcbiAgICAgICAgdmFyIG9mZnNldEZvcllTY3JvbGxiYXIgPSB0aGlzLmF4aXMueS5pc092ZXJmbG93aW5nXG4gICAgICAgICAgICA/IHRoaXMuc2Nyb2xsYmFyV2lkdGhcbiAgICAgICAgICAgIDogMDtcbiAgICAgICAgdGhpcy5heGlzLnguaXNPdmVyZmxvd2luZyA9XG4gICAgICAgICAgICB0aGlzLmF4aXMueC5pc092ZXJmbG93aW5nICYmXG4gICAgICAgICAgICAgICAgY29udGVudEVsU2Nyb2xsV2lkdGggPiBjb250ZW50V3JhcHBlckVsT2Zmc2V0V2lkdGggLSBvZmZzZXRGb3JZU2Nyb2xsYmFyO1xuICAgICAgICB0aGlzLmF4aXMueS5pc092ZXJmbG93aW5nID1cbiAgICAgICAgICAgIHRoaXMuYXhpcy55LmlzT3ZlcmZsb3dpbmcgJiZcbiAgICAgICAgICAgICAgICBjb250ZW50RWxTY3JvbGxIZWlnaHQgPlxuICAgICAgICAgICAgICAgICAgICBjb250ZW50V3JhcHBlckVsT2Zmc2V0SGVpZ2h0IC0gb2Zmc2V0Rm9yWFNjcm9sbGJhcjtcbiAgICAgICAgdGhpcy5heGlzLnguc2Nyb2xsYmFyLnNpemUgPSB0aGlzLmdldFNjcm9sbGJhclNpemUoJ3gnKTtcbiAgICAgICAgdGhpcy5heGlzLnkuc2Nyb2xsYmFyLnNpemUgPSB0aGlzLmdldFNjcm9sbGJhclNpemUoJ3knKTtcbiAgICAgICAgaWYgKHRoaXMuYXhpcy54LnNjcm9sbGJhci5lbClcbiAgICAgICAgICAgIHRoaXMuYXhpcy54LnNjcm9sbGJhci5lbC5zdHlsZS53aWR0aCA9IFwiXCIuY29uY2F0KHRoaXMuYXhpcy54LnNjcm9sbGJhci5zaXplLCBcInB4XCIpO1xuICAgICAgICBpZiAodGhpcy5heGlzLnkuc2Nyb2xsYmFyLmVsKVxuICAgICAgICAgICAgdGhpcy5heGlzLnkuc2Nyb2xsYmFyLmVsLnN0eWxlLmhlaWdodCA9IFwiXCIuY29uY2F0KHRoaXMuYXhpcy55LnNjcm9sbGJhci5zaXplLCBcInB4XCIpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uU2Nyb2xsYmFyKCd4Jyk7XG4gICAgICAgIHRoaXMucG9zaXRpb25TY3JvbGxiYXIoJ3knKTtcbiAgICAgICAgdGhpcy50b2dnbGVUcmFja1Zpc2liaWxpdHkoJ3gnKTtcbiAgICAgICAgdGhpcy50b2dnbGVUcmFja1Zpc2liaWxpdHkoJ3knKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZSBzY3JvbGxiYXIgc2l6ZVxuICAgICAqL1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLmdldFNjcm9sbGJhclNpemUgPSBmdW5jdGlvbiAoYXhpcykge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBpZiAoYXhpcyA9PT0gdm9pZCAwKSB7IGF4aXMgPSAneSc7IH1cbiAgICAgICAgaWYgKCF0aGlzLmF4aXNbYXhpc10uaXNPdmVyZmxvd2luZyB8fCAhdGhpcy5jb250ZW50RWwpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb250ZW50U2l6ZSA9IHRoaXMuY29udGVudEVsW3RoaXMuYXhpc1theGlzXS5zY3JvbGxTaXplQXR0cl07XG4gICAgICAgIHZhciB0cmFja1NpemUgPSAoX2IgPSAoX2EgPSB0aGlzLmF4aXNbYXhpc10udHJhY2suZWwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVt0aGlzLmF4aXNbYXhpc10ub2Zmc2V0U2l6ZUF0dHJdKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAwO1xuICAgICAgICB2YXIgc2Nyb2xsYmFyUmF0aW8gPSB0cmFja1NpemUgLyBjb250ZW50U2l6ZTtcbiAgICAgICAgdmFyIHNjcm9sbGJhclNpemU7XG4gICAgICAgIC8vIENhbGN1bGF0ZSBuZXcgaGVpZ2h0L3Bvc2l0aW9uIG9mIGRyYWcgaGFuZGxlLlxuICAgICAgICBzY3JvbGxiYXJTaXplID0gTWF0aC5tYXgofn4oc2Nyb2xsYmFyUmF0aW8gKiB0cmFja1NpemUpLCB0aGlzLm9wdGlvbnMuc2Nyb2xsYmFyTWluU2l6ZSk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2Nyb2xsYmFyTWF4U2l6ZSkge1xuICAgICAgICAgICAgc2Nyb2xsYmFyU2l6ZSA9IE1hdGgubWluKHNjcm9sbGJhclNpemUsIHRoaXMub3B0aW9ucy5zY3JvbGxiYXJNYXhTaXplKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2Nyb2xsYmFyU2l6ZTtcbiAgICB9O1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLnBvc2l0aW9uU2Nyb2xsYmFyID0gZnVuY3Rpb24gKGF4aXMpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIGlmIChheGlzID09PSB2b2lkIDApIHsgYXhpcyA9ICd5JzsgfVxuICAgICAgICB2YXIgc2Nyb2xsYmFyID0gdGhpcy5heGlzW2F4aXNdLnNjcm9sbGJhcjtcbiAgICAgICAgaWYgKCF0aGlzLmF4aXNbYXhpc10uaXNPdmVyZmxvd2luZyB8fFxuICAgICAgICAgICAgIXRoaXMuY29udGVudFdyYXBwZXJFbCB8fFxuICAgICAgICAgICAgIXNjcm9sbGJhci5lbCB8fFxuICAgICAgICAgICAgIXRoaXMuZWxTdHlsZXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29udGVudFNpemUgPSB0aGlzLmNvbnRlbnRXcmFwcGVyRWxbdGhpcy5heGlzW2F4aXNdLnNjcm9sbFNpemVBdHRyXTtcbiAgICAgICAgdmFyIHRyYWNrU2l6ZSA9ICgoX2EgPSB0aGlzLmF4aXNbYXhpc10udHJhY2suZWwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVt0aGlzLmF4aXNbYXhpc10ub2Zmc2V0U2l6ZUF0dHJdKSB8fCAwO1xuICAgICAgICB2YXIgaG9zdFNpemUgPSBwYXJzZUludCh0aGlzLmVsU3R5bGVzW3RoaXMuYXhpc1theGlzXS5zaXplQXR0cl0sIDEwKTtcbiAgICAgICAgdmFyIHNjcm9sbE9mZnNldCA9IHRoaXMuY29udGVudFdyYXBwZXJFbFt0aGlzLmF4aXNbYXhpc10uc2Nyb2xsT2Zmc2V0QXR0cl07XG4gICAgICAgIHNjcm9sbE9mZnNldCA9XG4gICAgICAgICAgICBheGlzID09PSAneCcgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmlzUnRsICYmXG4gICAgICAgICAgICAgICAgKChfYiA9IFNpbXBsZUJhckNvcmUuZ2V0UnRsSGVscGVycygpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuaXNTY3JvbGxPcmlnaW5BdFplcm8pXG4gICAgICAgICAgICAgICAgPyAtc2Nyb2xsT2Zmc2V0XG4gICAgICAgICAgICAgICAgOiBzY3JvbGxPZmZzZXQ7XG4gICAgICAgIGlmIChheGlzID09PSAneCcgJiYgdGhpcy5pc1J0bCkge1xuICAgICAgICAgICAgc2Nyb2xsT2Zmc2V0ID0gKChfYyA9IFNpbXBsZUJhckNvcmUuZ2V0UnRsSGVscGVycygpKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuaXNTY3JvbGxpbmdUb05lZ2F0aXZlKVxuICAgICAgICAgICAgICAgID8gc2Nyb2xsT2Zmc2V0XG4gICAgICAgICAgICAgICAgOiAtc2Nyb2xsT2Zmc2V0O1xuICAgICAgICB9XG4gICAgICAgIHZhciBzY3JvbGxQb3VyY2VudCA9IHNjcm9sbE9mZnNldCAvIChjb250ZW50U2l6ZSAtIGhvc3RTaXplKTtcbiAgICAgICAgdmFyIGhhbmRsZU9mZnNldCA9IH5+KCh0cmFja1NpemUgLSBzY3JvbGxiYXIuc2l6ZSkgKiBzY3JvbGxQb3VyY2VudCk7XG4gICAgICAgIGhhbmRsZU9mZnNldCA9XG4gICAgICAgICAgICBheGlzID09PSAneCcgJiYgdGhpcy5pc1J0bFxuICAgICAgICAgICAgICAgID8gLWhhbmRsZU9mZnNldCArICh0cmFja1NpemUgLSBzY3JvbGxiYXIuc2l6ZSlcbiAgICAgICAgICAgICAgICA6IGhhbmRsZU9mZnNldDtcbiAgICAgICAgc2Nyb2xsYmFyLmVsLnN0eWxlLnRyYW5zZm9ybSA9XG4gICAgICAgICAgICBheGlzID09PSAneCdcbiAgICAgICAgICAgICAgICA/IFwidHJhbnNsYXRlM2QoXCIuY29uY2F0KGhhbmRsZU9mZnNldCwgXCJweCwgMCwgMClcIilcbiAgICAgICAgICAgICAgICA6IFwidHJhbnNsYXRlM2QoMCwgXCIuY29uY2F0KGhhbmRsZU9mZnNldCwgXCJweCwgMClcIik7XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS50b2dnbGVUcmFja1Zpc2liaWxpdHkgPSBmdW5jdGlvbiAoYXhpcykge1xuICAgICAgICBpZiAoYXhpcyA9PT0gdm9pZCAwKSB7IGF4aXMgPSAneSc7IH1cbiAgICAgICAgdmFyIHRyYWNrID0gdGhpcy5heGlzW2F4aXNdLnRyYWNrLmVsO1xuICAgICAgICB2YXIgc2Nyb2xsYmFyID0gdGhpcy5heGlzW2F4aXNdLnNjcm9sbGJhci5lbDtcbiAgICAgICAgaWYgKCF0cmFjayB8fCAhc2Nyb2xsYmFyIHx8ICF0aGlzLmNvbnRlbnRXcmFwcGVyRWwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLmF4aXNbYXhpc10uaXNPdmVyZmxvd2luZyB8fCB0aGlzLmF4aXNbYXhpc10uZm9yY2VWaXNpYmxlKSB7XG4gICAgICAgICAgICB0cmFjay5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50V3JhcHBlckVsLnN0eWxlW3RoaXMuYXhpc1theGlzXS5vdmVyZmxvd0F0dHJdID0gJ3Njcm9sbCc7XG4gICAgICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoXCJcIi5jb25jYXQodGhpcy5jbGFzc05hbWVzLnNjcm9sbGFibGUsIFwiLVwiKS5jb25jYXQoYXhpcykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJhY2suc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50V3JhcHBlckVsLnN0eWxlW3RoaXMuYXhpc1theGlzXS5vdmVyZmxvd0F0dHJdID0gJ2hpZGRlbic7XG4gICAgICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoXCJcIi5jb25jYXQodGhpcy5jbGFzc05hbWVzLnNjcm9sbGFibGUsIFwiLVwiKS5jb25jYXQoYXhpcykpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEV2ZW4gaWYgZm9yY2VWaXNpYmxlIGlzIGVuYWJsZWQsIHNjcm9sbGJhciBpdHNlbGYgc2hvdWxkIGJlIGhpZGRlblxuICAgICAgICBpZiAodGhpcy5heGlzW2F4aXNdLmlzT3ZlcmZsb3dpbmcpIHtcbiAgICAgICAgICAgIHNjcm9sbGJhci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNjcm9sbGJhci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5zaG93U2Nyb2xsYmFyID0gZnVuY3Rpb24gKGF4aXMpIHtcbiAgICAgICAgaWYgKGF4aXMgPT09IHZvaWQgMCkgeyBheGlzID0gJ3knOyB9XG4gICAgICAgIGlmICh0aGlzLmF4aXNbYXhpc10uaXNPdmVyZmxvd2luZyAmJiAhdGhpcy5heGlzW2F4aXNdLnNjcm9sbGJhci5pc1Zpc2libGUpIHtcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5heGlzW2F4aXNdLnNjcm9sbGJhci5lbCwgdGhpcy5jbGFzc05hbWVzLnZpc2libGUpO1xuICAgICAgICAgICAgdGhpcy5heGlzW2F4aXNdLnNjcm9sbGJhci5pc1Zpc2libGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5oaWRlU2Nyb2xsYmFyID0gZnVuY3Rpb24gKGF4aXMpIHtcbiAgICAgICAgaWYgKGF4aXMgPT09IHZvaWQgMCkgeyBheGlzID0gJ3knOyB9XG4gICAgICAgIGlmICh0aGlzLmF4aXNbYXhpc10uaXNPdmVyZmxvd2luZyAmJiB0aGlzLmF4aXNbYXhpc10uc2Nyb2xsYmFyLmlzVmlzaWJsZSkge1xuICAgICAgICAgICAgcmVtb3ZlQ2xhc3Nlcyh0aGlzLmF4aXNbYXhpc10uc2Nyb2xsYmFyLmVsLCB0aGlzLmNsYXNzTmFtZXMudmlzaWJsZSk7XG4gICAgICAgICAgICB0aGlzLmF4aXNbYXhpc10uc2Nyb2xsYmFyLmlzVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5oaWRlTmF0aXZlU2Nyb2xsYmFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMub2Zmc2V0RWwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMub2Zmc2V0RWwuc3R5bGVbdGhpcy5pc1J0bCA/ICdsZWZ0JyA6ICdyaWdodCddID1cbiAgICAgICAgICAgIHRoaXMuYXhpcy55LmlzT3ZlcmZsb3dpbmcgfHwgdGhpcy5heGlzLnkuZm9yY2VWaXNpYmxlXG4gICAgICAgICAgICAgICAgPyBcIi1cIi5jb25jYXQodGhpcy5zY3JvbGxiYXJXaWR0aCwgXCJweFwiKVxuICAgICAgICAgICAgICAgIDogJzBweCc7XG4gICAgICAgIHRoaXMub2Zmc2V0RWwuc3R5bGUuYm90dG9tID1cbiAgICAgICAgICAgIHRoaXMuYXhpcy54LmlzT3ZlcmZsb3dpbmcgfHwgdGhpcy5heGlzLnguZm9yY2VWaXNpYmxlXG4gICAgICAgICAgICAgICAgPyBcIi1cIi5jb25jYXQodGhpcy5zY3JvbGxiYXJXaWR0aCwgXCJweFwiKVxuICAgICAgICAgICAgICAgIDogJzBweCc7XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5vbk1vdXNlTW92ZUZvckF4aXMgPSBmdW5jdGlvbiAoYXhpcykge1xuICAgICAgICBpZiAoYXhpcyA9PT0gdm9pZCAwKSB7IGF4aXMgPSAneSc7IH1cbiAgICAgICAgdmFyIGN1cnJlbnRBeGlzID0gdGhpcy5heGlzW2F4aXNdO1xuICAgICAgICBpZiAoIWN1cnJlbnRBeGlzLnRyYWNrLmVsIHx8ICFjdXJyZW50QXhpcy5zY3JvbGxiYXIuZWwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGN1cnJlbnRBeGlzLnRyYWNrLnJlY3QgPSBjdXJyZW50QXhpcy50cmFjay5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY3VycmVudEF4aXMuc2Nyb2xsYmFyLnJlY3QgPVxuICAgICAgICAgICAgY3VycmVudEF4aXMuc2Nyb2xsYmFyLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBpZiAodGhpcy5pc1dpdGhpbkJvdW5kcyhjdXJyZW50QXhpcy50cmFjay5yZWN0KSkge1xuICAgICAgICAgICAgdGhpcy5zaG93U2Nyb2xsYmFyKGF4aXMpO1xuICAgICAgICAgICAgYWRkQ2xhc3NlcyhjdXJyZW50QXhpcy50cmFjay5lbCwgdGhpcy5jbGFzc05hbWVzLmhvdmVyKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzV2l0aGluQm91bmRzKGN1cnJlbnRBeGlzLnNjcm9sbGJhci5yZWN0KSkge1xuICAgICAgICAgICAgICAgIGFkZENsYXNzZXMoY3VycmVudEF4aXMuc2Nyb2xsYmFyLmVsLCB0aGlzLmNsYXNzTmFtZXMuaG92ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3NlcyhjdXJyZW50QXhpcy5zY3JvbGxiYXIuZWwsIHRoaXMuY2xhc3NOYW1lcy5ob3Zlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZW1vdmVDbGFzc2VzKGN1cnJlbnRBeGlzLnRyYWNrLmVsLCB0aGlzLmNsYXNzTmFtZXMuaG92ZXIpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvSGlkZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZVNjcm9sbGJhcihheGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUub25Nb3VzZUxlYXZlRm9yQXhpcyA9IGZ1bmN0aW9uIChheGlzKSB7XG4gICAgICAgIGlmIChheGlzID09PSB2b2lkIDApIHsgYXhpcyA9ICd5JzsgfVxuICAgICAgICByZW1vdmVDbGFzc2VzKHRoaXMuYXhpc1theGlzXS50cmFjay5lbCwgdGhpcy5jbGFzc05hbWVzLmhvdmVyKTtcbiAgICAgICAgcmVtb3ZlQ2xhc3Nlcyh0aGlzLmF4aXNbYXhpc10uc2Nyb2xsYmFyLmVsLCB0aGlzLmNsYXNzTmFtZXMuaG92ZXIpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmF1dG9IaWRlKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVTY3JvbGxiYXIoYXhpcyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIG9uIHNjcm9sbGJhciBoYW5kbGUgZHJhZyBtb3ZlbWVudCBzdGFydHNcbiAgICAgKi9cbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5vbkRyYWdTdGFydCA9IGZ1bmN0aW9uIChlLCBheGlzKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKGF4aXMgPT09IHZvaWQgMCkgeyBheGlzID0gJ3knOyB9XG4gICAgICAgIHZhciBlbERvY3VtZW50ID0gZ2V0RWxlbWVudERvY3VtZW50KHRoaXMuZWwpO1xuICAgICAgICB2YXIgZWxXaW5kb3cgPSBnZXRFbGVtZW50V2luZG93KHRoaXMuZWwpO1xuICAgICAgICB2YXIgc2Nyb2xsYmFyID0gdGhpcy5heGlzW2F4aXNdLnNjcm9sbGJhcjtcbiAgICAgICAgLy8gTWVhc3VyZSBob3cgZmFyIHRoZSB1c2VyJ3MgbW91c2UgaXMgZnJvbSB0aGUgdG9wIG9mIHRoZSBzY3JvbGxiYXIgZHJhZyBoYW5kbGUuXG4gICAgICAgIHZhciBldmVudE9mZnNldCA9IGF4aXMgPT09ICd5JyA/IGUucGFnZVkgOiBlLnBhZ2VYO1xuICAgICAgICB0aGlzLmF4aXNbYXhpc10uZHJhZ09mZnNldCA9XG4gICAgICAgICAgICBldmVudE9mZnNldCAtICgoKF9hID0gc2Nyb2xsYmFyLnJlY3QpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVt0aGlzLmF4aXNbYXhpc10ub2Zmc2V0QXR0cl0pIHx8IDApO1xuICAgICAgICB0aGlzLmRyYWdnZWRBeGlzID0gYXhpcztcbiAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLmVsLCB0aGlzLmNsYXNzTmFtZXMuZHJhZ2dpbmcpO1xuICAgICAgICBlbERvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuZHJhZywgdHJ1ZSk7XG4gICAgICAgIGVsRG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25FbmREcmFnLCB0cnVlKTtcbiAgICAgICAgaWYgKHRoaXMucmVtb3ZlUHJldmVudENsaWNrSWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGVsRG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnByZXZlbnRDbGljaywgdHJ1ZSk7XG4gICAgICAgICAgICBlbERvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgdGhpcy5wcmV2ZW50Q2xpY2ssIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZWxXaW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMucmVtb3ZlUHJldmVudENsaWNrSWQpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVQcmV2ZW50Q2xpY2tJZCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLm9uVHJhY2tDbGljayA9IGZ1bmN0aW9uIChlLCBheGlzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICAgICAgaWYgKGF4aXMgPT09IHZvaWQgMCkgeyBheGlzID0gJ3knOyB9XG4gICAgICAgIHZhciBjdXJyZW50QXhpcyA9IHRoaXMuYXhpc1theGlzXTtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuY2xpY2tPblRyYWNrIHx8XG4gICAgICAgICAgICAhY3VycmVudEF4aXMuc2Nyb2xsYmFyLmVsIHx8XG4gICAgICAgICAgICAhdGhpcy5jb250ZW50V3JhcHBlckVsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvLyBQcmV2ZW50aW5nIHRoZSBldmVudCdzIGRlZmF1bHQgdG8gdHJpZ2dlciBjbGljayB1bmRlcm5lYXRoXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdmFyIGVsV2luZG93ID0gZ2V0RWxlbWVudFdpbmRvdyh0aGlzLmVsKTtcbiAgICAgICAgdGhpcy5heGlzW2F4aXNdLnNjcm9sbGJhci5yZWN0ID1cbiAgICAgICAgICAgIGN1cnJlbnRBeGlzLnNjcm9sbGJhci5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdmFyIHNjcm9sbGJhciA9IHRoaXMuYXhpc1theGlzXS5zY3JvbGxiYXI7XG4gICAgICAgIHZhciBzY3JvbGxiYXJPZmZzZXQgPSAoX2IgPSAoX2EgPSBzY3JvbGxiYXIucmVjdCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW3RoaXMuYXhpc1theGlzXS5vZmZzZXRBdHRyXSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogMDtcbiAgICAgICAgdmFyIGhvc3RTaXplID0gcGFyc2VJbnQoKF9kID0gKF9jID0gdGhpcy5lbFN0eWxlcykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jW3RoaXMuYXhpc1theGlzXS5zaXplQXR0cl0pICE9PSBudWxsICYmIF9kICE9PSB2b2lkIDAgPyBfZCA6ICcwcHgnLCAxMCk7XG4gICAgICAgIHZhciBzY3JvbGxlZCA9IHRoaXMuY29udGVudFdyYXBwZXJFbFt0aGlzLmF4aXNbYXhpc10uc2Nyb2xsT2Zmc2V0QXR0cl07XG4gICAgICAgIHZhciB0ID0gYXhpcyA9PT0gJ3knXG4gICAgICAgICAgICA/IHRoaXMubW91c2VZIC0gc2Nyb2xsYmFyT2Zmc2V0XG4gICAgICAgICAgICA6IHRoaXMubW91c2VYIC0gc2Nyb2xsYmFyT2Zmc2V0O1xuICAgICAgICB2YXIgZGlyID0gdCA8IDAgPyAtMSA6IDE7XG4gICAgICAgIHZhciBzY3JvbGxTaXplID0gZGlyID09PSAtMSA/IHNjcm9sbGVkIC0gaG9zdFNpemUgOiBzY3JvbGxlZCArIGhvc3RTaXplO1xuICAgICAgICB2YXIgc3BlZWQgPSA0MDtcbiAgICAgICAgdmFyIHNjcm9sbFRvID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFfdGhpcy5jb250ZW50V3JhcHBlckVsKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGlmIChkaXIgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbGVkID4gc2Nyb2xsU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxlZCAtPSBzcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29udGVudFdyYXBwZXJFbFtfdGhpcy5heGlzW2F4aXNdLnNjcm9sbE9mZnNldEF0dHJdID0gc2Nyb2xsZWQ7XG4gICAgICAgICAgICAgICAgICAgIGVsV2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzY3JvbGxUbyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbGVkIDwgc2Nyb2xsU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxlZCArPSBzcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29udGVudFdyYXBwZXJFbFtfdGhpcy5heGlzW2F4aXNdLnNjcm9sbE9mZnNldEF0dHJdID0gc2Nyb2xsZWQ7XG4gICAgICAgICAgICAgICAgICAgIGVsV2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzY3JvbGxUbyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzY3JvbGxUbygpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0dGVyIGZvciBjb250ZW50IGVsZW1lbnRcbiAgICAgKi9cbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5nZXRDb250ZW50RWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudEVsO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0dGVyIGZvciBvcmlnaW5hbCBzY3JvbGxpbmcgZWxlbWVudFxuICAgICAqL1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLmdldFNjcm9sbEVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnRXcmFwcGVyRWw7XG4gICAgfTtcbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbFdpbmRvdyA9IGdldEVsZW1lbnRXaW5kb3codGhpcy5lbCk7XG4gICAgICAgIC8vIEV2ZW50IGxpc3RlbmVyc1xuICAgICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLm9uTW91c2VFbnRlcik7XG4gICAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCB0aGlzLm9uUG9pbnRlckV2ZW50LCB0cnVlKTtcbiAgICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlKTtcbiAgICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5vbk1vdXNlTGVhdmUpO1xuICAgICAgICBpZiAodGhpcy5jb250ZW50V3JhcHBlckVsKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRXcmFwcGVyRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5vblNjcm9sbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxXaW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5vbldpbmRvd1Jlc2l6ZSk7XG4gICAgICAgIGlmICh0aGlzLm11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENhbmNlbCBhbGwgZGVib3VuY2VkIGZ1bmN0aW9uc1xuICAgICAgICB0aGlzLm9uTW91c2VNb3ZlLmNhbmNlbCgpO1xuICAgICAgICB0aGlzLm9uV2luZG93UmVzaXplLmNhbmNlbCgpO1xuICAgICAgICB0aGlzLm9uU3RvcFNjcm9sbGluZy5jYW5jZWwoKTtcbiAgICAgICAgdGhpcy5vbk1vdXNlRW50ZXJlZC5jYW5jZWwoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbGwgbGlzdGVuZXJzIGZyb20gRE9NIG5vZGVzXG4gICAgICovXG4gICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUudW5Nb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcnMoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIG1vdXNlIGlzIHdpdGhpbiBib3VuZHNcbiAgICAgKi9cbiAgICBTaW1wbGVCYXJDb3JlLnByb3RvdHlwZS5pc1dpdGhpbkJvdW5kcyA9IGZ1bmN0aW9uIChiYm94KSB7XG4gICAgICAgIHJldHVybiAodGhpcy5tb3VzZVggPj0gYmJveC5sZWZ0ICYmXG4gICAgICAgICAgICB0aGlzLm1vdXNlWCA8PSBiYm94LmxlZnQgKyBiYm94LndpZHRoICYmXG4gICAgICAgICAgICB0aGlzLm1vdXNlWSA+PSBiYm94LnRvcCAmJlxuICAgICAgICAgICAgdGhpcy5tb3VzZVkgPD0gYmJveC50b3AgKyBiYm94LmhlaWdodCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBGaW5kIGVsZW1lbnQgY2hpbGRyZW4gbWF0Y2hlcyBxdWVyeVxuICAgICAqL1xuICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLmZpbmRDaGlsZCA9IGZ1bmN0aW9uIChlbCwgcXVlcnkpIHtcbiAgICAgICAgdmFyIG1hdGNoZXMgPSBlbC5tYXRjaGVzIHx8XG4gICAgICAgICAgICBlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgIGVsLm1vek1hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICAgICAgZWwubXNNYXRjaGVzU2VsZWN0b3I7XG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwoZWwuY2hpbGRyZW4sIGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXMuY2FsbChjaGlsZCwgcXVlcnkpO1xuICAgICAgICB9KVswXTtcbiAgICB9O1xuICAgIFNpbXBsZUJhckNvcmUucnRsSGVscGVycyA9IG51bGw7XG4gICAgU2ltcGxlQmFyQ29yZS5kZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgICAgZm9yY2VWaXNpYmxlOiBmYWxzZSxcbiAgICAgICAgY2xpY2tPblRyYWNrOiB0cnVlLFxuICAgICAgICBzY3JvbGxiYXJNaW5TaXplOiAyNSxcbiAgICAgICAgc2Nyb2xsYmFyTWF4U2l6ZTogMCxcbiAgICAgICAgYXJpYUxhYmVsOiAnc2Nyb2xsYWJsZSBjb250ZW50JyxcbiAgICAgICAgY2xhc3NOYW1lczoge1xuICAgICAgICAgICAgY29udGVudEVsOiAnc2ltcGxlYmFyLWNvbnRlbnQnLFxuICAgICAgICAgICAgY29udGVudFdyYXBwZXI6ICdzaW1wbGViYXItY29udGVudC13cmFwcGVyJyxcbiAgICAgICAgICAgIG9mZnNldDogJ3NpbXBsZWJhci1vZmZzZXQnLFxuICAgICAgICAgICAgbWFzazogJ3NpbXBsZWJhci1tYXNrJyxcbiAgICAgICAgICAgIHdyYXBwZXI6ICdzaW1wbGViYXItd3JhcHBlcicsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ3NpbXBsZWJhci1wbGFjZWhvbGRlcicsXG4gICAgICAgICAgICBzY3JvbGxiYXI6ICdzaW1wbGViYXItc2Nyb2xsYmFyJyxcbiAgICAgICAgICAgIHRyYWNrOiAnc2ltcGxlYmFyLXRyYWNrJyxcbiAgICAgICAgICAgIGhlaWdodEF1dG9PYnNlcnZlcldyYXBwZXJFbDogJ3NpbXBsZWJhci1oZWlnaHQtYXV0by1vYnNlcnZlci13cmFwcGVyJyxcbiAgICAgICAgICAgIGhlaWdodEF1dG9PYnNlcnZlckVsOiAnc2ltcGxlYmFyLWhlaWdodC1hdXRvLW9ic2VydmVyJyxcbiAgICAgICAgICAgIHZpc2libGU6ICdzaW1wbGViYXItdmlzaWJsZScsXG4gICAgICAgICAgICBob3Jpem9udGFsOiAnc2ltcGxlYmFyLWhvcml6b250YWwnLFxuICAgICAgICAgICAgdmVydGljYWw6ICdzaW1wbGViYXItdmVydGljYWwnLFxuICAgICAgICAgICAgaG92ZXI6ICdzaW1wbGViYXItaG92ZXInLFxuICAgICAgICAgICAgZHJhZ2dpbmc6ICdzaW1wbGViYXItZHJhZ2dpbmcnLFxuICAgICAgICAgICAgc2Nyb2xsaW5nOiAnc2ltcGxlYmFyLXNjcm9sbGluZycsXG4gICAgICAgICAgICBzY3JvbGxhYmxlOiAnc2ltcGxlYmFyLXNjcm9sbGFibGUnLFxuICAgICAgICAgICAgbW91c2VFbnRlcmVkOiAnc2ltcGxlYmFyLW1vdXNlLWVudGVyZWQnXG4gICAgICAgIH0sXG4gICAgICAgIHNjcm9sbGFibGVOb2RlOiBudWxsLFxuICAgICAgICBjb250ZW50Tm9kZTogbnVsbCxcbiAgICAgICAgYXV0b0hpZGU6IHRydWVcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFN0YXRpYyBmdW5jdGlvbnNcbiAgICAgKi9cbiAgICBTaW1wbGVCYXJDb3JlLmdldE9wdGlvbnMgPSBnZXRPcHRpb25zO1xuICAgIFNpbXBsZUJhckNvcmUuaGVscGVycyA9IGhlbHBlcnM7XG4gICAgcmV0dXJuIFNpbXBsZUJhckNvcmU7XG59KCkpO1xuXG5leHBvcnQgeyBTaW1wbGVCYXJDb3JlIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8qKlxuICogc2ltcGxlYmFyIC0gdjYuMi41XG4gKiBTY3JvbGxiYXJzLCBzaW1wbGVyLlxuICogaHR0cHM6Ly9ncnNtdG8uZ2l0aHViLmlvL3NpbXBsZWJhci9cbiAqXG4gKiBNYWRlIGJ5IEFkcmllbiBEZW5hdCBmcm9tIGEgZm9yayBieSBKb25hdGhhbiBOaWNvbFxuICogVW5kZXIgTUlUIExpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgY2FuVXNlRE9NIGZyb20gJ2Nhbi11c2UtZG9tJztcbmltcG9ydCBTaW1wbGVCYXJDb3JlIGZyb20gJ3NpbXBsZWJhci1jb3JlJztcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XG5cbnZhciBfYSA9IFNpbXBsZUJhckNvcmUuaGVscGVycywgZ2V0T3B0aW9ucyA9IF9hLmdldE9wdGlvbnMsIGFkZENsYXNzZXMgPSBfYS5hZGRDbGFzc2VzO1xudmFyIFNpbXBsZUJhciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2ltcGxlQmFyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNpbXBsZUJhcigpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuYXBwbHkodGhpcywgYXJncykgfHwgdGhpcztcbiAgICAgICAgLy8gLy8gU2F2ZSBhIHJlZmVyZW5jZSB0byB0aGUgaW5zdGFuY2UsIHNvIHdlIGtub3cgdGhpcyBET00gbm9kZSBoYXMgYWxyZWFkeSBiZWVuIGluc3RhbmNpZWRcbiAgICAgICAgU2ltcGxlQmFyLmluc3RhbmNlcy5zZXQoYXJnc1swXSwgX3RoaXMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFNpbXBsZUJhci5pbml0RE9NTG9hZGVkRWxlbWVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCB0aGlzLmluaXRET01Mb2FkZWRFbGVtZW50cyk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgdGhpcy5pbml0RE9NTG9hZGVkRWxlbWVudHMpO1xuICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNpbXBsZWJhcl0nKSwgZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICBpZiAoZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXNpbXBsZWJhcicpICE9PSAnaW5pdCcgJiZcbiAgICAgICAgICAgICAgICAhU2ltcGxlQmFyLmluc3RhbmNlcy5oYXMoZWwpKVxuICAgICAgICAgICAgICAgIG5ldyBTaW1wbGVCYXIoZWwsIGdldE9wdGlvbnMoZWwuYXR0cmlidXRlcykpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFNpbXBsZUJhci5yZW1vdmVPYnNlcnZlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAoX2EgPSBTaW1wbGVCYXIuZ2xvYmFsT2JzZXJ2ZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5kaXNjb25uZWN0KCk7XG4gICAgfTtcbiAgICBTaW1wbGVCYXIucHJvdG90eXBlLmluaXRET00gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICAvLyBtYWtlIHN1cmUgdGhpcyBlbGVtZW50IGRvZXNuJ3QgaGF2ZSB0aGUgZWxlbWVudHMgeWV0XG4gICAgICAgIGlmICghQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKHRoaXMuZWwuY2hpbGRyZW4sIGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNoaWxkLmNsYXNzTGlzdC5jb250YWlucyhfdGhpcy5jbGFzc05hbWVzLndyYXBwZXIpO1xuICAgICAgICB9KS5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIFByZXBhcmUgRE9NXG4gICAgICAgICAgICB0aGlzLndyYXBwZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50V3JhcHBlckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLm9mZnNldEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLm1hc2tFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHRBdXRvT2JzZXJ2ZXJXcmFwcGVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0QXV0b09ic2VydmVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy53cmFwcGVyRWwsIHRoaXMuY2xhc3NOYW1lcy53cmFwcGVyKTtcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5jb250ZW50V3JhcHBlckVsLCB0aGlzLmNsYXNzTmFtZXMuY29udGVudFdyYXBwZXIpO1xuICAgICAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLm9mZnNldEVsLCB0aGlzLmNsYXNzTmFtZXMub2Zmc2V0KTtcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5tYXNrRWwsIHRoaXMuY2xhc3NOYW1lcy5tYXNrKTtcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5jb250ZW50RWwsIHRoaXMuY2xhc3NOYW1lcy5jb250ZW50RWwpO1xuICAgICAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLnBsYWNlaG9sZGVyRWwsIHRoaXMuY2xhc3NOYW1lcy5wbGFjZWhvbGRlcik7XG4gICAgICAgICAgICBhZGRDbGFzc2VzKHRoaXMuaGVpZ2h0QXV0b09ic2VydmVyV3JhcHBlckVsLCB0aGlzLmNsYXNzTmFtZXMuaGVpZ2h0QXV0b09ic2VydmVyV3JhcHBlckVsKTtcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5oZWlnaHRBdXRvT2JzZXJ2ZXJFbCwgdGhpcy5jbGFzc05hbWVzLmhlaWdodEF1dG9PYnNlcnZlckVsKTtcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLmVsLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRFbC5hcHBlbmRDaGlsZCh0aGlzLmVsLmZpcnN0Q2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb250ZW50V3JhcHBlckVsLmFwcGVuZENoaWxkKHRoaXMuY29udGVudEVsKTtcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0RWwuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50V3JhcHBlckVsKTtcbiAgICAgICAgICAgIHRoaXMubWFza0VsLmFwcGVuZENoaWxkKHRoaXMub2Zmc2V0RWwpO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHRBdXRvT2JzZXJ2ZXJXcmFwcGVyRWwuYXBwZW5kQ2hpbGQodGhpcy5oZWlnaHRBdXRvT2JzZXJ2ZXJFbCk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZXJFbC5hcHBlbmRDaGlsZCh0aGlzLmhlaWdodEF1dG9PYnNlcnZlcldyYXBwZXJFbCk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZXJFbC5hcHBlbmRDaGlsZCh0aGlzLm1hc2tFbCk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZXJFbC5hcHBlbmRDaGlsZCh0aGlzLnBsYWNlaG9sZGVyRWwpO1xuICAgICAgICAgICAgdGhpcy5lbC5hcHBlbmRDaGlsZCh0aGlzLndyYXBwZXJFbCk7XG4gICAgICAgICAgICAoX2EgPSB0aGlzLmNvbnRlbnRXcmFwcGVyRWwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcbiAgICAgICAgICAgIChfYiA9IHRoaXMuY29udGVudFdyYXBwZXJFbCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnNldEF0dHJpYnV0ZSgncm9sZScsICdyZWdpb24nKTtcbiAgICAgICAgICAgIChfYyA9IHRoaXMuY29udGVudFdyYXBwZXJFbCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIHRoaXMub3B0aW9ucy5hcmlhTGFiZWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5heGlzLngudHJhY2suZWwgfHwgIXRoaXMuYXhpcy55LnRyYWNrLmVsKSB7XG4gICAgICAgICAgICB2YXIgdHJhY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHZhciBzY3JvbGxiYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGFkZENsYXNzZXModHJhY2ssIHRoaXMuY2xhc3NOYW1lcy50cmFjayk7XG4gICAgICAgICAgICBhZGRDbGFzc2VzKHNjcm9sbGJhciwgdGhpcy5jbGFzc05hbWVzLnNjcm9sbGJhcik7XG4gICAgICAgICAgICB0cmFjay5hcHBlbmRDaGlsZChzY3JvbGxiYXIpO1xuICAgICAgICAgICAgdGhpcy5heGlzLngudHJhY2suZWwgPSB0cmFjay5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICBhZGRDbGFzc2VzKHRoaXMuYXhpcy54LnRyYWNrLmVsLCB0aGlzLmNsYXNzTmFtZXMuaG9yaXpvbnRhbCk7XG4gICAgICAgICAgICB0aGlzLmF4aXMueS50cmFjay5lbCA9IHRyYWNrLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgICAgIGFkZENsYXNzZXModGhpcy5heGlzLnkudHJhY2suZWwsIHRoaXMuY2xhc3NOYW1lcy52ZXJ0aWNhbCk7XG4gICAgICAgICAgICB0aGlzLmVsLmFwcGVuZENoaWxkKHRoaXMuYXhpcy54LnRyYWNrLmVsKTtcbiAgICAgICAgICAgIHRoaXMuZWwuYXBwZW5kQ2hpbGQodGhpcy5heGlzLnkudHJhY2suZWwpO1xuICAgICAgICB9XG4gICAgICAgIFNpbXBsZUJhckNvcmUucHJvdG90eXBlLmluaXRET00uY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2ltcGxlYmFyJywgJ2luaXQnKTtcbiAgICB9O1xuICAgIFNpbXBsZUJhci5wcm90b3R5cGUudW5Nb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgU2ltcGxlQmFyQ29yZS5wcm90b3R5cGUudW5Nb3VudC5jYWxsKHRoaXMpO1xuICAgICAgICBTaW1wbGVCYXIuaW5zdGFuY2VzW1wiZGVsZXRlXCJdKHRoaXMuZWwpO1xuICAgIH07XG4gICAgU2ltcGxlQmFyLmluaXRIdG1sQXBpID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmluaXRET01Mb2FkZWRFbGVtZW50cyA9IHRoaXMuaW5pdERPTUxvYWRlZEVsZW1lbnRzLmJpbmQodGhpcyk7XG4gICAgICAgIC8vIE11dGF0aW9uT2JzZXJ2ZXIgaXMgSUUxMStcbiAgICAgICAgaWYgKHR5cGVvZiBNdXRhdGlvbk9ic2VydmVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgLy8gTXV0YXRpb24gb2JzZXJ2ZXIgdG8gb2JzZXJ2ZSBkeW5hbWljYWxseSBhZGRlZCBlbGVtZW50c1xuICAgICAgICAgICAgdGhpcy5nbG9iYWxPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKFNpbXBsZUJhci5oYW5kbGVNdXRhdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5nbG9iYWxPYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUYWtlbiBmcm9tIGpRdWVyeSBgcmVhZHlgIGZ1bmN0aW9uXG4gICAgICAgIC8vIEluc3RhbnRpYXRlIGVsZW1lbnRzIGFscmVhZHkgcHJlc2VudCBvbiB0aGUgcGFnZVxuICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJyB8fCAvLyBAdHMtaWdub3JlOiBJRSBzcGVjaWZpY1xuICAgICAgICAgICAgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT09ICdsb2FkaW5nJyAmJiAhZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmRvU2Nyb2xsKSkge1xuICAgICAgICAgICAgLy8gSGFuZGxlIGl0IGFzeW5jaHJvbm91c2x5IHRvIGFsbG93IHNjcmlwdHMgdGhlIG9wcG9ydHVuaXR5IHRvIGRlbGF5IGluaXRcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMuaW5pdERPTUxvYWRlZEVsZW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCB0aGlzLmluaXRET01Mb2FkZWRFbGVtZW50cyk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHRoaXMuaW5pdERPTUxvYWRlZEVsZW1lbnRzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2ltcGxlQmFyLmhhbmRsZU11dGF0aW9ucyA9IGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG11dGF0aW9uKSB7XG4gICAgICAgICAgICBtdXRhdGlvbi5hZGRlZE5vZGVzLmZvckVhY2goZnVuY3Rpb24gKGFkZGVkTm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChhZGRlZE5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFkZGVkTm9kZS5oYXNBdHRyaWJ1dGUoJ2RhdGEtc2ltcGxlYmFyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICFTaW1wbGVCYXIuaW5zdGFuY2VzLmhhcyhhZGRlZE5vZGUpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNvbnRhaW5zKGFkZGVkTm9kZSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgU2ltcGxlQmFyKGFkZGVkTm9kZSwgZ2V0T3B0aW9ucyhhZGRlZE5vZGUuYXR0cmlidXRlcykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkZWROb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNpbXBsZWJhcl0nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2ltcGxlYmFyJykgIT09ICdpbml0JyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhU2ltcGxlQmFyLmluc3RhbmNlcy5oYXMoZWwpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jb250YWlucyhlbCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBTaW1wbGVCYXIoZWwsIGdldE9wdGlvbnMoZWwuYXR0cmlidXRlcykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG11dGF0aW9uLnJlbW92ZWROb2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChyZW1vdmVkTm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChyZW1vdmVkTm9kZS5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVtb3ZlZE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXNpbXBsZWJhcicpID09PSAnaW5pdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFNpbXBsZUJhci5pbnN0YW5jZXMuaGFzKHJlbW92ZWROb2RlKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY29udGFpbnMocmVtb3ZlZE5vZGUpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2ltcGxlQmFyLmluc3RhbmNlcy5nZXQocmVtb3ZlZE5vZGUpLnVuTW91bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwocmVtb3ZlZE5vZGUucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2ltcGxlYmFyPVwiaW5pdFwiXScpLCBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaW1wbGVCYXIuaW5zdGFuY2VzLmhhcyhlbCkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jb250YWlucyhlbCkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2ltcGxlQmFyLmluc3RhbmNlcy5nZXQoZWwpLnVuTW91bnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU2ltcGxlQmFyLmluc3RhbmNlcyA9IG5ldyBXZWFrTWFwKCk7XG4gICAgcmV0dXJuIFNpbXBsZUJhcjtcbn0oU2ltcGxlQmFyQ29yZSkpO1xuLyoqXG4gKiBIVE1MIEFQSVxuICogQ2FsbGVkIG9ubHkgaW4gYSBicm93c2VyIGVudi5cbiAqL1xuaWYgKGNhblVzZURPTSkge1xuICAgIFNpbXBsZUJhci5pbml0SHRtbEFwaSgpO1xufVxuXG5leHBvcnQgeyBTaW1wbGVCYXIgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuLi9zY3NzL3N0eWxlLnNjc3MnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHV0aWxzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzL3V0aWxzLmpzJztcblxuLy8gaGFtYnVyZ2VyIG1lbnVcbnV0aWxzLm1lbnVJbml0KCk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gY29tcG9uZW50cyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIGZvcm1zXG5pbXBvcnQgJy4vdXRpbHMvZm9ybXMnO1xuXG4vLyB0YWJzXG5pbXBvcnQgJy4vdXRpbHMvdGFicy5qcyc7XG5cbi8vIGFjY29yZGlvblxuaW1wb3J0ICcuL3V0aWxzL2FjY29yZGlvbi5qcyc7XG5cbi8vIHNlbGVjdFxuaW1wb3J0ICcuL3V0aWxzL3NlbGVjdC5qcyc7XG5cbi8vIG1vZGFsc1xuaW1wb3J0ICcuL3V0aWxzL21vZGFscy5qcyc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmltcG9ydCAnLi9kZXYvdnptc2sxLmpzJztcbmltcG9ydCAnLi9kZXYvbWFya3VzRE0uanMnO1xuaW1wb3J0ICcuL2Rldi91a2lrMC5qcyc7XG5pbXBvcnQgJy4vZGV2L2tpZTZlci5qcyc7XG4iXSwibmFtZXMiOlsibW9kdWxlcyIsImRhdGFNZWRpYVF1ZXJpZXMiLCJfc2xpZGVUb2dnbGUiLCJfc2xpZGVVcCIsIl9zbGlkZURvd24iLCJBY2NvcmRpb24iLCJjb25zdHJ1Y3RvciIsImFjY29yZGlvbkl0ZW1zIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwibWRRdWVyaWVzQXJyYXkiLCJyZWdJdGVtcyIsIkFycmF5IiwiZnJvbSIsImZpbHRlciIsIml0ZW0iLCJpbmRleCIsInNlbGYiLCJkYXRhc2V0IiwiYWNjb3JkaW9uIiwic3BsaXQiLCJhdHRycyIsIkFDQ09SRElPTiIsIklURU0iLCJTSU5HTEUiLCJjbGFzc2VzIiwiSU5JVCIsIkFDVElWRSIsImxlbmd0aCIsImluaXQiLCJfdGhpcyIsImZvckVhY2giLCJtZFF1ZXJpZXNJdGVtIiwibWF0Y2hNZWRpYSIsImFkZEV2ZW50TGlzdGVuZXIiLCJpdGVtc0FycmF5IiwiaGlkZUJvZHkiLCJhY2NvcmRpb25Hcm91cCIsImFjdGl2ZVRpdGxlIiwicXVlcnlTZWxlY3RvciIsInNwZWVkIiwiYWNjb3JkaW9uU3BlZWQiLCJwYXJzZUludCIsImNsYXNzTGlzdCIsInJlbW92ZSIsIm5leHRFbGVtZW50U2libGluZyIsInNldEFjdGlvbnMiLCJlIiwidGFyZ2V0IiwiY2xvc2VzdCIsInRpdGxlIiwiZ3JvdXAiLCJpc1NpbmdsZSIsImhhc0F0dHJpYnV0ZSIsImNvbnRhaW5zIiwidG9nZ2xlIiwicHJldmVudERlZmF1bHQiLCJpbml0Qm9keSIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsInRpdGxlcyIsInJlbW92ZUF0dHJpYnV0ZSIsImhpZGRlbiIsInNldEF0dHJpYnV0ZSIsIm1hdGNoZXMiLCJhZGQiLCJiaW5kIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIlZhbGlkYXRpb24iLCJSRVFVSVJFRCIsIklHTk9SRV9WQUxJREFUSU9OIiwiQUpBWCIsIkRFViIsIklHTk9SRV9GT0NVUyIsIlNIT1dfUExBQ0VIT0xERVIiLCJWQUxJREFURSIsIkhBU19FUlJPUiIsIkhBU19GT0NVUyIsImdldEVycm9ycyIsImZvcm0iLCJlcnIiLCJyZXF1aXJlZEZpZWxkcyIsInJlcXVpcmVkRmllbGQiLCJvZmZzZXRQYXJlbnQiLCJ0YWdOYW1lIiwiZGlzYWJsZWQiLCJ2YWxpZGF0ZUZpZWxkIiwiYWRkRXJyb3IiLCJwYXJlbnRFbGVtZW50IiwicmVtb3ZlRXJyb3IiLCJyZXF1aXJlZCIsInZhbHVlIiwicmVwbGFjZSIsInRlc3RFbWFpbCIsInR5cGUiLCJjaGVja2VkIiwidHJpbSIsImNsZWFyRmllbGRzIiwicmVzZXQiLCJzZXRUaW1lb3V0IiwiaW5wdXRzIiwiY2hlY2tib3hlcyIsImlucHV0IiwiY2hlY2tib3giLCJ0ZXN0IiwiRm9ybVN1Ym1pdGlvbiIsInNob3VsZFZhbGlkYXRlIiwiZm9ybXMiLCJzZW5kRm9ybSIsInJlc3BvbnNlUmVzdWx0IiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwicG9wdXAiLCJtb2RhbCIsIm1vZGFsTWVzc2FnZSIsIm9wZW4iLCJjb25zb2xlIiwibG9nIiwiaGFuZGxlU3VibWl0aW9uIiwiYWpheCIsImFjdGlvbiIsImdldEF0dHJpYnV0ZSIsIm1ldGhvZCIsImRhdGEiLCJGb3JtRGF0YSIsInJlc3BvbnNlIiwiZmV0Y2giLCJib2R5Iiwib2siLCJyZXN1bHQiLCJqc29uIiwiYWxlcnQiLCJGb3JtRmllbGRzIiwiZmllbGRzIiwic2F2ZVBsYWNlaG9sZGVyIiwiZmllbGQiLCJwbGFjZWhvbGRlciIsImhhbmRsZUZvY3VzaW4iLCJoYW5kbGVGb2N1c291dCIsImJvZHlMb2NrU3RhdHVzIiwiYm9keUxvY2siLCJib2R5VW5sb2NrIiwiTW9kYWwiLCJvcHRpb25zIiwiY29uZmlnIiwibG9nZ2luZyIsImF0dHJpYnV0ZU9wZW5CdXR0b24iLCJhdHRyaWJ1dGVDbG9zZUJ1dHRvbiIsImZpeEVsZW1lbnRTZWxlY3RvciIsInlvdXR1YmVBdHRyaWJ1dGUiLCJ5b3V0dWJlUGxhY2VBdHRyaWJ1dGUiLCJzZXRBdXRvcGxheVlvdXR1YmUiLCJtb2RhbENvbnRlbnQiLCJtb2RhbEFjdGl2ZSIsImJvZHlBY3RpdmUiLCJmb2N1c0NhdGNoIiwiY2xvc2VFc2MiLCJoYXNoU2V0dGluZ3MiLCJsb2NhdGlvbiIsImdvSGFzaCIsIm9uIiwiYmVmb3JlT3BlbiIsImFmdGVyT3BlbiIsImJlZm9yZUNsb3NlIiwiYWZ0ZXJDbG9zZSIsInlvdVR1YmVDb2RlIiwiaXNPcGVuIiwidGFyZ2V0T3BlbiIsInNlbGVjdG9yIiwiZWxlbWVudCIsInByZXZpb3VzT3BlbiIsImxhc3RDbG9zZWQiLCJfZGF0YVZhbHVlIiwiaGFzaCIsIl9yZW9wZW4iLCJfc2VsZWN0b3JPcGVuIiwibGFzdEZvY3VzRWwiLCJfZm9jdXNFbCIsImluaXRtb2RhbHMiLCJldmVudHNtb2RhbCIsImJ1dHRvbk9wZW4iLCJidXR0b25DbG9zZSIsImNsb3NlIiwid2hpY2giLCJjb2RlIiwiX2ZvY3VzQ2F0Y2giLCJ3aW5kb3ciLCJfb3BlblRvSGFzaCIsInNlbGVjdG9yVmFsdWUiLCJkb2N1bWVudEVsZW1lbnQiLCJwcmV2aW91c0FjdGl2ZUVsZW1lbnQiLCJhY3RpdmVFbGVtZW50IiwiY29kZVZpZGVvIiwidXJsVmlkZW8iLCJpZnJhbWUiLCJjcmVhdGVFbGVtZW50IiwiYXV0b3BsYXkiLCJ5b3V0dWJlUGxhY2UiLCJhcHBlbmRDaGlsZCIsIl9nZXRIYXNoIiwiX3NldEhhc2giLCJtIiwiaW5uZXJXaWR0aCIsIl9mb2N1c1RyYXAiLCJpbm5lckhUTUwiLCJfcmVtb3ZlSGFzaCIsImluY2x1ZGVzIiwiY2xhc3NJbkhhc2giLCJidXR0b25zIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImhyZWYiLCJmb2N1c2FibGUiLCJmb2N1c0FycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJjYWxsIiwiZm9jdXNlZEluZGV4IiwiaW5kZXhPZiIsInNoaWZ0S2V5IiwiZm9jdXMiLCJTaW1wbGVCYXIiLCJTZWxlY3QiLCJTRUxFQ1QiLCJCT0RZIiwiTEFCRUwiLCJUSVRMRSIsIlZBTFVFIiwiQ09OVEVOVCIsIk9QVElPTlMiLCJPUFRJT04iLCJTQ1JPTEwiLCJHUk9VUCIsIklOUFVUIiwiQVNTRVQiLCJUWFQiLCJJU19BQ1RJVkUiLCJJU19GT0NVU0VEIiwiSVNfT1BFTkVEIiwiSVNfRklMTEVEIiwiSVNfU0VMRUNURUQiLCJJU19ESVNBQkxFRCIsIkhBU19MSVNUIiwiSEFTX01VTFRJUExFIiwiSEFTX0NIRUNLQk9YIiwiSEFTX0xBQkVMIiwic2VsZWN0TGlzdCIsInNlbGVjdCIsImluaXRTZWxJdGVtIiwicmVsYXRpdmVTZWwiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwic2VsSWQiLCJnZXRQbGFjZWhvbGRlciIsIm9wdFBsYWNlaG9sZGVyIiwibGFiZWwiLCJzaG93Iiwic2VsVGl0bGUiLCJnZXRTZWxlY3QiLCJ0d2luU2VsIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwidGV4dCIsImJ1aWxkIiwiaW5pdFNlbGVjdGlvbnMiLCJzZXRWYWx1ZSIsInNldE9wdGlvbnMiLCJzZWxBZGRvbkNsYXNzIiwibXVsdGlwbGUiLCJkaXNhYmxlU2VsZWN0Iiwic2V0U2VhcmNoQWN0aW9ucyIsInNldEFjdGlvbiIsInNlbEhpbnQiLCJzZWxCb2R5IiwiZ2V0VmFsdWUiLCJyZWxhdGl2ZVNlbE9wdGlvbnMiLCJnZXRPcHRpb25zIiwiZ2V0Q2xhc3MiLCJzZWwiLCJzZWxlY3RJZCIsInNlbExpc3QiLCJzZWxPcHRpb24iLCJvcHRWYWwiLCJzZXRPcHRpb25BY3Rpb24iLCJhZGRFcnIiLCJyZW1vdmVFcnIiLCJjbG9zZUdyb3VwIiwic2VsT3B0aW9ucyIsInNlbGVjdE9uZUdyb3VwIiwic2VsR3JvdXAiLCJzZWxlY3Rpb25zIiwic2VsZWN0aW9uIiwiY2xvc2VJdGVtIiwib3B0aW9uIiwicmVsYXRpdmVTZWxlY3Rpb25zIiwiZ2V0RGF0YSIsImVsZW1lbnRzIiwicmVsYXRpdmVTZWxlY3Rpb24iLCJ0d2luU2VsZWN0aW9ucyIsInR3aW5TZWxlY3Rpb24iLCJvcHQiLCJ0ZXh0Q29udGVudCIsInNldFNlbGVjdGlvbnMiLCJzZWxJbnB1dCIsInRvVXBwZXJDYXNlIiwic2V0U3VidGl0bGUiLCJzZWxFcnJvciIsInJlbW92ZUNoaWxkIiwiY3NzQ2xhc3MiLCJhdHRyIiwiYXR0ckNsYXNzIiwidGl0bGVWYWwiLCJodG1sIiwic2VsTGFiZWwiLCJ2YWx1ZXMiLCJtYXAiLCJnZXRDb250ZW50Iiwiam9pbiIsImxpc3QiLCJWQUxVRVVFIiwiY3VzdG9tQ2xhc3MiLCJvcHRDbGFzcyIsInNlbFNjcm9sbCIsInNlbFNjcm9sbEhlaWdodCIsInNlbE9wdGlvbnNIVE1MIiwiZ2V0T3B0aW9uIiwic2VsZWN0ZWQiLCJzaG93U2VsZWN0aW9uIiwib3B0aW9uQ2xhc3MiLCJvcHRpb25MaW5rIiwib3B0aW9uTGlua1RhcmdldCIsIm9wdGlvbkhUTUwiLCJvcHRpb25EYXRhIiwib3B0QXNzZXQiLCJvcHRpb25EYXRhSFRNTCIsIm9wdGlvbkNvbnRlbnRIVE1MIiwiZmluZCIsInN1YnRpdGxlIiwicHVzaCIsInNlbGVjdGVkSW5kZXgiLCJ0ZW1wQnV0dG9uIiwiYXBwZW5kIiwiY2xpY2siLCJzY3JvbGxCbG9jayIsImF1dG9IaWRlIiwic2V0SGFzaCIsImdldEhhc2giLCJUYWJzIiwiVEFCUyIsIklOREVYIiwiVElUTEVTIiwiVEFCX0lURU0iLCJIQVNIIiwiTU9EQUwiLCJ0YWJzIiwiYWN0aXZlSGFzaCIsInN0YXJ0c1dpdGgiLCJ0YWJzQmxvY2siLCJzZXRTdGF0dXMiLCJjb250ZW50IiwidGFic0luZGV4IiwiaGFzSGFzaCIsImluZHgiLCJhY3RpdmVIYXNoQmxvY2siLCJtZW51SW5pdCIsIm1lbnVPcGVuIiwibWVudUNsb3NlIiwiYm9keUxvY2tUb2dnbGUiLCJkZWxheSIsInVuaXF1ZUFycmF5IiwiYXJyYXkiLCJkYXRhU2V0VmFsdWUiLCJtZWRpYSIsImJyZWFrcG9pbnRzQXJyYXkiLCJwYXJhbXMiLCJicmVha3BvaW50IiwicGFyYW1zQXJyYXkiLCJtZFF1ZXJpZXMiLCJtZWRpYUJyZWFrcG9pbnQiLCJtZWRpYVR5cGUiLCJkdXJhdGlvbiIsInNob3dtb3JlIiwic3R5bGUiLCJ0cmFuc2l0aW9uUHJvcGVydHkiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJoZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJvdmVyZmxvdyIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwibWFyZ2luVG9wIiwibWFyZ2luQm90dG9tIiwicmVtb3ZlUHJvcGVydHkiLCJyZW1Ub1B4IiwicmVtVmFsdWUiLCJodG1sRm9udFNpemUiLCJwYXJzZUZsb2F0IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImZvbnRTaXplIiwicHhWYWx1ZSIsIk1hdGgiLCJyb3VuZCIsInJlbW92ZUNsYXNzZXMiLCJjbGFzc05hbWUiLCJpIiwidXRpbHMiXSwic291cmNlUm9vdCI6IiJ9