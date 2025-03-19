import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  async getItem(key: string) {
    return await this.storage.get(key);
  }

  async setItem(key: string, item: any) {
    return await this.storage.set(key, item);
  }

  async removeItem(key: string) {
    return await this.storage.remove(key);
  }

  clearStorage() {
    return this.storage.clear();
  }
}
