import throttle from 'lodash.throttle';

let formData = {};
const form = document.querySelector('.feedback-form');
const submitRef = form.querySelector('button');
const LS = localStorage;
const LS_KEY = 'feedback-form-state';

form.addEventListener('input', throttle(setDataLS, 500));

function setDataLS(e) {
  formData[e.target.name] = e.target.value;
  LS.setItem(LS_KEY, JSON.stringify(formData));
}

try {
  if (LS.getItem(LS_KEY)) {
    formData = JSON.parse(LS.getItem(LS_KEY));
    for (let key in formData) {
      form.elements[key].value = formData[key];
    }
  }
} catch (error) {
  console.error('Set state error: ', error.message);
}

submitRef.addEventListener('click', e => {
  e.preventDefault();

  form.elements['email'].style = 'outline: none';
  form.elements['message'].style = 'outline: none';

  if (form.elements['email'].value === '') {
    form.elements['email'].placeholder = 'Enter your email';
    form.elements['email'].style = 'outline:1px solid red';
    return;
  }

  if (form.elements['message'].value === '') {
    form.elements['message'].placeholder = 'Enter your message';
    form.elements['message'].style = 'outline:1px solid red';
    return;
  }

  console.log(formData);
  form.elements['email'].value = '';
  form.elements['message'].value = '';
  localStorage.clear();
});
