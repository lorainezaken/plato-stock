import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { StockItem } from 'src/app/model/StockItem';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private angularFirestore: AngularFirestore, private authService: AuthService) { }

  getAll(): Observable<StockItem[]> {
    return Observable.create(observer => {
      this.angularFirestore.collection<({ value: StockItem })>(`${this.authService.getStorePrefix()}/WarehouseStock`).valueChanges()
        .subscribe(values => {
          observer.next(values.map(x => x.value));
        });
    });
  }
}
