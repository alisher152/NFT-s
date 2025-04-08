import { Component } from '@angular/core';

@Component({
  selector: 'app-my-nfts',
  templateUrl: './my-nfts.component.html',
  styleUrls: ['./my-nfts.component.css'],
  standalone: false,
})
export class MyNftsComponent {
  showDetails = false;
  myCollection: any[] = []; // Указываем тип данных массива
  nfts = [
    {
      id: 1,
      title: 'King Bored Ape #2414',
      collection: 'Genesis StarSharks Mystery Box',
      category: 'Collectibles',
      creator: 'Anonymous-User-9de72',
      price: 250,
      imageUrl: 'assets/default-avatar.jpg',
      likes: 87,
      comments: [
        {
          username: 'KKSpecial',
          text: 'This is a beautiful NFT!!!',
          avatar: 'assets/avatar1.jpg',
        },
        {
          username: 'MorygaNFT',
          text: 'I think so too',
          avatar: 'assets/avatar2.jpg',
        },
      ],
    },
  ];

  additionalNfts = [
    {
      title: 'Collection of nightmares',
      category: 'Games',
      price: 49.99,
      imageUrl: 'assets/nft1.jpg',
    },
    {
      title: 'Apes',
      category: 'Collectibles',
      price: 49.99,
      imageUrl: 'assets/nft2.jpg',
    },
    {
      title: 'GALLERY_13',
      category: 'Games',
      price: 49.99,
      imageUrl: 'assets/nft3.jpg',
    },
    {
      title: 'USSR',
      category: 'Collectibles',
      price: 49.99,
      imageUrl: 'assets/nft4.jpg',
    },
  ];

  nft = this.nfts[0];

  userCollection: any[] = []; // Коллекция пользователя

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  addToCollection(nft: any) {
    if (!this.myCollection.some((item) => item.title === nft.title)) {
      this.myCollection.push(nft);
      alert(`${nft.title} добавлен в коллекцию!`);
    } else {
      alert(`${nft.title} уже в коллекции.`);
    }
  }
}
