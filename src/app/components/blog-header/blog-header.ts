import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-blog-header',
  imports: [RouterLink, ButtonModule],
  templateUrl: './blog-header.html',
  styleUrl: './blog-header.scss',
})
export class BlogHeader {}
