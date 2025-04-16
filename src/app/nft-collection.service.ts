import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NftCollectionService {
  // Хранилище коллекций для каждого пользователя
  // Ключ — ID пользователя, значение — массив NFT
  private userCollections: Record<string, any[]> = {};

  // Добавление в коллекцию пользователя
  addToCollection(userId: string, nft: any) {
    if (!this.userCollections[userId]) {
      this.userCollections[userId] = []; // Инициализация коллекции, если её нет
    }

    // Проверяем, нет ли уже такого NFT в коллекции
    const isAlreadyAdded = this.userCollections[userId].some(
      (item) => item.id === nft.id
    );

    if (!isAlreadyAdded) {
      this.userCollections[userId].push({ ...nft }); // Добавляем копию NFT
    }
  }

  // Удаление из коллекции пользователя
  removeFromCollection(userId: string, nft: any) {
    if (this.userCollections[userId]) {
      this.userCollections[userId] = this.userCollections[userId].filter(
        (item) => item.id !== nft.id
      );
    }
  }

  // Получение коллекции пользователя
  getCollection(userId: string): any[] {
    return this.userCollections[userId] || [];
  }

  // Очистка коллекции пользователя (например, при выходе)
  clearCollection(userId: string) {
    delete this.userCollections[userId];
  }
}
