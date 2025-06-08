import Navbar from './Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[url('/album-cover.png')] bg-[length:500%] md:bg-[length:210%] lg:bg-[length:160%] xl:bg-[length:140%] bg-[center_top_20%] bg-no-repeat text-white font-lexend flex flex-col lg:justify-center">
            <Navbar />
            {children}
        </div>
    );
};
