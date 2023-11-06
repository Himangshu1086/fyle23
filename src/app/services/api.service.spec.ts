import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  it('should set the username', () => {
    const username = 'testuser';
    apiService.setUsername(username);
    expect(apiService.username).toBe(username);
  });


  it('should get user data', () => {
    const mockUserData = { login: 'testuser' };
    const username = 'testuser';

    apiService.getUser(username).subscribe((data) => {
      expect(data).toEqual(mockUserData);
    });

    const req = httpTestingController.expectOne(`https://api.github.com/users/${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserData);
  });

  it('should get user repos list', () => {
    const username = 'testuser';
    const page = 1;
    const per_page = 10;
    const mockRepos = [{ name: 'repo1' }, { name: 'repo2' }];

    apiService.getReposListApi(username, page, per_page).subscribe((data) => {
      expect(data.body).toEqual(mockRepos);
    });

    const req = httpTestingController.expectOne(
      `https://api.github.com/users/${username}/repos?page=${page}&per_page=${per_page}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockRepos, { status: 200, statusText: 'OK' });
  });
});
