const fs = require("node:fs/promises");

const COMPARATION_COST = 1;
const SWAP_COST = 2;

let sortingAlgoritms = [
insertionMethod,
shellSort,
bubleSort,
shakerSort,
quickSort,
selectionSort
];

let files = [
__dirname + '/data/tipicalCase:10.txt',
__dirname + '/data/bestCase:10.txt',
__dirname + '/data/worstCase:10.txt',

__dirname + '/data/tipicalCase:100.txt',
__dirname + '/data/bestCase:100.txt',
__dirname + '/data/worstCase:100.txt',

__dirname + '/data/tipicalCase:1000.txt',
__dirname + '/data/bestCase:1000.txt',
__dirname + '/data/worstCase:1000.txt',
]

test();

async function test() {
	let table = {};
  try {
	  for(let i = 0; i < files.length; i++){
		let dataString = await fs.readFile(files[i], 'utf8');
    		let dataArr = dataString.split(',');

		  for(let j = 0; j < sortingAlgoritms;j++){
			  let tt = sortingAlgoritms[j](dataArr); 
		  }



	}}
	catch (error) {
		console.log(error);
	}
}



function swap(arr, i, j) {
  let aux = arr[i];
  arr[i] = arr[j];
  arr[j] = aux;
}


function selectionSort(arr){
	console.log(arr);
	let tt = 0;
	for(let i =  0; i < arr.length -1; i++){
		let minor = i;

		for(let j = i +1; j < arr.length; j++){
			tt += COMPARATION_COST;
			if(arr[j] < arr[minor]){
				minor = j;
			}
		}

		tt += COMPARATION_COST;
		if(minor != i){
			tt += SWAP_COST;
			swap(arr,i,minor);
		}

	}
	console.log(arr);

}


// quicksort partition
function partition(arr, low, high)
{
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    return i + 1;
}


function quickSort(arr,low = 0,high = 'na'){
	if(high == 'na'){
		high = arr.length;
	}

    if (low < high) {
        let pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
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
