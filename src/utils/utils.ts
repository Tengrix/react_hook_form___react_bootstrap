import {DateType} from '../App';

export const optionsDate = (begin:string,end:string) => {
    let options = []
    for(let i = +begin; i <= +end; i++){
        options.push({year:`${i.toString()}`, month:`${i.toString()}`})
    }
    return options
}
