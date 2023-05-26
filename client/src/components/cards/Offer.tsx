import Assets from '../../Assets.tsx';

function Offer() {
  return (
    <div className="w-56 p-2 flex flex-col gap-2 bg-white rounded-md text-primary_dark">
      <img src="https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="!!" className="w-60 rounded-md" />
      <div className="flex items-center justify-between">
        <div className="text-xl">Pendant</div>
        <button type="button"><img src={Assets.heart} alt="!" /></button>
      </div>
      <text className="text-sm text-tertiary_dark">Lorem ipsum dolor sit amet consectetur adipisicing elit...</text>
      <div className="text-2xl text-success font-semibold">₹250</div>
      <div className="text-tertiary_dark"><s>₹500</s></div>
      <div className="flex items-center justify-between">
        <button type="button" className="w-[70%] p-2 bg-primary flex justify-center gap-3">
          <img src={Assets.view} alt="!!" />
          <span className="text-primary_white font-bold">VIEW</span>
        </button>
        <button type="button"><img src={Assets.cart} alt="!!" className="h-8" /></button>
      </div>
    </div>
  );
}

export default Offer;
