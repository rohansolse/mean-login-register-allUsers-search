import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {

    constructor(private commonService: CommonService) { }

    registerUser(data) {
        return new Promise((resolve, reject) => {
            return this.commonService.getPostData("/register", data).subscribe(result => {
                resolve(result);
            })
        })
    }

    checkEmpId(data) {
        return new Promise((resolve, reject) => {
            return this.commonService.getPostData("/register/checkEmpId", data).subscribe(result => {
                resolve(result)
            })
        })
    }
}
