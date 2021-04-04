import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { RegistrationService } from '../services/registration.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

    registrationForm: FormGroup;
    isSubmitted: boolean = false;
    checkEmpId: Boolean = true;
    showMsg: boolean = false;
    emailExists: boolean = false;

    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private commonService: CommonService,
        private registerService: RegistrationService) {
        this.registrationForm = this.formBuilder.group({
            firstName: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(30),
                Validators.pattern('^[a-zA-Z ]*$')]),
            lastName: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(30),
                Validators.pattern('^[a-zA-Z ]*$')]),
            employeeID: new FormControl('', []),
            organizationName: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50),
                Validators.pattern('^[a-zA-Z ]*$')]),
            email: new FormControl('', [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(80),
                Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(15),
                Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$')
            ])
        });
    }

    async ngOnInit() {
        this.registrationForm.patchValue({
            employeeID: await this.getRandomString()
        })
    }

    getRandomString() {
        return new Promise(async (resolve, reject) => {
            let length = 6;
            let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            while (this.checkEmpId) {
                for (var i = 0; i < length; i++) {
                    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
                }
                let response = await this.registerService.checkEmpId({ employeeId: `AG-${result}` })
                // console.log("checkEmpId response :", response);
                this.checkEmpId = response['status']
            }
            resolve(`AG-${result}`);
        })
    }

    async onRegistrationFormSubmit() {
        this.isSubmitted = true;
        // console.log(this.registrationForm.valid);
        // console.log(this.registrationForm.value);
        if (this.registrationForm.valid) {
            let user = {
                firstName: this.registrationForm.value.firstName.toLowerCase(),
                lastName: this.registrationForm.value.lastName.toLowerCase(),
                email: this.registrationForm.value.email.toLowerCase(),
                password: await this.commonService.getIncrepted(this.registrationForm.value.password),
                employeeID: this.registrationForm.value.employeeID,
                organizationName: this.registrationForm.value.organizationName.toLowerCase(),
            }
            let response = await this.registerService.registerUser(user)
            // console.log("onRegistrationFormSubmit :", response);
            if (response['status']) {
                this.router.navigate(['/login']);
            }
        }
    }

    async checkEmail(event) {
        let gotEmail = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(this.registrationForm.value.email)
        // console.log("data :", gotEmail);
        if (gotEmail) {
            let response = await this.registerService.checkEmailId({ email: this.registrationForm.value.email })
            // console.log("response :", response);
            this.emailExists = response['status']
            // console.log(this.emailExists);
        }
    }

    btnClick = function () {
        this.router.navigate(['/login']);
    }
}
