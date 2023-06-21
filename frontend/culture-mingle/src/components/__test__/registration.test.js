import Registration from "../Registration";
import React from "react";
import { BrowserRouter, Routes, RenderResult, MemoryRouter } from "react-router-dom";
import { render, fireEvent, waitFor, screen, act } from "@testing-library/react"
import axios from "axios";
let container = null;
let wrapper2 = RenderResult;

jest.mock('axios')

// beforeEach(() => {
//     container = document.createElement("div");
//     document.body.appendChild(container);
//     //wrapper2 = render(<BrowserRouter><Registration /></BrowserRouter>, container);
// });

// afterEach(() => {
//     // cleanup on exiting
//     ReactDOM.unmountComponentAtNode(container);
//     container.remove();
//     container = null;
// });

describe('registration test', () => {
    it('should render Registration component', () => {
        render(<BrowserRouter><Registration /></BrowserRouter>)
        expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Date of birth/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    it('renders the component without errors', () => {
        render(<BrowserRouter><Registration /></BrowserRouter>);
        const nameLabel = screen.getByLabelText('Name');
        const emailLabel = screen.getByLabelText('E-mail');
        const passwordLabel = screen.getByLabelText('Password');
        const confirmPasswordLabel = screen.getByLabelText('Confirm Password');
        const birthdayLabel = screen.getByLabelText('Date of birth');
        const genderLabel = screen.getByLabelText('Gender');
        expect(nameLabel).toBeInTheDocument();
        expect(emailLabel).toBeInTheDocument();
        expect(passwordLabel).toBeInTheDocument();
        expect(confirmPasswordLabel).toBeInTheDocument();
        expect(birthdayLabel).toBeInTheDocument();
        expect(genderLabel).toBeInTheDocument();
    });

    // it('validates name input', () => {
    //     act(() => {
    //         render(<BrowserRouter><Registration /></BrowserRouter>);
    //         const nameInput = screen.getByTestId('name');
    //         fireEvent.change(nameInput, { target: { value: 'a' } });
    //         fireEvent.blur(nameInput);
    //     });
    //     //const nameError = screen.getByText(/username/i);
    //     //expect(nameError).toBeInTheDocument();
    //     act(() => {
    //         fireEvent.change(nameInput, { target: { value: 'a'.repeat(21) } });
    //         fireEvent.blur(nameInput);
    //     });
    //     //const nameError2 = screen.getByText(/username should be at most 20 characters in length/i);
    //     //(nameError2).toBeInTheDocument();
    // });

    it('should submit form with valid data', async () => {
        axios.post.mockResolvedValueOnce({ data: { message: 'Successfully registered!' } });

        render(<BrowserRouter><Registration /></BrowserRouter>);

        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: 'johndoe@example.com' } });
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText(/Date of birth/i), { target: { value: '1990-01-01' } });
        fireEvent.change(screen.getByLabelText(/Gender/i), { target: { value: 'male' } });
        fireEvent.click(screen.getByTestId('submit'));
        //expect(await screen.findByText(/Successfully/i)).toBeInTheDocument();
    });

    it('should show error message if form submission fails', async () => {

        render(<BrowserRouter><Registration /></BrowserRouter>);
        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: 'johndoe@example.com' } });
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText(/Date of birth/i), { target: { value: '1990-01-01' } });
        fireEvent.change(screen.getByLabelText(/Gender/i), { target: { value: 'male' } });
        // Mock axios.post and submit form
        const mockAxios = jest.spyOn(axios, 'post');
        mockAxios.mockRejectedValueOnce({ data: { message: 'Something went wrong.' } });
        fireEvent.click(screen.getByTestId('submit'));

        //expect(mockAxios).toHaveBeenCalled();
        //expect(await screen.findByText(/Something/i)).toBeInTheDocument();
    });


    test('submitting the form with valid data calls the API and navigates to login page', async () => {
        const navigate = jest.fn();
        jest.spyOn(React, 'useState').mockImplementation((initialState) => [initialState, jest.fn()]);

        render(<BrowserRouter><Registration navigate={navigate} /></BrowserRouter>);
        const name = screen.getByLabelText('Name');
        const email = screen.getByLabelText('E-mail');
        const password = screen.getByLabelText('Password');
        const confirm = screen.getByLabelText('Confirm Password');
        const birthday = screen.getByLabelText('Date of birth');
        const gender = screen.getByLabelText('Gender');
        const submitButton = screen.getByRole('button', { name: /submit/i });

        const mockResponse = {
            data: {
                message: 'Registration successful',
            },
            status: 200,
        };
        axios.post.mockResolvedValueOnce(mockResponse);

        fireEvent.change(name, { target: { value: 'testuser' } });
        fireEvent.change(email, { target: { value: 'testuser@test.com' } });
        fireEvent.change(password, { target: { value: 'password123' } });
        fireEvent.change(confirm, { target: { value: 'password123' } });
        fireEvent.change(birthday, { target: { value: '1990-01-01' } });
        fireEvent.change(gender, { target: { value: 'male' } });
        fireEvent.click(submitButton);

        expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/api/auth/signup', {
            username: 'testuser',
            email: 'testuser@test.com',
            password: 'password123',
            gender: 'male',
        });

        await screen.findByText('Registration successful');
        expect(navigate).toHaveBeenCalledWith('/login', { replace: true });
    });
})

window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
};