import React from "react";
import { useDroppable } from "@dnd-kit/core";
import Block from "./Block";
import { useSelector } from "react-redux";

export default function MidArea({blocks}) {

  const { setNodeRef, isOver } = useDroppable({ id: "mid-dropzone" });

  const selectedSpriteId = useSelector(state =>state.sprites.selectedSpriteId);


  const selectedSprite = useSelector(state =>
    state.sprites.sprites.find(s => s.id === selectedSpriteId)
  )
    console.log(selectedSprite)
  
  return (
  <div ref={setNodeRef}
  className={`flex-1 h-full overflow-auto ${isOver?"bg-green-50":""}`}>
    {selectedSprite.blocks.map((b) => (
        <Block key={b.id} b={b} spriteId={selectedSprite.id}/>
      ))}
  </div>
  )
}
