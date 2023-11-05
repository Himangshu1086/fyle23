import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.scss'],
})


export class GithubProfileComponent {

  constructor(private homeComponent : HomeComponent) {}

  data: any;
  username: string;

  ngOnInit(){
    this.data = this.homeComponent.getRepoList();
  }

}

