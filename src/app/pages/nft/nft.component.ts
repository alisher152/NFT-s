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
  selectedNFTs: Set<any> = new Set();

  constructor(
    private nftCollectionService: NftCollectionService,
    private userService: UserService
  ) {
    this.filteredNFTs = [...this.nfts];
  }

  toggleNFTSelection(nft: any) {
    if (this.selectedNFTs.has(nft)) {
      this.selectedNFTs.delete(nft);
    } else {
      this.selectedNFTs.add(nft);
    }
  }

  addSelectedToCollection() {
    const currentUser = this.userService.getUser();
    if (!currentUser) {
      alert('Пожалуйста, войдите в систему!');
      return;
    }

    if (this.selectedNFTs.size === 0) {
      alert('Выберите хотя бы один NFT!');
      return;
    }

    this.selectedNFTs.forEach((nft) => {
      this.nftCollectionService.addToCollection(currentUser.id, nft);
    });

    alert(`${this.selectedNFTs.size} NFT добавлены в коллекцию!`);
    this.selectedNFTs.clear();
  }

  searchNFTs() {
    this.filteredNFTs = this.nfts.filter((nft) =>
      nft.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  voteNFT(nft: any) {
    nft.votes++;
  }

  buyNFT(nft: any) {
    alert(`Вы купили "${nft.title}" за $${nft.price}!`);
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

  addToCollection(nft: any): void {
    const currentUser = this.userService.getUser();
    if (!currentUser) {
      alert('Пожалуйста, войдите в систему!');
      return;
    }

    this.nftCollectionService.addToCollection(currentUser.id, nft);
    alert(`NFT "${nft.title}" добавлен в вашу коллекцию!`);
  }

  addNft(newNft: any) {
    this.nfts.push(newNft);
    this.searchNFTs();
  }

  nfts = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
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
      id: 7,
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
      id: 8,
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
}
