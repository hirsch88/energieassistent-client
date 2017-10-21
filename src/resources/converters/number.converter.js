import * as numeral from 'numeraljs';

export class NumberValueConverter {
  toView(value) {
    return numeral(value).format('0,0.00').replace(',', '\'');
  }

  toChart(value) {
    return numeral(value).format('0,0').replace(',', '\'');
  }
}
