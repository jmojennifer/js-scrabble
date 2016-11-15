var Scrabble = function(word) {
  this.word = word.toUpperCase();

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

Scrabble.prototype.score = function() {
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

my_game = new Scrabble("hello");
console.log(my_game.score());


module.exports = Scrabble;
