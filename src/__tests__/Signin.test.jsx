import { render, screen,fireEvent, waitFor } from '@testing-library/react';
import Signin from '../pages/Sign/Signin';
import { BrowserRouter } from 'react-router-dom';
import Router from '../router/Router';

describe('Signin',() => {

    test('Signin should render', async()=> {
        render(<BrowserRouter><Signin /></BrowserRouter>);
    })

    test('All buttons should render', async()=> {
        render(<BrowserRouter><Signin /></BrowserRouter>);
        const buttonList = await screen.findAllByRole("button");
        expect(buttonList).toHaveLength(3);   
    })

    test('Signin Form contains 2 textField',()=> {
        render(<BrowserRouter><Signin /></BrowserRouter>);
        const TextField = screen.getAllByTestId("textfield");
        expect(TextField).toHaveLength(2);   
    })
    
    test('It should validate email input',()=> {
        render(<BrowserRouter><Signin /></BrowserRouter>);
        const emailTextField = screen.getByLabelText('Enter Email');
        const loginbtn = screen.getByTestId('loginbtn');
        expect(emailTextField).toBeInTheDocument();

        fireEvent.change(emailTextField, { target: { value: 'invalid-email' } });
        fireEvent.click(loginbtn);
        // Check if error message is displayed
        const emailError = screen.getByText("Please Enter valid Email");
        expect(emailError).toBeInTheDocument();
    })

    test('It should validate password input',()=> {
        render(<Router />);
        const login = screen.getByLabelText('Enter Email')
        // const password = screen.getByLabelText('Enter your Password');
        const loginbtn = screen.getByTestId('loginbtn');
        expect(login).toBeInTheDocument();
        // expect(password).toBeInTheDocument();
        expect(loginbtn).toBeInTheDocument();
        fireEvent.change(login, { target: { value: 'example@gmail.com' } });
        // fireEvent.change(password, { target: { value: 'Sachin@21' } });
        fireEvent.click(loginbtn);
        // Check if error message is displayed      
        const passError = screen.getByText('Incorrect Password')
        expect(passError).toBeInTheDocument();
    })

    test('We get response from server after submitting',async() => {
        

        // let response = await signIn(data);
        await waitFor(() => {
            console.log(window.location.pathname)
            expect(window.location.pathname).toBe('/dashboard');
        });
    })
})