import { Component, OnInit } from '@angular/core';
import { JobsDataService } from '../../jobs-data.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit{
  jobs: any[] = [];

  constructor(
    private _jobsDataService: JobsDataService
  ) {}

  ngOnInit(): void {
    this._jobsDataService.allJobs.subscribe(response => {
      this.jobs = response
    })
  }
}
