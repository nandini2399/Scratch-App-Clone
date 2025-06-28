import React from "react";
import CatSprite from "./sprites/CatSprite";
import { useSelector } from "react-redux";
import { spriteOptions } from "../utils/spriteOptions";

function Bubble({ text, type }) {
  const bubbleColor = type === "say" ? "bg-white" : "bg-gray-200";

  return (
    <div
      className={`absolute -top-9 left-1/2 -translate-x-1/2 
                  max-w-[160px] px-2 py-[2px] rounded shadow
                  text-xs text-black ${bubbleColor}`}
    >
      {text}
      {type === "say" ? (
        /* tiny triangle */
        <div className="absolute -bottom-1 left-4 w-0 h-0
                        border-t-[6px] border-t-white
                        border-x-[6px] border-x-transparent" />
      ) : (
        <>
          <div className="absolute -bottom-1 left-4 w-2 h-2 rounded-full bg-gray-200" />
          <div className="absolute -bottom-4 left-2 w-1.5 h-1.5 rounded-full bg-gray-200" />
        </>
      )}
    </div>
  );
}

export default function PreviewArea() {

  const sprites = useSelector((state)=>state.sprites.sprites);

  return (
    <div className="relative flex-none h-full overflow-y-auto p-2">
      {sprites.map((sp)=>(
        <Sprite key={sp.id} sprite={sp} />
      ))}
      {/* <CatSprite /> */}
    </div>
  );
}


const Sprite = ({sprite})=>{

  const {position, rotation, name,spId,looks} = sprite
  console.log("Preview"+spId)
  const spriteOption = spriteOptions.find((opt)=>opt.id===spId);
  return (
    <div
   
    style={{
      left: position.x,                      
      top:  position.y,                       
      transform: `translate(-50%, -50%) rotate(${rotation}deg)`
    }}
    className="
      absolute                   
      w-[20px] h-[40px]            
      bg-center bg-contain bg-no-repeat
      transition-[transform,left,top] duration-300 ease-linear
    "
  > {spriteOption.component}

    {looks.sayText && <Bubble text={looks.sayText} type="say" />}
    {!looks.sayText && looks.thinkText && (
          <Bubble text={looks.thinkText} type="think" />
    )}
  </div>
  )
}
