import { ToastContainer } from "react-toastify";

const ScreenWrapper = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="w-[95%]   lg:w-[80%] xl:w-[70%] mx-auto ">
      {children}
      <ToastContainer />
    </div>
  );
};

export default ScreenWrapper;
