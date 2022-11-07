import { Component, Inject, OnInit } from '@angular/core';
import { Player } from '../../interfaces/player.interface';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlayersService } from '../../services/players/players.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit {

  profileForm: FormGroup;

  player:Player;

  loading:boolean = false;

  profileImage:string|undefined;

  constructor(
    private formBuilder:FormBuilder,
    private playersService:PlayersService,
    private storageService:StorageService,
    @Inject(MAT_DIALOG_DATA) data:{player:Player},
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ProfileDialogComponent>
  ) {
    this.player = data.player;
    this.profileForm = formBuilder.group({
      username: [this.player.username, [Validators.required, Validators.minLength(4)]],
      email: [this.player.email, [Validators.required, Validators.email]],
      password: [null, Validators.minLength(4)],
      image: [null]
    });
  }

  ngOnInit(): void {
    this.profileImage = environment.apiUrl + this.player.image;
  }

  private setImagePreview() {
    const reader = new FileReader();
    reader.onload = () => this.profileImage = reader.result as string;
    reader.readAsDataURL(this.profileForm.controls['image'].value);
  }

  submit() {
    this.loading = true;
    const {
      image: imageControl,
      username: usernameControl,
      email: emailControl,
      password: passwordControl
    } = this.profileForm.controls;
    this.makeUpdateRequest({ imageControl, usernameControl, emailControl, passwordControl })
      .then(player => {
        if (player) {
          this.storageService.saveUserOnStorage(player);
        }
        return this.snackBar.open('Successful update', 'OK', { panelClass: ['successSnackBar'] });
      })
      .catch(e => this.snackBar.open(e.error.error, 'OK', { panelClass: ['errorSnackBar'] }))
      .finally(() => {
        this.loading = false;
        this.dialogRef.close();
      });
  }

  private makeUpdateRequest({ imageControl, usernameControl, emailControl, passwordControl }:{ [_key:string]:AbstractControl }) {
    if (this.isValidImage() && this.isValidProfile()) {
      return this.playersService.updatePlayerImage(imageControl.value)
        .then(() => this.playersService.updatePlayer(usernameControl.value, emailControl.value, passwordControl.value))
        .then(() => {
          this.player.email = emailControl.value;
          this.player.username = usernameControl.value;
          return this.player;
        });
    } else if (this.isValidProfile()) {
      return this.playersService.updatePlayer(usernameControl.value, emailControl.value, passwordControl.value)
        .then(() => {
          this.player.email = emailControl.value;
          this.player.username = usernameControl.value;
          return this.player;
        });
    } else if (this.isValidImage()) {
      return this.playersService.updatePlayerImage(imageControl.value);
    } else {
      return Promise.resolve();
    }
  }

  private isValidImage():boolean {
    return this.profileForm.controls['image'].value;
  }

  private isValidProfile():boolean {
    return this.profileForm.controls['password'].value;
  }

  onFileChange(event:Event) {
    const target = event.currentTarget as HTMLInputElement;
    this.profileForm.controls['image'].setValue(target.files?.item(0) || null);
    this.setImagePreview();
  }

}
