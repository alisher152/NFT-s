import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NftCollectionService {
  private userCollections: Record<string, any[]> = {};

  addToCollection(userId: string, nft: any) {
    if (!this.userCollections[userId]) {
      this.userCollections[userId] = [];
    }

    const isAlreadyAdded = this.userCollections[userId].some(
      (item) => item.id === nft.id
    );

    if (!isAlreadyAdded) {
      this.userCollections[userId].push({ ...nft });
    }
  }

  removeFromCollection(userId: string, nft: any) {
    if (this.userCollections[userId]) {
      this.userCollections[userId] = this.userCollections[userId].filter(
        (item) => item.id !== nft.id
      );
    }
  }

  getCollection(userId: string): any[] {
    return this.userCollections[userId] || [];
  }

  clearCollection(userId: string) {
    delete this.userCollections[userId];
  }
}
