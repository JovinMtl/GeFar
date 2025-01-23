

export default function useReadableNumber (value=1000){
    // makes 1000000 into a string of 1.000.000
    let data = String(value)
    let r_data = data.split('').reverse()
    let len = data.length
    let result = ''
    for(let i=0; i <= len-1; i++){
        if(i && i%3==0){
            result = result.concat(`.${r_data[i]}`)
        } else{
            result = result.concat(r_data[i])
        }
    }
    let len2 = result.length
    let result2 = new String()
    for (let i=len2-1; i>=0; i--){
        result2 = result2.concat(result[i])
    }
    return result2
}