import EventHub from "../src/index";

const eventHub = new EventHub();

console.assert(eventHub instanceof Object === true, "event 是个对象");

eventHub.on("xxx", () => {
	console.log('beidiaoyong')
});

eventHub.emit("xxx");
