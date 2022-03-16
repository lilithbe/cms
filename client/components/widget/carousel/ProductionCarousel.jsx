import { useEffect, useState, useRef, useMemo } from 'react'
import 'react-owl-carousel2/lib/styles.css';
import Image from 'next/image'
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(async () => {
    const { default: QL } = await import("react-owl-carousel2")
    return function comp({ forwardedRef, ...props }) {
        return <QL ref={forwardedRef} {...props} />
    }
}, { ssr: false });
import PropTypes from 'prop-types'
const ProductionCarousel = ({ title, items }) => {
    const itemsInit = useMemo(() => {
        return [
            {
                label: 'Flamboyant Pink Top',
                price: '35,00',
                unit: '$',
                src: '/img/product/1.jpg',
                idValue: '#',
            },
            {
                label: 'Flamboyant Pink Top',
                price: '35,00',
                unit: '$',
                src: '/img/product/2.jpg',
                idValue: '#',
            },
            {
                label: 'Flamboyant Pink Top',
                price: '35,00',
                unit: '$',
                src: '/img/product/3.jpg',
                idValue: '#',
            },
            {
                label: 'Flamboyant Pink Top',
                price: '35,00',
                unit: '$',
                src: '/img/product/4.jpg',
                idValue: '#',
            },
            {
                label: 'Flamboyant Pink Top',
                price: '35,00',
                unit: '$',
                src: '/img/product/5.jpg',
                idValue: '#',
            },
            {
                label: 'Flamboyant Pink Top',
                price: '35,00',
                unit: '$',
                src: '/img/product/6.jpg',
                idValue: '#',
            },
        ]
    }, [])

    const [_items, setItems] = useState(items)
    // useEffect(() => {

    //     setTimeout(() => {
    //         setItems(itemsInit)
    //     }, 300);
    // }, [itemsInit])
    const carousel = useRef(null)
    const events = {
        onDragged: (e) => {

        },
        onChanged: (e) => {

        }
    };
    return (

        <section className="top-letest-product-section">
            <div className="container">
                <div className="section-title">
                    <h2>{title}</h2>
                </div>
                {_items.length !== 0 ?
                    <OwlCarousel
                        ref={carousel}
                        className="product-slider owl-carousel"
                        options={{
                            loop: true,
                            nav: true,
                            dots: false,
                            margin: 30,
                            autoplay: true,
                            navText: [
                                '<button class="btn py-1 owl-prev"><i class="bi bi-chevron-left"></i></button>',
                                '<button class="btn py-1 owl-next"><i class="bi bi-chevron-right"></i></button>'
                            ],
                            responsive: {
                                0: {
                                    items: 1,
                                },
                                480: {
                                    items: 2,
                                },
                                768: {
                                    items: 3,
                                },
                                1200: {
                                    items: 4,
                                }
                            }
                        }}
                    // events={events}
                    >

                        {_items.map((item, i) => {
                            return (
                                <div className="product-item" key={i}>
                                    <div className="pi-pic">
                                        <Image src={item.src} width={300} height={409} alt={item.label} />
                                        <div className="pi-links">
                                            <button className="btn p-2 rounded-pill add-card"><i className="bi bi-bag" /><span>ADD TO CART</span></button>
                                            <button className="btn p-2 rounded-pill wishlist-btn"><i className="bi bi-heart" /></button>
                                        </div>
                                    </div>
                                    <div className="pi-text">
                                        <h6>{item.unit}{item.price}</h6>
                                        <p>{item.label}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </OwlCarousel> : null}
            </div>
        </section>


    )
}

ProductionCarousel.propTypes = {
    items: PropTypes.array,
}
ProductionCarousel.defaultProps = {
    items: [
        {
            label: 'Flamboyant Pink Top',
            price: '35,00',
            unit: '$',
            src: '/img/product/1.jpg',
            idValue: '#',
        },
        {
            label: 'Flamboyant Pink Top',
            price: '35,00',
            unit: '$',
            src: '/img/product/2.jpg',
            idValue: '#',
        },
        {
            label: 'Flamboyant Pink Top',
            price: '35,00',
            unit: '$',
            src: '/img/product/3.jpg',
            idValue: '#',
        },
        {
            label: 'Flamboyant Pink Top',
            price: '35,00',
            unit: '$',
            src: '/img/product/4.jpg',
            idValue: '#',
        },
        {
            label: 'Flamboyant Pink Top',
            price: '35,00',
            unit: '$',
            src: '/img/product/5.jpg',
            idValue: '#',
        },
        {
            label: 'Flamboyant Pink Top',
            price: '35,00',
            unit: '$',
            src: '/img/product/6.jpg',
            idValue: '#',
        },
    ]
}

export default ProductionCarousel
