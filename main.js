document.addEventListener('DOMContentLoaded', () => {
  console.log('Welcome to my portfolio site! 🌟 The DOM is fully loaded.');

  // Example: Change the text of a heading
  const heading = document.querySelector('h1');
  if (heading) {
    heading.textContent = 'Hello there! 👋🏼';
  }
});
