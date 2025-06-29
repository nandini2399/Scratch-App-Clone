
export const areSpritesColliding = (a, b) => {
  const buffer = 2;

  const halfAw = a.hitbox.w / 2 + buffer;
  const halfAh = a.hitbox.h / 2 + buffer;
  const halfBw = b.hitbox.w / 2 + buffer;
  const halfBh = b.hitbox.h / 2 + buffer;

  const aLeft   = a.position.x - halfAw;
  const aRight  = a.position.x + halfAw;
  const aTop    = a.position.y - halfAh;
  const aBottom = a.position.y + halfAh;

  const bLeft   = b.position.x - halfBw;
  const bRight  = b.position.x + halfBw;
  const bTop    = b.position.y - halfBh;
  const bBottom = b.position.y + halfBh;

  return (
    aLeft   <= bRight  &&   
    aRight  >= bLeft   &&  
    aTop    <= bBottom &&  
    aBottom >= bTop         
  );
};
