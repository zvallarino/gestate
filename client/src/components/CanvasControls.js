import { useState, useEffect } from "react";
import ToolBarDetail from "./ToolBarDetail"
import { NavLink } from 'react-router-dom'


function CanvasControls({setCurrentColor, setCurrentWidth, setSuperLongState, setEraseState, superLongState}) {

    const [toolbarDetailUnambiguous, setToolbarDetailUnambiguous] = useState("")

    const handleColorChangeGreen = (e) => {
    setCurrentColor("green");
    };

    const handleColorChangeBlack = (e) => {
    setCurrentColor("black");
    };

    const handleColorChangeYellow = (e) => {
    setCurrentColor("yellow");
    };

    const handleColorChangeRed = (e) => {
    setCurrentColor("red");
    };

    const handleColorChangeErase = (e) => {
    setCurrentColor("white");
    };






    const saveIt = (arrayOfStrokeData) => {

        let exampleData = []
        for(let i=0;i<arrayOfStrokeData.length;i+=2){
        let split = arrayOfStrokeData[i].split(",")
        let stroke = {
        start_stroke: arrayOfStrokeData[i],
        line_path: arrayOfStrokeData[i+1],
        drawing_id:split[5],
        layer_id:split[6]
        };

        exampleData.push(stroke);
        }
    
        fetch(
            "http://localhost:3000/strokes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ arrayOfStrokes: JSON.stringify(exampleData) }),
        }
        )
        .then(
            (r) => r.json()
            )
        .then(
            (data) => {console.log(data);}
        );
    }

    const handleColorChoice = () => {
        setToolbarDetailUnambiguous("color-wheel")
        setEraseState(false)
        console.log(toolbarDetailUnambiguous)
    }

    const handleLineChoice = () => {
        setToolbarDetailUnambiguous("line")
        setEraseState(false)
        console.log(toolbarDetailUnambiguous)
    }

    const handleEraseChoice = () => {
        setToolbarDetailUnambiguous("erase")
        setEraseState(true)
        console.log(toolbarDetailUnambiguous)
    }

    return (
        <>
        <NavLink to="/dashboard">Back to Dashboard</NavLink>
        <button id="color-wheel-button" onClick={handleColorChoice}>Choose Color</button> 
        <button id="draw-button" onClick={handleLineChoice}>Draw</button> 
        <button id="erase-button"  onClick={handleEraseChoice}>Erase</button> 
        {/* <LineSelection setCurrentWidth={setCurrentWidth} setEraseState={setEraseState} onclick={handleLineChoice}/>
        <EraserSelection setCurrentWidth={setCurrentWidth} setEraseState={setEraseState}/>
        <ColorSelection setCurrentColor={setCurrentColor}/> */}
      <button className = "buttonInControls" onClick={(e)=>saveIt(superLongState)}>Save</button>
      {toolbarDetailUnambiguous ? <ToolBarDetail toolbarDetailUnambiguous={toolbarDetailUnambiguous} setCurrentColor={setCurrentColor} setEraseState={setEraseState} setCurrentWidth={setCurrentWidth} setToolbarDetailUnambiguous={setToolbarDetailUnambiguous}/> : null}
      {/* <button className = "buttonInControls" onClick={handleColorChangeBlack}>Black</button>
      <button className = "buttonInControls" onClick={handleColorChangeGreen}>Green</button>
      <button className = "buttonInControls" onClick={handleColorChangeYellow}>Yellow</button>
      <button className = "buttonInControls" onClick={handleColorChangeRed}>Red</button>
      <button className = "buttonInControls" onClick={handleColorChangeErase}>Erase</button> */}
      </>
    )
}

export default CanvasControls