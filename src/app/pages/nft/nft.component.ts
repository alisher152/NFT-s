import { Component } from '@angular/core';
import { NftCollectionService } from '../../nft-collection.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.css'],
  standalone: false,
})
export class NFTComponent {
  searchText: string = '';
  filteredNFTs: any[] = [];

  nfts = [
    {
      title: 'Collection of nightmares',
      subtitle: 'Nightmare (pt.15) 10☓10',
      category: 'Games',
      price: 49.99,
      votes: 0,
      comments: [],
      showComments: false,
      newComment: '',
      image: 'assets/nft1.jpg',
    },
    {
      title: 'Apes',
      subtitle: 'King Bored Ape #2414',
      category: 'Collectibles',
      price: 49.99,
      votes: 0,
      comments: [],
      showComments: false,
      newComment: '',
      image: 'assets/nft2.jpg',
    },
    {
      title: 'GALLERY_13',
      subtitle: 'HorseNFT #1332',
      category: 'Games',
      price: 49.99,
      votes: 0,
      comments: [],
      showComments: false,
      newComment: '',
      image: 'assets/nft3.jpg',
    },
    {
      title: 'USSR',
      subtitle: 'USSR 2.Edition 07',
      category: 'Collectibles',
      price: 49.99,
      votes: 0,
      comments: [],
      showComments: false,
      newComment: '',
      image: 'assets/nft4.jpg',
    },
    {
      title: 'Collection of nightmares',
      subtitle: 'Nightmare (pt.15) 10☓10',
      category: 'Games',
      price: 49.99,
      votes: 0,
      comments: [],
      showComments: false,
      newComment: '',
      image: 'assets/nft1.jpg',
    },
    {
      title: 'Apes',
      subtitle: 'King Bored Ape #2414',
      category: 'Collectibles',
      price: 49.99,
      votes: 0,
      comments: [],
      showComments: false,
      newComment: '',
      image: 'assets/nft2.jpg',
    },
    {
      title: 'GALLERY_13',
      subtitle: 'HorseNFT #1332',
      category: 'Games',
      price: 49.99,
      votes: 0,
      comments: [],
      showComments: false,
      newComment: '',
      image: 'assets/nft3.jpg',
    },
    {
      title: 'USSR',
      subtitle: 'USSR 2.Edition 07',
      category: 'Collectibles',
      price: 49.99,
      votes: 0,
      comments: [],
      showComments: false,
      newComment: '',
      image: 'assets/nft4.jpg',
    },
  ];

  constructor(
    private nftCollectionService: NftCollectionService,
    private userService: UserService
  ) {
    this.filteredNFTs = [...this.nfts];
  }

  searchNFTs() {
    console.log('Поисковый запрос:', this.searchText);
    this.filteredNFTs = this.nfts.filter((nft) =>
      nft.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
    console.log('Отфильтрованные NFT:', this.filteredNFTs);
  }

  voteNFT(nft: any) {
    nft.votes++;
  }

  buyNFT(nft: any) {
    console.log(`Покупка: ${nft.title}`);
  }

  toggleCommentBox(nft: any) {
    nft.showComments = !nft.showComments;
  }

  addComment(nft: any) {
    if (nft.newComment.trim() !== '') {
      nft.comments.push(nft.newComment);
      nft.newComment = '';
    }
  }

  addNft(newNft: any) {
    this.nfts.push(newNft);
    this.searchNFTs(); // Обновляем список после добавления
  }

  addToCollection(nft: any) {
    const currentUser = this.userService.getUser();
    if (!currentUser) {
      alert('Пожалуйста, войдите в систему!');
      return;
    }
    this.nftCollectionService.addToCollection(currentUser.id, nft);
    alert(`${nft.title} добавлен в коллекцию!`);
  }
}
