import { Component } from '@angular/core';

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
  categories = ['Art', 'Music', 'Video', 'Collectible'];
  itemTypes = ['Digital', 'Physical'];
  price = '';

  onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log('Selected file:', file);
  }

  createItem() {
    console.log('Creating item:', {
      name: this.itemName,
      category: this.category,
      type: this.itemType,
      description: this.description,
    });
  }
}
