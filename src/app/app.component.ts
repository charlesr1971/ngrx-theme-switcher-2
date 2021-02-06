import { ChangeDetectorRef, Component, OnDestroy, HostBinding } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  debug = false;
  title = 'ngrx-counter';

  cssClassName: string = '';
  themeObj = {};
  theme: string = 'theme-1-dark';
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

  constructor(public overlayContainer: OverlayContainer,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) { 

    this.themeObj = this.createTheme(this.theme);
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

  public createTheme(theme: string): any {
    theme = theme.toString() === '0' ? '' : theme;
    const result = {
      default: 'theme-1-dark',
      id: 1,
      stem: 'theme-1',
      light: 'theme-1-light',
      dark: 'theme-1-dark'
    };
    if(this.debug) {
      console.log('http.service: createTheme(): theme ',theme);
    }
    if(theme !== '') {
      result['default'] = theme;
      const themeArray = theme.split('-');
      if(Array.isArray(themeArray) && themeArray.length === 3){
        result['id'] = parseInt(themeArray[1]);
        themeArray.pop();
        const _theme = themeArray.join('-');
        result['stem'] = _theme;
        result['light'] = _theme + '-light';
        result['dark'] = _theme + '-dark';
      }
    }
    if(this.debug) {
      console.log('http.service: createTheme(): result ',result);
    }
    return result;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));


}
