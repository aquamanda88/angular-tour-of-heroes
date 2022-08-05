import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Hero } from '../model/hero.model';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] | null = [];

  selectedHero?: Hero;

  form: FormGroup = this.fb.group({
    heroName: this.fb.control('', { validators: [] }),
  });

  constructor(private heroService: HeroService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  formSubmit(){
    const name = this.form.value.heroName;
    // name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        if(this.heroes){
          this.heroes.push(hero);
        }
      });
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  delete(hero: Hero): void {
    if(this.heroes){
      this.heroes = this.heroes.filter(h => h !== hero);
    }
    this.heroService.deleteHero(hero.id).subscribe();
  }

}
