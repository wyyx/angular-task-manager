import { Component, OnInit, forwardRef, OnDestroy } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  Validators,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
  AbstractControl
} from '@angular/forms'
import { CertificateType } from 'src/app/auth/models/user.model'
import { Observable, combineLatest, Subject } from 'rxjs'
import { startWith, filter, takeUntil, debounceTime } from 'rxjs/operators'
import { validateCertificate } from './validators'
import { markFormGroupAsTouched } from 'src/app/utils/form.util'

@Component({
  selector: 'app-certificate-selector',
  templateUrl: './certificate-selector.component.html',
  styleUrls: ['./certificate-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CertificateSelectorComponent),
      multi: true
    }
  ]
})
export class CertificateSelectorComponent implements OnInit, OnDestroy, ControlValueAccessor {
  form: FormGroup
  certificateTypeControl: AbstractControl
  certificateNumberControl: AbstractControl
  certificateType$: Observable<CertificateType>
  certificateNumber$: Observable<string>
  kill$: Subject<any> = new Subject()
  propagateChange
  propagateTouched

  certificateTypes = [
    { value: CertificateType.IdCard, label: '身份证' },
    { value: CertificateType.Insurance, label: '医保' },
    { value: CertificateType.Military, label: '士兵证' },
    { value: CertificateType.Passport, label: '护照' },
    { value: CertificateType.Other, label: '其他' }
  ]

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      certificateType: [CertificateType.IdCard, Validators.required],
      certificateNumber: ['', Validators.required]
    })
    this.certificateTypeControl = this.form.get('certificateType')
    this.certificateNumberControl = this.form.get('certificateNumber')

    this.certificateType$ = this.certificateTypeControl.valueChanges.pipe(
      startWith(this.certificateTypeControl.value),
      debounceTime(300),
      filter(v => !!v || v == 0)
    )
    this.certificateNumber$ = this.certificateNumberControl.valueChanges.pipe(
      startWith(this.certificateNumberControl.value),
      debounceTime(300),
      filter(v => !!v)
    )

    combineLatest(this.certificateType$, this.certificateNumber$)
      .pipe(takeUntil(this.kill$))
      .subscribe(([type, number]) => {
        if (validateCertificate(type, number)) {
          console.log({ certificateType: type, certificateNumber: number })
          setTimeout(() => {
            this.propagateChange({ certificateType: type, certificateNumber: number })
          }, 0)
          this.certificateNumberControl.setErrors(null)
        } else {
          this.certificateNumberControl.setErrors({ certificateNumberValidation: true })
        }
      })
  }

  ngOnDestroy(): void {
    this.kill$.next()
    this.kill$.complete()
  }

  onFocusOut(event) {
    this.propagateTouched()
  }

  markAsTouched() {
    markFormGroupAsTouched(this.form)
  }

  writeValue(obj: any): void {
    if (obj && obj.certificateType) {
      this.form.get('certificateType').setValue(obj.certificateType)
    }

    if (obj && obj.certificateNumber) {
      this.form.get('certificateNumber').setValue(obj.certificateNumber)
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn
  }
}
