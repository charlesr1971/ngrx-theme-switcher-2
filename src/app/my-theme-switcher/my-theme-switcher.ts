import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { changeTheme } from '../themeSwitcher.actions';

@Component({
  selector: 'app-my-theme-switcher',
  templateUrl: './my-theme-switcher.component.html',
  styleUrls: ['./my-theme-switcher.component.css'],
})
export class MyThemeSwitcherComponent {
  themeSwitch$: Observable<number>;

  constructor(private store: Store<{ themeSwitch: number }>) {
    this.themeSwitch$ = store.select('themeSwitch');
  }

  changeTheme() {
    this.store.dispatch(changeTheme());
  }

}