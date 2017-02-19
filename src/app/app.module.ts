import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';
import { Ng2BootstrapModule,ModalModule,DropdownModule } from 'ng2-bootstrap';


import { SheetExcelComponent } from './componets/sheetExcel.component';
import { FormComponent } from './componets/popup-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SheetExcelComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FormsModule,
    routing,
    Ng2BootstrapModule,
    ModalModule.forRoot(),
    DropdownModule.forRoot()
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

