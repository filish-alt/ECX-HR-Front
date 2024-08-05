
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-deletesucessfullmessage',
  templateUrl: './deletesucessfullmessage.component.html',
  styleUrls: ['./deletesucessfullmessage.component.css']
})
export class DeletesucessfullmessageComponent {
  constructor(
    public dialogRef: MatDialogRef<DeletesucessfullmessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onOk(): void {
    this.dialogRef.close(true);
  }
}
