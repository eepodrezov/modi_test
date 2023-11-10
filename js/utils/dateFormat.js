export function formatDateWithoutTime(date) {
    return splitDate(date).date.reverse().join('.')
}

const monthes = [
    'янв.',
    'фев.',
    'мар.',
    'апр.',
    'мая.',
    'июня',
    'июля',
    'авг.',
    'сен.',
    'окт.',
    'нояб.',
    'дек.',
]

export function formatDateWithTime(date) {
    const splitedDate = {...splitDate(date)}
    splitedDate.date = splitedDate.date.reverse()
    const monthNum = splitedDate.date[1]
    splitedDate.date[1]  = monthes[monthNum]
    const time = splitedDate.time.slice(0,5)
    return `${splitedDate.date.join(' ')}, ${time}`
}

export function formatTime(date) {
    const time = new Date(date)
    const now = new Date()
    const hours = time.getHours()-3
    const minutes = time.getMinutes()
    return `${hours > 10 ? hours : '0' + hours}:${minutes > 10 ? minutes : '0' + minutes }`
}

export function splitDate(date) {
    const splitedDate = date.split('-')
    const splitedDateTime = splitedDate[2].split('T')
    splitedDate[2] = splitedDateTime[0]
    const time = splitedDateTime[1]
    return {
        date: splitedDate,
        time: time
    }
}