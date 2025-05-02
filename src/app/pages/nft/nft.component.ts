import { Component } from '@angular/core';
import { NftCollectionService } from '../../nft-collection.service';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

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
    private userService: UserService,
    private router: Router
  ) {
    this.filteredNFTs = [...this.nfts];
  }

  toggleNFTSelection(nft: any): void {
    if (this.selectedNFTs.has(nft)) {
      this.selectedNFTs.delete(nft);
    } else {
      this.selectedNFTs.add(nft);
    }
  }

  addSelectedToCollection(): void {
    const currentUser = this.userService.getUser();
    if (!currentUser) {
      alert('Please log in!');
      return;
    }

    if (this.selectedNFTs.size === 0) {
      alert('Select at least one NFT!');
      return;
    }

    this.selectedNFTs.forEach((nft) => {
      this.nftCollectionService.addToCollection(currentUser.id, nft);
    });

    alert(`${this.selectedNFTs.size} NFTs added to collection!`);
    this.selectedNFTs.clear();
  }

  searchNFTs(): void {
    this.filteredNFTs = this.nfts.filter(
      (nft) =>
        nft.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        nft.author.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  voteNFT(nft: any): void {
    nft.votes++;
  }

  buyNFT(nft: any): void {
    alert(`You bought "${nft.title}" for $${nft.price}!`);
  }

  toggleCommentBox(nft: any): void {
    nft.showComments = !nft.showComments;
  }

  addComment(nft: any): void {
    const currentUser = this.userService.getUser();
    const authorName = currentUser ? currentUser.name : 'Anonymous';

    if (nft.newComment.trim() !== '') {
      nft.comments.push({
        text: nft.newComment,
        author: authorName,
        date: new Date().toLocaleString(),
      });
      nft.newComment = '';
    }
  }

  addToCollection(nft: any): void {
    const currentUser = this.userService.getUser();
    if (!currentUser) {
      alert('Please log in!');
      return;
    }

    this.nftCollectionService.addToCollection(currentUser.id, nft);
    alert(`NFT "${nft.title}" added to your collection!`);
  }

  goToAuthorProfile(authorId: string): void {
    this.router.navigate(['/profile', authorId]);
  }

  nfts = [
    {
      id: 1,
      title: 'Collection of nightmares',
      subtitle: 'Nightmare (pt.15) 10☓10',
      author: 'CryptoArtist123',
      category: 'Games',
      price: 49.99,
      votes: 0,
      comments: [],
      showComments: false,
      newComment: '',
      image: 'assets/Collection.svg',
    },
    {
      id: 2,
      title: 'Apes',
      subtitle: 'King Bored Ape #2414',
      author: 'ApeCreator',
      category: 'Collectibles',
      price: 49.99,
      votes: 0,
      comments: [],
      showComments: false,
      newComment: '',
      image: 'assets/Apes.svg',
    },
    {
      id: 3,
      title: 'GALLERY_13',
      subtitle: 'HorseNFT #1332',
      author: 'DigitalArtMaster',
      category: 'Games',
      price: 49.99,
      votes: 0,
      comments: [],
      showComments: false,
      newComment: '',
      image: 'assets/GALLERY.svg',
    },
    {
      id: 4,
      title: 'USSR',
      subtitle: 'USSR 2.Edition 07',
      author: 'RetroCollector',
      category: 'Collectibles',
      price: 49.99,
      votes: 0,
      comments: [],
      showComments: false,
      newComment: '',
      image: 'assets/USSR.svg',
    },
    {
      id: 5,
      title: 'USSR',
      subtitle: 'USSR 2.Edition 07',
      author: 'RetroCollector',
      category: 'Collectibles',
      price: 49.99,
      votes: 0,
      comments: [],
      showComments: false,
      newComment: '',
      image: 'assets/USSRsvg',
    },
    {
      id: 6,
      title: 'Apes',
      subtitle: 'King Bored Ape #2414',
      author: 'ApeCreator',
      category: 'Collectibles',
      price: 49.99,
      votes: 0,
      comments: [],
      showComments: false,
      newComment: '',
      image: 'assets/Apes.svg',
    },
    {
      id: 7,
      title: 'GALLERY_13',
      subtitle: 'HorseNFT #1332',
      author: 'DigitalArtMaster',
      category: 'Games',
      price: 49.99,
      votes: 0,
      comments: [],
      showComments: false,
      newComment: '',
      image: 'assets/GALLERY.svg',
    },
    {
      id: 1,
      title: 'Collection of nightmares',
      subtitle: 'Nightmare (pt.15) 10☓10',
      author: 'CryptoArtist123',
      category: 'Games',
      price: 49.99,
      votes: 0,
      comments: [],
      showComments: false,
      newComment: '',
      image: 'assets/Collection.svg',
    },
  ];
}
