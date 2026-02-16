import { useFeedStore } from "@/store/useFeedStore";

const MainNavbar = () => {
  const { setActiveTab, activeTab } = useFeedStore();
  console.log(activeTab)
  const handleForYouTab = () => {
    if (activeTab === "forYou") return;

    return setActiveTab("forYou");
  };

  const handleFollowingTab = () => {
    if (activeTab === "following") return;

    return setActiveTab("following");
  };

  return (
    <nav className="w-full inline-flex">
      <div
        onClick={handleForYouTab}
        className="hover:bg-gray-600/20 py-3 w-1/2 text-center cursor-pointer "
      >
        <span>For you</span>
      </div>
      <div
        onClick={handleFollowingTab}
        className="hover:bg-gray-600/20 py-3 w-1/2 text-center cursor-pointer"
      >
        <span>Following</span>
      </div>
    </nav>
  );
};

export default MainNavbar;
