
import {
    updateSpriteRotation,
    updateSpritePosition,
    setAnimating,
    updateLooks
} from './spritesSlice'

export const runAllSprites =() => async(dispatch,getState) => {
    const {sprites} = getState().sprites;

    const tasks = sprites.map(sp => dispatch(runOneSprite(sp.id)));
    return Promise.all(tasks);

    // await Promise.all(
    //     sprites.map((sp) => dispatch(runOneSprite(sp.id)))
    // )
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const runOneSprite = (spriteId) => async(dispatch,getState) =>{
    const firstRead = getState().sprites.sprites.find(s => s.id === spriteId);
   if (!firstRead || firstRead.isAnimating) return;

   const cToken = firstRead.collisionToken;
   

    const state = getState().sprites;
    const sprite = state.sprites.find((s)=>s.id===spriteId);

    if(!sprite || sprite.blocks.length===0) return;

    dispatch(setAnimating({ spriteId, value: true }))

    let {x,y} = sprite.position;
    let angle = sprite.rotation;

    const visitedRepeats = new Set()

    let index = 0;
    //for(const block of sprite.blocks){
    while(true){
        const spriteLive = getState().sprites.sprites.find(s => s.id === spriteId);
        if (!spriteLive || spriteLive.collisionToken !== cToken) break;   
        const block = spriteLive?.blocks[index];
        if (!block) break;

        if(block.type === 'move'){
            const rad = (angle * Math.PI) / 180;
            x += block.value * Math.cos(rad);
            y += block.value * Math.sin(rad);
            dispatch(updateSpritePosition({ spriteId, position: { x, y } }));
        }
        else if(block.type ==='turn'){
            angle+=block.value
            dispatch(updateSpriteRotation({spriteId,rotation:angle}))
        }
        else if(block.type ==="goto"){
            x=block.x;
            y=block.y;
            dispatch(updateSpritePosition({spriteId,position:{x,y}}));
        }
        else if(block.type ==="repeat"){
            if (!visitedRepeats.has(block.id)) {
                visitedRepeats.add(block.id);  
                index = -1;                    
            }
        }
        else if (block.type === "say") {
            dispatch(updateLooks({ spriteId, sayText: block.text }));
            await sleep(block.seconds * 1000);
            dispatch(updateLooks({ spriteId, sayText: "" }));
        }
            else if (block.type === "think") {
            dispatch(updateLooks({ spriteId, thinkText: block.text }));
            await sleep(block.seconds * 1000);
            dispatch(updateLooks({ spriteId, thinkText: "" }));
         }
        
         index+=1;
        await sleep(600);
    }

    dispatch(setAnimating({ spriteId, value: false }))
    return true;
}

