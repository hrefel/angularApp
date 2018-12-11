import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { from } from 'rxjs';

import { AppComponent } from './app.component';
// component
import { ListUserComponent } from './user/list-user/list-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import * as mat from '@angular/material';
import { routes } from './path/path-routing.module';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
// service API
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserSvcService } from './user/services/user-svc.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '../../node_modules/@angular/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const ioConfig: SocketIoConfig = { url: 'http://localhost:4200', options: {} }

registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    DashboardComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    FormsModule, ReactiveFormsModule, SocketIoModule.forRoot(ioConfig)
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    //imports angular material
    mat.MatOptionModule, mat.MatCheckboxModule, mat.MatCheckboxModule, mat.MatButtonModule,
    mat.MatInputModule, mat.MatAutocompleteModule, mat.MatDatepickerModule, mat.MatFormFieldModule, mat.MatRadioModule,
    mat.MatSelectModule, mat.MatSliderModule, mat.MatSlideToggleModule, mat.MatMenuModule, mat.MatSidenavModule,
    mat.MatToolbarModule, mat.MatListModule, mat.MatGridListModule, mat.MatCardModule, mat.MatStepperModule,
    mat.MatTabsModule, mat.MatExpansionModule, mat.MatButtonToggleModule, mat.MatChipsModule, mat.MatIconModule,
    mat.MatProgressSpinnerModule, mat.MatProgressBarModule, mat.MatDialogModule, mat.MatTooltipModule,
    mat.MatSnackBarModule, mat.MatTableModule, mat.MatSortModule, mat.MatPaginatorModule,
    HttpClientModule,
    HttpModule,
    NgZorroAntdModule
  ],
  providers: [ UserSvcService,
    {
      provide: NZ_I18N, useValue: en_US
    }
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
