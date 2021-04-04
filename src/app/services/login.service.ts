import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private commonService: CommonService, private router: Router) { }

    loginUser(data) {
        return new Promise((resolve, reject) => {
            return this.commonService.getPostData("/login", data).subscribe(result => {
                resolve(result);
            })
        })
    }

    getAllusers() {
        return new Promise((resolve, reject) => {
            return this.commonService.getData("/getusers",).subscribe(
                result => {
                    resolve(result);
                },
                err => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status == 401) {
                            this.router.navigate(["/login"])
                        }
                    }
                })
        })
    }
}
