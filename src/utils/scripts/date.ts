type TimeDiffParams = {
    dateFuture: Date | number, 
    dateNow: Date | number
}

/**
 * Get text of days, hours, minutes between 2 Dates
 *
 * @param {Object} dateFuture Future or past date to calculate with the Date now
 * @param {Object} dateNow Date calculate on the function use
 * @return {string}
 */
const timeDiffCalc = ({ dateFuture, dateNow }: TimeDiffParams) => {
    //@ts-ignore
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000; 

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;
    console.log('calculated days', days);

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;
    console.log('calculated hours', hours);

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;
    console.log('minutes', minutes);

    let difference = '';
    if (days > 0) {
      difference += (days === 1) ? `${days} day, ` : `${days} days, `;
    }

    difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;

    difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`; 

    return difference;
}

export {
    timeDiffCalc
}