window.addEventListener('load', event => {
  console.log(event);
  let LoadAnim = document.querySelector('.loading');
  console.log(LoadAnim);
  LoadAnim.classList.remove('loading');
});
