import React, { use } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { 
  pointerWithin, 
  MouseSensor, 
  TouchSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core"
import { useSelector,useDispatch } from "react-redux";
import { addBlockToSprite, selectSprite } from "./utils/spritesSlice";
import SpriteBar from "./components/SpriteBar";
import PlayBar from "./components/PlayBar";

export default function App() {
  
  const selectedSpriteId = useSelector(state=>state.sprites.selectedSpriteId)
  console.log(selectedSpriteId);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 6 },   // move ≥6 px to start drag
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 8 },
    })
  );

  const dispatch = useDispatch()

  function handleDragEnd({active,over}){
    if(!over || over.id !== 'mid-dropzone') return

    const blockData = active.data.current;
    if(!blockData)  return;

    dispatch(addBlockToSprite({
      spriteId:selectedSpriteId,
      block: blockData
    }))
  }

  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row  ">
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          <DndContext 
          collisionDetection={pointerWithin}
          onDragEnd={handleDragEnd}
           sensors={sensors}
          >
            <Sidebar /> 
            <MidArea />
           
          </DndContext>  
        </div>
        <div className="w-1/3 h-screen overflow-hidden flex flex-col bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          <div className="h-1/2" >
            <PreviewArea />
          </div>
          <div className="h-1/2">
             <PlayBar />
             <SpriteBar />
          </div>
          
        </div>
      </div>
    </div>
  );
}
