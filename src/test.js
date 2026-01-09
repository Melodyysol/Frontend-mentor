let text = document.querySelector('.container')
// let a = 'atere'
// let newHtml = document.createElement('span')
// newHtml.innerHTML = a;
// newHtml.style.color = 'red';
// text.append(newHtml)
// text.addEventListener('input', () => {
//   text.append(newHtml);
//   console.log(text)
// })

text.addEventListener('input', () => {
  let typedText = text.value;
  typedText = typedText.trim().split(/|s+/)
  for (let char of typedText) {
    text.value = `<span style="color: red;">${char}</span>`
  }
})