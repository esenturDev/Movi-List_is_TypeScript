import React, { FC, useEffect, useState } from "react";
import scss from "./NewMoviList.module.scss";
import { MoviList } from "../../types/types";
import axios from "axios";
import Input from "../../../Ul/input/Input";
import { Button } from "../../../Ul/button/Button";
import { Card } from "../card/Card";
const url = import.meta.env.VITE_BEK_URL;
export const NewMoviList: FC = () => {
	const [state, setState] = useState<MoviList[]>([]);
	const [nameValue, setNameValue] = useState<string>("");
	const [imgValue, setImgValue] = useState<string>("");

	const postMove = async () => {
		const newData = {
			name: nameValue,
			img: imgValue,
			isAuth: false,
		};
		try {
			const response = (await axios.post(url, newData)).data;
			console.log(response);
			setState(response);
			getMove();
			localStorage.setItem("key", JSON.stringify(response));
			setNameValue("");
			setImgValue("");
		} catch (error) {
			console.error(error);
		}
	};

	const getMove = async () => {
		try {
			const response = (await axios.get(url)).data;
			console.log(response);

			setState(response);
			localStorage.setItem("key", JSON.stringify(response));
		} catch (error) {
			console.error(error);
		}
	};

	const deleteMovi = async (id: number) => {
		try {
			const response = (await axios.delete(`${url}/${id}`)).data;
			getMove();
			localStorage.removeItem("key");
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	};

	const patchMovi = async (id: number, isAuth: boolean) => {
		try {
			const response = (
				await axios.patch(`${url}/${id}`, {
					isAuth: isAuth,
				})
			).data;
			console.log(response);
			setState(response);
			getMove();
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getMove();
	}, []);

	return (
		<div className={scss.newmovi}>
			<div className="container">
				<h1>MOVI-LIST</h1>
				<div className={scss.content}>
					<Input
						type="text"
						value={nameValue}
						setData={setNameValue}
						placeholder="text..."
					/>
					<Input
						type="url"
						value={imgValue}
						setData={setImgValue}
						placeholder="photo..."
					/>
					<Button onClick={postMove}>Add</Button>
					<>
						<Card state={state} deleteMovi={deleteMovi} patchMovi={patchMovi} />
					</>
				</div>
			</div>
		</div>
	);
};
