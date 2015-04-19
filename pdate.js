var paav = paav || {};

paav.pdate = (function(p) {
  var PDate = function(value) {
    if (p.isUndef(value))
      this._date = new Date();
    else
      this._date = new Date(value);
  };

  PDate._monthNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  PDate.prototype.getMonthFirstDay = function() {
    var
      oFirstDate = new Date(this._date.getFullYear(), this._date.getMonth()),
      firstDay = oFirstDate.getDay();

    return firstDay === 0 ? 6 : firstDay - 1;
  };

  PDate.prototype.getMonthLastDate = function() {
    var oMonthLastDate = new Date(this._date.getFullYear(), this._date.getMonth() + 1, 0);

    return oMonthLastDate.getDate();
  };

  PDate.prototype.getMonthName = function() {

    return PDate._monthNames[this._date.getMonth()];
  };

  PDate.prototype.nextMonth = function() {
    this._date.setMonth(this._date.getMonth() + 1);
  };

  PDate.prototype.prevMonth = function() {
    this._date.setMonth(this._date.getMonth() - 1);
  };
  
  /**
   * @param {PDate} date to compare with
   */
  PDate.prototype.equals = function(date) {
    return +this._date == +date;
  };

  PDate.prototype.clone = function() {
    return new Date(+this._date);
  };

  PDate.prototype.format = function(format) {
    var oPDate  = this._date,
        pad     = paav.lib.strPad,

        year    = oPDate.getFullYear(),
        month   = oPDate.getMonth() + 1,
        date    = oPDate.getDate(),
        hours   = oPDate.getHours(),
        minutes = oPDate.getMinutes(),
        seconds = oPDate.getSeconds(),

        replaces = {
          'y':   year,
          'MM':  pad(month, 2, 0),
          'dd':  pad(date, 2, 0),
          'HH':  pad(hours, 2, 0),
          'mm':  pad(minutes, 2, 0),
          'ss':  pad(seconds, 2, 0),
        },

        key,
        formatted = format,
        re;

    for (key in replaces) {
      if (replaces.hasOwnProperty(key)) 
        re = new RegExp(key, 'g');
        formatted = formatted.replace(re, replaces[key]);
    } 

    return formatted;
  };

  [
    'getFullYear',
    'getMonth',
    'getDate',
    'getDay',
    'getDate',
    'setMonth',
    'valueOf',
    'toString',
    'setDate',
  ].forEach(function (key) {
      PDate.prototype[key] = function () {
          return Date.prototype[key].apply(this._date, arguments);
      };
  });

  return PDate;
})(paav.lib);

