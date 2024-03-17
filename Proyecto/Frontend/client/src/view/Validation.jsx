
const Validation=(objeto)=>{
    const objectError = {}
    const lista = [0,1,2,3,4,5,6,7,8,9]
    if (objeto.name===""){
        objectError.name = "the space is blank"
    }
    if (objeto.description===""){
        objectError.description = "the space is already blank"
    }else {
        if (objeto.description.length>20){
            objectError.description = "you already pass the limit of character"
        }
    }
    if (objeto.devices===""){
       objectError.devices = "the space is already blank"
    }
    if (objeto.release===""){
        objectError.release = "the topic still didnt fill"
    }
    if (objeto.ratings===""){
        objectError.ratings = "the space still blank"
    }else{
        if (typeof objeto.ratings==="number"){
            objectError.ratings = "the values has the wrong ty"
        }
    }
    if (objeto.Genres===""){
        objectError.Genres = "the topic still blank"
    }
    return objectError
}


export default Validation