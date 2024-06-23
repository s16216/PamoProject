import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../_services/item.service';
import { Item } from '../_model/item.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];

  constructor(private itemService: ItemService, private router: Router) { }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
      console.log(this.items); // Dodaj ten wiersz, aby sprawdzić, czy itemy są pobierane
    });
  }

  goToDetail(id: number): void {
    this.router.navigate(['/item', id]); // ma być /item
  }
}
