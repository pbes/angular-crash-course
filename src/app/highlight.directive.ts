import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = 'yellow';

    // docs: https://angular.io/guide/attribute-directives
 }

}
