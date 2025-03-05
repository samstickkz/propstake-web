import Navbar from "../common/header"
import Footer from "../common/footer";

interface Props {
  children?: React.ReactNode;
}

const PageLayout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="">{children}</div>
      <Footer />
    </div>
  );
};

export default PageLayout;
