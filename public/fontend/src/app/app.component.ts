import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JobsDataService } from '../jobs-data.service';
import { NavigationsComponent } from './navigations/navigations.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  
}
