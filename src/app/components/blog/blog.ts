import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-blog',
  imports: [ButtonModule],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog {}
