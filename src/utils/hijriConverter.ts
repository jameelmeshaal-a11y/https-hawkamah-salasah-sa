// Hijri to Gregorian conversion using the hijri-converter npm package
import HijriDate from "hijri-converter";

const HIJRI_MONTHS = [
  "محرم", "صفر", "ربيع الأول", "ربيع الثاني",
  "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان",
  "رمضان", "شوال", "ذو القعدة", "ذو الحجة",
];

const GREGORIAN_MONTHS = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
];

export function gregorianToHijri(date: Date): { year: number; month: number; day: number } {
  try {
    const hijri = new HijriDate(date.getFullYear(), date.getMonth() + 1, date.getDate(), { fromGregorian: true });
    return { year: hijri.year, month: hijri.month, day: hijri.day };
  } catch {
    // Fallback: approximate calculation
    const jd = Math.floor((date.getTime() - new Date(1970, 0, 1).getTime()) / 86400000) + 2440588;
    const l = jd - 1948440 + 10632;
    const n = Math.floor((l - 1) / 10631);
    const rem = l - 10631 * n + 354;
    const j = Math.floor((10985 - rem) / 5316) * Math.floor((50 * rem) / 17719) + Math.floor(rem / 5670) * Math.floor((43 * rem) / 15238);
    const remL = rem - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
    const month = Math.floor((24 * remL) / 709);
    const day = remL - Math.floor((709 * month) / 24);
    const year = 30 * n + j - 30;
    return { year, month, day };
  }
}

export function hijriToGregorian(hijriYear: number, hijriMonth: number, hijriDay: number): Date {
  try {
    const hijri = new HijriDate(hijriYear, hijriMonth, hijriDay);
    return new Date(hijri.toGregorian().year, hijri.toGregorian().month - 1, hijri.toGregorian().day);
  } catch {
    // Fallback
    const y = hijriYear;
    const m = hijriMonth;
    const d = hijriDay;
    const jd = Math.floor((11 * y + 3) / 30) + 354 * y + 30 * m - Math.floor((m - 1) / 2) + d + 1948440 - 385;
    const a = jd + 68569;
    const b = Math.floor(4 * a / 146097);
    const c = a - Math.floor((146097 * b + 3) / 4);
    const dd = Math.floor(4000 * (c + 1) / 1461001);
    const e = c - Math.floor(1461 * dd / 4) + 31;
    const f = Math.floor(80 * e / 2447);
    const gDay = e - Math.floor(2447 * f / 80);
    const g = Math.floor(f / 11);
    const gMonth = f + 2 - 12 * g;
    const gYear = 100 * (b - 49) + dd + g;
    return new Date(gYear, gMonth - 1, gDay);
  }
}

export function formatHijriDate(year: number, month: number, day: number): string {
  return `${day} ${HIJRI_MONTHS[month - 1]} ${year}`;
}

export function formatGregorianDate(date: Date): string {
  return `${date.getDate()} ${GREGORIAN_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatGregorianDateShort(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${date.getFullYear()}/${month}/${day}`;
}

export function formatHijriDateShort(year: number, month: number, day: number): string {
  return `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
}

export function getTodayHijri(): { year: number; month: number; day: number } {
  return gregorianToHijri(new Date());
}

export function addDaysToHijri(
  year: number, month: number, day: number, days: number
): { year: number; month: number; day: number } {
  const gregorian = hijriToGregorian(year, month, day);
  gregorian.setDate(gregorian.getDate() + days);
  return gregorianToHijri(gregorian);
}

export { HIJRI_MONTHS, GREGORIAN_MONTHS };
