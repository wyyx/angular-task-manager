import { Component, OnInit, ViewChild, forwardRef, Input, OnDestroy } from '@angular/core'
import {
	FormBuilder,
	FormGroup,
	AbstractControl,
	Validators,
	ControlValueAccessor,
	NG_VALUE_ACCESSOR,
	FormControl
} from '@angular/forms'
import {
	mergeMap,
	debounceTime,
	distinctUntilChanged,
	filter,
	takeUntil,
	tap
} from 'rxjs/operators'
import { UserService } from 'src/app/services/user.service'
import { Observable, Subject } from 'rxjs'
import { User } from 'src/app/domain/user.model'

@Component({
	selector: 'app-chip-selector',
	templateUrl: './chip-selector.component.html',
	styleUrls: [ './chip-selector.component.scss' ],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ChipSelectorComponent),
			multi: true
		}
	]
})
export class ChipSelectorComponent implements OnInit, OnDestroy, ControlValueAccessor {
	memberControl: FormControl = new FormControl('')
	members: User[] = []
	@Input() placeholder: string
	filteredMembers$: Observable<User[]>
	subManager$: Subject<any> = new Subject()

	propagateChange
	propagateTouch

	constructor(private userService: UserService) {}

	ngOnInit() {
		this.filteredMembers$ = this.memberControl.valueChanges.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			filter((str: string) => str && str.length > 1),
			mergeMap(filterStr => this.userService.searchUsers(filterStr.trim())),
			takeUntil(this.subManager$)
		)

		this.memberControl.statusChanges
			.pipe(takeUntil(this.subManager$))
			.subscribe(_ => this.propagateTouch())
	}

	ngOnDestroy(): void {
		this.subManager$.next()
		this.subManager$.complete()
	}

	writeValue(obj: any): void {
		this.members = obj
	}

	registerOnChange(fn: any): void {
		this.propagateChange = fn
	}

	registerOnTouched(fn: any): void {
		this.propagateTouch = fn
	}

	onAutocompleteClick(member: User) {
		const index = this.members.findIndex(m => m.id == member.id)

		// If not added
		if (index < 0) {
			this.members.push(member)
			this.propagateChange(this.members)
		}

		this.memberControl.setValue(null)
	}

	onCancelClick(member: User) {
		const index = this.members.findIndex(m => m.id == member.id)
		this.members.splice(index, 1)
		this.propagateChange(this.members)
	}
}
