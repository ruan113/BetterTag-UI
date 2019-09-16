export class Photo {
    id: string;
    url: string;

    constructor(url: string, id?: string) {
        this.url = url;
        this.id = undefined;
        if (id) {
            this.id = id;
        }
    }
}
