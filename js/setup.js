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

    var result = name[nameNumber] + ' ' + surname[surnameNumber];
    if (isSurnameFirst) {
      result = surname[nameNumber] + ' ' + name[surnameNumber];
    };

    return result;
  };

  var generateCoatColor = function (coat) {
    var coatNumber = getRandomInt(0, coat.length - 1);
    var result = coat[coatNumber];

    return result;
  };

  var generateEyesColor = function (eyes) {
    var eyesNumber = getRandomInt(0, eyes.length - 1);
    var result = eyes[eyesNumber];

    return result;
  };

  var character = {
    name: generateName(charactersData.nameData, charactersData.surnameData),
    coatColor: generateCoatColor(charactersData.coatColorData),
    eyesColor: generateCoatColor(charactersData.coatColorData)
  };

  return character;
};

var WIZARDS_COUNT = 4;
var wizardsArray = [];

for (var i = 1; i <= WIZARDS_COUNT; i++) {
  var wizard = generateCharacter();
  wizardsArray.push(wizard);
};

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < wizardsArray.length; i++) {
  fragment.appendChild(renderWizard(wizardsArray[i]));
};

similarListElement.appendChild(fragment);
document.querySelector('.setup-similar').classList.remove('hidden');
