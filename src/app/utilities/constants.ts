export class Constants {
    static readonly LANGUAGE_KEY = 'bh_language';

    // regular expressions
    static readonly URL_REGEX = '(https?://)([\\da-z.-]+)\\.([a-z.]{2,6})[\?\\da-zA-Z.-\=\-\&\_]*';
    static readonly URL_REGEX_PAGING = '(https?://)([\\da-z.-]+)\\.([a-z.]{2,6})[\?\\da-zA-Z.-\=\-\&\_]*(\{\{page\}\}{1})[\?\\da-zA-Z.-\=\-\&\_]*';
    static readonly PAGING_REGEX = '{{page}}';

    static readonly ACCOUNT_SERVICE_BASE_ENDPOINT = 'api/account/';
    static readonly ACCOUNT_SERVICE_SIGNUP_ENDPOINT = 'api/account/signup';
    static readonly ACCOUNT_SERVICE_SIGNIN_ENDPOINT = 'api/account/signin';
    static readonly ACCOUNT_SERVICE_SIGNIN_EXTERNAL_ENDPOINT = 'api/account/signinExternal';
    static readonly ACCOUNT_SERVICE_SIGNOUT_ENDPOINT = 'api/account/signout';
    static readonly ACCOUNT_SERVICE_REFRESH_TOKEN_ENDPOINT = 'api/account/refreshtoken';
    static readonly ACCOUNT_SERVICE_RESET_CODE_ENDPOINT = 'api/account/resetcode';
    static readonly ACCOUNT_SERVICE_RESET_PASSWORD_ENDPOINT = 'api/account/resetpassword';
    static readonly ACCOUNT_SERVICE_CHANGE_PASSWORD_ENDPOINT = 'api/account/changepassword';

    static readonly USER_SERVICE_BASE_ENDPOINT = 'api/users/';
    static readonly USER_SERVICE_ALL_ENDPOINT = 'api/users/all';
    static readonly USER_SERVICE_DETAIL_ENDPOINT = 'api/users/detail';
    static readonly USER_SERVICE_DELETE_ENDPOINT = 'api/users/delete';

    static readonly SCRAPER_SERVICE_BASE_ENDPOINT = 'api/scraper';
    static readonly SCRAPER_SERVICE_MARKUP_ENDPOINT = 'api/scraper/markup';
    static readonly SCRAPER_SERVICE_VISUAL_ENDPOINT = 'api/scraper/visual';
    static readonly SCRAPER_SERVICE_AUTOMATIC_ENDPOINT = 'api/scraper/automatic';
    static readonly SCRAPER_SERVICE_CODE_ENDPOINT = 'api/scraper/code';
    static readonly SCRAPER_SERVICE_VALIDATE_LIST_ENDPOINT = 'api/scraper/validatelist';
    static readonly SCRAPER_SERVICE_VALIDATE_DETAIL_ENDPOINT = 'api/scraper/validatedetail';

    static readonly SCRAPE_REQUEST_SERVICE_BASE_ENDPOINT = 'api/scraperequests';
    static readonly SCRAPE_REQUEST_SERVICE_CREATE_ENDPOINT = 'api/scraperequests/create';
}