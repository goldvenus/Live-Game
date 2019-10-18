import React from "react";
import TargetMove from "./move-engin/index";

export default function (mount) {
	return {
		heading: "TargetMove",
		items: [
			{
				heading: "Target Move",
				onPress: _ => mount(<TargetMove />)
			}
		]
	}
}

 