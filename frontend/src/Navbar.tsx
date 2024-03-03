export function Navbar() {
    return (
        <nav className="sticky top-0 py-4 px-4 xl:px-16 container flex justify-start items-center backdrop-blur-md z-10">
            <a href="/" className="hover:text-foreground/80 flex items-center">
                
                <svg className="mr-2" width="26" height="26" viewBox="0 0 154 152" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="76.5" cy="76" rx="75.5" ry="73" fill="black"/>
                    <ellipse cx="75.4486" cy="76.0633" rx="64.4486" ry="62.0633" fill="white"/>
                    <ellipse cx="75.4486" cy="76.0633" rx="43.3563" ry="41.7517" fill="black"/>
                    <circle cx="61.5" cy="79.7303" r="53" stroke="black" strokeWidth="11"/>
                </svg>

                <h1 className="text-lg font-semibold tracking-wide inline">vokabeλ</h1>
            </a>
            
            <a href="/import" className="m-0 ml-8 text-foreground/60 hover:text-foreground/80">Import PDF</a>
        </nav>
    )
}
  