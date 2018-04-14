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
  ]
};

/**
  * Генерация случайного числа в заданном диапазоне
  * @param {number} min - начало диапазона
  * @param {number} max - конеч диапазона
  * @returns {number} - случайное число
*/
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
  * Генерация случайного элемента массива
  * @param {Array} array - массив
  * @returns {string} - элемент массива
*/
var generateRandomArrayElement = function (array) {
  var number = getRandomInt(0, array.length - 1);
  return array[number];
};

/**
  * Генерация имени персонажа
  * @param {Array} nameArray - массив имён
  * @param {Array} surnameArray - массив фамилий
  * @returns {string} - Итоговые имя и фамилия персонажа
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
  * @returns {Array} - массив волшебников
*/
var generateWizardsArray = function (dataObject, number) {
  var resultArray = [];
  for (var i = 0; i < number; i++) {
    var wizard = {
      name: generateName(dataObject.nameData, dataObject.surnameData),
      coatColor: generateRandomArrayElement(dataObject.coatColorData),
      eyesColor: generateRandomArrayElement(dataObject.eyesColorData)
    };
    resultArray.push(wizard);
  }
  return resultArray;
};

/**
  * Создание фрагмента с волшебниками
  * @param {Array} array - массив с объектами волшебников
  * @returns {Object} - фрагмент с волшебниками для вставки в разметку
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
