import { ChangeDetectorRef, Component, OnDestroy, HostBinding, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MediaMatcher } from '@angular/cdk/layout';
import { createTheme } from './util/createTheme';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { readTheme } from './util/readTheme';
import { materialThemeData } from './util/data';
import { changeTheme } from './themeSwitcher.actions';
import { MaterialThemeDataService } from './services/material-theme-data.service';

export interface Theme {
  id: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  debug = false;
  title = 'ngrx-counter';

  cssClassName: string = '';
  themeObj = {};
  theme: any = {
    themeName:'theme-2',
    colorName:'$mat-red',
    primaryIndex:'500',
    primaryHex:'#F44336'
  };
  @HostBinding('class') componentCssClass;

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 5}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  themeSwitch$: Observable<number>;

  constructor(
    public overlayContainer: OverlayContainer,
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    private http: HttpClient,
    private MaterialThemeDataService: MaterialThemeDataService,
    private store: Store<{ themeSwitch: number }>
    ) { 

    this.themeSwitch$ = store.select('themeSwitch');

    this.themeObj = createTheme(this.theme);
    this.theme = this.themeObj['default'];

    if(this.debug) {
      console.log('app.component: this.theme: ',this.theme);
    }

    this.overlayContainer.getContainerElement().classList.add(this.theme);
    this.componentCssClass = this.theme;

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnInit() {
    this.store.select('themeSwitch').subscribe( ( id ) => {
      //if(this.debug) {
        console.log('app.component: ngOnInit: id: ',id,' this.MaterialThemeDataService.materialThemes: ',this.MaterialThemeDataService.materialThemes);
      //}
      const materialTheme = readTheme( this.MaterialThemeDataService.materialThemes, id );
      //if(this.debug) {
        console.log('app.component: ngOnInit: materialTheme: ',materialTheme);
      //}
      const theme = materialTheme['default'];
      this.overlayContainer.getContainerElement().classList.add(theme);
      this.componentCssClass = theme;
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));


}
