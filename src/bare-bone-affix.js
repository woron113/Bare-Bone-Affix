/*
    Bare Bone affix

    Description:
        Bare bone affix is an affix plugin that support multiple affixes at the same time.
        The affix works realtively to the container, so you can position it how you want and where you want.
        It has html scraping that also support multiple affixes at the same time.
        Natively its has 3 built in positions (top, mid, bottom) but you can specify it by number.
        It support jumping to the container, so basically you can set the affix element anywhere it dont has
        to be the affix container.
            note: You can use css @keyframes to make a smooth animation for the jump

    Scraping from html:
        Affix: should get the class = 'affix-sja'
        Affix container: should get the class = 'affix-container-sja'

        You simply need to give the affix container relative element to affix, and the affix element
        witch will be moved relative to the affix container.

    Classes:
        The affix element gets an 'affix-mode' class when its affixed

    Written in ECMAScript 2015 javascript therefor it should be converted to pre version for browser support
    as of now.

    Only works on Y axis

    Github: https://github.com/woron113/Bare-Bone-Affix
*/

class BareBoneAffix {

    /**
     * @param settings
     * @param affix (optional)
     * @param affixContainer (optional)
     */
    constructor(settings, affix, affixContainer) {

        if (affix && affixContainer && (affix.jquery !== undefined || affixContainer.jquery !== undefined)) {
            this.affixContainer = affixContainer[0];
            this.affix = affix[0];

        } else {
            this.affixContainer = affixContainer;
            this.affix = affix;
        }

        // The event handler container
        this.events = {};

        // Sets the default settings
        this.setDefaultSettings(settings);

        // Inits methods
        this.init();
    }

    /**
     * Creates this.settings using the defaultSettings and the given settings parameters
     * @param settings
     */
    setDefaultSettings(settings) {

        const defaultSettings = {
            // If you want to init a build when the class instance is made (note: you need to give the class parameters)
            initBuild: false,
            // If you want a plugin to scrape the html
            scraping: true,
            // The position where the affix sits, it can be defaults: (top, mid, bottom) or any given number
            position: 'top',
            // If the affix element is not in the container, and you want it to jump back to is original position set it to true
            jumpToOriginalPosition: true
        };

        this.settings = { ...defaultSettings, ...settings};
    }

    init() {
        this.classScraping();

        // If initBuild is allowed we build the affix using the given parameters
        if (this.settings.initBuild === true) {
            this.build(this.affix, this.affixContainer)
        }
    }

    classScraping() {

        if (this.settings.scraping === false) {
            return 0;
        }

        const affixs = document.getElementsByClassName('affix-bba'),
        affixContainers = document.getElementsByClassName('affix-container-bba');

        if (affixs.length !== affixContainers.length) {
            throw new Error('You need to to give both classes affix-sja and affix-container-sja together!');

        } else if (affixs.length === 1) {
            this.build(affixs[0], affixContainers[0]);
            return 1;
        }

        for (let affix of affixs) {
            for (let key of affixContainers) {

                if (key.dataset.affixNumber === affix.dataset.affixNumber) {
                    this.build(affix, key);
                }
            }
        }
    }

    /**
     * Building process which can be called manually
     */
    build(affix, affixContainer) {

        if (affix === undefined || affixContainer === undefined) {
            throw new Error('You need to give both affix and affixContainer when you try to build an affix!');
        }

        /**
         * affixPosition: the position where the affix sit in fixed mode relative to the windowTop
         * triggerLine: the line where the affix mode is triggered relative to the windowTop
         */
        let affixPosition = null,
        triggerLine = null;

        // Setting the affix relativity datas
        switch(this.settings.position) {
            case (typeof this.settings.position === 'number'):
                affixPosition = this.settings.position;
                triggerLine = 0;
                break;

            case 'bottom':
                affixPosition = window.innerHeight - affix.offsetHeight;
                triggerLine = window.innerHeight - affix.offsetHeight;
                break;

            case 'mid':
                affixPosition = window.innerHeight / 2 - affix.offsetHeight;
                triggerLine = window.innerHeight / 2 - affix.offsetHeight;
                break;

            default:
                affixPosition = 0;
                triggerLine = 0;
        }

        // Starting listening for change
        this.events.scroller = () => {
            const windowTop = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0),
            affixContainerTop = affixContainer.offsetTop,
            affixContainerHeight = affixContainer.offsetHeight;

            if (windowTop > affixContainerTop - triggerLine && windowTop + triggerLine < (affixContainerTop + affixContainerHeight - affix.offsetHeight)) {

                if (affix.style.position !== 'fixed') {
                    affix.classList.add('affix-mode');
                    affix.style.position = 'fixed';
                    affix.style.top = affixPosition;
                }

            } else {

                if (affix.style.position === 'fixed') {
                    affix.classList.remove('affix-mode');
                    affix.style.top = '';
                    affix.style.position = 'absolute';

                    if (windowTop + triggerLine > affixContainerTop) {
                        affix.style.top = (affixContainerTop + affixContainer.offsetHeight - affix.offsetHeight);
                    } else {
                        affix.style.top = this.settings.jumpToOriginalPosition ? '' : affixContainerTop;
                    }

                }
            }
        };

        window.addEventListener('scroll', this.events.scroller);
    }

    destroy() {
        window.removeEventListener('scroll', this.events.scroller);
    }
}

export { BareBoneAffix };
