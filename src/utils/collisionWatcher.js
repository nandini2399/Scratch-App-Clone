import { areSpritesColliding } from "./geometry";
import { swapSpriteAnimations, bumpCollisionToken, setAnimating } from "./spritesSlice";
import { runOneSprite } from "./animationThunks";

export const collisionWatcher = () =>(dispatch,getState)=>{
    let lastSwapTime = 0;
    const SWAP_COOLDOWN = 2000;

    const loop = () =>{
        const {sprites} = getState().sprites;

        if(sprites.length>=2){
            const [a,b] = sprites;
            const touching = areSpritesColliding(a,b);
            const now = Date.now();
            
            const canSwap = (now - lastSwapTime) > SWAP_COOLDOWN;
            
            if(touching && canSwap){
                lastSwapTime = now;
                
                dispatch(bumpCollisionToken({ spriteId: a.id }));
                dispatch(bumpCollisionToken({ spriteId: b.id }));
                
                setTimeout(() => {
                    dispatch(swapSpriteAnimations({spriteIdA:a.id,spriteIdB:b.id}))
                    dispatch(setAnimating({ spriteId: a.id, value: false }));
                    dispatch(setAnimating({ spriteId: b.id, value: false }));
                }, 100);
                
                setTimeout(() => {
                    const updatedSprites = getState().sprites.sprites;
                    const newA = updatedSprites.find(s => s.id === a.id);
                    const newB = updatedSprites.find(s => s.id === b.id);
                    
                    if (newA.isAnimating || newB.isAnimating) {
                        dispatch(setAnimating({ spriteId: a.id, value: false }));
                        dispatch(setAnimating({ spriteId: b.id, value: false }));
                        
                        setTimeout(() => {
                            dispatch(runOneSprite(a.id, true, true));
                            dispatch(runOneSprite(b.id, true, true));
                        }, 50);
                    } else {
                        dispatch(runOneSprite(newA.id, true, true));
                        setTimeout(() => {
                            dispatch(runOneSprite(newB.id, true, true));
                        }, 100);
                    }
                }, 200);
            }
        }
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
}