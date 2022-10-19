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
      name: [],
      address: [],
      phoneNumber: [],
    })
  }


  deleteUser(user: any) {
    this.http.delete("localhost:8000/user/" + user.id).subscribe(() => {
      this.getUsers();
    });
  }

  updateUser(user:any) {
    this.isUserToUpdate = true;
    this.userId = user.id;
    this.isUserForm = true;
    const userValues = {
      name: user.API,
      address: user.Description,
      phoneNumber: user.Category,
    };
    this.userForm.patchValue(userValues);
  }

  private getUsers() {
    this.http.get('https://api.publicapis.org/entries?cors=no&category=Animals').subscribe((res: any) => {
      this.users = res.entries;
    });
  }

  addUser() {
    this.isUserForm = true;
  }

  sendForm() {
    if (! this.isUserToUpdate) {
      console.log(this.userForm.value);
      this.http.post("localhost:8000/user/",this.userForm.value).subscribe(() => {
        this.getUsers();
        this.isUserForm = false;
      });
    } else {
      this.http.put("localhost:8000/user/" + this.userId, this.userForm.value).subscribe(() => {
        this.getUsers();
        this.isUserForm = false;
      })
    }

  }
}
