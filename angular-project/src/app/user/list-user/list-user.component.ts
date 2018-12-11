import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserSvcService } from '../services/user-svc.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-list-user',
	templateUrl: './list-user.component.html',
	styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
	dataSource: any[];
	cols: { colTitle: string; }[];
	constructor(private userSvc: UserSvcService) { }

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
		// console.log(this.dataSource);
	}
	getUser() {
		this.userSvc.getAllUser().subscribe(result => this.dataSource = result)
	}
	deleteUser(id) {
		this.userSvc.delete(id).subscribe((res: any) => {
			this.ngOnInit();
		})
	}
}
