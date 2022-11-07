import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-end-dialog',
  templateUrl: './end-dialog.component.html',
  styleUrls: ['./end-dialog.component.scss']
})
export class EndDialogComponent implements OnInit {

  constructor(
    private router:Router
  ) {}

  ngOnInit(): void {}

  goToMainMenu() {
    this.router.navigateByUrl('/');
  }

}
