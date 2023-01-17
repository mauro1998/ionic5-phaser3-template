import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { Game } from '../core';

@Component({
  selector: 'app-home',
  template: `<ion-content [fullscreen]="true">
    <div #container></div>
  </ion-content>`,
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild('container') containerRef: ElementRef<HTMLDivElement>;
  private game: Game;
  private init$ = new Subject<HTMLDivElement>();

  get container(): HTMLDivElement {
    return this.containerRef?.nativeElement;
  }

  ngOnInit(): void {
    this.init$.subscribe((container) => {
      this.game = new Game({
        parent: container,
        width: 640,
        height: 480,
      });
    });
  }

  ngAfterViewInit(): void {
    this.init$.next(this.container);
  }
}
