"use client";
import addData from "@/app/firebase/addData";
import { useForm } from "react-hook-form";
import { MyContext } from "../../context/context";
import React, { useContext } from "react";

const AddDriver = () => {
	const { add, setAdd } = useContext(MyContext);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => handleForm(data);

	const handleForm = async (formData) => {
		console.log(formData);
		const data = {
			name: formData.name,
			truck: formData.truck,
			route: null,
		};
		const { result, error } = await addData(
			"users",
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
		<div className="flex flex-col justify-center align-center p-4 gap-6">
			<h1 className="text-2xl text-white font-bold">Add a Driver</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<input
					{...register("name", { required: true })}
					className="p-4 rounded-xl bg-[#111111] border border-[#333333] text-white"
					type="text"
					placeholder="Driver name"
				></input>
				<input
					{...register("truck", { required: true })}
					className="p-4 rounded-xl bg-[#111111] border border-[#333333] text-white"
					type="text"
					placeholder="Driver Truck"
				></input>
				<button
					type="submit"
					className="mt-2 rounded-xl bg-[#111111] p-4 text-white border border-[#333333]"
				>
					Add Route
				</button>
			</form>
		</div>
	);
};

export default AddDriver;
