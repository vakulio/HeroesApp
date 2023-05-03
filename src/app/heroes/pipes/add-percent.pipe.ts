import { Pipe, PipeTransform } from '@angular/core';
import { PercentPipe  } from '@angular/common';


@Pipe({
  name: 'addPercent'
})
export class AddPercentPipe implements PipeTransform {

  constructor(
    private percent: PercentPipe
  ){}

  transform(value: string | null) {

    if(!value){
      return "0%";
    }

    const percent = +value / 100

    return this.percent.transform(percent);
  }

}

