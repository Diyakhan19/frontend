/* eslint-disable */
import React, { useEffect, useState } from "react";
import FslightboxReact from "fslightbox-react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

const isValidArr = (arr) => Array.isArray(arr) && arr.length !== 0;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Message = (props) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { activeChat, message } = props;

  const { senderId, text, attachments, createdAt } = message;

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
          imgs.push(`${BASE_URL}/${item.path}`);
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
        <div className="col-start-1 col-end-12 lg:col-end-8 px-1 py-3 rounded-lg scroll-hide">
          <div className="flex flex-row items-start lg:items-center ">
            <img
              className="object-cover self-start min-w-[40px] h-[40px] rounded-full"
              src={`${BASE_URL}/${receiverImg}`}
              alt="username"
              onError={(e) => e.src === "/images/female.png"}
            />

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
                            (e.target.src = "/images/placeholder.png")
                          }
                          onClick={() => imgClicked(attachments)}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div
                className="relative ml-3 text-sm bg-white py-2 flex gap-2 snap-x snap-mandatory scroll-hide overflow-x-scroll break-normal
                   min-w-[150px] max-w-[250px] sm:max-w-full px-4 shadow-md rounded-lg rounded-tl-none"
              >
                <div>{text}</div>
              </div>
              <div className="flex gap-1 self-start font-sans text-[10px] bottom-0 right-0 -mb-5 ml-4 text-gray-500">
                {moment(createdAt).format("ddd LT")}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="col-start-1 lg:col-start-6 col-end-13 px-1 py-[2px] rounded-lg">
          <div className="flex items-start lg:items-center justify-start flex-row-reverse">
            <img
              src={`${BASE_URL}/${user?.image}`}
              alt="img"
              className="object-cover self-start min-w-[40px] h-[40px] rounded-full"
            />
            <div className="flex flex-col gap-2">
              {isValidArr(attachments) && (
                <div
                  className={`relative mr-3 text-sm flex gap-2 snap-x snap-mandatory scroll-hide overflow-x-scroll break-normal 
              min-w-[200px] sm:min-w-[300px] sm:max-w-full text-gray-700 bg-white py-2 px-4 border-b-2 rounded-tr-none rounded-lg`}
                >
                  {attachments.map((item, i) => (
                    <div key={i} className="my-4 snap-center flex-shrink-0">
                      {item.mimeType.includes("image") ? (
                        <img
                          src={`${BASE_URL}/${item.path}`}
                          alt="no image"
                          className="w-[200px] h-[200px] snap-center rounded-md object-cover bg-gray cursor-pointer"
                          onError={(e) =>
                            (e.target.src = "/images/placeholder.png")
                          }
                          onClick={() => imgClicked(attachments)}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div
                className="relative mr-3 text-sm flex gap-2 snap-x snap-mandatory scroll-hide overflow-x-scroll break-normal
                  min-w-[150px] max-w-[250px] sm:max-w-full bg-white py-2 px-4 shadow rounded-lg rounded-tr-none"
              >
                <div>{text}</div>
              </div>
            </div>
          </div>

          <div className="flex gap-1 self-end font-sans text-[10px] bottom-0 right-0 mr-[52px] text-gray-500 float-right mt-[2px]">
            {moment(createdAt).format("ddd LT")}
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
