import moment from 'moment';

export const normalizeDate = (date) => {
    const newDate = new Date(date)
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const weekDay = days[moment(newDate).day()];
    const month = months[moment(newDate).month()];
    const dayOfMonth = moment(newDate).format('DD');
    const time = moment(newDate).format('HH:mm');
    return `${weekDay}, ${month} ${dayOfMonth} at ${time}`
}

