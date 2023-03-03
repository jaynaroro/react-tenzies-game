import { useState, useEffect } from 'react'
import Die from './Components/Die'
import './App.css'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App() {

  //Tenzies State, this will help us know if the user has won or not.
  const [dieArray, setDieArray ] = useState(allNewDice() )
  const [tenzies, setTenzies] =useState(false)

  //how to win the game.
  //first lets keep track of any time the dieArray Changes.
useEffect(()=>{
  const allHeld =dieArray.every(die => die.isHeld) //this will return a boolean
  const firstValue = dieArray[0].value
  const allSame = dieArray.every(die => die.value === firstValue) // also return a boolean
  if(allHeld && allSame)
  {
    setTenzies(true)
  }
}, [dieArray])

  //avoid repetitive code with this helper function that generates a new Die(Singular)
  function generateNewDie(){
    return {id: nanoid(),
    value: Math.ceil((Math.random() * 6)),
    isHeld: false}
  }

  function allNewDice(){
    const newDice = []
    for(let i = 0; i < 10; i++)
    {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  //state to hold the allnewDice Array.



//map over the state Array to display each value of the array as a die cast.
const diceElements = dieArray.map(die=>
  <Die
      key={die.id}
      isHeld={die.isHeld}
      number={die.value}
      holddice={()=>holdDice(die.id)}/>
)


//function to handle dice roll
function rollDice(){
    setDieArray(oldDice => oldDice.map(die => {
      return die.isHeld ? die : generateNewDie()
     }))
}



//hold dice function 
function holdDice(id){
  setDieArray(oldDie => oldDie.map(die => {
    return die.id === id?
    {...die, isHeld: !die.isHeld}:
    die
  }))
}

function newGame(){
  setTenzies(false)
  setDieArray(allNewDice())
}

const button1 = <button onClick={rollDice} className='roll-dice'> Roll </button>

const button2 = <button onClick={newGame} className='roll-dice'> New Game </button>


  return (
    <div className="App">
      {tenzies && <Confetti />}
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>Roll untill all the dice are the same. Click each die to freeze it at its current value between rolls.</p>

      <div className='die-container'>
        {diceElements}
      </div>
      {tenzies ? button2 : button1}
    </div>
  )
}

