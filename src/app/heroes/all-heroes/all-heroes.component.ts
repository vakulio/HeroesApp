import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-all-heroes',
  templateUrl: './all-heroes.component.html',
  styleUrls: ['./all-heroes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllHeroesComponent implements OnInit {
  selected = ''
  ALPHABET = 'abcdefghijklmnopqrstuvxyz';
  recentSearches: string[] = sessionStorage.getItem('searches')?.split(',') || [];
  form: FormGroup = this.formBuilder.group(
    { searchInput: ['', [Validators.required]],
       },
    );

  constructor(
    public heroService: HeroesService,
    private formBuilder: FormBuilder,
    private changeDetection: ChangeDetectorRef
    ) {}

  ngOnInit(): void {
    this.heroService.loadHeroes("a", this.changeDetection);
  }

  private search(value:string): void {
    this.addRecentSearch(value);

    this.heroService.loadHeroes(value, this.changeDetection);
  }

  alphabetSearch(value: string) {
   if(!value) return;
   this.search(value);
  }

  searchByEnter(event: KeyboardEvent) {
    if (event.code !== 'Enter') {
      return;
    }
    this.search(this.form.value.searchInput);
  }

  inputOldSearch(value: string) {
    this.form.value.searchInput = value
    const input = document.querySelector('input') as HTMLInputElement;
    if (input) input.value = value;
    this.search(this.form.value.searchInput);
  }

  addRecentSearch(str: string): void {
    if (this.recentSearches.includes(str)) {
      return;
    }

    this.recentSearches.unshift(str);

    if (this.recentSearches.length === 6) this.recentSearches.pop();

    sessionStorage.setItem('searches', this.recentSearches.join(','));
    this.changeDetection.markForCheck();
  }
}
