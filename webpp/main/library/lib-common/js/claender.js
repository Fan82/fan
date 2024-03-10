// $(document).ready(function () {
//   const months = [
//     "",
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const weekdays = ["", "sun", "mon", "tue", "wed", "thr", "fri", "sat"];

//   $(document).ready(function () {
//     var dir, startX, startY, startTime, offsetX, offsetY, elapsedTime;
//     var swipeTimeSpan = 100;
//     var swipeMinOffset = 100;
//     var swipeRestraint = 200;

//     function MonYearTitle(month, year) {
//       return $(
//         '<div class="monthYearTitleContainer">' +
//           '<div class="monthWrap">' +
//           month +
//           "</div>" +
//           '<div class="yearWrap">' +
//           year +
//           "</div>" +
//           "</div>"
//       );
//     }

//     function WeekdayTitle() {
//       var weekdaysHTML = "";
//       for (var i = 1; i < weekdays.length; i++) {
//         weekdaysHTML +=
//           '<div class="weekWrap">' + weekdays[i].toUpperCase() + "</div>";
//       }
//       return $('<div class="weekdayTitleContainer">' + weekdaysHTML + "</div>");
//     }

//     function calcDayCells(month, year) {
//       var numOfDays = new Date(year, month, 0).getDate();
//       var firstDay = new Date(year, month - 1, 1).getDay();
//       var rows = [];
//       var i = 0;
//       while (i++ < firstDay) {
//         rows.push({
//           key: "blank" + i + month + year,
//           className: "cell-blank",
//           dayNum: "",
//         });
//       }
//       var day = 1;
//       while (day <= numOfDays) {
//         var flexOrder = day % 7 === 0 ? weekdays[7] : weekdays[day % 7];
//         var styleName = "cell " + flexOrder;
//         var id = "" + day + month + year;
//         rows.push({
//           key: id,
//           className: styleName,
//           dayNum: day++,
//         });
//       }
//       return rows;
//     }

//     function DayCells(month, year, dayIsClicked) {
//       var currentMonthArr = calcDayCells(month, year);
//       var arr = [];
//       currentMonthArr.forEach(function (item) {
//         var style =
//           item.key === dayIsClicked && item.key[0] !== "b"
//             ? "dayNum selected"
//             : "dayNum";
//         arr.push(
//           '<div class="' +
//             item.className +
//             '" id="' +
//             item.key +
//             '">' +
//             '<span class="' +
//             style +
//             '">' +
//             item.dayNum +
//             "</span>" +
//             "</div>"
//         );
//       });
//       return $('<div class="dayCellsContainer">' + arr.join("") + "</div>");
//     }

//     function MonthControls(dir, handleArrowClick) {
//       var arrow = $('<div class="arrow ' + dir + '"></div>');
//       arrow.click(function () {
//         handleArrowClick(dir);
//       });
//       return $('<div class="arrow-wrap"></div>').append(arrow);
//     }

//     function Calendar() {
//       var today = new Date();
//       var defaultDay = today.getDate();
//       var defaultMonth = today.getMonth() + 1;
//       var defaultYear = today.getFullYear();
//       var defaultDayClicked = "" + defaultDay + defaultMonth + defaultYear;
//       var month = defaultMonth;
//       var year = defaultYear;
//       var dayIsClicked = defaultDayClicked;
//       var prevMonth;

//       function handleDayClicked(id) {
//         if (id[0] !== "b") {
//           dayIsClicked = id;
//         }
//       }

//       function handleMonthChange(dir) {
//         if (dir === "left") {
//           if (month === 1) {
//             year -= 1;
//             month = 12;
//             prevMonth = 1;
//           } else {
//             month -= 1;
//             prevMonth = month;
//           }
//         }
//         if (dir === "right") {
//           if (month === 12) {
//             year += 1;
//             month = 1;
//             prevMonth = 12;
//           } else {
//             month += 1;
//             prevMonth = month;
//           }
//         }
//       }

//       function handleSwipeEvent(e, action) {
//         var touchEventObj = e.changedTouches[0];
//         if (action === "start") {
//           startX = touchEventObj.screenX;
//           startY = touchEventObj.screenY;
//           startTime = new Date().getTime();
//         } else if (action === "end") {
//           elapsedTime = new Date().getTime() - startTime;
//           if (
//             elapsedTime >= swipeTimeSpan &&
//             Math.abs(offsetX) >= swipeMinOffset &&
//             Math.abs(offsetY) <= swipeRestraint
//           ) {
//             handleMonthChange(dir);
//             offsetX = 0;
//             offsetY = 0;
//           }
//         } else {
//           offsetX = touchEventObj.screenX - startX;
//           offsetY = touchEventObj.screenY - startY;
//           if (Math.abs(offsetX) > Math.abs(offsetY)) {
//             dir = offsetX < 0 ? "right" : "left";
//           }
//         }
//       }

//       function monthChangeComp(prevMonth, month) {
//         if (month === 12 && prevMonth === 1) {
//           return "carouselDec";
//         } else if (month === 1 && prevMonth === 12) {
//           return "carouselInc";
//         } else {
//           if (month > prevMonth) {
//             return "carouselInc";
//           } else {
//             return "carouselDec";
//           }
//         }
//       }

//       function renderCalendar() {
//         var transitionStyle = monthChangeComp(prevMonth, month);
//         var dayCells = DayCells(month, year, dayIsClicked);
//         var dayCellsViewport = $('<div class="dayCellsViewPort"></div>').on(
//           "touchstart",
//           function (e) {
//             handleSwipeEvent(e, "start");
//           }
//         );
//         dayCellsViewport.append(dayCells);
//         var dayCellsWrap = $('<div class="dayCellsWrap"></div>').append(
//           dayCellsViewport
//         );
//         var monthControlsLeft = MonthControls("left", handleMonthChange);
//         var monthControlsRight = MonthControls("right", handleMonthChange);
//         var calendarContainer = $(
//           '<div class="calendarContainer"></div>'
//         ).append(
//           MonYearTitle(months[month], year),
//           WeekdayTitle(),
//           dayCellsWrap,
//           monthControlsLeft,
//           monthControlsRight
//         );
//         $("body").append(calendarContainer);
//         dayCellsViewport
//           .on("touchmove", function (e) {
//             handleSwipeEvent(e, "move");
//           })
//           .on("touchend", function (e) {
//             handleSwipeEvent(e, "end");
//           });
//       }

//       renderCalendar();
//     }

//     Calendar();
//   });
// });
