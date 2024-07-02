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
  editMode: boolean = false; // Added to handle edit mode
  newImageUrl: string = ''; // New URL for adding images

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

  /**
   * Advances to the next image in the detailed images array.
   * Loops back to the first image if the end is reached.
   */
  nextImage(): void {
    if (this.item) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.item.detailedImages.length;
    }
  }

  /**
   * Goes back to the previous image in the detailed images array.
   * Loops to the last image if the beginning is reached.
   */
  previousImage(): void {
    if (this.item) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.item.detailedImages.length) % this.item.detailedImages.length;
    }
  }

  /**
   * Toggles the edit mode for the item.
   */
  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  /**
   * Saves the changes made to the item details.
   */
  saveItemDetails(): void {
    if (this.item) {
      // Save changes to the item
      this.itemService.updateItem(this.item).subscribe(() => {

      });
      this.editMode = !this.editMode;
    }
  }

  /**
   * Loads more comments to be displayed, incrementing the current page.
   * Adds the new comments to the currently displayed comments.
   */
  showMoreComments(): void {
    if (this.item) {
      this.currentPage++;
      const startIndex = (this.currentPage - 1) * this.commentsPerPage;
      const newComments = this.item.comments.slice(startIndex, startIndex + this.commentsPerPage);
      this.displayedComments = this.displayedComments.concat(newComments);
    }
  }

  /**
   * Calculates the average rating from the comments.
   * @param comments - The array of comments.
   * @returns The average rating.
   */
  private calculateAverageRating(comments: Comment[]): number {
    const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
    return comments.length ? totalRating / comments.length : 0;
  }

  /**
   * Adds a new image URL to the detailed images array.
   * Clears the new image URL input field after adding.
   */
  addImage(): void {
    if (this.item && this.newImageUrl.trim()) {
      this.item.detailedImages.push(this.newImageUrl.trim());
      this.newImageUrl = '';
    }
  }

  /**
   * Removes an image from the detailed images array by its index.
   * @param index - The index of the image to remove.
   */
  removeImage(index: number): void {
    if (this.item) {
      this.item.detailedImages.splice(index, 1);
    }
  }

  /**
   * Captures a new image using the device camera and adds it to the detailed images array.
   * The image is added only if it is successfully captured.
   */
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
