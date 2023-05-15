import throttle from 'lodash.throttle';

const formCurrentValue = {};

const formHandleValue = document.querySelector('.feedback-form');
const submitRef = formHandleValue.querySelector('button');
const inputRef = formHandleValue.querySelector('input');
const textareaRef = formHandleValue.querySelector('textarea');

formHandleValue.addEventListener('input', throttle(getHendleFormData, 500));

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

function getHendleFormData(e) {
  if (e.target.nodeName === 'INPUT') {
    formCurrentValue.email = e.target.value;
  }

  if (e.target.nodeName === 'TEXTAREA') {
    formCurrentValue.message = e.target.value;
  }
  save('feedback-form-state', formCurrentValue);
}

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

let currentStorageData = load('feedback-form-state');

const autoFillForm = data => {
  if (data.email !== undefined && data.email !== '') {
    inputRef.value = `${data.email}`;
  }
  if (data.message !== undefined && data.message !== '') {
    textareaRef.value = `${data.message}`;
  }
  return;
};

autoFillForm(currentStorageData);

submitRef.addEventListener('click', e => {
  e.preventDefault();
  inputRef.style = 'outline: none';
  textareaRef.style = 'outline: none';

  if (inputRef.value === '') {
    alert('Поле email не заповнене!');
    inputRef.style = 'outline: 1px solid red';
    return;
  }
  if (textareaRef.value === '') {
    alert('Поле Message не заповнене!');
    textareaRef.style = 'outline: 1px solid red';
    return;
  }

  console.log(currentStorageData);
  localStorage.removeItem('feedback-form-state');
  inputRef.value = '';
  textareaRef.value = '';
});
