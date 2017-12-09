import * as numeral from 'numeraljs';

export class NumberPrefixValueConverter {
  toView(value) {
    let num = parseFloat(value);

    if (num > 0) {
      return `+${value}`
    }
    return `${value}`
  }
}
