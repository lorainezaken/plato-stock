import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getRestRoot(): string {
    return 'RestAlfa';
  }

  getRest() : string {
    return 'Rustico-555';
  }

  getStorePrefix(): string {
    return `/${this.getRestRoot()}/${this.getRest()}`;
  }
}