import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'properties'
})
export class PropertiesPipe implements PipeTransform {

    transform(value: {}): string[] {
        console.log('here');
        console.log(value);
        if (!value) {
            return [];
        }

        console.log(Object.keys(value));

        return Object.keys(value);
    }
}