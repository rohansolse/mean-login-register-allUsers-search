import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CommonService } from './services/common.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
        private commonservice: CommonService) { }

    canActivate(): boolean {
        if (this.commonservice.isLoggedIn()) {
            return true
        }
        else {
            this.router.navigate(['/'])
            return false
        }
    }

}
