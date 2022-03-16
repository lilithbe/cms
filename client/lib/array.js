export const arrayAddFormat = (arr, data, index) => {
    const result = Array.from(arr);
    result.splice(index, 1, data);
    return result
}
export const arrayDeleteFormat = (arr,index) => {
    const result = Array.from(arr);
    result.splice(index, 1);
    return result
}

export const arrayChangeFormat = (arr,index,to) => {
    const result = Array.from(arr);
    const main = arr[index]
    const changer = arr[to]
   
    result.splice(index, 1, changer);
    result.splice(to, 1, main);
    return result
}
const arrayMoveMutate = (array, from, to) => {
    array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  };
export const arrayMove = (array, from, to) => {
    array = array.slice();
    arrayMoveMutate(array, from, to);
    return array;
  };



