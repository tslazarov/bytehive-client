export class Constants {
    static readonly LANGUAGE_KEY = 'BYTEHIVE_LANGUAGE';

    // regular expressions
    static readonly URL_REGEX = '(https?://)([\\da-z.-]+)\\.([a-z.]{2,6})[\?\\da-z.-\=\&]*';
    static readonly URL_REGEX_PAGING = '(https?://)([\\da-z.-]+)\\.([a-z.]{2,6})[\?\\da-z.-\=\&]*(\{\{page\}\}{1})[\?\\da-z.-\=\&]*';
}