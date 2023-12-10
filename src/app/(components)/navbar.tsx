import "../globals.css"
export default function Navbar(props: any) {
  return (
    <div className="w-[600px] h-[100px] flex items-center">
      <input placeholder="Search" className="w-[250px] h-[35px] bg-primary_white px-5 mx-10 focus:outline-none box-shadow" name="hello"/>
      <button className=" w-10 h-10">
        <img src="chat_icon.svg" alt="chat" />
      </button>
      <button className=" w-10 h-10 mx-10">
        <img src="Bell.svg" alt="notifications" />
      </button>
    </div>
  );
}
