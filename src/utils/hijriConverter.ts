// Hijri to Gregorian conversion using the hijri-converter npm package
import { toHijri, toGregorian } from "hijri-converter";

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
    const result = toHijri(date.getFullYear(), date.getMonth() + 1, date.getDate());
    return { year: result.hy, month: result.hm, day: result.hd };
  } catch {
    return { year: 1446, month: 1, day: 1 };
  }
}

export function hijriToGregorian(hijriYear: number, hijriMonth: number, hijriDay: number): Date {
  try {
    const result = toGregorian(hijriYear, hijriMonth, hijriDay);
    return new Date(result.gy, result.gm - 1, result.gd);
  } catch {
    return new Date();
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
