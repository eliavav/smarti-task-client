import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "../models/user.model";

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {
  }

  serverUrl = "http://127.0.0.1:8000/user";

  addUser(userData: any) {
    return this.http.post(this.serverUrl, userData);
  }

    getUsers(): Observable<User[]> {
        return this.http.get(this.serverUrl) as Observable<User[]>;
    }

  deleteUser(userId: number) {
    return this.http.delete(this.serverUrl + '/' + userId)
  }

  updateUser(userData: any) {
    return this.http.put(this.serverUrl, userData);
  }

  search(value: string): Observable<User[]> {
    const params = new HttpParams().set("value",value);
    return this.http.get(this.serverUrl + '/search', {params}) as Observable<User[]>;
  }
}
