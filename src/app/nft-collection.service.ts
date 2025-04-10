import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NftCollectionService {
  private collection: any[] = []; // Хранилище коллекции

  // Добавление в коллекцию
  addToCollection(nft: any) {
    if (!this.collection.some((item) => item.title === nft.title)) {
      this.collection.push(nft);
    }
  }

  // Удаление из коллекции
  removeFromCollection(nft: any) {
    this.collection = this.collection.filter((item) => item !== nft);
  }

  // Получение коллекции
  getCollection(): any[] {
    return this.collection;
  }
}
