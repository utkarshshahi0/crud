import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CrudComponent } from './component/crud/crud.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet,CrudComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
}
