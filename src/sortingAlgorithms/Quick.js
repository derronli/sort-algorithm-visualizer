let animations = [];
export function getQuickSortAnimations(arr) {

    animations = []; 
    //Can't use original arr bc we need original indices
    let array = arr.slice(0)
    quickSort(array, 0, array.length - 1);
    return animations;

}

function quickSort(arr, left, right) {
    if (left >= right) {
        return;
    }

    let pivot = arr[Math.floor((left + right) / 2)];
    let index = Partition(arr, left, right, pivot);
    quickSort(arr, left, index - 1);
    quickSort(arr, index, right);
}
function Partition(arr, left, right, pivot) {
    while (left <= right) {
        while (arr[left] < pivot) {
            left++;
        }
        while (arr[right] > pivot) {
            right--;
        }
        if (left <= right) {
            var temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            animations.push([left, right])
            left++;
            right--;
            
        }
    
    }
    return left;
}
