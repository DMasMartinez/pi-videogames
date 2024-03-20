
const Validation=(objeto)=>{
    const objectError = {}
    const objectErrorfecha = {}
    const lista = [0,1,2,3,4,5,6,7,8,9]
    const regexFecha = /^\d{2}-\d{2}-\d{4}$/
    const regexdia = /^(0?[1-9]|[12][0-9]|3[01])$/
    if (objeto.name===""){
        objectError.name = "the space is blank"
    }else {
        if (objeto.name.length>14){
            objectError.name = "the number of character are longer than 14"
        }
    }
    if (objeto.description===""){
        objectError.description = "the space is already blank"
    }else {
        if (objeto.description.length>35){
            objectError.description = "you already pass the limit of character"
        }
    }
    if (objeto.devices===""){
       objectError.devices = "the space is already blank"
    }

    if (objeto.release===""){
        objectError.release = "the topic still didnt fill"
    }else{
        if (!regexFecha.test(objeto.release)){
            objectError.release = "the topic is not the right format"
        }
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