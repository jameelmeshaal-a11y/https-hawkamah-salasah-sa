const HIJRI_MONTHS = [
  "محرم", "صفر", "ربيع الأول", "ربيع الثاني",
  "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان",
  "رمضان", "شوال", "ذو القعدة", "ذو الحجة",
];

const GREGORIAN_MONTHS = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
];

const hijriFormatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
});

function parseHijriParts(date: Date): { year: number; month: number; day: number } {
  try {
    const parts = hijriFormatter.formatToParts(date);
    const day = parseInt(parts.find(p => p.type === 'day')?.value || '1', 10);
    const month = parseInt(parts.find(p => p.type === 'month')?.value || '1', 10);
    const yearStr = parts.find(p => p.type === 'year')?.value || '1446';
    const year = parseInt(yearStr, 10);
    return { year, month, day };
  } catch {
    return { year: 1446, month: 1, day: 1 };
  }
}

export function gregorianToHijri(date: Date): { year: number; month: number; day: number } {
  return parseHijriParts(date);
}

export function hijriToGregorian(hijriYear: number, hijriMonth: number, hijriDay: number): Date {
  try {
    // Binary search: find Gregorian date whose Hijri conversion matches
    const estimatedGregorian = new Date(
      Math.round((hijriYear - 1) * 354.36667 + (hijriMonth - 1) * 29.53056 + hijriDay + 227014) * 86400000
    );
    
    // Search in a window around the estimate
    for (let offset = -30; offset <= 30; offset++) {
      const candidate = new Date(estimatedGregorian.getTime() + offset * 86400000);
      const h = parseHijriParts(candidate);
      if (h.year === hijriYear && h.month === hijriMonth && h.day === hijriDay) {
        return candidate;
      }
    }
    return estimatedGregorian;
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
