"use client";
import React, {
	useEffect,
	useRef,
	useState,
	useContext,
	componentDidMount,
} from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { LuLoader2 } from "react-icons/lu";
import { MyContext } from "../context/context";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const MapComponent = () => {
	const { open, setOpen } = useContext(MyContext);
	const mapContainer = useRef(null);
	const map = useRef(null);
	const directions = useRef(null);
	const { selectedTrip, setTrip } = useContext(MyContext);

	const [loader, setLoader] = useState(false);
	const [estimation, setEstimation] = useState(null);
	const [instructions, setInstructions] = useState(null);

	const handleClick = () => {
		setOpen(!open);
	};

	const handleStep = (steps, estimation) => {
		setInstructions(steps);
		setEstimation(estimation);
	};

	function updateEst() {
		setLoader(true);
		setTimeout(() => {
			const elem = document.querySelector(
				"body > main > div > div.ease-in-out.duration-300.h-full.w-11\\/12 > div > div.mapboxgl-control-container > div.mapboxgl-ctrl-top-right > div > div.directions-control.directions-control-instructions > div > div.mapbox-directions-instructions > div > ol"
			);
			const est = document.querySelector(
				"body > main > div > div.ease-in-out.duration-300.h-full.w-11\\/12 > div.rounded-xl.h-full.overflow-hidden.ease.w-full.mapboxgl-map > div.mapboxgl-control-container > div.mapboxgl-ctrl-top-right > div > div.directions-control.directions-control-instructions > div > div.mapbox-directions-component.mapbox-directions-route-summary"
			);

			const estimationContainer = document.querySelector(
				"#estimationContainer"
			);

			try {
				const old = estimationContainer.childNodes[0];
				estimationContainer.replaceChild(est, old);
				setLoader(false);
			} catch (e) {
				console.log(e);
			}
		}, 6000);
	}

	function updateSteps() {
		setLoader(true);
		setTimeout(() => {
			const elem = document.querySelector(
				"body > main > div > div.ease-in-out.duration-300.h-full.w-11\\/12 > div > div.mapboxgl-control-container > div.mapboxgl-ctrl-top-right > div > div.directions-control.directions-control-instructions > div > div.mapbox-directions-instructions > div > ol"
			);

			const stepsContainer = document.querySelector("#stepsContainer");

			try {
				const old = stepsContainer.childNodes[0];
				stepsContainer.replaceChild(elem, old);
				setLoader(false);
			} catch (e) {
				console.log(e);
			}
		}, 6000);
	}

	useEffect(() => {
		updateEst();
		updateSteps();
	}, [selectedTrip]);

	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/dark-v11",
			center: [-122.4194, 37.7749],
			zoom: 13,
		});
		directions.current = new MapboxDirections({
			accessToken: mapboxgl.accessToken,
			unit: "metric",
			max_height: 10,
			profile: "mapbox/driving",
			interactive: false,
			alternatives: true,
		});

		map.current.addControl(directions.current);
	}, [map]);
	useEffect(() => {
		if (selectedTrip) {
			directions.current.setOrigin([selectedTrip[0][0], selectedTrip[0][1]]); // Starting Point
			directions.current.setDestination([
				selectedTrip[1][0],
				selectedTrip[1][1],
			]); // Ending Point
		}
	}, [selectedTrip]);
	return (
		<div
			onClick={handleClick}
			className={`ease-in-out duration-300 h-full ${
				open ? "w-full" : "w-11/12"
			}`}
		>
			{selectedTrip ? (
				<div>
					<div className="absolute top-[40px] center right-[32px] text-xl bg-black/30 rounded-xl p-6 text-white">
						{loader ? (
							<div className="animate-spin h-[24px] w-[24px] flex justify-center align-center items-center">
								<LuLoader2 />
							</div>
						) : (
							""
						)}
						<div
							className={`${loader ? "hidden" : "visible"}`}
							id="estimationContainer"
						>
							<div></div>
						</div>
					</div>
					<div className="absolute top-[120px] center right-[32px] text-xl bg-black/30 rounded-xl p-6 text-white max-w-[400px] max-h-[300px] overflow-scroll">
						{loader ? (
							<div className="animate-spin h-[24px] w-[24px] flex justify-center align-center items-center">
								<LuLoader2 />
							</div>
						) : (
							""
						)}
						<div
							className={`${loader ? "hidden" : "visible"}`}
							id="stepsContainer"
						>
							<div></div>
						</div>
					</div>
				</div>
			) : (
				<div></div>
			)}
			<div
				ref={mapContainer}
				className={`rounded-xl h-full overflow-hidden ease w-full`}
			/>
		</div>
	);
};

export default MapComponent;
