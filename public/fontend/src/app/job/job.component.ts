import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsDataService } from '../../jobs-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job.component.html',
  styleUrl: './job.component.css'
})
export class JobComponent implements OnInit{
  job: any;
  jobId!: string;

  constructor(
    private _route: ActivatedRoute,
    private _jobsDataService: JobsDataService
  ) {
    this.jobId = this._route.snapshot.params["jobId"]
  }

  ngOnInit(): void {
    this._jobsDataService.getOneJob(this.jobId).subscribe(response => {
      this.job = response
    })
  }


}
