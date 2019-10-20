import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlbumDTO } from '../model/AlbumDTO';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {

  private readonly baseUrlAlbums = 'https://jsonplaceholder.typicode.com/albums';

  constructor(private httpClient: HttpClient) { }

  getAlbumsFromUser(userId: number): Observable<AlbumDTO[]> {
    const uriAlbumsByUser = `${this.baseUrlAlbums}?userId=${userId}`;
    console.log('uriAlbumsByUser: ', uriAlbumsByUser);
    return this.httpClient.get<AlbumDTO[]>(uriAlbumsByUser);
  }
}
