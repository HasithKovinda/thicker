import Link from "next/link";
import styles from  './NavBar.module.css'

export default function NavBar() {
  return (
    <nav className={`${styles.nav} section-center`}>
        <div>
            <img src="/logo.svg"  alt="logo"/>
        </div>
        <ul>
            <li>
            <Link href='/'>Home</Link>
            </li>
            <li>
            <Link href='/'>About</Link>
            </li>
            <li>
            <Link href='/'>Contact</Link>
            </li>
            <li>
            <Link href='/'>Login</Link>
            </li>
            <li>
            <Link href='/'>SignUp</Link>
            </li>
        </ul>
    </nav>
  )
}


