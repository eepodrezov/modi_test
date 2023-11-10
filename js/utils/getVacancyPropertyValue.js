export function getVacancyPropertyValue(values) {
    //value : boolean | [] | string[]
    if (typeof values === 'boolean') {
        return values ? 'Да' : 'Нет'
    }
    if (values?.length) {
        return values.join(', ')
    }
}