import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupCardComponent } from './signup-card.component';
import { FormBuilder , ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatCard,MatCardModule} from '@angular/material/card';
import { MatFormField,MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from "@angular/material/dialog";

describe('SignupCardComponent', () => {
  let component: SignupCardComponent;
  let fixture: ComponentFixture<SignupCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers:[
        FormBuilder,
        MatFormField,
        MatCard
      ],
      declarations: [ 
        SignupCardComponent
      ],
      imports:[
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule, 
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatDialogModule,
        FormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
