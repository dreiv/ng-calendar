// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const validChanges = (changes: any): boolean =>
  changes.subject && changes.time.start && changes.time.end && changes.date;
