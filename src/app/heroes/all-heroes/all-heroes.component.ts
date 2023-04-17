import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-all-heroes',
  templateUrl: './all-heroes.component.html',
  styleUrls: ['./all-heroes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllHeroesComponent {
  mock =  {
    "id": "100",
    "name": "Black Flash",
    "powerstats": {
      "intelligence": "44",
      "strength": "10",
      "speed": "100",
      "durability": "80",
      "power": "100",
      "combat": "30"
    },
    "biography": {
      "full-name": "",
      "alter-egos": "No alter egos found.",
      "aliases": [
        "Barry Allen",
        "Flashback",
        "Slow Lightning",
        "Black Racer",
        "Death Flash",
        "God of Death"
      ],
      "place-of-birth": "-",
      "first-appearance": "Flash Vol 2 #138",
      "publisher": "DC Comics",
      "alignment": "neutral"
    },
    "appearance": {
      "gender": "Male",
      "race": "God \/ Eternal",
      "height": [
        "-",
        "0 cm"
      ],
      "weight": [
        "- lb",
        "0 kg"
      ],
      "eye-color": "-",
      "hair-color": "-"
    },
    "work": {
      "occupation": "-",
      "base": "-"
    },
    "connections": {
      "group-affiliation": "-",
      "relatives": "-"
    },
    "image": {
      "url": "https:\/\/www.superherodb.com\/pictures2\/portraits\/10\/100\/10831.jpg"
    }
  }


}
