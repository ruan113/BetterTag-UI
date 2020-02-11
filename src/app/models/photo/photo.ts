export enum Tipos {
  JPG = 'Jpg',
  PNG = 'Png',
  VIDEO = 'Video',
  GIF = 'Gif',
}

export class Photo {
    id: string;
    url: string;
    type: Tipos;
    needIframe: boolean;

    constructor(url: string, id?: string, tipo?: Tipos) {
        this.url = url;
        this.id = undefined;
        if (id) {
            this.id = id;
        }
        this.type = tipo;
    }
}
