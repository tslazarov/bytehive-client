
export class FileManagerHelper {

    constructor() {
    }

    downLoadFileUrl(data: any, type: string): string {
        let blob = new Blob([data], { type: type });
        let url = window.URL.createObjectURL(blob);

        return url;
    }
}