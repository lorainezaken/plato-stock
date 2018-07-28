import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { StockItem } from '../../model/StockItem';
import { MatDialog } from '@angular/material';
import { StockItemEditAmountDialogComponent, ItemEditAmountData } from '../stock-item-edit-amount-dialog/stock-item-edit-amount-dialog.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.css']
})
export class StockTableComponent implements OnInit {

  items: StockItem[];

  constructor(private stockService: StockService, private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit() {
    this.stockService.getAll().subscribe(x => this.items = x);
  }

  add(item) {
    this.dialog.open(StockItemEditAmountDialogComponent, {
      data: this.getData(false, item.name)
    });
  }

  substract(item) {
    this.dialog.open(StockItemEditAmountDialogComponent, {
      data: this.getData(true, item.name)
    });
  }

  private getData(isSubstracting: boolean, itemName: string): ItemEditAmountData {
    return {
      isSubstracting,
      itemName,
      restId: this.authService.getRest()
    }
  }
}
