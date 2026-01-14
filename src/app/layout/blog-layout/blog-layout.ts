import { Component } from '@angular/core';
import { BlogHeader } from '../../components/blog-header/blog-header';
import { Blog } from '../../components/blog/blog';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-blog-layout',
  imports: [BlogHeader, Blog, FooterComponent],
  templateUrl: './blog-layout.html',
  styleUrl: './blog-layout.scss',
})
export default class BlogLayout {}
