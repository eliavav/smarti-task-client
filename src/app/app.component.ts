import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UsersService} from "../services/users.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'users';
  users: any;
  isUserForm = false;
  userForm: any;
  isUserToUpdate = false;
  private userId: any;
  isClicked = false;
  data: any = [];

  constructor(private http: HttpClient, private form: FormBuilder, private usersService: UsersService) {
  }

  public ngOnInit() {
    this.getUsers();
    this.initializeForm();
  }

  deleteUser(user: any) {
    console.log(user);
    this.usersService.deleteUser(user.UserId).subscribe(() => {
      this.getUsers();
    });
  }

  updateUser(user: any) {
    console.log(user);
    this.isUserToUpdate = true;
    this.userId = user.UserId;
    this.isUserForm = true;
    const userValues = {
      UserId: user.UserId,
      UserName: user.UserName,
      UserAddress: user.UserAddress,
      UserPhone: user.UserPhone,
    };
    this.userForm.patchValue(userValues);
  }

  private getUsers() {
    this.usersService.getUsers().subscribe((res: any) => {
      this.users = res;
    });
  }

  addUser() {
    this.initializeForm();
    this.isClicked = true;
    this.isUserForm = true;
  }

  sendForm() {
    console.log('submit form');
    if (!this.isUserToUpdate) {
      this.usersService.addUser(this.userForm.value).subscribe(() => {
        this.getUsers();
        this.isClicked = false;
        this.isUserForm = false;
      });
    } else {
      console.log(this.userForm.value);
      this.usersService.updateUser(this.userForm.value).subscribe(() => {
        this.getUsers();
        console.log(2323);
        this.isClicked = false;
        this.isUserForm = false;
        this.isUserToUpdate = false;
      })
    }

  }

  hideForm() {
    this.isClicked = false;
    this.isUserForm = false;
    this.isUserToUpdate = false;
  }

  search(event: any) {
    if (!event.value) {
      this.data = [];
      return;
    }
    this.usersService.search(event.value).subscribe((res: any) => {
      this.data = res.map((item: any) => item.UserName );

    });
    console.log(event.value);
  }

  private initializeForm() {
    this.userForm = this.form.group({
      UserId: [],
      UserName: [],
      UserAddress: [],
      UserPhone: [],
    })
  }
}
