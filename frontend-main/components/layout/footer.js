export default function Footer() {
    return (
        <>
            <div className="container-fluid bg-dark text-light mt-5 pt-5">
                <div className="row px-xl-5 pt-5">
                    {/* Contact Section */}
                    <div className="col-lg-4 col-md-12 mb-5">
                        <h5 className="text-light text-uppercase mb-4">Get In Touch</h5>
                        <p className="mb-2">
                            <i className="fa fa-map-marker-alt text-primary mr-3"></i>
                            Lahore, Pakistan
                        </p>
                        <p className="mb-2">
                            <i className="fa fa-envelope text-primary mr-3"></i>
                            BAZARISTAN@gmail.com
                        </p>
                        <p className="mb-0">
                            <i className="fa fa-phone-alt text-primary mr-3"></i>
                            +92 xxx xxxxxx
                        </p>
                    </div>

                    {/* Social Links Section */}
                    <div className="col-lg-8 col-md-12">
                        <div className="row justify-content-between">
                            <div className="col-md-4 mb-5">
                                <h6 className="text-light text-uppercase mt-4 mb-3">Follow Us</h6>
                                <div className="d-flex justify-content-start">
                                    <a
                                        className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center mr-3"
                                        href="#"
                                        style={{ width: '40px', height: '40px' }}
                                    >
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                    <a
                                        className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center mr-3"
                                        href="#"
                                        style={{ width: '40px', height: '40px' }}
                                    >
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                    <a
                                        className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
                                        href="#"
                                        style={{ width: '40px', height: '40px' }}
                                    >
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>
                                </div>
                            </div>

                            <div className="col-md-4 mb-5 d-flex align-items-end flex-column">
                                <h6 className="text-light text-uppercase mt-4 mb-3">More Socials</h6>
                                <div className="d-flex justify-content-end">
                                    <a
                                        className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center mr-3"
                                        href="#"
                                        style={{ width: '40px', height: '40px' }}
                                    >
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                    <a
                                        className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
                                        href="#"
                                        style={{ width: '40px', height: '40px' }}
                                    >
                                        <i className="fab fa-youtube"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="row border-top mx-xl-5 py-4">
                    <div className="col-md-6 text-center text-md-left">
                        <p className="mb-0 text-secondary">
                            &copy; {new Date().getFullYear()} <a href="#" className="text-primary">BAZARISTAN</a>. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
