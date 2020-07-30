(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('date-fns/format'), require('date-fns/sub_months'), require('date-fns/add_months'), require('date-fns/get_days_in_month'), require('date-fns/last_day_of_month'), require('date-fns/get_month'), require('date-fns/set_month'), require('date-fns/get_year'), require('date-fns/set_year'), require('date-fns/is_same_month'), require('date-fns/is_same_day'), require('date-fns/add_days'), require('date-fns/sub_days'), require('date-fns/add_weeks'), require('date-fns/sub_weeks'), require('date-fns/start_of_month'), require('date-fns/start_of_week'), require('date-fns/end_of_week'), require('date-fns/is_before'), require('date-fns/is_after'), require('date-fns/is_valid')) :
  typeof define === 'function' && define.amd ? define(['date-fns/format', 'date-fns/sub_months', 'date-fns/add_months', 'date-fns/get_days_in_month', 'date-fns/last_day_of_month', 'date-fns/get_month', 'date-fns/set_month', 'date-fns/get_year', 'date-fns/set_year', 'date-fns/is_same_month', 'date-fns/is_same_day', 'date-fns/add_days', 'date-fns/sub_days', 'date-fns/add_weeks', 'date-fns/sub_weeks', 'date-fns/start_of_month', 'date-fns/start_of_week', 'date-fns/end_of_week', 'date-fns/is_before', 'date-fns/is_after', 'date-fns/is_valid'], factory) :
  (global.vueAirbnbStyleDatepicker = factory(global.dateFns.format,global.dateFns.subMonths,global.dateFns.addMonths,global.dateFns.getDaysInMonth,global.dateFns.lastDayOfMonth,global.dateFns.getMonth,global.dateFns.setMonth,global.dateFns.getYear,global.dateFns.setYear,global.dateFns.isSameMonth,global.dateFns.isSameDay,global.dateFns.addDays,global.dateFns.subDays,global.dateFns.addWeeks,global.dateFns.subWeeks,global.dateFns.startOfMonth,global.dateFns.startOfWeek,global.dateFns.endOfWeek,global.dateFns.isBefore,global.dateFns.isAfter,global.dateFns.isValid));
}(this, (function (format,subMonths,addMonths,getDaysInMonth,lastDayOfMonth,getMonth,setMonth,getYear,setYear,isSameMonth,isSameDay,addDays,subDays,addWeeks,subWeeks,startOfMonth,startOfWeek,endOfWeek,isBefore,isAfter,isValid) { 'use strict';

  format = format && format.hasOwnProperty('default') ? format['default'] : format;
  subMonths = subMonths && subMonths.hasOwnProperty('default') ? subMonths['default'] : subMonths;
  addMonths = addMonths && addMonths.hasOwnProperty('default') ? addMonths['default'] : addMonths;
  getDaysInMonth = getDaysInMonth && getDaysInMonth.hasOwnProperty('default') ? getDaysInMonth['default'] : getDaysInMonth;
  lastDayOfMonth = lastDayOfMonth && lastDayOfMonth.hasOwnProperty('default') ? lastDayOfMonth['default'] : lastDayOfMonth;
  getMonth = getMonth && getMonth.hasOwnProperty('default') ? getMonth['default'] : getMonth;
  setMonth = setMonth && setMonth.hasOwnProperty('default') ? setMonth['default'] : setMonth;
  getYear = getYear && getYear.hasOwnProperty('default') ? getYear['default'] : getYear;
  setYear = setYear && setYear.hasOwnProperty('default') ? setYear['default'] : setYear;
  isSameMonth = isSameMonth && isSameMonth.hasOwnProperty('default') ? isSameMonth['default'] : isSameMonth;
  isSameDay = isSameDay && isSameDay.hasOwnProperty('default') ? isSameDay['default'] : isSameDay;
  addDays = addDays && addDays.hasOwnProperty('default') ? addDays['default'] : addDays;
  subDays = subDays && subDays.hasOwnProperty('default') ? subDays['default'] : subDays;
  addWeeks = addWeeks && addWeeks.hasOwnProperty('default') ? addWeeks['default'] : addWeeks;
  subWeeks = subWeeks && subWeeks.hasOwnProperty('default') ? subWeeks['default'] : subWeeks;
  startOfMonth = startOfMonth && startOfMonth.hasOwnProperty('default') ? startOfMonth['default'] : startOfMonth;
  startOfWeek = startOfWeek && startOfWeek.hasOwnProperty('default') ? startOfWeek['default'] : startOfWeek;
  endOfWeek = endOfWeek && endOfWeek.hasOwnProperty('default') ? endOfWeek['default'] : endOfWeek;
  isBefore = isBefore && isBefore.hasOwnProperty('default') ? isBefore['default'] : isBefore;
  isAfter = isAfter && isAfter.hasOwnProperty('default') ? isAfter['default'] : isAfter;
  isValid = isValid && isValid.hasOwnProperty('default') ? isValid['default'] : isValid;

  /* eslint-disable */
  if (typeof Element !== 'undefined' && !Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s);
      var i = matches.length;

      while (--i >= 0 && matches.item(i) !== this) {}

      return i > -1;
    };
  }

  if (typeof Object.assign !== 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, 'assign', {
      value: function assign(target, varArgs) {
        var arguments$1 = arguments;


        if (target == null) {
          // TypeError if undefined or null
          throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments$1[index];

          if (nextSource != null) {
            // Skip over if undefined or null
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }

        return to;
      },
      writable: true,
      configurable: true
    });
  } // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex


  if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, 'findIndex', {
      value: function (predicate) {
        // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }

        var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

        var len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError exception.

        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        } // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.


        var thisArg = arguments[1]; // 5. Let k be 0.

        var k = 0; // 6. Repeat, while k < len

        while (k < len) {
          // a. Let Pk be ! ToString(k).
          // b. Let kValue be ? Get(O, Pk).
          // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
          // d. If testResult is true, return k.
          var kValue = o[k];

          if (predicate.call(thisArg, kValue, k, o)) {
            return k;
          } // e. Increase k by 1.


          k++;
        } // 7. Return -1.


        return -1;
      }
    });
  }

  /**
   * @category Common Helpers
   * @summary Is the given argument an instance of Date?
   *
   * @description
   * Is the given argument an instance of Date?
   *
   * @param {*} argument - the argument to check
   * @returns {Boolean} the given argument is an instance of Date
   *
   * @example
   * // Is 'mayonnaise' a Date?
   * var result = isDate('mayonnaise')
   * //=> false
   */
  function isDate (argument) {
    return argument instanceof Date
  }

  var is_date = isDate;

  var MILLISECONDS_IN_HOUR = 3600000;
  var MILLISECONDS_IN_MINUTE = 60000;
  var DEFAULT_ADDITIONAL_DIGITS = 2;

  var parseTokenDateTimeDelimeter = /[T ]/;
  var parseTokenPlainTime = /:/;

  // year tokens
  var parseTokenYY = /^(\d{2})$/;
  var parseTokensYYY = [
    /^([+-]\d{2})$/, // 0 additional digits
    /^([+-]\d{3})$/, // 1 additional digit
    /^([+-]\d{4})$/ // 2 additional digits
  ];

  var parseTokenYYYY = /^(\d{4})/;
  var parseTokensYYYYY = [
    /^([+-]\d{4})/, // 0 additional digits
    /^([+-]\d{5})/, // 1 additional digit
    /^([+-]\d{6})/ // 2 additional digits
  ];

  // date tokens
  var parseTokenMM = /^-(\d{2})$/;
  var parseTokenDDD = /^-?(\d{3})$/;
  var parseTokenMMDD = /^-?(\d{2})-?(\d{2})$/;
  var parseTokenWww = /^-?W(\d{2})$/;
  var parseTokenWwwD = /^-?W(\d{2})-?(\d{1})$/;

  // time tokens
  var parseTokenHH = /^(\d{2}([.,]\d*)?)$/;
  var parseTokenHHMM = /^(\d{2}):?(\d{2}([.,]\d*)?)$/;
  var parseTokenHHMMSS = /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/;

  // timezone tokens
  var parseTokenTimezone = /([Z+-].*)$/;
  var parseTokenTimezoneZ = /^(Z)$/;
  var parseTokenTimezoneHH = /^([+-])(\d{2})$/;
  var parseTokenTimezoneHHMM = /^([+-])(\d{2}):?(\d{2})$/;

  /**
   * @category Common Helpers
   * @summary Convert the given argument to an instance of Date.
   *
   * @description
   * Convert the given argument to an instance of Date.
   *
   * If the argument is an instance of Date, the function returns its clone.
   *
   * If the argument is a number, it is treated as a timestamp.
   *
   * If an argument is a string, the function tries to parse it.
   * Function accepts complete ISO 8601 formats as well as partial implementations.
   * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
   *
   * If all above fails, the function passes the given argument to Date constructor.
   *
   * @param {Date|String|Number} argument - the value to convert
   * @param {Object} [options] - the object with options
   * @param {0 | 1 | 2} [options.additionalDigits=2] - the additional number of digits in the extended year format
   * @returns {Date} the parsed date in the local time zone
   *
   * @example
   * // Convert string '2014-02-11T11:30:30' to date:
   * var result = parse('2014-02-11T11:30:30')
   * //=> Tue Feb 11 2014 11:30:30
   *
   * @example
   * // Parse string '+02014101',
   * // if the additional number of digits in the extended year format is 1:
   * var result = parse('+02014101', {additionalDigits: 1})
   * //=> Fri Apr 11 2014 00:00:00
   */
  function parse (argument, dirtyOptions) {
    if (is_date(argument)) {
      // Prevent the date to lose the milliseconds when passed to new Date() in IE10
      return new Date(argument.getTime())
    } else if (typeof argument !== 'string') {
      return new Date(argument)
    }

    var options = dirtyOptions || {};
    var additionalDigits = options.additionalDigits;
    if (additionalDigits == null) {
      additionalDigits = DEFAULT_ADDITIONAL_DIGITS;
    } else {
      additionalDigits = Number(additionalDigits);
    }

    var dateStrings = splitDateString(argument);

    var parseYearResult = parseYear(dateStrings.date, additionalDigits);
    var year = parseYearResult.year;
    var restDateString = parseYearResult.restDateString;

    var date = parseDate(restDateString, year);

    if (date) {
      var timestamp = date.getTime();
      var time = 0;
      var offset;

      if (dateStrings.time) {
        time = parseTime(dateStrings.time);
      }

      if (dateStrings.timezone) {
        offset = parseTimezone(dateStrings.timezone);
      } else {
        // get offset accurate to hour in timezones that change offset
        offset = new Date(timestamp + time).getTimezoneOffset();
        offset = new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE).getTimezoneOffset();
      }

      return new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE)
    } else {
      return new Date(argument)
    }
  }

  function splitDateString (dateString) {
    var dateStrings = {};
    var array = dateString.split(parseTokenDateTimeDelimeter);
    var timeString;

    if (parseTokenPlainTime.test(array[0])) {
      dateStrings.date = null;
      timeString = array[0];
    } else {
      dateStrings.date = array[0];
      timeString = array[1];
    }

    if (timeString) {
      var token = parseTokenTimezone.exec(timeString);
      if (token) {
        dateStrings.time = timeString.replace(token[1], '');
        dateStrings.timezone = token[1];
      } else {
        dateStrings.time = timeString;
      }
    }

    return dateStrings
  }

  function parseYear (dateString, additionalDigits) {
    var parseTokenYYY = parseTokensYYY[additionalDigits];
    var parseTokenYYYYY = parseTokensYYYYY[additionalDigits];

    var token;

    // YYYY or ±YYYYY
    token = parseTokenYYYY.exec(dateString) || parseTokenYYYYY.exec(dateString);
    if (token) {
      var yearString = token[1];
      return {
        year: parseInt(yearString, 10),
        restDateString: dateString.slice(yearString.length)
      }
    }

    // YY or ±YYY
    token = parseTokenYY.exec(dateString) || parseTokenYYY.exec(dateString);
    if (token) {
      var centuryString = token[1];
      return {
        year: parseInt(centuryString, 10) * 100,
        restDateString: dateString.slice(centuryString.length)
      }
    }

    // Invalid ISO-formatted year
    return {
      year: null
    }
  }

  function parseDate (dateString, year) {
    // Invalid ISO-formatted year
    if (year === null) {
      return null
    }

    var token;
    var date;
    var month;
    var week;

    // YYYY
    if (dateString.length === 0) {
      date = new Date(0);
      date.setUTCFullYear(year);
      return date
    }

    // YYYY-MM
    token = parseTokenMM.exec(dateString);
    if (token) {
      date = new Date(0);
      month = parseInt(token[1], 10) - 1;
      date.setUTCFullYear(year, month);
      return date
    }

    // YYYY-DDD or YYYYDDD
    token = parseTokenDDD.exec(dateString);
    if (token) {
      date = new Date(0);
      var dayOfYear = parseInt(token[1], 10);
      date.setUTCFullYear(year, 0, dayOfYear);
      return date
    }

    // YYYY-MM-DD or YYYYMMDD
    token = parseTokenMMDD.exec(dateString);
    if (token) {
      date = new Date(0);
      month = parseInt(token[1], 10) - 1;
      var day = parseInt(token[2], 10);
      date.setUTCFullYear(year, month, day);
      return date
    }

    // YYYY-Www or YYYYWww
    token = parseTokenWww.exec(dateString);
    if (token) {
      week = parseInt(token[1], 10) - 1;
      return dayOfISOYear(year, week)
    }

    // YYYY-Www-D or YYYYWwwD
    token = parseTokenWwwD.exec(dateString);
    if (token) {
      week = parseInt(token[1], 10) - 1;
      var dayOfWeek = parseInt(token[2], 10) - 1;
      return dayOfISOYear(year, week, dayOfWeek)
    }

    // Invalid ISO-formatted date
    return null
  }

  function parseTime (timeString) {
    var token;
    var hours;
    var minutes;

    // hh
    token = parseTokenHH.exec(timeString);
    if (token) {
      hours = parseFloat(token[1].replace(',', '.'));
      return (hours % 24) * MILLISECONDS_IN_HOUR
    }

    // hh:mm or hhmm
    token = parseTokenHHMM.exec(timeString);
    if (token) {
      hours = parseInt(token[1], 10);
      minutes = parseFloat(token[2].replace(',', '.'));
      return (hours % 24) * MILLISECONDS_IN_HOUR +
        minutes * MILLISECONDS_IN_MINUTE
    }

    // hh:mm:ss or hhmmss
    token = parseTokenHHMMSS.exec(timeString);
    if (token) {
      hours = parseInt(token[1], 10);
      minutes = parseInt(token[2], 10);
      var seconds = parseFloat(token[3].replace(',', '.'));
      return (hours % 24) * MILLISECONDS_IN_HOUR +
        minutes * MILLISECONDS_IN_MINUTE +
        seconds * 1000
    }

    // Invalid ISO-formatted time
    return null
  }

  function parseTimezone (timezoneString) {
    var token;
    var absoluteOffset;

    // Z
    token = parseTokenTimezoneZ.exec(timezoneString);
    if (token) {
      return 0
    }

    // ±hh
    token = parseTokenTimezoneHH.exec(timezoneString);
    if (token) {
      absoluteOffset = parseInt(token[2], 10) * 60;
      return (token[1] === '+') ? -absoluteOffset : absoluteOffset
    }

    // ±hh:mm or ±hhmm
    token = parseTokenTimezoneHHMM.exec(timezoneString);
    if (token) {
      absoluteOffset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10);
      return (token[1] === '+') ? -absoluteOffset : absoluteOffset
    }

    return 0
  }

  function dayOfISOYear (isoYear, week, day) {
    week = week || 0;
    day = day || 0;
    var date = new Date(0);
    date.setUTCFullYear(isoYear, 0, 4);
    var fourthOfJanuaryDay = date.getUTCDay() || 7;
    var diff = week * 7 + day + 1 - fourthOfJanuaryDay;
    date.setUTCDate(date.getUTCDate() + diff);
    return date
  }

  var parse_1 = parse;

  /**
   * @category Day Helpers
   * @summary Return the start of a day for the given date.
   *
   * @description
   * Return the start of a day for the given date.
   * The result will be in the local timezone.
   *
   * @param {Date|String|Number} date - the original date
   * @returns {Date} the start of a day
   *
   * @example
   * // The start of a day for 2 September 2014 11:55:00:
   * var result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
   * //=> Tue Sep 02 2014 00:00:00
   */
  function startOfDay (dirtyDate) {
    var date = parse_1(dirtyDate);
    date.setHours(0, 0, 0, 0);
    return date
  }

  var start_of_day = startOfDay;

  var MILLISECONDS_IN_MINUTE$1 = 60000;
  var MILLISECONDS_IN_DAY = 86400000;

  /**
   * @category Day Helpers
   * @summary Get the number of calendar days between the given dates.
   *
   * @description
   * Get the number of calendar days between the given dates.
   *
   * @param {Date|String|Number} dateLeft - the later date
   * @param {Date|String|Number} dateRight - the earlier date
   * @returns {Number} the number of calendar days
   *
   * @example
   * // How many calendar days are between
   * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
   * var result = differenceInCalendarDays(
   *   new Date(2012, 6, 2, 0, 0),
   *   new Date(2011, 6, 2, 23, 0)
   * )
   * //=> 366
   */
  function differenceInCalendarDays (dirtyDateLeft, dirtyDateRight) {
    var startOfDayLeft = start_of_day(dirtyDateLeft);
    var startOfDayRight = start_of_day(dirtyDateRight);

    var timestampLeft = startOfDayLeft.getTime() -
      startOfDayLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE$1;
    var timestampRight = startOfDayRight.getTime() -
      startOfDayRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE$1;

    // Round the number of days to the nearest integer
    // because the number of milliseconds in a day is not constant
    // (e.g. it's different in the day of the daylight saving time clock shift)
    return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY)
  }

  var difference_in_calendar_days = differenceInCalendarDays;

  /**
   * @category Common Helpers
   * @summary Compare the two dates and return -1, 0 or 1.
   *
   * @description
   * Compare the two dates and return 1 if the first date is after the second,
   * -1 if the first date is before the second or 0 if dates are equal.
   *
   * @param {Date|String|Number} dateLeft - the first date to compare
   * @param {Date|String|Number} dateRight - the second date to compare
   * @returns {Number} the result of the comparison
   *
   * @example
   * // Compare 11 February 1987 and 10 July 1989:
   * var result = compareAsc(
   *   new Date(1987, 1, 11),
   *   new Date(1989, 6, 10)
   * )
   * //=> -1
   *
   * @example
   * // Sort the array of dates:
   * var result = [
   *   new Date(1995, 6, 2),
   *   new Date(1987, 1, 11),
   *   new Date(1989, 6, 10)
   * ].sort(compareAsc)
   * //=> [
   * //   Wed Feb 11 1987 00:00:00,
   * //   Mon Jul 10 1989 00:00:00,
   * //   Sun Jul 02 1995 00:00:00
   * // ]
   */
  function compareAsc (dirtyDateLeft, dirtyDateRight) {
    var dateLeft = parse_1(dirtyDateLeft);
    var timeLeft = dateLeft.getTime();
    var dateRight = parse_1(dirtyDateRight);
    var timeRight = dateRight.getTime();

    if (timeLeft < timeRight) {
      return -1
    } else if (timeLeft > timeRight) {
      return 1
    } else {
      return 0
    }
  }

  var compare_asc = compareAsc;

  /**
   * @category Day Helpers
   * @summary Get the number of full days between the given dates.
   *
   * @description
   * Get the number of full days between the given dates.
   *
   * @param {Date|String|Number} dateLeft - the later date
   * @param {Date|String|Number} dateRight - the earlier date
   * @returns {Number} the number of full days
   *
   * @example
   * // How many full days are between
   * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
   * var result = differenceInDays(
   *   new Date(2012, 6, 2, 0, 0),
   *   new Date(2011, 6, 2, 23, 0)
   * )
   * //=> 365
   */
  function differenceInDays (dirtyDateLeft, dirtyDateRight) {
    var dateLeft = parse_1(dirtyDateLeft);
    var dateRight = parse_1(dirtyDateRight);

    var sign = compare_asc(dateLeft, dateRight);
    var difference = Math.abs(difference_in_calendar_days(dateLeft, dateRight));
    dateLeft.setDate(dateLeft.getDate() - sign * difference);

    // Math.abs(diff in full days - diff in calendar days) === 1 if last calendar day is not full
    // If so, result must be decreased by 1 in absolute value
    var isLastDayNotFull = compare_asc(dateLeft, dateRight) === -sign;
    return sign * (difference - isLastDayNotFull)
  }

  var difference_in_days = differenceInDays;

  /* eslint-disable */
  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  var debounce = function (func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
          args = arguments;

      var later = function () {
        timeout = null;
        if (!immediate) { func.apply(context, args); }
      };

      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) { func.apply(context, args); }
    };
  };
  var copyObject = function (obj) {
    return JSON.parse(JSON.stringify(obj));
  };
  var findAncestor = function (element, selector) {
    if (!element) {
      return null;
    }

    if (typeof element.closest === 'function') {
      return element.closest(selector) || null;
    }

    while (element) {
      if (element.matches(selector)) {
        return element;
      }

      element = element.parentElement;
    }

    return null;
  };
  var randomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  };

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var vClickOutside_min_umd = createCommonjsModule(function (module, exports) {
  !function(e,n){module.exports=n();}(commonjsGlobal,function(){var e="ontouchstart"in window||navigator.msMaxTouchPoints>0?["touchstart","click"]:["click"],n=[];function t(n){var t="function"==typeof n;if(!t&&"object"!=typeof n)throw new Error("v-click-outside: Binding value must be a function or an object");return{handler:t?n:n.handler,middleware:n.middleware||function(e){return e},events:n.events||e}}function r(e){var n=e.el,t=e.event,r=e.handler,i=e.middleware;t.target!==n&&!n.contains(t.target)&&i(t,n)&&r(t,n);}var i="undefined"!=typeof window?{bind:function(e,i){var d=t(i.value),o=d.handler,a=d.middleware,u={el:e,eventHandlers:d.events.map(function(n){return{event:n,handler:function(n){return r({event:n,el:e,handler:o,middleware:a})}}})};u.eventHandlers.forEach(function(e){return document.addEventListener(e.event,e.handler)}), n.push(u);},update:function(e,i){var d=t(i.value),o=d.handler,a=d.middleware,u=d.events,c=n.find(function(n){return n.el===e});c.eventHandlers.forEach(function(e){return document.removeEventListener(e.event,e.handler)}), c.eventHandlers=u.map(function(n){return{event:n,handler:function(n){return r({event:n,el:e,handler:o,middleware:a})}}}), c.eventHandlers.forEach(function(e){return document.addEventListener(e.event,e.handler)});},unbind:function(e){n.find(function(n){return n.el===e}).eventHandlers.forEach(function(e){return document.removeEventListener(e.event,e.handler)});},instances:n}:{};return{install:function(e){e.directive("click-outside",i);},directive:i}});

  });

  var ResizeSelect = {
    componentUpdated: resizeSelect,
    inserted: resizeSelect
  };

  function resizeSelect(el, binding, vnode) {
    var select = document.createElement('select');
    select.className = el.className;
    var option = document.createElement('option');
    option.textContent = el.value;
    select.appendChild(option);
    el.parentNode.appendChild(select);
    el.style.width = select.offsetWidth + 'px';
    select.parentNode.removeChild(select);
  }

  /**!
   * @fileOverview Kickass library to create and place poppers near their reference elements.
   * @version 1.16.1
   * @license
   * Copyright (c) 2016 Federico Zivolo and contributors
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */
  var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

  var timeoutDuration = function () {
    var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
    for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
      if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
        return 1;
      }
    }
    return 0;
  }();

  function microtaskDebounce(fn) {
    var called = false;
    return function () {
      if (called) {
        return;
      }
      called = true;
      window.Promise.resolve().then(function () {
        called = false;
        fn();
      });
    };
  }

  function taskDebounce(fn) {
    var scheduled = false;
    return function () {
      if (!scheduled) {
        scheduled = true;
        setTimeout(function () {
          scheduled = false;
          fn();
        }, timeoutDuration);
      }
    };
  }

  var supportsMicroTasks = isBrowser && window.Promise;

  /**
  * Create a debounced version of a method, that's asynchronously deferred
  * but called in the minimum time possible.
  *
  * @method
  * @memberof Popper.Utils
  * @argument {Function} fn
  * @returns {Function}
  */
  var debounce$1 = supportsMicroTasks ? microtaskDebounce : taskDebounce;

  /**
   * Check if the given variable is a function
   * @method
   * @memberof Popper.Utils
   * @argument {Any} functionToCheck - variable to check
   * @returns {Boolean} answer to: is a function?
   */
  function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }

  /**
   * Get CSS computed property of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Eement} element
   * @argument {String} property
   */
  function getStyleComputedProperty(element, property) {
    if (element.nodeType !== 1) {
      return [];
    }
    // NOTE: 1 DOM access here
    var window = element.ownerDocument.defaultView;
    var css = window.getComputedStyle(element, null);
    return property ? css[property] : css;
  }

  /**
   * Returns the parentNode or the host of the element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} parent
   */
  function getParentNode(element) {
    if (element.nodeName === 'HTML') {
      return element;
    }
    return element.parentNode || element.host;
  }

  /**
   * Returns the scrolling parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} scroll parent
   */
  function getScrollParent(element) {
    // Return body, `getScroll` will take care to get the correct `scrollTop` from it
    if (!element) {
      return document.body;
    }

    switch (element.nodeName) {
      case 'HTML':
      case 'BODY':
        return element.ownerDocument.body;
      case '#document':
        return element.body;
    }

    // Firefox want us to check `-x` and `-y` variations as well

    var _getStyleComputedProp = getStyleComputedProperty(element),
        overflow = _getStyleComputedProp.overflow,
        overflowX = _getStyleComputedProp.overflowX,
        overflowY = _getStyleComputedProp.overflowY;

    if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
      return element;
    }

    return getScrollParent(getParentNode(element));
  }

  /**
   * Returns the reference node of the reference object, or the reference object itself.
   * @method
   * @memberof Popper.Utils
   * @param {Element|Object} reference - the reference element (the popper will be relative to this)
   * @returns {Element} parent
   */
  function getReferenceNode(reference) {
    return reference && reference.referenceNode ? reference.referenceNode : reference;
  }

  var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
  var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

  /**
   * Determines if the browser is Internet Explorer
   * @method
   * @memberof Popper.Utils
   * @param {Number} version to check
   * @returns {Boolean} isIE
   */
  function isIE(version) {
    if (version === 11) {
      return isIE11;
    }
    if (version === 10) {
      return isIE10;
    }
    return isIE11 || isIE10;
  }

  /**
   * Returns the offset parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} offset parent
   */
  function getOffsetParent(element) {
    if (!element) {
      return document.documentElement;
    }

    var noOffsetParent = isIE(10) ? document.body : null;

    // NOTE: 1 DOM access here
    var offsetParent = element.offsetParent || null;
    // Skip hidden elements which don't have an offsetParent
    while (offsetParent === noOffsetParent && element.nextElementSibling) {
      offsetParent = (element = element.nextElementSibling).offsetParent;
    }

    var nodeName = offsetParent && offsetParent.nodeName;

    if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
      return element ? element.ownerDocument.documentElement : document.documentElement;
    }

    // .offsetParent will return the closest TH, TD or TABLE in case
    // no offsetParent is present, I hate this job...
    if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
      return getOffsetParent(offsetParent);
    }

    return offsetParent;
  }

  function isOffsetContainer(element) {
    var nodeName = element.nodeName;

    if (nodeName === 'BODY') {
      return false;
    }
    return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
  }

  /**
   * Finds the root node (document, shadowDOM root) of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} node
   * @returns {Element} root node
   */
  function getRoot(node) {
    if (node.parentNode !== null) {
      return getRoot(node.parentNode);
    }

    return node;
  }

  /**
   * Finds the offset parent common to the two provided nodes
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element1
   * @argument {Element} element2
   * @returns {Element} common offset parent
   */
  function findCommonOffsetParent(element1, element2) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
      return document.documentElement;
    }

    // Here we make sure to give as "start" the element that comes first in the DOM
    var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
    var start = order ? element1 : element2;
    var end = order ? element2 : element1;

    // Get common ancestor container
    var range = document.createRange();
    range.setStart(start, 0);
    range.setEnd(end, 0);
    var commonAncestorContainer = range.commonAncestorContainer;

    // Both nodes are inside #document

    if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
      if (isOffsetContainer(commonAncestorContainer)) {
        return commonAncestorContainer;
      }

      return getOffsetParent(commonAncestorContainer);
    }

    // one of the nodes is inside shadowDOM, find which one
    var element1root = getRoot(element1);
    if (element1root.host) {
      return findCommonOffsetParent(element1root.host, element2);
    } else {
      return findCommonOffsetParent(element1, getRoot(element2).host);
    }
  }

  /**
   * Gets the scroll value of the given element in the given side (top and left)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {String} side `top` or `left`
   * @returns {number} amount of scrolled pixels
   */
  function getScroll(element) {
    var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

    var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
    var nodeName = element.nodeName;

    if (nodeName === 'BODY' || nodeName === 'HTML') {
      var html = element.ownerDocument.documentElement;
      var scrollingElement = element.ownerDocument.scrollingElement || html;
      return scrollingElement[upperSide];
    }

    return element[upperSide];
  }

  /*
   * Sum or subtract the element scroll values (left and top) from a given rect object
   * @method
   * @memberof Popper.Utils
   * @param {Object} rect - Rect object you want to change
   * @param {HTMLElement} element - The element from the function reads the scroll values
   * @param {Boolean} subtract - set to true if you want to subtract the scroll values
   * @return {Object} rect - The modifier rect object
   */
  function includeScroll(rect, element) {
    var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var scrollTop = getScroll(element, 'top');
    var scrollLeft = getScroll(element, 'left');
    var modifier = subtract ? -1 : 1;
    rect.top += scrollTop * modifier;
    rect.bottom += scrollTop * modifier;
    rect.left += scrollLeft * modifier;
    rect.right += scrollLeft * modifier;
    return rect;
  }

  /*
   * Helper to detect borders of a given element
   * @method
   * @memberof Popper.Utils
   * @param {CSSStyleDeclaration} styles
   * Result of `getStyleComputedProperty` on the given element
   * @param {String} axis - `x` or `y`
   * @return {number} borders - The borders size of the given axis
   */

  function getBordersSize(styles, axis) {
    var sideA = axis === 'x' ? 'Left' : 'Top';
    var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

    return parseFloat(styles['border' + sideA + 'Width']) + parseFloat(styles['border' + sideB + 'Width']);
  }

  function getSize(axis, body, html, computedStyle) {
    return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
  }

  function getWindowSizes(document) {
    var body = document.body;
    var html = document.documentElement;
    var computedStyle = isIE(10) && getComputedStyle(html);

    return {
      height: getSize('Height', body, html, computedStyle),
      width: getSize('Width', body, html, computedStyle)
    };
  }

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();





  var defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  /**
   * Given element offsets, generate an output similar to getBoundingClientRect
   * @method
   * @memberof Popper.Utils
   * @argument {Object} offsets
   * @returns {Object} ClientRect like output
   */
  function getClientRect(offsets) {
    return _extends({}, offsets, {
      right: offsets.left + offsets.width,
      bottom: offsets.top + offsets.height
    });
  }

  /**
   * Get bounding client rect of given element
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} element
   * @return {Object} client rect
   */
  function getBoundingClientRect(element) {
    var rect = {};

    // IE10 10 FIX: Please, don't ask, the element isn't
    // considered in DOM in some circumstances...
    // This isn't reproducible in IE10 compatibility mode of IE11
    try {
      if (isIE(10)) {
        rect = element.getBoundingClientRect();
        var scrollTop = getScroll(element, 'top');
        var scrollLeft = getScroll(element, 'left');
        rect.top += scrollTop;
        rect.left += scrollLeft;
        rect.bottom += scrollTop;
        rect.right += scrollLeft;
      } else {
        rect = element.getBoundingClientRect();
      }
    } catch (e) {}

    var result = {
      left: rect.left,
      top: rect.top,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };

    // subtract scrollbar size from sizes
    var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
    var width = sizes.width || element.clientWidth || result.width;
    var height = sizes.height || element.clientHeight || result.height;

    var horizScrollbar = element.offsetWidth - width;
    var vertScrollbar = element.offsetHeight - height;

    // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
    // we make this check conditional for performance reasons
    if (horizScrollbar || vertScrollbar) {
      var styles = getStyleComputedProperty(element);
      horizScrollbar -= getBordersSize(styles, 'x');
      vertScrollbar -= getBordersSize(styles, 'y');

      result.width -= horizScrollbar;
      result.height -= vertScrollbar;
    }

    return getClientRect(result);
  }

  function getOffsetRectRelativeToArbitraryNode(children, parent) {
    var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var isIE10 = isIE(10);
    var isHTML = parent.nodeName === 'HTML';
    var childrenRect = getBoundingClientRect(children);
    var parentRect = getBoundingClientRect(parent);
    var scrollParent = getScrollParent(children);

    var styles = getStyleComputedProperty(parent);
    var borderTopWidth = parseFloat(styles.borderTopWidth);
    var borderLeftWidth = parseFloat(styles.borderLeftWidth);

    // In cases where the parent is fixed, we must ignore negative scroll in offset calc
    if (fixedPosition && isHTML) {
      parentRect.top = Math.max(parentRect.top, 0);
      parentRect.left = Math.max(parentRect.left, 0);
    }
    var offsets = getClientRect({
      top: childrenRect.top - parentRect.top - borderTopWidth,
      left: childrenRect.left - parentRect.left - borderLeftWidth,
      width: childrenRect.width,
      height: childrenRect.height
    });
    offsets.marginTop = 0;
    offsets.marginLeft = 0;

    // Subtract margins of documentElement in case it's being used as parent
    // we do this only on HTML because it's the only element that behaves
    // differently when margins are applied to it. The margins are included in
    // the box of the documentElement, in the other cases not.
    if (!isIE10 && isHTML) {
      var marginTop = parseFloat(styles.marginTop);
      var marginLeft = parseFloat(styles.marginLeft);

      offsets.top -= borderTopWidth - marginTop;
      offsets.bottom -= borderTopWidth - marginTop;
      offsets.left -= borderLeftWidth - marginLeft;
      offsets.right -= borderLeftWidth - marginLeft;

      // Attach marginTop and marginLeft because in some circumstances we may need them
      offsets.marginTop = marginTop;
      offsets.marginLeft = marginLeft;
    }

    if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
      offsets = includeScroll(offsets, parent);
    }

    return offsets;
  }

  function getViewportOffsetRectRelativeToArtbitraryNode(element) {
    var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var html = element.ownerDocument.documentElement;
    var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
    var width = Math.max(html.clientWidth, window.innerWidth || 0);
    var height = Math.max(html.clientHeight, window.innerHeight || 0);

    var scrollTop = !excludeScroll ? getScroll(html) : 0;
    var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

    var offset = {
      top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
      left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
      width: width,
      height: height
    };

    return getClientRect(offset);
  }

  /**
   * Check if the given element is fixed or is inside a fixed parent
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {Element} customContainer
   * @returns {Boolean} answer to "isFixed?"
   */
  function isFixed(element) {
    var nodeName = element.nodeName;
    if (nodeName === 'BODY' || nodeName === 'HTML') {
      return false;
    }
    if (getStyleComputedProperty(element, 'position') === 'fixed') {
      return true;
    }
    var parentNode = getParentNode(element);
    if (!parentNode) {
      return false;
    }
    return isFixed(parentNode);
  }

  /**
   * Finds the first parent of an element that has a transformed property defined
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} first transformed parent or documentElement
   */

  function getFixedPositionOffsetParent(element) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element || !element.parentElement || isIE()) {
      return document.documentElement;
    }
    var el = element.parentElement;
    while (el && getStyleComputedProperty(el, 'transform') === 'none') {
      el = el.parentElement;
    }
    return el || document.documentElement;
  }

  /**
   * Computed the boundaries limits and return them
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} popper
   * @param {HTMLElement} reference
   * @param {number} padding
   * @param {HTMLElement} boundariesElement - Element used to define the boundaries
   * @param {Boolean} fixedPosition - Is in fixed position mode
   * @returns {Object} Coordinates of the boundaries
   */
  function getBoundaries(popper, reference, padding, boundariesElement) {
    var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    // NOTE: 1 DOM access here

    var boundaries = { top: 0, left: 0 };
    var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));

    // Handle viewport case
    if (boundariesElement === 'viewport') {
      boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
    } else {
      // Handle other cases based on DOM element used as boundaries
      var boundariesNode = void 0;
      if (boundariesElement === 'scrollParent') {
        boundariesNode = getScrollParent(getParentNode(reference));
        if (boundariesNode.nodeName === 'BODY') {
          boundariesNode = popper.ownerDocument.documentElement;
        }
      } else if (boundariesElement === 'window') {
        boundariesNode = popper.ownerDocument.documentElement;
      } else {
        boundariesNode = boundariesElement;
      }

      var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

      // In case of HTML, we need a different computation
      if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
        var _getWindowSizes = getWindowSizes(popper.ownerDocument),
            height = _getWindowSizes.height,
            width = _getWindowSizes.width;

        boundaries.top += offsets.top - offsets.marginTop;
        boundaries.bottom = height + offsets.top;
        boundaries.left += offsets.left - offsets.marginLeft;
        boundaries.right = width + offsets.left;
      } else {
        // for all the other DOM elements, this one is good
        boundaries = offsets;
      }
    }

    // Add paddings
    padding = padding || 0;
    var isPaddingNumber = typeof padding === 'number';
    boundaries.left += isPaddingNumber ? padding : padding.left || 0;
    boundaries.top += isPaddingNumber ? padding : padding.top || 0;
    boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
    boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

    return boundaries;
  }

  function getArea(_ref) {
    var width = _ref.width,
        height = _ref.height;

    return width * height;
  }

  /**
   * Utility used to transform the `auto` placement to the placement with more
   * available space.
   * @method
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
    var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    if (placement.indexOf('auto') === -1) {
      return placement;
    }

    var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

    var rects = {
      top: {
        width: boundaries.width,
        height: refRect.top - boundaries.top
      },
      right: {
        width: boundaries.right - refRect.right,
        height: boundaries.height
      },
      bottom: {
        width: boundaries.width,
        height: boundaries.bottom - refRect.bottom
      },
      left: {
        width: refRect.left - boundaries.left,
        height: boundaries.height
      }
    };

    var sortedAreas = Object.keys(rects).map(function (key) {
      return _extends({
        key: key
      }, rects[key], {
        area: getArea(rects[key])
      });
    }).sort(function (a, b) {
      return b.area - a.area;
    });

    var filteredAreas = sortedAreas.filter(function (_ref2) {
      var width = _ref2.width,
          height = _ref2.height;
      return width >= popper.clientWidth && height >= popper.clientHeight;
    });

    var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

    var variation = placement.split('-')[1];

    return computedPlacement + (variation ? '-' + variation : '');
  }

  /**
   * Get offsets to the reference element
   * @method
   * @memberof Popper.Utils
   * @param {Object} state
   * @param {Element} popper - the popper element
   * @param {Element} reference - the reference element (the popper will be relative to this)
   * @param {Element} fixedPosition - is in fixed position mode
   * @returns {Object} An object containing the offsets which will be applied to the popper
   */
  function getReferenceOffsets(state, popper, reference) {
    var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
    return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
  }

  /**
   * Get the outer sizes of the given element (offset size + margins)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Object} object containing width and height properties
   */
  function getOuterSizes(element) {
    var window = element.ownerDocument.defaultView;
    var styles = window.getComputedStyle(element);
    var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
    var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
    var result = {
      width: element.offsetWidth + y,
      height: element.offsetHeight + x
    };
    return result;
  }

  /**
   * Get the opposite placement of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement
   * @returns {String} flipped placement
   */
  function getOppositePlacement(placement) {
    var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash[matched];
    });
  }

  /**
   * Get offsets to the popper
   * @method
   * @memberof Popper.Utils
   * @param {Object} position - CSS position the Popper will get applied
   * @param {HTMLElement} popper - the popper element
   * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
   * @param {String} placement - one of the valid placement options
   * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
   */
  function getPopperOffsets(popper, referenceOffsets, placement) {
    placement = placement.split('-')[0];

    // Get popper node sizes
    var popperRect = getOuterSizes(popper);

    // Add position, width and height to our offsets object
    var popperOffsets = {
      width: popperRect.width,
      height: popperRect.height
    };

    // depending by the popper placement we have to compute its offsets slightly differently
    var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
    var mainSide = isHoriz ? 'top' : 'left';
    var secondarySide = isHoriz ? 'left' : 'top';
    var measurement = isHoriz ? 'height' : 'width';
    var secondaryMeasurement = !isHoriz ? 'height' : 'width';

    popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
    if (placement === secondarySide) {
      popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
    } else {
      popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
    }

    return popperOffsets;
  }

  /**
   * Mimics the `find` method of Array
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function find(arr, check) {
    // use native find if supported
    if (Array.prototype.find) {
      return arr.find(check);
    }

    // use `filter` to obtain the same behavior of `find`
    return arr.filter(check)[0];
  }

  /**
   * Return the index of the matching object
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function findIndex(arr, prop, value) {
    // use native findIndex if supported
    if (Array.prototype.findIndex) {
      return arr.findIndex(function (cur) {
        return cur[prop] === value;
      });
    }

    // use `find` + `indexOf` if `findIndex` isn't supported
    var match = find(arr, function (obj) {
      return obj[prop] === value;
    });
    return arr.indexOf(match);
  }

  /**
   * Loop trough the list of modifiers and run them in order,
   * each of them will then edit the data object.
   * @method
   * @memberof Popper.Utils
   * @param {dataObject} data
   * @param {Array} modifiers
   * @param {String} ends - Optional modifier name used as stopper
   * @returns {dataObject}
   */
  function runModifiers(modifiers, data, ends) {
    var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

    modifiersToRun.forEach(function (modifier) {
      if (modifier['function']) {
        // eslint-disable-line dot-notation
        console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
      }
      var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
      if (modifier.enabled && isFunction(fn)) {
        // Add properties to offsets to make them a complete clientRect object
        // we do this before each modifier to make sure the previous one doesn't
        // mess with these values
        data.offsets.popper = getClientRect(data.offsets.popper);
        data.offsets.reference = getClientRect(data.offsets.reference);

        data = fn(data, modifier);
      }
    });

    return data;
  }

  /**
   * Updates the position of the popper, computing the new offsets and applying
   * the new style.<br />
   * Prefer `scheduleUpdate` over `update` because of performance reasons.
   * @method
   * @memberof Popper
   */
  function update() {
    // if popper is destroyed, don't perform any further update
    if (this.state.isDestroyed) {
      return;
    }

    var data = {
      instance: this,
      styles: {},
      arrowStyles: {},
      attributes: {},
      flipped: false,
      offsets: {}
    };

    // compute reference element offsets
    data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

    // store the computed placement inside `originalPlacement`
    data.originalPlacement = data.placement;

    data.positionFixed = this.options.positionFixed;

    // compute the popper offsets
    data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

    data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

    // run the modifiers
    data = runModifiers(this.modifiers, data);

    // the first `update` will call `onCreate` callback
    // the other ones will call `onUpdate` callback
    if (!this.state.isCreated) {
      this.state.isCreated = true;
      this.options.onCreate(data);
    } else {
      this.options.onUpdate(data);
    }
  }

  /**
   * Helper used to know if the given modifier is enabled.
   * @method
   * @memberof Popper.Utils
   * @returns {Boolean}
   */
  function isModifierEnabled(modifiers, modifierName) {
    return modifiers.some(function (_ref) {
      var name = _ref.name,
          enabled = _ref.enabled;
      return enabled && name === modifierName;
    });
  }

  /**
   * Get the prefixed supported property name
   * @method
   * @memberof Popper.Utils
   * @argument {String} property (camelCase)
   * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
   */
  function getSupportedPropertyName(property) {
    var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
    var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

    for (var i = 0; i < prefixes.length; i++) {
      var prefix = prefixes[i];
      var toCheck = prefix ? '' + prefix + upperProp : property;
      if (typeof document.body.style[toCheck] !== 'undefined') {
        return toCheck;
      }
    }
    return null;
  }

  /**
   * Destroys the popper.
   * @method
   * @memberof Popper
   */
  function destroy() {
    this.state.isDestroyed = true;

    // touch DOM only if `applyStyle` modifier is enabled
    if (isModifierEnabled(this.modifiers, 'applyStyle')) {
      this.popper.removeAttribute('x-placement');
      this.popper.style.position = '';
      this.popper.style.top = '';
      this.popper.style.left = '';
      this.popper.style.right = '';
      this.popper.style.bottom = '';
      this.popper.style.willChange = '';
      this.popper.style[getSupportedPropertyName('transform')] = '';
    }

    this.disableEventListeners();

    // remove the popper if user explicitly asked for the deletion on destroy
    // do not use `remove` because IE11 doesn't support it
    if (this.options.removeOnDestroy) {
      this.popper.parentNode.removeChild(this.popper);
    }
    return this;
  }

  /**
   * Get the window associated with the element
   * @argument {Element} element
   * @returns {Window}
   */
  function getWindow(element) {
    var ownerDocument = element.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView : window;
  }

  function attachToScrollParents(scrollParent, event, callback, scrollParents) {
    var isBody = scrollParent.nodeName === 'BODY';
    var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
    target.addEventListener(event, callback, { passive: true });

    if (!isBody) {
      attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
    }
    scrollParents.push(target);
  }

  /**
   * Setup needed event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function setupEventListeners(reference, options, state, updateBound) {
    // Resize event listener on window
    state.updateBound = updateBound;
    getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

    // Scroll event listener on scroll parents
    var scrollElement = getScrollParent(reference);
    attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
    state.scrollElement = scrollElement;
    state.eventsEnabled = true;

    return state;
  }

  /**
   * It will add resize/scroll events and start recalculating
   * position of the popper element when they are triggered.
   * @method
   * @memberof Popper
   */
  function enableEventListeners() {
    if (!this.state.eventsEnabled) {
      this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
    }
  }

  /**
   * Remove event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function removeEventListeners(reference, state) {
    // Remove resize event listener on window
    getWindow(reference).removeEventListener('resize', state.updateBound);

    // Remove scroll event listener on scroll parents
    state.scrollParents.forEach(function (target) {
      target.removeEventListener('scroll', state.updateBound);
    });

    // Reset state
    state.updateBound = null;
    state.scrollParents = [];
    state.scrollElement = null;
    state.eventsEnabled = false;
    return state;
  }

  /**
   * It will remove resize/scroll events and won't recalculate popper position
   * when they are triggered. It also won't trigger `onUpdate` callback anymore,
   * unless you call `update` method manually.
   * @method
   * @memberof Popper
   */
  function disableEventListeners() {
    if (this.state.eventsEnabled) {
      cancelAnimationFrame(this.scheduleUpdate);
      this.state = removeEventListeners(this.reference, this.state);
    }
  }

  /**
   * Tells if a given input is a number
   * @method
   * @memberof Popper.Utils
   * @param {*} input to check
   * @return {Boolean}
   */
  function isNumeric(n) {
    return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
  }

  /**
   * Set the style to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the style to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setStyles(element, styles) {
    Object.keys(styles).forEach(function (prop) {
      var unit = '';
      // add unit if the value is numeric and is one of the following
      if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
        unit = 'px';
      }
      element.style[prop] = styles[prop] + unit;
    });
  }

  /**
   * Set the attributes to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the attributes to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(function (prop) {
      var value = attributes[prop];
      if (value !== false) {
        element.setAttribute(prop, attributes[prop]);
      } else {
        element.removeAttribute(prop);
      }
    });
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} data.styles - List of style properties - values to apply to popper element
   * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The same data object
   */
  function applyStyle(data) {
    // any property present in `data.styles` will be applied to the popper,
    // in this way we can make the 3rd party modifiers add custom styles to it
    // Be aware, modifiers could override the properties defined in the previous
    // lines of this modifier!
    setStyles(data.instance.popper, data.styles);

    // any property present in `data.attributes` will be applied to the popper,
    // they will be set as HTML attributes of the element
    setAttributes(data.instance.popper, data.attributes);

    // if arrowElement is defined and arrowStyles has some properties
    if (data.arrowElement && Object.keys(data.arrowStyles).length) {
      setStyles(data.arrowElement, data.arrowStyles);
    }

    return data;
  }

  /**
   * Set the x-placement attribute before everything else because it could be used
   * to add margins to the popper margins needs to be calculated to get the
   * correct popper offsets.
   * @method
   * @memberof Popper.modifiers
   * @param {HTMLElement} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper
   * @param {Object} options - Popper.js options
   */
  function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
    // compute reference element offsets
    var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

    popper.setAttribute('x-placement', placement);

    // Apply `position` to popper before anything else because
    // without the position applied we can't guarantee correct computations
    setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

    return options;
  }

  /**
   * @function
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Boolean} shouldRound - If the offsets should be rounded at all
   * @returns {Object} The popper's position offsets rounded
   *
   * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
   * good as it can be within reason.
   * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
   *
   * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
   * as well on High DPI screens).
   *
   * Firefox prefers no rounding for positioning and does not have blurriness on
   * high DPI screens.
   *
   * Only horizontal placement and left/right values need to be considered.
   */
  function getRoundedOffsets(data, shouldRound) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var round = Math.round,
        floor = Math.floor;

    var noRound = function noRound(v) {
      return v;
    };

    var referenceWidth = round(reference.width);
    var popperWidth = round(popper.width);

    var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
    var isVariation = data.placement.indexOf('-') !== -1;
    var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
    var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

    var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
    var verticalToInteger = !shouldRound ? noRound : round;

    return {
      left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
      top: verticalToInteger(popper.top),
      bottom: verticalToInteger(popper.bottom),
      right: horizontalToInteger(popper.right)
    };
  }

  var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeStyle(data, options) {
    var x = options.x,
        y = options.y;
    var popper = data.offsets.popper;

    // Remove this legacy support in Popper.js v2

    var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'applyStyle';
    }).gpuAcceleration;
    if (legacyGpuAccelerationOption !== undefined) {
      console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
    }
    var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

    var offsetParent = getOffsetParent(data.instance.popper);
    var offsetParentRect = getBoundingClientRect(offsetParent);

    // Styles
    var styles = {
      position: popper.position
    };

    var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

    var sideA = x === 'bottom' ? 'top' : 'bottom';
    var sideB = y === 'right' ? 'left' : 'right';

    // if gpuAcceleration is set to `true` and transform is supported,
    //  we use `translate3d` to apply the position to the popper we
    // automatically use the supported prefixed version if needed
    var prefixedProperty = getSupportedPropertyName('transform');

    // now, let's make a step back and look at this code closely (wtf?)
    // If the content of the popper grows once it's been positioned, it
    // may happen that the popper gets misplaced because of the new content
    // overflowing its reference element
    // To avoid this problem, we provide two options (x and y), which allow
    // the consumer to define the offset origin.
    // If we position a popper on top of a reference element, we can set
    // `x` to `top` to make the popper grow towards its top instead of
    // its bottom.
    var left = void 0,
        top = void 0;
    if (sideA === 'bottom') {
      // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
      // and not the bottom of the html element
      if (offsetParent.nodeName === 'HTML') {
        top = -offsetParent.clientHeight + offsets.bottom;
      } else {
        top = -offsetParentRect.height + offsets.bottom;
      }
    } else {
      top = offsets.top;
    }
    if (sideB === 'right') {
      if (offsetParent.nodeName === 'HTML') {
        left = -offsetParent.clientWidth + offsets.right;
      } else {
        left = -offsetParentRect.width + offsets.right;
      }
    } else {
      left = offsets.left;
    }
    if (gpuAcceleration && prefixedProperty) {
      styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
      styles[sideA] = 0;
      styles[sideB] = 0;
      styles.willChange = 'transform';
    } else {
      // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
      var invertTop = sideA === 'bottom' ? -1 : 1;
      var invertLeft = sideB === 'right' ? -1 : 1;
      styles[sideA] = top * invertTop;
      styles[sideB] = left * invertLeft;
      styles.willChange = sideA + ', ' + sideB;
    }

    // Attributes
    var attributes = {
      'x-placement': data.placement
    };

    // Update `data` attributes, styles and arrowStyles
    data.attributes = _extends({}, attributes, data.attributes);
    data.styles = _extends({}, styles, data.styles);
    data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

    return data;
  }

  /**
   * Helper used to know if the given modifier depends from another one.<br />
   * It checks if the needed modifier is listed and enabled.
   * @method
   * @memberof Popper.Utils
   * @param {Array} modifiers - list of modifiers
   * @param {String} requestingName - name of requesting modifier
   * @param {String} requestedName - name of requested modifier
   * @returns {Boolean}
   */
  function isModifierRequired(modifiers, requestingName, requestedName) {
    var requesting = find(modifiers, function (_ref) {
      var name = _ref.name;
      return name === requestingName;
    });

    var isRequired = !!requesting && modifiers.some(function (modifier) {
      return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
    });

    if (!isRequired) {
      var _requesting = '`' + requestingName + '`';
      var requested = '`' + requestedName + '`';
      console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
    }
    return isRequired;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function arrow(data, options) {
    var _data$offsets$arrow;

    // arrow depends on keepTogether in order to work
    if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
      return data;
    }

    var arrowElement = options.element;

    // if arrowElement is a string, suppose it's a CSS selector
    if (typeof arrowElement === 'string') {
      arrowElement = data.instance.popper.querySelector(arrowElement);

      // if arrowElement is not found, don't run the modifier
      if (!arrowElement) {
        return data;
      }
    } else {
      // if the arrowElement isn't a query selector we must check that the
      // provided DOM node is child of its popper node
      if (!data.instance.popper.contains(arrowElement)) {
        console.warn('WARNING: `arrow.element` must be child of its popper element!');
        return data;
      }
    }

    var placement = data.placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var isVertical = ['left', 'right'].indexOf(placement) !== -1;

    var len = isVertical ? 'height' : 'width';
    var sideCapitalized = isVertical ? 'Top' : 'Left';
    var side = sideCapitalized.toLowerCase();
    var altSide = isVertical ? 'left' : 'top';
    var opSide = isVertical ? 'bottom' : 'right';
    var arrowElementSize = getOuterSizes(arrowElement)[len];

    //
    // extends keepTogether behavior making sure the popper and its
    // reference have enough pixels in conjunction
    //

    // top/left side
    if (reference[opSide] - arrowElementSize < popper[side]) {
      data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
    }
    // bottom/right side
    if (reference[side] + arrowElementSize > popper[opSide]) {
      data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
    }
    data.offsets.popper = getClientRect(data.offsets.popper);

    // compute center of the popper
    var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

    // Compute the sideValue using the updated popper offsets
    // take popper margin in account because we don't have this info available
    var css = getStyleComputedProperty(data.instance.popper);
    var popperMarginSide = parseFloat(css['margin' + sideCapitalized]);
    var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width']);
    var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

    // prevent arrowElement from being placed not contiguously to its popper
    sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

    data.arrowElement = arrowElement;
    data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

    return data;
  }

  /**
   * Get the opposite placement variation of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement variation
   * @returns {String} flipped placement variation
   */
  function getOppositeVariation(variation) {
    if (variation === 'end') {
      return 'start';
    } else if (variation === 'start') {
      return 'end';
    }
    return variation;
  }

  /**
   * List of accepted placements to use as values of the `placement` option.<br />
   * Valid placements are:
   * - `auto`
   * - `top`
   * - `right`
   * - `bottom`
   * - `left`
   *
   * Each placement can have a variation from this list:
   * - `-start`
   * - `-end`
   *
   * Variations are interpreted easily if you think of them as the left to right
   * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
   * is right.<br />
   * Vertically (`left` and `right`), `start` is top and `end` is bottom.
   *
   * Some valid examples are:
   * - `top-end` (on top of reference, right aligned)
   * - `right-start` (on right of reference, top aligned)
   * - `bottom` (on bottom, centered)
   * - `auto-end` (on the side with more space available, alignment depends by placement)
   *
   * @static
   * @type {Array}
   * @enum {String}
   * @readonly
   * @method placements
   * @memberof Popper
   */
  var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

  // Get rid of `auto` `auto-start` and `auto-end`
  var validPlacements = placements.slice(3);

  /**
   * Given an initial placement, returns all the subsequent placements
   * clockwise (or counter-clockwise).
   *
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement - A valid placement (it accepts variations)
   * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
   * @returns {Array} placements including their variations
   */
  function clockwise(placement) {
    var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var index = validPlacements.indexOf(placement);
    var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
    return counter ? arr.reverse() : arr;
  }

  var BEHAVIORS = {
    FLIP: 'flip',
    CLOCKWISE: 'clockwise',
    COUNTERCLOCKWISE: 'counterclockwise'
  };

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function flip(data, options) {
    // if `inner` modifier is enabled, we can't use the `flip` modifier
    if (isModifierEnabled(data.instance.modifiers, 'inner')) {
      return data;
    }

    if (data.flipped && data.placement === data.originalPlacement) {
      // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
      return data;
    }

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

    var placement = data.placement.split('-')[0];
    var placementOpposite = getOppositePlacement(placement);
    var variation = data.placement.split('-')[1] || '';

    var flipOrder = [];

    switch (options.behavior) {
      case BEHAVIORS.FLIP:
        flipOrder = [placement, placementOpposite];
        break;
      case BEHAVIORS.CLOCKWISE:
        flipOrder = clockwise(placement);
        break;
      case BEHAVIORS.COUNTERCLOCKWISE:
        flipOrder = clockwise(placement, true);
        break;
      default:
        flipOrder = options.behavior;
    }

    flipOrder.forEach(function (step, index) {
      if (placement !== step || flipOrder.length === index + 1) {
        return data;
      }

      placement = data.placement.split('-')[0];
      placementOpposite = getOppositePlacement(placement);

      var popperOffsets = data.offsets.popper;
      var refOffsets = data.offsets.reference;

      // using floor because the reference offsets may contain decimals we are not going to consider here
      var floor = Math.floor;
      var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

      var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
      var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
      var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
      var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

      var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

      // flip the variation if required
      var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

      // flips variation if reference element overflows boundaries
      var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

      // flips variation if popper content overflows boundaries
      var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

      var flippedVariation = flippedVariationByRef || flippedVariationByContent;

      if (overlapsRef || overflowsBoundaries || flippedVariation) {
        // this boolean to detect any flip loop
        data.flipped = true;

        if (overlapsRef || overflowsBoundaries) {
          placement = flipOrder[index + 1];
        }

        if (flippedVariation) {
          variation = getOppositeVariation(variation);
        }

        data.placement = placement + (variation ? '-' + variation : '');

        // this object contains `position`, we want to preserve it along with
        // any additional property we may add in the future
        data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

        data = runModifiers(data.instance.modifiers, data, 'flip');
      }
    });
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function keepTogether(data) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var placement = data.placement.split('-')[0];
    var floor = Math.floor;
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var side = isVertical ? 'right' : 'bottom';
    var opSide = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    if (popper[side] < floor(reference[opSide])) {
      data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
    }
    if (popper[opSide] > floor(reference[side])) {
      data.offsets.popper[opSide] = floor(reference[side]);
    }

    return data;
  }

  /**
   * Converts a string containing value + unit into a px value number
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} str - Value + unit string
   * @argument {String} measurement - `height` or `width`
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @returns {Number|String}
   * Value in pixels, or original string if no values were extracted
   */
  function toValue(str, measurement, popperOffsets, referenceOffsets) {
    // separate value from unit
    var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
    var value = +split[1];
    var unit = split[2];

    // If it's not a number it's an operator, I guess
    if (!value) {
      return str;
    }

    if (unit.indexOf('%') === 0) {
      var element = void 0;
      switch (unit) {
        case '%p':
          element = popperOffsets;
          break;
        case '%':
        case '%r':
        default:
          element = referenceOffsets;
      }

      var rect = getClientRect(element);
      return rect[measurement] / 100 * value;
    } else if (unit === 'vh' || unit === 'vw') {
      // if is a vh or vw, we calculate the size based on the viewport
      var size = void 0;
      if (unit === 'vh') {
        size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      } else {
        size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      }
      return size / 100 * value;
    } else {
      // if is an explicit pixel unit, we get rid of the unit and keep the value
      // if is an implicit unit, it's px, and we return just the value
      return value;
    }
  }

  /**
   * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} offset
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @argument {String} basePlacement
   * @returns {Array} a two cells array with x and y offsets in numbers
   */
  function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
    var offsets = [0, 0];

    // Use height if placement is left or right and index is 0 otherwise use width
    // in this way the first offset will use an axis and the second one
    // will use the other one
    var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

    // Split the offset string to obtain a list of values and operands
    // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
    var fragments = offset.split(/(\+|\-)/).map(function (frag) {
      return frag.trim();
    });

    // Detect if the offset string contains a pair of values or a single one
    // they could be separated by comma or space
    var divider = fragments.indexOf(find(fragments, function (frag) {
      return frag.search(/,|\s/) !== -1;
    }));

    if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
      console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
    }

    // If divider is found, we divide the list of values and operands to divide
    // them by ofset X and Y.
    var splitRegex = /\s*,\s*|\s+/;
    var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

    // Convert the values with units to absolute pixels to allow our computations
    ops = ops.map(function (op, index) {
      // Most of the units rely on the orientation of the popper
      var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
      var mergeWithPrevious = false;
      return op
      // This aggregates any `+` or `-` sign that aren't considered operators
      // e.g.: 10 + +5 => [10, +, +5]
      .reduce(function (a, b) {
        if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
          a[a.length - 1] = b;
          mergeWithPrevious = true;
          return a;
        } else if (mergeWithPrevious) {
          a[a.length - 1] += b;
          mergeWithPrevious = false;
          return a;
        } else {
          return a.concat(b);
        }
      }, [])
      // Here we convert the string values into number values (in px)
      .map(function (str) {
        return toValue(str, measurement, popperOffsets, referenceOffsets);
      });
    });

    // Loop trough the offsets arrays and execute the operations
    ops.forEach(function (op, index) {
      op.forEach(function (frag, index2) {
        if (isNumeric(frag)) {
          offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
        }
      });
    });
    return offsets;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @argument {Number|String} options.offset=0
   * The offset value as described in the modifier description
   * @returns {Object} The data object, properly modified
   */
  function offset(data, _ref) {
    var offset = _ref.offset;
    var placement = data.placement,
        _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var basePlacement = placement.split('-')[0];

    var offsets = void 0;
    if (isNumeric(+offset)) {
      offsets = [+offset, 0];
    } else {
      offsets = parseOffset(offset, popper, reference, basePlacement);
    }

    if (basePlacement === 'left') {
      popper.top += offsets[0];
      popper.left -= offsets[1];
    } else if (basePlacement === 'right') {
      popper.top += offsets[0];
      popper.left += offsets[1];
    } else if (basePlacement === 'top') {
      popper.left += offsets[0];
      popper.top -= offsets[1];
    } else if (basePlacement === 'bottom') {
      popper.left += offsets[0];
      popper.top += offsets[1];
    }

    data.popper = popper;
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function preventOverflow(data, options) {
    var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

    // If offsetParent is the reference element, we really want to
    // go one step up and use the next offsetParent as reference to
    // avoid to make this modifier completely useless and look like broken
    if (data.instance.reference === boundariesElement) {
      boundariesElement = getOffsetParent(boundariesElement);
    }

    // NOTE: DOM access here
    // resets the popper's position so that the document size can be calculated excluding
    // the size of the popper element itself
    var transformProp = getSupportedPropertyName('transform');
    var popperStyles = data.instance.popper.style; // assignment to help minification
    var top = popperStyles.top,
        left = popperStyles.left,
        transform = popperStyles[transformProp];

    popperStyles.top = '';
    popperStyles.left = '';
    popperStyles[transformProp] = '';

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

    // NOTE: DOM access here
    // restores the original style properties after the offsets have been computed
    popperStyles.top = top;
    popperStyles.left = left;
    popperStyles[transformProp] = transform;

    options.boundaries = boundaries;

    var order = options.priority;
    var popper = data.offsets.popper;

    var check = {
      primary: function primary(placement) {
        var value = popper[placement];
        if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
          value = Math.max(popper[placement], boundaries[placement]);
        }
        return defineProperty({}, placement, value);
      },
      secondary: function secondary(placement) {
        var mainSide = placement === 'right' ? 'left' : 'top';
        var value = popper[mainSide];
        if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
          value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
        }
        return defineProperty({}, mainSide, value);
      }
    };

    order.forEach(function (placement) {
      var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
      popper = _extends({}, popper, check[side](placement));
    });

    data.offsets.popper = popper;

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function shift(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var shiftvariation = placement.split('-')[1];

    // if shift shiftvariation is specified, run the modifier
    if (shiftvariation) {
      var _data$offsets = data.offsets,
          reference = _data$offsets.reference,
          popper = _data$offsets.popper;

      var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
      var side = isVertical ? 'left' : 'top';
      var measurement = isVertical ? 'width' : 'height';

      var shiftOffsets = {
        start: defineProperty({}, side, reference[side]),
        end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
      };

      data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function hide(data) {
    if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
      return data;
    }

    var refRect = data.offsets.reference;
    var bound = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'preventOverflow';
    }).boundaries;

    if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === true) {
        return data;
      }

      data.hide = true;
      data.attributes['x-out-of-boundaries'] = '';
    } else {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === false) {
        return data;
      }

      data.hide = false;
      data.attributes['x-out-of-boundaries'] = false;
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function inner(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

    var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

    popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

    data.placement = getOppositePlacement(placement);
    data.offsets.popper = getClientRect(popper);

    return data;
  }

  /**
   * Modifier function, each modifier can have a function of this type assigned
   * to its `fn` property.<br />
   * These functions will be called on each update, this means that you must
   * make sure they are performant enough to avoid performance bottlenecks.
   *
   * @function ModifierFn
   * @argument {dataObject} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {dataObject} The data object, properly modified
   */

  /**
   * Modifiers are plugins used to alter the behavior of your poppers.<br />
   * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
   * needed by the library.
   *
   * Usually you don't want to override the `order`, `fn` and `onLoad` props.
   * All the other properties are configurations that could be tweaked.
   * @namespace modifiers
   */
  var modifiers = {
    /**
     * Modifier used to shift the popper on the start or end of its reference
     * element.<br />
     * It will read the variation of the `placement` property.<br />
     * It can be one either `-end` or `-start`.
     * @memberof modifiers
     * @inner
     */
    shift: {
      /** @prop {number} order=100 - Index used to define the order of execution */
      order: 100,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: shift
    },

    /**
     * The `offset` modifier can shift your popper on both its axis.
     *
     * It accepts the following units:
     * - `px` or unit-less, interpreted as pixels
     * - `%` or `%r`, percentage relative to the length of the reference element
     * - `%p`, percentage relative to the length of the popper element
     * - `vw`, CSS viewport width unit
     * - `vh`, CSS viewport height unit
     *
     * For length is intended the main axis relative to the placement of the popper.<br />
     * This means that if the placement is `top` or `bottom`, the length will be the
     * `width`. In case of `left` or `right`, it will be the `height`.
     *
     * You can provide a single value (as `Number` or `String`), or a pair of values
     * as `String` divided by a comma or one (or more) white spaces.<br />
     * The latter is a deprecated method because it leads to confusion and will be
     * removed in v2.<br />
     * Additionally, it accepts additions and subtractions between different units.
     * Note that multiplications and divisions aren't supported.
     *
     * Valid examples are:
     * ```
     * 10
     * '10%'
     * '10, 10'
     * '10%, 10'
     * '10 + 10%'
     * '10 - 5vh + 3%'
     * '-10px + 5vh, 5px - 6%'
     * ```
     * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
     * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
     * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
     *
     * @memberof modifiers
     * @inner
     */
    offset: {
      /** @prop {number} order=200 - Index used to define the order of execution */
      order: 200,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: offset,
      /** @prop {Number|String} offset=0
       * The offset value as described in the modifier description
       */
      offset: 0
    },

    /**
     * Modifier used to prevent the popper from being positioned outside the boundary.
     *
     * A scenario exists where the reference itself is not within the boundaries.<br />
     * We can say it has "escaped the boundaries" — or just "escaped".<br />
     * In this case we need to decide whether the popper should either:
     *
     * - detach from the reference and remain "trapped" in the boundaries, or
     * - if it should ignore the boundary and "escape with its reference"
     *
     * When `escapeWithReference` is set to`true` and reference is completely
     * outside its boundaries, the popper will overflow (or completely leave)
     * the boundaries in order to remain attached to the edge of the reference.
     *
     * @memberof modifiers
     * @inner
     */
    preventOverflow: {
      /** @prop {number} order=300 - Index used to define the order of execution */
      order: 300,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: preventOverflow,
      /**
       * @prop {Array} [priority=['left','right','top','bottom']]
       * Popper will try to prevent overflow following these priorities by default,
       * then, it could overflow on the left and on top of the `boundariesElement`
       */
      priority: ['left', 'right', 'top', 'bottom'],
      /**
       * @prop {number} padding=5
       * Amount of pixel used to define a minimum distance between the boundaries
       * and the popper. This makes sure the popper always has a little padding
       * between the edges of its container
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='scrollParent'
       * Boundaries used by the modifier. Can be `scrollParent`, `window`,
       * `viewport` or any DOM element.
       */
      boundariesElement: 'scrollParent'
    },

    /**
     * Modifier used to make sure the reference and its popper stay near each other
     * without leaving any gap between the two. Especially useful when the arrow is
     * enabled and you want to ensure that it points to its reference element.
     * It cares only about the first axis. You can still have poppers with margin
     * between the popper and its reference element.
     * @memberof modifiers
     * @inner
     */
    keepTogether: {
      /** @prop {number} order=400 - Index used to define the order of execution */
      order: 400,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: keepTogether
    },

    /**
     * This modifier is used to move the `arrowElement` of the popper to make
     * sure it is positioned between the reference element and its popper element.
     * It will read the outer size of the `arrowElement` node to detect how many
     * pixels of conjunction are needed.
     *
     * It has no effect if no `arrowElement` is provided.
     * @memberof modifiers
     * @inner
     */
    arrow: {
      /** @prop {number} order=500 - Index used to define the order of execution */
      order: 500,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: arrow,
      /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
      element: '[x-arrow]'
    },

    /**
     * Modifier used to flip the popper's placement when it starts to overlap its
     * reference element.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     *
     * **NOTE:** this modifier will interrupt the current update cycle and will
     * restart it if it detects the need to flip the placement.
     * @memberof modifiers
     * @inner
     */
    flip: {
      /** @prop {number} order=600 - Index used to define the order of execution */
      order: 600,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: flip,
      /**
       * @prop {String|Array} behavior='flip'
       * The behavior used to change the popper's placement. It can be one of
       * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
       * placements (with optional variations)
       */
      behavior: 'flip',
      /**
       * @prop {number} padding=5
       * The popper will flip if it hits the edges of the `boundariesElement`
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='viewport'
       * The element which will define the boundaries of the popper position.
       * The popper will never be placed outside of the defined boundaries
       * (except if `keepTogether` is enabled)
       */
      boundariesElement: 'viewport',
      /**
       * @prop {Boolean} flipVariations=false
       * The popper will switch placement variation between `-start` and `-end` when
       * the reference element overlaps its boundaries.
       *
       * The original placement should have a set variation.
       */
      flipVariations: false,
      /**
       * @prop {Boolean} flipVariationsByContent=false
       * The popper will switch placement variation between `-start` and `-end` when
       * the popper element overlaps its reference boundaries.
       *
       * The original placement should have a set variation.
       */
      flipVariationsByContent: false
    },

    /**
     * Modifier used to make the popper flow toward the inner of the reference element.
     * By default, when this modifier is disabled, the popper will be placed outside
     * the reference element.
     * @memberof modifiers
     * @inner
     */
    inner: {
      /** @prop {number} order=700 - Index used to define the order of execution */
      order: 700,
      /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
      enabled: false,
      /** @prop {ModifierFn} */
      fn: inner
    },

    /**
     * Modifier used to hide the popper when its reference element is outside of the
     * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
     * be used to hide with a CSS selector the popper when its reference is
     * out of boundaries.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     * @memberof modifiers
     * @inner
     */
    hide: {
      /** @prop {number} order=800 - Index used to define the order of execution */
      order: 800,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: hide
    },

    /**
     * Computes the style that will be applied to the popper element to gets
     * properly positioned.
     *
     * Note that this modifier will not touch the DOM, it just prepares the styles
     * so that `applyStyle` modifier can apply it. This separation is useful
     * in case you need to replace `applyStyle` with a custom implementation.
     *
     * This modifier has `850` as `order` value to maintain backward compatibility
     * with previous versions of Popper.js. Expect the modifiers ordering method
     * to change in future major versions of the library.
     *
     * @memberof modifiers
     * @inner
     */
    computeStyle: {
      /** @prop {number} order=850 - Index used to define the order of execution */
      order: 850,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: computeStyle,
      /**
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: true,
      /**
       * @prop {string} [x='bottom']
       * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
       * Change this if your popper should grow in a direction different from `bottom`
       */
      x: 'bottom',
      /**
       * @prop {string} [x='left']
       * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
       * Change this if your popper should grow in a direction different from `right`
       */
      y: 'right'
    },

    /**
     * Applies the computed styles to the popper element.
     *
     * All the DOM manipulations are limited to this modifier. This is useful in case
     * you want to integrate Popper.js inside a framework or view library and you
     * want to delegate all the DOM manipulations to it.
     *
     * Note that if you disable this modifier, you must make sure the popper element
     * has its position set to `absolute` before Popper.js can do its work!
     *
     * Just disable this modifier and define your own to achieve the desired effect.
     *
     * @memberof modifiers
     * @inner
     */
    applyStyle: {
      /** @prop {number} order=900 - Index used to define the order of execution */
      order: 900,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: applyStyle,
      /** @prop {Function} */
      onLoad: applyStyleOnLoad,
      /**
       * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: undefined
    }
  };

  /**
   * The `dataObject` is an object containing all the information used by Popper.js.
   * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
   * @name dataObject
   * @property {Object} data.instance The Popper.js instance
   * @property {String} data.placement Placement applied to popper
   * @property {String} data.originalPlacement Placement originally defined on init
   * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
   * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
   * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
   * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.boundaries Offsets of the popper boundaries
   * @property {Object} data.offsets The measurements of popper, reference and arrow elements
   * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
   */

  /**
   * Default options provided to Popper.js constructor.<br />
   * These can be overridden using the `options` argument of Popper.js.<br />
   * To override an option, simply pass an object with the same
   * structure of the `options` object, as the 3rd argument. For example:
   * ```
   * new Popper(ref, pop, {
   *   modifiers: {
   *     preventOverflow: { enabled: false }
   *   }
   * })
   * ```
   * @type {Object}
   * @static
   * @memberof Popper
   */
  var Defaults = {
    /**
     * Popper's placement.
     * @prop {Popper.placements} placement='bottom'
     */
    placement: 'bottom',

    /**
     * Set this to true if you want popper to position it self in 'fixed' mode
     * @prop {Boolean} positionFixed=false
     */
    positionFixed: false,

    /**
     * Whether events (resize, scroll) are initially enabled.
     * @prop {Boolean} eventsEnabled=true
     */
    eventsEnabled: true,

    /**
     * Set to true if you want to automatically remove the popper when
     * you call the `destroy` method.
     * @prop {Boolean} removeOnDestroy=false
     */
    removeOnDestroy: false,

    /**
     * Callback called when the popper is created.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onCreate}
     */
    onCreate: function onCreate() {},

    /**
     * Callback called when the popper is updated. This callback is not called
     * on the initialization/creation of the popper, but only on subsequent
     * updates.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onUpdate}
     */
    onUpdate: function onUpdate() {},

    /**
     * List of modifiers used to modify the offsets before they are applied to the popper.
     * They provide most of the functionalities of Popper.js.
     * @prop {modifiers}
     */
    modifiers: modifiers
  };

  /**
   * @callback onCreate
   * @param {dataObject} data
   */

  /**
   * @callback onUpdate
   * @param {dataObject} data
   */

  // Utils
  // Methods
  var Popper = function () {
    /**
     * Creates a new Popper.js instance.
     * @class Popper
     * @param {Element|referenceObject} reference - The reference element used to position the popper
     * @param {Element} popper - The HTML / XML element used as the popper
     * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
     * @return {Object} instance - The generated Popper.js instance
     */
    function Popper(reference, popper) {
      var _this = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      classCallCheck(this, Popper);

      this.scheduleUpdate = function () {
        return requestAnimationFrame(_this.update);
      };

      // make update() debounced, so that it only runs at most once-per-tick
      this.update = debounce$1(this.update.bind(this));

      // with {} we create a new object with the options inside it
      this.options = _extends({}, Popper.Defaults, options);

      // init state
      this.state = {
        isDestroyed: false,
        isCreated: false,
        scrollParents: []
      };

      // get reference and popper elements (allow jQuery wrappers)
      this.reference = reference && reference.jquery ? reference[0] : reference;
      this.popper = popper && popper.jquery ? popper[0] : popper;

      // Deep merge modifiers options
      this.options.modifiers = {};
      Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
        _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
      });

      // Refactoring modifiers' list (Object => Array)
      this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
        return _extends({
          name: name
        }, _this.options.modifiers[name]);
      })
      // sort the modifiers by order
      .sort(function (a, b) {
        return a.order - b.order;
      });

      // modifiers have the ability to execute arbitrary code when Popper.js get inited
      // such code is executed in the same order of its modifier
      // they could add new properties to their options configuration
      // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
      this.modifiers.forEach(function (modifierOptions) {
        if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
          modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
        }
      });

      // fire the first update to position the popper in the right place
      this.update();

      var eventsEnabled = this.options.eventsEnabled;
      if (eventsEnabled) {
        // setup event listeners, they will take care of update the position in specific situations
        this.enableEventListeners();
      }

      this.state.eventsEnabled = eventsEnabled;
    }

    // We can't use class properties because they don't get listed in the
    // class prototype and break stuff like Sinon stubs


    createClass(Popper, [{
      key: 'update',
      value: function update$$1() {
        return update.call(this);
      }
    }, {
      key: 'destroy',
      value: function destroy$$1() {
        return destroy.call(this);
      }
    }, {
      key: 'enableEventListeners',
      value: function enableEventListeners$$1() {
        return enableEventListeners.call(this);
      }
    }, {
      key: 'disableEventListeners',
      value: function disableEventListeners$$1() {
        return disableEventListeners.call(this);
      }

      /**
       * Schedules an update. It will run on the next UI update available.
       * @method scheduleUpdate
       * @memberof Popper
       */


      /**
       * Collection of utilities useful when writing custom modifiers.
       * Starting from version 1.7, this method is available only if you
       * include `popper-utils.js` before `popper.js`.
       *
       * **DEPRECATION**: This way to access PopperUtils is deprecated
       * and will be removed in v2! Use the PopperUtils module directly instead.
       * Due to the high instability of the methods contained in Utils, we can't
       * guarantee them to follow semver. Use them at your own risk!
       * @static
       * @private
       * @type {Object}
       * @deprecated since version 1.8
       * @member Utils
       * @memberof Popper
       */

    }]);
    return Popper;
  }();

  /**
   * The `referenceObject` is an object that provides an interface compatible with Popper.js
   * and lets you use it as replacement of a real DOM node.<br />
   * You can use this method to position a popper relatively to a set of coordinates
   * in case you don't have a DOM node to use as reference.
   *
   * ```
   * new Popper(referenceObject, popperNode);
   * ```
   *
   * NB: This feature isn't supported in Internet Explorer 10.
   * @name referenceObject
   * @property {Function} data.getBoundingClientRect
   * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
   * @property {number} data.clientWidth
   * An ES6 getter that will return the width of the virtual reference element.
   * @property {number} data.clientHeight
   * An ES6 getter that will return the height of the virtual reference element.
   */


  Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
  Popper.placements = placements;
  Popper.Defaults = Defaults;

  var popper = /*#__PURE__*/Object.freeze({
    default: Popper
  });

  var require$$0 = ( popper && Popper ) || popper;

  var vuePopper_min = createCommonjsModule(function (module, exports) {
  !function(e,t){module.exports=t(require$$0);}(commonjsGlobal,function(e){function t(e,t,o){e&&t&&o&&(document.addEventListener?e.addEventListener(t,o,!1):e.attachEvent("on"+t,o));}function o(e,t,o){e&&t&&(document.removeEventListener?e.removeEventListener(t,o,!1):e.detachEvent("on"+t,o));}e=e&&e.hasOwnProperty("default")?e.default:e;var n={props:{tagName:{type:String,default:"span"},trigger:{type:String,default:"hover",validator:function(e){return["clickToOpen","click","clickToToggle","hover","focus"].indexOf(e)>-1}},delayOnMouseOver:{type:Number,default:10},delayOnMouseOut:{type:Number,default:10},disabled:{type:Boolean,default:!1},content:String,enterActiveClass:String,leaveActiveClass:String,boundariesSelector:String,reference:{},forceShow:{type:Boolean,default:!1},dataValue:{default:null},appendToBody:{type:Boolean,default:!1},visibleArrow:{type:Boolean,default:!0},transition:{type:String,default:""},stopPropagation:{type:Boolean,default:!1},preventDefault:{type:Boolean,default:!1},options:{type:Object,default:function(){return{}}},rootClass:{type:String,default:""}},data:function(){return{referenceElm:null,popperJS:null,showPopper:!1,currentPlacement:"",popperOptions:{placement:"bottom",computeStyle:{gpuAcceleration:!1}}}},watch:{showPopper:function(e){e?(this.$emit("show",this), this.popperJS&&this.popperJS.enableEventListeners(), this.updatePopper()):(this.popperJS&&this.popperJS.disableEventListeners(), this.$emit("hide",this));},forceShow:{handler:function(e){this[e?"doShow":"doClose"]();},immediate:!0},disabled:function(e){e&&(this.showPopper=!1);}},created:function(){this.appendedArrow=!1, this.appendedToBody=!1, this.popperOptions=Object.assign(this.popperOptions,this.options);},mounted:function(){switch(this.referenceElm=this.reference||this.$slots.reference[0].elm, this.popper=this.$slots.default[0].elm, this.trigger){case"clickToOpen":t(this.referenceElm,"click",this.doShow), t(document,"click",this.handleDocumentClick);break;case"click":case"clickToToggle":t(this.referenceElm,"click",this.doToggle), t(document,"click",this.handleDocumentClick);break;case"hover":t(this.referenceElm,"mouseover",this.onMouseOver), t(this.popper,"mouseover",this.onMouseOver), t(this.referenceElm,"mouseout",this.onMouseOut), t(this.popper,"mouseout",this.onMouseOut);break;case"focus":t(this.referenceElm,"focus",this.onMouseOver), t(this.popper,"focus",this.onMouseOver), t(this.referenceElm,"blur",this.onMouseOut), t(this.popper,"blur",this.onMouseOut);}},methods:{doToggle:function(e){this.stopPropagation&&e.stopPropagation(), this.preventDefault&&e.preventDefault(), this.forceShow||(this.showPopper=!this.showPopper);},doShow:function(){this.showPopper=!0;},doClose:function(){this.showPopper=!1;},doDestroy:function(){this.showPopper||(this.popperJS&&(this.popperJS.destroy(), this.popperJS=null), this.appendedToBody&&(this.appendedToBody=!1, document.body.removeChild(this.popper.parentElement)));},createPopper:function(){var t=this;this.$nextTick(function(){if(t.visibleArrow&&t.appendArrow(t.popper), t.appendToBody&&!t.appendedToBody&&(t.appendedToBody=!0, document.body.appendChild(t.popper.parentElement)), t.popperJS&&t.popperJS.destroy&&t.popperJS.destroy(), t.boundariesSelector){var o=document.querySelector(t.boundariesSelector);o&&(t.popperOptions.modifiers=Object.assign({},t.popperOptions.modifiers), t.popperOptions.modifiers.preventOverflow=Object.assign({},t.popperOptions.modifiers.preventOverflow), t.popperOptions.modifiers.preventOverflow.boundariesElement=o);}t.popperOptions.onCreate=function(){t.$emit("created",t), t.$nextTick(t.updatePopper);}, t.popperJS=new e(t.referenceElm,t.popper,t.popperOptions);});},destroyPopper:function(){o(this.referenceElm,"click",this.doToggle), o(this.referenceElm,"mouseup",this.doClose), o(this.referenceElm,"mousedown",this.doShow), o(this.referenceElm,"focus",this.doShow), o(this.referenceElm,"blur",this.doClose), o(this.referenceElm,"mouseout",this.onMouseOut), o(this.referenceElm,"mouseover",this.onMouseOver), o(document,"click",this.handleDocumentClick), this.showPopper=!1, this.doDestroy();},appendArrow:function(e){if(!this.appendedArrow){this.appendedArrow=!0;var t=document.createElement("div");t.setAttribute("x-arrow",""), t.className="popper__arrow", e.appendChild(t);}},updatePopper:function(){this.popperJS?this.popperJS.scheduleUpdate():this.createPopper();},onMouseOver:function(){var e=this;clearTimeout(this._timer), this._timer=setTimeout(function(){e.showPopper=!0;},this.delayOnMouseOver);},onMouseOut:function(){var e=this;clearTimeout(this._timer), this._timer=setTimeout(function(){e.showPopper=!1;},this.delayOnMouseOut);},handleDocumentClick:function(e){this.$el&&this.referenceElm&&!this.elementContains(this.$el,e.target)&&!this.elementContains(this.referenceElm,e.target)&&this.popper&&!this.elementContains(this.popper,e.target)&&(this.$emit("documentClick",this), this.forceShow||(this.showPopper=!1));},elementContains:function(e,t){return"function"==typeof e.contains&&e.contains(t)}},destroyed:function(){this.destroyPopper();}};const r=n;n.__file="popper.js.vue";return function(e,t,o,n,r,s,i,p,c,a){"function"==typeof i&&(c=p, p=i, i=!1);const d="function"==typeof o?o.options:o;let l;if(e&&e.render&&(d.render=e.render, d.staticRenderFns=e.staticRenderFns, d._compiled=!0, r&&(d.functional=!0)), n&&(d._scopeId=n), s?(l=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__), t&&t.call(this,c(e)), e&&e._registeredComponents&&e._registeredComponents.add(s);}, d._ssrRegister=l):t&&(l=i?function(){t.call(this,a(this.$root.$options.shadowRoot));}:function(e){t.call(this,p(e));}), l)if(d.functional){const e=d.render;d.render=function(t,o){return l.call(o), e(t,o)};}else{const e=d.beforeCreate;d.beforeCreate=e?[].concat(e,l):[l];}return o}({render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o(e.tagName,{tag:"component"},[o("transition",{attrs:{name:e.transition,"enter-active-class":e.enterActiveClass,"leave-active-class":e.leaveActiveClass},on:{"after-leave":e.doDestroy}},[o("span",{directives:[{name:"show",rawName:"v-show",value:!e.disabled&&e.showPopper,expression:"!disabled && showPopper"}],ref:"popper",class:e.rootClass},[e._t("default",[e._v(e._s(e.content))])],2)]),e._v(" "),e._t("reference")],2)},staticRenderFns:[]},void 0,r,void 0,!1,void 0,void 0,void 0)});
  });

  var AirbnbStyleDatepicker = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"asd__fade"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showDatepicker),expression:"showDatepicker"},{name:"click-outside",rawName:"v-click-outside",value:(_vm.handleClickOutside),expression:"handleClickOutside"}],staticClass:"asd__wrapper",class:_vm.wrapperClasses,style:(_vm.showFullscreen ? undefined : _vm.wrapperStyles),attrs:{"id":_vm.wrapperId}},[(_vm.flexibleSearch)?_c('h2',[_vm._v("Flexibler Reisezeitraum")]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"flexible_range_instruction_wrapper"},[_c('div',{staticClass:"flexible_range_instruction"},[_c('popper',{attrs:{"trigger":"hover","options":{
              placement: 'right-start'
            }}},[_c('div',{staticClass:"popper"},[_c('ol',[_c('li',[_c('h6',[_vm._v("Reisezeitraum wählen:")]),_vm._v("Wählen Sie den maximal möglichen Zeitraum aus, in dem eine Reise stattfinden kann.")]),_vm._v(" "),_c('li',[_c('h6',[_vm._v("Reisedauer wählen:")]),_vm._v("Sie bestimmen die gewünschte Reisedauer und wir durchsuchen den oben genannten Zeitraum nach freien Unterkünften.")])])]),_vm._v(" "),_c('div',{attrs:{"slot":"reference"},slot:"reference"},[_vm._v(" Kurzanleitung "),_c('svg',{attrs:{"viewBox":"0 0 75 75"}},[_c('path',{attrs:{"d":"m32 2c-16.568 0-30 13.432-30 30s13.432 30 30 30 30-13.432 30-30-13.432-30-30-30m5 49.75h-10v-24h10v24m-5-29.5c-2.761 0-5-2.238-5-5s2.239-5 5-5c2.762 0 5 2.238 5 5s-2.238 5-5 5","fill":"#2470ab"}})])])])],1)]),_vm._v(" "),(_vm.showFullscreen)?_c('div',{staticClass:"asd__mobile-header asd__mobile-only"},[_c('button',{staticClass:"asd__mobile-close",attrs:{"type":"button","aria-label":_vm.ariaLabels.closeDatepicker},on:{"click":_vm.closeDatepicker}},[(_vm.$slots['close-icon'])?_vm._t("close-icon"):_c('div',{staticClass:"asd__mobile-close-icon",attrs:{"aria-hidden":"true"}},[_vm._v("X")])],2),_vm._v(" "),_c('h3',[_vm._v(_vm._s(_vm.mobileHeader || _vm.mobileHeaderFallback))])]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"asd__datepicker-header"},[_c('div',{staticClass:"asd__change-month-button asd__change-month-button--previous"},[_c('button',{attrs:{"type":"button","aria-label":_vm.ariaLabels.previousMonth},on:{"click":_vm.previousMonth}},[(_vm.$slots['previous-month-icon'])?_vm._t("previous-month-icon"):_c('svg',{attrs:{"viewBox":"0 0 1000 1000"}},[_c('path',{attrs:{"d":"M336.2 274.5l-210.1 210h805.4c13 0 23 10 23 23s-10 23-23 23H126.1l210.1 210.1c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7l-249.1-249c-11-11-11-21 0-32l249.1-249.1c21-21.1 53 10.9 32 32z"}})])],2)]),_vm._v(" "),_c('div',{staticClass:"asd__change-month-button asd__change-month-button--next"},[_c('button',{attrs:{"type":"button","aria-label":_vm.ariaLabels.nextMonth},on:{"click":_vm.nextMonth}},[(_vm.$slots['next-month-icon'])?_vm._t("next-month-icon"):_c('svg',{attrs:{"viewBox":"0 0 1000 1000"}},[_c('path',{attrs:{"d":"M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z"}})])],2)]),_vm._v(" "),_vm._l((_vm.showMonths),function(month,index){return _c('div',{key:month,staticClass:"asd__days-legend",style:([_vm.monthWidthStyles, { left: _vm.width * index + 'px' }])},_vm._l((_vm.daysShort),function(day,index){return _c('div',{key:index,staticClass:"asd__day-title"},[_vm._v(_vm._s(day))])}))})],2),_vm._v(" "),_c('div',{staticClass:"asd__inner-wrapper",style:(_vm.innerStyles)},[_c('transition-group',{attrs:{"name":"asd__list-complete","tag":"div"}},_vm._l((_vm.months),function(month,monthIndex){return _c('div',{key:month.firstDateOfMonth,staticClass:"asd__month",class:{'asd__month--hidden': monthIndex === 0 || monthIndex > _vm.showMonths},style:(_vm.monthWidthStyles)},[_c('div',{staticClass:"asd__month-name"},[(_vm.showMonthYearSelect)?_c('select',{directives:[{name:"model",rawName:"v-model",value:(month.monthName),expression:"month.monthName"},{name:"resize-select",rawName:"v-resize-select"}],staticClass:"asd__month-year-select",attrs:{"tabindex":monthIndex === 0 || monthIndex > _vm.showMonths ? -1 : 0},on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(month, "monthName", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);},function($event){_vm.updateMonth(monthIndex, month.year, $event);}]}},_vm._l((_vm.monthNames),function(monthName,idx){return _c('option',{key:("month-" + monthIndex + "-" + monthName),attrs:{"disabled":_vm.isMonthDisabled(month.year, idx)},domProps:{"value":monthName}},[_vm._v(_vm._s(monthName))])})):_c('span',[_vm._v(_vm._s(month.monthName))]),_vm._v(" "),(_vm.showMonthYearSelect)?_c('select',{directives:[{name:"model",rawName:"v-model",value:(month.year),expression:"month.year"}],staticClass:"asd__month-year-select",attrs:{"tabindex":monthIndex === 0 || monthIndex > _vm.showMonths ? -1 : 0},on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(month, "year", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);},function($event){_vm.updateYear(monthIndex, month.monthNumber - 1, $event);}]}},[(_vm.years.indexOf(month.year) === -1)?_c('option',{key:("month-" + monthIndex + "-" + (_vm.year)),attrs:{"disabled":true},domProps:{"value":month.year}},[_vm._v(" "+_vm._s(month.year)+" ")]):_vm._e(),_vm._v(" "),_vm._l((_vm.years),function(year){return _c('option',{key:("month-" + monthIndex + "-" + year),domProps:{"value":year}},[_vm._v(" "+_vm._s(year)+" ")])})],2):_c('span',[_vm._v(_vm._s(month.year))])]),_vm._v(" "),_c('table',{staticClass:"asd__month-table",attrs:{"role":"presentation"}},[_c('tbody',_vm._l((month.weeks),function(week,index){return _c('tr',{key:index,staticClass:"asd__week"},_vm._l((week),function(ref,index){
            var fullDate = ref.fullDate;
            var dayNumber = ref.dayNumber;
  return _c('td',{key:index + '_' + dayNumber,ref:("date-" + fullDate),refInFor:true,staticClass:"asd__day",class:[{ 'asd__day--enabled': dayNumber !== 0, 'asd__day--empty': dayNumber === 0, 'asd__day--disabled': _vm.isDisabled(fullDate), 'asd__day--selected': fullDate && (_vm.selectedDate1 === fullDate || _vm.selectedDate2 === fullDate), 'asd__day--in-range': _vm.isInRange(fullDate), 'asd__day--today': fullDate && _vm.isToday(fullDate), 'asd__day--hovered': _vm.isHoveredInRange(fullDate), 'asd__selected-date-one': fullDate && fullDate === _vm.selectedDate1, 'asd__selected-date-two': fullDate && fullDate === _vm.selectedDate2, }, _vm.customizedDateClass(fullDate)],style:(_vm.getDayStyles(fullDate)),attrs:{"data-date":fullDate,"tabindex":_vm.isDateVisible(fullDate) && _vm.isSameDate(_vm.focusedDate, fullDate) ? 0 : -1,"aria-label":_vm.isDateVisible(fullDate) ? _vm.getAriaLabelForDate(fullDate) : false},on:{"mouseover":function () {
                        _vm.handleMouseHoverDate(fullDate);
                      },"mouseout":function($event){_vm.setHoverState(false);}}},[(dayNumber)?_c('button',{staticClass:"asd__day-button",attrs:{"type":"button","tabindex":"-1","date":fullDate,"disabled":_vm.isDisabled(fullDate)},on:{"click":function () {
                          _vm.selectDate(fullDate);
                        }}},[_vm._v(" "+_vm._s(dayNumber)+" ")]):_vm._e()])}))}))])])})),_vm._v(" "),(_vm.showShortcutsMenuTrigger)?_c('div',{class:{ 'asd__keyboard-shortcuts-menu': true, 'asd__keyboard-shortcuts-show': _vm.showKeyboardShortcutsMenu, },style:(_vm.keyboardShortcutsMenuStyles)},[_c('div',{staticClass:"asd__keyboard-shortcuts-title"},[_vm._v(_vm._s(_vm.texts.keyboardShortcuts))]),_vm._v(" "),_c('button',{ref:"keyboard-shortcus-menu-close",staticClass:"asd__keyboard-shortcuts-close",attrs:{"tabindex":"0","aria-label":_vm.ariaLabels.closeKeyboardShortcutsMenu},on:{"click":_vm.closeKeyboardShortcutsMenu}},[(_vm.$slots['close-shortcuts-icon'])?_vm._t("close-shortcuts-icon"):_c('div',{staticClass:"asd__mobile-close-icon",attrs:{"aria-hidden":"true"}},[_vm._v("X")])],2),_vm._v(" "),_c('ul',{staticClass:"asd__keyboard-shortcuts-list"},_vm._l((_vm.keyboardShortcuts),function(shortcut,i){return _c('li',{key:i},[_c('span',{staticClass:"asd__keyboard-shortcuts-symbol",attrs:{"aria-label":shortcut.symbolDescription}},[_vm._v(_vm._s(shortcut.symbol))]),_vm._v(" "+_vm._s(shortcut.label)+" ")])}))]):_vm._e()],1),_vm._v(" "),(_vm.flexibleSearch)?_c('div',{staticClass:"flexible_range_select"},[_c('h4',[_vm._v("Wählen Sie Ihre gewünschte Reisedauer:")]),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.selectedFlexibleSearchOption),expression:"selectedFlexibleSearchOption"}],attrs:{"name":"flexibleSearchRange"},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.selectedFlexibleSearchOption=$event.target.multiple ? $$selectedVal : $$selectedVal[0];}}},_vm._l((_vm.flexibleSearchOptions),function(option){return _c('option',{key:'flexibleSearchOptions' + option,domProps:{"value":option}},[_vm._v(" "+_vm._s(option)+" "),(option === 1)?[_vm._v("Nacht")]:[_vm._v("Nächte")],(option % 7 === 0)?[_vm._v(" ("+_vm._s(option / 7)+" Woche"),(option / 7 > 1)?[_vm._v("n")]:_vm._e(),_vm._v(")")]:_vm._e()],2)})),_vm._v(" "),_c('div',{staticClass:"flexible_range_select__info"},[_c('popper',{attrs:{"trigger":"hover","options":{
              placement: 'top-end'
            }}},[_c('div',{staticClass:"popper"},[_vm._v("Wählen Sie den maximal möglichen Zeitraum aus, in dem eine Reise stattfinden kann.")]),_vm._v(" "),_c('div',{attrs:{"slot":"reference"},slot:"reference"},[_vm._v(" 1. Möglichen Reisezeitraum wählen "),_c('svg',{attrs:{"viewBox":"0 0 75 75"}},[_c('path',{attrs:{"d":"m32 2c-16.568 0-30 13.432-30 30s13.432 30 30 30 30-13.432 30-30-13.432-30-30-30m5 49.75h-10v-24h10v24m-5-29.5c-2.761 0-5-2.238-5-5s2.239-5 5-5c2.762 0 5 2.238 5 5s-2.238 5-5 5","fill":"#2470ab"}})])])]),_vm._v(" "),_c('popper',{attrs:{"trigger":"hover","options":{
              placement: 'top-end'
            }}},[_c('div',{staticClass:"popper"},[_vm._v("Sie bestimmen die gewünschte Reisedauer und wir durchsuchen den oben genannten Zeitraum nach freien Unterkünften.")]),_vm._v(" "),_c('div',{attrs:{"slot":"reference"},slot:"reference"},[_vm._v(" 2. Gewünschte Reisedauer wählen "),_c('svg',{attrs:{"viewBox":"0 0 75 75"}},[_c('path',{attrs:{"d":"m32 2c-16.568 0-30 13.432-30 30s13.432 30 30 30 30-13.432 30-30-13.432-30-30-30m5 49.75h-10v-24h10v24m-5-29.5c-2.761 0-5-2.238-5-5s2.239-5 5-5c2.762 0 5 2.238 5 5s-2.238 5-5 5","fill":"#2470ab"}})])])])],1),_vm._v(" "),_c('div',{staticClass:"clearfix"})]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"datepicker_additional_information"},[_vm._v("Die meisten verfügbaren Unterkünfte finden Sie bei An- und Abreise an einem Samstag.")]),_vm._v(" "),(_vm.mode !== 'single' && _vm.showActionButtons)?_c('div',{staticClass:"asd__action-buttons"},[_c('button',{attrs:{"type":"button"},on:{"click":_vm.closeDatepickerCancel}},[_vm._v(_vm._s(_vm.texts.cancel))]),_vm._v(" "),_c('button',{ref:"apply-button",style:({ color: _vm.colors.selected }),attrs:{"type":"button"},on:{"click":_vm.apply}},[_vm._v(_vm._s(_vm.texts.apply))])]):_vm._e(),_vm._v(" "),(_vm.showShortcutsMenuTrigger)?_c('div',{staticClass:"asd__keyboard-shortcuts-trigger-wrapper"},[_c('button',{staticClass:"asd__keyboard-shortcuts-trigger",attrs:{"aria-label":_vm.ariaLabels.openKeyboardShortcutsMenu,"tabindex":"0"},on:{"click":_vm.openKeyboardShortcutsMenu}},[_c('span',[_vm._v("?")])])]):_vm._e()])])},staticRenderFns: [],
    name: 'AirbnbStyleDatepicker',
    directives: {
      clickOutside: vClickOutside_min_umd.directive,
      resizeSelect: ResizeSelect
    },
    components: {
      'popper': vuePopper_min
    },
    props: {
      triggerElementId: { type: String },
      dateOne: { type: [String, Date] },
      dateTwo: { type: [String, Date] },
      minDate: { type: [String, Date] },
      endDate: { type: [String, Date] },
      mode: { type: String, default: 'range' },
      offsetY: { type: Number, default: 0 },
      offsetX: { type: Number, default: 0 },
      monthsToShow: { type: Number, default: 2 },
      startOpen: { type: Boolean },
      fullscreenMobile: { type: Boolean },
      inline: { type: Boolean },
      mobileHeader: { type: String },
      disabledDates: { type: Array, default: function () { return []; } },
      enabledDates: { type: Array, default: function () { return []; } },
      enableHoverRange: { type: Boolean, default: true },
      customizedDates: { type: Array, default: function () { return []; } },
      showActionButtons: { type: Boolean, default: true },
      showShortcutsMenuTrigger: { type: Boolean, default: true },
      showMonthYearSelect: { type: Boolean, default: false },
      yearsForSelect: { type: Number, default: 10 },
      isTest: {
        type: Boolean,
        default: function () { return "development" === 'test'; },
      },
      trigger: { type: Boolean, default: false },
      closeAfterSelect: { type: Boolean, default: false },
      flexibleSearch: { type: Boolean, default: false },
      selectedFlexibleSearchOptionProp: { type: Number, default: 1 }
    },
    data: function data() {
      return {
        wrapperId: 'airbnb-style-datepicker-wrapper-' + randomString(5),
        dateFormat: 'YYYY-MM-DD',
        dateLabelFormat: 'dddd, MMMM D, YYYY',
        showDatepicker: false,
        showKeyboardShortcutsMenu: false,
        showMonths: 2,
        colors: {
          selected: '#00a699',
          hovered: '#00a699',
          inRange: '#66e2da',
          inHoverRange: '#24c1b5',
          selectedText: '#fff',
          hoveredText: '#fff',
          hoverRangeText: '#fff',
          selectedRangeText: '#fff',
          text: '#565a5c',
          inRangeBorder: '#33dacd',
          inHoverRangeBorder: '#43cec3',
          disabled: '#fff',
          hoveredInRange: '#67f6ee',
        },
        sundayFirst: false,
        ariaLabels: {
          chooseDate: function (date) { return date; },
          chooseStartDate: function (date) { return ("Choose " + date + " as your start date."); },
          chooseEndDate: function (date) { return ("Choose " + date + " as your end date."); },
          selectedDate: function (date) { return ("Selected. " + date); },
          unavailableDate: function (date) { return ("Not available. " + date); },
          previousMonth: 'Move backward to switch to the previous month.',
          nextMonth: 'Move forward to switch to the next month.',
          closeDatepicker: 'Close calendar',
          openKeyboardShortcutsMenu: 'Open keyboard shortcuts menu.',
          closeKeyboardShortcutsMenu: 'Close keyboard shortcuts menu',
        },
        monthNames: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December' ],
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        daysShort: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
        texts: {
          apply: 'Apply',
          cancel: 'Cancel',
          keyboardShortcuts: 'Keyboard Shortcuts',
        },
        keyboardShortcuts: [
          { symbol: '↵', label: 'Select the date in focus', symbolDescription: 'Enter key' },
          {
            symbol: '←/→',
            label: 'Move backward (left) and forward (right) by one day.',
            symbolDescription: 'Left or right arrow keys',
          },
          {
            symbol: '↑/↓',
            label: 'Move backward (up) and forward (down) by one week.',
            symbolDescription: 'Up or down arrow keys',
          },
          {
            symbol: 'PgUp/PgDn',
            label: 'Switch months.',
            symbolDescription: 'PageUp and PageDown keys',
          },
          {
            symbol: 'Home/End',
            label: 'Go to the first or last day of a week.',
            symbolDescription: 'Home or End keys',
          },
          { symbol: 'Esc', label: 'Close this panel', symbolDescription: 'Escape key' },
          { symbol: '?', label: 'Open this panel', symbolDescription: 'Question mark' } ],
        keys: {
          arrowDown: 40,
          arrowUp: 38,
          arrowRight: 39,
          arrowLeft: 37,
          enter: 13,
          pgUp: 33,
          pgDn: 34,
          end: 35,
          home: 36,
          questionMark: 191,
          esc: 27,
        },
        startingDate: '',
        months: [],
        years: [],
        width: 300,
        selectedDate1: '',
        selectedDate2: '',
        isSelectingDate1: true,
        hoverDate: '',
        hoverState: false,
        focusedDate: '',
        alignRight: false,
        triggerPosition: {},
        triggerWrapperPosition: {},
        viewportWidth: undefined,
        isMobile: undefined,
        isTablet: undefined,
        triggerElement: undefined,
        flexibleRangeInfo: null,
        selectedFlexibleSearchOption: 1
      }
    },
    computed: {
      flexibleSearchOptions: function flexibleSearchOptions() {
        var result = 7;
        if (this.selectedDate1 && this.selectedDate2) {
          result = difference_in_days(
            new Date(format(this.selectedDate2, this.dateFormat)),
            new Date(format(this.selectedDate1, this.dateFormat))
          );
        }
        return result
      },
      wrapperClasses: function wrapperClasses() {
        return {
          'asd__wrapper--datepicker-open': this.showDatepicker,
          'asd__wrapper--full-screen': this.showFullscreen,
          'asd__wrapper--inline': this.inline,
        }
      },
      wrapperStyles: function wrapperStyles() {
        return {
          position: this.inline ? 'static' : 'absolute',
          top: this.inline ? '0' : this.triggerPosition.height + this.offsetY + 'px',
          left: !this.alignRight
            ? this.triggerPosition.left - this.triggerWrapperPosition.left + this.offsetX + 'px'
            : '',
          right: this.alignRight
            ? this.triggerWrapperPosition.right - this.triggerPosition.right + this.offsetX + 'px'
            : '',
          width: this.width * this.showMonths + 'px',
          zIndex: this.inline ? '0' : '100',
        }
      },
      innerStyles: function innerStyles() {
        return {
          'margin-left': this.showFullscreen ? '-' + this.viewportWidth : ("-" + (this.width) + "px"),
        }
      },
      keyboardShortcutsMenuStyles: function keyboardShortcutsMenuStyles() {
        return {
          left: this.showFullscreen ? this.viewportWidth : ((this.width) + "px"),
        }
      },
      monthWidthStyles: function monthWidthStyles() {
        return {
          width: this.showFullscreen ? this.viewportWidth : this.width + 'px',
        }
      },
      mobileHeaderFallback: function mobileHeaderFallback() {
        return this.mode === 'range' ? 'Select dates' : 'Select date'
      },
      showFullscreen: function showFullscreen() {
        return this.isMobile && this.fullscreenMobile
      },
      datesSelected: function datesSelected() {
        return !!(
          (this.selectedDate1 && this.selectedDate1 !== '') ||
          (this.selectedDate2 && this.selectedDate2 !== '')
        )
      },
      allDatesSelected: function allDatesSelected() {
        return !!(
          this.selectedDate1 &&
          this.selectedDate1 !== '' &&
          this.selectedDate2 &&
          this.selectedDate2 !== ''
        )
      },
      hasMinDate: function hasMinDate() {
        return !!(this.minDate && this.minDate !== '')
      },
      isRangeMode: function isRangeMode() {
        return this.mode === 'range'
      },
      isSingleMode: function isSingleMode() {
        return this.mode === 'single'
      },
      datepickerWidth: function datepickerWidth() {
        return this.width * this.showMonths
      },
      datePropsCompound: function datePropsCompound() {
        // used to watch for changes in props, and update GUI accordingly
        return this.dateOne + this.dateTwo
      },
      isDateTwoBeforeDateOne: function isDateTwoBeforeDateOne() {
        if (!this.dateTwo) {
          return false
        }
        return isBefore(this.dateTwo, this.dateOne)
      },
      visibleMonths: function visibleMonths() {
        var firstMonthArray = this.months.filter(function (m, index) { return index > 0; });
        var numberOfMonthsArray = [];
        for (var i = 0; i < this.showMonths; i++) {
          numberOfMonthsArray.push(i);
        }
        return numberOfMonthsArray.map(function (_, index) { return firstMonthArray[index].firstDateOfMonth; })
      },
    },
    watch: {
      selectedFlexibleSearchOptionProp: function selectedFlexibleSearchOptionProp(newValue) {
        this.selectedFlexibleSearchOption = newValue;
      },
      selectedFlexibleSearchOption: function selectedFlexibleSearchOption(newValue, oldValue) {
        this.$emit('flexible-date-range-selected', newValue);
      },
      selectedDate1: function selectedDate1(newValue, oldValue) {
        var newDate = !newValue || newValue === '' ? '' : format(newValue, this.dateFormat);
        this.$emit('date-one-selected', newDate);
      },
      selectedDate2: function selectedDate2(newValue, oldValue) {
        var newDate = !newValue || newValue === '' ? '' : format(newValue, this.dateFormat);
        this.$emit('date-two-selected', newDate);
      },
      mode: function mode(newValue, oldValue) {
        this.setStartDates();
      },
      minDate: function minDate() {
        this.setStartDates();
        this.generateMonths();
        this.generateYears();
      },
      endDate: function endDate() {
        this.generateYears();
      },
      datePropsCompound: function datePropsCompound(newValue) {
        if (this.dateOne !== this.selectedDate1) {
          this.startingDate = this.dateOne;
          this.setStartDates();
          this.generateMonths();
          this.generateYears();
        }
        if (this.isDateTwoBeforeDateOne) {
          this.selectedDate2 = '';
          this.$emit('date-two-selected', '');
        }
      },
      trigger: function trigger(newValue, oldValue) {
        var this$1 = this;

        if (newValue) {
          setTimeout(function () {
            this$1.openDatepicker();
          }, 0);
        }
      },
    },
    created: function created() {
      this.setupDatepicker();

      if (this.sundayFirst) {
        this.setSundayToFirstDayInWeek();
      }
    },
    mounted: function mounted() {
      var this$1 = this;

      this.viewportWidth = window.innerWidth + 'px';
      this.isMobile = window.innerWidth < 768;
      this.isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024;
      this._handleWindowResizeEvent = debounce(function () {
        this$1.positionDatepicker();
        this$1.setStartDates();
      }, 200);
      this._handleWindowClickEvent = function (event) {
        if (event.target.id === this$1.triggerElementId) {
          event.stopPropagation();
          event.preventDefault();
          this$1.toggleDatepicker();
        }
      };
      window.addEventListener('resize', this._handleWindowResizeEvent);

      this.triggerElement = this.isTest
        ? document.createElement('input')
        : document.getElementById(this.triggerElementId);

      this.setStartDates();
      this.generateMonths();
      this.generateYears();

      if (this.startOpen || this.inline) {
        this.openDatepicker();
      }

      this.$el.addEventListener('keyup', this.handleKeyboardInput);
      this.$el.addEventListener('keydown', this.trapKeyboardInput);
      this.triggerElement.addEventListener('keyup', this.handleTriggerInput);
      this.triggerElement.addEventListener('click', this._handleWindowClickEvent);

      this.selectedFlexibleSearchOption = this.selectedFlexibleSearchOptionProp;

      if (this.flexibleSearch) {
        this.$emit('flexible-date-range-selected', this.selectedFlexibleSearchOption);
      }
    },
    destroyed: function destroyed() {
      window.removeEventListener('resize', this._handleWindowResizeEvent);
      window.removeEventListener('click', this._handleWindowClickEvent);

      this.$el.removeEventListener('keyup', this.handleKeyboardInput);
      this.$el.removeEventListener('keydown', this.trapKeyboardInput);
      this.triggerElement.removeEventListener('keyup', this.handleTriggerInput);
      this.triggerElement.removeEventListener('click', this._handleWindowClickEvent);
    },
    methods: {
      toggleBodyClass: function toggleBodyClass(addRemoveClass, className) {
        var el = document.body;

        if (this.isMobile) {
          if (addRemoveClass === 'addClass') {
            el.classList.add(className);
          } else {
            el.classList.remove(className);
          }
        }
      },
      getDayStyles: function getDayStyles(date) {
        var isSelected = this.isSelected(date);
        var isHovered = this.isHovered(date);
        var isInRange = this.isInRange(date);
        var isInHoverRange = this.isInHoverRange(date);
        var isDisabled = this.isDisabled(date);
        var isHoveredInRange = this.isHoveredInRange(date);

        var styles = {
          width: (this.width - 30) / 7 + 'px',
          background: isSelected
            ? this.colors.selected
            : isHovered
            ? this.colors.hovered
            : isInHoverRange
            ? this.colors.inHoverRange
            : isHoveredInRange
            ? this.colors.hoveredInRange
            : isInRange
            ? this.colors.inRange
            : '',
          color: isSelected
            ? this.colors.selectedText
            : isHovered
            ? this.colors.hoveredText
            : isInHoverRange
            ? this.colors.hoverRangeText
            : isInRange
            ? this.colors.selectedRangeText
            : this.colors.text,
          border: isSelected
            ? '1px double ' + this.colors.selected
            : isHovered
            ? '1px double ' + this.colors.hovered
            : isInHoverRange
            ? '1px double ' + this.colors.inHoverRangeBorder
            : isInRange && this.allDatesSelected
            ? '1px double ' + this.colors.inRangeBorder
            : '',
        };

        if (isDisabled) {
          styles.background = this.colors.disabled;
        }
        return styles
      },
      getAriaLabelForDate: function getAriaLabelForDate(date) {
        var dateLabel = format(date, this.dateLabelFormat);

        var isDisabled = this.isDisabled(date);
        if (isDisabled) {
          return this.ariaLabels.unavailableDate(dateLabel)
        }

        var isSelected = this.isSelected(date);
        if (isSelected) {
          return this.ariaLabels.selectedDate(dateLabel)
        }

        if (this.isRangeMode) {
          if (this.isSelectingDate1) {
            return this.ariaLabels.chooseStartDate(dateLabel)
          } else {
            return this.ariaLabels.chooseEndDate(dateLabel)
          }
        } else {
          return this.ariaLabels.chooseDate(dateLabel)
        }
      },
      handleClickOutside: function handleClickOutside(event) {
        if (event.target.id === this.triggerElementId || !this.showDatepicker || this.inline) {
          return
        }
        this.closeDatepicker();
      },
      shouldHandleInput: function shouldHandleInput(event, key) {
        return (
          event.keyCode === key && (!event.shiftKey || event.keyCode === 191) && this.showDatepicker
        )
      },
      handleTriggerInput: function handleTriggerInput(event) {
        if (this.mode === 'single') {
          this.setDateFromText(event.target.value);
        }
      },
      trapKeyboardInput: function trapKeyboardInput(event) {
        var this$1 = this;

        // prevent keys that are used as keyboard shortcuts from propagating out of this element
        // except for the enter key, which is needed to activate buttons
        var shortcutKeyCodes = Object.keys(this.keys).map(function (key) { return this$1.keys[key]; });
        shortcutKeyCodes.splice(shortcutKeyCodes.indexOf(13), 1);
        var shouldPreventDefault = shortcutKeyCodes.indexOf(event.keyCode) > -1;
        if (shouldPreventDefault) { event.preventDefault(); }
      },
      handleKeyboardInput: function handleKeyboardInput(event) {
        if (this.shouldHandleInput(event, this.keys.esc)) {
          if (this.showKeyboardShortcutsMenu) {
            this.closeKeyboardShortcutsMenu();
          } else {
            this.closeDatepicker();
          }
        } else if (this.showKeyboardShortcutsMenu) {
          // if keyboard shortcutsMenu is open, then esc is the only key we want to have fire events
        } else if (this.shouldHandleInput(event, this.keys.arrowDown)) {
          var newDate = addWeeks(this.focusedDate, 1);
          var changeMonths = !isSameMonth(newDate, this.focusedDate);
          this.setFocusedDate(newDate);
          if (changeMonths) { this.nextMonth(); }
        } else if (this.shouldHandleInput(event, this.keys.arrowUp)) {
          var newDate$1 = subWeeks(this.focusedDate, 1);
          var changeMonths$1 = !isSameMonth(newDate$1, this.focusedDate);
          this.setFocusedDate(newDate$1);
          if (changeMonths$1) { this.previousMonth(); }
        } else if (this.shouldHandleInput(event, this.keys.arrowRight)) {
          var newDate$2 = addDays(this.focusedDate, 1);
          var changeMonths$2 = !isSameMonth(newDate$2, this.focusedDate);
          this.setFocusedDate(newDate$2);
          if (changeMonths$2) { this.nextMonth(); }
        } else if (this.shouldHandleInput(event, this.keys.arrowLeft)) {
          var newDate$3 = subDays(this.focusedDate, 1);
          var changeMonths$3 = !isSameMonth(newDate$3, this.focusedDate);
          this.setFocusedDate(newDate$3);
          if (changeMonths$3) { this.previousMonth(); }
        } else if (this.shouldHandleInput(event, this.keys.enter)) {
          // on enter key, only select the date if a date is currently in focus
          var target = event.target;
          if (!this.showKeyboardShortcutsMenu && target && target.tagName === 'TD') {
            this.selectDate(this.focusedDate);
          }
        } else if (this.shouldHandleInput(event, this.keys.pgUp)) {
          this.setFocusedDate(subMonths(this.focusedDate, 1));
          this.previousMonth();
        } else if (this.shouldHandleInput(event, this.keys.pgDn)) {
          this.setFocusedDate(addMonths(this.focusedDate, 1));
          this.nextMonth();
        } else if (this.shouldHandleInput(event, this.keys.home)) {
          var newDate$4 = startOfWeek(this.focusedDate, {
            weekStartsOn: this.sundayFirst ? 0 : 1,
          });
          var changeMonths$4 = !isSameMonth(newDate$4, this.focusedDate);
          this.setFocusedDate(newDate$4);
          if (changeMonths$4) { this.previousMonth(); }
        } else if (this.shouldHandleInput(event, this.keys.end)) {
          var newDate$5 = endOfWeek(this.focusedDate, {
            weekStartsOn: this.sundayFirst ? 0 : 1,
          });
          var changeMonths$5 = !isSameMonth(newDate$5, this.focusedDate);
          this.setFocusedDate(newDate$5);
          if (changeMonths$5) { this.nextMonth(); }
        } else if (this.shouldHandleInput(event, this.keys.questionMark)) {
          this.openKeyboardShortcutsMenu();
        }
      },
      handleMouseHoverDate: function handleMouseHoverDate(date) {
        this.setHoverDate(date);
        if (this.isSingleMode || !this.selectedDate1 || !this.enableHoverRange) {
          return false
        }
        // we are currently hovering a day
        this.setHoverState(true);
      },
      setDateFromText: function setDateFromText(value) {
        if (!value || value.length < 10) {
          return
        }
        // make sure format is either 'YYYY-MM-DD' or 'DD.MM.YYYY'
        var isFormatYearFirst = value.match(
          /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/
        );
        var isFormatDayFirst = value.match(
          /^(0[1-9]|1[0-9]|2[0-9]|3[0-1])[.](0[1-9]|1[0-2])[.](\d{4})$/
        );

        if (!isFormatYearFirst && !isFormatDayFirst) {
          return
        }
        if (isFormatDayFirst) {
          //convert to YYYY-MM-DD
          value = (value.substring(6, 10)) + "-" + (value.substring(3, 5)) + "-" + (value.substring(0, 2));
        }

        var valueAsDateObject = new Date(value);
        if (!isValid(valueAsDateObject)) {
          return
        }
        var formattedDate = format(valueAsDateObject, this.dateFormat);
        if (
          this.isDateDisabled(formattedDate) ||
          this.isBeforeMinDate(formattedDate) ||
          this.isAfterEndDate(formattedDate)
        ) {
          return
        }
        this.startingDate = subMonths(formattedDate, 1);
        this.generateMonths();
        this.generateYears();
        this.selectDate(formattedDate);
      },
      isMonthDisabled: function isMonthDisabled(year, monthIndex) {
        var monthDate = new Date(year, monthIndex);
        if (this.hasMinDate && isBefore(monthDate, startOfMonth(this.minDate))) {
          return true
        }
        return this.isAfterEndDate(monthDate)
      },
      generateMonths: function generateMonths() {
        var this$1 = this;

        this.months = [];
        var currentMonth = this.startingDate;
        for (var i = 0; i < this.showMonths + 2; i++) {
          this$1.months.push(this$1.getMonth(currentMonth));
          currentMonth = this$1.addMonths(currentMonth);
        }
      },
      generateYears: function generateYears() {
        var this$1 = this;

        if (!this.showMonthYearSelect) { return }
        this.years = [];
        var currentYear = getYear(this.startingDate);
        var startYear = this.minDate ? getYear(this.minDate) : currentYear - this.yearsForSelect;
        var endYear = this.endDate ? getYear(this.endDate) : currentYear + this.yearsForSelect;
        for (var year = startYear; year <= endYear; year++) {
          this$1.years.push(year.toString());
        }
      },
      setHoverState: function setHoverState(state) {
        this.hoverState = state;
      },
      setupDatepicker: function setupDatepicker() {
        if (this.$options.ariaLabels) {
          this.ariaLabels = copyObject(this.$options.ariaLabels);
        }
        if (this.$options.keyboardShortcuts) {
          this.keyboardShortcuts = copyObject(this.$options.keyboardShortcuts);
        }
        if (this.$options.dateLabelFormat) {
          this.dateLabelFormat = copyObject(this.$options.dateLabelFormat);
        }
        if (this.$options.sundayFirst) {
          this.sundayFirst = copyObject(this.$options.sundayFirst);
        }
        if (this.$options.colors) {
          var colors = copyObject(this.$options.colors);
          this.colors.selected = colors.selected || this.colors.selected;
          this.colors.hovered = colors.hovered || this.colors.hovered;
          this.colors.inRange = colors.inRange || this.colors.inRange;
          this.colors.inHoverRange = colors.inHoverRange || this.colors.inHoverRange;
          this.colors.hoveredInRange = colors.hoveredInRange || this.colors.hoveredInRange;
          this.colors.selectedText = colors.selectedText || this.colors.selectedText;
          this.colors.selectedRangeText = colors.selectedRangeText || this.colors.selectedRangeText;
          this.colors.hoverRangeText = colors.hoverRangeText || this.colors.hoverRangeText;
          this.colors.hoveredText = colors.hoveredText || this.colors.hoveredText;
          this.colors.text = colors.text || this.colors.text;
          this.colors.inRangeBorder = colors.inRangeBorder || this.colors.inRangeBorder;
          this.colors.inHoverRangeBorder = colors.inHoverRangeBorder || this.colors.inHoverRangeBorder;
          this.colors.disabled = colors.disabled || this.colors.disabled;
        }
        if (this.$options.monthNames && this.$options.monthNames.length === 12) {
          this.monthNames = copyObject(this.$options.monthNames);
        }
        if (this.$options.days && this.$options.days.length === 7) {
          this.days = copyObject(this.$options.days);
        }
        if (this.$options.daysShort && this.$options.daysShort.length === 7) {
          this.daysShort = copyObject(this.$options.daysShort);
        }
        if (this.$options.texts) {
          var texts = copyObject(this.$options.texts);
          this.texts.apply = texts.apply || this.texts.apply;
          this.texts.cancel = texts.cancel || this.texts.cancel;
        }
      },
      setStartDates: function setStartDates() {
        var startDate = this.dateOne || new Date();
        if (this.hasMinDate && isBefore(startDate, this.minDate)) {
          startDate = this.minDate;
        }
        this.startingDate = this.subtractMonths(startDate);
        this.selectedDate1 = this.dateOne;
        this.selectedDate2 = this.dateTwo;
        this.focusedDate = startDate;
      },
      setSundayToFirstDayInWeek: function setSundayToFirstDayInWeek() {
        var lastDay = this.days.pop();
        this.days.unshift(lastDay);
        var lastDayShort = this.daysShort.pop();
        this.daysShort.unshift(lastDayShort);
      },
      getMonth: function getMonth$$1(date) {
        var firstDateOfMonth = format(date, 'YYYY-MM-01');
        var year = format(date, 'YYYY');
        var monthNumber = parseInt(format(date, 'M'));
        var monthName = this.monthNames[monthNumber - 1];

        return {
          year: year,
          firstDateOfMonth: firstDateOfMonth,
          monthName: monthName,
          monthNumber: monthNumber,
          weeks: this.getWeeks(firstDateOfMonth),
        }
      },
      getWeeks: function getWeeks(date) {
        var weekDayNotInMonth = { dayNumber: 0 };
        var daysInMonth = getDaysInMonth(date);
        var year = format(date, 'YYYY');
        var month = format(date, 'MM');
        var firstDayInWeek = parseInt(format(date, this.sundayFirst ? 'd' : 'E'));
        if (this.sundayFirst) {
          firstDayInWeek++;
        }
        var weeks = [];
        var week = [];

        // add empty days to get first day in correct position
        for (var s = 1; s < firstDayInWeek; s++) {
          week.push(weekDayNotInMonth);
        }
        for (var d = 0; d < daysInMonth; d++) {
          var isLastDayInMonth = d >= daysInMonth - 1;
          var dayNumber = d + 1;
          var dayNumberFull = dayNumber < 10 ? '0' + dayNumber : dayNumber;
          week.push({
            dayNumber: dayNumber,
            dayNumberFull: dayNumberFull,
            fullDate: year + '-' + month + '-' + dayNumberFull,
          });

          if (week.length === 7) {
            weeks.push(week);
            week = [];
          } else if (isLastDayInMonth) {
            for (var i = 0; i < 7 - week.length; i++) {
              week.push(weekDayNotInMonth);
            }
            weeks.push(week);
            week = [];
          }
        }
        return weeks
      },
      selectDate: function selectDate(date) {
        if (this.isBeforeMinDate(date) || this.isAfterEndDate(date) || this.isDateDisabled(date)) {
          return
        }

        if (this.mode === 'single') {
          this.selectedDate1 = date;
          this.closeDatepicker();
          return
        }

        if (this.isSelectingDate1 || isBefore(date, this.selectedDate1)) {
          this.selectedDate1 = date;
          this.isSelectingDate1 = false;

          if (isBefore(this.selectedDate2, date)) {
            this.selectedDate2 = '';
          }
        } else {
          this.selectedDate2 = date;
          this.isSelectingDate1 = true;

          if (isAfter(this.selectedDate1, date)) {
            this.selectedDate1 = '';
          } else if (this.showActionButtons) {
            // if user has selected both dates, focus the apply button for accessibility
            this.$refs['apply-button'].focus();
          }

          if (this.allDatesSelected && this.closeAfterSelect) {
            this.closeDatepicker();
          }
        }
      },
      setHoverDate: function setHoverDate(date) {
        this.hoverDate = date;
      },
      setFocusedDate: function setFocusedDate(date) {
        var formattedDate = format(date, this.dateFormat);
        this.focusedDate = formattedDate;
        var dateElement = this.$refs[("date-" + formattedDate)];
        // handle .focus() on ie11 by adding a short timeout
        if (dateElement && dateElement.length) {
          setTimeout(function() {
            dateElement[0].focus();
          }, 10);
        }
      },
      resetFocusedDate: function resetFocusedDate(setToFirst) {
        if (this.focusedDate && !this.isDateVisible(this.focusedDate)) {
          var visibleMonthIdx = setToFirst ? 0 : this.visibleMonths.length - 1;
          var targetMonth = this.visibleMonths[visibleMonthIdx];
          var monthIdx = getMonth(targetMonth);
          var year = getYear(targetMonth);
          var newFocusedDate = setYear(setMonth(this.focusedDate, monthIdx), year);
          this.focusedDate = format(newFocusedDate, this.dateFormat);
        }
      },
      isToday: function isToday(date) {
        return format(new Date(), this.dateFormat) === date
      },
      isSameDate: function isSameDate(date1, date2) {
        return isSameDay(date1, date2)
      },
      isSelected: function isSelected(date) {
        if (!date) {
          return
        }
        return this.selectedDate1 === date || this.selectedDate2 === date
      },
      isHovered: function isHovered(date) {
        if (!date) {
          return
        }
        return this.hoverDate === date
      },
      isInRange: function isInRange(date) {
        if (!this.allDatesSelected || this.isSingleMode) {
          return false
        }

        return (
          (isAfter(date, this.selectedDate1) && isBefore(date, this.selectedDate2)) ||
          (isAfter(date, this.selectedDate1) &&
            isBefore(date, this.hoverDate) &&
            !this.allDatesSelected)
        )
      },
      isInHoverRange: function isInHoverRange(date) {
        if (!this.selectedDate1 || this.isSelectingDate1 || this.isSingleMode || !this.hoverState) {
          return false
        }
        return isAfter(date, this.selectedDate1) && isBefore(date, this.hoverDate)
      },
      isHoveredInRange: function isHoveredInRange(date) {
        if (this.isSingleMode || this.allDatesSelected) {
          return false
        }

        return (
          (isAfter(date, this.selectedDate1) && isBefore(date, this.hoverDate)) ||
          (isAfter(date, this.hoverDate) && isBefore(date, this.selectedDate1))
        )
      },
      isBeforeMinDate: function isBeforeMinDate(date) {
        if (!this.minDate) {
          return false
        }
        return isBefore(date, this.minDate)
      },
      isAfterEndDate: function isAfterEndDate(date) {
        if (!this.endDate) {
          return false
        }
        return isAfter(date, this.endDate)
      },
      isDateVisible: function isDateVisible(date) {
        if (!date) {
          return false
        }
        var start = subDays(this.visibleMonths[0], 1);
        var end = addDays(lastDayOfMonth(this.visibleMonths[this.monthsToShow - 1]), 1);
        return isAfter(date, start) && isBefore(date, end)
      },
      isDateDisabled: function isDateDisabled(date) {
        if (this.enabledDates.length > 0) {
          return this.enabledDates.indexOf(date) === -1
        } else {
          return this.disabledDates.indexOf(date) > -1
        }
      },
      customizedDateClass: function customizedDateClass(date) {
        var this$1 = this;

        var customizedClasses = '';
        if (this.customizedDates.length > 0) {
          for (var i = 0; i < this.customizedDates.length; i++) {
            if (this$1.customizedDates[i].dates.indexOf(date) > -1)
              { customizedClasses += " asd__day--" + (this$1.customizedDates[i].cssClass); }
          }
        }
        return customizedClasses
      },
      isDisabled: function isDisabled(date) {
        return this.isDateDisabled(date) || this.isBeforeMinDate(date) || this.isAfterEndDate(date)
      },
      previousMonth: function previousMonth() {
        this.startingDate = this.subtractMonths(this.months[0].firstDateOfMonth);

        this.months.unshift(this.getMonth(this.startingDate));
        this.months.splice(this.months.length - 1, 1);
        this.$emit('previous-month', this.visibleMonths);
        this.resetFocusedDate(false);
      },
      nextMonth: function nextMonth() {
        this.startingDate = this.addMonths(this.months[this.months.length - 1].firstDateOfMonth);
        this.months.push(this.getMonth(this.startingDate));
        this.months.splice(0, 1);
        this.$emit('next-month', this.visibleMonths);
        this.resetFocusedDate(true);
      },
      subtractMonths: function subtractMonths(date) {
        return format(subMonths(date, 1), this.dateFormat)
      },
      addMonths: function addMonths$1(date) {
        return format(addMonths(date, 1), this.dateFormat)
      },
      toggleDatepicker: function toggleDatepicker() {
        if (this.showDatepicker) {
          this.closeDatepicker();
        } else {
          this.openDatepicker();
        }
      },
      updateMonth: function updateMonth(offset, year, event) {
        var newMonth = event.target.value;
        var monthIdx = this.monthNames.indexOf(newMonth);
        var newDate = setYear(setMonth(this.startingDate, monthIdx), year);
        this.startingDate = subMonths(newDate, offset);
        this.generateMonths();
      },
      updateYear: function updateYear(offset, monthIdx, event) {
        var newYear = event.target.value;
        var newDate = setYear(setMonth(this.startingDate, monthIdx), newYear);
        this.startingDate = subMonths(newDate, offset);
        this.generateMonths();
      },
      openDatepicker: function openDatepicker() {
        var this$1 = this;

        this.positionDatepicker();
        this.setStartDates();
        this.triggerElement.classList.add('datepicker-open');
        this.showDatepicker = true;
        this.initialDate1 = this.dateOne;
        this.initialDate2 = this.dateTwo;
        this.$emit('opened');
        this.$nextTick(function () {
          if (!this$1.inline) { this$1.setFocusedDate(this$1.focusedDate); }
        });
        this.toggleBodyClass('addClass', 'datepicker-open');
      },
      closeDatepickerCancel: function closeDatepickerCancel() {
        if (this.showDatepicker) {
          this.selectedDate1 = this.initialDate1;
          this.selectedDate2 = this.initialDate2;
          this.$emit('cancelled');
          this.closeDatepicker();
        }
      },
      closeDatepicker: function closeDatepicker() {
        if (this.inline) {
          return
        }
        this.showDatepicker = false;
        this.showKeyboardShortcutsMenu = false;
        this.triggerElement.classList.remove('datepicker-open');
        this.toggleBodyClass('removeClass', 'datepicker-open');
        this.$emit('closed');
      },
      openKeyboardShortcutsMenu: function openKeyboardShortcutsMenu() {
        this.showKeyboardShortcutsMenu = true;
        var shortcutMenuCloseBtn = this.$refs['keyboard-shortcus-menu-close'];
        this.$nextTick(function () { return shortcutMenuCloseBtn.focus(); });
      },
      closeKeyboardShortcutsMenu: function closeKeyboardShortcutsMenu() {
        var this$1 = this;

        this.showKeyboardShortcutsMenu = false;
        this.$nextTick(function () { return this$1.setFocusedDate(this$1.focusedDate); });
      },
      apply: function apply() {
        this.$emit('apply');
        this.closeDatepicker();
      },
      positionDatepicker: function positionDatepicker() {
        var triggerWrapperElement = findAncestor(this.triggerElement, '.datepicker-trigger');
        this.triggerPosition = this.triggerElement.getBoundingClientRect();
        if (triggerWrapperElement) {
          this.triggerWrapperPosition = triggerWrapperElement.getBoundingClientRect();
        } else {
          this.triggerWrapperPosition = { left: 0, right: 0 };
        }

        var viewportWidth = document.documentElement.clientWidth || window.innerWidth;
        this.viewportWidth = viewportWidth + 'px';
        this.isMobile = viewportWidth < 768;
        this.isTablet = viewportWidth >= 768 && viewportWidth <= 1024;
        this.showMonths = this.isMobile
          ? 1
          : this.isTablet && this.monthsToShow > 2
          ? 2
          : this.monthsToShow;

        this.$nextTick(function() {
          var datepickerWrapper = document.getElementById(this.wrapperId);
          if (!this.triggerElement || !datepickerWrapper) {
            return
          }

          var rightPosition =
            this.triggerElement.getBoundingClientRect().left +
            datepickerWrapper.getBoundingClientRect().width;
          this.alignRight = rightPosition > viewportWidth;
        });
      },
    },
  }

  var AirbnbStyleDatepickerPlugin = {
    install: function install(Vue, options) {
      Vue.component(AirbnbStyleDatepicker.name, Object.assign({}, options, AirbnbStyleDatepicker));
    }

  }; // User has to install the component by themselves, to allow to pass options

  if (typeof window !== 'undefined' && window.Vue) {
    window.AirbnbStyleDatepicker = AirbnbStyleDatepickerPlugin;
  }

  return AirbnbStyleDatepickerPlugin;

})));
