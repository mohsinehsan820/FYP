export default function Header() {
    const array = [
        { img: "/img/carousel-3.png" },
        { img: "/img/carousel-2.png" },
        { img: "/img/carousel-1.png" },
        { img: "/img/carousel-4.png" },
        { img: "/img/carousel-5.png" },
        { img: "/img/carousel-6.png" },
    ];

    return (
        <>
            <div className="container-fluid mb-3">
                <div className="row px-xl-5">
                    <div className="col-lg-12">
                        <div id="header-carousel" className="carousel slide carousel-fade mb-30 mb-lg-0" data-ride="carousel">
                            {/* Indicators */}
                            <ol className="carousel-indicators">
                                {array.map((_, index) => (
                                    <li key={index} data-target="#header-carousel" data-slide-to={index} className={index === 0 ? "active" : ""}></li>
                                ))}
                            </ol>

                            {/* Carousel Items */}
                            <div className="carousel-inner">
                                {array.map((it, index) => (
                                    <div key={index} className={`carousel-item position-relative ${index === 0 ? "active" : ""}`} style={{ height: "430px" }}>
                                        <img className="position-absolute w-100 h-100" src={it.img} style={{ objectFit: "cover" }} />
                                        <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                            <div className="p-3" style={{ maxWidth: "700px" }}>
                                                <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Your place to go</h1>
                                                <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                                                    Explore the finest fashion for men and women, along with all your daily essentials—your ultimate destination for convenience and style. Shop smarter, live better!                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Carousel Controls */}
                            <a className="carousel-control-prev" href="#header-carousel" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#header-carousel" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
