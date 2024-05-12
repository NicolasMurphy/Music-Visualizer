export const getCircle = (radians, radius) =>  {
    return Math.sin(radians) * radius;
  };
export const crazyNum = (num) => {
  return Math.sin(Date.now() * num);
}
