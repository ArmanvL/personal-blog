import React, {
	useState,
	useEffect
} from "react"
import { Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"

import Checkbox from './checkbox'

const Layout = ({ location, title, children }) => {
	const rootPath = `${__PATH_PREFIX__}/`
	let header
	
	// Initialise dark mode for the application
	const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
	const [ darkModeEnabled, setDarkModeEnabled ] = useState(
		(localStorage.getItem('darkModeEnabled') !== null && localStorage.getItem('darkModeEnabled') === 'true') ||
		( prefersDarkScheme.matches ? true : false )
	)

	useEffect(() => {
		localStorage.setItem('darkModeEnabled', darkModeEnabled);
	}, [ darkModeEnabled ])

	if (location.pathname === rootPath) {
		header = (
			<div style = {{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center'
			}}>
				<h1 style = {{
					...scale(1.1),
					marginBottom: rhythm(1.5),
					marginTop: 0,
				}}>
					<Link style = {{
						boxShadow: `none`,
						color: `inherit`,
					}} to = {`/`}>
						{title}
					</Link>
				</h1>
				<Checkbox styles={{
					marginTop: '0',
					marginBottom: 'auto'
				}} handler={ setDarkModeEnabled } value={ darkModeEnabled }></Checkbox>
			</div>
		)
	} else {
		header = (
			<div style = {{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center'
			}}>
				<h3 style = {{
					fontFamily: `Montserrat, sans-serif`,
					marginTop: 0,
				}}>
					<Link style = {{
						boxShadow: `none`,
						color: `inherit`,
					}} to = {`/`} >
						{ title }
					</Link>
				</h3>
				<Checkbox styles={{
					marginTop: '0',
					marginBottom: 'auto'
				}} handler={ setDarkModeEnabled } value={ darkModeEnabled }></Checkbox>
			</div>
		)
	}

	return (
		<div style={{
			width: '100%',
			height: '100%',
			// backgroundColor: darkModeEnabled ? 'rgba(44,47,51)' : '#FFFFFF',
			// color: darkModeEnabled ? 'rgba(256, 256, 256, 87%)' : 'rgba(0, 0, 0, 87%)',
			overflowY: 'scroll'
		}} className={ darkModeEnabled ? 'dark' : 'light' }>
			<div style = {{
				marginLeft: `auto`,
				marginRight: `auto`,
				maxWidth: rhythm(24),
				padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
				height: '100%'
			}} >
				<header > { header } </header>
				<main > { children } </main>
				<footer >
					©{ new Date().getFullYear() }, Built with {` `} <a href = "https://www.gatsbyjs.org" > Gatsby </a>
				</footer>
			</div>
		</div>
	)
}

export default Layout