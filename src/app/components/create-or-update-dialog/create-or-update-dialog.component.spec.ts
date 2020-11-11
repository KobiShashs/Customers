import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateDialogComponent } from './create-or-update-dialog.component';

describe('CreateOrUpdateDialogComponent', () => {
  let component: CreateOrUpdateDialogComponent;
  let fixture: ComponentFixture<CreateOrUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
