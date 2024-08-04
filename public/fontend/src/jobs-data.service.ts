import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class JobsDataService {
    constructor(private _http: HttpClient) {      
    }

    get allJobs() {
        return this._http.get<any>("http://localhost:3000/api/jobs");
    }
    getOneJob(jobId: string) {
        return this._http.get<any>("http://localhost:3000/api/jobs/" + jobId);
    }

    
}
