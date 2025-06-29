import React from "react";
import { nanoid } from "nanoid";
import { useState,useRef } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export default function TemplateBlock({
    id,
    baseData,
    inputs,
    className="",
    renderLabel,
    suffix
}){
    const [vals, setVals] = useState(Object.fromEntries(inputs.map((i)=>[i.key,baseData[i.key]??""])))

    const dataRef = useRef({id:nanoid(),...baseData,...vals});

    const onChange = (key) => (e) => {
    const value =
      inputs.find((i) => i.key === key).type === "number"
        ? Number(e.target.value) || 0
        : e.target.value;
    setVals((p) => {
      const next = { ...p, [key]: value };
      dataRef.current = { ...dataRef.current, ...next };
      return next;
    });
  };

  const { setNodeRef, listeners, attributes, transform, isDragging } =
    useDraggable({ id, data: dataRef.current });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: transform ? CSS.Translate.toString(transform) : undefined,
        opacity: isDragging ? 0.6 : 1,
        cursor: "grab",
      }}
      className={`${className} mx-2 my-2 flex flex-wrap items-center rounded px-2 py-1 text-sm select-none`}
    >
      {renderLabel(vals)}
      {inputs.map((inp) => (
        <input
          key={inp.key}
          type={inp.type}
          value={vals[inp.key]}
          onChange={onChange(inp.key)}
          className={`mx-1 h-6 px-1 text-black border border-gray-400 rounded`}
          style={{ width: inp.width }}
        />
      ))}
      {suffix?suffix(vals):null}
    </div>
  );
}