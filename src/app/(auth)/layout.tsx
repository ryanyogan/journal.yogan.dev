export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-neutral-100 flex-col justify-center items-center w-full h-screen">
      {children}
    </div>
  );
}
