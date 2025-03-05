import DashHeader from "../common/dash-header";
import Footer from "../common/footer";

interface Props {
		children?: React.ReactNode;
}

const DashLayout: React.FC<Props> = ({ children }) => {
		return (
      <div>
        <DashHeader />
        <div className="pt-[100px] max-w-6xl mx-auto">{children}</div>
        <Footer />
      </div>
    );
};

export default DashLayout;
