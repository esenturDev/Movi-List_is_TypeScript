import React, { FC, useEffect, useState } from "react";
import scss from "./Card.module.scss";

import { MoviList } from "../../types/types";
import { Button } from "../../../Ul/button/Button";

export const Card: FC<{
	state: MoviList[];
	patchMovi: (id: number, isAuth: boolean) => void;
	deleteMovi: (id: number) => void;
}> = ({ state, deleteMovi, patchMovi }) => {
	const [cardResult, setCardResult] = useState<MoviList[]>([]);

	useEffect(() => {
		setCardResult(state);
	}, [state]);

	return (
		<div className={scss.cards}>
			{cardResult.map((item) => (
				<div className={scss.card} key={item._id}>
					<p>{item.name}</p>
					<img src={item.img} alt={item.name} />
					<Button onClick={() => patchMovi(item._id, item.isAuth)}>
						PATCH
					</Button>
					<Button onClick={() => deleteMovi(item._id)}>DELETE</Button>
				</div>
			))}1
		</div>
	);
};
