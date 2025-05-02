import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NftCollectionService } from '../../nft-collection.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-nft-create',
  templateUrl: './create-nft.component.html',
  styleUrls: ['./create-nft.component.css'],
  standalone: false,
})
export class CreateNftComponent {
  itemName = '';
  category = '';
  itemType = '';
  description = '';
  price = '';
  selectedFile: File | null = null;
  categories = ['Art', 'Music', 'Video', 'Collectible'];
  itemTypes = ['Digital', 'Physical'];

  constructor(
    private nftCollectionService: NftCollectionService,
    private userService: UserService,
    private router: Router
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Selected file:', this.selectedFile);
    }
  }

  createItem(): void {
    const currentUser = this.userService.getUser();
    if (!currentUser) {
      console.error('User not logged in');
      this.router.navigate(['/login']);
      return;
    }

    if (
      !this.itemName ||
      !this.category ||
      !this.itemType ||
      !this.price ||
      !this.selectedFile
    ) {
      console.error('All fields are required');
      alert('Please fill in all fields and upload a file');
      return;
    }

    const priceValue = parseFloat(this.price);
    if (isNaN(priceValue) || priceValue <= 0) {
      console.error('Invalid price');
      alert('Price must be a valid number greater than 0');
      return;
    }

    const newNFT = {
      id: `nft${Date.now()}`,
      name: this.itemName,
      authorId: currentUser.id,
      price: priceValue,
      category: this.category,
      type: this.itemType,
      description: this.description,
      file: this.selectedFile.name, // В реальном приложении нужно загрузить файл
    };

    this.nftCollectionService.addToCollection(currentUser.id, newNFT);
    console.log('Created item:', newNFT);
    this.router.navigate(['/profile', currentUser.id]);
  }
}
