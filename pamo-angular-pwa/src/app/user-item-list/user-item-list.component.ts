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
  @Input() ownerId: number = 2;

  constructor(private itemService: ItemService, private router: Router) { }

  ngOnInit(): void {
    if (this.ownerId) {
      this.itemService.getUserItems(this.ownerId).subscribe(items => this.items = items);
    }
  }

  /**
   * Navigates to the edit view of the selected item.
   * @param id - The ID of the item to edit.
   */
  goToDetail(id: number): void {
    this.router.navigate(['/edit/item', id]);
  }
}
