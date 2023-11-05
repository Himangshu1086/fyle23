import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent {

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  private username: string;

  setUsername(event: any){
      this.username = event.target.value
  }

  handleRepoListClick(){
      this.apiService.setUsername(this.username)
      this.router.navigate(['/profile'])
  }

}
