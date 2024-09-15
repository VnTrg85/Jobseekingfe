import React from "react";
import Slider from "react-slick";
import "./SliderComponent.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function SliderComponent() {
	function CustomSlide(props) {
		const { value } = props;
		return (
			<div className="slider-item">
				<h3>{value}</h3>
			</div>
		);
	}
	function SampleArrow(props) {
		const { className, style, onClick } = props;
		return (
			<div
				className={className}
				style={{ borderRadius: "20px", padding: " 5px 3px 2px", display: "inline-block", background: "#b66f6f33" }}
				onClick={onClick}
			/>
		);
	}

	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		nextArrow: <SampleArrow />,
		prevArrow: <SampleArrow />,
	};
	return (
		<div className="slider-container">
			<Slider {...settings}>
				<CustomSlide value={"Fullstack developer"} />
				<CustomSlide value={"Fullstack developer 2"} />
				<CustomSlide value={"Fullstack developer 3"} />
				<CustomSlide value={"Fullstack developer 4"} />
			</Slider>
		</div>
	);
}

export default SliderComponent;
