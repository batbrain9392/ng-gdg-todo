import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JokeService {
  constructor(private http: HttpClient) {}

  getJoke() {
    return this.http.get('https://api.chucknorris.io/jokes/random').pipe(
      map((obj: any) => {
        const newValue = `Joke: ${obj.value}`;
        return newValue;
      })
    );
  }
}
