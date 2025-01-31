import Link from 'next/link'
import Head from 'next/head'
import ThemeContext from '@/context/theme'
import Script from 'next/script'
import { useEffect, useState } from 'react'

const Layout = ({ publication, children }) => {
	const [darkToggle, setDarkToggle] = useState(false)
	if (publication.theme.colorMode === 'DARK' && typeof document !== 'undefined') document.body.classList.add('dark')

	useEffect(() => {
		if (darkToggle) {
			document.body.classList.add('dark')
		} else {
			document.body.classList.remove('dark')
		}
	}, [darkToggle])

	return (
		<>
			<Head>
				<title>{publication.displayName || 'Dharma Essays'}</title>
				<meta name="og:title" content={publication.displayName || 'Dharma Essays'} />
				{publication.description && (
					<>
						<meta name="description" content={publication.description} />
						<meta name="og:description" content={publication.description} />
					</>
				)}
				<link rel="icon" href="/logo.ico" />
				<meta name="twitter:card" content="summary" />
				<meta name="og:image" content="/logo.png" />
				<meta name="twitter:image" content="/logo.png" />
				<link rel="alternate" type="application/rss+xml" title={publication.displayName || 'Dharma Essays'} href="/feed.xml" />
			</Head>
			<Script src="https://www.googletagmanager.com/gtag/js?id=G-LR58DS1T5K" />
			<Script id="google-analytics">
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-LR58DS1T5K');
        `}
			</Script>
			<ThemeContext.Provider value={{ theme: publication.theme.colorMode === 'DARK' ? 'dark' : 'light', accentColor: publication.theme.accent.toLowerCase() }}>
				<div className={publication.theme.colorMode === 'DARK' ? 'dark' : ''}>
					<div className="dark:bg-gray-900 min-h-screen pb-20">
						<header className="p-4 flex justify-between items-center" style={{ width: '100%' }}>
							<Link href="/">
								<a className="flex items-center space-x-4">
									<div>
										<div className="flex items-center space-x-2">
											<p className="black dark:text-gray-200 pb-0.5 text-xl">Dharma Essays</p>
										</div>
									</div>
								</a>
							</Link>
							<div className="flex items-center">
								<label className="toggleDarkBtn mr-4">
									<input type="checkbox" onClick={() => setDarkToggle(!darkToggle)} />
									<span className="slideBtnTg round"></span>
								</label>
								<button className="bg-emerald-400 dark:bg-emerald-800 text-white font-bold py-2 px-4 rounded" onClick={() => (window.location.href = 'https://mirror.xyz/potham.eth')}>
									Mirror
								</button>
							</div>
						</header>

						<main>{children}</main>
					</div>
				</div>
			</ThemeContext.Provider>
		</>
	)
}

export default Layout
