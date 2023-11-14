import React from "react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import Productcard from "./../components/Productcard";
import Blogcard from "../components/Blogcard";
import Specialproduct from "../components/Specialproduct";
import Meta from "./../components/Meta";
import services from "./../utilis/data";
import { useDispatch, useSelector } from "react-redux";
import { getallblogs } from "./../features/blogs/blogSelice";
import { useEffect } from "react";
import moment from "moment/moment";

import { getallproduct } from "../features/products/productSlice";
import Featuredproduct from "../components/Featuredproduct";

export default function Home() {
  const blogState = useSelector((state) => state.blog.blog);
  const productState = useSelector((state) => state.product.product);

  const getProducts = () => {
    dispatch(getallproduct());
  };
  const dispatch = useDispatch();
  const getblogs = () => {
    dispatch(getallblogs());
  };
  useEffect(() => {
    getblogs();
    getProducts();
  }, []);

  return (
    <div>
      <Meta title="Feveri's Corner" />
      <section className="home-wrapper-1 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-xl-6 col-md-6 col-sm-12">
              <div className="main-banner p-3">
                <Swiper
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  // navigation={true}
                  modules={[Autoplay, Pagination, Navigation]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <img
                      src="images/main-banner.jpg"
                      className="d-block w-100 image-fluid rounded-3"
                      alt="main-banner"
                    />
                    <div className="swiper-caption">
                      <h5>SUPERCHARGED FOR PROS.</h5>
                      <h2>Airpods max</h2>
                      <p>From ₹29999.00 </p>
                      <Link to={"/store"}> Buy now </Link>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    {" "}
                    <img
                      src="images/main-banner-1.jpg"
                      className="d-block w-100 image-fluid rounded-3"
                      alt="main-banner"
                    />
                    <div className="swiper-caption">
                      <h5>Best in the Category</h5>
                      <h2>Samsung S23 Ultra</h2>
                      <p>From ₹99999.00 </p>
                      <Link to={"/store"}> Buy now </Link>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
            <div className="col-xl-6 col-md-6 col-sm-12">
              <div className="main-banner-2 ">
                <div className="d-flex p-3 gap-15 align-items-center justify-content-center">
                  <div className="catbanner">
                    <img
                      src="images/catbanner-01.jpg"
                      alt="main-banner-2-imgs"
                      className="d-block w-100 image-fluid rounded-3"
                    />
                    <div className="cat-banner-captions">
                      <h5>BEST SALE</h5>
                      <h3>MACBOOK AIR</h3>
                      <p>From ₹91999.00</p>
                    </div>
                  </div>
                  <div className="catbanner">
                    <img
                      src="images/catbanner-02.jpg"
                      alt="main-banner-2-imgs"
                      className="d-block w-100 image-fluid rounded-3"
                    />
                    <div className="cat-banner-captions">
                      <h5>BEST SALE</h5>
                      <h2>APPLE WATCH</h2>
                      <p>From ₹49999.00</p>
                    </div>
                  </div>
                </div>

                <div className="d-flex pt-0 gap-15 p-3 align-items-center justify-content-center">
                  <div className="catbanner">
                    <img
                      src="images/catbanner-03.jpg"
                      alt="main-banner-2-imgs"
                      className="d-block w-100 image-fluid rounded-3"
                    />
                    <div className="cat-banner-captions">
                      <h5>BEST SALE</h5>
                      <h2>IPAD PRO</h2>
                      <p>From ₹21999.00</p>
                    </div>
                  </div>
                  <div className="catbanner">
                    <img
                      src="images/catbanner-04.jpg"
                      alt="main-banner-2-imgs"
                      className="d-block w-100 image-fluid rounded-3"
                    />
                    <div className="cat-banner-captions">
                      <h5>BEST SALE</h5>
                      <h2>AIRPODS MAX</h2>
                      <p>From ₹29999.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 flex-wrap d-flex align-items-center justify-content-center">
              {services?.map((i, j) => {
                return (
                  <div
                    className=" service-img d-flex align-items-center justify-content-center p-2 col-4 "
                    key={j}
                  >
                    <img src={i.image} alt="services" />
                    <div className="service-details p-2">
                      <h4>{i.title}</h4>
                      <p>{i.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="heading">Popular product</h3>
              <div className="col-12">
                <div className="d-flex flex-wrap">
                  {productState &&
                    productState?.map((item, index) => {
                      if (item.tags === "popular") {
                        return <Productcard key={index} item={item} />;
                      }
                      return "";
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-4 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3>Featured Collection</h3>
              <div className="d-flex gap-30">
                {productState &&
                  productState?.map((item, index) => {
                    if (item.tags === "featured") {
                      return <Featuredproduct key={index} item={item} />;
                    }
                    return "";
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-4 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div>
                <h2>Blogs</h2>
              </div>
              <div className="d-flex gap-15">
                {blogState &&
                  blogState?.map((item, index) => {
                    return (
                      <div className="col-3" key={index}>
                        <Blogcard
                          data={item}
                          moment={moment(item?.created_at).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="special-product-wrapper">
        <div className="container">
          <div className="row">
            <h3 className="heading">Special product</h3>
            <div className="col-12">
              <div className="d-flex flex-wrap">
                {productState &&
                  productState?.map((item, index) => {
                    if (item.tags === "special") {
                      return <Specialproduct key={index} data={item} />;
                    }
                    return "";
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-5 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div>
                <Marquee speed="40" gradient={false} pauseOnHover={true}>
                  <div className="p-3">
                    <img src="images/brand-01.png" alt="brand" />
                  </div>
                  <div className="p-3">
                    <img src="images/brand-02.png" alt="brand" />
                  </div>
                  <div className="p-3">
                    <img src="images/brand-03.png" alt="brand" />
                  </div>
                  <div className="p-3">
                    <img src="images/brand-04.png" alt="brand" />
                  </div>
                  <div className="p-3">
                    <img src="images/brand-05.png" alt="brand" />
                  </div>
                  <div className="p-3">
                    <img src="images/brand-06.png" alt="brand" />
                  </div>
                  <div className="p-3">
                    <img src="images/brand-07.png" alt="brand" />
                  </div>
                  <div className="p-3">
                    <img src="images/brand-08.png" alt="brand" />
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
