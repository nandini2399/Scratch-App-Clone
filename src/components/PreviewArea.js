import React from "react";
import CatSprite from "./sprites/CatSprite";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { spriteOptions } from "../utils/spriteOptions";
import { updateSpritePosition } from "../utils/spritesSlice";

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
    <div className="relative flex-none h-full overflow-auto p-2">
      <div className="relative" style={{ 
        width: '100%', 
        height: '100%',
        minWidth: '600px', 
        minHeight: '400px'
      }}></div>
      <ScrollAreaExpander sprites={sprites} />
      {sprites.map((sp)=>(
        <Sprite key={sp.id} sprite={sp} />
      ))}
      {/* <CatSprite /> */}
    </div>
  );
}

const ScrollAreaExpander = ({ sprites }) => {
  const bounds = sprites.reduce((acc, sprite) => {
    const x = sprite.position.x + 50; // Add padding
    const y = sprite.position.y + 50;
    
    return {
      maxX: Math.max(acc.maxX, x),
      maxY: Math.max(acc.maxY, y)
    };
  }, { maxX: 600, maxY: 400 }); 
  
  return (
    <div 
      className="absolute pointer-events-none" 
      style={{ 
        width: `${bounds.maxX}px`, 
        height: `${bounds.maxY}px`,
        left: 0,
        top: 0
      }} 
    />
  );
};


const Sprite = ({sprite})=>{

  const {position, rotation, name,spId,looks} = sprite
  const dispatch = useDispatch()
  const dragData = useRef(null);
  const containerRef = useRef(null);
  //console.log("Preview"+spId)
  const spriteOption = spriteOptions.find((opt)=>opt.id===spId);

  const onPointerDown = (e) => {
    e.target.setPointerCapture(e.pointerId);
    const container = containerRef.current.closest('.relative');
    const { left, top } = container.getBoundingClientRect();
    dragData.current = {
      offsetX: e.clientX - left - position.x,
      offsetY: e.clientY - top - position.y,
    };
  };

  const onPointerMove = (e) => {
    if (!dragData.current) return;
    const container = containerRef.current.closest('.relative');
    const { left, top } = container.getBoundingClientRect();
    const x = Math.max(0, e.clientX - left - dragData.current.offsetX);
    const y = Math.max(0, e.clientY - top - dragData.current.offsetY);

    dispatch(updateSpritePosition({ spriteId: sprite.id, position: { x, y } }));
  };

  const onPointerUp = (e) => {
    if (dragData.current) {
      dragData.current = null;
      e.target.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div
    ref={containerRef}
    style={{
      left: position.x,                      
      top:  position.y,                       
      transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      cursor:"grab"
    }}
    className="
      absolute                   
      w-[20px] h-[40px]            
      bg-center bg-contain bg-no-repeat
      transition-[transform,left,top] duration-300 ease-linear
      touch-none select-none
    "    
    onPointerDown={onPointerDown}
    onPointerMove={onPointerMove}
    onPointerUp={onPointerUp}
  > {spriteOption.component}

    {looks.sayText && <Bubble text={looks.sayText} type="say" />}
    {!looks.sayText && looks.thinkText && (
          <Bubble text={looks.thinkText} type="think" />
    )}
  </div>
  )
}
