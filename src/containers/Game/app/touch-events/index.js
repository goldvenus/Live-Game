import React from "react";
import SingleTouch from "./single-touch/index"
import MultiTouch from "./multi-touch/index"

export default function (mount) {
	return {
		heading: "Touch Events",
		items: [
			{
				heading: "Single Touch",
				onPress: _ => mount(<SingleTouch />)
			},
			{
				heading: "Multi Touch",
				onPress: _ => mount(<MultiTouch />)
			}
		]
	}
}

 