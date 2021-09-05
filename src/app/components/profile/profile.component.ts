import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
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

  onSubmit() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Mode': ''
    });
    let options = {headers: headers};

    this.httpClient.post<any>(this.SERVER_URL, "file:" + JSON.parse("{\"key\": \"value\"}"), options).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }



  ngOnInit(): void {
    if (this.storageService.getUser() != null) {
      this.isAuth = true;
    } else {
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

    let mainTable1 = document.getElementById("nonProcessed");
    this.httpClient.get<string[]>('http://localhost:8080/nonProcessed').subscribe(
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
          mainTable1?.appendChild(tr);
        }
      });

    let mainTable2 = document.getElementById("okProcessed");
    this.httpClient.get<string[]>('http://localhost:8080/processed').subscribe(
      response => {
        for (let i = 0; i < response.length; i++) {
          let tr = document.createElement('tr');
          let td1 = document.createElement('td');
          td1.innerHTML = response[i];
          let td2 = document.createElement('td');
          td2.style.display = "flex";
          td2.style.justifyContent = "center";
          td2.innerHTML = "<span class='tooltip' data-tooltip='Данные требуют программной обработки'><img class='nonItem' src='/assets/images/close.png' alt='НЕОБР'></span>";
          tr.appendChild(td1);
          tr.appendChild(td2);
          mainTable2?.appendChild(tr);
        }
      });

    let mainTable3 = document.getElementById("nonValid");
    this.httpClient.get<string[]>('http://localhost:8080/nonValid').subscribe(
      response => {
        for(let i = 0; i<response.length;i++){
          let tr = document.createElement('tr');
          let td1 = document.createElement('td');
          td1.innerHTML = response[i];
          let td2 = document.createElement('td');
          td2.style.display = "flex";
          td2.style.justifyContent = "center";
          td2.innerHTML = "<span class='tooltip' data-tooltip='Данные требуют ручной проверки'><img class='nonItem' src='/assets/images/quest.png' alt='НЕВАЛИД'></span>";
          tr.appendChild(td1);
          tr.appendChild(td2);
          mainTable3?.appendChild(tr);
        }
      });
  }

  //начало обработки документов
  startProcessing(): void {
    this.httpClient.post<any>('http://localhost:8080/startProcessing', "ez").subscribe(
      response => {
        let processedButton = document.getElementById("processedButton");
        processedButton!.style.display = 'none';
      }
    );
  }

  //деавторизация
  logout(): void {
    this.authService.logout();
  }
}
