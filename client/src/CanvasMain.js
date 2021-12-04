import { useEffect, useRef, useState } from 'react'

function CanvasMain() {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const contextColor = useRef("red")
  const contextLineWidth = useRef(20)
  const contextLineCap = useRef("round")
  const contextBackgroundcolor = useRef("#d4fff6")

    
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(()=>{
    const canvas = canvasRef.current
    canvas.style.backgroundColor = contextBackgroundcolor.current
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`

    const ctx = canvas.getContext("2d")
    ctx.scale(2,2)
    ctx.lineCap = contextLineCap.current
    ctx.strokeStyle = contextColor.current
    ctx.lineWidth = contextLineWidth.current
    contextRef.current = ctx;

  },[])

  let fullStrokeStart = [] 
  let fullStrokeDraw = [] 
  let fullStrokeEnd = []

  const startPath = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    // console.log(`This comes first: ${offsetX},${offsetY}`)
    fullStrokeStart.push(offsetX, offsetY)
    setIsDrawing(true)
    console.log(fullStrokeStart.join(","))
  }
  
  const drawPath = ({nativeEvent}) => {
    if(!isDrawing){
      return
    }
  const {offsetX, offsetY} = nativeEvent; 
  contextRef.current.lineTo(offsetX, offsetY)
  // console.log(`This comes second: ${offsetX},${offsetY}`)
  fullStrokeDraw.push(offsetX, offsetY)
  contextRef.current.stroke()
  }

  const finishPath = ({nativeEvent}) => {
    contextRef.current.closePath()
    const {offsetX, offsetY} = nativeEvent; 
    // console.log(`This comes third: ${offsetX},${offsetY}`)
    fullStrokeEnd.push(offsetX, offsetY)
    setIsDrawing(false)
    console.log(fullStrokeDraw.join(","))
    console.log(fullStrokeEnd.join(","))
  }
  
  const redraw = (fullStrokeStart, fullStrokeMiddle, fullStrokeEnd) => {

    
    const ctx = canvas.getContext("2d")
    ctx.scale(2,2)
    ctx.lineCap = contextLineCap.current
    ctx.strokeStyle = contextColor.current
    ctx.lineWidth = contextLineWidth.current
    contextRef.current = ctx;

    const startPathRedraw = (fullStrokeStart) => {
      let splitString = fullStrokeStart.split(", ")
      contextRef.current.beginPath()
      contextRef.current.moveTo(parseInt(splitString[0]), parseInt(splitString[1]))
      setIsDrawing(true)
    }
    
    const drawPathRedraw = (fullStrokeMiddle) => {
      if(!isDrawing){
        return
      }
      let split = fullStrokeMiddle.split(", ")
      for (let i = 0; i < split.length; i += 2) {
        contextRef.current.lineTo(split[i], split[i+1])
        contextRef.current.stroke()
      }      
    }
  
    const finishPathRedraw = (fullStrokeEnd) => {
      contextRef.current.closePath()
      setIsDrawing(false)
    }

    startPathRedraw(fullStrokeStart) 
    drawPathRedraw(fullStrokeMiddle)
    finishPathRedraw(fullStrokeEnd)
  }

  redraw("279,109", "279,110,279,112,278,113,277,114,276,115,272,121,271,122,269,125,268,126,267,129,266,129,264,131,264,131,261,135,260,136,259,137,259,137,255,140,254,142,252,144,251,146,250,148,249,149,247,151,246,151,244,154,244,154,241,157,241,157,239,160,238,160,234,165,233,166,233,166,233,167,233,167,233,168,232,169,232,169,231,170,230,171,230,172,230,173,229,174,229,174,229,175,228,176,228,177,228,177,227,178,227,180,227,180,225,182,224,183,224,185,224,186,222,188,221,188,221,190,220,191,219,191,219,193,220,194,221,194,221,195,222,197,223,197,224,198,227,203,227,205,231,210,232,211,234,214,235,216,237,219,239,221,240,224,241,226,244,228,244,229,252,235,253,236,256,237,257,238,263,243,264,243,268,249,269,249,275,257,276,258,279,261,279,262,281,266,282,267,284,269,285,270,288,274,290,277,292,281,293,283,294,285,295,286,299,291,300,293,301,295,301,296,301,297,301,296,303,295,303,294,311,286,313,285,319,282,321,281,328,278,330,277,337,274,338,274,340,272,341,271,344,269,344,269,348,266,350,264,352,262,353,261,355,258,356,257,359,251,360,251,361,249,362,249,364,246,364,246,366,242,367,240,370,237,370,236,373,231,374,231,379,225,379,224,382,220,383,220,384,217,384,217,386,215,387,214,388,211,389,210,390,207,391,207,392,206,392,206,392,205,391,203,390,202,384,195,383,194,381,193,377,189,376,189,373,185,372,185,370,184,369,182,368,181,366,180,366,179,362,176,361,175,359,173,359,172,356,171,356,170,353,168,352,167,349,164,348,163,346,161,345,160,341,157,341,157,338,153,337,153,335,150,334,149,327,143,327,143,324,140,323,140,319,137,319,136,317,134,316,134,315,131,314,131,310,129,310,128,308,126,307,126,306,124,305,124,304,123,304,123,301,121,301,120,299,119,298,118,295,115,294,114,292,113,291,112,289,111,289,110,287,109,287,109,286,109,285,109,284,109", "284,109")
  

 
  return (
   <canvas
    onMouseDown = {startPath}
    onMouseUp = {finishPath}
    onMouseMove = {drawPath}
    ref = {canvasRef}
    className = "canvasMain"

    />
  );
}

export default CanvasMain;
