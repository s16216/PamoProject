import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item, Comment } from '../_model/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/items`);
  }

  getUserItems(id: number): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/items/owner/${id}`);
  }

  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/items/${id}`);
  }

  addComment(itemId: number, comment: Comment): Observable<any> {
    return this.http.post(`${this.apiUrl}/items/${itemId}/comment`, { comment });
  }

  updateItem(item: Item): Observable<any> {
    return this.http.put(`${this.apiUrl}/items/${item.id}`, item);
  }
}
