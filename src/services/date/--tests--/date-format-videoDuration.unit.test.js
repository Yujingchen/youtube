import { parseISO8601TimePattern } from "../date-format";
import { getVideoDurationString } from "../date-format";
describe("date-format ISO8601", () => {
  test("parse 4 seconds ISO8601 video duration string ", () => {
    expect(parseISO8601TimePattern("PT4S")).toEqual({
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 4
    });
  });

  test("parse 13 seconds ISO8601 video duration string", () => {
    expect(parseISO8601TimePattern("PT13S")).toEqual({
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 13
    });
  });

  test("parse 01:00 min ISO8601 video duration string", () => {
    expect(parseISO8601TimePattern("PT1M")).toEqual({
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 1,
      seconds: 0
    });
  });

  test("parse 1:31 min ISO8601 video duration string", () => {
    expect(parseISO8601TimePattern("PT1M31S")).toEqual({
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 1,
      seconds: 31
    });
  });

  test("parse 10:10 min ISO8601 video duration string", () => {
    expect(parseISO8601TimePattern("PT10M10S")).toEqual({
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 10,
      seconds: 10
    });
  });

  test("parse 03:06:15 hours ISO8601 video duration string", () => {
    expect(parseISO8601TimePattern("PT3H6M15S")).toEqual({
      years: 0,
      months: 0,
      days: 0,
      hours: 3,
      minutes: 6,
      seconds: 15
    });
  });

  test("parse 13:30:47 hours ISO8601 video duration string", () => {
    expect(parseISO8601TimePattern("PT13H30M47S")).toEqual({
      years: 0,
      months: 0,
      days: 0,
      hours: 13,
      minutes: 30,
      seconds: 47
    });
  });

  test("parse 13:30:47 hours ISO8601 video duration string", () => {
    expect(parseISO8601TimePattern("P1DT25M5S")).toEqual({
      years: 0,
      months: 0,
      days: 1,
      hours: 0,
      minutes: 25,
      seconds: 5
    });
  });
});

describe("services/date-format getVideoDurationString()", () => {
  test("getVideoDurationString() formats 4s video", () => {
    expect(getVideoDurationString("PT4S")).toEqual("0:04");
  });

  test("getVideoDurationString() formats 13s video", () => {
    expect(getVideoDurationString("PT13S")).toEqual("0:13");
  });

  test("getVideoDurationString() formats 1min video", () => {
    expect(getVideoDurationString("PT1M")).toEqual("1:00");
  });

  test("getVideoDurationString() formats 01:31 min video", () => {
    expect(getVideoDurationString("PT1M31S")).toEqual("1:31");
  });

  test("getVideoDurationString() formats 10:10 min video", () => {
    expect(getVideoDurationString("PT10M10S")).toEqual("10:10");
  });

  test("getVideoDurationString() formats 3:06:15 hours video", () => {
    expect(getVideoDurationString("PT3H6M15S")).toEqual("3:06:15");
  });

  test("getVideoDurationString() formats 13:30:47 hours video", () => {
    expect(getVideoDurationString("PT13H30M47S")).toEqual("13:30:47");
  });

  test("getVideoDurationString() formats 01:00:25:05 days video", () => {
    expect(getVideoDurationString("P1DT25M5S")).toEqual("24:25:05");
  });
});
