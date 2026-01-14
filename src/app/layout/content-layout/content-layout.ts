import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-content-layout',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './content-layout.html',
  styles: [],
})
export default class ContentLayout {}
