import { Component, OnInit } from '@angular/core';
import { NftCollectionService } from '../../nft-collection.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-nfts',
  templateUrl: './my-nfts.component.html',
  styleUrls: ['./my-nfts.component.css'],
  standalone: false,
})
export class MyNftsComponent implements OnInit {
  showDetails = false;
  selectedNft: any = null; // Добавлено для хранения выбранного NFT
  myCollection: any[] = [];

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

  constructor(private nftCollectionService: NftCollectionService) {}

  ngOnInit() {
    this.myCollection = this.nftCollectionService.getCollection();
  }

  toggleDetails(nft: any) {
    this.selectedNft = nft;
    this.showDetails = !this.showDetails;
  }

  addToCollection(nft: any) {
    this.nftCollectionService.addToCollection(nft);
    this.myCollection = this.nftCollectionService.getCollection();
    alert(`${nft.title} добавлен в коллекцию!`);
  }

  removeFromCollection(nft: any) {
    this.nftCollectionService.removeFromCollection(nft);
    this.myCollection = this.nftCollectionService.getCollection();
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
      nft.comments.push(nft.newComment.trim());
      nft.newComment = '';
      alert(`Комментарий добавлен для "${nft.title}"!`);
    }
  }
}
