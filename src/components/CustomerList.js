import React from 'react';
import AddDialog from './AddDialog';
import Button from '@material-ui/core/Button';

import '../App.css';

function CustomerList() {
    const [customers, setCustomers] = React.useState([]);
    const [sort, setSort] = React.useState('lastname');
    const [query, setQuery] = React.useState('');
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogType, setDialogType] = React.useState("new");

    React.useEffect(() => {
        getCustomers();
    }, [])

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }
    
    const sortCustomers = () => {
        let returnedCustomers = [];
        if (customers.length === 0) {
            return returnedCustomers;
        } else {
            if (sort === 'lastname') {
                returnedCustomers = customers.sort((a,b) => (a.lastname > b.lastname) ? 1 : ((b.lastname > a.lastname) ? -1 : 0));
            }
            if (sort === 'address') {
                returnedCustomers = customers.sort((a,b) => (a.streetaddress > b.streetaddress) ? 1 : ((b.streetaddress > a.streetaddress) ? -1 : 0));
            }
            if (sort === 'email') {
                returnedCustomers = customers.sort((a,b) => (a.email > b.email) ? 1 : ((b.email > a.email) ? -1 : 0));
            }
            if (sort === 'phone') {
                returnedCustomers = customers.sort((a,b) => (a.phone > b.phone) ? 1 : ((b.phone > a.phone) ? -1 : 0));
            }
            return returnedCustomers;
        }
    }

    const searchFor = (customer) => {
        if (query.length === 0) {
            return true;
        }
        if (customer.firstname.toLowerCase().includes(query.toLowerCase())
        ||customer.lastname.toLowerCase().includes(query.toLowerCase())
        || customer.streetaddress.toLowerCase().includes(query.toLowerCase())
        || customer.postcode.toLowerCase().includes(query.toLowerCase())
        || customer.city.toLowerCase().includes(query.toLowerCase())
        || customer.email.toLowerCase().includes(query.toLowerCase())
        || customer.phone.toLowerCase().includes(query.toLowerCase())) {
            return true;
        }
        return false;
    }

    const openDialog = (type) => {
        if (type === "new") {
            setDialogType("new");
            setDialogOpen(true);
        } else {
            setDialogType("edit");
            setDialogOpen(true);
        }
    }

    return (
        <div className="customer-list">
            <h1>Customers</h1>
            <h3>Note: Click the headers to sort by them</h3>
            <div className="customer-list-filters">
                <input value={query} type="text" placeholder="Search" onChange={(e) => setQuery(e.target.value)} />
                {/** 
                <Button onClick={() => openDialog("new")} variant="contained">
                    Add Customer
                </Button>
                */}
            </div>
            <div className="customer-list-headers">
                <div onClick={() => setSort('lastname')}>Name</div>
                <div onClick={() => setSort('address')}>Address</div>
                <div onClick={() => setSort('email')}>Email</div>
                <div onClick={() => setSort('phone')}>Phone</div>
            </div>
            {sortCustomers().map((customer, index) => (
                searchFor(customer) &&
                <div className="customer-list-item" key={index}>
                    <div>{`${customer.firstname} ${customer.lastname}`}</div>
                    <div>{`${customer.streetaddress}, ${customer.postcode} ${customer.city}`}</div>
                    <div>{customer.email}</div>
                    <div>{customer.phone}</div>
                </div>
            ))}
            <AddDialog
                type="customer"
                open={dialogOpen}
                handleClose={() => setDialogOpen(false)}
                dialogType={dialogType}
            />
        </div>
    )
}

export default CustomerList;