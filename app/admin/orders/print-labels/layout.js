export const metadata = {
  title: 'Print Shipping Labels',
};

export default function PrintLayout({ children }) {
  return (
    <div className="bg-white min-h-screen text-black">
      {children}
    </div>
  );
}
