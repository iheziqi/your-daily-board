import { getPreviousDay } from '../../utils/helpers';

describe('helper functions unit tests', () => {
  it('should return the previous day for a given date', () => {
    expect(getPreviousDay('2023-08-15')).toBe('2023-08-14');
    expect(getPreviousDay('2023-02-28')).toBe('2023-02-27');
  });

  it('should handle the edge case of the previous date of the first day of a month', () => {
    expect(getPreviousDay('2023-08-01')).toBe('2023-07-31');
    expect(getPreviousDay('2023-09-01')).toBe('2023-08-31');
    expect(getPreviousDay('2023-10-01')).toBe('2023-09-30');
    expect(getPreviousDay('2023-11-01')).toBe('2023-10-31');
  });

  it('should handle the edge case of the previous date of January 1st', () => {
    expect(getPreviousDay('2024-01-01')).toBe('2023-12-31');
  });
});
