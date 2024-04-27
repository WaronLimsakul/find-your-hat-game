const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

//define class
class Field {
  constructor(field) {
    this.field = field;
  }
  print() {
    //use forEach to print each line separately
    this.field.forEach((row) => {
      console.log(row.join(" "));
    });
  }
  static generateField(x, y, holePercent) {
    let field = [];
    // generate clear field
    for (let i = 0; i < y; i++) {
      let row = [];
      for (let j = 0; j < x; j++) {
        row.push(fieldCharacter);
      }
      field.push(row);
    }
    // randomly generate holes
    const holesNumber = Math.floor((x * y * holePercent) / 100);
    console.log(`There will be ${holesNumber} holes`);
    for (let h = 0; h < holesNumber; h++) {
      let a = Math.floor(Math.random() * y);
      let b = Math.floor(Math.random() * x);
      field[a][b] = hole;
    }
    // randomly generate hat
    function addHat() {
      let a = Math.floor(Math.random() * y);
      let b = Math.floor(Math.random() * x);
      if (a !== 0 && b !== 0) {
        field[a][b] = hat;
      } else {
        addHat();
      }
    }
    addHat();

    // finally add path character
    field[0][0] = pathCharacter;

    return new Field(field);
  }
}

let x = prompt("how many roles do you want:");
let y = prompt("how many columsns do you want:");
let percent = 25;
const mainField = Field.generateField(x, y, percent);
mainField.print();

let position = [0, 0];
// one step of leaping
const walk = () => {
  const direction = prompt("choose walking direction: ");
  if (
    // check valid input
    !(
      direction === "u" ||
      direction === "d" ||
      direction === "l" ||
      direction === "r"
    )
  ) {
    console.log("please enter u / d / l / r");
    walk();
  } else {
    switch (
      direction // update position
    ) {
      case "u":
        position[0] -= 1;
        break;
      case "d":
        position[0] += 1;
        break;
      case "l":
        position[1] -= 1;
        break;
      case "r":
        position[1] += 1;
        break;
    }
    if (
      //check exceeding death
      position[0] < 0 ||
      position[0] > y ||
      position[1] < 0 ||
      position[1] > x
    ) {
      console.log("you die from attempting to move outside the field");
    } else if (mainField.field[position[0]][position[1]] === hole) {
      //check if the position is the hole
      console.log("you die from falling into the hole");
    } else if (mainField.field[position[0]][position[1]] === hat) {
      //check if the player win
      console.log("you win!!");
    } else {
      //normal update position
      mainField.field[position[0]][position[1]] = pathCharacter;
      mainField.print();
      walk();
    }
  }
};

walk();
