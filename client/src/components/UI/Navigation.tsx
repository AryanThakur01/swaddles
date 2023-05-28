import { useState } from 'react';
import Assets from '../../Assets.tsx';

function Navigation() {
  const [menu, setMenu] = useState(0);

  return (
    <>
      <div className="fixed z-40 top-0 md:top-3 w-full bg-secondary_white bg-opacity-90 backdrop-blur-3xl p-2 flex justify-between items-center text-xl md:mx-[15%] md:w-[70%] md:rounded-md">
        {/* PROFILE */}
        <button type="button" className="text-4xl font-extrabold">
          <img src={Assets.user} alt="AT" className="h-9 p-1 bg-primary_white rounded-full" />
        </button>

        {/* LOGO */}
        <div className="tracking-widest">SWADDLES</div>
        <div className="flex items-center gap-3">

          {/* SEARCH */}
          <button type="button" className="text-4xl font-extrabold">
            <img src={Assets.search} alt="AT" className="h-8 p-1" />
          </button>

          {/* HAMBURGER */}
          <button type="button" className="text-4xl font-extrabold" onClick={() => setMenu(1)}>=</button>
        </div>
      </div>

      {/* NAVIGATION MENU */}
      {menu
        ? (
          <>
            <div className="fixed inset-0 z-50 h-full w-full bg-black bg-opacity-60 text-secondary_dark backdrop-blur-sm" />
            <div className="fixed inset-0 z-50 min-h-[500px] md:h-[98%] md:w-[70%] m-auto bg-secondary_white md:rounded-md flex flex-col">
              <button type="button" className="w-10 self-end m-2 p-2 border-2 rounded-md" onClick={() => setMenu(0)}>X</button>
              <div className="flex flex-col gap-2 mx-auto justify-between h-full text-2xl my-10">
                <div className="flex flex-col">
                  <button type="button" className="text-left p-1 my-2 rounded-sm w-52">-- Home</button>
                  <button type="button" className="text-left p-1 my-2 rounded-sm w-52">-- About</button>
                  <button type="button" className="text-left p-1 my-2 rounded-sm w-52">-- Contact</button>
                </div>
                <div className="flex flex-col">
                  <button type="button" className="text-left p-1 my-2 rounded-sm w-52 bg-tertiary_white">-- Login</button>
                  <button type="button" className="text-left p-1 my-2 rounded-sm w-52 bg-tertiary_white">-- SignUp</button>
                </div>
              </div>
            </div>
          </>
        )
        : (
          <>
          </>
        )}
    </>
  );
}

export default Navigation;
