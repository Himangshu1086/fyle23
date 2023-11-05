import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }
  
  username: string;

  getUser(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`);
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
  getReposListApi(username: string , page: number, per_page:number) {
    return this.httpClient.get(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${per_page}` , {observe:'response'});
}

  setUsername(username:string){
    this.username = username;
  }

}
