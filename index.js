const fs = require("node:fs/promises");

const COMPARATION_COST = 1;
const SWAP_COST = 2;


const table = {};

async function test() {
  try {
    let dataString = await fs.readFile(__dirname + '/data/tipicalCase:10.txt', 'utf8');
    let data = dataString.split(',');
    let totalTime = shakerSort(data);



  } catch (error) {
    console.log(error);
  }
}

test();


function swap(arr, i, j) {
  let aux = arr[i];
  arr[i] = arr[j];
  arr[j] = aux;
}

function shakerSort(arr) {
  let tt = 0;
  let left = 1;
  let rigth = arr.length - 1;
  let k = arr.length - 1;

  console.log(arr);

  while (left < rigth) {
    for (let i = rigth; i >= left; i--) {
      tt += COMPARATION_COST;
      if (arr[i - 1] > arr[i]) {
        swap(arr, i - 1, i);
        tt += SWAP_COST;
      }
    }
    left = k;
    for (let i = left; i <= rigth; i++) {
      if (arr[i - 1] > arr[i]) {
        swap(arr, i - 1, i);
        k = i;
      }
    }
    rigth = k;
  }
  console.log(arr);
}

function bubleSort(arr) {
  let tt = 0;
  for (let i = 1; i < arr.length; i++) {
    for (let j = arr.length - 1; j >= i; j--) {
      tt += COMPARATION_COST;
      if (arr[j - 1] > arr[j]) {
        swap(arr, j - 1, j);
        tt += SWAP_COST;
      }
    }
  }
  return tt;
}

function shellSort(arr) {
  let tt = 0;
  let interval = Math.floor(arr.length);
  while (interval > 0) {
    let sw = false;
    for (let i = 0; i + interval < arr.length; i++) {
      let j = i + interval;
      let a = arr[i];
      let b = arr[j];
      tt += COMPARATION_COST;
      if (a > b) {
        swap(arr, i, j);
        tt += SWAP_COST;
        sw = true;
      }
    }
    tt += COMPARATION_COST;
    if (!sw || (sw && interval > 1)) {
      interval = Math.floor(interval / 2);
    }
  }
  return tt;
}


function insertionMethod(arr) {
  let tt = 0;
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (arr[j] < arr[j - 1]) {
      tt += COMPARATION_COST;
      let aux = arr[j - 1];
      arr[j - 1] = arr[j];
      arr[j] = aux;
      tt += SWAP_COST;
      j -= 1;
    }
  }
  return tt;
}
