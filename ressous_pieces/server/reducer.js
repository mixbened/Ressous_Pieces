
module.exports = function(array) {
    let total = 0;
  let check = 0;
  for(let i = 0; i < array.length; i++){
    total += array[i].total;
    check += array[i].true;
  }
  return {
    unchecked: total - check,
    check: check
  }
}