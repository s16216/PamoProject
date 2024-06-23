import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../_services/item.service';
import { Item, Comment } from '../_model/item.model';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  item: Item | undefined;
  currentImageIndex = 0;
  displayedComments: Comment[] = [];
  commentsPerPage = 10;
  currentPage = 1;
  editMode: boolean = false; // Dodane do obsługi trybu edycji
  newImageUrl: string = ''; // Nowy URL dla dodawania zdjęć

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    const itemId = Number(this.route.snapshot.paramMap.get('id'));
    this.itemService.getItem(itemId).subscribe(item => {
      this.item = item;
      if (this.item) {
        this.displayedComments = this.item.comments.slice(0, this.commentsPerPage);
      }
    });
  }

  nextImage(): void {
    if (this.item) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.item.detailedImages.length;
    }
  }

  previousImage(): void {
    if (this.item) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.item.detailedImages.length) % this.item.detailedImages.length;
    }
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  saveItemDetails(): void {
    if (this.item) {
      // Zapisz zmiany w itemie (możesz dodać logikę do zapisu na serwerze)
      this.itemService.updateItem(this.item).subscribe(() => {

      });
      this.editMode = !this.editMode;
    }
  }

  showMoreComments(): void {
    if (this.item) {
      this.currentPage++;
      const startIndex = (this.currentPage - 1) * this.commentsPerPage;
      const newComments = this.item.comments.slice(startIndex, startIndex + this.commentsPerPage);
      this.displayedComments = this.displayedComments.concat(newComments);
    }
  }

  private calculateAverageRating(comments: Comment[]): number {
    const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
    return comments.length ? totalRating / comments.length : 0;
  }

  addImage(): void {
    if (this.item && this.newImageUrl.trim()) {
      this.item.detailedImages.push(this.newImageUrl.trim());
      this.newImageUrl = '';
    }
  }

  removeImage(index: number): void {
    if (this.item) {
      this.item.detailedImages.splice(index, 1);
    }
  }

  async addImageFromCamera(): Promise<void> {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    if (image.dataUrl && this.item) {
      this.item.detailedImages.push(image.dataUrl);
    }
  }
}
