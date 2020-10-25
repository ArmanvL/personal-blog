import React, {
	useState,
	useEffect
} from "react"
import { Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import Checkbox from './checkbox'

const Layout = ({ location, title, children }) => {
	const data = useStaticQuery(graphql`
		query LayoutQuery {
			githubIcon: file(absolutePath: { regex: "/github-mark.png/" }) {
				childImageSharp {
					fixed(width: 32, height: 32) {
						...GatsbyImageSharpFixed
					}
				}
			}
			gatsbyIcon: file(absolutePath: { regex: "/gatsby-icon.png/" }) {
				childImageSharp {
					fixed(width: 32, height: 32) {
						...GatsbyImageSharpFixed
					}
				}
			}
		}
	`)

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
				<h1 className={ 'root' } style = {{
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
				<h3 className={ 'article' } style = {{
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
			overflowY: 'scroll'
		}} className={ darkModeEnabled ? 'dark' : '' }>
			<div style={{
				marginLeft: `auto`,
				marginRight: `auto`,
				maxWidth: rhythm(24),
				padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
				height: '100%'
			}} >
				<header > { header } </header>
				<main > { children } </main>
				<footer style={{
					display: 'flex',
					flexWrap: 'nowrap',
					justifyContent: 'center',
					alignItems: 'flex-start',
					marginTop: rhythm(2),
					marginBottom: rhythm(1)
				}}>
					<a style={{
						textDecoration: 'none !important',
						boxShadow: 'none'
					}} href='https://www.gatsbyjs.com/'
					target="_blank">
						<Image fixed={data.gatsbyIcon.childImageSharp.fixed}
							alt={'Gatsby icon'}
							style={{
								marginRight: '10px',
								marginLeft: '10px'
							}}/>
					</a>
					<a style={{
						textDecoration: 'none !important',
						boxShadow: 'none'
					}} href='https://github.com/ArmanvL'
					target="_blank">
						<Image fixed={data.githubIcon.childImageSharp.fixed}
							alt={'GitHub icon'}
							style={{
								marginRight: '10px',
								marginLeft: '10px'
							}}/>
					</a>
				</footer>
			</div>
		</div>
	)
}

export default Layout