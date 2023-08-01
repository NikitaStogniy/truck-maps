"use client";

import { useEffect, useContext, useState } from "react";
import addData from "@/app/firebase/addData";
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { LuLoader2 } from "react-icons/lu";
import getData from "@/app/firebase/getData";
import { useForm } from "react-hook-form";
import { MyContext } from "../../context/context";

const AddTrip = () => {
	const [step, setStep] = useState(true);
	const [pointA, setPointA] = useState(null);
	const [pointB, setPointB] = useState(null);

	const handleInputClick = () => {
		setStep(!step);
		addInputs();
	};

	useEffect(() => {
		console.log("test");
		handleInputClick();
	}, []);

	var geocoder = new MapboxGeocoder({
		accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
		mapboxgl: require("mapbox-gl"),
		autocomplete: true,
	});

	function addInputs() {
		setTimeout(() => {
			if (!step) {
				document.getElementById("bpoint").appendChild(geocoder.onAdd());
			} else {
				document.getElementById("apoint").appendChild(geocoder.onAdd());
			}
		}, 50);
	}

	const [documentData, setDrivers] = useState();

	useEffect(() => {
		const asyncFn = async () => {
			setDrivers(await getData("users"));
		};
		asyncFn();
	}, []);

	geocoder.on("result", function (e) {
		console.log(e.result);

		if (!step) {
			setPointB({
				name: e.result.place_name,
				latLng: e.result.center,
			});
		} else {
			setPointA({
				name: e.result.place_name,
				latLng: e.result.center,
			});
		}
	});
	const { add, setAdd } = useContext(MyContext);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => handleForm(data);

	const handleForm = async (formData) => {
		console.log(pointA.latLng);
		const data = {
			driver: formData.driver,
			pointA: [pointA.latLng[0], pointA.latLng[1]],
			pointB: [pointB.latLng[0], pointB.latLng[1]],
			routeNames: [pointA.name, pointB.name],
		};
		const { result, error } = await addData(
			"trips",
			(Math.random() + 1).toString(36).substring(2),
			data
		);

		if (error) {
			return console.log(error);
		}
		setAdd(false);
	};
	console.log(watch("example")); // watch input value by passing the name of it
	return (
		<div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-4 p-4"
			>
				{step ? (
					<div
						onClick={handleInputClick}
						className="rounded-xl bg-[#111111] p-4 py-3 text-white border border-[#333333]"
					>
						{pointA ? pointA.name : "Point A"}
					</div>
				) : (
					<div
						id="apoint"
						className="rounded-xl bg-[#111111] p-4 text-white border border-[#333333]"
					></div>
				)}

				{step ? (
					<div
						id="bpoint"
						className="rounded-xl bg-[#111111] p-4 text-white border border-[#333333]"
					></div>
				) : (
					<div
						onClick={handleInputClick}
						className="rounded-xl bg-[#111111] p-4 text-white border border-[#333333]"
					>
						{pointB ? pointB.name : "Point B"}
					</div>
				)}

				{documentData ? (
					<select {...register("driver", { required: true })}>
						{documentData.map((doc) => (
							<option value={doc.data().name}>{doc.data().name}</option>
						))}
					</select>
				) : (
					<div className="text-white animate-spin h-[24px] w-[24px] flex justify-center align-center items-center">
						<LuLoader2 />
					</div>
				)}

				<button
					type="submit"
					className="rounded-xl bg-[#111111] p-4 text-white border border-[#333333]"
				>
					Add Route
				</button>
			</form>
		</div>
	);
};

export default AddTrip;
