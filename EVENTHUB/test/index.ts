import EventHub from "../src/index";

const eventHub = new EventHub();

console.assert(eventHub instanceof Object === true, "event 是个对象");

let called = false
eventHub.on("xxx", data => {
	called = true
	console.log('called', called)
	console.assert(data === '杨雨蒙在家1')
});

eventHub.emit("xxx", '杨雨蒙在家');
