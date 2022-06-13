import moment from "moment";
export function calculateTargetDate(weight, goalWeight) {
    let today = new Date();
    let value = Math.abs(weight - goalWeight)*2;
    let value2 = value * 7;
    today = moment(today).add(value2, 'day').format('MMM Do YY');
    return today;
}