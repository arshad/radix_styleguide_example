---
title: Colors
---

## Colors

All colors are defined as `$colors` in `_variables.scss`.

#### Palette
<div class="color-palette">
  <div class="color-palette__item bg-color--green text-color--white">green</div>
  <div class="color-palette__item bg-color--green-dark text-color--white">green-dark</div>
  <div class="color-palette__item bg-color--green-light">green-light</div>
  <div class="color-palette__item bg-color--green-lighter">green-lighter</div>
  <div class="color-palette__item bg-color--lime">lime</div>
  <div class="color-palette__item bg-color--red text-color--white">red</div>
  <div class="color-palette__item bg-color--red-dark text-color--white">red-dark</div>
</div>

Mixin: To use a color in your Scss file, use the `color()` function. See an example below.

#### Example

``` scss
.element {
  background-color: color(green);
}
```

Helpers: Use color helpers to change the text, background and border colors of elements.

#### Classes

``` scss
.text-color--green // color: green;
.bg-color--green // background-color: green; 
.border-color--green // border-color: green;
```

#### Example
``` html
<div class="bg-color--red">This div will have background color red.</div>
```
