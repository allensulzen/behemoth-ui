/**
 * BEHEMOTH JAVASCRIPT FRAMEWORK
 * This library is a grouping of useful functions that work
 * across all browsers and are written with minimal, vanilla
 * JavaScript. It is extensible and free to use, and we're 
 * updating it all the time. It was written in July 2020 by 
 * Allen Sulzen, founder of HoosierCoders (https://hoosiercoders.com). 
 * 
 * CONTENTS
 * 
 * #GENERAL FUNCTIONS
 * #PARALLAX
 * #ANIMATIONS
 *  ##Animation Engine
 *  ##Loading Circles
 * #SLIDER
 * #MODALS
 * #AXIOS
 * #HAMBURGER
 * #BUTTONS
 * #NAVBARS
 *  ##Mobile Menus
 *  ##Header Menus
 *  ##Footer Menus
 * #ACCORDIONS
 * #TABS
 * #FORMS
 *  ##Search Boxes
 *  ##Checkboxes
 *  ##Radio Buttons
 *  ##Dropdown
 *  ##Inputs
 * #ROUTER
 * #DOM LOOPER
 * #SUB LANGUAGE/TEMPLATES
 */

// #GENERAL FUNCTIONS
// this replaces document.querySelector() and document.querySelectorAll(), like the sizzle selector but for vanilla JS
function b(arg) {
    var queryTemp = document.querySelectorAll(arg);
    if (queryTemp.length == 1) {
        queryTemp = document.querySelector(arg);
    }
    return queryTemp;
}

// this loops through the entire DOM touching each element, bulk operations can be done, for use later in sub-language and templating
function domLoop() {
    for (i = 0; i < b('*').length; i++) {
        if (b('*')[i].tagName == "H2") {
            b('*')[i].innerHTML = "TEST HEADING";
        }
    }
}

