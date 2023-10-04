import React from 'react'
import Avatar from '../../assets/avatar.svg';
import Input from '../../components/Input';

function Dashboard() {
    const contacts = [
        {
            id: 0,
            name: 'John',
            status: 'Available',
            img: Avatar
        },
        {
            id: 1,
            name: 'Mary',
            status: 'Available',
            img: Avatar
        },
        {
            id: 2,
            name: 'Alexander',
            status: 'Available',
            img: Avatar
        },
        {
            id: 3,
            name: 'Adam',
            status: 'Available',
            img: Avatar
        },
        {
            id: 4,
            name: 'Alex',
            status: 'Available',
            img: Avatar
        },
        {
            id: 5,
            name: 'Larry',
            status: 'Available',
            img: Avatar
        },
    ];
    return (
        <div className='w-screen flex'>
            <div className='w-[25%] h-screen bg-secondary '>
                <div className='flex  items-center my-6 mx-14'>
                    <div className='border border-primary p-[2px] rounded-full'><img src={Avatar} alt={Avatar} width={75} height={75} /></div>
                    <div className='ml-4'>
                        <h3 className='text-2xl'>ChatLog</h3>
                        <p>My Account</p>
                    </div>
                </div>
                <hr className='border-gray-300' />
                <div className='mx-14 mt-10'>
                    <div className='text-primary text-lg'>Message</div>
                    <div>
                        {
                            contacts.map(({ id, name, status, img }) => {
                                return (
                                    <div key={id} className='flex items-center py-6 border-b border-b-gray-300'>
                                        <div className='flex items-center'>
                                            <img src={img} alt={img} width={60} height={60} />
                                            <div className='ml-4'>
                                                <h3 className='text-lg font-semibold'>{name}</h3>
                                                <p className='text-sm font-light text-gray-500'>{status}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div className='w-[50%] h-screen bg-white flex flex-col items-center'>
                <div className='w-[75%] bg-secondary h-[80px] my-14 rounded-full flex items-center px-10'>
                    <div className='cursor-pointer'><img src={Avatar} alt={Avatar} width={60} height={60} /></div>
                    <div className='ml-6 mr-auto'>
                        <h3 className='text-lg'>Alexander</h3>
                        <p className='text-sm font-light text-gray-500'>Online</p>
                    </div>
                    <div className='cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone-outgoing" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                            <path d="M15 9l5 -5" />
                            <path d="M16 4l4 0l0 4" />
                        </svg>
                    </div>
                </div>
                <div className='h-[75%] w-full overflow-y-scroll shadow-md'>
                    <div className='p-10'>
                        <div className='max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-6'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                        <div className='max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                        <div className='max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-6'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                        <div className='max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                        <div className='max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-6'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                        <div className='max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                        <div className='max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-6'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                        <div className='max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                    </div>
                </div>
                <div className='p-10 w-full flex items-center'>
                    <Input type='text' name='msg' placeholder='Type a message...' classNames='w-[75%] p-4 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none mr-auto' value='' />
                    <div className='ml-4 p-2 cursor-pointer bg-light rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-send" width={30} height={30} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M10 14l11 -11" />
                            <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                        </svg>
                    </div>
                    <div className='ml-4 p-2 cursor-pointer bg-light rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-plus" width={30} height={30} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                            <path d="M9 12h6" />
                            <path d="M12 9v6" />
                        </svg>

                    </div>

                </div>
            </div>

            <div className='w-[25%] h-screen bg-light'></div>
        </div>
    )
}

export default Dashboard