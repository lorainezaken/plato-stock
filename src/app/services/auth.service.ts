import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  //Get DB Root Path
  getRestRoot(): string {
    return 'RestAlfa';
  }

  //Get Rest
  getRest() : string {
    return 'Rustico-555';
  }

  //Get Rest DB Path
  getStorePrefix(): string {
    return `/${this.getRestRoot()}/${this.getRest()}`;
  }
}
