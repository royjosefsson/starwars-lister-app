import { SITE_DOMAIN_NAME } from "@/data/site-settings"

const Footer = () => {
    return (
        <footer className="footer">
            Copyright &copy; {new Date().getFullYear()} {SITE_DOMAIN_NAME}
        </footer>
    )
}

export default Footer
