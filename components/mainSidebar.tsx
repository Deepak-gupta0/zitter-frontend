import { Search } from "lucide-react";
import Footer from "./Footer";
import WhatsHappening from "./WhatsHappening";
import WhoToFollow from "./WhoToFollow";

const MainSidebar = () => {
  return (
    <div className="h-full w-full flex flex-col p-3 gap-3">

      {/* //Search btn */}
      <div className="w-full outline outline-gray-200/50 rounded-3xl flex">
        <button className="p-2">
          <Search height={17} width={17} className="text-gray-400"/>
        </button>
        <input type="text" className="py-2 w-full outline-none px-2" />
      </div>

      <div>
        <WhatsHappening />
      </div>

      <div>
        <WhoToFollow />
      </div>
      <div>
        <WhoToFollow />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default MainSidebar;
