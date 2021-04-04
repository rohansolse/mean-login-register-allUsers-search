import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
@Injectable({
    providedIn: 'root'
})
export class CommonService {

    projectPath: any = "http://localhost:3000/api/v1"
    secreteKey: string = "thisIsMyLearningProject"

    constructor(private http: HttpClient, private router: Router) { }

    getData(url: any) {
        return this.http.get(this.projectPath + url)
    }

    getPostData(url: any, data: any) {
        return this.http.post(this.projectPath + url, data)
    }

    isLoggedIn() {
        return !!localStorage.getItem('token')
    }

    getToken() {
        return localStorage.getItem('token')
    }

    loggedOut() {
        localStorage.removeItem('token')
        this.router.navigate(["login"])
    }

    getIncrepted(password) {
        return CryptoJS.AES.encrypt(password.trim(), this.secreteKey.trim()).toString();
    }
}
