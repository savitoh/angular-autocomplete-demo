import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith, filter} from 'rxjs/operators';
import { FormCustomValidators } from './validators/FormCustomValidators';
import { UserService } from './service/user.service';
import { UserDTO } from './model/UserDTO';
import { AlbumDTO } from './model/AlbumDTO';
import { AlbumService } from './service/album.service';
import { MatAutocompleteTrigger } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  form: FormGroup;

  @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;
  @ViewChild('focusMe') _focusMe: ElementRef;

  user: UserDTO;
  users: Array<UserDTO>;
  filteredUsersOptions: Observable<UserDTO[]>;

  album: AlbumDTO;
  albums: Array<AlbumDTO>;
  filteredAlbumsOptions: Observable<AlbumDTO[]>;

  constructor(private userService: UserService, 
              private albumService: AlbumService) {

    this.users = new Array<UserDTO>();
    this.albums = new Array<AlbumDTO>();
  }

  ngOnInit() {
    this.getUsers();
    this.initForm();
  }

  private initForm(): void {
    this.form = new FormGroup({
      formUserControl: new FormControl('', [Validators.required]),
      formAlbumsControl: new FormControl({value: '', disabled: true}, [Validators.required])
    });

    this.filteredUsersOptions = this.form.get('formUserControl').valueChanges.pipe(
      startWith(''),
      filter(value => typeof value === 'string'),
      map(value => this._filterUsers(value))
    );
    this.filteredAlbumsOptions = this.form.get('formAlbumsControl').valueChanges.pipe(
      startWith(''),
      filter(value => typeof value === 'string'),
      map(value => this._filterAlbums(value))
    );
  }

  private _filterUsers(value: string): UserDTO[] {
    const filterValue = value.toLowerCase();
    return this.users.filter(user => user.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterAlbums(value: string): AlbumDTO[] {
    const filterValue = value.toLowerCase();
    return this.albums.filter(album => album.title.toLowerCase().indexOf(filterValue) === 0);
  }

  private addValidUserSelected() {
    this.form.get('formUserControl').setValidators(FormCustomValidators.valueSelected(this.users));
  }

  private addValidAlbumsSelected() {
    const albumsTitle = this.albums.map(album => album.title);
    this.form.get('formAlbumsControl').setValidators(FormCustomValidators.valueSelected(albumsTitle));
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe( res => {
      this.users = res;
      this.addValidUserSelected();
      console.log('Usuários: ', this.users);
    }, error => 
      console.log(error)
    );
  }

  private verificaSeDeveHabilitarFormAlbumsControl(): void {
    const formAlbumsControl = this.form.get('formAlbumsControl');
    this.albums.length > 0 ? formAlbumsControl.enable() : formAlbumsControl.disable();
  }

  getAlbumsByUser(userId: number) {
    console.log('User Id: ', userId);
    this.albumService.getAlbumsFromUser(userId).subscribe( resp => {
      this.albums = resp;
      this.addValidAlbumsSelected();
      this.verificaSeDeveHabilitarFormAlbumsControl();
      console.log('Albums By Users: ', this.albums);
    }, error => {
      console.log(error);
    });
  }

  getUser(): void {
    console.log("Usuario Selecionado: ", this.user);
  }

  displayFn(user: UserDTO) {
    if (user) { return user.name; }
  }

}



