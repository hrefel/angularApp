import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { iUser } from '../services/user-interface';

@Injectable({
	providedIn: 'root'
})
export class UserSvcService {
	dataUser: any;
	baseUrl = 'http://localhost:3000/user';
	public user;

	constructor(private httpClient: HttpClient,
		private http: Http,
		private messageService: NzMessageService) { }

	getAllUser(): Observable<any> {
		return this.httpClient.get(this.baseUrl).pipe(map((data: any[]) => {
			this.dataUser = data;
			return data;
		}), catchError(error => {
			return throwError('Ada Kesalaha Server', error)
		}))
	}
	delete(id: number) {
		// return this.httpClient.delete(this.baseUrl + '/' + id).subscribe((val)=> {
		  

		// })
		return this.httpClient.delete(this.baseUrl + '/' + id).pipe(map((response: Response) => {
			console.log(response);
		}))
		
	}
	saveData(data) {
		return this.httpClient.post(this.baseUrl, data).pipe(map((response: Response) => {
			console.log(response);
		}))
	}
}
