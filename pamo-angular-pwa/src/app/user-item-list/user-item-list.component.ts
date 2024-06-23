import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../_services/item.service';
import { Item } from '../_model/item.model';

@Component({
  selector: 'app-user-item-list',
  templateUrl: './user-item-list.component.html',
  styleUrls: ['./user-item-list.component.css']
})
export class UserItemListComponent implements OnInit {
  items: Item[] = [];
  @Input() ownerId: number = 1; // Dodanie ownerId jako Input

  constructor(private itemService: ItemService, private router: Router) { }

  ngOnInit(): void {
    if (this.ownerId) {
      this.itemService.getUserItems(this.ownerId).subscribe(items => this.items = items);
    }
  }

  goToDetail(id: number): void {
    this.router.navigate(['/edit/item', id]);
  }
}
