import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';

import {ModalModule} from 'angular2-modal';

import { Ng2BootstrapModule,AlertModule, ModalModule as ModalModuleNg } from 'ng2-bootstrap';

import { SheetExcelComponent } from './components/sheetExcel.component';
import { FormComponent } from './components/formulaForm.component';
import { SelectModalComponent } from './components/selectModal.component';
import { textFormComponent } from './components/textForm.component';

@NgModule({
  declarations: [
    AppComponent,
    SheetExcelComponent,
    FormComponent,
    SelectModalComponent,
    textFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FormsModule,
    routing,
    Ng2BootstrapModule,
    ModalModule.forRoot(),
    ModalModuleNg.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }


