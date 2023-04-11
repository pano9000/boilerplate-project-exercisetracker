export default class DateRange {

  constructor(date = new Date()) {
    this.date = new Date(date)
  }

  get currentDay() {
    return this.#format(() => this.date, () => this.date, this.date)
  }

  get currentWeek() {
    return this.#format(this.firstDayOfWeek, this.lastDayOfWeek, this.date)
  }

  get currentMonth() {
    return this.#format(this.firstDayOfMonth, this.lastDayOfMonth, this.date)
  }

  get currentYear() {
    return this.#format(this.firstDayOfYear, this.lastDayOfYear, this.date)
  }

  firstDayOfMonth(date) {
    const dateCopy = new Date(date)
    dateCopy.setUTCDate(1)
    return dateCopy
  }

  lastDayOfMonth(date) {
    const dateCopy = new Date(date);
    const nextMonth = dateCopy.getUTCMonth() + 1;
    dateCopy.setUTCMonth(nextMonth);
    dateCopy.setUTCDate(0);
    return dateCopy;
  }

  firstDayOfYear(date) {
    const dateCopy = new Date(date);
    dateCopy.setUTCMonth(0);
    dateCopy.setUTCDate(1);
    return dateCopy;
  }

  lastDayOfYear(date) {
    const dateCopy = new Date(date);
    dateCopy.setUTCMonth(12);
    dateCopy.setUTCDate(0);
    return dateCopy;
  }

  firstDayOfWeek(date) {
    const dateCopy = new Date(date);
    const currentWeekDay = dateCopy.getUTCDay();
    const currentDate = dateCopy.getUTCDate();
    dateCopy.setUTCDate(currentDate + ((0 - (currentWeekDay || 7)) + 1 ));
    return dateCopy;
  }

  lastDayOfWeek(date) {
    const dateCopy = new Date(date);
    const currentWeekDay = dateCopy.getUTCDay();
    const currentDate = dateCopy.getUTCDate();
    dateCopy.setUTCDate(currentDate + (7 - (currentWeekDay || 7)));
    return dateCopy;
  }

  #format(callbackStart, callbackEnd, date) {
    return {
      start: callbackStart(date),
      end: callbackEnd(date)
    }
  }

}