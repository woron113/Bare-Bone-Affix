/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./Demo/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Demo/main.js":
/*!**********************!*\
  !*** ./Demo/main.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_bare_bone_affix_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/bare-bone-affix.js */ \"./src/bare-bone-affix.js\");\n\n\nconst settings = {\n    position: 'mid',\n    jumpToOriginalPosition: false\n},\n\naffix = new _src_bare_bone_affix_js__WEBPACK_IMPORTED_MODULE_0__[\"BareBoneAffix\"](settings);\n\n\n//# sourceURL=webpack:///./Demo/main.js?");

/***/ }),

/***/ "./src/bare-bone-affix.js":
/*!********************************!*\
  !*** ./src/bare-bone-affix.js ***!
  \********************************/
/*! exports provided: BareBoneAffix */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BareBoneAffix\", function() { return BareBoneAffix; });\n/*\n    Bare Bone affix\n\n    Description:\n        Bare bone affix is an affix plugin that support multiple affixes at the same time.\n        The affix works realtively to the container, so you can position it how you want and where you want\n        It has html scraping that also support multiple affixes at the same time.\n        Natively its has 3 built in positions (top, mid, bottom) but you can specify it by number.\n        It support jumping to the container, so basically you can set the affix element anywhere it dont has\n        to be the affix container.\n            note: You can use css @keyframes to make a smooth animation for the jump\n\n    Scraping from html:\n        Affix: should get the class = 'affix-sja'\n        Affix container: should get the class = 'affix-container-sja'\n\n        You simply need to give the affix container relative element to affix, and the affix element\n        witch will be moved relative to the affix container.\n\n    Classes:\n        The affix element gets an 'affix-mode' class when its affixed\n\n    Written in ECMAScript 2015 javascript therefor it should be converted to pre version for browser support\n    as of now.\n\n    Only works on Y axis\n\n    Github: https://github.com/woron113/Bare-Bone-Affix\n*/\n\nclass BareBoneAffix {\n\n    /**\n     * @param settings\n     * @param affix (optional)\n     * @param affixContainer (optional)\n     */\n    constructor(settings, affix, affixContainer) {\n\n        if (affix && affixContainer && (affix.jquery !== undefined || affixContainer.jquery !== undefined)) {\n            this.affixContainer = affixContainer[0];\n            this.affix = affix[0];\n\n        } else {\n            this.affixContainer = affixContainer;\n            this.affix = affix;\n        }\n\n        // The event handler container\n        this.events = {};\n\n        // Sets the default settings\n        this.setDefaultSettings(settings);\n\n        // Inits methods\n        this.init();\n    }\n\n    /**\n     * Creates this.settings using the defaultSettings and the given settings parameters\n     * @param settings\n     */\n    setDefaultSettings(settings) {\n\n        const defaultSettings = {\n            // If you want to init a build when the class instance is made (note: you need to give the class parameters)\n            initBuild: false,\n            // If you want a plugin to scrape the html\n            scraping: true,\n            // The position where the affix sits, it can be defaults: (top, mid, bottom) or any given number\n            position: 'top',\n            // If the affix element is not in the container, and you want it to jump back to is original position set it to true\n            jumpToOriginalPosition: true\n        };\n\n        this.settings = { ...defaultSettings, ...settings};\n        console.log(this.settings)\n    }\n\n    init() {\n        this.classScraping();\n\n        // If initBuild is allowed we build the affix using the given parameters\n        if (this.settings.initBuild === true) {\n            this.build(this.affix, this.affixContainer)\n        }\n    }\n\n    classScraping() {\n\n        if (this.settings.scraping === false) {\n            return 0;\n        }\n\n        const affixs = document.getElementsByClassName('affix-bba'),\n        affixContainers = document.getElementsByClassName('affix-container-bba');\n\n        if (affixs.length !== affixContainers.length) {\n            throw new Error('You need to to give both classes affix-sja and affix-container-sja together!');\n\n        } else if (affixs.length === 1) {\n            this.build(affixs[0], affixContainers[0]);\n            return 1;\n        }\n\n        for (let affix of affixs) {\n            for (let key of affixContainers) {\n\n                if (key.dataset.affixNumber === affix.dataset.affixNumber) {\n                    this.build(affix, key);\n                }\n            }\n        }\n    }\n\n    /**\n     * Building process which can be called manually\n     */\n    build(affix, affixContainer) {\n\n        if (affix === undefined || affixContainer === undefined) {\n            throw new Error('You need to give both affix and affixContainer when you try to build an affix!');\n        }\n\n        /**\n         * affixPosition: the position where the affix sit in fixed mode relative to the windowTop\n         * triggerLine: the line where the affix mode is triggered relative to the windowTop\n         */\n        let affixPosition = null,\n        triggerLine = null;\n\n        // Setting the affix relativity datas\n        switch(this.settings.position) {\n            case (typeof this.settings.position === 'number'):\n                affixPosition = this.settings.position;\n                triggerLine = 0;\n                break;\n\n            case 'bottom':\n                affixPosition = window.innerHeight - affix.offsetHeight;\n                triggerLine = window.innerHeight - affix.offsetHeight;\n                break;\n\n            case 'mid':\n                affixPosition = window.innerHeight / 2 - affix.offsetHeight;\n                triggerLine = window.innerHeight / 2 - affix.offsetHeight;\n                break;\n\n            default:\n                affixPosition = 0;\n                triggerLine = 0;\n        }\n\n        // Starting listening for change\n        this.events.scroller = () => {\n            const windowTop = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0),\n            affixContainerTop = affixContainer.offsetTop,\n            affixContainerHeight = affixContainer.offsetHeight;\n\n            if (windowTop > affixContainerTop - triggerLine && windowTop + triggerLine < (affixContainerTop + affixContainerHeight - affix.offsetHeight)) {\n\n                if (affix.style.position !== 'fixed') {\n                    affix.classList.add('affix-mode');\n                    affix.style.position = 'fixed';\n                    affix.style.top = affixPosition;\n                }\n\n            } else {\n\n                if (affix.style.position === 'fixed') {\n                    affix.classList.remove('affix-mode');\n                    affix.style.top = '';\n                    affix.style.position = 'absolute';\n\n                    if (windowTop + triggerLine > affixContainerTop) {\n                        affix.style.top = (affixContainerTop + affixContainer.offsetHeight - affix.offsetHeight);\n                    } else {\n                        affix.style.top = this.settings.jumpToOriginalPosition ? '' : affixContainerTop;\n                    }\n\n                }\n            }\n        };\n\n        window.addEventListener('scroll', this.events.scroller);\n    }\n\n    destroy() {\n        window.removeEventListener('scroll', this.events.scroller);\n    }\n}\n\n\n\n\n//# sourceURL=webpack:///./src/bare-bone-affix.js?");

/***/ })

/******/ });