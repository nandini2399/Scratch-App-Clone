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

export const runOneSprite = (spriteId, forceStart = false, ignoreCollisionToken = false) => async(dispatch,getState) =>{
    const firstRead = getState().sprites.sprites.find(s => s.id === spriteId);
   if (!firstRead || (firstRead.isAnimating && !forceStart)) return;
   
   if (forceStart && firstRead.isAnimating) {
       dispatch(setAnimating({ spriteId, value: false }));
       await new Promise(resolve => setTimeout(resolve, 10));
   }

    const state = getState().sprites;
    const sprite = state.sprites.find((s)=>s.id===spriteId);

    if(!sprite || sprite.blocks.length===0) return;

    dispatch(setAnimating({ spriteId, value: true }))
    
    const latestSprite = getState().sprites.sprites.find(s => s.id === spriteId);
    const cToken = latestSprite?.collisionToken ?? 0;

    let {x,y} = sprite.position;
    let angle = sprite.rotation;

    const visitedRepeats = new Set()

    let index = 0;
    //for(const block of sprite.blocks){
    while(true){
        const spriteLive = getState().sprites.sprites.find(s => s.id === spriteId);
        if (!spriteLive) break;
        
        if (!ignoreCollisionToken && spriteLive.collisionToken !== cToken) {
            break;
        }
        const block = spriteLive?.blocks[index];
        if (!block) break;

        if(block.type === 'move'){
            const rad = (angle * Math.PI) / 180;
            const totalSteps = Math.abs(block.value);
            const direction = block.value > 0 ? 1 : -1;
            const STEP_SIZE = 5;
            const chunks = Math.ceil(totalSteps / STEP_SIZE);
            
            for(let i = 0; i < chunks; i++) {
                const currentSprite = getState().sprites.sprites.find(s => s.id === spriteId);
                if (!currentSprite) break;
                
                if (!ignoreCollisionToken && currentSprite.collisionToken !== cToken) break;
                
                const remainingSteps = totalSteps - (i * STEP_SIZE);
                const stepSize = Math.min(STEP_SIZE, remainingSteps);
                
                x += direction * stepSize * Math.cos(rad);
                y += direction * stepSize * Math.sin(rad);
                dispatch(updateSpritePosition({ spriteId, position: { x, y } }));
                
                await sleep(30);
            }
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