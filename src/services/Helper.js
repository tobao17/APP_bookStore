import React, { useState, useEffect } from "react";

export function TimeSince(date) {
  let current = new Date();
  let previous = new Date(date);

  let ddate = previous.toUTCString();
  let msPerMinute = 60 * 1000;
  let msPerHour = msPerMinute * 60;
  let msPerDay = msPerHour * 24;
  let msPerMonth = msPerDay * 30;
  let msPerYear = msPerDay * 365;

  let elapsed = current - previous;
  // console.log("TimeSince -> previous", previous.toString())
  // console.log("TimeSince -> current", current.toString())
  // console.log("TimeSince -> elapsed", elapsed)

  if (elapsed < msPerMinute) {
    return ddate;
  } else if (elapsed < msPerHour) {
    return ddate;
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago - " + ddate;
  } else if (elapsed < msPerMonth) {
    return "~ " + Math.round(elapsed / msPerDay) + " days ago - " + ddate;
  } else if (elapsed < msPerYear) {
    return "~ " + Math.round(elapsed / msPerMonth) + " months ago - " + ddate;
  } else {
    return "~ " + Math.round(elapsed / msPerYear) + " years ago - " + ddate;
  }
}

export function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Set debouncedValue to value (passed in) after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Return a cleanup function that will be called every time ...
      // ... useEffect is re-called. useEffect will only be re-called ...
      // ... if value changes (see the inputs array below).
      // This is how we prevent debouncedValue from changing if value is ...
      // ... changed within the delay period. Timeout gets cleared and restarted.
      // To put it in context, if the user is typing within our app's ...
      // ... search box, we don't want the debouncedValue to update until ...
      // ... they've stopped typing for more than 500ms.
      return () => {
        clearTimeout(handler);
      };
    },
    // Only re-call effect if value changes
    // You could also add the "delay" var to inputs array if you ...
    // ... need to be able to change that dynamically.
    [value]
  );

  return debouncedValue;
}
