
import Sidebar from "@/components/custom/sidebar";
import Container from "../../components/custom/container";
import HeaderComponent from "../../components/custom/header";
import BottomBar from "@/components/custom/bottomBar";


export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex w-full relative">
            <Sidebar />
            <main className="flex flex-col w-full mx-auto bg-background">
                <HeaderComponent />
                <Container>
                    {children}
                </Container>
            </main>
            <BottomBar />
        </div>
    );
}