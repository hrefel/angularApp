import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '../../../node_modules/@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isCollapsed: boolean = true;
  mobileQuery: MediaQueryList;
  singleMenuItem: any[];
  subMenuItem: any[];
  title: String = 'App';

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener)
  }


  ngOnInit() {
    // untuk meregister menu yg tidak memiliki child
    this.singleMenuItem = [
      
      { title: 'Dashboard', icon: 'home', actionLink: '/' },
    ]
    // untuk meregister menu yg memiliki child
    this.subMenuItem = [
      {
        title: 'Master', icon: 'appstore', subMenuTitle: [
          { tit: 'Master Gender', actionLink: "/master-gender" },
          { tit: 'Master User', actionLink: '/master-user' }
        ]
      },
      {
        title: 'Real-Time Data', icon: 'database', subMenuTitle: [
          { tit: 'Chat', actionLink: "/master-gender" },
        ]
      }
    ]

    // console.log(this.subMenuItem);
  }
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;

  }
}
