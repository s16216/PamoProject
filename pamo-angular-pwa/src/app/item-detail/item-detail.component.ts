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

  updateRating(newRating: number) {
    this.newRating = newRating;  // Aktualizujemy newRating
  }

  GetRating() {
    const ratingValue = this.newRating;
    if (ratingValue == null) {
      this.newRating = 0;
    } else {
      this.newRating = ratingValue;
    }
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
          this.newRating = 0; // Resetowanie wartości newRating
          this.currentPage = 1;
          this.displayedComments = this.item.comments.slice(0, this.commentsPerPage);
        }
      });
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
}
