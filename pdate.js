var paav = paav || {};

paav.date = (function() {
  var PDate = function(value) {
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
    var
      oDate = this._date,
      strDate,
      pad = paav.lib.strPad,
      year = oDate.getFullYear(),
      month = oDate.getMonth() + 1,
      date = oDate.getDate();

    switch (format) {
      case 'yyyy-mm-dd':
        strDate = [
          year,
          pad(month, 2, '0'),
          pad(date, 2, '0'),
        ].join('-');
        break;

      case 'dd.mm.yyyy':
        strDate = [
          pad(date, 2, '0'),
          pad(month, 2, '0'),
          year,
        ].join('.');
        break;
    }

    return strDate;
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
})();

