import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { StockItem } from '../../model/StockItem';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.css']
})
export class StockTableComponent implements OnInit {

  items: StockItem[];

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stockService.getAll().subscribe(x => this.items = x);
  }

}