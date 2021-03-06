import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service'
import { LoginService } from '../services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    errorMsg: any = null;
    isSubmitted: boolean = false;
    constructor(private router: Router,
        private commonService: CommonService,
        private loginService: LoginService) {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        });
    }

    ngOnInit(): void {
    }

    async onSubmit() {
        this.isSubmitted = true;
        if (this.loginForm.valid) {
            // console.log("data :", this.loginForm.value);
            let user = {
                email: this.loginForm.value.email,
                password: await this.commonService.getIncrepted(this.loginForm.value.password)
            }
            let response = await this.loginService.loginUser(user)
            console.log("response : ", response);
            if (!response['status']) {
                this.errorMsg = response['message']
            }
            else {
                this.errorMsg = null
                // console.log(response['data']['token']);
                localStorage.setItem('token', response['data']['token'])
                this.router.navigate(['/allusers'])
            }

        }
    }

    btnClick = function () {
        this.router.navigate(['/registration']);
    }

}
