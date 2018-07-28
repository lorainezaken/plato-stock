import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-stock-item-edit-amount-dialog',
  templateUrl: './stock-item-edit-amount-dialog.component.html',
  styleUrls: ['./stock-item-edit-amount-dialog.component.css']
})
export class StockItemEditAmountDialogComponent implements OnInit {

  diff: string;
  reason: string;

  constructor(public dialogRef: MatDialogRef<StockItemEditAmountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemEditAmountData, private stockService: StockService) { }

  ngOnInit() {
    console.log(this.data);
  }

  save() {
    if (!this.diff) {
      return;
    }
    if (this.data.isSubstracting && !this.reason) {
      return;
    }

    const diff = parseInt(this.diff) * (this.data.isSubstracting ? -1 : 1);

    this.stockService.updateItem(this.data.itemName, diff, this.reason)
      .then(x => {
        this.dialogRef.close();
      }).catch(x => {
        alert('error');
        console.log(x);
      })
  }
}

export interface ItemEditAmountData {
  isSubstracting: boolean;
  itemName: string;
  restId: string;
}