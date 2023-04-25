export const asPOJO = obj => JSON.parse(JSON.stringify(obj))

export const renombrarCampo = (record, from, to) => {
    record[to] = record[from]
    delete record[from]
    return record
}
export const eliminarCampo = (record, field) => {
    const value = record[field]
    delete record[field]
    return value
}