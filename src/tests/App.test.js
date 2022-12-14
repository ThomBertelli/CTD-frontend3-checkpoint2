import { getByRole, render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from '../hooks/useTheme';
import App from '../App';

import {MemoryRouter} from "react-router-dom";
import Card from '../Components/Card';

import { Simulate } from 'react-dom/test-utils';
import DetailCard from '../Components/DetailCard';

const mockData = {
    matricula: '555',
    nome: 'nometeste',
    sobrenome: 'sobrenometeste',
    usuario: {
        username: 'usernameteste'
    }
}

const mockTheme = 'dark'

const token = localStorage.getItem('token')

it('Test header and footer render', () => {
    render(<App />);


    expect(screen.getByRole("banner")).toHaveTextContent(/DH Odonto/)

    expect(screen.getByRole('contentinfo')).toHaveTextContent(/Voltar para o topo/)


});

it('Test dark mode on NavBar', () => {
    render(<App />)


    const element = screen.getByRole('banner')
    const styles = getComputedStyle(element)

    if (token === 'dark') {
        expect(styles.backgroundColor).toBe('#12121296')
    }
})

it('Test dark mode on Footer', () => {
    render(<App />)

    const element = screen.getByTestId('footer')
    const styles = getComputedStyle(element)

    if (token === 'dark') {
        expect(styles.backgroundColor).toBe('#12121296')
    }
})

it('Test dark mode on cards', () => {
    render(<App />)

    const element = document.querySelector('.card-body')
    const styles = getComputedStyle(element)

    if (token === 'dark') {
        expect(styles.backgroundColor).toBe('#31313196')
    }
})

it('Test dark mode on modal', () => {
    render(<App />)

    const element = document.querySelector('.text-center')
    const styles = getComputedStyle(element)

    if (token === 'dark') {
        expect(styles.backgroundColor).toBe('#31313196')
    }
})

it('Test render dentists cards', async () => {



    const { getByText } = render(

        <MemoryRouter initialEntries={['/home']} >
            <ThemeProvider value={mockTheme}>
                <Card data={mockData} />
            </ThemeProvider>
        </MemoryRouter>)

    await waitFor(() => getByText(/nometeste/i))

}

)

it('Test link to card details', async () => {



    const { getByText } = render(
        <MemoryRouter  >
            <ThemeProvider value={mockTheme}>
                <Card data={mockData} />
            </ThemeProvider>
        </MemoryRouter>
    );



    await waitFor(() => getByText(/nometeste sobrenometeste/));

    const link = screen.getByText(/nometeste sobrenometeste/)

    Simulate.click(link)


    setTimeout(() => {
        expect(screen.getByText('Marcar consulta')).toBeInTheDocument()

    }, 2000)

})

it('Test if the schedule modal is rendered after click on Marcar consulta button', async () => {


    const { getByText } = render(
        <MemoryRouter>
            <ThemeProvider value={mockTheme}>
                <Card data={mockData} />
            </ThemeProvider>
        </MemoryRouter>
    )

    await waitFor(() => getByText(/nometeste sobrenometeste/));

    const link = screen.getByText(/nometeste sobrenometeste/)

    Simulate.click(link)

    setTimeout(() => {


        waitFor(() => getByText(/Detail about Dentist nometeste/));

        const link2 = screen.getByRole('button')

        Simulate.click(link2)

        setTimeout(() => {
            expect(screen.getByText('Schedule')).toBeInTheDocument()

        }, 2000)
    }, 2000)




})