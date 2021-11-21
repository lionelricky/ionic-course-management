import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  isAuthenticated:boolean = false;

   constructor(private http: HttpClient) { }

  postToApi(url: string, data: FormData){
    return this.http.post(url, data, {
      reportProgress: true,
      observe: 'events',
      responseType: 'text'
    });
  }

  getAuthentication(username: string, password: string){
    //we would ping serve here... but...
    this.isAuthenticated = true;
  }

  validateAuthentication(){
    return this.isAuthenticated;
  }

}
