export default function FAQ() {
    const faqs = [
        {
            question: "How long does shipping take?",
            answer: "Standard shipping typically takes 3-5 business days. Express shipping is available for next-day delivery in select areas. Free shipping is offered on orders over $500."
        },
        {
            question: "What is your return policy?",
            answer: "We offer a hassle-free 30-day return policy. Items must be unused and in original packaging. Simply contact our customer service to initiate a return."
        },
        {
            question: "Do you offer international shipping?",
            answer: "Yes, we ship to over 50 countries worldwide. International shipping times vary by location but typically take 7-14 business days."
        },
        {
            question: "How can I track my order?",
            answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and viewing order history."
        },
        {
            question: "Are the products authentic?",
            answer: "Absolutely! We guarantee 100% authentic products from authorized distributors. All items come with manufacturer warranties where applicable."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, debit cards, PayPal, and various digital payment methods. All transactions are secured with SSL encryption."
        }
    ];

    return (
        <div className="container-fluid py-5" style={{ backgroundColor: "#f8f9fa" }}>
            <div className="row px-xl-5">
                <div className="col-lg-6 mb-5 mb-lg-0">
                    <div className="text-center text-lg-left mb-4">
                        <h2 className="section-title position-relative">
                            <span className="bg-secondary pr-3">Frequently Asked Questions</span>
                        </h2>
                        <p className="text-muted mt-3">
                            Find answers to common questions about shopping with us
                        </p>
                    </div>
                    
                    <div className="bg-light rounded p-5 shadow-sm">
                        <div className="text-center mb-4">
                            <i className="fa fa-question-circle fa-5x text-primary mb-3" style={{ opacity: 0.7 }}></i>
                            <h4 className="font-weight-bold mb-3">Still Have Questions?</h4>
                            <p className="text-muted mb-4">
                                Our customer support team is here to help you 24/7
                            </p>
                        </div>
                        
                        <div className="row">
                            <div className="col-6 mb-3">
                                <div className="text-center p-3 bg-white rounded">
                                    <i className="fa fa-phone fa-2x text-success mb-2"></i>
                                    <p className="mb-0 small"><strong>Call Us</strong></p>
                                    <small className="text-muted">+1 234 567 890</small>
                                </div>
                            </div>
                            <div className="col-6 mb-3">
                                <div className="text-center p-3 bg-white rounded">
                                    <i className="fa fa-envelope fa-2x text-primary mb-2"></i>
                                    <p className="mb-0 small"><strong>Email Us</strong></p>
                                    <small className="text-muted">support@store.com</small>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="text-center p-3 bg-white rounded">
                                    <i className="fa fa-comments fa-2x text-info mb-2"></i>
                                    <p className="mb-0 small"><strong>Live Chat</strong></p>
                                    <small className="text-muted">Chat Now</small>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="text-center p-3 bg-white rounded">
                                    <i className="fab fa-whatsapp fa-2x text-success mb-2"></i>
                                    <p className="mb-0 small"><strong>WhatsApp</strong></p>
                                    <small className="text-muted">+1 234 567 890</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="accordion" id="faqAccordion">
                        {faqs.map((faq, index) => (
                            <div key={index} className="card border-0 shadow-sm mb-3">
                                <div className="card-header bg-white border-0" id={`heading${index}`}>
                                    <h5 className="mb-0">
                                        <button
                                            className="btn btn-link text-left text-dark font-weight-bold w-100 d-flex justify-content-between align-items-center"
                                            type="button"
                                            data-toggle="collapse"
                                            data-target={`#collapse${index}`}
                                            aria-expanded={index === 0 ? "true" : "false"}
                                            aria-controls={`collapse${index}`}
                                            style={{ textDecoration: "none" }}
                                        >
                                            <span>
                                                <i className="fa fa-question-circle text-primary mr-2"></i>
                                                {faq.question}
                                            </span>
                                            <i className="fa fa-chevron-down text-primary"></i>
                                        </button>
                                    </h5>
                                </div>

                                <div
                                    id={`collapse${index}`}
                                    className={`collapse ${index === 0 ? "show" : ""}`}
                                    aria-labelledby={`heading${index}`}
                                    data-parent="#faqAccordion"
                                >
                                    <div className="card-body text-muted" style={{ lineHeight: "1.8" }}>
                                        <i className="fa fa-check-circle text-success mr-2"></i>
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
