import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Role} from 'src/app/models/role';
import {User} from 'src/app/models/user';
import {AuthService} from 'src/app/services/auth.service';
import {StorageService} from 'src/app/services/storage.service';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  user: User = {} as User;
  authUser: User = {} as User;
  public isAuth = false;
  public isAdmin = false;
  public currentUser = false;
  public isImage = false;
  public fileToUpload!: string;

  uploadForm!: FormGroup;
  SERVER_URL = "http://localhost:8080/uploadFile";

  //private error = "";

  constructor(private formBuilder: FormBuilder, 
    private httpClient: HttpClient,
    private route: ActivatedRoute, 
    private authService: AuthService, 
    private userService: UserService, 
    private storageService: StorageService,
    private router: Router) {
  }

  /* Загрузка фото профиля */
  uploadFileToActivity() {
    this.userService.postFile(this.fileToUpload, this.storageService.getUser().id as number).subscribe(
      response => {

      }, error => {
        console.log(error);
        window.location.reload();
      });
  }

  onSubmit() {
    //const formData = new FormData();
    //formData.append('file', this.uploadForm.get('profile')?.value);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Mode' : ''
    });
    let options = { headers: headers };

    this.httpClient.post<any>(this.SERVER_URL, "file:"+JSON.parse("{\"key\": \"value\"}"), options).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
/*
    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );*/
  }
  
  onFileSelect(event?: Event) {
    if(event != null && event.target != null){
      if ((<HTMLInputElement>event.target).files!.length > 0) {
        const file = (<HTMLInputElement>event.target).files![0];
        this.uploadForm.get('profile')?.setValue(file);
      }
    }
  }

  ngOnInit(): void {
    if (this.storageService.getUser() != null) {
      this.isAuth = true;
    }else{
      this.router.navigate(['/']).then(() => location.reload());
    }

    /* Инициализация страницы пользователя */
    const id = this.route.snapshot.paramMap.get('id') || "1";
    this.userService.userPage(id).subscribe(response => {
        this.user = response;
      },
      error => {
        //alert(error.error);
      });

    this.authUser = this.storageService.getUser();

    /* Проверки разграничения доступа */
    if (this.storageService.getUser() != null) {
      if (this.storageService.getUser().id?.toString() == id) {
        this.currentUser = true;
      }
    }

    let mainTable = document.getElementById("nonProcessed");
    this.httpClient.get<string[]>('http://localhost:8080/profile/' + id).subscribe(
      response => {
        for(let i = 0; i<response.length;i++){
          let tr = document.createElement('tr');
          let td1 = document.createElement('td');
          td1.innerHTML = response[i];
          let td2 = document.createElement('td');
          td2.style.display = "flex";
          td2.style.justifyContent = "center";
          td2.innerHTML = "<span class='tooltip' data-tooltip='Данные требуют программной обработки'><img class='nonItem' src='/assets/images/close.png' alt='НЕОБР'></span>";
          tr.appendChild(td1);
          tr.appendChild(td2);
          mainTable?.appendChild(tr);
        }
      });
  }

  logout(): void {
    this.authService.logout();
  }
}
