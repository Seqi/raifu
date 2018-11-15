import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

// Surpress Material UI warning
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true
