import { render, screen } from '@testing-library/react';
import App from '../App';
import LoginForm from '../Components/LoginForm';
import ScheduleFormModal from '../Components/ScheduleFormModal';

const token = localStorage.getItem('token')

it('Test header and footer render', () => {
    render(<App />);

    
    expect(screen.getByRole("banner")).toHaveTextContent(/DH Odonto/)

    expect(screen.getByRole('contentinfo')).toHaveTextContent(/Voltar para o topo/)


});

it('Test dark mode on NavBar', () =>{
    render(<App />)

    
    const element = screen.getByRole('banner')
    const styles = getComputedStyle(element)

    if(token === 'dark'){
        expect(styles.backgroundColor).toBe('#12121296')
    }
})

it('Test dark mode on Footer', () =>{
    render(<App />)

    const element = screen.getByTestId('footer')
    const styles = getComputedStyle(element)

    if(token === 'dark'){
        expect(styles.backgroundColor).toBe('#12121296')
    }
})

it('Test dark mode on cards', () =>{
    render(<App />)

    const element = document.querySelector('.card-body')
    const styles = getComputedStyle(element)

    if(token === 'dark'){
        expect(styles.backgroundColor).toBe('#31313196')
    }
})

it('Test dark mode on modal', () =>{
    render(<App/>)

    const element = document.querySelector('.text-center')
    const styles = getComputedStyle(element)

    if(token === 'dark'){
        expect()
    }
})