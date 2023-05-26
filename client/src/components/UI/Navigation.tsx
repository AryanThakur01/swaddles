import Assets from '../../Assets.tsx';

function Navigation() {
  return (
    <div className="fixed z-10 top-0 md:top-3 w-full bg-secondary_white bg-opacity-85 p-2 flex justify-between items-center text-xl md:mx-[15%] md:w-[70%] md:rounded-md">
      <button type="button" className="text-4xl font-extrabold">
        <img src={Assets.user} alt="AT" className="h-9 p-1 bg-primary_white rounded-full" />
      </button>
      <div className="tracking-widest">SWADDLES</div>
      <div className="flex items-center gap-3">
        <button type="button" className="text-4xl font-extrabold">
          <img src={Assets.search} alt="AT" className="h-8 p-1" />
        </button>
        <button type="button" className="text-4xl font-extrabold">=</button>
      </div>
    </div>
  );
}

export default Navigation;