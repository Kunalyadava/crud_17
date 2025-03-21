import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAddUserComponent } from './get-add-user.component';

describe('GetAddUserComponent', () => {
  let component: GetAddUserComponent;
  let fixture: ComponentFixture<GetAddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAddUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
