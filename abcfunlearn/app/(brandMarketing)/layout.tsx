import Header from "./header";
import Footer from "./footer";

type Props = {
  children: React.ReactNode;
};

const marketingLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default marketingLayout;
