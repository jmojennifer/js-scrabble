var Scrabble = function() {

  this.points = {
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
};

Scrabble.prototype.score = function(word) {
  this.word = word.toUpperCase();
  var sum = 0;
  var bonus = 0;
  for (var key in this.points) {
    var count = 0;
    count += this.word.split(key).length - 1;
    sum += count * this.points[key];
  }

  if (this.word.length == 7) {
    bonus = 50;
  }
  sum += bonus;
  return sum;
};

Scrabble.prototype.highestScoreFrom = function(arrayOfWords) {

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

Scrabble.prototype.tieBreaker = function(word1, word2) {
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

my_game = new Scrabble();

var triedWords = ["ZQQQQJ", "QQQQQJ", "DOG"];
console.log(my_game.highestScoreFrom(triedWords));

console.log("========");

var triedWords = ["QQQQQJ", "GORILLA", "DOG"];
console.log(my_game.highestScoreFrom(triedWords));

console.log("========");

var triedWords = ["Hello", "world", "work", "please"];
console.log(my_game.highestScoreFrom(triedWords));

console.log("========");

var triedWords = ["QQQQJ", "QQQQQJ", "ZZQQQJ", "DOG"];
console.log(my_game.highestScoreFrom(triedWords));

module.exports = Scrabble;
