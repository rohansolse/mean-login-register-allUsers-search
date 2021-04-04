import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { LoginService } from '../services/login.service';

@Component({
    selector: 'app-alluser',
    templateUrl: './alluser.component.html',
    styleUrls: ['./alluser.component.css']
})

export class AlluserComponent implements OnInit {
    tabledata: any = [];
    searchText: string = '';
    searchVal: any;
    filteredData: any = [];
    cols = [{ name: 'firstName' }, { name: 'lastName' }, { name: 'employeeID' }, { name: 'email' }, { name: 'organizationName' },]

    constructor(private router: Router, private commonService: CommonService, private loginService: LoginService) { }

    async ngOnInit() {
        let response = await this.loginService.getAllusers()
        console.log(response);
        if (response['status']) {
            this.tabledata = response['data']
            this.tabledata.forEach(element => {
                this.filteredData.push(element)
            });
        }
    }

    filterDatatable(event) {
        this.searchVal = event.target.value
        if (event) {
            let val = this.searchVal.toLowerCase();
            let colsAmt = this.cols.length;
            let keys = ["firstName", "lastName", "email", "employeeID", "organizationName"];
            this.tabledata = this.filteredData.filter(function (item) {
                for (let i = 0; i < colsAmt; i++) {
                    if (item[keys[i]] != null && (item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 || !val)) {
                        return true;
                    }
                }
            });
        }
    }

    btnClick() {
        this.commonService.loggedOut()
    }

}
