import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {


    constructor(private commonService: CommonService) { }


    loginUser(data) {
        return new Promise((resolve, reject) => {
            return this.commonService.getPostData("/login", data).subscribe(result => {
                resolve(result);
            })
        })
    }
}
