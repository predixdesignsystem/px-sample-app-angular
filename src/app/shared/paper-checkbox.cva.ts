import { Directive, Renderer, forwardRef, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Output, EventEmitter, HostListener } from '@angular/core';

const noop = () => {};

@Directive({
  selector: 'paper-checkbox[cva]',
  host: {
    '(checked-changed)': 'onChange($event.detail.value)'
  },
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PaperCheckboxControlValueAccessorDirective),
      multi: true
    }]
})
export class PaperCheckboxControlValueAccessorDirective implements ControlValueAccessor {
  private onChange: (_: any) => void = noop;
  private onTouched: () => void = noop;

  constructor(
    private _renderer: Renderer,
    private _elementRef: ElementRef
  ) {}

  writeValue(value: any) {
    this._renderer.setElementProperty(this._elementRef.nativeElement, 'checked', value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}


@Directive({
  selector: 'paper-checkbox[translateEvent]'
})
export class PolymerCheckedEventDirective {
  @Output() checkedChange: EventEmitter<any> = new EventEmitter();
  @HostListener('checked-changed', ['$event'])
  onChange(e) {
    this.checkedChange.emit(e.detail.value);
  }
}
