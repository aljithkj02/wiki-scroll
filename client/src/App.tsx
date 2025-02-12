import { CssBaseline } from '@mui/material'
import AppTheme from './components/shared-theme/AppTheme'
import AppAppBar from './components/common/AppAppBar'
// import Latest from './components/blog/components/Latest'
// import MainContent from './components/blog/components/MainContent'
// import Footer from './components/common/Footer'
import { WikiSummary } from './pages/WikiSummary'

function App(props: { disableCustomTheme?: boolean }) {

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />

            <AppAppBar />

            <WikiSummary />
            {/* <Container
                maxWidth="lg"
                component="main"
                sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
            >
                <MainContent />
                <Latest />
            </Container> */}
            {/* <Footer /> */}
        </AppTheme>
    )
}

export default App
