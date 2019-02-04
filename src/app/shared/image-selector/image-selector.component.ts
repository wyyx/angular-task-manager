import { Component, OnInit, Input, forwardRef } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, NG_VALIDATORS } from '@angular/forms'

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageSelectorComponent),
      multi: true
    }
  ]
})
export class ImageSelectorComponent implements OnInit, ControlValueAccessor {
  @Input() cols
  @Input() rowHeight = '1:1'
  @Input() title
  @Input() itemWidth
  @Input() useSvgIcon = true
  @Input() items: any[] = []

  selected: string

  private propagate

  constructor() {}

  ngOnInit() {
    const randomIndex = Math.floor(Math.random() * this.items.length)
    setTimeout(() => {
      this.selected = this.items[randomIndex]
      this.propagate(this.selected)
    }, 0)
  }

  writeValue(obj: any): void {
    this.selected = obj
  }

  registerOnChange(fn: any): void {
    this.propagate = fn
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}

  onImageClick(index: number) {
    this.selected = this.items[index]
    this.propagate(this.selected)
  }
}
