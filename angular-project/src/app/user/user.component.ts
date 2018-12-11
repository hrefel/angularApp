import { Component, OnInit } from '@angular/core';
import { UserSvcService } from './services/user-svc.service';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { rootRoute } from '@angular/router/src/router_module';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	baseUrl = 'http://localhost:3000/user';
	firstName: any;
	address: any;
	userName: any;
	email: any;
	password: any;
	noTelp: any;
	gender: any;
	bornDate = '1994-08-16';

	constructor(private userSvc: UserSvcService, private httpClient: HttpClient) { }
	dataSource: any[];
	cols: { colTitle: string; }[];
	ngOnInit() {
		this.cols = [
			{ colTitle: 'Nama' },
			{ colTitle: 'Gender' },
			{ colTitle: 'Address' },
			{ colTitle: 'Born Date' },
			{ colTitle: 'Email' },
			{ colTitle: 'Nomor Telp' },
			{ colTitle: 'Username' },
			{ colTitle: 'Action' },
		];
		this.getUser();
	}
	getUser() {
		this.userSvc.getAllUser().subscribe(result => this.dataSource = result)
	}
	saveData() {
		let data = {
			address: this.address,
			loginAttemps: 0,
			nama: this.firstName,
			email: this.email,
			username: this.userName,
			password: this.password,
			notelp: this.noTelp,
			gender: this.gender,
			bornDate: this.bornDate
		}

		// this.userSvc.saveData(data)
		// this.httpClient.post(this.baseUrl, data).subscribe(res => {
		//   this.ngOnInit();

		// })
		this.userSvc.saveData(data).subscribe(res => {
			this.ngOnInit();
			this.resetData();
		})
	}

	resetData() {
		this.address = '';
		this.firstName = '';
		this.email = '';
		this.userName = '';
		this.password = '';
		this.noTelp = '';
		this.gender = '';
		this.bornDate = '';
		this.ngOnInit();
	}

	deleteUser(id) {
		this.userSvc.delete(id).subscribe((res: any) => {
			this.ngOnInit();
		})
	}

}
