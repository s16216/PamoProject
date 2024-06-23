import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserItemListComponent } from './user-item-list.component';

describe('UserItemListComponent', () => {
  let component: UserItemListComponent;
  let fixture: ComponentFixture<UserItemListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserItemListComponent]
    });
    fixture = TestBed.createComponent(UserItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
