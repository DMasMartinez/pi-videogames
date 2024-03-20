

const Validation1 = (objeto) =>{
    const ObjectError = {}
    const regexdia = /^(0?[1-9]|[12][0-9]|3[01])$/
    const regexmes = /^(0?[1-9]|1[0-2])$/;
    const regexano = /^(19[8-9]\d|2\d{3})$/;
    if (regexdia.test(objeto.dia)===false){
        ObjectError.dia = "day property dont have the right format"
    }
    if (regexmes.test(objeto.mes)===false){
        ObjectError.mes = "month property dont have the right format"
    }
    if (regexano.test(objeto.ano)===false){
        ObjectError.ano = "ano property dont have the right format"
    }
    return ObjectError
}

export default Validation1