import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationButtonsComponent } from './pagination-buttons.component';
import {MatIcon} from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';

describe('PaginationButtonsComponent', () => {
  let component: PaginationButtonsComponent;
  let fixture: ComponentFixture<PaginationButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationButtonsComponent,MatIcon],
      imports:[MatIconTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PaginationButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
