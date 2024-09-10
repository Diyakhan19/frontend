/* eslint-disable */
import React, { useState } from "react";
import FslightboxReact from "fslightbox-react";
import moment from "moment";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const isValidArr = (arr) => Array.isArray(arr) && arr.length !== 0;

const Message = (props) => {
  const router = useRouter();

  const { activeChat, message, prevMsg } = props;

  const { senderId, text, attachments, createdAt } = message;

  const { user } = useSelector((state) => state.auth);

  const receiverImg = activeChat.participants[0].participant.image;

  const isOwnMsg = user.userId === senderId;

  const [toggler, setToggler] = useState({
    toggler: false,
    slide: 1,
  });

  // =================== Images Carosel ==============================
  const [imgUrls, setImgUrls] = useState([]);

  const imgClicked = async (files) => {
    const imgs = [];
    if (files.length !== 0) {
      for (var i = 0; i < files.length; i++) {
        files.forEach((item) => {
          if (item.mimeType.includes("image")) {
            imgs.push(`${BASE_URL}/${item.path}`);
          }
        });
      }
    }
    setImgUrls(imgs);
    openLightboxOnSlide(1);
  };

  function openLightboxOnSlide(number) {
    setToggler({
      toggler: !toggler.toggler,
      slide: number,
    });
  }

  return (
    <>
      {!isOwnMsg ? (
        <div className="col-start-1 col-end-12 lg:col-end-8 px-1 py-[2px] rounded-lg scroll-hide">
          <div className="flex flex-row items-start lg:items-center ">
            {prevMsg?.senderId !== message.senderId ? (
              <img
                className="object-cover self-start min-w-[40px] h-[40px] rounded-full cursor-pointer"
                src={`${BASE_URL}/${receiverImg}`}
                alt="username"
                onError={(e) => e.src === "/images/female.png"}
                onClick={() =>
                  router.push(`/profile?userId=${message.senderId}`)
                }
              />
            ) : (
              <div className="mr-[40px]" />
            )}

            <div className="flex flex-col gap-2">
              {isValidArr(attachments) && (
                <div
                  className={`relative ml-3 text-sm flex gap-2 snap-x snap-mandatory scroll-hide overflow-x-scroll break-normal 
              min-w-[200px] sm:min-w-[300px] sm:max-w-full text-gray-600 bg-white py-2 px-4 border-b-2 rounded-tl-none rounded-lg`}
                >
                  {attachments.map((item, i) => (
                    <div key={i} className="my-4 snap-center flex-shrink-0">
                      {item.mimeType.includes("image") ? (
                        <img
                          src={`${BASE_URL}/${item.path}`}
                          alt="no image"
                          className="w-[200px] h-[200px] snap-center rounded-md object-cover bg-gray cursor-pointer"
                          onError={(e) =>
                            (e.target.src = "/images/placeholder.jpg")
                          }
                          onClick={() => imgClicked(attachments)}
                        />
                      ) : (
                        item.mimeType.includes("video") && (
                          <video
                            className="w-[200px] h-[200px] snap-center rounded-md bg-gray cursor-pointer"
                            controls
                          >
                            <source
                              src={`${BASE_URL}/${item.path}`}
                              type={item.mimeType}
                            />
                            Your browser does not support the video tag.
                          </video>
                        )
                      )}
                    </div>
                  ))}
                </div>
              )}
              {text && (
                <div
                  className="relative ml-3 text-sm bg-white py-2 flex gap-2 snap-x snap-mandatory scroll-hide overflow-x-scroll break-normal
                   min-w-[150px] max-w-[250px] sm:max-w-full px-4 shadow-md rounded-lg rounded-tl-none min-h-[45px]"
                >
                  <div>{text}</div>

                  <div className="absolute bottom-0 right-1 flex gap-1 self-end font-sans text-[10px] text-gray-500 float-right mt-[2px]">
                    {moment(createdAt).format("LT")}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="col-start-1 lg:col-start-6 col-end-13 px-1 py-[2px] rounded-lg">
          <div className="flex items-start lg:items-center justify-start flex-row-reverse">
            {prevMsg?.senderId !== message.senderId ? (
              <img
                className="object-cover self-start min-w-[40px] h-[40px] rounded-full"
                src={`${BASE_URL}/${user.image}`}
                alt="username"
                onError={(e) => e.src === "/images/female.png"}
              />
            ) : (
              <div className="ml-[40px]" />
            )}

            <div className="flex flex-col gap-2">
              {isValidArr(attachments) && (
                <div
                  className={`relative mr-3 text-sm flex gap-2 snap-x snap-mandatory scroll-hide overflow-x-scroll break-normal 
              min-w-[200px] sm:min-w-[300px] sm:max-w-full text-gray-700 bg-white px-2 border-b-2 rounded-tr-none rounded-lg`}
                >
                  {attachments.map((item, i) => (
                    <div key={i} className="my-4 snap-center flex-shrink-0">
                      {item.mimeType.includes("image") ? (
                        <img
                          src={`${BASE_URL}/${item.path}`}
                          alt="no image"
                          className="w-[200px] h-[200px] snap-center rounded-md object-cover bg-gray cursor-pointer"
                          onError={(e) =>
                            (e.target.src = "/images/placeholder.jpg")
                          }
                          onClick={() => imgClicked(attachments)}
                        />
                      ) : (
                        item.mimeType.includes("video") && (
                          <video
                            className="w-[200px] h-[200px] snap-center rounded-md bg-gray cursor-pointer"
                            controls
                          >
                            <source
                              src={`${BASE_URL}/${item.path}`}
                              type={item.mimeType}
                            />
                            Video not supportd
                          </video>
                        )
                      )}
                    </div>
                  ))}
                </div>
              )}

              {text && (
                <div
                  className="relative self-end mr-3 text-sm flex flex-col snap-x snap-mandatory scroll-hide overflow-x-scroll break-normal
                  min-w-[150px] max-w-[250px] sm:max-w-full bg-white px-2 shadow rounded-lg rounded-tr-none min-h-[45px]"
                >
                  <div className="px-2 pt-2">{text}</div>

                  <div className="flex gap-1 self-end font-sans text-[10px] text-gray-500 float-right mt-[2px]">
                    {moment(createdAt).format("LT")}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <FslightboxReact
        toggler={toggler.toggler}
        sources={imgUrls}
        slide={toggler.slide}
        type="image"
      />
    </>
  );
};

export default Message;
