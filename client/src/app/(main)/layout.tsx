
import Sidebar from "@/components/custom/sidebar";
import Container from "../../components/custom/container";
import HeaderComponent from "../../components/custom/header";


export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex w-full">
            <Sidebar />
            <main className="flex flex-col w-full mx-auto">
                <HeaderComponent />
                <Container>
                    {children}
                </Container>
            </main>
        </div>
    );
}