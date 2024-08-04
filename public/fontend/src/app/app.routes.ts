import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobComponent } from './job/job.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "jobs",
        component: JobsComponent
    },
    {
        path: "job/:jobId",
        component: JobComponent
    },
    {
        path: "**",
        component: ErrorPageComponent
    }
];
