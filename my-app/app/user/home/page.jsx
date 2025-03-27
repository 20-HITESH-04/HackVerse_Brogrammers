import { Navbar } from '../../../Components/layout/user/Navbar';
import { Sidebar } from '../../../Components/layout/user/Sidebar';
import { MyInsurances } from '../../../components/dashboard/MyInsurances';
import { AvailableInsurances } from '../../../components/dashboard/AvailableInsurances';

export default function UserHomePage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex">
                <Sidebar />
                <main className="md:ml-64 mt-16 p-6 w-full">
                    <MyInsurances />
                    <AvailableInsurances />
                </main>
            </div>
        </div>
    );
}