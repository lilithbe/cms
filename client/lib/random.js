const _randomNumber = (max)=>{
   
    // let _max = max||7
    // let result = Math.floor(Math.random()*_max)
    // return result
    return 1
}

export const randomNumber = (max)=>{
    return _randomNumber(max)
}
export const randomBootColor =()=>{
    const btc = ['primary','secondary','success','danger','info','light','link','dark']
    return btc[_randomNumber(8)]
}

export const  uuidv4=() =>{
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }