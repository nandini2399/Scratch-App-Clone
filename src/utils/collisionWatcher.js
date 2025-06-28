import { areSpritesColliding } from "./geometry";
import { swapSpriteAnimations } from "./spritesSlice";
import { runOneSprite } from "./animationThunks";

export const collisionWatcher = () =>(dispatch,getState)=>{
    let swappedThisFrame = false;

    const loop = () =>{
        const {sprites} = getState().sprites;

        if(sprites.length>=2){
            const [a,b] = sprites;
            const touching = areSpritesColliding(a,b,10);
            console.log('touching?', touching, a.position, b.position);

            if(touching && !swappedThisFrame){
                swappedThisFrame = true;
                dispatch(swapSpriteAnimations({spriteIdA:a.id,spriteIdB:b.id}))
                dispatch(bumpRunToken({ spriteId: a.id }));
                dispatch(bumpRunToken({ spriteId: b.id }));
                dispatch(runOneSprite(a.id));
                dispatch(runOneSprite(b.id));

                
            }
            else if(!touching){
                swappedThisFrame = false;
            }
        }
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
}