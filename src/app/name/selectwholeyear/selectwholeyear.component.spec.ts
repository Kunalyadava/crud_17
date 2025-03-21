import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectwholeyearComponent } from './selectwholeyear.component';

describe('SelectwholeyearComponent', () => {
  let component: SelectwholeyearComponent;
  let fixture: ComponentFixture<SelectwholeyearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectwholeyearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectwholeyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
