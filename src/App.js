import React, {useEffect, useState} from 'react';
import './App.css';

const width = 25;
const height = 40;

const checkConditionsAndReturnCounter = (x, y, array) => {
  let counter = 0;

  let top = x - 1 < 0;
  let left = y - 1 < 0;
  let bottom = x + 1 > array.length - 1;
  let right = y + 1 > array[0].length - 1;

  if (!top && !left && array[x-1][y-1] === 1) {
    counter += 1;
  }

  if (!top && array[x-1][y] === 1) {
    counter += 1;
  }


  if (!top && !right && array[x-1][y+1] === 1) {
    counter += 1;
  }

  // --------------------------------------
  if (!left && array[x][y-1] === 1) {
    counter += 1;
  }


  if (!right && array[x][y+1] === 1) {
    counter += 1;
  }
  // -----------------------------------
  if (!bottom && !left && array[x+1][y-1] === 1) {
    counter += 1;
  }

  if (!bottom && array[x+1][y] === 1) {
    counter += 1;
  }

  if (!bottom && !right && array[x+1][y+1] === 1) {
    counter += 1;
  }
  return counter;
}

const fulfillArray = () => {
  const field = new Array(width);
  for (let i = 0; i < width; i++) {
    field[i] = new Array(height);
  }
  const array = field.map((column, index) => {
    let arr = [];
    for (let i = 0; i < column.length; i++) {
      arr.push(0)
    }
    return arr;
  });
  return array;
};


function App() {

  const [array, setArray] = useState(fulfillArray());
  const [start, setStart] = useState(false);

  const handleClick = ({target}) => {
    const x = target.getAttribute('data-x');
    const y = target.getAttribute('data-y');
    const newArr = JSON.parse(JSON.stringify(array));
    newArr[x][y] = +!newArr[x][y];
    setArray(newArr);
  };


  const run = () => {
    const newArr = JSON.parse(JSON.stringify(array));
    array.forEach((row, x) => {
      row.forEach((cell, y) => {
        if (cell === 1) {
          if (shouldBeKilled(x, y)) {
            newArr[x][y] = 0;
          }
        }
        if (cell === 0) {
          if (shouldStayAlive(x, y)) {
            newArr[x][y] = 1;
          }
        }
      })
    });
    setArray(newArr);
  };


  useEffect(() => {
    if (start) {
      const interval = setInterval(() => run(), 20);
      return () => {
        clearInterval(interval)
      }
    }
  }, [start, array]);


  const shouldBeKilled = (x, y) => {
    return checkConditionsAndReturnCounter(x, y, array) < 2 || checkConditionsAndReturnCounter(x, y, array) > 3;
  };

  const shouldStayAlive = (x, y) => {
    return checkConditionsAndReturnCounter(x, y, array) === 3;
  };

  return (
    <div className="App">
      <h1 style={{textAlign: 'center'}}>Game Of Life</h1>
      <div style={{textAlign: 'center', width: '1000'}}>
        {array.map((row, x) => (
            <div> {row.map((column, y) => <span data-x={x} data-y={y} onClick={handleClick} className={column ? "square-black" : "square-white"}/>)} </div>
          ))}
      </div>
      <button style={{textAlign: 'center'}} onClick={() => setStart(!start)}>{!start ? "START" : "STOP"}</button>
    </div>
  );
}

export default App;
