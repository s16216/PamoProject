import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../_services/item.service';
import { Item, Comment } from '../_model/item.model';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  item: Item | undefined;
  currentImageIndex = 0;
  newComment: string = '';
  newRating: number = 0;
  displayedComments: Comment[] = [];
  commentsPerPage = 10;
  currentPage = 1;

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

  ratingControl = new FormControl<number | null>(0);

  /**
   * Updates the rating value when a new rating is selected.
   * @param newRating - The new rating value.
   */
  updateRating(newRating: number) {
    this.newRating = newRating;
  }

  /**
   * Retrieves the current rating value.
   * If the rating value is null, it sets the rating to 0.
   */
  GetRating() {
    const ratingValue = this.newRating;
    if (ratingValue == null) {
      this.newRating = 0;
    } else {
      this.newRating = ratingValue;
    }
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
   * Adds a new comment to the item.
   * The comment is added only if there is text in the comment and the rating is greater than 0.
   * The new comment is reset after adding.
   */
  addComment(): void {
    if (this.item && this.newRating > 0 && this.newComment.trim()) {
      const comment: Comment = {
        rating: this.newRating,
        text: this.newComment.trim()
      };
      this.itemService.addComment(this.item.id, comment).subscribe(() => {
        if (this.item) {
          this.item.comments.push(comment);
          this.item.rating = this.calculateAverageRating(this.item.comments);
          this.newComment = '';
          this.newRating = 0;
          this.currentPage = 1;
          this.displayedComments = this.item.comments.slice(0, this.commentsPerPage);
        }
      });
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
}
