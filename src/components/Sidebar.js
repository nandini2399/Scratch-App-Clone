import React, { useState } from "react";
import Icon from "./Icon";
import TemplateBlock from "./TemplateBlock";


export default function Sidebar() {
  
  return (
      <div className="w-60 flex-none h-full flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold"> {"Events"} </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When "}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {"clicked"}
      </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When this sprite clicked"}
      </div>
      <div className="font-bold"> {"Motion"} </div>
      <TemplateBlock
        id="move-template"
        baseData={{ type: "move", value: 10 }}
        inputs={[{ key: "value", type: "number", width: 50 }]}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        renderLabel={(v) => <>Move</>}
      />
      <TemplateBlock
        id="turn-template"
        baseData={{ type: "turn", value: 15 }}
        inputs={[{ key: "value", type: "number", width: 50 }]}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        renderLabel={(v) => (
          <>
            Turn <Icon name="undo" size={14} className="mx-1" />
          </>
        )}
      />

       <TemplateBlock
        id="goto-template"
        baseData={{ type: "goto", x: 0, y: 0 }}
        inputs={[
          { key: "x", type: "number", width: 50 },
          { key: "y", type: "number", width: 50 },
        ]}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        renderLabel={() => <>Go&nbsp;to</>}
      />

      <TemplateBlock
        id="repeat-template"
        baseData={{ type: "repeat" }}
        inputs={[]}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        renderLabel={() => <>Repeat 🔁</>}
      />

      <h3 className="font-bold mt-4">Looks</h3>

       <TemplateBlock
        id="say-template"
        baseData={{ type: "say", text: "Hi!", seconds: 2 }}
        inputs={[
          { key: "text", type: "text", width: 100 },
          { key: "seconds", type: "number", width: 50 },
        ]}
        className="bg-purple-400 text-white"
        renderLabel={() => <>Say</>}
        suffix={() => <> seconds</>}
      />

      <TemplateBlock
        id="think-template"
        baseData={{ type: "think", text: "Hmm…", seconds: 2 }}
        inputs={[
          { key: "text", type: "text", width: 100 },
          { key: "seconds", type: "number", width: 50 },
        ]}
        className="bg-purple-400 text-white"
        renderLabel={() => <>Think</>}
        suffix={() => <> seconds</>}
      />
      
      {/* <DraggableBlock
        data={{id:'turn15', type:"turn",value:15}}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        >
        Turn
        <Icon name="undo" size={15} className="text-white mx-2" />
        <input className="mx-2 w-12 h-6 p-2 border-black border-2" type={Number} /> degrees
      </DraggableBlock>
      
      <DraggableBlock
        data={{id:'goto',type:"goto",value:25}}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        >
        Go to
        <input className="mx-2 w-12 h-6 p-2 border-black border-2" type={Number} /> x
         <input className="mx-2 w-12 h-6 p-2 border-black border-2" type={Number} /> y
      </DraggableBlock>

      <div className="font-bold"> {"Looks"} </div>
      <DraggableBlock
        data={{id:'say',type:"say",sayText:"Hi",seconds:2}}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        >
        Say
        <input className="mx-2 w-24 h-6 p-2 py-1 border-black border-2" type={Text} /> for
         <input className="mx-2 w-12 h-6 p-2 border-black border-2" type={Number} /> seconds
      </DraggableBlock>

      <DraggableBlock
        data={{id:'think',type:"think",thinkText:"Hi",seconds:2}}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        >
        Think 
        <input className="mx-2 w-24 h-6 p-2 py-1 border-black border-2" type={Text} /> for
         <input className="mx-2 w-12 h-6 p-2 border-black border-2" type={Number} /> seconds
      </DraggableBlock> */}
    </div>
  
    
  );
}
