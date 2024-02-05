let RelativePeriods = {
    GetDays: () => {
      const days = [
        {dimension: 'relative',type:'Days', label: `Today`, value: `TODAY` },
        {dimension: 'relative',type:'Days', label: `Yesterday`, value: `YESTERDAY` },
        {dimension: 'relative',type:'Days', label: `Last 3 days`, value: `LAST_3_DAYS` },
        {dimension: 'relative',type:'Days', label: `Last 7 days`, value: `LAST_7_DAYS` },
        {dimension: 'relative',type:'Days', label: `Last 14 days`, value: `LAST_14_DAYS` },
      ];
      return days;
    },
  
    GetYearly: () => {
      const years = [
        {dimension: 'relative',type:'Years', label: `This year`, value: `THIS_YEAR` },
        {dimension: 'relative',type:'Years', label: `Last year`, value: `LAST_YEAR` },
        {dimension: 'relative',type:'Years', label: `Last 5 years`, value: `LAST_5_YEARS` },
        {dimension: 'relative',type:'Years', label: `Last 10 years`, value: `LAST_10_YEARS` },
      ];
      return years;
    },
  
    GetWeekly: () => {
      const weeks = [
        {dimension: 'relative',type:'Weeks', label: `This week`, value: `THIS_WEEK` },
        {dimension: 'relative',type:'Weeks', label: `Last week`, value: `LAST_WEEK` },
        {dimension: 'relative',type:'Weeks', label: `Last 4 weeks`, value: `LAST_4_WEEKS` },
        {dimension: 'relative',type:'Weeks', label: `Last 12 weeks`, value: `LAST_12_WEEKS` },
        {dimension: 'relative',type:'Weeks', label: `Last 52 weeks`, value: `LAST_52_WEEKS` },
      ];
      return weeks;
    },
    GetBiWeekly: () => {
      const biWeeks = [
        {dimension: 'relative',type:'Bi-weeks', label: `This bi-week`, value: `THIS_BIWEEK` },
        {dimension: 'relative',type:'Bi-weeks', label: `Last bi-week`, value: `LAST_BIWEEK` },
        {dimension: 'relative',type:'Bi-weeks', label: `Last 4-biweeks`, value: `LAST_4_BIWEEKS` },
      ];
      return biWeeks;
    },
  
    GetMonthly: () => {
      const months = [
        {dimension: 'relative',type:'Months', label: `This month`, value: `THIS_MONTH` },
        {dimension: 'relative',type:'Months', label: `Last month`, value: `LAST_MONTH` },
        {dimension: 'relative',type:'Months', label: `Last 3 months`, value: `LAST_3_MONTHS` },
        {dimension: 'relative',type:'Months', label: `Last 6 months`, value: `LAST_6_MONTHS` },
        {dimension: 'relative',type:'Months', label: `Last 12 months`, value: `LAST_12_MONTHS` },
        {dimension: 'relative',type:'Months', label: `Months this year`, value: `MONTHS_THIS_YEAR` },
      ];
      return months;
    },
    GetBiMonthly: () => {
      const biMonths = [
        {dimension: 'relative',type:'Bi-months', label: `This bi-month`, value: `THIS_BIMONTH` },
        {dimension: 'relative',type:'Bi-months', label: `Last bi-month`, value: `LAST_BIMONTH` },
        {dimension: 'relative',type:'Bi-months', label: `Last 6-months`, value: `LAST_6_BIMONTHS` },
        {dimension: 'relative',type:'Bi-months', label: `Months this year`, value: `BIMONTHS_THIS_YEAR` },
      ];
      return biMonths;
    },
    GetQuarterly: () => {
      const quarters = [
        {dimension: 'relative',type:'Quarters', label: `This quarter`, value: `THIS_QUARTER` },
        {dimension: 'relative',type:'Quarters', label: `Last quarter`, value: `LAST_QUARTER` },
        {dimension: 'relative',type:'Quarters', label: `Last 4-quarters`, value: `LAST_4_QUARTERS` },
        {dimension: 'relative',type:'Quarters', label: `Quarters this year`, value: `QUARTERS_THIS_YEAR` },
      ];
      return quarters;
    },
  
    GetSixMonthly: () => {
      const sixMonthly = [
        {dimension: 'relative',type:'Six-months', label: `This six-month`, value: `THIS_SIX_MONTH` },
        {dimension: 'relative',type:'Six-months', label: `Last 6-months`, value: `LAST_SIX_MONTH` },
        {dimension: 'relative',type:'Six-months', label: `Last 2-six-months`, value: `LAST_2_SIXMONTHS` },
      ];
      return sixMonthly;
    },
    GetFinancialYear: () => {
      const financialYear = [
        {dimension: 'relative',type:'Financial Years', label: `This financial year`, value: `THIS_FINANCIAL_YEAR` },
        {dimension: 'relative',type:'Financial Years', label: `Last financial year`, value: `LAST_FINANCIAL_YEAR` },
        {dimension: 'relative',type:'Financial Years', label: `Last 5 financial year`, value: `LAST_5_FINANCIAL_YEARS` },
      ];
      return financialYear;
    },
  };
  
  module.exports = { RelativePeriods };