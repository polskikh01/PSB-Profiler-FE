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
          td2.innerHTML = "<span class='tooltip tooltipspec' data-tooltip='Данные требуют программной обработки'><img class='nonItem' src='/assets/images/close.png' alt='НЕОБР'></span>";
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
          td2.innerHTML = "<span class='tooltip' data-tooltip='Данные обработаны и переданы в эл. досье'><img class='okItem' src='/assets/images/tick.png' alt='НЕОБР'></span>";
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
          td2.innerHTML = "<span class='tooltip' data-tooltip='Данные требуют ручной проверки'><img class='nonValItem' src='/assets/images/quest.png' alt='НЕВАЛИД'></span>";
          tr.appendChild(td1);
          tr.appendChild(td2);
          mainTable3?.appendChild(tr);
        }
      });
  }

  //начало обработки документов
  startProcessing(): void {
    let processedButton = document.getElementById("processedButton");
    processedButton!.style.display = 'none';
    
    let items = document.getElementsByClassName("nonItem");
    let itemsSpans = document.getElementsByClassName("tooltipspec");

    for(let i=0;i<items.length;i++){
      (<HTMLImageElement>items[i]).style.display = "none";
      itemsSpans[i].setAttribute('data-tooltip', 'Данные находятся в обработке');
      itemsSpans[i].innerHTML += "<svg class=\"spinner\" width=\"32px\" height=\"32px\" viewBox=\"0 0 66 66\" xmlns=\"http://www.w3.org/2000/svg\"><circle class=\"path\" fill=\"none\" stroke-width=\"6\" stroke-linecap=\"round\" cx=\"33\" cy=\"33\" r=\"30\"></circle></svg>";
    }

    this.httpClient.post<any>('http://localhost:8080/startProcessing', "ez").subscribe(
      response => {
        
      }
    );
  }

  //деавторизация
  logout(): void {
    this.authService.logout();
  }
}
