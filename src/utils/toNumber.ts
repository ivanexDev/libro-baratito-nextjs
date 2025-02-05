export function toNumber(num: string){

    const onlyNumber = +num.split(" ")[1].replace(".","")
    return onlyNumber
    
}