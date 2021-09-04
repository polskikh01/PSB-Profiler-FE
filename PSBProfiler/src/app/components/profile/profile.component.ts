import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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

  //private error = "";

  constructor(private route: ActivatedRoute, private authService: AuthService, private userService: UserService, private storageService: StorageService) {
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

  /* Уведомления */
  handleNotification() {
    //alert("!");
  }

  /* Валидация фото профиля */
  handleFileInput(event?: Event) {
    this.fileToUpload = (<HTMLInputElement>event?.target).value;

    const img = new Image();
    img.onload = () => {
      this.uploadFileToActivity();
      document.getElementById("AddImage")!.style.border = "2px solid green";
    }
    img.onerror = () => {
      document.getElementById("AddImage")!.style.border = "2px solid red";
    }
    img.src = this.fileToUpload;
  }

  ngOnInit(): void {
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
      this.isAuth = true;
    }
    if (this.storageService.getUser() != null) {
      if (this.storageService.getUser().id?.toString() == id) {
        this.currentUser = true;
      }
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
