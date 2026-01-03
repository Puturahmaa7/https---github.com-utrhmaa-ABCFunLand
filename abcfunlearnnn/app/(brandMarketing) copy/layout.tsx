import { Header } from "./header"; // kalau Header pakai default export
import Footer from "./footer"; // ✔ default export Footer

type Props = {
  children: React.ReactNode;
};

const marketingLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};
export default marketingLayout;
