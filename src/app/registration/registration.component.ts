import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

    registrationForm: FormGroup;
    isSubmitted: boolean = false;

    constructor(private formBuilder: FormBuilder,
        private router: Router) {
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
            employeeID: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(8),
                Validators.pattern('^[a-zA-Z0-9]*$')]),
            organizationName: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(50),
                Validators.pattern('^[a-zA-Z0-9]*$')]),
            email: new FormControl('', [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(80),
                Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(12)
            ])
        });
    }
    ngOnInit() {

    }

    onRegistrationFormSubmit() {
        this.isSubmitted = true;
        if (this.registrationForm.valid) {
            console.log("User Registration Form Submit", this.registrationForm.value);
        }

    }

    btnClick = function () {
        this.router.navigateByUrl('/login');
    }
}
