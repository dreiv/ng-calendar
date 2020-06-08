// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const validChanges = (changes: any): boolean =>
  changes.subject &&
  changes.datetime.date &&
  changes.datetime.start &&
  changes.datetime.end;
