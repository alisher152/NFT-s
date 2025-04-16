import { Component, OnInit } from '@angular/core';
import { NftCollectionService } from '../../nft-collection.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-my-nfts',
  templateUrl: './my-nfts.component.html',
  styleUrls: ['./my-nfts.component.css'],
  standalone: false,
})
export class MyNftsComponent implements OnInit {
  showDetails = false;
  selectedNft: any = null;
  selectedCreator: any = null;
  moreByCreator: any[] = [];

  myCollection: any[] = [];
  currentUser: { id: string; name: string } | null = null;

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
      ],
    },
    {
      id: 2,
      title: 'Electric Skull #102',
      collection: 'Dark Vault',
      category: 'Art',
      creator: 'Anonymous-User-9de72',
      price: 120,
      imageUrl: 'assets/nft-skull.jpg',
      likes: 45,
      comments: [],
    },
    {
      id: 3,
      title: 'Cyber Fox',
      collection: 'Neo Animals',
      category: 'Animals',
      creator: 'KKSpecial',
      price: 180,
      imageUrl: 'assets/nft-fox.jpg',
      likes: 60,
      comments: [],
    },
  ];

  constructor(
    private nftCollectionService: NftCollectionService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.currentUser = this.userService.getUser();
    if (this.currentUser) {
      this.myCollection = this.nftCollectionService.getCollection(
        this.currentUser.id
      );
    }
  }

  toggleDetails(nft: any) {
    this.selectedNft = nft;
    this.showDetails = !this.showDetails;

    // Получаем информацию о создателе
    this.selectedCreator = this.userService
      .getAllUsers()
      .find((user) => user.name === nft.creator);

    // Получаем другие NFT этого создателя
    this.moreByCreator = this.nfts.filter(
      (item) => item.creator === nft.creator && item.id !== nft.id
    );
  }

  addToCollection(nft: any) {
    if (!this.currentUser) {
      alert('Пожалуйста, войдите в систему, чтобы добавить NFT в коллекцию!');
      return;
    }
    this.nftCollectionService.addToCollection(this.currentUser.id, nft);
    this.myCollection = this.nftCollectionService.getCollection(
      this.currentUser.id
    );
    alert(`${nft.title} добавлен в коллекцию!`);
  }

  removeFromCollection(nft: any) {
    if (!this.currentUser) return;
    this.nftCollectionService.removeFromCollection(this.currentUser.id, nft);
    this.myCollection = this.nftCollectionService.getCollection(
      this.currentUser.id
    );
    alert(`${nft.title} удалён из коллекции!`);
  }

  voteNFT(nft: any) {
    nft.likes++;
    alert(`Вы поставили лайк на "${nft.title}"!`);
  }

  toggleCommentBox(nft: any) {
    nft.showComments = !nft.showComments;
  }

  buyNFT(nft: any) {
    alert(`Вы купили "${nft.title}" за $${nft.price}!`);
  }

  addComment(nft: any) {
    if (nft.newComment && nft.newComment.trim()) {
      if (!nft.comments) {
        nft.comments = [];
      }
      nft.comments.push({
        username: this.currentUser?.name || 'Аноним',
        text: nft.newComment.trim(),
        avatar: 'assets/default-avatar.jpg',
      });
      nft.newComment = '';
    }
  }
}
