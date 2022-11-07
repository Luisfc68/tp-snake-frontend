import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EndDialogComponent } from './end-dialog.component';

describe('EndDialogComponent', () => {
  let component: EndDialogComponent;
  let fixture: ComponentFixture<EndDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        EndDialogComponent 
      ],
      imports:[
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
