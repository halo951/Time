/**
 * single time handle class
 */
export default class Time {

  /**
   * 时间戳对比
   * 
   * @param t1 
   * @param t2 
   * @returns t1 - t2 的时间差(毫秒)
   */
  static diff(t1: number, t2: number) {
    // 判断2个时间是否是 毫秒,不是的话修正
    t1 = `${t1}`.length == 10 ? t1 * 1000 : t1;
    t2 = `${t2}`.length == 10 ? t2 * 1000 : t2;
    return t1 - t2;
  }
  /**
   * 检查时间是否子啊某一时间段内
   * @param time 
   * @param timeSlot 
   */
  static betweenIn(time: number, timeSlot: {
    before: number;
    after: number;
  }) {
    // 格式化时间戳
    time = `${time}`.length == 10 ? time * 1000 : time;
    timeSlot.before = `${timeSlot.before}`.length == 10 ? timeSlot.before * 1000 : timeSlot.before;
    timeSlot.after = `${timeSlot.after}`.length == 10 ? timeSlot.after * 1000 : timeSlot.after;
    return time >= timeSlot.before && time <= timeSlot.after;
  }
  /**
   * 获取毫秒格式时间戳
   */
  static getTimestamp(time: number) {
    time = `${time}`.length == 10 ? time * 1000 : time;
    return time;
  }
  /**
   * 时间格式化
   */
  static countDown(time: number) {
    // 检查并更新时间格式为毫秒格式
    time = this.getTimestamp(time);
    // 获取剩余时长
    let cd = time - new Date().getTime();
    if (cd < 0) {
      return "00:00:00";
    } else if (cd >= 24 * 60 * 60 * 1000) {
      // 超过一天的折合成一天
      let day = Math.floor(cd / 24 / 60 / 60 / 1000);
      if (day > 9999) return "永久";
      else return `${day}天`;
    }
    let day = Math.floor(cd / (1000 * 60 * 60 * 24));
    cd = cd - (day * (10 * 60 * 60 * 24));
    let hour = Math.floor(cd / (1000 * 60 * 60));
    cd = cd - (hour * (1000 * 60 * 60));
    let minute = Math.floor(cd / (1000 * 60));
    cd = cd - (minute * (1000 * 60));
    let second = Math.floor(cd / 1000);
    let r = "";
    if (day > 0) {
      r += day + "天";
    }
    r += hour >= 10 ? hour : "0" + hour;
    r += ":";
    r += minute >= 10 ? minute : "0" + minute;
    r += ":";
    r += second >= 10 ? second : "0" + second;
    return r;
  }
  /**
   * 时间格式化
   * 
   * @param time 
   * @param format 时间转换格式 ,参考js通用日期格式
   * 
   * > @libary  http://momentjs.cn/
   */
  static format(time: number | Date, format: string) {
    let date: Date = null;
    // 日期参数检查
    if (typeof time == "number") {
      // 检查并更新时间格式为毫秒格式,并写入Date
      date = new Date(this.getTimestamp(time));
    } else if (date instanceof Date) {
      date = time;
    } else {
      // ! 传入参数异常
      console.error("Time.format():传入参数异常", time, format);
      return null;
    }
    // 时间转换公式
    let timeConvertFormula = {
      "yyyy": (date: Date) => { // 2019
        return date.getFullYear();
      },
      "YY": (date: Date) => { // 19
        return `${date.getFullYear()}`.slice(2, 4);
      },
      "MM": (date: Date) => { // 08
        if (date.getMonth() + 1 >= 10) {
          return date.getMonth() + 1;
        } else {
          return `0${date.getMonth() + 1}`;
        }
      },
      "M": (date: Date) => { // 8
        return date.getMonth() + 1;
      },
      "dd": (date: Date) => {
        let day = date.getDate();
        if (day < 10) {
          return `0${day}`;
        } else {
          return day;
        }
      },
      "d": (date: Date) => {
        return date.getDate();
      },
      "dayCN": (date: Date) => {
        switch (date.getDay()) {
          case 0: return "星期天";
          case 1: return "星期一";
          case 2: return "星期二";
          case 3: return "星期三";
          case 4: return "星期四";
          case 5: return "星期五";
          case 6: return "星期六";
        }
      },
      "HH": (date: Date) => {
        let hours = date.getHours();
        if (hours < 10) {
          return `0${hours}`;
        } else {
          return hours;
        }
      },
      "H12": (date: Date) => {
        let hours = date.getHours();
        if (hours < 12) {
          return `${hours}AM`;
        } else {
          return `${hours - 12}PM`;
        }
      },
      "mm": (date: Date) => {
        let minute = date.getMinutes();
        if (minute < 10) {
          return `0${minute}`
        } else {
          return minute;
        }
      },
      "ms": (date: Date) => {
        return date.getMinutes();
      },
      "ss": (date: Date) => {
        let second = date.getMinutes();
        if (second < 10) {
          return `0${second}`
        } else {
          return second;
        }
      },
      "S": (date: Date) => {
        let second = date.getMinutes();
        return second;
      }
    };
    let r = format;
    Object.keys(timeConvertFormula).forEach(key => {
      if (new RegExp(key, "g").test(r)) {
        r = r.replace(new RegExp(key, "g"), timeConvertFormula[key](date));
      }
    });
    return r;
  }
}
