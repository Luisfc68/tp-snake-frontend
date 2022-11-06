import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import  playerMocked from '../../mockData/player.mock';
import {MatCard,MatCardModule} from '@angular/material/card';


describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        ProfileComponent,
        MatCard 
      ],
      imports:[
        MatCardModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    fixture.componentInstance.player = playerMocked;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
