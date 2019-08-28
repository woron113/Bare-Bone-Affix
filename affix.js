/*
    Copyright (c) 2019 <Ráczkövy Erik>

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

/*
    Bare Bone affix

     You simply need to give the affix container relative element to affix, and the affix element
     witch will be moved relative to the affix container.
     Affix should get the class = 'affix-sja'
     Affix container should get the class = 'affix-container-sja'

     Written in ECMAScript 2015 javascript therefor it should be converted to pre version for browser support
     as of now.
     Only work on Y offset
 */

class BareBoneAffix {

    /**
     *
     * @param settings
     * @param affix (optional)
     * @param affixContainer (optional)
     */
    constructor(settings, affix, affixContainer) {

        this.affix = affix;
        this.affixContainer = affixContainer;

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
            initBuild: false,
            scraping: true,
            position: 'top',
            jumpToOriginalPosition: true
        };

        this.settings = Object.assign(defaultSettings, settings);
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
     * @param affix element, native js
     * @param affixContainer element, native js
     */
    build(affix, affixContainer) {

        if (affix === undefined || affixContainer === undefined) {
            throw new Error('You need to give both affix and affixContainer when you try to build an affix!');
        }

        let affixPosition = null,
        triggerLine = null;

        switch(this.settings.position) {
            case (typeof this.settings.position === 'number'):
                affixPosition = this.settings.position;
                triggerLine = 0;
                break;

            case 'bottom':
                affixPosition = window.innerHeight - affix.offsetHeight;
                triggerLine = window.innerHeight - affix.offsetHeight;
                break;

            case 'middle':
                affixPosition = window.innerHeight / 2 - affix.offsetHeight;
                triggerLine = window.innerHeight / 2 - affix.offsetHeight;
                break;

            default:
                affixPosition = 0;
                triggerLine = 0;
        }

        window.addEventListener('scroll', () => {
            const windowTop = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0),
            affixContainerTop = affixContainer.offsetTop,
            affixContainerHeight = affixContainer.offsetHeight;

            if (windowTop > affixContainerTop - triggerLine && windowTop + triggerLine < (affixContainerTop + affixContainerHeight - affix.offsetHeight)) {
                affix.classList.add('affix-mode');
                affix.style.position = 'fixed';
                affix.style.top = affixPosition;

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
        });
    }
}

const affix1 = new BareBoneAffix;

document.getElementsByTagName('body').addEventListener('keypress', ev => {
    const target = ev.target;

    target.html(target.html() + ' ');
});
