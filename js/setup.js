'use strict';
var WIZARDS_NUMBER = 4;
var WIZARDS_DATA = {
  nameData: [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ],

  surnameData: [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ],

  coatColorData: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],

  eyesColorData: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ],

  fireballColorData: [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ]
};

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

/**
  * Генерация случайного числа в заданном диапазоне
  * @param {number} min - начало диапазона
  * @param {number} max - конеч диапазона
  * @return {number} - случайное число
*/
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
  * Получение случайного элемента массива
  * @param {Array} array - массив
  * @return {string} - элемент массива
*/
var getRandomArrayElement = function (array) {
  var number = getRandomInt(0, array.length - 1);
  return array[number];
};

/**
  * Генерация имени персонажа
  * @param {Array} nameArray - массив имён
  * @param {Array} surnameArray - массив фамилий
  * @return {string} - Итоговые имя и фамилия персонажа
*/
var generateName = function (nameArray, surnameArray) {
  var nameNumber = getRandomInt(0, nameArray.length - 1);
  var surnameNumber = getRandomInt(0, surnameArray.length - 1);
  var isSurnameFirst = !!Math.round(Math.random());

  if (isSurnameFirst) {
    return surnameArray[nameNumber] + ' ' + nameArray[surnameNumber];
  }

  return nameArray[nameNumber] + ' ' + surnameArray[surnameNumber];
};

/**
  * Генерация массива волшебников
  * @param {Object} dataObject - объект с массивами данных (имя, цвет плаща, цвет глаз)
  * @param {number} number - количество волшебников
  * @return {Array} - массив волшебников
*/
var generateWizardsArray = function (dataObject, number) {
  var resultArray = [];
  for (var i = 0; i < number; i++) {
    var wizard = {
      name: generateName(dataObject.nameData, dataObject.surnameData),
      coatColor: getRandomArrayElement(dataObject.coatColorData),
      eyesColor: getRandomArrayElement(dataObject.eyesColorData)
    };
    resultArray.push(wizard);
  }
  return resultArray;
};

/**
  * Создание фрагмента с волшебниками
  * @param {Array} array - массив с объектами волшебников
  * @return {Object} - фрагмент с волшебниками для вставки в разметку
*/
var renderWizards = function (array) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = array[i].name;
    wizardElement.querySelector('.wizard-coat').style.fill = array[i].coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = array[i].eyesColor;

    fragment.appendChild(wizardElement);
  }

  return fragment;
};

var wizardsArray = generateWizardsArray(WIZARDS_DATA, WIZARDS_NUMBER);

var similarListElement = document.querySelector('.setup-similar-list');
similarListElement.appendChild(renderWizards(wizardsArray));

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');


//
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var setupIcon = setupOpen.querySelector('.setup-open-icon');
var setupUserName = document.querySelector('.setup-user-name');

var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var eyesColorInput = document.querySelector('.setup-wizard-appearance input[name="eyes-color"]');

var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var coatColorInput = document.querySelector('.setup-wizard-appearance input[name="coat-color"]');

var wizardFireball = document.querySelector('.setup-fireball-wrap');
var fireballColorInput = document.querySelector('.setup-fireball-wrap input[name="fireball-color"]');

/**
  * Открытие модального окна
*/
var openPopup = function () {
  setup.classList.remove('hidden');
};

/**
  * Закрытие модального окна
*/
var closePopup = function () {
  setup.classList.add('hidden');
};

/**
  * Изменение цвета на случайный из массива
  * @param {Object} elem - DOM-элемент
  * @param {string} elemStyle - стиль, отвечающий за покраску
  * @param {Object} input - input с данными цвета для отправки формы
  * @param {Array} dataArray - массив с цветами
  * @return {string} - новый цвет
*/
var changeColor = function (elem, elemStyle, input, dataArray) {
  var newColor = getRandomArrayElement(WIZARDS_DATA.fireballColorData);
  elemStyle == 'background' ? elem.style.background = newColor : elem.style.fill = newColor;
  input.value = newColor;
  return newColor;
};

setupOpen.addEventListener('click', openPopup);
setupClose.addEventListener('click', closePopup);

document.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement.className !== 'setup-user-name') {
    closePopup();
  }
});

setupOpen.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

wizardEyes.addEventListener('click', function() {
  changeColor(wizardEyes, 'fill', eyesColorInput, WIZARDS_DATA.eyesColorData);
});

wizardCoat.addEventListener('click', function() {
  changeColor(wizardCoat, 'fill', coatColorInput, WIZARDS_DATA.coatColorData);
});

wizardFireball.addEventListener('click', function() {
  changeColor(wizardFireball, 'background', fireballColorInput, WIZARDS_DATA.fireballColorData);
});
