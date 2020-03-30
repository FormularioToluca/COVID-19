export interface DateRangePickerPreset {
  label: string;
  absoluteRange?: AbsolutePickerValue;
  relativeRange?: RelativePickerValue;
}

export type PickerMode = 'absolute' | 'relative';
export type RelativePickerValue = [number, number];
export type AbsolutePickerValue = [string, string];
export type PickerValue = RelativePickerValue | AbsolutePickerValue;

export interface TimeInputOptionsUnit {
  value: number;
  unit: string;
  label: string;
}

export interface TimeInputOptions {
  units: TimeInputOptionsUnit[];
}

export const defaultTimeInputOptions: TimeInputOptions = {
  units: [
    {value: 1, unit: 'ms', label: 'Milliseconds'},
    {value: 1000, unit: 's', label: 'Seconds'},
    {value: 1000 * 60, unit: 'm', label: 'Minutes'},
    {value: 1000 * 60 * 60, unit: 'h', label: 'Hours'},
    {value: 1000 * 60 * 60 * 24, unit: 'd', label: 'Days'},
    {value: 1000 * 60 * 60 * 24 * 7, unit: 'w', label: 'Weeks'},
  ]
};

export function isRelative(values: PickerValue) {
  return Array.isArray(values) && typeof (values[0]) === 'number' && typeof (values[1]) === 'number';
}

export function isAbsolute(values: PickerValue) {
  return Array.isArray(values) && typeof (values[0]) === 'string' && typeof (values[1]) === 'string';
}

export function getRelativeInfo(value: number | string, units: TimeInputOptionsUnit[]) {
  let operator = '-';
  let count = 0;
  let unit = 'ms';
  if (typeof (value) === 'string' && value.match(/^([+-])(\d+)/)) {
    operator = RegExp.$1;
    count = parseInt(RegExp.$2, 10);
  }
  if (typeof (value) === 'number') {
    operator = value < 0 ? '-' : '+';
    count = Math.abs(value);
  }

  if (count > 0) {


    let divisor = 1;
    units.forEach(u => {
      if (count % u.value === 0) {
        unit = u.unit;
        divisor = u.value;
      }
    });
    count = count / divisor;
  }

  const label = units.find(u => u.unit === unit).label;

  return {
    operator: operator,
    count: count,
    unit: unit,
    label: label,
    displayTextShort: `${operator}${count}${unit}`,
    displayText: `${operator}${count} ${label}`
  };
}

