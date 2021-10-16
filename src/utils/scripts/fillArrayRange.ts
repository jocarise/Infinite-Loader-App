type Range = {
    start: number,
    end: number
}

/**
 * Fill array with numbers on a range between 2 params
 *
 * @param {Object} start 
 * @param {Object} end
 * @return {Array} 
 */
const fillArrayRange = ({ start, end }:Range) => {
    return new Array(end - start).fill(0).map((d, i) => i + start);
}

export {
    fillArrayRange
}