window.addEventListener('load', event => {
  console.log(event);
  let loadAnim = document.querySelector('.loading');
  setTimeout(() => {
    loadAnim.classList.remove('loading');
  }, 1000);
});
