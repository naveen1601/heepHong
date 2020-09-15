import moment from 'moment';

export function checkTodayandYesterdayDate(givenDate) {
    const comingDate = moment(givenDate.format('YYYY-MM-DD'));

    const isTodayDate = moment(moment().format('YYYY-MM-DD')).isSame(comingDate);
    const yesterDate = moment(moment().add(-1, 'days').format('YYYY-MM-DD'));
    const isYesterDate = yesterDate.isSame(comingDate);

    return {
        isTodayDate, isYesterDate
    }

}