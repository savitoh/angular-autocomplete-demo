import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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

  user: string;
  users: Array<UserDTO>;
  filteredUsersOptions: Observable<UserDTO[]>;

  album: string;
  albums: Array<AlbumDTO>;
  filteredAlbumsOptions: Observable<AlbumDTO[]>;

  constructor(private userService: UserService, 
              private albumService: AlbumService,
              private fb: FormBuilder) {

    this.users = new Array<UserDTO>();
    this.albums = new Array<AlbumDTO>();
  }

  ngOnInit() {
    this.getUsers();
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      formUserControl: new FormControl('', [Validators.required]),
      formAlbumsControl: new FormControl({value: '', disabled: true}, [Validators.required])
    });

    this.filteredUsersOptions = this.form.get('formUserControl').valueChanges.pipe(
      startWith(''),
      map(value => this._filterUsers(value))
    );
    this.filteredAlbumsOptions = this.form.get('formAlbumsControl').valueChanges.pipe(
      startWith(''),
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
    const userNames = this.users.map(user => user.name);
    this.form.get('formUserControl').setValidators(FormCustomValidators.valueSelected(userNames));
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

  private getUserIdFromUserName(userName: string): number {
    return this.users.find(user => user.name === userName).id;
  }

  private verificaSeDeveHabilitarFormAlbumsControl(): void {
    const formAlbumsControl = this.form.get('formAlbumsControl');
    this.albums.length > 0 ? formAlbumsControl.enable() : formAlbumsControl.disable();
  }

  getAlbumsByUser(userName: string) {
    console.log('User Name: ', userName);
    const userId = this.getUserIdFromUserName(userName);
    console.log('User id: ', userId);
    this.albumService.getAlbumsFromUser(userId).subscribe( resp => {
      this.albums = resp;
      this.addValidAlbumsSelected();
      this.verificaSeDeveHabilitarFormAlbumsControl();
      console.log('Albums By Users: ', this.albums);
    }, error => {
      console.log(error);
    });
  }

  save(): void {
    console.log('Usuario Selecionado: ', this.user);
    console.log('Album Selecionado: ', this.album);
  }

  displayFn(user: UserDTO) {
    if (user) { return user.name; }
  }

}



