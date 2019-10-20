import { Injectable } from '@angular/core';
import { UserDTO } from '../model/UserDTO';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})
export class UserService {

  private readonly baseUrlUsers = 'https://jsonplaceholder.typicode.com/users';

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<UserDTO[]> {
    return this.httpClient.get<UserDTO[]>(this.baseUrlUsers);
  }
}
