import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Observable, Subscription } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ListUser } from '../../models/listuser.model';
import { Router } from '@angular/router';
import { TranslationService } from '../../services/utilities/translation.service';
import { CommunicationService } from '../../services/utilities/communication.service';
import { ConfirmationDialog, ConfirmationData } from '../../utilities/dialogs/confirmation/confirmation.dialog';

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
        private dialog: MatDialog,
        private usersService: UsersService,
        private translationService: TranslationService,
        private communicationService: CommunicationService) { }

    ngOnInit(): void {
        this.setLabelsMessages();

        this.languageChangeSubscription = this.communicationService.languageChangeEmitted.subscribe(() => {
            this.setLabelsMessages();
        });

        this.fetchUsers();
    }

    ngOnDestroy(): void {
        this.languageChangeSubscription.unsubscribe();
    }

    fetchUsers(): void {
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

    fetchProviders(): void {
        this.providers = ["All"];

        this.providers = this.providers.concat(this.users.map(u => u.provider).filter((value, index, self) => {
            return self.indexOf(value) === index;
        }));
    }

    bindDataSource(data: any): void {
        this.dataSource = new MatTableDataSource<ListUser>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    setLabelsMessages(): void {
        this.providersLabel = this.translationService.localizeValue('providersLabel', 'users', 'label');
        this.searchLabel = this.translationService.localizeValue('searchLabel', 'users', 'label');
        this.emailLabel = this.translationService.localizeValue('emailLabel', 'users', 'label');
        this.nameLabel = this.translationService.localizeValue('nameLabel', 'users', 'label');
        this.registrationDateLabel = this.translationService.localizeValue('registrationDateLabel', 'users', 'label');
        this.requestsLabel = this.translationService.localizeValue('requestsLabel', 'users', 'label');
        this.detailsLabel = this.translationService.localizeValue('detailsLabel', 'users', 'label');
        this.deleteLabel = this.translationService.localizeValue('deleteLabel', 'users', 'label');
    }

    providerChange(provider: any): void {
        let filteredUsers = provider.value == "All" ? this.users : this.users.filter(user => { return user.provider == provider.value });

        this.bindDataSource(filteredUsers);
    }

    setOrPredicate(): void {
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

    applyGlobalFilter(filterValue: string): void {
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

        let confirmationData = new ConfirmationData();
        confirmationData.message = this.translationService.localizeValue('confirmDeleteUserLabel', 'users', 'label');

        let dialogRef = this.dialog.open(ConfirmationDialog, { width: '40vw', minHeight: '200px', autoFocus: false, data: confirmationData });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.usersService.deleteUser(id)
                    .subscribe((result) => {
                        if (result) {
                            let deletedUserIndex = this.users.map(i => i.id).indexOf(id);

                            this.users.splice(deletedUserIndex, 1);
                            this.bindDataSource(this.users);
                        }
                    }, (error) => {
                        //TODO: Show error message;
                    });
            }
            console.log(result);
        });
    }

    navigate(route: string): void {
        this.router.navigate([route]);
    }
}
