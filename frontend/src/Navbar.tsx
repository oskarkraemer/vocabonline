export function Navbar() {
    return (
        <nav className="sticky top-0 p-2 py-3 px-4 xl:px-16 container flex justify-start items-center border-b">
            <a href="/" className="hover:text-foreground/80">
                <svg className="mr-2 mb-1 inline" width="23" height="23" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M26.594 5C29.0852 5 31.4798 5.41409 33.7126 6.17721C32.8433 6.89144 32.0615 7.70835 31.3859 8.60942C29.8551 8.21167 28.2492 8 26.594 8C17.8076 8 10.4143 13.964 8.24129 22.0645C7.1167 22.1723 6.03096 22.4132 5 22.7712C6.97174 12.6441 15.8902 5 26.594 5ZM17.9475 47.2358C20.6017 48.3714 23.5244 49 26.594 49C37.8194 49 47.0812 40.5926 48.4261 29.7311C47.4173 30.194 46.3439 30.5405 45.2233 30.7535C43.4809 39.4492 35.8024 46 26.594 46C24.4095 46 22.3111 45.6313 20.3576 44.9529C19.6477 45.8054 18.8384 46.5723 17.9475 47.2358Z" fill="white"/>
                </svg>

                <h1 className="text-lg font-semibold tracking-wide inline">vokabeλ</h1>
            </a>
            
            <a href="#" className="m-0 ml-8 text-foreground/60 hover:text-foreground/80">Test</a>
        </nav>
    )
}
  