import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ListUser } from '../../models/listuser.model';

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
export class UsersComponent implements OnInit {

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;

    displayedColumns: string[] = ['email', 'firstName', 'registrationDate', 'requests'];

    dataSource: MatTableDataSource<any>;
    providers: any[];
    users: ListUser[];

    searchValue: any = {};
    searchCondition: any = {};
    filterMethods = CONDITIONS_FUNCTIONS;

    constructor(private usersService: UsersService) { }

    ngOnInit() {
        this.fetchUsers();
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

                console.log(this.users);

                this.bindDataSource(this.users);
            });
    }

    bindDataSource(data: any) {
        this.dataSource = new MatTableDataSource<ListUser>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

}
