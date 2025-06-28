import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { runAllSprites } from "../utils/animationThunks";
import { collisionWatcher } from "../utils/collisionWatcher";

export default function PlayBar(){
    const dispatch = useDispatch();
    const running = useSelector((s)=>
        s.sprites.sprites.some((sp)=>sp.isAnimating)
    )

    const handlePlay = () =>{
        dispatch(runAllSprites())
        dispatch(collisionWatcher());
    }

    return(
        <div className="p-2 border-b bg-gray-50 flex items-center">
            <button
            onClick={()=>handlePlay()}
            disabled={running}
            className={`px-4 py-1 rounded text-white
            ${running ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}>
                ▶️ Play
            </button>
            {running && <span className="text-sm">Running... </span>}
        </div>
    )
}