import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-all-heroes',
  templateUrl: './all-heroes.component.html',
  styleUrls: ['./all-heroes.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AllHeroesComponent {
  showInfo = false;
  recentSearches: string[] = sessionStorage.getItem('searches')?.split(',') || [];
  currentLetter: string = 'a';
  form: FormGroup = this.formBuilder.group(
    { searchInput: ['', [Validators.required]],
       },
    );

  constructor(
    public heroService: HeroesService,
    private formBuilder: FormBuilder,
    private changeDetection: ChangeDetectorRef
    ) {}

  private search(): void {
    this.addRecentSearch(this.form.value.searchInput);

    if (this.form.invalid) {
      return;
    }

    this.heroService.loadHeroes(this.form.value.searchInput, this.changeDetection);
  }

  searchByEnter(event: KeyboardEvent) {
    if (event.code !== 'Enter') {
      return;
    }
    this.search();
    console.log(this.heroService.heroes)
  }

  addRecentSearch(query: string): void {
    if (this.recentSearches.includes(query)) {
      return;
    }

    this.recentSearches.unshift(query);

    if (this.recentSearches.length === 6) this.recentSearches.pop();

    sessionStorage.setItem('searches', this.recentSearches.join(','));
    this.changeDetection.markForCheck();
  }
}
