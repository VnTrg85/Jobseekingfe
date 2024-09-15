import "./Banner.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SliderComponent from "../slider/SliderComponent";
function Banner() {
	return (
		<div className="banner">
			<div className="banner-container">
				<h4 className="banner-tag">No.1 Job seeking website</h4>
				<div className="banner-title">
					Search, Apply &
					<p>
						Get your
						<span> Dream Jobs</span>
					</p>
				</div>
				<p className="banner-des">
					"Elevate Your Professional Life: Discover a Vast Array of Job Opportunities, Empower Your Career Growth, and Turn Your Aspirations
					into Achievements"
				</p>
				<div className="banner-search">
					<input type="text" placeholder="Find your dream jobs"></input>
					<span className="banner-icon">
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</span>
				</div>
				<SliderComponent></SliderComponent>
			</div>
		</div>
	);
}

export default Banner;
