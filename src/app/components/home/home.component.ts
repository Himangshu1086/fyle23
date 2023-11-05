import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent {

  constructor(
    private apiService: ApiService
  ) {}

  private username: string = "";
  private repoList: any;
  private page: number = 1;
  private per_page: number = 10;


  setUsername(event: any){
      this.username = event.target.value
  }

  setRepoList(data: Object) {
    this.repoList = data;
  }

  getUsername(){
    return this.username;
  }

  getRepoList(){
    return this.repoList;
  }

  handleRepoListClick(){
    this.apiService.getReposListApi(this.username,this.page , this.per_page).subscribe(data =>{
      console.log(data)
      this.setRepoList(data)
    });
  }

}
