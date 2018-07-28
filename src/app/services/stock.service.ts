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

  updateItem(itemName: string, diff: number, reason?: string): Promise<any> {
    const data: any = { diff };
    if (reason) {
      data.reason = reason;
    }

    return new Promise((resolve, reject) => {
      this.angularFirestore.doc(`${this.authService.getStorePrefix()}/WarehouseStock/${itemName}`).ref.get()
        .then(itemDoc => {
          const newValue = itemDoc.data();
          newValue.value.amount += diff;

          const batch = this.angularFirestore.firestore.batch();
          batch.update(this.angularFirestore.doc(`${this.authService.getStorePrefix()}/WarehouseStock/${itemName}`).ref, newValue);
          batch.commit().then(x => {
            this.angularFirestore.collection(`${this.authService.getStorePrefix()}/WarehouseStock/${itemName}/Activities`).add(data)
              .then(resolve).catch(reject);
          })
        }).catch(reject);
    });
  }
}
