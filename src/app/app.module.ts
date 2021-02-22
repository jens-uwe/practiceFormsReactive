import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { DivViewDirective } from './div-view.directive';
import { ScaleLabelDirective } from './scale-label.directive';

@NgModule({
  declarations: [
    AppComponent,
    DivViewDirective,
    ScaleLabelDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
