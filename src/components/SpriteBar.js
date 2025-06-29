import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux"
import { addSprite, selectSprite, deleteSprite } from "../utils/spritesSlice";
import { spriteOptions } from "../utils/spriteOptions";

const SpriteBar = () =>{

    const sprites = useSelector((state)=>state.sprites.sprites);
    const selected = useSelector((state)=>state.sprites.selectedSpriteId);
    const dispatch = useDispatch()

    const [showDropDown,setShowDropDown] = useState(false)
    const optionById = (id) => spriteOptions.find((o) => o.id === id);

    function handleAdd(option){
        console.log("Debug"+option.id)
       dispatch(addSprite({spId:option.id,name:option.name,image:option.image}))
       setShowDropDown(false)
    }

    return (
      <aside className="border-r-2 border-green-500 p-2 bg-gray-50">
        <h3>Sprites</h3>
        <div className="flex flex-wrap gap-2">
  {sprites.map((sp) => {
    const opt = optionById(sp.spId)
    return (
      <div className="relative inline-block" key={sp.id}>
        <button
          onClick={() => dispatch(selectSprite(sp.id))}
          className={`inline-flex items-center px-3 pr-10 py-2 rounded-md
            ${
              sp.id === selected
                ? "bg-indigo-600 text-white"
                : "bg-gray-300 hover:bg-gray-200"
            }`}
        >
          {opt?.component}
          {sp.name}
        </button>
        <button
          onClick={() =>
            dispatch(deleteSprite({ spriteId: sp.id }))
          }
          className="absolute -top-2 -right-2
            bg-red-500 hover:bg-red-600 text-white
            rounded-full p-1 text-xs shadow-md
            w-5 h-5 flex items-center justify-center"
        >
          ×
        </button>
      </div>
                );
                
})}
        </div>

        <button
          onClick={() => setShowDropDown(!showDropDown)}
          className="mt-2 w-40 px-2 py-1 rounded bg-green-500 text-white"
        >
          + Add Sprite
        </button>

        {showDropDown && (
          <div className="absolute bg-white border rounded shadow mt-1 max-h-48 overflow-auto z-10">
            {spriteOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleAdd(option)}
                className="px-3 py-2 hover:bg-green-100 cursor-pointer"
              >
                {option.component}
                {option.name}
              </div>
            ))}
          </div>
        )}
      </aside>
    );
}

export default SpriteBar;