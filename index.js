const fs = require("node:fs/promises");

const COMPARATION_COST = 1;
const SWAP_COST = 2;

let sortingAlgoritms = {
  "Insertion Method": insertionMethod,
  "Shell Sort": shellSort,
  "Buble Sort": bubleSort,
  "Shaker Sort": shakerSort,
  "Quick Sort": quickSort,
  "Selection Sort": selectionSort
};

let files = [];
for (let c = 10; c <= 1000; c *= 10) {
  files.push("tipicalCase:" + c);
  files.push("bestCase:" + c);
  files.push("worstCase:" + c);
}

test();
async function test() {
  let table = {};
  let algoritms = Object.entries(sortingAlgoritms);

  for (let i = 0; i < algoritms.length; i++) {
    const name = algoritms[i][0];
    let func = algoritms[i][1];
    let currentAlgoritmData = {};
    try {
      for (let i = 0; i < files.length; i++) {
        let dataString = await fs.readFile(__dirname + "/data/" + files[i] + ".txt", 'utf8');
        let dataArr = dataString.split(',');
        currentAlgoritmData[files[i]] = func(dataArr);
      }
    }
    catch (error) {
      console.log(error);
    }
    table[name] = currentAlgoritmData;

  }
  console.table(table);
}



function swap(arr, i, j) {
  let aux = arr[i];
  arr[i] = arr[j];
  arr[j] = aux;
}


function selectionSort(arr) {
  let tt = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    tt += COMPARATION_COST;
    let minor = i;

    for (let j = i + 1; j < arr.length; j++) {
      tt += COMPARATION_COST;

      tt += COMPARATION_COST;
      if (arr[j] < arr[minor]) {
        minor = j;
      }
    }

    tt += COMPARATION_COST;
    if (minor != i) {
      swap(arr, i, minor);
      tt += SWAP_COST;
    }

  }
  return tt;
}


// quicksort partition
function partition(arr, low, high, counter) {
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j <= high - 1; j++) {
    counter.tt += COMPARATION_COST;

    counter.tt += COMPARATION_COST;
    if (arr[j] < pivot) {
      i++;
      swap(arr, i, j);
      counter.tt += SWAP_COST;
    }
  }
  swap(arr, i + 1, high);
  counter.tt += SWAP_COST;
  return i + 1;
}


function quickSort(arr, low = 0, high = 'na') {
  let ttCounter = {
    tt: 0,
  };
  if (high == 'na') {
    high = arr.length;
  }

  ttCounter.tt += COMPARATION_COST;
  if (low < high) {
    let pi = partition(arr, low, high, ttCounter);
    ttCounter.tt += quickSort(arr, low, pi - 1);
    ttCounter.tt += quickSort(arr, pi + 1, high);
  }

  return ttCounter.tt;
}

function shakerSort(arr) {
  let tt = 0;
  let left = 1;
  let rigth = arr.length - 1;
  let k = arr.length - 1;


  while (left < rigth) {
    tt += COMPARATION_COST;
    for (let i = rigth; i >= left; i--) {
      tt += COMPARATION_COST;
      tt += COMPARATION_COST;
      if (arr[i - 1] > arr[i]) {
        swap(arr, i - 1, i);
        tt += SWAP_COST;
      }
    }
    left = k;
    for (let i = left; i <= rigth; i++) {
      tt += COMPARATION_COST;
      tt += COMPARATION_COST;
      if (arr[i - 1] > arr[i]) {
        swap(arr, i - 1, i);
        tt += SWAP_COST;
        k = i;
      }
    }
    rigth = k;
  }
  return tt;
}

function bubleSort(arr) {
  let tt = 0;
  for (let i = 1; i < arr.length; i++) {
    tt += COMPARATION_COST;
    for (let j = arr.length - 1; j >= i; j--) {
      tt += COMPARATION_COST;
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
    tt += COMPARATION_COST;
    let sw = false;
    for (let i = 0; i + interval < arr.length; i++) {
      tt += COMPARATION_COST;
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
    tt += COMPARATION_COST;
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
