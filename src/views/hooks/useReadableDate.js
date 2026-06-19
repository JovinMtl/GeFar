

export  function useReadableDateTime (value="2025-08-10T20:04:50.971297+02:00"){
    // makes 1000000 into a string of 1.000.000
    let data = String(value)
    let result = ''
    {
        let day = data.slice(8, 10)
        let month = Number(data.slice(5, 7))
        let year = data.slice(0, 4)

        let time = data.slice(11, 16)
        result = `${day}/${month}/${year} ${time}`
    }
    return result
}

export function useReadableDateTimeSeparate (value="2025-08-10T20:04:50.971297+02:00"){
    // makes 1000000 into a string of 1.000.000
    let data = String(value)
    let result = ''
    {
        let day = data.slice(8, 10)
        let month = Number(data.slice(5, 7))
        let year = data.slice(0, 4)
        
        let time = data.slice(11, 16)
        let date = `${day}/${month}/${year}`
        result = [date, time]
    }
    return result
}
