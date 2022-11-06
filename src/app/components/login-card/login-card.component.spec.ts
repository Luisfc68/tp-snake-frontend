import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginCardComponent } from './login-card.component';
import { FormBuilder , ReactiveFormsModule,FormsModule} from '@angular/forms';
import {MatCard,MatCardModule} from '@angular/material/card';
import { MatFormField,MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginCardComponent', () => {
  let component: LoginCardComponent;
  let fixture: ComponentFixture<LoginCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers:[FormBuilder,],
      declarations: [ 
        LoginCardComponent,
        MatCard,
        MatFormField
      ],
      imports:[
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule, 
        NoopAnimationsModule,
        ReactiveFormsModule,
        FormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
