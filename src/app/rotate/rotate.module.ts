import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RotateComponent } from './rotate.component';
import { RotateFormComponent } from './components/rotate-form/rotate-form.component';



@NgModule({
  declarations: [
    RotateComponent,
    RotateFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RotateModule { }
