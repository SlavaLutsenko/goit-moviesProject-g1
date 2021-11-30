window.addEventListener('load', event => {
  let loadAnim = document.querySelector('.loading');
  setTimeout(() => {
    loadAnim.classList.remove('loading');
  }, 1000);
});
