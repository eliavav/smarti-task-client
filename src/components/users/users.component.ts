import {Component, OnInit} from "@angular/core";
import {User} from "../../models/user.model";
import {HttpClient} from "@angular/common/http";
import {FormBuilder} from "@angular/forms";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-users-component',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  users: User[] = [];
  isUserForm = false; // display/hide the form
  userForm: any;
  isUserToUpdate = false; // show/hide values to update in form
  private userId: any; //update/delete user
  isAddUserButtonClicked = false;
  searchData: string[] = []; //display autocomplete users name search

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
    this.usersService.getUsers().subscribe((res: User[]) => {
      this.users = res;
    });
  }

  addUser() {
    this.initializeForm();
    this.isAddUserButtonClicked = true;
    this.isUserForm = true;
  }

  sendForm() {
    console.log('submit form');
    if (!this.isUserToUpdate) {
      this.usersService.addUser(this.userForm.value).subscribe(() => {
        this.getUsers();
        this.isAddUserButtonClicked = false;
        this.isUserForm = false;
      });
    } else {
      console.log(this.userForm.value);
      this.usersService.updateUser(this.userForm.value).subscribe(() => {
        this.getUsers();
        console.log(2323);
        this.isAddUserButtonClicked = false;
        this.isUserForm = false;
        this.isUserToUpdate = false;
      })
    }

  }

  hideForm() {
    this.isAddUserButtonClicked = false;
    this.isUserForm = false;
    this.isUserToUpdate = false;
  }

  search(event: any) {
    if (!event.value) {
      this.searchData = [];
      return;
    }
    this.usersService.search(event.value).subscribe((users: User[]) => {
      this.searchData = users.map((user: User) => user.UserName );
    });
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
