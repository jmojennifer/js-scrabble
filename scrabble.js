var Scrabble = function() {

// Wave 1: Scrabble functionality:

};

Scrabble.score = function(word) {
  points = {
    "A": 1,
    "B": 3,
    "C": 3,
    "D": 2,
    "E": 1,
    "F": 4,
    "G": 2,
    "H": 4,
    "I": 1,
    "J": 8,
    "K": 5,
    "L": 1,
    "M": 3,
    "N": 1,
    "O": 1,
    "P": 3,
    "Q": 10,
    "R": 1,
    "S": 1,
    "T": 1,
    "U": 1,
    "V": 4,
    "W": 4,
    "X": 5,
    "Y": 4,
    "Z": 10
  };

  this.word = word.toUpperCase();
  var sum = 0;
  var bonus = 0;
  for (var key in points) {
    var count = 0;
    count += this.word.split(key).length - 1;
    sum += count * points[key];
  }

  if (this.word.length == 7) {
    bonus = 50;
  }
  sum += bonus;
  return sum;
};

Scrabble.highestScoreFrom = function(arrayOfWords) {
  var highestScore = ["", 0];

  for (var i = 0; i < arrayOfWords.length; i++) {
    var word = arrayOfWords[i];

    if (this.score(word) > highestScore[1]) {
      highestScore = [word, this.score(word)];
    }
    else if (this.score(word) == highestScore[1]) {
      highestScore = this.tieBreaker(highestScore, [word, this.score(word)]);
    }
  }
  return highestScore[0];
};

Scrabble.tieBreaker = function(word1, word2) {
  if (word1[0].length > word2[0].length) {
    if (word1[0].length != 7) {
      return word2;
    }
    else {
      return word1;
    }
  }
  else if (word1[0].length < word2[0].length) {
    if (word2[0].length != 7) {
      return word1;
    }
    else {
      return word2;
    }
  }
  else if (word1[0].length == word2[0].length) {
    return word1;
  }
};

// Wave 2: Player object:

var Player = function(name) {
  this.name = name;
  this.wordsPlayed = [];
};

Player.prototype.plays = function() {
  return this.wordsPlayed;
};

Player.prototype.play = function(word) {
  if (this.hasWon() === true) {
    return false;
  }
  else {
    this.wordsPlayed.push(word);

    return this.wordsPlayed;
  }
};

Player.prototype.totalScore = function() {
  var sum = 0;
  for (var i = 0; i < this.wordsPlayed.length; i++) {
    sum += Scrabble.score(this.wordsPlayed[i]);
  }
  return sum;
};

Player.prototype.hasWon = function() {

  if (this.totalScore() >= 100) {
    return true;
  }
  else {
    return false;
  }
};

Player.prototype.highestScoringWord = function() {
  return Scrabble.highestScoreFrom(this.wordsPlayed);
};

Player.prototype.highestWordScore = function() {
  Scrabble.score(this.highestScoringWord());
  return Scrabble.score(this.highestScoringWord());
};


// Scrabble Tests:
// ----------------------------------------------
// var my_game = new Scrabble();
//
// var triedWords = ["ZQQQQJ", "QQQQQJ", "DOG"];
// console.log(Scrabble.highestScoreFrom(triedWords));
//
// console.log("========");
//
// var triedWords = ["QQQQQJ", "GORILLA", "DOG"];
// console.log(Scrabble.highestScoreFrom(triedWords));
//
// console.log("========");
//
// var triedWords = ["Hello", "world", "work", "please"];
// console.log(Scrabble.highestScoreFrom(triedWords));
//
// console.log("========");
//
// var triedWords = ["QQQQJ", "QQQQQJ", "ZZQQQJ", "DOG"];
// console.log(Scrabble.highestScoreFrom(triedWords));

// Player Tests:
// ----------------------------------------------
var my_game = new Scrabble();
var playerJen = new Player("Jen");

playerJen.play("QQQQQJ");
console.log(playerJen.plays());
console.log(playerJen.highestScoringWord());
console.log(playerJen.highestWordScore());
console.log(playerJen.hasWon());

playerJen.play("GORILLA");
console.log(playerJen.plays());
console.log(playerJen.highestScoringWord());
console.log(playerJen.highestWordScore());
console.log(playerJen.hasWon());

module.exports = Scrabble;
