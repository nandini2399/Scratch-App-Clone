import { createSlice, nanoid } from "@reduxjs/toolkit";
const heroId = nanoid()
const initialState = {
    sprites:[
        {
            id: heroId,//nanoid(),
            name:"Cat",
            spId:"cat",
            position: {x:250,y:250},
            rotation: 0,
            blocks: [],
            looks:{ sayText:'', thinkText:''},
            isAnimating: false,
            hitbox: {w:65, h:70},
            collisionToken: 0
        }
    ],
    selectedSpriteId: heroId//null
}

const spritesSlice = createSlice({
    name:'sprites',
    initialState,
    reducers:{
        addSprite: (state,action)=>{
            const OFFSET = 100;
            const count = state.sprites.length
            const CAT_SPECS  = { w: 65, h: 70 };
            const BALL_SPECS = { w: 60, h: 60 };
            const hitb = action.payload.spId==="cat"?CAT_SPECS:BALL_SPECS;
            const newSprite = {
                id: nanoid(),
                name: action.payload.name || 'New Sprite',
                spId: action.payload.spId,
                position: {
                    x:60 + OFFSET *(count%5),
                    y:60 + OFFSET *Math.floor(count/5)
                },
                rotation:0,
                blocks:[],
                looks:{ sayText:'', thinkText:''},
                isAnimating: false,
                hitbox : hitb
            }
            state.sprites.push(newSprite);
        },

        selectSprite: (state,action) =>{
            state.selectedSpriteId = action.payload
        },

        addBlockToSprite: (state, action)=>{
            const {spriteId, block} = action.payload;
            const sprite = state.sprites.find((s)=>s.id===spriteId);
            if(sprite){
                sprite.blocks.push({...block, id:nanoid()})
            }
        },

        removeBlockFromSprite: (state,action)=>{
            const { spriteId, blockId } = action.payload;
            const sprite = state.sprites.find(s => s.id === spriteId);
            if (!sprite) return;

            sprite.blocks = sprite.blocks.filter(b => b.id !== blockId);
        },

        updateSpritePosition : (state,action)=>{
            const {spriteId, position} = action.payload;
            const sprite = state.sprites.find((s)=>s.id===spriteId);
            if(sprite){
                sprite.position=position
            }
        },

        updateSpriteRotation : (state,action)=>{
           const {spriteId, rotation} = action.payload;
            const sprite = state.sprites.find((s)=>s.id===spriteId);
            if(sprite){
                sprite.rotation=rotation
            } 
        },

        updateLooks : (state,action)=>{
            const {spriteId, sayText, thinkText} = action.payload;
            const sprite = state.sprites.find((s)=>s.id===spriteId);

            if(sprite){
                if (sayText !== undefined) sprite.looks.sayText = sayText;
                if (thinkText !== undefined) sprite.looks.thinkText = thinkText;
            }
        },

        setAnimating(state, action) {
            const { spriteId, value } = action.payload;
            const sprite = state.sprites.find((s) => s.id === spriteId);
            if (sprite) {
                sprite.isAnimating = value;
            }
        },
        clearBlocks(state, action) {
            const { spriteId } = action.payload;
            const sprite = state.sprites.find((s) => s.id === spriteId);
            if (sprite) {
                sprite.blocks = []; //check
            }
        },
        swapSpriteAnimations(state,action){
            const {spriteIdA, spriteIdB} = action.payload;
            const spriteA = state.sprites.find(s=>s.id===spriteIdA)
            const spriteB = state.sprites.find(s=>s.id===spriteIdB)

            if(!spriteA || !spriteB)    return;

            [spriteA.blocks, spriteB.blocks] = [spriteB.blocks, spriteA.blocks];

        },

        bumpCollisionToken(state,action){
            const {spriteId} = action.payload;
            const sprite = state.sprites.find(s=>s.id===spriteId)
            if(sprite)  sprite.collisionToken+=1
        }
    }
})


export const {
  addSprite,
  selectSprite,
  addBlockToSprite,
  removeBlockFromSprite,
  updateSpritePosition,
  updateSpriteRotation,
  updateLooks,
  setAnimating,
  clearBlocks,
  swapSpriteAnimations,
  bumpCollisionToken,
} = spritesSlice.actions;

export default spritesSlice.reducer;