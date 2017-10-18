import { customAttribute, inject } from 'aurelia-framework';
import $ from 'jquery';
import 'bootstrap';

@inject(Element)
export class DropdownCustomAttribute {
  constructor(element) {
    this.element = element;
  }

  bind() {
    setTimeout(() => {
      $(this.element).dropdown()
    }, 0);
  }

  // unbind() {
  //   $(this.element).dropdown('destroy');
  // }

}
