// 封装Ajax

function ajax(opts){
	let url = opts.url
	let type = opts.type || 'GET' 
	let datatype = opts.datatype || 'json'
	let onsuccess = opts.onsuccess || function(){}
	let onerror = opts.onerror || function(){}
	let data = opts.data || {}

	let dataStr = []
	for(let key in data){
		dataStr.push(key + '=' + data[key])
	}
	dataStr = dataStr.join('&')

	if(type === 'GET'){
		url += '?' + dataStr
	}

	let xhr = new XMLHttpRequest()
	xhr.open(type, url, true)
	xhr.onload = () => {
		if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
			// 成功
			if(datatype === 'json'){
				onsuccess(JSON.parse(xhr.responseText))
			}else {
				onsuccess(xhr.responseText)
			}
		}else {
			onerror()
		}
	}
	xhr.onerror = error
	if (type === 'POST') {
		xhr.send(dataStr)
	}else{
		xhr.send()
	}
}

ajax({
    url: 'http://api.jirengu.com/weather.php',
    data: {
        city: '北京'
    },
    onsuccess: function(ret){
        console.log(ret)
    },
    onerror: function(){
        console.log('服务器异常')
    }
})
