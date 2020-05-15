import React from "react";
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
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
    });
    const [editingCustomer, setEditingCustomer] = React.useState({});

    const editData = (event) => {
        console.log(event.target.value);
        setNewCustomer({...newCustomer, [event.target.name] : event.target.value});
    }


    const customerObj = props.dialogType === 'new' ? newCustomer : editingCustomer;

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <h3>{props.type === 'customer' ? 'Add/Edit Customer' : 'Add/Edit Training'}</h3>
            {props.type === 'customer' &&
            <FormControl>
                <FormGroup>
                    <Input 
                        id="firstname-input"
                        name="firstname" 
                        value={customerObj.firstname} 
                        onChange={(e) => editData(e)}
                        placeholder="First name"
                    />
                </FormGroup>
                <FormGroup>
                    <Input 
                        id="lastname-input" 
                        name="lastname" 
                        value={customerObj.lastname} 
                        onChange={(e) => editData(e)}
                        placeholder="Last name"
                    />
                </FormGroup>
                <FormGroup>
                    <Input 
                        id="streetaddress-input" 
                        name="streetaddress" 
                        value={customerObj.streetaddress} 
                        onChange={(e) => editData(e)}
                        placeholder="Street address"
                    />
                </FormGroup>
                <FormGroup>
                    <Input 
                        id="postcode-input" 
                        name="postcode" 
                        value={customerObj.postcode} 
                        onChange={(e) => editData(e)}
                        placeholder="Postcode"
                    />
                </FormGroup>
                <FormGroup>
                    <Input 
                        id="city-input" 
                        name="city" 
                        value={customerObj.city}
                        onChange={(e) => editData(e)} 
                        placeholder="City"
                    />
                </FormGroup>
                <FormGroup>
                    <Input 
                        id="email-input" 
                        name="email" 
                        value={customerObj.email} 
                        onChange={(e) => editData(e)}
                        placeholder="Email"
                    />
                </FormGroup>
                <FormGroup>
                    <Input 
                        id="phone-input" 
                        name="phone" 
                        value={customerObj.phone} 
                        onChange={(e) => editData(e)}
                        placeholder="Phone"
                    />
                </FormGroup>
                <FormGroup>
                    <Button
                        color="primary"
                        variant="contained"
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