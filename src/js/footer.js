document.getElementById('year').innerHTML = new Date().getFullYear();

const footerBntRef = document.querySelector('.footer__button');
const modalRef = document.querySelector('[data-modal-team]');
const closeModalBtnRef = document.querySelector('[data-modal-team-close]');
const bodyRef = document.querySelector('body');
const footerRef = document.querySelector('.footer');

console.log(footerBntRef, modalRef, closeModalBtnRef, bodyRef, footerRef);

function toggleModalTeam() {
  modalRef.classList.toggle('is-hidden');
  bodyRef.classList.toggle('no-scroll');
}

footerBntRef.addEventListener('click', toggleModalTeam);

closeModalBtnRef.addEventListener('click', toggleModalTeam);
