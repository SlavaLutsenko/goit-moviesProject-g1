import Notiflix from 'notiflix';
import api from './api-service';
import getMovie from './getMovie';
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var colors = [
  'aqua',
  'azure',
  'beige',
  'bisque',
  'black',
  'blue',
  'brown',
  'chocolate',
  'coral',
  'crimson',
  'cyan',
  'fuchsia',
  'ghostwhite',
  'gold',
  'goldenrod',
  'gray',
  'green',
  'indigo',
  'ivory',
  'khaki',
  'lavender',
  'lime',
  'linen',
  'magenta',
  'maroon',
  'moccasin',
  'navy',
  'olive',
  'orange',
  'orchid',
  'peru',
  'pink',
  'plum',
  'purple',
  'red',
  'salmon',
  'sienna',
  'silver',
  'snow',
  'tan',
  'teal',
  'thistle',
  'tomato',
  'turquoise',
  'violet',
  'white',
  'yellow',
];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;';

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// var diagnostic = document.querySelector('.output');
var bg = document.querySelector('body');
// var hints = document.querySelector('.hints');
const input = document.querySelector('#header-contain-input');
console.log(input.value);
var colorHTML = '';
// colors.forEach(function (v, i, a) {
//   console.log(v, i);
//   colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
// });
// hints.innerHTML =
//   'Tap/click then say a color to change the background color of the app. Try ' + colorHTML + '.';

const theme = document.querySelector('.headertheme-cont__btn');
const footer = document.querySelector('footer');
footer.addEventListener('click', handleFootClick);
theme.addEventListener('click', handleRecClick);

function handleFootClick(ev) {
  recognition.start();
  recognition.onresult = function (event) {
    const span = document.querySelectorAll('.genre');

    // Search movies with input
    var color = event.results[0][0].transcript;
    if (colors.includes(color)) {
      span.forEach(el => {
        el.style.color = 'white';
      });
      bg.style.backgroundColor = color;

      Notiflix.Notify.success(`Your theme changed to ${color}`);
    } else {
      Notiflix.Notify.warning("I didn't recognise that color.");
    }
  };
}

function handleRecClick(ev) {
  recognition.start();
  recognition.onresult = function (event) {
    const span = document.querySelectorAll('.genre');

    // Search movies with input
    input.value = event.results[0][0].transcript;
    api.inputValue = event.results[0][0].transcript;
    getMovie();
  };
}

// theme.onclick = function () {
//   recognition.start();
//   console.log('Ready to receive a color command.');
// };

// recognition.onresult = function (event) {
//   const span = document.querySelectorAll('.genre');

//   // Search movies with input
//   console.log(event.target);
//   input.value = event.results[0][0].transcript;
//   api.inputValue = event.results[0][0].transcript;
//   getMovie();

// Change background color
// var color = event.results[0][0].transcript;
// if (colors.includes(color)) {
//   span.forEach(el => {
//     el.style.color = 'white';
//   });
//   bg.style.backgroundColor = color;

//   Notiflix.Notify.success(`Your theme changed to ${color}`);
// } else {
//   Notiflix.Notify.warning("I didn't recognise that color.");
// }
// };

recognition.onspeechend = function () {
  recognition.stop();
};

// recognition.onnomatch = function (event) {
//   Notiflix.Notify.warning("I didn't recognise that color.");
// };

// recognition.onerror = function (event) {
//   Notiflix.Notify.failure('Ooopppsss, something went wrong');
// };
