const fs = require("node:fs/promises");

function rand(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

function generateRandomSequence(amount, min, max) {
  let sequence = [];
  let generatedValues = {};

  for (let i = 0; i < amount; i++) {
    let unique = false;
    while (!unique) {
      let posibleUniqueRandomNumber = rand(min, max);
      unique = generatedValues[posibleUniqueRandomNumber] == undefined;
      if (unique) {
        generatedValues[posibleUniqueRandomNumber] = true;
        sequence.push(posibleUniqueRandomNumber);
      }
    }
  }
  return sequence;
}

async function generateFiles() {
  for (let c = 10; c <= 1000; c *= 10) {
    let tipicalCase = generateRandomSequence(c, 1, c * 10);
    let bestCase = tipicalCase.slice(0, tipicalCase.length).sort((a, b) => a - b);
    let worstCase = bestCase.slice(0, bestCase.length).reverse();

    try {
      let content = tipicalCase.join(',');
      await fs.writeFile(__dirname + "/data/tipicalCase:" + c + ".txt", content);

      content = bestCase.join(',');
      await fs.writeFile(__dirname + "/data/bestCase:" + c + ".txt", content);

      content = worstCase.join(',');
      await fs.writeFile(__dirname + "/data/worstCase:" + c + ".txt", content);


    } catch (error) {
      console.log(error);
    }
  }
}

generateFiles();
