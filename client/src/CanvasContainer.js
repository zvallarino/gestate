import CanvasGenerator from "./CanvasGenerator"
import { useState } from "react"

function CanvasContainer() {
  const [currentColor, setCurrentColor] = useState("pink") 
  const [currentWidth, setCurrentWidth] = useState(5) 
  const [superLongState, setSuperLongState] = useState([])
  const [eraseState,setEraseState] = useState(false)

  const handleColorChangeGreen = (e) => {
    setCurrentColor("green")
  }
  
  const handleColorChangeBlack = (e) => {
    setCurrentColor("black")
  }
  
  const handleColorChangeYellow = (e) => {
    setCurrentColor("yellow")
  }
  
  const handleColorChangeRed = (e) => {
    setCurrentColor("red")
  }
  
  
  const handleColorChangeErase = (e) => {
    setCurrentColor("white")
  }


  
  const handleSmallLine = (e) => {
    setCurrentWidth(1)
  }
  
  const handleMediumLine = (e) => {
    setCurrentWidth(5)
  }
  
  const handleLargeLine = (e) => {
    setCurrentWidth(10)
  }
  
  const handleExtraLargeLine = (e) => {
    setCurrentWidth(20)
  }
  
  const handleSuperLine = (e) => {
    setCurrentWidth(100)
  }

  const handleSuperErase = (e) => {
    setEraseState(true)
  }

  const handleSetIsDrawing = (e) => {
    setEraseState(false)
  }
 

  
  const saveIt = (arrayOfStrokeData) => {
   
    let exampleData = []
  
    for(let i=0;i<arrayOfStrokeData.length;i+=2){
    let stroke = {
      start_stroke: arrayOfStrokeData[i],
      line_path: arrayOfStrokeData[i+1],
      layer_id: 1
    }
    exampleData.push(stroke)
  }
    
  fetch("http://localhost:3000/strokes",{
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body:JSON.stringify({arrayOfStrokes: JSON.stringify(exampleData)})})
    .then((r)=> r.json())
    .then((data)=> {console.log(data)})
  
  
  window.location.reload() 
  }
  


  return (
  <>
      <button onClick ={handleSuperErase}>ERASE!</button>
      <button onClick ={handleSetIsDrawing}>Draw Again</button>
      <button onClick ={handleColorChangeBlack}>Black</button>
      <button onClick={handleColorChangeGreen}>Green</button>
      <button onClick={handleColorChangeYellow}>Yellow</button>
      <button onClick={handleColorChangeRed}>Red</button>
      <button onClick={handleColorChangeErase}>Erase</button>
      <button onClick={handleSmallLine}>Small</button>
      <button onClick={handleMediumLine}>Medium</button>
      <button onClick={handleLargeLine}>Large</button>
      <button onClick={handleExtraLargeLine}>Extra Large</button>
      <button onClick={handleSuperLine}>Super</button>
      <button onClick={(e)=>saveIt(superLongState)}>Save</button>
    <CanvasGenerator setEraseState ={setEraseState} eraseState ={eraseState} currentColor={currentColor} currentWidth={currentWidth} setSuperLongState={setSuperLongState} superLongState={superLongState}/>;
  </>)
}

export default CanvasContainer;
