import { render, screen,fireEvent,waitFor } from '@testing-library/react';
import Signup from '../pages/Sign/Signup';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { signUp } from '../services/userFunction';

jest.mock('axios');

describe('Signup',() => {

    test('Signup should render', async()=> {
        render(<BrowserRouter><Signup /></BrowserRouter>);
    })

    test('All buttons should render', async()=> {
        render(<BrowserRouter><Signup /></BrowserRouter>);
        const buttonList = await screen.findAllByRole("button");
        expect(buttonList).toHaveLength(2);   
    })

    test('Signup Form contains 5 textField',()=> {
        render(<BrowserRouter><Signup /></BrowserRouter>);
        const TextField = screen.getAllByTestId("textfield");
        expect(TextField).toHaveLength(5);   
    })
    
    test('It should validate fistname input',()=> {
        render(<BrowserRouter><Signup /></BrowserRouter>);
        const firstname = screen.getByLabelText('First name');
        const submitbtn = screen.getByTestId('submitbtn');
        expect(firstname).toBeInTheDocument();

        fireEvent.change(firstname, { target: { value: '' } });
        fireEvent.click(submitbtn);
        // Check if error message is displayed
        const firstNameError = screen.getByText("First name must Start with a capital letter and must be minimum length of 3");
        expect(firstNameError).toBeInTheDocument();
    })

    test('It should validate lastname input',()=> {
        render(<BrowserRouter><Signup /></BrowserRouter>);
        const firstname = screen.getByLabelText('First name');
        const lastname = screen.getByLabelText('Last name');
        const submitbtn = screen.getByTestId('submitbtn');
        expect(lastname).toBeInTheDocument();
        fireEvent.change(firstname, { target: { value: 'Sachin' } });
        fireEvent.change(lastname, { target: { value: '' } });
        fireEvent.click(submitbtn);
        // Check if error message is displayed
        const lastNameError = screen.getByText("Last name must start with a capital letter and must be minimum length of 3");
        expect(lastNameError).toBeInTheDocument();
    })

    test('It should validate username input',()=> {
        render(<BrowserRouter><Signup /></BrowserRouter>);
        const firstname = screen.getByLabelText('First name');
        const lastname = screen.getByLabelText('Last name');
        const username = screen.getByLabelText('Username');
        const submitbtn = screen.getByTestId('submitbtn');
        expect(username).toBeInTheDocument();
        fireEvent.change(firstname, { target: { value: 'Sachin' } });
        fireEvent.change(lastname, { target: { value: 'Kaythamwar' } });
        fireEvent.change(username, { target: { value: '' } });
        fireEvent.click(submitbtn);
        // Check if error message is displayed
        const usernameError = screen.getByText("Enter Valid Email");
        expect(usernameError).toBeInTheDocument();
    })

    test('It should validate password input',()=> {
        render(<BrowserRouter><Signup /></BrowserRouter>);
        const firstname = screen.getByLabelText('First name');
        const lastname = screen.getByLabelText('Last name');
        const username = screen.getByLabelText('Username');
        const password = screen.getByLabelText('Password');
        const submitbtn = screen.getByTestId('submitbtn');
        expect(lastname).toBeInTheDocument();
        fireEvent.change(firstname, { target: { value: 'Sachin' } });
        fireEvent.change(lastname, { target: { value: 'Kaythamwar' } });
        fireEvent.change(username, { target: { value: 'sachinkaythamwar@gmail.com' } });
        fireEvent.change(password, { target: { value: 'adwadaa' } });
        fireEvent.click(submitbtn);
        // Check if error message is displayed
        const passwordError = screen.getByText("The Password must contain atleast 8 characters,One UppercaseLetter,One LowercaseLetter,One number and Special Character");
        expect(passwordError).toBeInTheDocument();
    })


    test('It should validate confirm password input',()=> {
        render(<BrowserRouter><Signup /></BrowserRouter>);
        const firstname = screen.getByLabelText('First name');
        const lastname = screen.getByLabelText('Last name');
        const username = screen.getByLabelText('Username');
        const password = screen.getByLabelText('Password');
        const confirmPassword = screen.getByLabelText('Confirm');
        const submitbtn = screen.getByTestId('submitbtn');
        expect(confirmPassword).toBeInTheDocument();
        fireEvent.change(firstname, { target: { value: 'Sachin' } });
        fireEvent.change(lastname, { target: { value: 'Kaythamwar' } });
        fireEvent.change(username, { target: { value: 'sachinkaythamwar@gmail.com' } });
        fireEvent.change(password, { target: { value: 'AnyThing@12' } });
        fireEvent.change(confirmPassword, { target: { value: '' } });
        fireEvent.click(submitbtn);
        // Check if error message is displayed
        const passwordError = screen.getByText("Password does not match");
        expect(passwordError).toBeInTheDocument();
    })

    test('We get response from server after submitting',async() => {
        render(<BrowserRouter><Signup /></BrowserRouter>)
        let data = {
            firstName:'Sachin',
            lastName:'Kaythamwar',
            service:'advance',
            email:'example@gmail.com',
            password:'Dummygum@12'
        }

        const mockResponse = {
            status: 200,
        };
        axios.post.mockResolvedValue(mockResponse);
        const response = await signUp(data);
        await expect(response).toEqual(mockResponse);
    })

})