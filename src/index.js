import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import { Provider } from 'react-redux'
import { router } from './routes'
import { store } from './store'
import './styles/palette.css'

const root = document.getElementById('root')

ReactDOM.createRoot(root).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)
