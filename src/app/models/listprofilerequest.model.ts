export class ListProfileRequest {
    id: string;
    creationDate: Date;
    downloadUrl: string;
    shareableDownloadUrl: string;
    fileName: string;
    contentType: string;
    entries: number;
    status: number;
    accessKey: string;
}