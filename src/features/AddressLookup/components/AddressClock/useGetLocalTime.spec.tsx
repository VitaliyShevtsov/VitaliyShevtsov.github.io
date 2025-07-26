import { useGetLocalTime } from './useGetLocalTime';

describe('useGetLocalTime', () => {
  test.each`
    timeZone    | expected
    ${'+00:00'} | ${'00:00:00'}
    ${'+03:00'} | ${'03:00:00'}
    ${'+10:00'} | ${'10:00:00'}
    ${'-12:00'} | ${'12:00:00'}
  `(`should return $expected if $timeZone passed`, ({ timeZone, expected }) => {
    const dateMock = new Date('2025-07-26T00:00:00+00:00');
    const getCurrentTime = useGetLocalTime();
    const result = getCurrentTime(dateMock, timeZone);

    expect(result).toBe(expected);
  });
});
