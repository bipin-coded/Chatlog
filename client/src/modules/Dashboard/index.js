import React, { useEffect, useRef, useState } from 'react'
import Avatar from '../../assets/avatar.svg';
import Input from '../../components/Input';
import { io } from 'socket.io-client';
const { v4: uuidv4 } = require('uuid');

function Dashboard() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')));
    const [users, setUsers] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [message, setMessage] = useState();
    const [messages, setMessages] = useState({});
    const [socket, setSocket] = useState(null);
    const messageRef = useRef(null);

    useEffect(() => {
        setSocket(io(`${process.env.REACT_APP_PUBLIC_URL}:8001`));
        console.log(process.env);
    }, []);

    useEffect(() => {
        socket?.emit('addUser', user?.id);
        socket?.on('getUsers', users => {
            // console.log('Active users :>>', users);
        });

        socket?.on('getMessage', obj => {
            setMessages(prev => ({
                ...prev,
                data: [...prev.data, { user: obj.user, message: obj.message, _id: uuidv4() }]
            }));
        });
    }, [socket]);

    useEffect(() => {
        messageRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages?.data]);

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user:detail'));
        const fetchConversations = async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/conversation/${loggedInUser?.id}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            });
            const resData = await res.json();
            setConversations(resData);
        };
        fetchConversations();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${user.id}`, {
                method: 'GET',
                headers: { 'content-type': 'application/json' }
            });
            const resData = await res.json();
            setUsers(resData);
        };
        fetchUsers();
    }, [user.id]);

    // Get all messages by conversationId
    const fetchMessages = async (conversationId, receiver) => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/message/${conversationId}?senderId=${user?.id}&receiverId=${receiver?.id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        });
        const resData = await res.json();
        setMessages({ data: resData, receiver: receiver, conversationId });
    };

    // Send message
    const sendMessage = async (e) => {

        const payload = {
            conversationId: messages?.conversationId,
            senderId: user?.id,
            message,
            receiverId: messages?.receiver?.id
        };
        socket?.emit('sendMessage', payload)

        await fetch(`${process.env.REACT_APP_API_URL}/api/message`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        setMessage('');
    };

    return (
        <div className='w-screen flex'>
            <div className='w-[25%] h-screen bg-secondary overflow-y-scroll'>
                <div className='flex  items-center my-6 mx-14'>
                    <div className='border border-primary p-[2px] rounded-full'><img src={Avatar} alt={Avatar} width={75} height={75} /></div>
                    <div className='ml-4'>
                        <h3 className='text-2xl'>{user?.fullName}</h3>
                        <p>My Account</p>
                    </div>
                </div>
                <hr className='border-gray-300' />
                <div className='mx-14 mt-10'>
                    <div className='text-primary text-lg'>Message</div>
                    <div>
                        {
                            conversations.length > 0 ? conversations.map(({ conversationId, user }) => {
                                return (
                                    <div key={conversationId} className='flex items-center py-6 border-b border-b-gray-300'>
                                        <div className='cursor-pointer flex items-center' onClick={() => fetchMessages(conversationId, user)}>
                                            <img src={Avatar} alt={Avatar} width={60} height={60} />
                                            <div className='ml-4'>
                                                <h3 className='text-lg font-semibold'>{user?.fullName}</h3>
                                                <p className='text-sm font-light text-gray-500'>{user?.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <div className='text-center text-lg font-semibold mt-24'>No conversations</div>
                        }
                    </div>
                </div>
            </div>

            <div className='w-[50%] h-screen bg-white flex flex-col items-center'>
                {
                    messages?.receiver?.fullName &&
                    <div className='w-[75%] bg-secondary h-[80px] my-14 rounded-full flex items-center px-10'>
                        <div className='cursor-pointer'><img src={Avatar} alt={Avatar} width={60} height={60} /></div>
                        <div className='ml-6 mr-auto'>
                            <h3 className='text-lg'>{messages?.receiver?.fullName}</h3>
                            <p className='text-sm font-light text-gray-500'>{messages?.receiver?.email}</p>
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
                }
                <div className='h-[75%] w-full overflow-y-scroll shadow-md'>
                    <div className='p-10'>
                        {
                            messages?.data?.length > 0 ? messages.data.map(({ _id, message, user: { id } = {} }) => {
                                return (
                                    <div key={_id}>
                                        <div className={`max-w-[40%] rounded-b-xl p-4 mb-6 ${id === user?.id ? 'bg-primary text-white rounded-tl-xl ml-auto' : 'bg-secondary rounded-tr-xl'}`}>
                                            {message}
                                        </div>
                                        <div ref={messageRef}></div>
                                    </div>
                                )
                            }) : <div className='text-center text-lg font-semibold mt-24'>No messages or No conversation selected</div>
                        }
                    </div>
                </div>
                <div className='p-10 w-full flex items-center'>
                    <Input type='text' name='msg' value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Type a message...' classNames='w-[75%] p-4 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none mr-auto' />
                    <div className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${!message && 'pointer-events-none'}`} onClick={() => sendMessage()}>
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

            <div className='w-[25%] h-screen bg-light px-8 py-16 overflow-y-scroll'>
                <div className='text-primary text-lg'>Peoples</div>
                {
                    users?.length > 0 ?
                        users.map(({ user }) => {
                            return (
                                <div key={user?.id} className='flex items-center py-6 border-b border-b-gray-300'>
                                    <div className='cursor-pointer flex items-center' onClick={() => fetchMessages('new', user)}>
                                        <img src={Avatar} alt={Avatar} width={60} height={60} />
                                        <div className='ml-4'>
                                            <h3 className='text-lg font-semibold'>{user?.fullName}</h3>
                                            <p className='text-sm font-light text-gray-500'>{user?.email}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        : ''
                }
            </div>
        </div>
    )
}

export default Dashboard