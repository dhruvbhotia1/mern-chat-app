import React, {useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';


const Project = () => {

   const location = useLocation();

   const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);




    return (
        <main className={'h-screen w-screen flex'}>

        {/*    left section */}

            <section className={'left relative flex flex-col h-full min-w-80 bg-slate-400'}>

                <header className={'flex justify-end p-4 w-full bg-slate-200'}>
                    <button className={'p-2 rounded bg-slate-300 hover:bg-slate-400 transition-all duration-200'} onClick={() => setIsSidePanelOpen(!isSidePanelOpen) }>

                        <i className={'ri-group-fill'}></i>
                    </button>


                </header>

                <div className="conservation-area flex-grow flex flex-col ">
                    <div className="message-box flex-grow flex flex-col gap-2 " >

                        <div className={"incoming message flex flex-col bg-white rounded max-w-56 m-2" }>
                            <small className={'p-2'}>Example@gmail.com</small>
                            <p className={'text-sm p-2'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, aut? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, excepturi. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, illo.</p>
                        </div>

                        <div className={"outgoing ml-auto message flex flex-col bg-white rounded max-w-56 m-2" }>
                            <small className={'p-2'}>Example@gmail.com</small>
                            <p className={'text-sm p-2'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, aut? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, excepturi. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, illo.</p>
                        </div>

                    </div>

                    <div className={'inputField w-full flex '}>
                        <input className={'outline-none p-2 px-4 border-none'} type={'text'} placeholder={'Enter your message'} />

                        <button className={'flex-grow'}> <i className={'ri-send-plane-fill'}></i></button>
                    </div>
                </div>


                <div className={`sidePanel w-full h-1/2 bg-red-600 absolute top-0 ${isSidePanelOpen ? 'left-0' : 'left-[-100%]'} transition-all duration-300`}>

                    <header className={'flex justify-end p-2 px-3 bg-slate-300'}>

                        <button className={''} onClick={() => setIsSidePanelOpen(false)}>
                            <i className={'ri-close-fill'}></i>

                        </button>

                    </header>




                </div>
            </section>

        </main>
    );
};

export default Project;