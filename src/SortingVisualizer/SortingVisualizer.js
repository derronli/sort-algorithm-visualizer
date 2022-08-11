import React from 'react';
import {getMergeSortAnimations, getBubbleSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import { getQuickSortAnimations } from '../sortingAlgorithms/Quick.js';
import './SortingVisualizer.css';

const ANIMATION_SPEED_MS = 8;
const NUMBER_OF_ARRAY_BARS = 80;
const NORMAL_COLOR = 'orange';
const CHANGED_COLOR = 'blue';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      arr: [],
      changed: [],
      delay: 80 //Changes speed of animations
    };
  }
  // Generates bars on page load
  componentDidMount() {
    this.resetArray();
  }

  // Generates bars
  resetArray() {
    const arr = [];
    const changed = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      //Determines height of bars
      arr.push(randomIntFromInterval(5, 450));
    }
    this.setState({arr, changed});
  }

  //Handles merge sort animations
  mergeSort() {
    const animations = getMergeSortAnimations(this.state.arr);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? CHANGED_COLOR : NORMAL_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  //Handles quick and bubble sort animations
  //Animations is an array of swaps which occured to sort the array:
  //ie. [ [1,5], [4,2] ] index 1 and 5 were swapped first
  async sortArray(algorithm){

    let animations = algorithm(this.state.arr); //calls specific sort function
    let arr = this.state.arr;
    let changed = this.state.changed;
    //Iterates through each swap
    for (let index = 0; index < animations.length; index++) {
        const [i,j] = animations[index];
        
        let temp = arr[i]; //Makes the swap in array on screen (bar animation)
        arr[i] = arr[j];
        arr[j] = temp;
        
        changed.push(i,j); //Stores previously swapped indices

        if(index == animations.length - 1){
            changed.push(arr.length + 1, arr.length + 1);
            this.setState({changed});
        }

        this.setState({ arr,changed });
        await sleep(this.state.delay);
    }
  }

  getColor(index){

    let changed = this.state.changed;

    if(changed.includes(index)){
      if(index == changed[changed.length - 1] || index == changed[changed.length - 2]){
          return CHANGED_COLOR; //Returns secondary color if the indices need to be swapped and are most recent (so old indices return to original color)
      }
    }
    else{
        return NORMAL_COLOR;
    }
    
  }


  render() {
    const {arr} = this.state;

    return (
      <div className="array-container">
        {arr.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: this.getColor(idx),
              height: `${value}px`,
            }}></div>
        ))}
        <div className="center">
          <button onClick={() => this.resetArray()}>Generate New Array</button>
          <button onClick={() => this.mergeSort()}>Merge Sort</button>
          <button onClick={() => this.sortArray(getQuickSortAnimations)}>Quick Sort</button>
          <button onClick={() => this.sortArray(getBubbleSortAnimations)}>Bubble Sort</button>
        </div>
      </div>
    );
  }
}

// Helper functions
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
} 