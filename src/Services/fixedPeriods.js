const getFirstDateOfWeek = (weekNumber, year) => {
    const date = new Date(year, 0, 1);
    const dayOfWeek = date.getDay();
    const firstDayOfWeek = 1 - dayOfWeek;
    const daysToAdd = 7 * (weekNumber - 1) + firstDayOfWeek;
    date.setDate(date.getDate() + daysToAdd);
    return date;
  };
  const dateLessThanTen = (date) => {
    if (date < 10) {
      return `0${date}`;
    }
    return date;
  };
  const getLastDateOfWeek = (weekNumber, year) => {
    const firstDateOfWeek = getFirstDateOfWeek(weekNumber, year);
    const lastDateOfWeek = new Date(firstDateOfWeek);
    lastDateOfWeek.setDate(lastDateOfWeek.getDate() + 6);
    return lastDateOfWeek;
  };
  
  const organisedFirstLastDateOfWeek = (index, year) => {
    let layout = `${getFirstDateOfWeek(index + 1, year)?.getFullYear()}-${
      getFirstDateOfWeek(index + 1, year)?.getMonth() + 1
    }-${dateLessThanTen(getFirstDateOfWeek(index + 1, year)?.getDate())} 
    - ${getLastDateOfWeek(index + 1, year)?.getFullYear()}-${getLastDateOfWeek(
      index + 1,
      year
    )?.getMonth()}-${dateLessThanTen(
      getLastDateOfWeek(index + 1, year)?.getDate()
    )}
    `;
    return layout;
  };
  
  function getBiweekStartDate(weekNum, year) {
    var startDate = new Date(year, 0, 1);
  
    // Calculate the start date for the given week number
    var startWeek = 1 + (weekNum - 1) * 2;
    var startDay = (startWeek - 1) * 7 + 1;
  
    // Use the start date and calculated start day to get the last biweek date
    var biweekStartDate = new Date(
      startDate.getTime() + (startDay + 1) * 24 * 60 * 60 * 1000
    );
    return biweekStartDate;
  }
  
  function getLastBiweekDate(weekNum, year) {
    // Create a new date object for the start of the year
    var startDate = new Date(year, 0, 1);
  
    // Calculate the start date for the given week number
    var startWeek = 1 + (weekNum - 1) * 2;
    var startDay = (startWeek - 1) * 7 + 1;
  
    // Use the start date and calculated start day to get the last biweek date
    var lastBiweekDate = new Date(
      startDate.getTime() + (startDay + 14) * 24 * 60 * 60 * 1000
    );
  
    // Return the last biweek date
    return lastBiweekDate;
  }
  let Periods = {
    GetYearly: () => {
      let year = new Date().getFullYear()
      let years = [];
      for (let index = 0; index < 10; index++) {
        years.push({
          type: "Years",
          label: `${year - index}`,
          value: `${year - index}`,
        });
      }
      return years?.reverse();
    },
  
    getFirstPosition: (list) => {
      return list[0];
    },
  
    GetWeekly: (year) => {
      let weeks = [];
  
      for (let index = 0; index < 52; index++) {
        weeks.push({
          type: "Weeks",
          label: `Week ${dateLessThanTen(
            index + 1
          )} - ${organisedFirstLastDateOfWeek(index, year)}`,
          value: `${year}W${index + 1}`,
        });
      }
      return weeks;
    },
    GetBiWeekly: (year) => {
      let weeks = [];
  
      for (let index = 0; index < 26; index++) {
        weeks.push({
          type: "Bi-weeks",
          label: `BiWeek-${index + 1} ${
            getBiweekStartDate(index + 1, year)
              .toISOString()
              .split("T")[0]
          } - ${
            getLastBiweekDate(index + 1, year)
              .toISOString()
              .split("T")[0]
          }`,
          value: `${year}BiW${index + 1}`,
        });
      }
      return weeks;
    },
  
    GetDaily: (year) => {
      const dates = [];
      const daysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate();
      };
      for (let index = 1; index < 13; index++) {
        for (let day = 1; day <= daysInMonth(index, year); day++) {
          dates.push({
            type: "Days",
            label: `${year}-${index}-${day}`,
            value: `${year}${index}${day}`,
          });
        }
      }
      return dates;
    },
  
    GetMonthly: (year) => {
      const months = [
        { type: "Months", label: `January ${year} `, value: `${year}01` },
        { type: "Months", label: `February ${year}`, value: `${year}02` },
        { type: "Months", label: `March ${year}`, value: `${year}03` },
        { type: "Months", label: `April ${year}`, value: `${year}04` },
        { type: "Months", label: `May ${year}`, value: `${year}05` },
        { type: "Months", label: `June ${year}`, value: `${year}06` },
        { type: "Months", label: `July ${year}`, value: `${year}07` },
        { type: "Months", label: `August ${year}`, value: `${year}08` },
        { type: "Months", label: `September ${year}`, value: `${year}09` },
        { type: "Months", label: `October ${year}`, value: `${year}010` },
        { type: "Months", label: `November ${year}`, value: `${year}11` },
        { type: "Months", label: `December ${year}`, value: `${year}12` },
      ];
      return months;
    },
    GetBiMonthly: (year) => {
      const months = [
        {
          type: "Bi-months",
          label: `January-February ${year}`,
          value: `${year}"01B"`,
        },
        {
          type: "Bi-months",
          label: `March-April ${year}`,
          value: `${year}"02B"`,
        },
        { type: "Bi-months", label: `May-June ${year}`, value: `${year}"03B"` },
        {
          type: "Bi-months",
          label: `July-August ${year}`,
          value: `${year}"04B"`,
        },
        {
          type: "Bi-months",
          label: `September-October ${year}`,
          value: `${year}"05B"`,
        },
        {
          type: "Bi-months",
          label: `November-December ${year}`,
          value: `${year}"06B"`,
        },
      ];
      return months;
    },
    GetQuarterly: (year) => {
      const quarterly = [
        {
          type: "Quarters",
          label: `January-March ${year}`,
          value: `${year}"Q1"`,
        },
        { type: "Quarters", label: `April-June ${year}`, value: `${year}"Q2"` },
        {
          type: "Quarters",
          label: `July-September ${year}`,
          value: `${year}"Q3"`,
        },
        {
          type: "Quarters",
          label: `October-December ${year}`,
          value: `${year}"Q4"`,
        },
      ];
      return quarterly;
    },
  
    GetSixMonthly: (year) => {
      const sixMonthly = [
        { type: "Six-months", label: `January-June ${year}`, value: `${year}S1` },
        {
          type: "Six-months",
          label: `July-December ${year}`,
          value: `${year}S2`,
        },
      ];
      return sixMonthly;
    },
    GetSixMonthlyApril: (year) => {
      const sixMonthly = [
        { label: `April-September ${year}`, value: `${year}AprilS1` },
        { label: `October-March ${year + 1}`, value: `${year}AprilS2` },
      ];
      return sixMonthlyApril;
    },
  };
  
  module.exports = { Periods };