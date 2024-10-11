import Toggle from "@/components/toggle";
import Profile from "@/components/profile";

const Home = () => {
  return (
    <main>
      <div className="p-4">
        <div className="float-left">
          <Toggle />
        </div>
        <Profile />
      </div>
      <div>Home page</div>
    </main>
  );
};

export default Home;
