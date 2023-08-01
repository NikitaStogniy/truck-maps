"use client";
import getData from "@/app/firebase/getData";
import { useEffect, useState, useContext } from "react";

import { MyContext } from "../../context/context";
import { LuLoader2 } from "react-icons/lu";

const Trips = () => {
	const [documentData, setTrips] = useState();
	const { selectedTrip, setTrip } = useContext(MyContext);
	useEffect(() => {
		const asyncFn = async () => {
			setTrips(await getData("trips"));
		};
		asyncFn();
	}, []);

	const handleClick = (document) => {
		const trip = [document.data().pointA, document.data().pointB];
		console.log(trip);
		setTrip(trip);
	};

	return (
		<div className="flex flex-col gap-4">
			{documentData ? (
				documentData.map((doc, index) => (
					<div
						onClick={() => handleClick(doc)}
						className="cursor-pointer p-4 rounded-xl border border-[#333333] flex flex-col gap-"
					>
						<div className="text-2xl text-white">
							{doc.data().routeNames[0].substr(0, 24)}
						</div>
						<div className="flex flex-col gap-2 my-4">
							<div className="w-[4px] h-[4px] bg-white/30 rounded-full" />
							<div className="w-[4px] h-[4px] bg-white/30 rounded-full" />
							<div className="w-[4px] h-[4px] bg-white/30 rounded-full" />
						</div>
						<div className="text-2xl text-white">
							{doc.data().routeNames[1].substr(0, 24)}
						</div>
						<div className="text-xl text-white/70">{doc.data().driver}</div>
					</div>
				))
			) : (
				<div className="text-white animate-spin h-[24px] w-[24px] flex justify-center align-center items-center">
					<LuLoader2 />
				</div>
			)}
		</div>
	);
};

export default Trips;
