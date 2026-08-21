import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import { Provider } from 'react-redux'
import { router } from './routes'
import { store } from './store'
import { StatusMessage } from './components/status-message'
import './styles/palette.css'

const root = document.getElementById('root')

ReactDOM.createRoot(root).render(
    <Provider store={store}>
        <Suspense fallback={<StatusMessage title="Loading…" />}>
            <RouterProvider router={router} />
        </Suspense>
    </Provider>
)
