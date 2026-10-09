/**
 * lib/calculators/dateUtils.js
 * Comprehensive date & time calculation utilities for Age, Time, Date, and Hours calculators.
 */

// --- 1. CALENDAR DATE PARSER & AGE CALCULATOR ---

export function parseCalendarDate(input) {
  if (!input) return null;
  if (input instanceof Date) {
    if (isNaN(input.getTime())) return null;
    return new Date(input.getFullYear(), input.getMonth(), input.getDate(), 12, 0, 0);
  }
  const str = String(input).trim();
  const match = str.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (match) {
    const y = parseInt(match[1], 10);
    const m = parseInt(match[2], 10);
    const d = parseInt(match[3], 10);
    if (m < 1 || m > 12 || d < 1 || d > 31) return null;
    const dt = new Date(y, m - 1, d, 12, 0, 0);
    // Strict calendar check (catches 1900-02-29, 2023-02-29, 2024-04-31)
    if (dt.getFullYear() !== y || dt.getMonth() !== (m - 1) || dt.getDate() !== d) {
      return null;
    }
    return dt;
  }
  const fallback = new Date(str);
  if (isNaN(fallback.getTime())) return null;
  return new Date(fallback.getFullYear(), fallback.getMonth(), fallback.getDate(), 12, 0, 0);
}

export function calculateAge(birthDateStr, targetDateStr = null) {
  const birthDate = parseCalendarDate(birthDateStr);
  const targetDate = targetDateStr ? parseCalendarDate(targetDateStr) : parseCalendarDate(new Date());

  if (!birthDate || !targetDate) return null;
  if (targetDate.getTime() < birthDate.getTime()) return null; // Target cannot be before birth

  let years = targetDate.getFullYear() - birthDate.getFullYear();
  let months = targetDate.getMonth() - birthDate.getMonth();
  let days = targetDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    // Days in previous month relative to targetDate
    const prevMonthLastDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0, 12, 0, 0).getDate();
    days += prevMonthLastDay;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Total differences
  const diffMs = targetDate.getTime() - birthDate.getTime();
  const totalDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours = totalDays * 24;

  // Next birthday calculation
  const currentYear = targetDate.getFullYear();
  let nextBday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate(), 12, 0, 0);
  if (nextBday.getTime() < targetDate.getTime()) {
    nextBday = new Date(currentYear + 1, birthDate.getMonth(), birthDate.getDate(), 12, 0, 0);
  }
  const daysUntilBirthday = Math.round((nextBday.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24));

  return {
    years,
    months,
    days,
    ageString: `${years} years, ${months} months, ${days} days`,
    totalMonths,
    totalWeeks,
    totalDays,
    totalHours,
    daysUntilBirthday: daysUntilBirthday === 0 ? 'Today!' : daysUntilBirthday
  };
}


// --- 2. TIME CALCULATOR (DURATION ADDITION / SUBTRACTION) ---

export function calculateTimeDuration({ h1 = 0, m1 = 0, s1 = 0, h2 = 0, m2 = 0, s2 = 0, operation = 'add' }) {
  const sec1 = (Number(h1) || 0) * 3600 + (Number(m1) || 0) * 60 + (Number(s1) || 0);
  const sec2 = (Number(h2) || 0) * 3600 + (Number(m2) || 0) * 60 + (Number(s2) || 0);

  let totalSec = 0;
  if (operation === 'add') {
    totalSec = sec1 + sec2;
  } else {
    totalSec = sec1 - sec2;
  }

  const isNegative = totalSec < 0;
  const absSec = Math.abs(totalSec);

  const hours = Math.floor(absSec / 3600);
  const minutes = Math.floor((absSec % 3600) / 60);
  const seconds = absSec % 60;
  const decimalHours = Number((absSec / 3600).toFixed(4));

  return {
    hours: isNegative ? -hours : hours,
    minutes,
    seconds,
    totalSeconds: totalSec,
    decimalHours: isNegative ? -decimalHours : decimalHours,
    formatted: `${isNegative ? '-' : ''}${hours}h ${minutes}m ${seconds}s`,
    timeCode: `${isNegative ? '-' : ''}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  };
}


// --- 3. DATE CALCULATOR (DIFFERENCE / ADD / SUBTRACT) ---

export function calculateDateDifference(startDateStr, endDateStr, includeEndDay = false) {
  const d1 = parseCalendarDate(startDateStr);
  const d2 = parseCalendarDate(endDateStr);

  if (!d1 || !d2) return null;

  const start = d1.getTime() <= d2.getTime() ? d1 : d2;
  const end = d1.getTime() <= d2.getTime() ? d2 : d1;
  const isReversed = d1.getTime() > d2.getTime();

  let diffDays = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  if (includeEndDay) diffDays += 1;

  const weeks = Math.floor(diffDays / 7);
  const remDays = diffDays % 7;

  // Count business / working days (Mon-Fri)
  let businessDays = 0;
  const cur = new Date(start.getTime());
  while (cur.getTime() <= end.getTime()) {
    const day = cur.getDay();
    if (day !== 0 && day !== 6) businessDays++;
    cur.setDate(cur.getDate() + 1);
  }

  return {
    totalDays: diffDays,
    weeks,
    remainingDays: remDays,
    businessDays,
    weekendDays: diffDays - businessDays,
    formatted: `${diffDays} days (${weeks} weeks and ${remDays} days)`,
    isReversed
  };
}

export function addOrSubtractDays(startDateStr, count, unit = 'days', operation = 'add') {
  const d = parseCalendarDate(startDateStr);
  if (!d || isNaN(Number(count))) return null;

  const num = Number(count) * (operation === 'subtract' ? -1 : 1);

  if (unit === 'days') {
    d.setDate(d.getDate() + num);
  } else if (unit === 'weeks') {
    d.setDate(d.getDate() + num * 7);
  } else if (unit === 'months') {
    d.setMonth(d.getMonth() + num);
  } else if (unit === 'years') {
    d.setFullYear(d.getFullYear() + num);
  }

  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return {
    resultDate: `${y}-${m}-${day}`,
    formatted: d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  };
}


// --- 4. HOURS CALCULATOR (TIME CARD / WORK HOURS) ---

export function calculateWorkHours({ startTime, endTime, breakMinutes = 0, hourlyRate = 0 }) {
  if (!startTime || !endTime) return null;

  // Expect "HH:MM" 24h format
  const [sH, sM] = startTime.split(':').map(Number);
  const [eH, eM] = endTime.split(':').map(Number);

  if (isNaN(sH) || isNaN(sM) || isNaN(eH) || isNaN(eM)) return null;

  let startTotalMins = sH * 60 + sM;
  let endTotalMins = eH * 60 + eM;

  // Handle shift overnight past midnight (e.g. 22:00 to 06:00)
  if (endTotalMins < startTotalMins) {
    endTotalMins += 24 * 60;
  }

  const rawMinutes = endTotalMins - startTotalMins;
  const breakMins = Math.max(0, Number(breakMinutes) || 0);
  const netMinutes = Math.max(0, rawMinutes - breakMins);

  const hours = Math.floor(netMinutes / 60);
  const minutes = netMinutes % 60;
  const decimalHours = Number((netMinutes / 60).toFixed(2));

  const rate = Number(hourlyRate) || 0;
  const totalPay = rate > 0 ? Number((decimalHours * rate).toFixed(2)) : null;

  return {
    rawMinutes,
    breakMinutes: breakMins,
    netMinutes,
    hours,
    minutes,
    decimalHours,
    formatted: `${hours} hours, ${minutes} minutes`,
    totalPay
  };
}
