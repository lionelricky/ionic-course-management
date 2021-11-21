import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

   constructor(private http: HttpClient) { }

  postToApi(url: string, data: FormData){

    return this.http.post(url, data, {
      reportProgress: true,
      observe: 'events',
      responseType: 'text'
    });
  }
}
