export class Filter {
    onlyShow: {
        showImages: boolean;
        showGifs: boolean;
        showVideos: boolean;
    };
    modes: {
      fullScreen: boolean,
      underAgedMode: boolean
    };

    constructor() {
      this.onlyShow = {
        showImages: true,
        showGifs: true,
        showVideos: true,
      };
      this.modes = {
        fullScreen: false,
        underAgedMode: false
      };
    }
}
