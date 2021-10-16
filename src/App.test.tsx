import { render, screen, fireEvent } from '@testing-library/react'
import { Posts } from './components/Posts'

test('Check Favorites Render', async () => {
  render(<Posts />)
  
  fireEvent.click(screen.getByText('Favorites'))
  const element = screen.getByTestId('favorites-component')
  expect(element).toBeInTheDocument();
})

test('Check All Render', async () => {
  render(<Posts />)

  fireEvent.click(screen.getByText('All'))
  const element = screen.getByTestId('all-component')
  expect(element).toBeInTheDocument();
})