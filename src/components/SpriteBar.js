import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux"
import { addSprite, selectSprite } from "../utils/spritesSlice";
import { spriteOptions } from "../utils/spriteOptions";

const SpriteBar = () =>{

    const sprites = useSelector((state)=>state.sprites.sprites);
    const selected = useSelector((state)=>state.sprites.selectedSpriteId);
    const dispatch = useDispatch()

    const [showDropDown,setShowDropDown] = useState(false)

    function handleAdd(option){
        console.log("Debug"+option.id)
       dispatch(addSprite({spId:option.id,name:option.name,image:option.image}))
       setShowDropDown(false)
    }

    return(
        <aside className="border-r-2 border-green-500 p-2 bg-gray-50">
            <h3>Sprites</h3>
            <div className="flex flex-wrap gap-2">
                {sprites.map((sp)=>(
                    <button 
                        key={sp.id}
                        onClick={()=>dispatch(selectSprite(sp.id))}
                        className={`inline-flex items-center px-3 py-2 bg-gray-300 rounded-md ${sp.id===selected?'bg-indigo-600 text-white' : 'hover:bg-gray-200'}`}
                    >
                        {sp.name}
                    </button>
                ))}
            </div>
            

            <button
                onClick={()=>setShowDropDown(!showDropDown)}
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
    )
}

export default SpriteBar;