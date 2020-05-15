import React from "react";
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { FormGroup, Button } from "@material-ui/core";

function AddDialog(props) {
    const [newCustomer, setNewCustomer] = React.useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: '',
        content: []
    });

    const editData = (event) => {
        if (props.dialogType === "new") {
            setNewCustomer({...newCustomer, [event.target.name] : event.target.value});
        } else {
            props.editCustomer(event);
        }
        
    }

    const saveData = () => {
        if (props.dialogType === "new") {
            fetch('https://customerrest.herokuapp.com/api/customers', {
                method: 'post',
                body: JSON.stringify(newCustomer),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.error(err));
            window.location.reload();
        } else {
            if (props.editingCustomer.links && props.editingCustomer.links[0]) {
                const link = props.editingCustomer.links[0].href;
                const id = link.replace("https://customerrest.herokuapp.com/api/customers/", "");
                fetch(`https://customerrest.herokuapp.com/api/customers/${id}`, {
                    method: 'put',
                    body: JSON.stringify(props.editingCustomer),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(err => console.error(err));
                window.location.reload();
            }
        }
    }


    const customerObj = props.dialogType === 'new' ? newCustomer : props.editingCustomer;

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <h3>{props.type === 'customer' ? 'Add/Edit Customer' : 'Add/Edit Training'}</h3>
            {props.type === 'customer' &&
            <FormControl>
                <FormGroup>
                    <TextField 
                        label="First Name"
                        name="firstname" 
                        value={customerObj.firstname} 
                        onChange={(e) => editData(e)}
                    />
                </FormGroup>
                <FormGroup>
                    <TextField 
                        name="lastname" 
                        value={customerObj.lastname} 
                        onChange={(e) => editData(e)}
                        label="Last name"
                    />
                </FormGroup>
                <FormGroup>
                    <TextField 
                        name="streetaddress" 
                        value={customerObj.streetaddress} 
                        onChange={(e) => editData(e)}
                        label="Street address"
                    />
                </FormGroup>
                <FormGroup>
                    <TextField 
                        name="postcode" 
                        value={customerObj.postcode} 
                        onChange={(e) => editData(e)}
                        label="Postcode"
                    />
                </FormGroup>
                <FormGroup>
                    <TextField 
                        name="city" 
                        value={customerObj.city}
                        onChange={(e) => editData(e)} 
                        label="City"
                    />
                </FormGroup>
                <FormGroup>
                    <TextField 
                        name="email" 
                        value={customerObj.email} 
                        onChange={(e) => editData(e)}
                        label="Email"
                    />
                </FormGroup>
                <FormGroup>
                    <TextField 
                        name="phone" 
                        value={customerObj.phone} 
                        onChange={(e) => editData(e)}
                        label="Phone"
                    />
                </FormGroup>
                <FormGroup>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => saveData()}
                    >
                        Save
                    </Button>
                </FormGroup>
            </FormControl>
            }
        </Dialog>
    )
}

export default AddDialog;