import React, { useState } from "react";
import Icon from "./Icon";
import TemplateBlock from "./TemplateBlock";


export default function Sidebar() {
  
  return (
      <div className="w-60 flex-none h-full flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold"> {"Events"} </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When "}
       ▶️
        {"clicked"}
      </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When this sprite clicked"}
      </div>
      <div className="font-bold"> {"Motion"} </div>
      <TemplateBlock
        id="move-template"
        baseData={{ type: "move", value: 20 }}
        inputs={[{ key: "value", type: "text", width: 50 }]}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        renderLabel={(v) => <>Move</>}
      />
      <TemplateBlock
        id="turn-template"
        baseData={{ type: "turn", value: 90 }}
        inputs={[{ key: "value", type: "text", width: 50 }]}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        renderLabel={(v) => (
          <>
            Turn
          </>
        )}
      />

       <TemplateBlock
        id="goto-template"
        baseData={{ type: "goto", x: 80, y: 250 }}
        inputs={[
          { key: "x", type: "text", width: 50 },
          { key: "y", type: "text", width: 50 },
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
    </div>
  
    
  );
}
