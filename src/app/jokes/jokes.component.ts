import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JokeService } from '../joke.service';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.scss']
})
export class JokesComponent implements OnInit {
  joke$: Observable<string>;
  abc = 'abc';

  constructor(private jokeService: JokeService) {}

  ngOnInit() {
    this.joke$ = this.jokeService.getJoke();
  }
}
