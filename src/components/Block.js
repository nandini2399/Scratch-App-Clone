import React from "react";
import { useDispatch } from "react-redux";
import { removeBlockFromSprite } from "../utils/spritesSlice";

const Block = ({b,spriteId}) =>{
    const dispatch = useDispatch()

    if(!b) return null;
    const handleRemoveBlock = ()=>{
      //console.log("Debug"+b.id)
      dispatch(removeBlockFromSprite({spriteId,blockId:b.id}))
    }

    switch (b.type) {
    case "move":
      return <div  
        className="mx-5 w-40 rounded flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        Move {b.value} steps
        <button onClick={()=>handleRemoveBlock()} className="ml-auto hover:bg-red-50">❌</button>
      </div>
    case "turn":
        return <div 
          className="mx-5 w-40 rounded flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
            Turn {b.value}°
             <button onClick={()=>handleRemoveBlock()} className="ml-auto  hover:bg-red-50">❌</button>
        </div>
    case "goto":
      return <div  
          className="mx-5 w-40 rounded flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
            Go to {b.x} ,{b.y}
             <button onClick={()=>handleRemoveBlock()} className="ml-auto  hover:bg-red-50">❌</button>
        </div>
    case "repeat":
      return <div  
          className="mx-5 w-40 rounded flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
            Repeat
             <button onClick={()=>handleRemoveBlock()} className="ml-auto hover:bg-red-50">❌</button>
        </div>
    case "say":
      return <div  
          className="mx-5 w-40 rounded flex flex-row flex-wrap bg-purple-400 text-white px-2 py-1 my-2 text-sm cursor-pointer">
            Say {b.text} {b.seconds} seconds
             <button onClick={()=>handleRemoveBlock()} className="ml-auto hover:bg-red-50">❌</button>
        </div>
    case "think":
      return <div  
            className="mx-5 w-40 rounded flex flex-row flex-wrap bg-purple-400 text-white px-2 py-1 my-2 text-sm cursor-pointer">
            Think {b.text} {b.seconds} seconds
             <button onClick={()=>handleRemoveBlock()} className="ml-auto hover:bg-red-50">❌</button>
        </div>
    default:
      return b.type;
  }

    // return(
    //     <div
    //       className={`mx-5 w-40 rounded flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer ${
    //         b.type === "move" ? "bg-sky-500 text-black" : "bg-amber-500 text-black"
    //       }`}
    //       >
    //       {b.type === "move" ? `Move ${b.value} steps` : `Turn ${b.value}°`}
    //     </div>
    // )
}

export default Block;