// this scrolls to the ID clicked, set on anchor with onclick attribute
function scrollToID(arg) {
    b(arg).scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// add event listener to window.onresize
window.onresize = function() {
    // for one tab group, set new tab cont height
    if (b('.b-tab-header-cont').length == undefined) {
        // determine max height of tabs
        var maxTabHeight = 0;
        for (l = 0; l < tabs[0].bTabCont.bTabs.length; l++) {
            if (tabs[0].bTabCont.bTabs[l].offsetHeight > maxTabHeight) {
                maxTabHeight = tabs[0].bTabCont.bTabs[l].offsetHeight;
            }
        }
        // set b-tabs height to max
        b('.b-tabs').style.height = maxTabHeight + 'px';
    }
}


// #ANIMATOR
// html tag example: <div class='animator fade-in' data-position='bottom' data-oneway='true'></div>

var animator = {
    elements: [],
    scrollPosition: null,
    windowHeight: null,
    windowBottom: null,
    scrollCheck: function() {
        animator.scrollPosition = window.scrollY;
        animator.windowHeight = window.innerHeight;
        animator.windowBottom = animator.scrollPosition + animator.windowHeight;
        for (i = 0; i < animator.elements.length; i++) {
            animator.elements[i].top = animator.elements[i].domRef.getBoundingClientRect().top;
            if (animator.elements[i].oneWay == 'true') {
                if (animator.elements[i].domRef.getBoundingClientRect().top - animator.windowHeight < 0 && animator.elements[i].animatePosition == 'bottom') {
                    animator.elements[i].domRef.classList.add('animated');
                }
                if (animator.elements[i].domRef.getBoundingClientRect().top - (animator.windowHeight/2) < 0 && animator.elements[i].animatePosition == 'middle') {
                    animator.elements[i].domRef.classList.add('animated');
                }
            } else if (animator.elements[i].oneWay == 'false') {
                if (animator.elements[i].domRef.getBoundingClientRect().top - animator.windowHeight < 0 && animator.elements[i].animatePosition == 'bottom') {
                    animator.elements[i].domRef.classList.add('animated');
                }
                if (animator.elements[i].domRef.getBoundingClientRect().top - (animator.windowHeight/2) < 0 && animator.elements[i].animatePosition == 'middle') {
                    animator.elements[i].domRef.classList.add('animated');
                }
                if (animator.elements[i].domRef.getBoundingClientRect().top - animator.windowHeight > 0 && animator.elements[i].animatePosition == 'bottom') {
                    animator.elements[i].domRef.classList.remove('animated');
                }
                if (animator.elements[i].domRef.getBoundingClientRect().top - (animator.windowHeight/2) > 0 && animator.elements[i].animatePosition == 'middle') {
                    animator.elements[i].domRef.classList.remove('animated');
                }
            }
        }
    },
    init: function() {
        if (document.querySelectorAll('.animator')) {
            for (i = 0; i < document.querySelectorAll('.animator').length; i++) {
                animator.elements.push({
                    domRef: document.querySelectorAll('.animator')[i],
                    top: null,
                    animatePosition: document.querySelectorAll('.animator')[i].dataset.position,
                    oneWay: document.querySelectorAll('.animator')[i].dataset.oneway,
                    transition: document.querySelectorAll('.animator')[i].dataset.speed,
                });
                document.querySelectorAll('.animator')[i].style.transition = document.querySelectorAll('.animator')[i].dataset.speed + 'ms';
                if (document.querySelectorAll('.animator')[i].dataset.position == 'onload') {
                    document.querySelectorAll('.animator')[i].classList.add('animated');
                }
            }
            animator.scrollCheck();
            document.addEventListener('scroll', function() {
                animator.scrollCheck();
            });
        }
    },
};

animator.init();

// PARALLAX
// parallax object, variables, & methods
// if (document.querySelectorAll('.parallax').length > 0) {
    var parallax = {
        // variables
        images: [],
        imageElements: document.querySelectorAll('.parallax'),
        imagesOriginal: [],
        count: document.querySelectorAll('.parallax').length,
        // methods
        init: function () {
            if (this.count > 0) {
                // insert function here that is called with event listener of load for large images, so that we don't need to run init twice.
                for (i = 0; i < this.count; i++) {
                    var imgSrc = (this.imageElements[i].nodeName == 'IMG') ? this.imageElements[i].src : this.imageElements[i].style.backgroundImage.slice(4, -1).replace(/"/g, "");
                    var imgOriginal = new Image();
                    imgOriginal.src = imgSrc;
                    this.imagesOriginal.push(imgOriginal);
                    var mode = 'default';
                    if (this.imageElements[i].classList.contains('reverse')) {
                        mode = 'reverse';
                    }
                    if (this.imageElements[i].classList.contains('fixed')) {
                        mode = 'fixed'
                    }
                    this.images.push({
                        src: imgSrc,
                        mode: mode,
                        speed: (this.imageElements[i].dataset.speed) ? this.imageElements[i].dataset.speed : 'fast',
                        elHeight: this.imageElements[i].offsetHeight,
                        elWidth: this.imageElements[i].offsetWidth,
                        elAspect: this.imageElements[i].offsetWidth / this.imageElements[i].offsetHeight,
                        originalHeight: parallax.imagesOriginal[i].height,
                        originalWidth: parallax.imagesOriginal[i].width,
                        originalAspect: parallax.imagesOriginal[i].width / parallax.imagesOriginal[i].height,
                        top: this.imageElements[i].getClientRects()[0].top,
                        bottom: this.imageElements[i].getClientRects()[0].bottom,
                        delta: Math.abs(this.imageElements[i].offsetHeight - imgOriginal.height),
                        halfDelta: Math.abs(this.imageElements[i].offsetHeight - imgOriginal.height)/2,
                        elType: this.imageElements[i].nodeName,
                    });
                    console.log(imgOriginal.width + " " + imgOriginal.height);
                    if (parallax.images[i].originalAspect > parallax.images[i].elAspect) {
                        console.log('parallax image #' + (i + 1) + ' aspect ratio prevents parallax behaviour');
                    }
                }
            }
        },
        scroll: function() {
            // update top & bottom for parallax.images
            for (i = 0; i < parallax.count; i++) {
                parallax.images[i].top = parallax.imageElements[i].getClientRects()[0].top;
                parallax.images[i].bottom = parallax.imageElements[i].getClientRects()[0].bottom;
                if (parallax.images[i].bottom > 0 && parallax.images[i].top < window.innerHeight) {
                    // verifying that original image aspect ratio is less than element's
                    // if (parallax.images[i].originalAspect < parallax.images[i].elAspect) {
                        // mode: default
                        var speed = 1;
                        if (parallax.images[i].speed == 'medium') {
                            speed = 2;
                        }
                        if (parallax.images[i].speed == 'slow') {
                            speed = 3;
                        }
                        if (parallax.images[i].mode == 'default') {
                            if (parallax.images[i].elType == 'IMG') {
                            parallax.imageElements[i].style.objectPosition = '50% ' + ((parallax.images[i].bottom / window.innerHeight)*100)/speed + '%';
                            } else
                            /* if (parallax.images[i].elType == 'DIV' || parallax.images[i].elType !== 'IMG') */ {
                                parallax.imageElements[i].style.backgroundPosition = '50% ' + ((parallax.images[i].bottom / window.innerHeight)*100)/speed + '%';
                            }
                        }
                        // mode: reverse
                        if (parallax.images[i].mode == 'reverse') {
                            if (parallax.images[i].elType == 'IMG') {
                            parallax.imageElements[i].style.objectPosition = '50% ' + (100-(parallax.images[i].top / window.innerHeight)*100)/2.5/speed + '%';
                            } else
                            /* if (parallax.images[i].elType == 'DIV' || parallax.images[i].elType !== 'IMG') */ {
                                parallax.imageElements[i].style.backgroundPosition = '50% ' + (100-(parallax.images[i].top / window.innerHeight)*100)/2.5/speed + '%';
                            }
                        }
                    // }
                }
                // mode: fixed
                if (parallax.images[i].mode == 'fixed') {
                    if (parallax.images[i].elType == 'IMG') {
                        parallax.imageElements[i].style.objectPosition = 'center  bottom ' + -(window.innerHeight - parallax.images[i].bottom) + 'px';
                    } else
                    /* if (parallax.images[i].elType == 'DIV' || parallax.images[i].elType !== 'IMG') */ {
                        parallax.imageElements[i].style.backgroundPosition = 'center bottom ' + -(window.innerHeight - parallax.images[i].bottom) + 'px';
                    }
                }
            };
        },
    };
    
    // window.onload = function () {
        // run parallax init method when window loads
        parallax.init();
        parallax.scroll();
        // attach event listener to scroll
        window.addEventListener('scroll', parallax.scroll);
        window.addEventListener('resize', parallax.scroll);
    // }

/* HAMBURGER */
class Hamburger {
    toggle() {
        if (this.status === true) {
            this.status = false; 
        } else {
            this.status = true;             
        }
    }
    constructor (el) {
        this.status = true;
        this.el = b(el);
    }
}

function toggleHam(t) {
    if (t.classList.contains('active')) {
        t.classList.remove('active');
    } else {
        t.classList.add('active');
    }
}

function bHamListen() {
    var hamburgers = b('.b-hamburger');
    if (hamburgers.length !== undefined) {
        for (i = 0; i < hamburgers.length; i++) {
            hamburgers[i].addEventListener('click', function(event) {
                toggleHam(this);
            });
        }
    } else if (hamburgers) {
        hamburgers.addEventListener('click', function(event) {
            toggleHam(this);
        });
    }
}

bHamListen();

/* MODAL */
var modals = b('.b-modal');

function bShowModal(modalId) {
    if (b('.b-modal').length !== undefined) {
        for (i = 0; i < b('.b-modal').length; i++) {
            b('.b-modal')[i].classList.remove('active');
        }
    } else {
        b('.b-modal').classList.remove('active');
    }
    if (b('.b-modal').length == undefined && modalId == b('.b-modal').dataset.modalId) {
        b('.b-modal').classList.add('active');
    } else if (b('.b-modal').length > 0) {
        for (i = 0; i < b('.b-modal').length; i++) {
            if (b('.b-modal')[i].dataset.modalId == modalId) {
                b('.b-modal')[i].classList.add('active');
            }
        }
    }
}

(function() {
    if (b('.b-modal').length == undefined) {
        b('.b-modal').innerHTML = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="b-close-svg" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
` + b('.b-modal').innerHTML;
        b('.b-modal svg').addEventListener('click', function() {
            b('.b-modal').classList.remove('active');                
        });
    } else if (b('.b-modal').length > 0) {
        for (i = 0; i < b('.b-modal').length; i++) {
            b('.b-modal')[i].innerHTML = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="b-close-svg" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
` + b('.b-modal')[i].innerHTML;
        b('.b-modal')[i].childNodes[0].addEventListener('click', function() {
                for (i = 0; i < b('.b-modal').length; i++) {
                    b('.b-modal')[i].classList.remove('active');       
                }
            });
        }     
    }
})();

/* ACCORDIONS */
function bAccordionToggle(el) {
    console.log(el);
    if (el.classList.contains('open')) {
        el.classList.remove('open');
    } else {
        el.classList.add('open');       
    }
}

(function() {
    if (b('.b-accordion').length == undefined) {
        b('.b-accordion .b-accordion-title').addEventListener('click', function() {
            bAccordionToggle(b('.b-accordion'));
        });
    } else if (b('.b-accordion').length > 0) {
        for (i = 0; i < b('.b-accordion').length; i++) {
            b('.b-accordion')[i].children[0].addEventListener('click', function(event) {
                var accClose = false;
                if (event.path[2].classList.contains('open')) {
                    accClose = true;
                }
                for (i = 0; i < b('.b-accordion').length; i++) {
                    b('.b-accordion')[i].classList.remove('open');
                }
                if (accClose === true) {
                    event.path[2].classList.add('open');
                }
                bAccordionToggle(event.path[2]);
            });
        }
    }
})();

/* TABS */
var tabs = [];

(function () {
    if (b('.b-tab-header-cont').length == undefined) {
        tabs.push({
            bTabHeaderCont: {
                el: b('.b-tab-header-cont'),
                bTabHeaders: b('.b-tab-header')
            },
            bTabCont: {
                el: b('.b-tabs'),
                bTabs: b('.b-tab')
            }
        });
        // attach event listeners to click event for tab headers
        for (i = 0; i < tabs[0].bTabHeaderCont.bTabHeaders.length; i++) {
            tabs[0].bTabHeaderCont.bTabHeaders[i].addEventListener('click', function(event) {
                if (!event.target.classList.contains('active')) {
                    // remove active class from all header elements
                    for (j = 0; j < tabs[0].bTabHeaderCont.bTabHeaders.length; j++) {
                        tabs[0].bTabHeaderCont.bTabHeaders[j].classList.remove('active');
                    }
                    // remove active class from all tab elements
                    for (k = 0; k < tabs[0].bTabCont.bTabs.length; k++) {
                        tabs[0].bTabCont.bTabs[k].classList.remove('active');
                    }
                }
                // add class to event target
                event.target.classList.add('active');
                // get index of child event.target
                for (l = 0; l < b('.b-tab-header').length; l++) {
                    if (b('.b-tab-header')[l] == event.target) {
                        b('.b-tab')[l].classList.add('active');
                    }
                }
            });
        }
        // determine max height of tabs
        var maxTabHeight = 0;
        for (l = 0; l < tabs[0].bTabCont.bTabs.length; l++) {
            if (tabs[0].bTabCont.bTabs[l].offsetHeight > maxTabHeight) {
                maxTabHeight = tabs[0].bTabCont.bTabs[l].offsetHeight;
            }
        }
        // set b-tabs height to max
        b('.b-tabs').style.height = maxTabHeight + 'px';
    }
})();