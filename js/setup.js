'use strict';

document.querySelector('.setup').classList.remove('hidden');

var generateCharacter = function () {
  var charactersData = {
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

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var generateName = function (name, surname) {
    var nameNumber = getRandomInt(0, name.length - 1);
    var surnameNumber = getRandomInt(0, surname.length - 1);
    var isSurnameFirst = !!Math.round(Math.random());

    if (isSurnameFirst) {
      return surname[nameNumber] + ' ' + name[surnameNumber];
    }

    return name[nameNumber] + ' ' + surname[surnameNumber];
  };

  var generateColor = function (colors) {
    var number = getRandomInt(0, colors.length - 1);
    return colors[number];
  };

  var character = {
    name: generateName(charactersData.nameData, charactersData.surnameData),
    coatColor: generateColor(charactersData.coatColorData),
    eyesColor: generateColor(charactersData.eyesColorData)
  };

  return character;
};

var WIZARDS_COUNT = 4;
var wizardsArray = [];

for (var i = 1; i <= WIZARDS_COUNT; i++) {
  var wizard = generateCharacter();
  wizardsArray.push(wizard);
}

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var renderWizard = function (unit) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = unit.name;
  wizardElement.querySelector('.wizard-coat').style.fill = unit.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = unit.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();

for (var j = 0; j < wizardsArray.length; j++) {
  fragment.appendChild(renderWizard(wizardsArray[j]));
}

similarListElement.appendChild(fragment);
document.querySelector('.setup-similar').classList.remove('hidden');
