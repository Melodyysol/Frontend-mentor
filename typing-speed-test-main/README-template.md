# Frontend Mentor - Typing Speed Test solution

This is a solution to the [Typing Speed Test challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/typing-speed-test).

The goal of this project is to test a user's typing speed by calculating **WPM**, **accuracy**, and tracking correct and incorrect characters in real time.

Frontend Mentor challenges help me improve my coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

### The challenge

Users should be able to:

- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Type text and real time feed back
- See their **WPM**, **accuracy** and typing statistics
- Track best result using local storage which can be view in the leaderboard when users beat their high score

### Screenshot

![](./screenshot.jpg)


### Links

- Solution URL: [solution URL is here](https://www.frontendmentor.io/solutions/typing-speed-test-js)
- Live Site URL: [Add live site URL here](https://frontend-typing.netlify.app) or (https://melodyysol.github.io/Frontend-mentor/)

## My process

### Built with

- Semantic HTML5 markup
- CSS3 (Flexbox and Grid)
- Venilla Javascrit (ES Modules)
- Local Storage API
- Mobile-first workflow


### What I learned

This project helped me improve my understanding of:

- Handling keyboard events accurately
- Prevent cursor manipulation in input fields
- Calculate WPM and accuracy correctly
- Storing and comparing results using localStorage

```js
  input.addEventListener('click', e => {
    const len = input.value.length;
    input.setSelectionRange(len, len)
  })
```

### Continued development

In future version of this projects, I plan to:

- Add an online leaderboard
- Allow users to enter custom text
- Improve UI animation and feedback
- Add sound effect and themes (dark / light mode)

### Useful resources

- [Frontend Mentor Community](https://frontendmentor.io/community) - Inspiration and feedback from other developers.

## Author

- Github - [Issa Abdulwaris Atere](https://github.com/melodyysol/Frontend-mentor)
- Frontend Mentor - [@Melodyysol](https://www.frontendmentor.io/profile/melodyysol)
- Twitter - [@Melody_Shiller](https://www.twitter.com/melody_shiller)
- LinkedIn - [issa-abdulwaris-atere](https://www.linkedin.com/in/issa-abdulwaris-atere-b4329639b)


## Acknowledgments

Thanks to Frontend Mentor for providing this challenge and to the developer community for feedback and inspiration.

