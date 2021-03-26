import { Component, OnInit, OnDestroy, Input, Inject, ElementRef, Renderer2, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from "rxjs/operators";
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Store } from '@ngrx/store';
import * as CreateGuestbookActions from '../createGuestbook.actions';
import * as ReadGuestbookActions from '../readGuestbook.actions';

import { CustomTextDirective } from '../directives/custom-text/custom-text.directive';

import { Guestbook } from './guestbook.model';
import { HttpService } from '../services/http.service';
import { UtilsService } from '../services/utils.service';
import { environment } from '../../environments/environment';

declare var TweenMax: any, Elastic: any, Linear: any;

@Component({
  selector: 'app-my-guestbook',
  templateUrl: './my-guestbook.component.html',
  styleUrls: ['./my-guestbook.component.css']
})
export class MyGuestbookComponent implements OnInit, OnDestroy {

  @ViewChild(CustomTextDirective, {static: false}) customTextDirective;

  debug: boolean = false;

  formData = {};
  guestbookForm: FormGroup;
  guestbookTitleInput: FormControl;
  guestbookContentInput: FormControl;
  minInputLength: number = 3;
  maxTitleInputLength: number = environment.maxTitleInputLength;
  maxContentInputLength: number = environment.maxContentInputLength;
  currentPage: number = 1;
  guestbooks: Array<Guestbook> = [];
  guestbookDate: string = '';
  guestbookContent: string = '';
  guestbookName: string = '';
  guestbookContentRotationMax: number = 0;

  createGuestbookSubscription: Subscription;
  readGuestbookSubscription: Subscription; 
  deleteGuestbookSubscription: Subscription;
  createGuestbook$: Observable<any>;
  readGuestbook$: Observable<any>;

