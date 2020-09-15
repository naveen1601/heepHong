import moment from 'moment';

export function checkTodayandYesterdayDate(givenDate) {
    const comingDate = moment(givenDate.format('MM-DD-YYYY'));

    const isTodayDate = moment(moment().format('MM-DD-YYYY')).isSame(comingDate);
    const yesterDate = moment(moment().add(-1, 'days').format('MM-DD-YYYY'));
    const isYesterDate = yesterDate.isSame(comingDate);

    return {
        isTodayDate, isYesterDate
    }

}