// Hijri to Gregorian conversion utilities
// Based on the Umm al-Qura calendar

const HIJRI_MONTHS = [
  "محرم",
  "صفر",
  "ربيع الأول",
  "ربيع الثاني",
  "جمادى الأولى",
  "جمادى الآخرة",
  "رجب",
  "شعبان",
  "رمضان",
  "شوال",
  "ذو القعدة",
  "ذو الحجة",
];

const GREGORIAN_MONTHS = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

// Umm al-Qura calendar data (1400-1500 Hijri)
// Each entry represents the number of days from the epoch to the start of that Hijri month
const UMM_AL_QURA_DATA: Record<number, number[]> = {
  1444: [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30],
  1445: [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
  1446: [29, 30, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29],
  1447: [30, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29, 30],
  1448: [29, 30, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29],
  1449: [30, 29, 30, 29, 30, 30, 29, 30, 29, 30, 29, 30],
  1450: [29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30, 29],
};

// Reference point: 1 Muharram 1444 = July 30, 2022
const EPOCH_HIJRI = { year: 1444, month: 1, day: 1 };
const EPOCH_GREGORIAN = new Date(2022, 6, 30); // July 30, 2022

function getHijriMonthDays(year: number): number[] {
  if (UMM_AL_QURA_DATA[year]) {
    return UMM_AL_QURA_DATA[year];
  }
  // Default alternating pattern for years not in data
  return [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
}

function daysInHijriYear(year: number): number {
  return getHijriMonthDays(year).reduce((sum, days) => sum + days, 0);
}

function daysInHijriMonth(year: number, month: number): number {
  const months = getHijriMonthDays(year);
  return months[month - 1] || 30;
}

export function gregorianToHijri(date: Date): { year: number; month: number; day: number } {
  const diffDays = Math.floor((date.getTime() - EPOCH_GREGORIAN.getTime()) / (1000 * 60 * 60 * 24));
  
  let hijriYear = EPOCH_HIJRI.year;
  let hijriMonth = EPOCH_HIJRI.month;
  let hijriDay = EPOCH_HIJRI.day;
  
  let remainingDays = diffDays;
  
  if (remainingDays >= 0) {
    // Forward from epoch
    while (remainingDays > 0) {
      const daysInCurrentMonth = daysInHijriMonth(hijriYear, hijriMonth);
      const daysLeftInMonth = daysInCurrentMonth - hijriDay + 1;
      
      if (remainingDays >= daysLeftInMonth) {
        remainingDays -= daysLeftInMonth;
        hijriMonth++;
        hijriDay = 1;
        
        if (hijriMonth > 12) {
          hijriMonth = 1;
          hijriYear++;
        }
      } else {
        hijriDay += remainingDays;
        remainingDays = 0;
      }
    }
  } else {
    // Backward from epoch
    remainingDays = Math.abs(remainingDays);
    while (remainingDays > 0) {
      if (remainingDays >= hijriDay) {
        remainingDays -= hijriDay;
        hijriMonth--;
        
        if (hijriMonth < 1) {
          hijriMonth = 12;
          hijriYear--;
        }
        
        hijriDay = daysInHijriMonth(hijriYear, hijriMonth);
      } else {
        hijriDay -= remainingDays;
        remainingDays = 0;
      }
    }
  }
  
  return { year: hijriYear, month: hijriMonth, day: hijriDay };
}

export function hijriToGregorian(hijriYear: number, hijriMonth: number, hijriDay: number): Date {
  let totalDays = 0;
  
  // Calculate days from epoch to the given Hijri date
  if (hijriYear >= EPOCH_HIJRI.year) {
    // Forward calculation
    for (let y = EPOCH_HIJRI.year; y < hijriYear; y++) {
      totalDays += daysInHijriYear(y);
    }
    
    // Subtract days in the epoch year before the epoch month
    for (let m = 1; m < EPOCH_HIJRI.month; m++) {
      totalDays -= daysInHijriMonth(EPOCH_HIJRI.year, m);
    }
    totalDays -= (EPOCH_HIJRI.day - 1);
    
    // Add days in the target year
    for (let m = 1; m < hijriMonth; m++) {
      totalDays += daysInHijriMonth(hijriYear, m);
    }
    totalDays += hijriDay - 1;
  } else {
    // Backward calculation
    for (let y = hijriYear; y < EPOCH_HIJRI.year; y++) {
      totalDays -= daysInHijriYear(y);
    }
    
    for (let m = 1; m < hijriMonth; m++) {
      totalDays += daysInHijriMonth(hijriYear, m);
    }
    totalDays += hijriDay - 1;
  }
  
  const result = new Date(EPOCH_GREGORIAN);
  result.setDate(result.getDate() + totalDays);
  return result;
}

export function formatHijriDate(year: number, month: number, day: number): string {
  return `${day} ${HIJRI_MONTHS[month - 1]} ${year}`;
}

export function formatGregorianDate(date: Date): string {
  const day = date.getDate();
  const month = GREGORIAN_MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export function formatGregorianDateShort(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${year}/${month}/${day}`;
}

export function formatHijriDateShort(year: number, month: number, day: number): string {
  return `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
}

export function getTodayHijri(): { year: number; month: number; day: number } {
  return gregorianToHijri(new Date());
}

export function addDaysToHijri(
  year: number,
  month: number,
  day: number,
  days: number
): { year: number; month: number; day: number } {
  const gregorian = hijriToGregorian(year, month, day);
  gregorian.setDate(gregorian.getDate() + days);
  return gregorianToHijri(gregorian);
}

export { HIJRI_MONTHS, GREGORIAN_MONTHS };
