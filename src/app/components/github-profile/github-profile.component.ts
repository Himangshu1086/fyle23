import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.scss'],
})

export class GithubProfileComponent {
  constructor(private apiService: ApiService) {}

  user: string;
  data: any;
  page: number = 1;
  per_page: number = 10;
  totalPage :number = 1 ;
  range: any[] = new Array(this.totalPage);  // to create pagination in the frontend

  userProfile: any;

  selectedOption: number; // select the custom per_page 

  errorMessage: any; // error handling

  ngOnInit() {
    this.user = this.apiService.username;
    this.apiService
      .getReposListApi(this.user, this.page, this.per_page)
      .subscribe((res:any) => {
        this.data = res.body;
        let linkHeader = res.headers.get('Link')
        this.totalPage = this.getTotalPages(linkHeader)
        this.range = Array(this.totalPage).fill(0).map((_, index) => index + 1);
      },
      (error) =>{
        this.errorMessage = error;
      }
      )

    this.apiService.getUser(this.user).subscribe(res=> this.userProfile = res);
  }

  // function to show the repo list with per_page 
  getOption(){
    this.per_page = this.selectedOption;
    this.apiService
      .getReposListApi(this.user, 1, this.per_page)
      .subscribe((res:any) => {
        this.data = res.body;
        let linkHeader = res.headers.get('Link')
        this.totalPage = this.getTotalPages(linkHeader)
        this.range = Array(this.totalPage).fill(0).map((_, index) => index + 1);
      },(error) =>{
        this.errorMessage = error;
      })
  }

  getPaginationData(page:number){
    console.log(page)
    this.page = page;
    this.apiService.getReposListApi(this.user,page,this.per_page).subscribe(res =>{
      this.data = res.body;
    },(error) =>{
      this.errorMessage = error;
    })
  }


  getTotalPages(linkHeader: string): number {
    if (!linkHeader) return 1; // Default to 1 page if there's no Link header

    const match = linkHeader.match(/page=(\d+)&per_page=(\d+)>; rel="last"/);
    console.log(match)
    if (match) {
      return parseInt(match[1], 10);
    }

    return 1; // Default to 1 page if the "last" link is not found
  }


  handlePrevBtn(){
    if(this.page > 1)
    {
        this.page -= 1;
        this.getPaginationData(this.page)
    }
    
  }

  handleNextBtn(){
    if(this.page < this.totalPage)
    {
      this.page +=1;
      this.getPaginationData(this.page)
    }
  }

}


