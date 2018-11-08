import { Pipe, PipeTransform } from '@angular/core';
import { from } from 'rxjs';

@Pipe({
    name: 'convertToSpaces'
})
export class ConvertToSpacesPipe implements  PipeTransform {
    transform(value: string, character: string): string {
        return value.replace(character, ' ');
    }
}