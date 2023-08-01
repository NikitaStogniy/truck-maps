"use client";

import Image from "next/image";
import MapComponent from "./components/Map";
import Controls from "./components/Controls/Controls";
import { MyContext } from "./context/context";
import { useState } from "react";

export default function Home() {
	const [open, setOpen] = useState(true);
	const [add, setAdd] = useState(false);
	const [selectedTrip, setTrip] = useState(null);
	return (
		<main className="flex w-full h-[100vh] bg-[#111111]">
			<MyContext.Provider
				value={{ open, setOpen, selectedTrip, setTrip, add, setAdd }}
			>
				<div className="w-full flex justify-end items-center p-[16px]">
					<Controls />
					<MapComponent />
				</div>
			</MyContext.Provider>
		</main>
	);
}
