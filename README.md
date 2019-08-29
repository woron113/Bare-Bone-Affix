# Bare-Bone-Affix
Bare bone javascript affix plugin

Description:

    Bare bone affix is an affix plugin that support multiple affixes at the same time.
    It has html scraping that also support multiple affixes at the same time.
    Natively its has 3 built in positions (top, mid, bottom) but you can specify it by number.
    It support jumping to the container, so basically you can set the affix element anywhere it dont has
    to be the affix container.
        note: You can use css @keyframes to make a smooth animation for the jump

Scraping from html:

    Affix: should get the class = 'affix-sja'
    Affix container: should get the class = 'affix-container-sja'

    You simply need to give the affix container relative element to affix, and the affix element
    which will be moved relative to the affix container.

Classes:

    The affix element gets an 'affix-mode' class when its affixed

Only works on Y axis
