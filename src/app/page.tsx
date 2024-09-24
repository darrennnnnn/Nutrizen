import Dashboard from "@/components/Dashboard";
import Menubar from "@/components/Menubar";

export default function Home() {
    return (
        <div className="h-screen flex flex-col">
            <Dashboard />
            <Menubar />
        </div>
    );
}
