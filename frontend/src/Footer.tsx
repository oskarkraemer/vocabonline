export function Footer() {
    return (
        <footer className="m-4 sticky top-[100vh]">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-muted-foreground sm:text-center">© {new Date().getFullYear()} <a href="https://flowbite.com/" className="hover:underline">Oskar Krämer</a>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-muted-foreground sm:mt-0">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">About</a>
                </li>
            </ul>
            </div>
        </footer>

    )
}
