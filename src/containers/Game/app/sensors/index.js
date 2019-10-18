import React from "react";
import Accelerometer from "./accelerometer/index";

export default function (mount) {
	return {
		heading: "Sensors",
		items: [
			{
				heading: "Accelerometer",
				onPress: _ => mount(<Accelerometer />)
			}
		]
	}
}

 