  constructor(private httpService: HttpService,
    private utilsService: UtilsService,
    public matSnackBar: MatSnackBar,
    @Inject(DOCUMENT) private documentBody: Document,
    private el: ElementRef,
    private renderer: Renderer2,
    private store1: Store<{ createGuestbook: any }>,
    private store2: Store<{ readGuestbook: any }>) { 

      this.createGuestbook$ = store1.select('createGuestbook');
      this.readGuestbook$ = store2.select('readGuestbook');
      this.readGuestbook();

    }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.monitorFormValueChanges();
    this.store1.select('createGuestbook').subscribe( ( data ) => {
      if(this.debug) {
        console.log('MyGuestbookComponent.component: ngOnInit: store1.createGuestbook: data: ',data);
      }
      if(data){
        if('action' in data){
          const proceed = 'hasProfanity' in data['action'] && 'error' in data['action'] && 'guestbookid' in data['action'] && !isNaN(data['action']['guestbookid']) && data['action']['guestbookid'] > 0 && 'title' in data['action'] && 'content' in data['action'] && 'createdAt' in data['action'] ? true : false;
          if(proceed){
            this.processCreateGuestbook(data['action']);
          }
        }
      }
    });
    this.store2.select('readGuestbook').subscribe( ( data ) => {
      if(this.debug) {
        console.log('MyGuestbookComponent.component: ngOnInit: store2.readGuestbook: data: ',data);
      }
      if(data){
        if('action' in data){
          const proceed = 'guestbooks' in data['action'] && Array.isArray(data['action']['guestbooks']) && data['action']['guestbooks'].length ? true : false;
          if(proceed){
            this.processReadGuestbook(data['action']);
          }
        }
      }
    });
  }

  private createForm(): void {
    this.guestbookForm = new FormGroup({
      guestbookTitleInput: this.guestbookTitleInput,
      guestbookContentInput: this.guestbookContentInput
    });
  }

  private createFormControls(): void {
    this.guestbookTitleInput = new FormControl('', [
      Validators.required,
      Validators.minLength(this.minInputLength),
      Validators.maxLength(this.maxTitleInputLength)
    ]);
    this.guestbookContentInput = new FormControl('', [
      Validators.required,
      Validators.minLength(this.minInputLength),
      Validators.maxLength(this.maxContentInputLength)
    ]);
  }

  private monitorFormValueChanges(): void {
    if(this.guestbookForm) {
      this.guestbookTitleInput.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(title => {
        if(this.debug) {
          console.log('title: ',title);
        }
        this.formData['title'] = title;
      });
      this.guestbookContentInput.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(content => {
        if(this.debug) {
          console.log('content: ',content);
        }
        this.formData['content'] = content;
      });
    }
  }

  public createGuestbook(event: any, id: number = 0): void {
    if(this.debug) {
      console.log('MyGuestbookComponent.component: createGuestbook: this.formData["title"]: ',this.formData['title']);
      console.log('MyGuestbookComponent.component: createGuestbook: this.formData["content"]: ',this.formData['content']);
      console.log('MyGuestbookComponent.component: createGuestbook: id: ',id);
    }
    const data = {
      title: this.formData['title'],
      content: this.formData['content']
    }
    if(this.minInputLength < this.formData['content'].length) {
      //this.createGuestbookSubscription = this.httpService.createGuestbook(data).pipe( tap( this.processCreateGuestbook ) ).subscribe();
      this.store1.dispatch(CreateGuestbookActions.createGuestbook({title: this.formData['title'], content: this.formData['content']}));
    }
  }

  private readGuestbook(): void {
    if(this.debug) {
      console.log('MyGuestbookComponent.component: readGuestbook');
    }
    //this.readGuestbookSubscription = this.httpService.readGuestbook(this.currentPage,0).pipe( tap( this.processReadGuestbook ) ).subscribe();
    this.store2.dispatch(ReadGuestbookActions.readGuestbook({page: this.currentPage, guestbookid: 0}));
  }

  private processCreateGuestbook = (data: any) => {
    if(this.debug) {
      console.log('MyGuestbookComponent.component: processCreateGuestbook: data: ', data);
    }
    if(data) {
      if(!this.utilsService.isEmpty(data)) {
        if('hasProfanity' in data && !data['hasProfanity']) {
          if('error' in data && data['error'] === '' && 'guestbookid' in data && !isNaN(data['guestbookid']) && data['guestbookid'] > 0 && 'title' in data && 'content' in data && 'createdAt' in data) {
            const guestbook = new Guestbook({
              guestbookid: data['guestbookid'],
              title: data['title'],
              content: data['content'],
              createdAt: data['createdAt']
            });
            this.guestbooks.push(guestbook);
            this.sortGuestbooksByDate('desc');
            if(this.guestbooks.length > 0){
              const obj = this.guestbooks[0];
              this.guestbookDate = obj['createdAt'];
              this.guestbookContent = obj['content'];
              this.guestbookName = obj['title'];
              //this.buildGuestbookContent();
            }
            if(this.debug) {
              console.log('MyGuestbookComponent.component: processCreateGuestbook: this.guestbooks: ', this.guestbooks);
            }
            this.openSnackBar('Comment added successfully', 'Success');
          }
          else{
            this.openSnackBar('Comment could not be added', 'Error');
          }
        }
        else{
          this.openSnackBar('Comment could not be added', 'Error');
        }
      }
    }
  }

  private processReadGuestbook = (data: any) => {
    if(this.debug) {
      console.log('MyGuestbookComponent.component: processReadGuestbook: data: ', data);
    }
    if(data) {
      this.currentPage++;
      if(!this.utilsService.isEmpty(data) && 'guestbooks' in data && Array.isArray(data['guestbooks']) && data['guestbooks'].length) {
        this.guestbooks = [];
        data['guestbooks'].map( (item: any) => {
          const guestbook = new Guestbook({
            guestbookid: item['guestbookid'],
            title: item['title'],
            content: item['content'],
            createdAt: item['createdAt']
          });
          this.guestbooks.push(guestbook);
        });
        this.sortGuestbooksByDate('desc');
        if(this.guestbooks.length > 0){
          const obj = this.guestbooks[0];
          if(this.debug) {
            console.log('MyGuestbookComponent.component: processReadGuestbook: obj: ', obj);
          }
          this.guestbookDate = obj['createdAt'];
          this.guestbookContent = obj['content'];
          this.guestbookName = obj['title'];
          //this.buildGuestbookContent();
        }

        if(this.debug) {
          console.log('MyGuestbookComponent.component: processReadGuestbook: this.guestbooks: ', this.guestbooks);
        }
        if(this.debug) {
          console.log('MyGuestbookComponent.component: processReadGuestbook: this.sortGuestbooks: ', this.sortGuestbooks);
        }
      }
    }
  }

  private buildGuestbookContent(): void {

    const guestbookContentElement = this.documentBody.getElementById('guestbookContent');
    const guestbookContentSpanElement = this.documentBody.getElementById('guestbookContentSpan');

    const guestbookContentSpanElementArray = Array.prototype.slice.call(this.documentBody.querySelectorAll('.guestbookContentSpan'));

    if(guestbookContentSpanElement) {
      guestbookContentSpanElement.remove();
    }

    if(Array.isArray(guestbookContentSpanElementArray) && guestbookContentSpanElementArray.length) {
      guestbookContentSpanElementArray.map( (element) => {
        element.remove();
      });
    }

    const guestbookContent = this.guestbookContent;

    const guestbookContentArray = guestbookContent.split('');
    if(guestbookContentArray.length > 0) {
      for(var i = 0; i < guestbookContentArray.length; i++) {
        const span2 = this.renderer.createElement('span');
        this.renderer.setAttribute(span2,'class','guestbookContentSpan');
        if(this.guestbookContentRotationMax > 0) {
          this.renderer.setStyle(span2,'transform','rotate(' + this.getRandomInt(0,this.guestbookContentRotationMax)  + 'deg)');
        }
        const text2 = this.renderer.createText(guestbookContentArray[i]);
        this.renderer.appendChild(span2,text2);
        this.renderer.appendChild(guestbookContentElement,span2);
      }
    }

    TweenMax.staggerFromTo('.guestbookContent span', 1, {scale: 0, opacity:0, ease:Elastic.easeOut, delay: 0}, {scale: 1, opacity:1, ease:Elastic.easeOut, delay: 0}, 0.25);

  }

  private getRandomInt(min: number = 1000000, max: number = 9999999): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  sortGuestbooksByDate(sortOrder: string): void {
    this.guestbooks.sort(function(a, b) {
      const dateA: any = new Date(a.createdAt), dateB: any = new Date(b.createdAt);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }

  private sortGuestbooks(key: any, sortOrder: string ,sortType: string): void{
    this.guestbooks.sort(function(a,b){
      if(sortType.toLowerCase() == "text"){
        var a = a[key].toLowerCase();
        var b = b[key].toLowerCase();
        var c = 0;
        if (a > b) {
          c = 1;
        } 
        else if (a < b) {
          c = -1;
        }
        if(sortOrder.toLowerCase() == "asc"){
          return c;
        }
        else{
          return c * -1;
        }
      }
      else{
        const num1 = parseInt(a[key]);
        const num2 = parseInt(b[key]);
        if(sortOrder.toLowerCase() == "asc"){
          return num1 - num2;
        }
        else{
          return num2 - num1;
        }
      }
    });
  }

  private openSnackBar(message: string, action: string): void {
    const config = new MatSnackBarConfig();
    config.panelClass = action.toLowerCase() === 'error' ? ['custom-class-error'] : ['custom-class'];
    config.duration = 5000;
    this.matSnackBar.open(message, action, config);
  }

  resetCustomText(): void {
    this.customTextDirective.resetCustomText();
  }

  ngOnDestroy() {

    if (this.createGuestbookSubscription) {
      this.createGuestbookSubscription.unsubscribe();
    }

    if (this.readGuestbookSubscription) {
      this.readGuestbookSubscription.unsubscribe();
    }

    if (this.deleteGuestbookSubscription) {
      this.deleteGuestbookSubscription.unsubscribe();
    }

  }

}
