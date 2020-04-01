import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Observable, Subscription } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ListUser } from '../../models/listuser.model';
import { Router } from '@angular/router';
import { TranslationService } from '../../services/utilities/translation.service';
import { CommunicationService } from '../../services/utilities/communication.service';

export const CONDITIONS_FUNCTIONS = {
    "contains": function (value, filteredValue) {
        if (value != null && filteredValue != null) {
            return value.toLowerCase().includes(filteredValue.toLowerCase());
        }

        return value.includes(filteredValue);
    }
};

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;

    displayedColumns: string[] = ['email', 'firstName', 'registrationDate', 'requests', 'action'];

    dataSource: MatTableDataSource<any>;
    providers: any[];
    users: ListUser[];

    searchValue: any = {};
    searchCondition: any = {};
    filterMethods = CONDITIONS_FUNCTIONS;

    // subscriptions
    languageChangeSubscription: Subscription;

    // labels
    providersLabel: string;
    searchLabel: string;
    emailLabel: string;
    nameLabel: string;
    registrationDateLabel: string;
    requestsLabel: string;
    detailsLabel: string;
    deleteLabel: string;

    constructor(private router: Router,
        private usersService: UsersService,
        private translationService: TranslationService,
        private communicationService: CommunicationService) { }

    ngOnInit() {
        this.setLabelsMessages();

        this.languageChangeSubscription = this.communicationService.languageChangeEmitted.subscribe(() => {
            this.setLabelsMessages();
        });

        this.fetchUsers();
    }

    ngOnDestroy() {
        this.languageChangeSubscription.unsubscribe();
    }

    fetchUsers() {
        this.users = [];
        this.usersService.getAll()
            .subscribe(result => {
                console.log(result);

                result.forEach(user => {
                    var listUser = user as ListUser;
                    this.users.push(listUser);
                });

                this.fetchProviders();

                this.bindDataSource(this.users);
            });
    }

    fetchProviders() {
        this.providers = ["All"];

        this.providers = this.providers.concat(this.users.map(u => u.provider).filter((value, index, self) => {
            return self.indexOf(value) === index;
        }));
    }

    bindDataSource(data: any) {
        this.dataSource = new MatTableDataSource<ListUser>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    setLabelsMessages() {
        this.providersLabel = this.translationService.localizeValue('providersLabel', 'users', 'label');
        this.searchLabel = this.translationService.localizeValue('searchLabel', 'users', 'label');
        this.emailLabel = this.translationService.localizeValue('emailLabel', 'users', 'label');
        this.nameLabel = this.translationService.localizeValue('nameLabel', 'users', 'label');
        this.registrationDateLabel = this.translationService.localizeValue('registrationDateLabel', 'users', 'label');
        this.requestsLabel = this.translationService.localizeValue('requestsLabel', 'users', 'label');
        this.detailsLabel = this.translationService.localizeValue('detailsLabel', 'users', 'label');
        this.deleteLabel = this.translationService.localizeValue('deleteLabel', 'users', 'label');
    }

    providerChange(provider: any) {
        let filteredUsers = provider.value == "All" ? this.users : this.users.filter(user => { return user.provider == provider.value });

        this.bindDataSource(filteredUsers);
    }

    setOrPredicate() {
        this.dataSource.filterPredicate = (c: ListUser, filter: any) => {
            let result = false;
            let keys = Object.keys(c);

            for (const key of keys) {
                let searchCondition = filter.conditions[key]; // get search filter method
                if (searchCondition && searchCondition !== 'none') {
                    if (filter.methods[searchCondition](c[key], filter.values[key]) === true) { // invoke search filter 
                        result = true // if one of the filters method not succeed the row will be remove from the filter result 
                        break;
                    }
                }
            }

            return result
        };
    }

    applyGlobalFilter(filterValue: string) {
        this.searchValue = {};
        this.searchCondition = {};

        this.setOrPredicate();

        this.searchValue = { "email": filterValue, "firstName": filterValue, "lastName": filterValue };
        this.searchCondition = { "email": "contains", "name": "contains", "car": "contains" };

        let searchFilter: any = {
            values: this.searchValue,
            conditions: this.searchCondition,
            methods: this.filterMethods
        }

        this.dataSource.filter = searchFilter;
    }

    delete(id: string): void {
        console.log(id);
    }

    navigate(route: string): void {
        this.router.navigate([route]);
    }
}
