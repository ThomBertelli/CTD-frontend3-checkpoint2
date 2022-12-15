import { render, screen, waitFor, cleanup, fireEvent, getByTestId } from '@testing-library/react';
import { ThemeProvider } from '../hooks/useTheme';
import { AuthProvider } from '../hooks/useAuth';
import App from '../App';
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Card from '../Components/Card';
import { Simulate } from 'react-dom/test-utils';
import DetailCard  from '../Components/DetailCard';
import LoginForm  from '../Components/LoginForm';


const mockData = {
    matricula: '555',
    nome: 'nometeste',
    sobrenome: 'sobrenometeste',
    usuario: {
        username: 'usernameteste'
    }
}

const mockTheme = 'dark'

afterEach(cleanup)
it('Test header and footer render', () => {
    render(<App />);


    expect(screen.getByRole("banner")).toHaveTextContent(/DH Odonto/)

    expect(screen.getByRole('contentinfo')).toHaveTextContent(/Voltar para o topo/)


});




it('Test render dentists cards', async () => {

    const { getByText } = render(

        <MemoryRouter initialEntries={['/home']} >
            <ThemeProvider value={mockTheme}>
                <Card data={mockData} />
            </ThemeProvider>
        </MemoryRouter>)


    expect(screen.getByText(/nometeste/i))

}

)

it('Test card details route', async () => {


    const { getByText } = render(
        <MemoryRouter  >
            <ThemeProvider value={mockTheme}>
                <AuthProvider>
                    <Routes>
                        <Route path={'/'} element={<DetailCard />} />
                    </Routes>
                </AuthProvider>
            </ThemeProvider>
        </MemoryRouter>
    );

    
    expect(getByText('Marcar consulta')).toBeInTheDocument()



})

it('Test login route', async () => {


    const { getByText} = render(
        <MemoryRouter  >
            <ThemeProvider value={mockTheme}>
                <AuthProvider>
                    <Routes>
                        <Route path={'/'} element={<LoginForm />} />
                    </Routes>
                </AuthProvider>
            </ThemeProvider>
        </MemoryRouter>
    );

    
    expect(getByText('Send')).toBeInTheDocument()



})

it('Test dark/light theme  button', async () => {

    const { container } = render(
        <App />

    )
    const div = getByTestId(container, 'layout')

    expect(div).not.toHaveClass('dark')


    fireEvent.click(container.querySelector('.btn'))

    expect(div).toHaveClass('dark')

})

