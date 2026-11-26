const test = require("node:test");
const assert = require("node:assert/strict");
const { getUtcDayRange } = require("./date");

test("returns the UTC day boundaries for a valid date", () => {
  const range = getUtcDayRange("2026-02-28");

  assert.equal(range.start.toISOString(), "2026-02-28T00:00:00.000Z");
  assert.equal(range.end.toISOString(), "2026-03-01T00:00:00.000Z");
});

test("rejects malformed and impossible dates", () => {
  assert.equal(getUtcDayRange("2026-2-28"), null);
  assert.equal(getUtcDayRange("2026-02-30"), null);
  assert.equal(getUtcDayRange(undefined), null);
});
