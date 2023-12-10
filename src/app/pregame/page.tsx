import Stdbtn from "../(components)/button";

const Pregame = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Stdbtn name="RANDOM MATCH" link="/game" className="h-[500px]" />
      <Stdbtn name="INVITE FRIEND" link="/game" />
    </div>
  );
};

export default Pregame;
