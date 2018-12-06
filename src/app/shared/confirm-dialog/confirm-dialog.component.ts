import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material'

@Component({
	selector: 'app-confirm-dialog',
	template: `
  <form>
  <h1 mat-dialog-title>{{title}}</h1>
  <div mat-dialog-actions>
    <button mat-raised-button color="primary" (click)="onClick(true)" type="button">确认</button>
    <button mat-button (click)="onClick(false)" type="button">取消</button>
  </div>
</form>
  `,
	styles: []
})
export class ConfirmDialogComponent implements OnInit {
	title: string

	constructor(
		@Inject(MAT_DIALOG_DATA) private data,
		private dialog: MatDialogRef<ConfirmDialogComponent>
	) {}

	ngOnInit() {
		this.title = this.data.title
	}

	onClick(result: boolean) {
		this.dialog.close(result)
	}
}
