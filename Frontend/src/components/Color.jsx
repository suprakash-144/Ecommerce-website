import React from "react";

export default function Color(props) {
  const { colorData, setcolor } = props;

  return (
    <div>
      <div className="gap-10 d-flex flex-wrap color">
        {colorData &&
          colorData?.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  background: item?.title,
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "100%",
                }}
                onClick={() => setcolor(item._id)}
              ></div>
            );
          })}
      </div>
    </div>
  );
}
