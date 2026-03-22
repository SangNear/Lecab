import Container from "../components/container";
import HeaderComponent from "../components/header";


export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col ">
            <Container>
                <HeaderComponent />
                {children}
            </Container>
        </div>
    );
}