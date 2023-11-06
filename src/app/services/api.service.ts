import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }
  
  username: string;

  handleError(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.status === 0) {
    errorMessage = 'An error occurred: Server unreachable';
    return throwError(() => new Error(errorMessage));
    } else {
      errorMessage =   `Backend returned code ${error.status}, body was: `, error.error;
    }
    errorMessage += 'Something bad happened; please try again later.';
    return throwError(() => new Error(errorMessage));
  }


  getUser(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`).pipe(
      catchError(this.handleError)
    );
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
  getReposListApi(username: string , page: number, per_page:number) {
    return this.httpClient.get(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${per_page}` , {observe:'response'}).pipe(
      catchError(this.handleError)
    );
}

  setUsername(username:string){
    this.username = username;
  }

}
