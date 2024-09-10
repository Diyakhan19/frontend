"use client";
import Reac, { act, useEffect, useRef, useState } from "react";
import moment from "moment";
import Message from "./Message";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import {
  useCreateChatMutation,
  useGetChatsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} from "@/redux/services/chatService";
import { socket } from "../page";
import DeleteChat from "@/components/modals/DeleteChat";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = (props) => {
  const params = useSearchParams();
  const router = useRouter();
  const [mobileView, setMobileView] = useState(false);
  const chatRef = useRef();

  const { user } = useSelector((state) => state.auth);

  const receiverId = params.get("receiverId");
  const postId = params.get("postId");
  const hotelId = params.get("hotelId");

  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [message, setMessage] = useState({
    text: "",
    attachments: [],
  });
  const [modal, setModal] = useState({
    isOpen: false,
    data: null,
  });

  const [createChat] = useCreateChatMutation();
  const [sendMessage] = useSendMessageMutation();

  const { data: chatRes, refetch } = useGetChatsQuery();
  const chats = chatRes?.data;

  const { text, attachments } = message;

  const { data: msgsRes } = useGetMessagesQuery(
    { chatId: activeChat?.chatId },
    { skip: !activeChat }
  );

  const chatMsgs = msgsRes?.data;

  useEffect(() => {
    if (chatMsgs) {
      setMessages(chatMsgs);
    }
  }, [chatMsgs]);

  // Receive real time message
  socket.on("receiveMessage", (data) => {
    if (Array.isArray(messages)) {
      setMessages([...messages, data]);
    }
  });

  // Create new chat or return existing one
  const chatHandler = async () => {
    try {
      const body = { receiverId, postId, hotelId };
      const { data: chat } = await createChat(body).unwrap();
      const { data: chats } = await refetch().unwrap();
      const foundChat = chats.find((item) => item.chatId === chat.chatId);
      if (foundChat) {
        setActiveChat(foundChat);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user && receiverId && (postId || hotelId)) {
      chatHandler();
    }
  }, []);

  // useEffect(() => {
  //   if (messages) {
  //     if (chatRef.current) {
  //       chatRef.current.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }
  // }, [messages]);

  // Send message
  const onSend = (e) => {
    e.preventDefault();

    if (text === "" && attachments.length === 0) return;

    const { chatId, participants } = activeChat;
    const receiverId = participants[0].participant.userId;

    const body = new FormData();
    body.append("chatId", chatId);
    body.append("receiverId", receiverId);
    body.append("text", text);

    if (attachments.length !== 0) {
      for (let i = 0; i < attachments.length; i++) {
        body.append("files", attachments[i]);
      }
    }

    sendMessage(body)
      .unwrap()
      .then((res) => {
        setMessages([...messages, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });

    setMessage({
      text: "",
      attachments: [],
    });
  };

  return (
    <>
      <DeleteChat modal={modal} setModal={setModal} />
      <div className="my-5 container mx-auto">
        <div className="flex relative items-center border shadow rounded-t-lg">
          {mobileView && activeChat && (
            <div className="flex justify-between w-[13%] items-center bg-bdark lg:bg-white lg:text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="black"
                className="w-6 h-6 mx-4 lg:hidden cursor-pointer"
                onClick={() => {
                  setMobileView(false);
                  setActiveChat(null);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </div>
          )}

          {/* 
          <div
            className={`${
              mobileView ? "hidden" : "flex"
            } items-center text-[#9E9FAB] w-full lg:w-[25%] p-3`}
          >
            <div className="relative w-full">
              <input
                type="search"
                className="block w-full placeholder:text-sm py-2 h-10 pl-10 border border-borderCol rounded-full outline-none"
                name="search"
                placeholder="Search by name"
                value={keyword}
                onChange={(e) => setKeword(e.target.value)}
              />
              <span className="absolute inset-y-0 left-1 flex items-center pl-2">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-gray-400 cursor-pointer"
                  onClick={() => setKeword("")}
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
            </div>
          </div> */}

          <div className="hidden lg:flex items-center justify-center text-gray-500 w-full lg:w-[25%] p-3">
            <h1 className="font-bold text-[16px]">CHATS</h1>
          </div>

          <div className="w-full lg:w-[75%] min-h-[65px] flex items-center lg:bg-white lg:text-gray-500 text-white">
            {activeChat && (
              <div className="flex items-center w-full p-3 px-5 border-gray-300">
                <img
                  className="object-cover cursor-pointer w-10 h-10 rounded-full"
                  src={`${BASE_URL}/${
                    activeChat?.post?.images[0] || activeChat?.hotel?.images[0]
                  }`}
                  alt="username"
                  onClick={() => {
                    if (activeChat?.post)
                      router.push(`/posts/${activeChat.post.postId}`);
                    else if (activeChat?.hotelId)
                      router.push(`/hotels/${activeChat.hotel.hotelId}`);
                  }}
                />
                <div className="ml-4">
                  <h5 className="block font-semibold text-[#646672]">
                    {activeChat.post?.title || activeChat.hotel?.name}
                  </h5>
                </div>
              </div>
            )}
            {activeChat && (
              <div className="pr-4 text-gray-500 hover:text-red-500 cursor-pointer flex w-full justify-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                  onClick={() =>
                    setModal({
                      isOpen: true,
                      data: activeChat,
                    })
                  }
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}

            {!activeChat && (
              <div className="flex items-center justify-center text-[16px] font-bold w-full text-gray-500 lg:hidden">
                Chats
              </div>
            )}
          </div>
        </div>

        <div className="flex relative h-[78vh] border shadow rounded-b-lg">
          <div className="flex flex-row scroll-hide  w-full overflow-x-hidden">
            <div
              className={`${
                mobileView ? "hidden" : "block"
              } flex flex-col lg:py-8 bg-white lg:px-6 w-full lg:w-[25%] lg:border-r-2 flex-shrink-0`}
            >
              <div className="flex flex-col gap-2 scroll-hide overflow-scroll h-full">
                {chats?.length === 0 ? (
                  <div className="font-semibold mt-4 text-gray-500">
                    No chats found
                  </div>
                ) : (
                  Array.isArray(chats) &&
                  chats.length !== 0 &&
                  chats.map((chat) => {
                    const participant = chat.participants[0].participant;
                    return (
                      <div
                        className={`flex gap-1 m-2 lg:m-0 lg:gap-0 items-center flex-row scroll-hide rounded-lg border-b px-3 py-4 cursor-pointer ${
                          activeChat?.chatId === chat.chatId
                            ? "text-white bg-primary"
                            : "text-[#868896]"
                        }`}
                        onClick={() => {
                          setActiveChat(chat);
                          if (window.innerWidth < 1024) setMobileView(true);
                        }}
                      >
                        <div className="relative flex-shrink-0">
                          <img
                            className="object-cover w-10 h-10 rounded-full"
                            src={`${BASE_URL}/${participant.image}`}
                            alt="img"
                            onError={(e) =>
                              (e.target.src = "/images/female.png")
                            }
                          />
                        </div>
                        <div className="min-w-[90%] lg:min-w-[80%] lg:max-w-[80%] ml-4 sm:ml-2">
                          <div className="flex items-center justify-between ">
                            <p className="text-sm font-semibold w-[50%] truncate text-left">
                              {participant.name}
                            </p>
                            <p className="text-[12px] font-semibold w-[50%] min-w-max lg:text-left xl:text-right 200"></p>
                          </div>

                          <div className="flex justify-between">
                            <p className="self-start text-left text-[12px] font-medium truncate w-full">
                              {chat?.post?.title || chat?.hotel?.name}
                            </p>
                            <p className="text-right text-[12px] font-medium px-3 lg:px-1 truncate w-full">
                              {moment(chat.createdAt).fromNow()}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <div
              className={`${
                mobileView ? "block" : "hidden"
              } lg:flex relative flex-col w-[80%] flex-auto h-full`}
            >
              <div className="flex relative flex-col flex-auto flex-shrink-0  bg-[#f9f8f9] h-full p-4">
                <div className="flex flex-col h-full scroll-hide  overflow-x-auto mb-4">
                  {!activeChat && (
                    <div className="flex items-center h-full justify-center">
                      <h2 className="font-bold">👈 Select Conversation</h2>
                    </div>
                  )}

                  <div className="grid grid-cols-12 gap-y-1 mb-14 md:mb-16 relative ">
                    {activeChat &&
                      Array.isArray(messages) &&
                      messages.length !== 0 &&
                      messages.map((message, indx) => {
                        const prevMsg = messages[indx - 1];
                        return (
                          <Message
                            message={message}
                            activeChat={activeChat}
                            prevMsg={prevMsg}
                          />
                        );
                      })}
                    <div ref={chatRef} />
                  </div>
                </div>

                {activeChat && (
                  <form
                    className="relative"
                    encType="multipart/form-data"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div className="flex flex-row items-center shadow-sm shadow-gray-400 h-12 md:h-16 rounded-lg bg-white w-full px-4">
                      <div className="flex-grow lg:ml-4">
                        <input
                          type="text"
                          value={text}
                          onChange={(e) =>
                            setMessage({ ...message, text: e.target.value })
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") onSend(e);
                          }}
                          className={`w-full placeholder:text-sm pl-2 h-10 ring-0 ring-none focus:ring-0`}
                          placeholder="Message..."
                          style={{
                            border: "0px",
                          }}
                        />
                      </div>

                      <label htmlFor="attachemnts" className="cursor-pointer">
                        <div className="p-1 border border-borderCol rounded-lg w-auto min-w-[40px] h-[40px] mx-2 shadow flex items-center justify-center">
                          <input
                            id="attachemnts"
                            type="file"
                            name="files"
                            multiple
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={(e) =>
                              setMessage({
                                ...message,
                                attachments: e.target.files,
                              })
                            }
                          />

                          {attachments.length !== 0 ? (
                            <div className="text-xs md:text-sm flex gap-0.5 px-2">
                              <p>{attachments.length} </p>
                              <span>
                                {attachments.length === 1 ? " File" : " Files"}
                              </span>
                            </div>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="gray"
                              className="w-5 h-5 -rotate-45"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                              />
                            </svg>
                          )}
                        </div>
                      </label>

                      <div>
                        <button
                          type="button"
                          className="flex items-center justify-center text-sm bg-bdark rounded-lg text-white bg-primary px-3 lg:px-7 py-2 flex-shrink-0"
                          onClick={onSend}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
