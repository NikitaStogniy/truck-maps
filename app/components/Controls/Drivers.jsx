"use client";
import getData from "@/app/firebase/getData";
import { useEffect, useState } from "react";
import { LuLoader2 } from "react-icons/lu";
const Drivers = () => {
	const [documentData, setDrivers] = useState();

	useEffect(() => {
		const asyncFn = async () => {
			setDrivers(await getData("users"));
		};
		asyncFn();
	}, []);

	return (
		<div className="flex flex-col gap-4">
			{documentData ? (
				documentData.map((doc, index) => (
					<div
						key={index}
						className="p-4 rounded-xl border border-[#333333] flex flex-col gap-"
					>
						<div className="text-2xl text-white">{doc.data().name}</div>
						<div className="text-xl text-white/70">{doc.data().truck}</div>
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

export default Drivers;
