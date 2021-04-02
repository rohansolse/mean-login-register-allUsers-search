import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    projectPath: any = "http://localhost:3000/api/v1"

    constructor(private http: HttpClient) { }

    getData(url: any) {
        return this.http.get(this.projectPath + url)
    }

    getPostData(url: any, data: any) {
        return this.http.post(this.projectPath + url, data)
    }
}
