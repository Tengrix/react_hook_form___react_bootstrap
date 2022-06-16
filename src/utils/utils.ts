export const optionsDate = (begin:string,end:string, date:string) => {
    let options = []
    for(let i = +begin; i <= +end; i++){
        options.push({[date]:`${i.toString()}`, label:`${i.toString()}`})
    }
    return options
}
export const months = optionsDate('1', '12', 'month')
export const years = optionsDate('2022', '2032', 'year')
export const getMonths = (value: string) => {
    return value ? months?.find(el => el.value === value) : ''
}
export const getYears = (value: string) => {
    return value ? years?.find(el => el.value === value) : ''
}