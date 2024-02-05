import { Periods } from "./fixedPeriods"
import { RelativePeriods } from "./relativePeriods";

export default class Period{
    fixedPeriod(year){
    let period = []
    period.push(...Periods.GetBiMonthly(year))
    period.push(...Periods.GetBiWeekly(year))
    period.push(...Periods.GetMonthly(year))
    period.push(...Periods.GetQuarterly(year))
    period.push(...Periods.GetSixMonthly(year))
    period.push(...Periods.GetWeekly(year))
    period.push(...Periods.GetYearly(year))
    return period
  }
  relativePeriod(){
    let period = []
    period.push(...RelativePeriods.GetBiMonthly())
    period.push(...RelativePeriods.GetBiWeekly())
    period.push(...RelativePeriods.GetDays())
    period.push(...RelativePeriods.GetFinancialYear())
    period.push(...RelativePeriods.GetMonthly())
    period.push(...RelativePeriods.GetQuarterly())
    period.push(...RelativePeriods.GetSixMonthly())
    period.push(...RelativePeriods.GetWeekly())
    period.push(...RelativePeriods.GetYearly())
    return period
  }
}