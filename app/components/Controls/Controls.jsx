"use client";

import { MyContext } from "../../context/context";
import React, { useContext, useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import AddDriver from "./AddDriver";
import AddTrip from "./AddTrip";
import Trips from "./Trips";
import Drivers from "./Drivers";

const Controls = () => {
	const { open, setOpen } = useContext(MyContext);
	const { selectedTrip, setTrip } = useContext(MyContext);
	const { add, setAdd } = useContext(MyContext);
	const [selected, setSelected] = useState("Trips");

	const handleClick = (tab) => {
		setSelected(tab);
	};

	const handleClickTrips = (trip) => {
		setTrip(trip);
	};

	const handleClickAdd = () => {
		setAdd(!add);
	};

	return (
		<div
			className={`absolute ml-[16px] left-0 h-[90%] bg-[#111111]/10 backdrop-blur-lg w-[364px] rounded-xl border border-[#333333] ease-in-out duration-300 ${
				open ? "-left-[1000px] scale-0" : "left-0"
			}`}
		>
			<div className="flex flex-row justify-between align-center items-center p-4">
				<div className="flex flex-row gap-7">
					<div
						onClick={() => handleClick("Trips")}
						className={`cursor-pointer ease-in-out duration-300 text-4xl ${
							selected == "Trips"
								? "text-white"
								: "text-white/30 hover:text-white/60"
						}`}
					>
						Trips
					</div>
					<div
						onClick={() => handleClick("Drivers")}
						className={`cursor-pointer ease-in-out duration-300 text-4xl ${
							selected == "Drivers"
								? "text-white"
								: "text-white/30 hover:text-white/60"
						}`}
					>
						Drivers
					</div>
				</div>
				<div
					onClick={handleClickAdd}
					className={` ${
						add
							? "bg-[#555555] "
							: "bg-[#010101] hover:bg-[#111111] hover:border-gray-100"
					}  text-white cursor-pointer h-[48px] w-[48px] justify-center flex items-center text-6xl leading-10 rounded-xl ease-in-out duration-300 border border-gray-800 text-white`}
				>
					<IoIosAdd />
				</div>
			</div>
			<div className={`${add ? "hidden" : "visible"} p-4 gap-2 flex flex-col`}>
				{selected == "Trips" ? <Trips /> : <Drivers />}
			</div>
			{add ? selected == "Trips" ? <AddTrip /> : <AddDriver /> : ""}
		</div>
	);
};

export default Controls;
