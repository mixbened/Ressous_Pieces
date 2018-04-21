

module.exports = function(val){
    if(val.includes('github')){
      return 'github';
    } else if(val.includes('repl')){
      return 'repl.it'
    } else if(val.includes('fiddle')){
        return 'JSFiddle'
    } else if(val.includes('codepen')){
        return 'codepen'
    } else if(val.includes('mozilla')){
        return 'mdn'
    }  else if(val.includes('w3schools')){
        return 'w3'
    }  else if(val.includes('medium')){
        return 'medium'
    } else {
        return 'else'
    }
  }
  
