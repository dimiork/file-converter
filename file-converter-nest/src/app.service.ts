import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  json2csv(json: string = '', delimeter: string = ','): string {
    const data = JSON.parse(json);
    const header = Object.keys(data[0]);

    const csv: string[] = data.map((line) => header.map((fieldName) =>
      line[fieldName]).join(delimeter),
    );

    return [ header.join(delimeter), ...csv ].join('\r\n');
  }

  csv2json(data: string, delimeter: string = ','): string {
    const [ title, ...values ] = data.split(/\r?\n/);
    const header = title.split(delimeter);

    return JSON.stringify(values.map((line: string): string[] => {
      return line.split(delimeter).reduce((container: any, value: string, index: number) => {
        container[header[index]] = value;
        return container;
      }, {});
    }));
  }
}
