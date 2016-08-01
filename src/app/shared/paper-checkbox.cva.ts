import { Directive, Renderer, forwardRef, ElementRef,  provide } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {};

@Directive({
  selector: 'paper-checkbox[cva]',
  host: {
    '(checked-changed)': 'onChange($event.detail.value)'
  },
  providers: [provide(
    NG_VALUE_ACCESSOR, {
      useExisting: forwardRef(() => PaperCheckboxControlValueAccessorDirective),
      multi: true
    })]
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
