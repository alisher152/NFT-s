import { Injectable } from '@angular/core';

// Типизация для NFT
interface NFT {
  id: string;
  name: string;
  authorId: string;
  price: number;
  [key: string]: any; // Для дополнительных полей
}

@Injectable({
  providedIn: 'root',
})
export class NftCollectionService {
  private userCollections: Record<string, NFT[]> = {};
  private allNfts: NFT[] = [
    { id: 'nft1', name: 'Neo Dragon', authorId: 'user1', price: 200 },
    { id: 'nft2', name: 'Pixel Phantom', authorId: 'user1', price: 150 },
    { id: 'nft3', name: 'CyberShinobi', authorId: 'user2', price: 300 },
  ];

  constructor() {
    this.loadCollectionsFromStorage(); // Загружаем коллекции из localStorage при инициализации
  }

  private loadCollectionsFromStorage(): void {
    const storedCollections = localStorage.getItem('userCollections');
    if (storedCollections) {
      try {
        this.userCollections = JSON.parse(storedCollections);
        console.log(
          'NftCollectionService: Loaded collections from localStorage:',
          this.userCollections
        );
      } catch (error) {
        console.error(
          'NftCollectionService: Error parsing collections from localStorage:',
          error
        );
        this.userCollections = {};
      }
    }
  }

  private saveCollectionsToStorage(): void {
    localStorage.setItem(
      'userCollections',
      JSON.stringify(this.userCollections)
    );
    console.log(
      'NftCollectionService: Saved collections to localStorage:',
      this.userCollections
    );
  }

  addToCollection(userId: string, nft: NFT): boolean {
    if (!userId || !nft || !nft.id) {
      console.error('NftCollectionService: Invalid userId or NFT:', {
        userId,
        nft,
      });
      return false;
    }

    if (!this.userCollections[userId]) {
      this.userCollections[userId] = [];
    }

    const isAlreadyAdded = this.userCollections[userId].some(
      (item) => item.id === nft.id
    );
    if (isAlreadyAdded) {
      console.warn('NftCollectionService: NFT already in collection:', nft.id);
      return false;
    }

    this.userCollections[userId].push({ ...nft });
    this.saveCollectionsToStorage();
    console.log('NftCollectionService: Added NFT to collection:', {
      userId,
      nft,
    });
    return true;
  }

  removeFromCollection(userId: string, nft: NFT): boolean {
    if (!userId || !nft || !nft.id || !this.userCollections[userId]) {
      console.error(
        'NftCollectionService: Invalid userId or NFT, or collection not found:',
        { userId, nft }
      );
      return false;
    }

    const initialLength = this.userCollections[userId].length;
    this.userCollections[userId] = this.userCollections[userId].filter(
      (item) => item.id !== nft.id
    );
    const removed = initialLength !== this.userCollections[userId].length;

    if (removed) {
      this.saveCollectionsToStorage();
      console.log('NftCollectionService: Removed NFT from collection:', {
        userId,
        nft,
      });
    } else {
      console.warn(
        'NftCollectionService: NFT not found in collection:',
        nft.id
      );
    }
    return removed;
  }

  getCollection(userId: string): NFT[] {
    if (!userId) {
      console.error('NftCollectionService: Invalid userId:', userId);
      return [];
    }
    const collection = this.userCollections[userId] || [];
    console.log('NftCollectionService: Retrieved collection for user:', {
      userId,
      collection,
    });
    return collection;
  }

  getUserCollection(userId: string): NFT[] {
    return this.getCollection(userId);
  }

  getNFTsByAuthor(authorId: string): NFT[] {
    if (!authorId) {
      console.error('NftCollectionService: Invalid authorId:', authorId);
      return [];
    }
    const nfts = this.allNfts.filter((nft) => nft.authorId === authorId);
    console.log('NftCollectionService: Retrieved NFTs by author:', {
      authorId,
      nfts,
    });
    return nfts;
  }

  clearCollection(userId: string): boolean {
    if (!userId || !this.userCollections[userId]) {
      console.error(
        'NftCollectionService: Invalid userId or collection not found:',
        userId
      );
      return false;
    }
    delete this.userCollections[userId];
    this.saveCollectionsToStorage();
    console.log('NftCollectionService: Cleared collection for user:', userId);
    return true;
  }
}
