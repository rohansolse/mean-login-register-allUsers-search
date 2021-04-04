import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { CommonService } from '../services/common.service'

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

    constructor(private inject: Injector) { }

    intercept(req, next) {
        let authservice = this.inject.get(CommonService)
        let tokenizedReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${authservice.getToken()}`)
        })
        return next.handle(tokenizedReq)
    }
}
