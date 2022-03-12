// https://stackoverflow.com/a/25984542
export const shuffleArray = (array: number[]) => {
  let count = array.length;
  let randomnumber: number;
  let temp: number;

  while( count ){
    randomnumber = Math.random() * count-- | 0;
    temp = array[count];
    array[count] = array[randomnumber];
    array[randomnumber] = temp
  }
}