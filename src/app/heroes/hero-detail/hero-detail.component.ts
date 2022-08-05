import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../../model/hero.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from '../../services/hero.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero | null;

  constructor(private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location) { }

  ngOnInit(): void {
    this.getHero();
  }

  goBack(){
    this.location.back();
  }

  getHero(): void {
    //取得必要參數 observable
    this.route.paramMap.subscribe((param) => {
      const id = param.get('id');

      // 取 API
      this.heroService.getHeroes().subscribe((result) => {
        this.hero = result.find((d) => String(d.id) === id) ?? null;
      });
    });
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

}
