import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
// import "rxjs/add/operator/map";
import { map } from "rxjs/operators";
import { NzMessageService } from "ng-zorro-antd";
// import { Observable } from "rxjs";

interface Response {
	success: boolean,
	msg: string,
	token: string,
	user: {}
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http, private httpClient: HttpClient, private message: NzMessageService,) {}

  registerUser(user) {
	let header = new HttpHeaders;
	header.append('Content-Type', 'application/json');
	return this.httpClient.post('http://localhost:3000/user/register', user, {headers: header}).pipe(map((response: Response) => {
		
	}))
  }
  
  authenticateUser(user) {
	  let header = new HttpHeaders;
	  header.append('Content-Type', 'application/json');
	  return this.httpClient.post('http://localhost:3000/user/authenticate', user, {headers: header}).pipe(map((response: Response) => {
			if(response.success) {
				localStorage.setItem('id_token', response.token);
				localStorage.setItem('user', JSON.stringify(user))
				this.authToken = response.token;
				this.user = response.user;
			} else {
				this.message.create('error', response.msg);
			}		
		}))
  }
}
