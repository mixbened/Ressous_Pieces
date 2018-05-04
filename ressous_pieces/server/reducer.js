
module.exports =  {
    total: function(array) {
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
  },
  count: function(array){
    let correct = 0;
    let incorrect = 0;
    for(let i = 0; i < array.length; i++){
      if(array[i].check_field){
        correct += 1;
      } else {
        incorrect += 1;
      }
    }
    return {
      correct,
      incorrect
    }
  }
}
