'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

var CLOUD_WIDTH_SIDE = 360;
var CLOUD_HEIGHT_SIDE = 200;

var cloudAngleX = CLOUD_WIDTH - CLOUD_WIDTH_SIDE;
var cloudAngleY = (CLOUD_HEIGHT - CLOUD_HEIGHT_SIDE) / 2;

var CLOUD_X = 100;
var CLOUD_Y = 10;

var GAP = 10;
var BAR_GAP = 30;

var TEXT_X = 100;
var TEXT_Y = 40;

var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {

  // Координаты построения восьмиугольника
  var x2 = x + CLOUD_WIDTH_SIDE;
  var x3 = x2 + cloudAngleX;
  var x4 = x - cloudAngleX;
  var y2 = y + cloudAngleY;
  var y3 = y2 + CLOUD_HEIGHT_SIDE;
  var y4 = y3 + cloudAngleY;

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y);
  ctx.lineTo(x3, y2);
  ctx.lineTo(x3, y3);
  ctx.lineTo(x2, y4);
  ctx.lineTo(x, y4);
  ctx.lineTo(x4, y3);
  ctx.lineTo(x4, y2);
  ctx.closePath();
  ctx.fill();
};

var renderText = function (ctx, text, x, y) {
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = '#000';
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

window.renderStatistics = function(ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderText(ctx, 'Ура вы победили!', TEXT_X, TEXT_Y);
  renderText(ctx, 'Список победителей:', TEXT_X, TEXT_Y * 1.5);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var saturation = getRandomInt(0, 100) + '%';
      var blueFiller = 'hsl(240,' + saturation + ', 50%)';
      ctx.fillStyle = blueFiller;
    }

    ctx.fillRect(CLOUD_X + GAP + BAR_WIDTH + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - cloudAngleY, -BAR_WIDTH, -((BAR_HEIGHT * times[i]) / maxTime));
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - cloudAngleY / 2);
  }
};
