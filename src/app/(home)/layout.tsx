import SubNavbar from "../components/SubNavbar";

export default function DapurPagesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <SubNavbar />
            <div className="page-with-subnavbar">{children}</div>
        </>
    );
}
