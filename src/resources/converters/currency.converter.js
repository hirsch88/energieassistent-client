import * as numeral from 'numeraljs';

export class CurrencyValueConverter {
  toView(value) {
    return numeral((Math.ceil(value * 20) / 20).toFixed(2)).format('0,0.00').replace(',', '\'');
  }
}
