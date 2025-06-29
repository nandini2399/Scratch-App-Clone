import React from "react";
import Icon from "./Icon";
import { useDispatch, useSelector } from "react-redux";
import { runAllSprites } from "../utils/animationThunks";
import { collisionWatcher } from "../utils/collisionWatcher";
import { resetSprites } from "../utils/spritesSlice";

export default function PlayBar(){
    const dispatch = useDispatch();
    const running = useSelector((s)=>
        s.sprites.sprites.some((sp)=>sp.isAnimating)
    )

    const selectedSprite = useSelector((s) => {
        const id = s.sprites.selectedSpriteId;
        return s.sprites.sprites.find((sp) => sp.id === id);
    });

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
            <button
                onClick={() => dispatch(resetSprites())}
                className="mx-2 px-4 py-1 rounded bg-yellow-600 hover:bg-yellow-700 text-white"
            >
                🔄 Reset
            </button>
            {running && <span className="text-sm">Running... </span>}
            {selectedSprite && (
                <div className="flex items-center gap-2 text-sm ml-auto">
                <span>➡️ x&nbsp;<span className="m-2 p-2 border-r-2 bg-blue-200">{Math.round(selectedSprite.position.x)}</span></span>
                <span>⬆️ y&nbsp;<span className="m-2 p-2 border-r-2 bg-blue-200">{Math.round(selectedSprite.position.y)}</span></span>
                </div>
            )}
        </div>
    )
}