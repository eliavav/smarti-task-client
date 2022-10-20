import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";

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

  constructor(private http: HttpClient, private form: FormBuilder) {
  }

  public ngOnInit() {
    this.getUsers();
    this.userForm = this.form.group({
      UserId: [],
      UserName: [],
      UserAddress: [],
      UserPhone: [],
    })
  }


  deleteUser(user: any) {
    console.log(user);
    this.http.delete("http://127.0.0.1:8000/user/" + user.UserId).subscribe(() => {
      this.getUsers();
    });
  }

  updateUser(user:any) {
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
    this.http.get('http://127.0.0.1:8000/user').subscribe((res: any) => {
      this.users = res;
    });
  }

  addUser() {
    this.isUserForm = true;
  }

  sendForm() {
    if (! this.isUserToUpdate) {
      console.log(this.userForm.value);
      this.http.post("http://127.0.0.1:8000/user",this.userForm.value).subscribe(() => {
        this.getUsers();
        this.isUserForm = false;
      });
    } else {
      console.log(this.userForm.value);
      this.http.put("http://127.0.0.1:8000/user", this.userForm.value).subscribe(() => {
        this.getUsers();
        this.isUserForm = false;
      })
    }

  }

  updateForm(){

  }
}
