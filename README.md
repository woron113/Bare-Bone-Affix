# Bare-Bone-Affix
Bare bone javascript affix plugin

![Example](/Resources/Example.gif)

Description
---
Bare bone affix is an affix plugin that support multiple affixes at the same time.
It has html scraping that also support multiple affixes at the same time.
Natively its has 3 built in positions (top, mid, bottom) but you can specify it by number.

It support jumping to the container, so basically you can set the affix element anywhere it don't has
to be the affix container.
    note: You can use css @keyframes to make a smooth animation for the jump

Scraping from html
---
Affix: should get the class  ```affix-bba```
```html
<div class="affix affix-bba">
        <h2>My little affix</h2>
        <p>Let's see, what I can do</p>
</div>
```
Affix container: should get the class ```affix-container-bba```
```html
<div class="affix-container affix-container-bba">
  <div class="affix affix-bba">
    <h2>My little affix</h2>
    <p>Let's see, what I can do</p>
  </div>
</div>
```
You simply need to give the affix container relative element to affix, and the affix element
which will be moved relative to the affix container.

If you have multiple affixes on the page you need to number them with the ```data-affix-number="number"``` attribute.
```html
<div class="affix-container affix-container-bba" data-affix-number="1">
  <div class="affix affix-bba" data-affix-number="1">
    <h2>My little affix</h2>
    <p>Let's see, what I can do</p>
  </div>
</div>

<div class="affix-container affix-container-bba" data-affix-number="2">
  <div class="affix affix-bba" data-affix-number="2">
    <h2>My little affix</h2>
    <p>Let's see, what I can do</p>
  </div>
  </div>
</div>
```

Initializing in a javascript file
---
There is an export in the affix. So you can just simply use the ```import { BareBoneAffix } from "barre-bone-affix"```.

Note:
* The from parameter need to be the path to the BareBoneAffix js file like ```import { BareBoneAffix } from "js/barre-bone-affix"```
if its in the js directory.
* Using the import, export module method in embedded scripts you need to give ```type="module"``` attribute to the import script tag.

The minified file
---
The minified file was processed by the closure compiler under ECMASCRIPT_2018 parameter.

If you have any problems read the closure compiler documentation [Closure wiki](https://github.com/google/closure-compiler/wiki).

Destroying
---
When you initialize the class you should make a variable reference. With that reference you can call the class ```destroy()``` method.
```js
const affix = new BareBoneAffix(settings);
```

Then you can call the destroy the method.
```js
affix.destroy();
```

Note: Its a good practice to free up the memory after you called the destroyer like:
```js
let affix = new BareBoneAffix(settings);

affix = null;
```

And with no reference to the class, the browser garbage collector will take care of the rest, but don't forget to call the destroyer, because the event wont get removed  by the garbage collector!

Classes
---
The affix element gets an 'affix-mode' class when its affixed.

Browser support
---
The minified BareBoneAffix support all major browsers.

Testing state

Desktop:
- [x] Chrome
- [x] Chromium
- [x] Firefox
- [x] Opera
- [ ] IE
- [ ] Edge

Mobile:
- [x] Firefox focus (Mobile)
- [x] LineageOS Jelly Browser (Mobile) Woks but the navbar covers the affixed element when you scroll down.
- [ ] Chrome (Mobile)
- [ ] Firefox (Mobile)

Details
---
* Only works on Y axis
