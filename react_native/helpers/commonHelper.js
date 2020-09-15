import moment from 'moment';

export function checkTodayandYesterdayDate(givenDate) {
    const isTodayDate = moment(moment().format('MM-DD-YYYY')).isSame(givenDate);
    const yesterDate = moment(moment().add(-1, 'days').format('MM-DD-YYYY'));
    const isYesterDate = yesterDate.isSame(givenDate);

    return {
        isTodayDate, isYesterDate
    }

}