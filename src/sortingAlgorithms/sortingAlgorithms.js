//Individual Sort Implementations
//Each function will sort the array and keep track of the actions performed by pushing to animations array

//==========================================================
//Merge Sort
export function getMergeSortAnimations(arr) {
    const animations = [];
    if (arr.length <= 1) return arr;
    const auxiliaryArray = arr.slice();
    mergeSortHelper(arr, 0, arr.length - 1, auxiliaryArray, animations);
    return animations;
}
  
function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}
  
function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      animations.push([i, j]);
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
}

// ================================================ 
// Bubble Sort

export function getBubbleSortAnimations(array) {
    let arr = array.slice();
    let sorted = false;
    let animations = [];
    while (!sorted){
      sorted = true;
      for (var i = 0; i < (arr.length -1); i++){
        if (arr[i] > arr[i+1]){
          var temp = arr[i];
          arr[i] = arr[i+1];
          arr[i+1] = temp;
          sorted = false;
          animations.push([i, i +1]);
        }
      }
    }
    return animations;
}

// =============================================================
// Quick Sort (different file)

