import throttle from 'lodash.throttle';

const LOCAL_STRADGE_KEY = 'feedback-form-state';
const formCurrentValue = {};
let currentStorageData = {};

const { emailData, messageData } = currentStorageData;

currentStorageData = getDataFromStorage(LOCAL_STRADGE_KEY);
formCurrentValue.email = emailData;
formCurrentValue.message = messageData;

const formHandleValue = document.querySelector('.feedback-form');
const submitRef = formHandleValue.querySelector('button');
const inputRef = formHandleValue.querySelector('input');
const textareaRef = formHandleValue.querySelector('textarea');

formHandleValue.addEventListener('input', throttle(setDataFromStorage, 500));

function setDataFromStorage(e) {
  formCurrentValue[e.target.name] = e.target.value;
  try {
    const serializedState = JSON.stringify(formCurrentValue);
    localStorage.setItem(LOCAL_STRADGE_KEY, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

currentStorageData = getDataFromStorage(LOCAL_STRADGE_KEY);

function getDataFromStorage(key) {
  try {
    serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error:', error.message);
  }
}

const autoFillForm = data => {
  if (data === undefined) return;

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
