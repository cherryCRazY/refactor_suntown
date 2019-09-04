import React, { Component } from "react";
import AliceCarousel from "react-alice-carousel";
import slider_arrow from "../media/slider_arrow.svg";
import "../Styles/Slider.css";

export default class extends Component {
    items = [
        // {
        //     img: picture,
        //     name: 'Назва компанії, можливо велика.'
        // },
        // {
        //     img: picture,
        //     name: 'Назва компанії, можливо велика.'
        // },
        // {
        //     img: picture,
        //     name: 'Назва компанії, можливо велика.'
        // },
        // {
        //     img: picture,
        //     name: 'Назва компанії, можливо велика.'
        // },
        // {
        //     img: picture,
        //     name: 'Назва компанії, можливо велика.'
        // },
        // {
        //     img: picture,
        //     name: 'Назва компанії, можливо великa.'
        // }
    ];

    constructor(props) {
        super(props);
        this.items = this.props.images.map(image => ({
            img: image.mainImage,
            nameRu: image.companyRu,
            name: image.company,
            hasRu: image.hasRu,
            link: image.url
        }));
        this.state = {
            currentIndex: 0,
            responsive: {
                1100: { items: 5 },
                1000: { items: 4 },
                900: { items: 4 },
                700: { items: 3 },
                0: { items: 2 }
            },
            items: this.items.map(this.galleryItem)
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ items: this.items.map(this.galleryItem) });
    }

    slideTo = i => this.setState({ currentIndex: i });

    onSlideChanged = e => this.setState({ currentIndex: e.item });

    slideNext = () =>
        this.setState({ currentIndex: this.state.currentIndex + 1 });

    slidePrev = () =>
        this.setState({ currentIndex: this.state.currentIndex - 1 });

    galleryItem = (item, i) => {
        if (this.props.isRu) {
            if (item.hasRu) {
                return (
                    <div key={`key-${i}`} className="slider_info_box">
                        <div className="slider_picture_box">
                            <a href={item.link}>
                                <img
                                    src={item.img.src}
                                    alt={item.img.alt}
                                    title={item.img.title}
                                />
                            </a>
                        </div>
                        <p>{item.nameRu}</p>
                    </div>
                );
            } else return;
        } else {
            return (
                <div key={`key-${i}`} className="slider_info_box">
                    <div className="slider_picture_box">
                        <a href={item.link}>
                            <img
                                src={item.img.src}
                                alt={item.img.alt}
                                title={item.img.title}
                            />
                        </a>
                    </div>
                    <p>{item.name}</p>
                </div>
            );
        }
    };

    render() {
        const { items, responsive, currentIndex } = this.state;
        const handleOnDragStart = e => e.preventDefault();
        return (
            <div className="slider_container">
                <div
                    onClick={() => this.slidePrev()}
                    className="slider_button slider_prev_button"
                >
                    <img src={slider_arrow} alt="" />
                </div>
                <AliceCarousel
                    mouseDragEnabled
                    items={items}
                    dotsDisabled={true}
                    slideToIndex={currentIndex}
                    buttonsDisabled={true}
                    responsive={responsive}
                    onSlideChanged={this.onSlideChanged}
                />
                <div
                    onClick={() => this.slideNext()}
                    className="slider_button slider_next_button"
                >
                    <img src={slider_arrow} alt="" />
                </div>
            </div>
        );
    }
}
