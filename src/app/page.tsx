"use client";

const Home = () => {
  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <span className=" text-accent_red font-shadow md:text-[60px] xl:text-[100px] ">
        TRANSCENDENCE
      </span>
      <form method="get" action="http://localhost:3001/users/me">
        <button
          className="bg-accent_red w-[120px] h-[50px] m-10 hover:bg-accent_red_hover 
                          box-shadow md:w-[250px] md:h-[100px] xl:w-[400px] xl:h-[150px]"
        >
          <span className="text-[15px] text-primary_white font-shadow md:text-[30px] xl:text-[50px]">
            START
          </span>
        </button>
      </form>
    </div>
  );
};

export default Home;
