import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RbUiComponentsModule } from '@inst-iot/bosch-angular-ui-components';
import { HeaderComponent } from './common/header/header.component';
import { ErrorComponent } from './common/error/error.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WinAuth } from './common/interceptors/win-auth';
import { HighchartsChartModule } from 'highcharts-angular';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModule } from './modules/user/user.module';
import { AppRoutingModule } from './app-routing.module';
import { FormularioCovid19Component } from './formulario-covid19/formulario-covid19.component';
import { environment } from '../environments/environment'
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
    FormularioCovid19Component,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RbUiComponentsModule,
    HighchartsChartModule,
    UserModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,ReactiveFormsModule, FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WinAuth,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
