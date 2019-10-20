import { NgModule } from '@angular/core';
import { MatAutocompleteModule, 
         MatInputModule, 
         MatButtonModule, 
         MatButtonToggleModule } from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
  imports: [
    MatAutocompleteModule, 
    MatInputModule, 
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
  ],
  exports: [
    MatAutocompleteModule, 
    MatInputModule, 
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
  ]
})
export class CustomMaterialModule {
}