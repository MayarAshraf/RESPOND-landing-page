import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CustomPageTitleStrategy extends TitleStrategy {
  #title = inject(Title);

  // override the TitleStrategy to define a prefix for pages titles.
  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    if (title) {
      this.#title.setTitle(`8X RESPOND | ${title}`);
    } else {
      this.#title.setTitle('8X RESPOND');
    }
  }
}
