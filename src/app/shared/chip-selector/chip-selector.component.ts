import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core'
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, filter, takeUntil, tap } from 'rxjs/operators'
import { Chip } from '../models/chip.model'

@Component({
  selector: 'app-chip-selector',
  templateUrl: './chip-selector.component.html',
  styleUrls: ['./chip-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipSelectorComponent),
      multi: true
    }
  ]
})
export class ChipSelectorComponent implements OnInit, OnDestroy, ControlValueAccessor {
  kill$: Subject<any> = new Subject()

  @Input()
  placeholder: string = '输入搜索'

  @Input()
  candidateChips: Chip[] = []

  @Output()
  filterChange: EventEmitter<string> = new EventEmitter()

  selectedChips: Chip[] = []

  filter: FormControl = new FormControl('')

  propagateChange
  propagateTouch

  constructor() {}

  ngOnInit() {
    this.filter.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        filter((str: string) => str && str.length > 0),
        tap(filter => this.filterChange.emit(filter)),
        takeUntil(this.kill$)
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this.kill$.next()
    this.kill$.complete()
  }

  onFocusOut(event) {
    this.propagateTouch()
  }

  writeValue(obj: any): void {
    this.selectedChips = obj
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn
  }

  registerOnTouched(fn: any): void {
    this.propagateTouch = fn
  }

  onAutocompleteSelect(event, chip: Chip) {
    // Fix onSelectionChange emit twice everytime
    if (event.source.selected == true) {
      this.selectedChips.push(chip)
      this.propagateChange(this.selectedChips)

      // Clear filter input
      this.filter.setValue(null)
    }
  }

  onRemoveChipClick(chip: Chip) {
    const index = this.selectedChips.findIndex(c => c.value === chip.value)
    this.selectedChips.splice(index, 1)
    this.propagateChange(this.selectedChips)
  }
}
