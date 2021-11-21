import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentdetailsPageRoutingModule } from './studentdetails-routing.module';

import { StudentdetailsPage } from './studentdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    StudentdetailsPageRoutingModule
  ],
  declarations: [StudentdetailsPage]
})
export class StudentdetailsPageModule {}
