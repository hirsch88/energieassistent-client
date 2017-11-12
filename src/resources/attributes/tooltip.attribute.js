import { customAttribute, inject } from 'aurelia-framework';
import $ from 'jquery';
import 'bootstrap';

// @customAttribute('tooltip')
@inject(Element)
export class TooltipCustomAttribute {
  constructor(element) {
    this.element = element;
  }

  bind() {
    setTimeout(() => {
      $(this.element).tooltip()
    }, 0);
  }

  unbind() {
    if (this.element) {
      try {
        $(this.element).tooltip('destroy');
      } catch (e) {
        console.error('Could not destroy the tooltip', e);
      }
    }
  }

}
