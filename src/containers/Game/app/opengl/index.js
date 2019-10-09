import React from "react";
import MotionBlurExample from "./motion-blur/index";
import StanfordBunnyExmaple from "./stanford-bunny/index";
import GameOfLifeExample from "./game-of-life/index";
import OverrideRendererExample from "../examples/override-renderer/index";
import LightingExample from "./lighting/index"

export default function (mount) {
	return {
		heading: "OpenGL",
		items: [
			{
				heading: "Motion Blur",
				onPress: _ => mount(<MotionBlurExample />)
			},
			{
				heading: "Stanford Bunny",
				onPress: _ => mount(<StanfordBunnyExmaple />)
			},
			{
				heading: "Lighting",
				onPress: _ => mount(<LightingExample />)
			},
			{
				heading: "Game of Life",
				onPress: _ => mount(<GameOfLifeExample />)
			},
			{
				heading: "OpenGL Renderer",
				onPress: _ => mount(<OverrideRendererExample />)
			}
		]
	}
}

 