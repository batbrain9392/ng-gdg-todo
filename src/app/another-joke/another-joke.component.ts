import { Component, OnInit } from '@angular/core';
import { JokeService } from '../joke.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-another-joke',
  templateUrl: './another-joke.component.html',
  styleUrls: ['./another-joke.component.scss']
})
export class AnotherJokeComponent implements OnInit {
  joke$: Observable<string>;

  constructor(private jokeService: JokeService) {}

  ngOnInit() {
    this.joke$ = this.jokeService.getJoke();
  }
}
