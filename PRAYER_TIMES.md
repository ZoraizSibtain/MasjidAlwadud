# 🕒 Prayer Time Highlighting Guide

This document explains how the prayer time highlighting works and how to verify it's functioning correctly.

## Overview

The Masjid Alwadud website displays real-time prayer times fetched from the [Al Adhan API](https://aladhan.com/api) with **automatic highlighting** of the current prayer time based on your local time.

---

## API Configuration

### Endpoint Used
```
https://api.aladhan.com/v1/timingsByAddress/{date}
```

### Parameters
| Parameter | Value | Purpose |
|-----------|-------|---------|
| `date` | 30-03-2026 (DD-MM-YYYY) | Prayer times for specific date |
| `address` | 445 GERARD AVE, BRONX, NY 10451 | Location for prayer calculation |
| `method` | 3 | Calculation method (adjusted for Bronx) |
| `shafaq` | general | Isha twilight definition |
| `tune` | 5,3,5,7,9,-1,0,8,-6 | Fine-tuning adjustments |
| `timezonestring` | America/New_York | Local timezone |
| `calendarMethod` | UAQ | Islamic calendar method |

---

## How Prayer Highlighting Works

### 1. **Fetch Prayer Times**
- Fetched daily from Al Adhan API
- Cached for entire day
- Falls back to hardcoded times if API unavailable

### 2. **Determine Current Prayer Window**
Each prayer has a **start time** (adhan) and an **end time** (next prayer's adhan):

```
Fajr:     05:42 - 07:01 (Sunrise)
Sunrise:  07:01 - 12:44 (Dhuhr)
Dhuhr:    12:44 - 15:38 (Asr)
Asr:      15:38 - 18:02 (Maghrib)
Maghrib:  18:02 - 19:21 (Isha)
Isha:     19:21 - 05:42 (next Fajr)
```

### 3. **Compare Current Time**
- Current time converted to minutes since midnight
- Compared against prayer window ranges
- Matching prayer is highlighted with amber/yellow color

### 4. **Update Automatically**
- Updates every 60 seconds
- Automatically refreshes at midnight
- Console logs current time & prayer

---

## Visual Highlighting

### Current Prayer (Active)
When a prayer time matches the current time window:

```
Icon:       🟡 Amber/Yellow
Name:       Highlighted "Fajr" with "Now" badge
Time:       Amber text
Background: Light amber 10% with amber border
```

### Next Prayer
When showing the next upcoming prayer:

```
Icon:       ⚪ Semi-transparent white
Name:       Shows "Next" badge
Time:       Standard white text
Background: Light white 5% background
```

### Other Prayers
All non-current prayers:

```
Icon:       ⚪ Faded white
Name:       Standard text
Time:       Standard white text
Background: Light 5% background
```

---

## Testing Prayer Highlighting

### Option 1: Wait for Prayer Time 🕐
Simply wait until the actual prayer time window. The highlighting will appear automatically.

**Current prayer windows today** (March 30, 2026):
- Fajr: ~5:42 AM
- Dhuhr: ~12:44 PM  
- Asr: ~3:38 PM
- Maghrib: ~6:02 PM
- Isha: ~7:21 PM

### Option 2: Test Function (Console)
Use the built-in test function to simulate different times:

#### Test at 1:30 PM (Dhuhr time)
```javascript
testPrayerTime("13:30")

// Output:
// 🧪 Test: 13:30 → Current: Dhuhr, Next: Asr
// Prayer times available: Fajr: 05:42 | Sunrise: 07:01 | Dhuhr: 12:44 | Asr: 15:38 | Maghrib: 18:02 | Isha: 19:21
```

#### Test at 4:45 PM (Asr time)
```javascript
testPrayerTime("16:45")

// Output:
// 🧪 Test: 16:45 → Current: Asr, Next: Maghrib
```

#### Test at 8:00 PM (Isha time)
```javascript
testPrayerTime("20:00")

// Output:
// 🧪 Test: 20:00 → Current: Isha, Next: Fajr
```

#### Test before Fajr (midnight)
```javascript
testPrayerTime("03:00")

// Output:
// 🧪 Test: 03:00 → Current: None, Next: Fajr
```

#### Test using minutes format
```javascript
testPrayerTime(825)  // 13:45 (825 minutes from midnight)

// Output:
// 🧪 Test: 13:45 → Current: Dhuhr, Next: Asr
```

### Option 3: Live Console Monitoring
The browser console logs current time every 60 seconds:

```javascript
// Check console logs (press F12 → Console tab)
📍 Current time: 13:45 (825 minutes) | Current prayer: Dhuhr | Next: Asr
📍 Current time: 13:46 (826 minutes) | Current prayer: Dhuhr | Next: Asr
📍 Current time: 13:47 (827 minutes) | Current prayer: Dhuhr | Next: Asr
```

---

## Debugging Issues

### Prayer Times Not Showing
1. **Check API**: Open DevTools (F12) → Network tab
2. **Look for**: Request to `api.aladhan.com`
3. **Verify**: Response status is 200
4. **Fallback**: If API fails, hardcoded times are used

### Current Prayer Not Highlighting
1. **Check console**: `testPrayerTime()` to verify prayer detection
2. **Verify address**: Should be "445 GERARD AVE, BRONX, NY 10451"
3. **Check timezone**: Should be "America/New_York"
4. **Inspect element**: Verify CSS classes are applied

### Manual Verification Steps

#### Step 1: Check Fetched Times
In browser console:
```javascript
console.log(PRAYER_CONFIG)
// Shows:
// [
//   {name: "Fajr", adhan: "05:42", iqamah: "06:15", ...},
//   {name: "Sunrise", adhan: "07:01", iqamah: null, ...},
//   ...
// ]
```

#### Step 2: Check Current Detection
```javascript
const now = new Date();
const mins = now.getHours() * 60 + now.getMinutes();
const {current, next} = getCurrentPrayer(mins);
console.log(`Current time: ${mins} mins | Prayer: ${current} | Next: ${next}`)
```

#### Step 3: Verify Highlighting
```javascript
// Manually render at specific time
const testMinutes = 13 * 60 + 45;  // 1:45 PM
const {current, next} = getCurrentPrayer(testMinutes);
console.log(current === "Dhuhr" ? "✓ Dhuhr detected" : "✗ Wrong prayer")
```

---

## Prayer Time Calculation

### Time Conversion
- **Input**: "HH:MM" format (24-hour)
- **Conversion**: Hours × 60 + Minutes
- **Example**: 13:45 → (13 × 60) + 45 = 825 minutes

### Window Determination
```javascript
For each prayer:
  Start: Prayer's adhan time (in minutes)
  End: Next prayer's adhan time (in minutes)
  
If currentMinutes >= Start AND currentMinutes < End:
  Current prayer found ✓
```

### Edge Case: Isha to Fajr
The last prayer (Isha) window extends to 24:00 (1440 minutes):
```javascript
Isha start: 19:21 (1161 minutes)
Isha end:   24:00 (1440 minutes) // wraps to next day
```

---

## Performance

### Update Frequency
- **Manual updates**: Every 60 seconds via `setInterval()`
- **User action**: Immediate on page load
- **API fetch**: Once per day (cached)
- **Re-render**: Every 60 seconds

### Optimization
- Efficient time comparison (converts to minutes, no string parsing)
- DOM updates only when needed
- No unnecessary API calls (cached per day)
- CSS transitions for smooth highlighting

---

## Iqamah Times

The website also displays **Iqamah times** (congregation start time) below each adhan:

```javascript
const IQAMAH_TIMES = {
  Fajr:    "06:15",    // 33 mins after adhan
  Dhuhr:   "13:15",    // 31 mins after adhan
  Asr:     "16:00",    // 22 mins after adhan
  Maghrib: null,       // Immediately after adhan
  Isha:    "20:00",    // 39 mins after adhan
};
```

These can be customized in `index.html` at the top of the JavaScript.

---

## References

- **Al Adhan API**: https://aladhan.com/api
- **Prayer Times**: https://aladhan.com/prayer-times
- **Calculation Methods**: https://www.aladhan.com/prayer-times-calculation
- **Timezone Info**: America/New_York (Eastern Time)

---

## Troubleshooting Checklist

- [ ] Verify current time is correct on your device
- [ ] Check that prayer times loaded from API (console logs)
- [ ] Use `testPrayerTime()` to verify logic
- [ ] Verify address is correct (445 GERARD AVE, BRONX, NY 10451)
- [ ] Check browser timezone is set correctly
- [ ] Clear cache if CSS highlighting not showing (Ctrl+Shift+R)
- [ ] Check console for any JavaScript errors (F12)

---

**Last Updated**: March 30, 2026
**Status**: ✅ Fully Functional
