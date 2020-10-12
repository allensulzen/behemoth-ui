# Behemoth

## A Minimalist UI Library

Web development with superpowers! Like the mythical Behemoth, this library is large and powerful, but it's not just one kind of animal.

## Installation

Zip File:
CDN Link:
NPM Install:

## Documentation

### Useful functions

With modern JavaScript rolling out new features on the regular, we believe it's best to code in Vanilla JS. However, we've cut back on DOM traversal by offering the Behemoth 'b' selector, which acts like the sizzle selector (jQuery).

```javascript
b('#your-id');
```

### Parallax

A built-in parallax effect engine will make your photos and templates beautiful. Simply add the 'parallax' class to an HTML tag and set a background image in CSS or inline. It is also recommended to set a height, width, and 'background-size' to cover. If you add the 'parallax' class to an 'img' tag the effect may not work as intended on IE 11 as the [object-fit](https://caniuse.com/#search=object-fit) property is used.

Here is an example of what your HTML might look like:

```html
<div class='parallax' data-speed='slow' style='background-image: url(background.png);'></div>
<img class='parallax' data-speed='slow' src='background.png' />
```

Your CSS might look like this:

```css
div.your-class {
    width: 100%;
    min-height: 450px;
    background-size: cover;
    background-image: url(your-path/image.png);
}
```

Add the 'reverse' class to make the image scroll upward.

### Animations

Behemoth has a built-in animation library that lets you quickly add some flair to your project.

The JavaScript listens for the scroll event and adds the class "animated" based on the value of the data-position attribute. The animation class follows and defines which effect to render. The speed of the animation (milliseconds) is set with the data-speed attribute.

#### Position

The data-position attribute controls when the animation fires. The available options are 'bottom', 'middle', and 'onload'. When the data-position attribute is set to 'bottom' the animation won't fire until the element has risen above the bottom of the viewport. When the data-position attribute is set to 'middle'  the effect will fire once the element has risen above the vertical center of the viewport. When the data-position attribute is set to 'onload' the animation will occur as soon as the page loads.

#### Speed

The data-speed attribute will set the transition speed of the animations in milliseconds.

#### One Way

If the data-oneway attribute is set to 'true' the animation will stick once the scroll position has been reached. If set to 'false' JavaScript will remove the 'animated' class and the animation will fire (in reverse) when user scrolls upward past the element.

### EXAMPLE

Try out these examples:
```html
<h2 class='animator fade-in' data-position='middle' data-speed='500' data-oneway='false'>EXAMPLE</h2>
```

### SLIDE IN!

```html
<h2 class='animator slide-in-left' data-position='middle' data-speed='500' data-oneway='false'>EXAMPLE</h2>
```

The animation css has fourteen built in styles which can be combined, extended, or you can build your own. JavaScript will add the class 'animated' once the user scrolls past the data-position attribute location or the page loads. Add you own style by creating a class, and then another class with the 'animated' style afterward.

#### Built-in Animation Classes

* fade-in
* fade-out
* slide-in-up
* slide-in-right
* slide-in-down
* slide-in-left
* slide-out-up
* slide-out-right
* slide-out-down
* slide-out-left
* zoom-in
* zoom-out
* rise
* fall

### Modals

Create a div tag and add the 'b-modal' class. The Behemoth framework will detect, style, and handle the functionality of the modal. Set a modal id with the data attribute. Your HTML will look like this:

```html
<div class='b-modal' data-modal-id='1'>
    <!-- your content here... -->
</div>
```

Show modals with a single line of JavaScript using the 'bShowModal' function, passing the modal id as the argument. Here's an example:

```javascript
bShowModal(1);
```

### Hamburgers

Do you need a hamburger menu? Check out these animated hamburgers! They're quick and easy to implement, too.
Try three different animation styles: Smooth, Quick, & Slow

To create a hamburger use the HTML below.

```html
<div class='b-hamburger smooth'>
    <div class='b-ham-inner'></div>
    <div class='b-ham-inner'></div>
    <div class='b-ham-inner'></div>
</div>
```

Next you'll need to add some JavaScript. The animations occur automatically, but you can can instantiate the Hamburger class by passing the CSS selector as a string, and then adding an event listener:

```javascript
var mobileHam = new Hamburger('.b-hamburger');
mobileHam.el.addEventListener('click', function() {
     mobileHam.toggle();
     if (mobileHam.status === true) {
          // statements here occur when opening the hamburger
     } else {
          // statements here occur when closing the hamburger
     }
});
```

### Buttons

Create a button easily from button tags, links, and input fields.

Your HTML should look like this:

```html
<button class='b-btn'>Click me!</button>
<a class='b-btn' href='#'>Click me!</a>
<input type='submit' class='b-btn' value='Click me!' />
```

Try color options like blue, green, red, yellow, orange, and purple.

```html
<button class='b-btn blue'>Click me!</button>
<button class='b-btn green'>Click me!</button>
<button class='b-btn red'>Click me!</button>
<button class='b-btn orange'>Click me!</button>
<button class='b-btn purple'>Click me!</button>
```

You can make them solid, too.

```html
<button class='b-btn solid'>Click me!</button>
<button class='b-btn solid blue'>Click me!</button>
<button class='b-btn solid green'>Click me!</button>
<button class='b-btn solid red'>Click me!</button>
<button class='b-btn solid orange'>Click me!</button>
<button class='b-btn solid purple'>Click me!</button>
```

### Nav Bars

Navigation bars are essential to  modern user interfaces. Behemoth has light and dark defaults. Change the colors and extend the classes as needed. These give you a good jumping off point.

The light navbar can be acheived using the HTML below:

```html
<header class='b-header light'>
    <nav class='b-nav light'>
        <ul>
            <li>
                <a href='#'>Item 1</a>
            </li>
            <li>
                <a href='#'>Item 2</a>
            </li>
            <li>
                <a href='#'>Item 3</a>
            </li>
            <li>
                <a href='#'>Item 4</a>
            </li>
        </ul>
    </nav>
</header>
```

The dark navbar will just need the 'dark' class instead of 'light' on both the header and nav elements.

```html
<header class='b-header light'>
    <nav class='b-nav light'>
        <ul>
            <li>
                <a href='#'>Item 1</a>
            </li>
            <li>
                <a href='#'>Item 2</a>
            </li>
            <li>
                <a href='#'>Item 3</a>
            </li>
            <li>
                <a href='#'>Item 4</a>
            </li>
        </ul>
    </nav>
</header>
```

### Accordions

Do you have content you'd like to tuck away into an accordion? Try ours out!

Your HTML should look like this:

```html
<div class='b-accordion'>
    <div class='b-accordion-title'>
        <h2>Example Title</h2>
    </div>
    <div class='b-accordion-body'>
        <p>Add your content here...</p>
    </div>
</div>
```

### Tabs

Tabs work like accordions, but horizontally. You can include them in your page by using the HTML below:

```html
<div class='b-tab-header-cont'>
    <div class='b-tab-header active'>
        Tab 1
    </div>
    <div class='b-tab-header'>
        Tab 2
    </div>
    <div class='b-tab-header'>
        Tab 3
    </div>
</div>
<div class='b-tabs'>
    <div class='b-tab active'>
        <p>Tab 1 content...</p>
    </div>
    <div class='b-tab'>
        <p>Tab 2 content...</p>
    </div>
    <div class='b-tab'>
        <p>Tab 3 content...</p>
    </div>
</div>
```

### Forms

Inputs and text areas can be formatted using the 'b-input' class. This works for inputs with a type of submit, password, email, etc.

These fields don't have to be in an actual form element. Widths can be set using 'eigth', 'quarter', 'third', 'three-eighths', 'half', 'five-eighths', 'two-thirds', 'three-quarters', or 'seven-eighths'. If you specify width using one of these classes you'll need to place the inputs in a parent element with the class 'b-form-group'.

Your HTML should look like this:

```html
<div class='b-form-group'>
    <input class='b-input quarter' type='text' placeholder='First Name' />
    <input class='b-input quarter' type='text' placeholder='Last Name' />
    <input class='b-input quarter' type='password' placeholder='Password' />
    <input class='b-input quarter' type='email' placeholder='Email' />
</div>
<textarea class='b-input' placeholder='Your message here...'></textarea>
<input class='b-input' type='submit' value='SUBMIT FORM' />
```

Here's another example using two input fields with the 'three-eighths' class and a submit button that has the 'quarter' class.

Your HTML should look like this:

```html
<div class='b-form-group'>
    <input class='b-input three-eighths' type='text' placeholder='Name' />
    <input class='b-input three-eighths' type='text' placeholder='Email' />
    <input class='b-input quarter' type='submit' value='Join Now!' />
</div>
```
