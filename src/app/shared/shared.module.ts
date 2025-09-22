import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
  ],
  exports: [
    CommonModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
  ]
})
export class SharedModule {

}
